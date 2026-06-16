import { ipcMain, app, shell, dialog } from 'electron';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

const DATA_FILE = path.join(app.getPath('userData'), 'kdg-browser-data.json');

interface AppData {
  settings: {
    geminiKey: string;
    searchEngine: 'google' | 'yandex' | 'bing' | 'duckduckgo';
    theme: 'dark' | 'light' | 'gamer';
    homepage: string;
    hasPromptedDefault: boolean;
    memorySaver: boolean;
  };
  history: Array<{
    id: string;
    url: string;
    title: string;
    timestamp: number;
  }>;
  bookmarks: Array<{
    id: string;
    url: string;
    title: string;
    timestamp: number;
  }>;
}

// Initial data structure
const defaultData: AppData = {
  settings: {
    geminiKey: 'AIzaSyDRUFM-LnQZY87nYNL3VpMJtTGxVNd0yqU', // Pre-populated user key
    searchEngine: 'google',
    theme: 'dark',
    homepage: 'kdg://home',
    hasPromptedDefault: false,
    memorySaver: true
  },
  history: [],
  bookmarks: []
};

// Helper to read data
function readData(): AppData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      settings: { ...defaultData.settings, ...parsed.settings },
      history: parsed.history || [],
      bookmarks: parsed.bookmarks || []
    };
  } catch (err) {
    console.error('Error reading browser data:', err);
    return defaultData;
  }
}

// Helper to write data
function writeData(data: AppData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing browser data:', err);
  }
}

// Bookmarks import helper from Chrome/Edge
function importChromeBookmarks(browser: 'chrome' | 'edge'): Array<{ url: string; title: string }> {
  let relativePath = '';
  if (browser === 'chrome') {
    relativePath = 'Google/Chrome/User Data/Default/Bookmarks';
  } else if (browser === 'edge') {
    relativePath = 'Microsoft/Edge/User Data/Default/Bookmarks';
  }
  
  const bookmarksPath = path.join(process.env.LOCALAPPDATA || '', relativePath);
  if (!fs.existsSync(bookmarksPath)) {
    throw new Error(`Файл закладок ${browser} не найден.`);
  }
  
  const content = fs.readFileSync(bookmarksPath, 'utf8');
  const data = JSON.parse(content);
  const bookmarksList: Array<{ url: string; title: string }> = [];
  
  function traverse(node: any) {
    if (node.type === 'url' && node.url) {
      bookmarksList.push({
        url: node.url,
        title: node.name || node.url
      });
    } else if (node.type === 'folder' && Array.isArray(node.children)) {
      node.children.forEach(traverse);
    }
  }
  
  if (data.roots) {
    if (data.roots.bookmark_bar) traverse(data.roots.bookmark_bar);
    if (data.roots.other) traverse(data.roots.other);
    if (data.roots.synced) traverse(data.roots.synced);
  }
  
  return bookmarksList;
}

// Bookmarks import helper from HTML string
function parseHtmlBookmarks(htmlContent: string): Array<{ url: string; title: string }> {
  const bookmarks: Array<{ url: string; title: string }> = [];
  const regex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    const url = match[1];
    let title = match[2].replace(/<[^>]*>/g, '').trim();
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      bookmarks.push({ url, title: title || url });
    }
  }
  return bookmarks;
}

