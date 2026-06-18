import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { BrowserProfile } from './browser-paths';

export interface ImportOptions {
  bookmarks?: boolean;
  history?: boolean;
  passwords?: boolean;
  cookies?: boolean;
}

export interface ImportedData {
  bookmarks: any[];
  history: any[];
  passwords: any[];
  cookies: any[];
}

function getChromiumKey(profile: BrowserProfile): Buffer | null {
  try {
    const localStatePath = path.join(profile.path, 'Local State');
    if (!fs.existsSync(localStatePath)) return null;

    const localStateStr = fs.readFileSync(localStatePath, 'utf8');
    const localState = JSON.parse(localStateStr);

    if (!localState.os_crypt || !localState.os_crypt.encrypted_key) {
      return null;
    }

    const encryptedKey = Buffer.from(localState.os_crypt.encrypted_key, 'base64');
    
    // DPAPI encrypted keys start with "DPAPI" (5 bytes)
    if (encryptedKey.toString('utf8', 0, 5) !== 'DPAPI') {
      return null;
    }

    const dpapiCiphertext = encryptedKey.slice(5);
    
    // Use PowerShell to decrypt the DPAPI payload to avoid native dependency issues
    const base64Ciphertext = dpapiCiphertext.toString('base64');
    const psScript = `
      Add-Type -AssemblyName System.Security
      $bytes = [Convert]::FromBase64String('${base64Ciphertext}')
      $unprotected = [System.Security.Cryptography.ProtectedData]::Unprotect($bytes, $null, [System.Security.Cryptography.DataProtectionScope]::CurrentUser)
      [Convert]::ToBase64String($unprotected)
    `;
    
    const { execSync } = require('child_process');
    const output = execSync('powershell.exe -NoProfile -NonInteractive -Command -', {
      input: psScript,
      encoding: 'utf8'
    });
    
    return Buffer.from(output.trim(), 'base64');
  } catch (error) {
    console.error('Failed to get Chromium AES key:', error);
    return null;
  }
}

function decryptChromiumValue(encryptedValue: Buffer, key: Buffer): string {
  try {
    // Check if it's an old DPAPI-only format or new v10/v11 format
    const prefix = encryptedValue.toString('utf8', 0, 3);
    if (prefix === 'v10' || prefix === 'v11') {
      const iv = encryptedValue.slice(3, 15);
      const ciphertext = encryptedValue.slice(15, encryptedValue.length - 16);
      const authTag = encryptedValue.slice(encryptedValue.length - 16);

      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(authTag);
      
      let decrypted = decipher.update(ciphertext, undefined, 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } else {
      // Old DPAPI format (rare nowadays, but handled)
      try {
        const base64Ciphertext = encryptedValue.toString('base64');
        const psScript = `
          Add-Type -AssemblyName System.Security
          $bytes = [Convert]::FromBase64String('${base64Ciphertext}')
          $unprotected = [System.Security.Cryptography.ProtectedData]::Unprotect($bytes, $null, [System.Security.Cryptography.DataProtectionScope]::CurrentUser)
          [System.Text.Encoding]::UTF8.GetString($unprotected)
        `;
        const { execSync } = require('child_process');
        const output = execSync('powershell.exe -NoProfile -NonInteractive -Command -', {
          input: psScript,
          encoding: 'utf8'
        });
        return output.trim();
      } catch {
        return '';
      }
    }
  } catch (error) {
    return '';
  }
}

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

export async function extractChromiumData(profile: BrowserProfile, options: ImportOptions): Promise<ImportedData> {
  const result: ImportedData = {
    bookmarks: [],
    history: [],
    passwords: [],
    cookies: []
  };

  const defaultProfilePath = path.join(profile.path, 'Default');
  if (!fs.existsSync(defaultProfilePath)) {
    console.warn(`Default profile not found for ${profile.name} at ${defaultProfilePath}`);
    return result;
  }

  // 1. Bookmarks (JSON format, no encryption)
  if (options.bookmarks) {
    try {
      const bookmarksPath = path.join(defaultProfilePath, 'Bookmarks');
      if (fs.existsSync(bookmarksPath)) {
        const bookmarksData = JSON.parse(fs.readFileSync(bookmarksPath, 'utf8'));
        
        // Recursive function to parse Chromium bookmark structure
        const parseBookmarks = (node: any) => {
          if (node.type === 'url') {
            result.bookmarks.push({ title: node.name, url: node.url });
          } else if (node.type === 'folder' && node.children) {
            node.children.forEach(parseBookmarks);
          }
        };

        if (bookmarksData.roots) {
          if (bookmarksData.roots.bookmark_bar) parseBookmarks(bookmarksData.roots.bookmark_bar);
          if (bookmarksData.roots.other) parseBookmarks(bookmarksData.roots.other);
          if (bookmarksData.roots.synced) parseBookmarks(bookmarksData.roots.synced);
        }
      }
    } catch (error) {
      console.error(`Failed to extract bookmarks for ${profile.name}:`, error);
    }
  }

  let db;
  try {
    const Database = require('better-sqlite3');
    const aesKey = getChromiumKey(profile);

    // 2. History
    if (options.history) {
      const historyPath = path.join(defaultProfilePath, 'History');
      const tempPath = copyToTemp(historyPath); // We must copy to bypass database locks
      if (tempPath) {
        db = new Database(tempPath, { readonly: true });
        const rows = db.prepare('SELECT url, title, last_visit_time FROM urls ORDER BY last_visit_time DESC LIMIT 2000').all();
        result.history = rows.map((r: any) => ({
          url: r.url,
          title: r.title
        }));
        db.close();
        fs.unlinkSync(tempPath);
      }
    }

    // 3. Passwords
    if (options.passwords && aesKey) {
      const loginDataPath = path.join(defaultProfilePath, 'Login Data');
      const tempPath = copyToTemp(loginDataPath);
      if (tempPath) {
        db = new Database(tempPath, { readonly: true });
        const rows = db.prepare('SELECT origin_url, username_value, password_value FROM logins WHERE blacklisted_by_user = 0').all();
        result.passwords = rows.map((r: any) => {
          const decryptedPassword = decryptChromiumValue(r.password_value, aesKey);
          return {
            url: r.origin_url,
            username: r.username_value,
            password: decryptedPassword
          };
        }).filter((p: any) => p.password && p.password.length > 0);
        db.close();
        fs.unlinkSync(tempPath);
      }
    }

    // 4. Cookies
    if (options.cookies && aesKey) {
      const cookiesPath = path.join(profile.path, 'Network', 'Cookies'); // Some browsers store it in Network/Cookies
      const fallbackPath = path.join(defaultProfilePath, 'Cookies');
      
      let targetPath = fs.existsSync(cookiesPath) ? cookiesPath : null;
      if (!targetPath && fs.existsSync(fallbackPath)) {
        targetPath = fallbackPath;
      }

      if (targetPath) {
        const tempPath = copyToTemp(targetPath);
        if (tempPath) {
          db = new Database(tempPath, { readonly: true });
          const rows = db.prepare('SELECT host_key, name, encrypted_value, path, expires_utc, is_secure, is_httponly FROM cookies').all();
          result.cookies = rows.map((r: any) => {
            const decryptedCookie = decryptChromiumValue(r.encrypted_value, aesKey);
            return {
              domain: r.host_key,
              name: r.name,
              value: decryptedCookie,
              path: r.path,
              secure: r.is_secure === 1,
              httpOnly: r.is_httponly === 1
            };
          }).filter((c: any) => c.value && c.value.length > 0);
          db.close();
          fs.unlinkSync(tempPath);
        }
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
