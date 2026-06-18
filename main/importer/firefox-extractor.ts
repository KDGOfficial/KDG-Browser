import fs from 'fs';
import path from 'path';
import type { BrowserProfile } from './browser-paths';
import type { ImportOptions, ImportedData } from './chromium-extractor';

function copyToTemp(sourcePath: string): string | null {
  try {
    const tempPath = path.join(process.env.TEMP || '', `temp_${Date.now()}_${path.basename(sourcePath)}`);
    fs.copyFileSync(sourcePath, tempPath);
    return tempPath;
  } catch (error) {
    console.error(`Failed to copy file from ${sourcePath} to temp:`, error);
    return null;
  }
}

function getFirefoxDefaultProfilePath(profilesPath: string): string | null {
  try {
    const iniPath = path.join(profilesPath, 'profiles.ini');
    if (!fs.existsSync(iniPath)) {
      // Just return the first folder that looks like a profile
      const dirs = fs.readdirSync(profilesPath).filter(f => fs.statSync(path.join(profilesPath, f)).isDirectory() && f.includes('.default'));
      if (dirs.length > 0) return path.join(profilesPath, dirs[0]);
      return null;
    }

    const iniContent = fs.readFileSync(iniPath, 'utf8');
    const lines = iniContent.split('\n');
    
    let currentProfile = '';
    let defaultProfilePath = null;
    let isDefault = false;
    let tempPath = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('[Profile')) {
        currentProfile = trimmed;
        isDefault = false;
      } else if (trimmed.startsWith('Path=')) {
        tempPath = trimmed.split('=')[1];
      } else if (trimmed.startsWith('Default=1')) {
        isDefault = true;
      }

      if (isDefault && tempPath) {
        defaultProfilePath = path.join(profilesPath, tempPath);
        break;
      }
    }

    if (!defaultProfilePath && tempPath) {
      defaultProfilePath = path.join(profilesPath, tempPath);
    }

    return defaultProfilePath;
  } catch (error) {
    console.error('Error finding Firefox default profile:', error);
    return null;
  }
}

export async function extractFirefoxData(profile: BrowserProfile, options: ImportOptions): Promise<ImportedData> {
  const result: ImportedData = {
    bookmarks: [],
    history: [],
    passwords: [], // Firefox passwords require complex NSS decryption, skipped for now.
    cookies: []
  };

  const defaultProfilePath = getFirefoxDefaultProfilePath(profile.path);
  if (!defaultProfilePath || !fs.existsSync(defaultProfilePath)) {
    console.warn(`Default profile not found for ${profile.name}`);
    return result;
  }

  let db;
  try {
    const Database = require('better-sqlite3');

    // 1. History & Bookmarks are in places.sqlite
    if (options.history || options.bookmarks) {
      const placesPath = path.join(defaultProfilePath, 'places.sqlite');
      const tempPath = copyToTemp(placesPath);
      
      if (tempPath) {
        db = new Database(tempPath, { readonly: true });
        
        if (options.history) {
          const rows = db.prepare('SELECT url, title, last_visit_date FROM moz_places WHERE last_visit_date IS NOT NULL ORDER BY last_visit_date DESC LIMIT 2000').all();
          result.history = rows.map((r: any) => ({
            url: r.url,
            title: r.title
          }));
        }

        if (options.bookmarks) {
          // moz_bookmarks type 1 = bookmark
          const rows = db.prepare(`
            SELECT b.title, p.url 
            FROM moz_bookmarks b
            JOIN moz_places p ON b.fk = p.id
            WHERE b.type = 1 AND p.url NOT LIKE 'place:%'
          `).all();
          result.bookmarks = rows.map((r: any) => ({
            title: r.title || r.url,
            url: r.url
          }));
        }

        db.close();
        fs.unlinkSync(tempPath);
      }
    }

    // 2. Cookies (cookies.sqlite) - Firefox doesn't encrypt cookie values by default in the same way Chromium does
    if (options.cookies) {
      const cookiesPath = path.join(defaultProfilePath, 'cookies.sqlite');
      const tempPath = copyToTemp(cookiesPath);
      
      if (tempPath) {
        db = new Database(tempPath, { readonly: true });
        const rows = db.prepare('SELECT host, name, value, path, isSecure, isHttpOnly FROM moz_cookies').all();
        result.cookies = rows.map((r: any) => ({
          domain: r.host,
          name: r.name,
          value: r.value,
          path: r.path,
          secure: r.isSecure === 1,
          httpOnly: r.isHttpOnly === 1
        }));
        db.close();
        fs.unlinkSync(tempPath);
      }
    }

  } catch (error) {
    console.error(`Failed to extract sqlite data for ${profile.name}:`, error);
    if (db) {
      try { db.close(); } catch {}
    }
  }

  return result;
}