export function registerIpcHandlers() {
  // --- Settings Handlers ---
  ipcMain.handle('settings:get', () => {
    return readData().settings;
  });

  ipcMain.handle('settings:save', (_, settings: AppData['settings']) => {
    const data = readData();
    data.settings = { ...data.settings, ...settings };
    writeData(data);
    return { success: true };
  });

  // --- Default Browser Handlers ---
  ipcMain.handle('browser:isDefault', () => {
    return app.isDefaultProtocolClient('http');
  });

  ipcMain.handle('browser:setDefault', () => {
    let success = false;
    try {
      app.setAsDefaultProtocolClient('http');
      app.setAsDefaultProtocolClient('https');
      success = true;
    } catch (err) {
      console.error('Failed to set as default protocol client:', err);
    }
    
    if (process.platform === 'win32') {
      shell.openExternal('ms-settings:defaultapps').catch(() => {});
    }
    return success;
  });

  // --- Bookmarks Import Handlers ---
  ipcMain.handle('bookmarks:import', (_, type: 'chrome' | 'edge') => {
    try {
      const data = readData();
      const imported = importChromeBookmarks(type);
      
      if (imported.length === 0) {
        return { success: false, count: 0, error: 'Закладки не найдены или файл пуст.' };
      }
      
      let addedCount = 0;
      imported.forEach(item => {
        const exists = data.bookmarks.some(b => b.url === item.url);
        if (!exists) {
          data.bookmarks.push({
            id: Math.random().toString(36).substring(2, 9),
            url: item.url,
            title: item.title,
            timestamp: Date.now()
          });
          addedCount++;
        }
      });
      
      writeData(data);
      return { success: true, count: addedCount };
    } catch (err: any) {
      console.error(`Error importing from ${type}:`, err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('bookmarks:importDialog', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'HTML Bookmarks', extensions: ['html', 'htm'] }
      ]
    });
    
    if (result.canceled || result.filePaths.length === 0) {
      return { success: false, canceled: true };
    }
    
    try {
      const filePath = result.filePaths[0];
      const content = fs.readFileSync(filePath, 'utf8');
      const imported = parseHtmlBookmarks(content);
      
      if (imported.length === 0) {
        return { success: false, count: 0, error: 'В выбранном файле не найдено закладок.' };
      }
      
      const data = readData();
      let addedCount = 0;
      imported.forEach(item => {
        const exists = data.bookmarks.some(b => b.url === item.url);
        if (!exists) {
          data.bookmarks.push({
            id: Math.random().toString(36).substring(2, 9),
            url: item.url,
            title: item.title,
            timestamp: Date.now()
          });
          addedCount++;
        }
      });
      
      writeData(data);
      return { success: true, count: addedCount, filePath: path.basename(filePath) };
    } catch (err: any) {
      console.error('Error importing bookmarks file:', err);
      return { success: false, error: err.message };
    }
  });

  // --- History Handlers ---
  ipcMain.handle('history:get', () => {
    return readData().history;
  });

  ipcMain.handle('history:add', (_, item: { url: string; title: string }) => {
    const data = readData();
    const filtered = data.history.filter(h => h.url !== item.url);
    const newEntry = {
      id: Math.random().toString(36).substring(2, 9),
      url: item.url,
      title: item.title || item.url,
      timestamp: Date.now()
    };
    data.history = [newEntry, ...filtered].slice(0, 200);
    writeData(data);
    return data.history;
  });

  ipcMain.handle('history:clear', () => {
    const data = readData();
    data.history = [];
    writeData(data);
    return [];
  });

  // --- Bookmarks Handlers ---
  ipcMain.handle('bookmarks:get', () => {
    return readData().bookmarks;
  });

  ipcMain.handle('bookmarks:toggle', (_, item: { url: string; title: string }) => {
    const data = readData();
    const index = data.bookmarks.findIndex(b => b.url === item.url);
    if (index >= 0) {
      data.bookmarks.splice(index, 1);
    } else {
      data.bookmarks.push({
        id: Math.random().toString(36).substring(2, 9),
        url: item.url,
        title: item.title || item.url,
        timestamp: Date.now()
      });
    }
    writeData(data);
    return data.bookmarks;
  });

  // --- Dialog Handlers ---
  ipcMain.handle('dialog:openImage', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'jpeg', 'webp'] }
      ]
    });
    
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    
    try {
      const filePath = result.filePaths[0];
      const data = fs.readFileSync(filePath).toString('base64');
      const ext = path.extname(filePath).toLowerCase();
      let mimeType = 'image/jpeg';
      if (ext === '.png') mimeType = 'image/png';
      else if (ext === '.webp') mimeType = 'image/webp';
      
      return {
        inlineData: {
          data,
          mimeType
        },
        fileName: path.basename(filePath)
      };
    } catch (err) {
      console.error('Error reading image file:', err);
      return null;
    }
  });

  // --- AI Gemini Handler ---
  ipcMain.handle('ai:generate', async (_, { prompt, systemInstruction, imagePart }: { prompt: string; systemInstruction?: string; imagePart?: any }) => {
    const data = readData();
    const apiKey = data.settings.geminiKey || defaultData.settings.geminiKey;

    if (!apiKey) {
      throw new Error('Gemini API key is not configured.');
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: systemInstruction || 'Ты — искусственный интеллект KDG Browser, помощник геймера для "Канала Доброго Геймера" (KDG). Твоя цель — помогать пользователям анализировать видео, отвечать на вопросы по прохождениям и давать качественные советы по играм.'
      });

      const parts: any[] = [{ text: prompt }];
      if (imagePart) {
        parts.push(imagePart);
      }

      const result = await model.generateContent(parts);
      const response = await result.response;
      return response.text();
    } catch (err: any) {
      console.error('Gemini API error:', err);
      throw new Error(err.message || 'Error occurred while contacting Google Gemini.');
    }
  });

  // --- Downloads Handler ---
  ipcMain.handle('download:openFolder', (_, filePath: string) => {
    if (fs.existsSync(filePath)) {
      shell.showItemInFolder(filePath);
      return true;
    }
    return false;
  });
}
