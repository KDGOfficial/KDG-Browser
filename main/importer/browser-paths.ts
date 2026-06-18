import path from 'path';
import os from 'os';
import fs from 'fs';

export interface BrowserProfile {
  id: string;
  name: string;
  path: string;
  type: 'chromium' | 'firefox';
}

export function getAvailableBrowsers(): BrowserProfile[] {
  const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
  const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');

  const supported: BrowserProfile[] = [
    {
      id: 'chrome',
      name: 'Google Chrome',
      path: path.join(localAppData, 'Google', 'Chrome', 'User Data'),
      type: 'chromium'
    },
    {
      id: 'edge',
      name: 'Microsoft Edge',
      path: path.join(localAppData, 'Microsoft', 'Edge', 'User Data'),
      type: 'chromium'
    },
    {
      id: 'brave',
      name: 'Brave',
      path: path.join(localAppData, 'BraveSoftware', 'Brave-Browser', 'User Data'),
      type: 'chromium'
    },
    {
      id: 'opera',
      name: 'Opera',
      path: path.join(appData, 'Opera Software', 'Opera Stable'),
      type: 'chromium'
    },
    {
      id: 'opera-gx',
      name: 'Opera GX',
      path: path.join(appData, 'Opera Software', 'Opera GX Stable'),
      type: 'chromium'
    },
    {
      id: 'vivaldi',
      name: 'Vivaldi',
      path: path.join(localAppData, 'Vivaldi', 'User Data'),
      type: 'chromium'
    },
    {
      id: 'yandex',
      name: 'Яндекс Браузер',
      path: path.join(localAppData, 'Yandex', 'YandexBrowser', 'User Data'),
      type: 'chromium'
    },
    {
      id: 'firefox',
      name: 'Mozilla Firefox',
      path: path.join(appData, 'Mozilla', 'Firefox', 'Profiles'),
      type: 'firefox'
    }
  ];

  // Return only the browsers that exist on the filesystem
  return supported.filter(browser => {
    try {
      return fs.existsSync(browser.path);
    } catch {
      return false;
    }
  });
}
