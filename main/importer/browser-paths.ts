import path from 'path';
import os from 'os';
import fs from 'fs';

export interface BrowserProfile {
  id: string;
  name: string;
  path: string;
  type: 'chromium' | 'firefox';
}

// Check multiple possible paths for a browser and return the first that exists
function findBrowserPath(paths: string[]): string | null {
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {
      // continue
    }
  }
  return null;
}

export function getAvailableBrowsers(): BrowserProfile[] {
  const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
  const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  const programFiles = process.env.PROGRAMFILES || 'C:\\Program Files';
  const programFilesX86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)';

  // Define all candidates: [id, name, type, [...possiblePaths]]
  const candidates: Array<{ id: string; name: string; type: 'chromium' | 'firefox'; paths: string[] }> = [
    {
      id: 'chrome',
      name: 'Google Chrome',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'Google', 'Chrome', 'User Data'),
        path.join(localAppData, 'Google', 'Chrome Beta', 'User Data'),
        path.join(localAppData, 'Google', 'Chrome Dev', 'User Data'),
        path.join(localAppData, 'Google', 'Chrome Canary', 'User Data'),
      ]
    },
    {
      id: 'edge',
      name: 'Microsoft Edge',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'Microsoft', 'Edge', 'User Data'),
        path.join(localAppData, 'Microsoft', 'Edge Beta', 'User Data'),
        path.join(localAppData, 'Microsoft', 'Edge Dev', 'User Data'),
        path.join(localAppData, 'Microsoft', 'Edge Canary', 'User Data'),
      ]
    },
    {
      id: 'brave',
      name: 'Brave',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'BraveSoftware', 'Brave-Browser', 'User Data'),
        path.join(localAppData, 'BraveSoftware', 'Brave-Browser-Beta', 'User Data'),
        path.join(localAppData, 'BraveSoftware', 'Brave-Browser-Nightly', 'User Data'),
      ]
    },
    {
      id: 'opera',
      name: 'Opera',
      type: 'chromium',
      paths: [
        path.join(appData, 'Opera Software', 'Opera Stable'),
        path.join(appData, 'Opera Software', 'Opera Next'),
        path.join(appData, 'Opera Software', 'Opera Developer'),
      ]
    },
    {
      id: 'opera-gx',
      name: 'Opera GX',
      type: 'chromium',
      paths: [
        path.join(appData, 'Opera Software', 'Opera GX Stable'),
        path.join(localAppData, 'Programs', 'Opera GX'),
      ]
    },
    {
      id: 'vivaldi',
      name: 'Vivaldi',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'Vivaldi', 'User Data'),
      ]
    },
    {
      id: 'yandex',
      name: 'Яндекс Браузер',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'Yandex', 'YandexBrowser', 'User Data'),
        path.join(appData, 'Yandex', 'YandexBrowser', 'User Data'),
      ]
    },
    {
      id: 'firefox',
      name: 'Mozilla Firefox',
      type: 'firefox',
      paths: [
        path.join(appData, 'Mozilla', 'Firefox', 'Profiles'),
        path.join(localAppData, 'Mozilla', 'Firefox', 'Profiles'),
      ]
    },
    {
      id: 'firefox-esr',
      name: 'Mozilla Firefox ESR',
      type: 'firefox',
      paths: [
        path.join(appData, 'Mozilla', 'Firefox', 'Profiles'),
      ]
    },
    {
      id: 'waterfox',
      name: 'Waterfox',
      type: 'firefox',
      paths: [
        path.join(appData, 'Waterfox', 'Profiles'),
        path.join(localAppData, 'Waterfox', 'Profiles'),
      ]
    },
    {
      id: 'librewolf',
      name: 'LibreWolf',
      type: 'firefox',
      paths: [
        path.join(appData, 'librewolf', 'Profiles'),
        path.join(localAppData, 'librewolf', 'Profiles'),
        path.join(appData, 'LibreWolf', 'Profiles'),
      ]
    },
    {
      id: 'chromium',
      name: 'Chromium',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'Chromium', 'User Data'),
      ]
    },
    {
      id: 'arc',
      name: 'Arc Browser',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'Arc', 'User Data'),
        path.join(appData, 'Arc', 'User Data'),
      ]
    },
    {
      id: 'thorium',
      name: 'Thorium',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'Thorium', 'User Data'),
      ]
    },
    {
      id: 'coccoc',
      name: 'Cốc Cốc',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'CocCoc', 'Browser', 'User Data'),
      ]
    },
    {
      id: 'comet',
      name: 'Comet',
      type: 'chromium',
      paths: [
        path.join(localAppData, 'Comet', 'User Data'),
      ]
    },
  ];

  // Filter to only browsers actually installed (i.e. their data folder exists)
  const found: BrowserProfile[] = [];

  for (const candidate of candidates) {
    const resolvedPath = findBrowserPath(candidate.paths);
    if (resolvedPath) {
      // Skip duplicate firefox-esr (shares same path as firefox)
      if (candidate.id === 'firefox-esr') {
        const alreadyHasFirefox = found.some(b => b.id === 'firefox');
        if (alreadyHasFirefox) continue;
      }

      found.push({
        id: candidate.id,
        name: candidate.name,
        path: resolvedPath,
        type: candidate.type
      });
    }
  }

  console.log('[BrowserPaths] Detected installed browsers:', found.map(b => `${b.name} → ${b.path}`));
  return found;
}
