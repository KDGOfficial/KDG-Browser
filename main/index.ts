import { app, BrowserWindow, Menu, ipcMain, session, dialog } from 'electron';
import path from 'path';
import os from 'os';
import fs from 'fs';
import crypto from 'crypto';
import { registerIpcHandlers } from './ipc-handlers';
import { autoUpdater } from 'electron-updater';
import { ElectronBlocker } from '@cliqz/adblocker-electron';
import fetch from 'cross-fetch';

// This placeholder will be replaced with actual hashes by build-main.js in production build.
// DO NOT MODIFY THIS LINE MANUALLY.
const INTEGRITY_HASHES: Record<string, string> = {
  'preload.cjs': 'DEVELOPMENT_PLACEHOLDER',
  'ipc-handlers.cjs': 'DEVELOPMENT_PLACEHOLDER',
  'index.html': 'DEVELOPMENT_PLACEHOLDER'
};

function verifyAppIntegrity() {
  // 1. Block debugging CLI parameters
  if (app.isPackaged) {
    const blockedSwitches = ['inspect', 'inspect-brk', 'remote-debugging-port', 'remote-debugging-pipe'];
    for (const sw of blockedSwitches) {
      if (app.commandLine.hasSwitch(sw)) {
        app.quit();
        process.exit(1);
      }
    }
  }

  // 2. Validate Chromium/Electron runtime versions to prevent binary spoofing
  const EXPECTED_ELECTRON = '29.4.6';
  const EXPECTED_CHROME = '122.0.6261.156';
  if (app.isPackaged) {
    if (process.versions.electron !== EXPECTED_ELECTRON || process.versions.chrome !== EXPECTED_CHROME) {
      dialog.showErrorBox(
        'Ошибка безопасности / Security Error',
        'Критический сбой проверки среды выполнения: версия Electron/Chromium изменена.'
      );
      app.quit();
      process.exit(1);
    }
  }

  // 3. Verify file hashes in production to check against code modification
  if (app.isPackaged) {
    const filesToCheck = {
      'preload.cjs': path.join(__dirname, 'preload.cjs'),
      'ipc-handlers.cjs': path.join(__dirname, 'ipc-handlers.cjs'),
      'index.html': path.join(__dirname, '../dist/index.html')
    };

    for (const [key, filePath] of Object.entries(filesToCheck)) {
      try {
        if (!fs.existsSync(filePath)) {
          throw new Error(`Отсутствует файл: ${key}`);
        }
        const fileContent = fs.readFileSync(filePath);
        const hash = crypto.createHash('sha256').update(fileContent).digest('hex');
        const expectedHash = INTEGRITY_HASHES[key];

        if (expectedHash !== 'DEVELOPMENT_PLACEHOLDER' && hash !== expectedHash) {
          dialog.showErrorBox(
            'Ошибка целостности / Integrity Error',
            `Обнаружено несанкционированное изменение компонентов приложения (${key}). Запуск заблокирован.`
          );
          app.quit();
          process.exit(1);
        }
      } catch (err: any) {
        dialog.showErrorBox(
          'Критическая ошибка / Critical Error',
          `Не удалось проверить целостность приложения: ${err.message || err}`
        );
        app.quit();
        process.exit(1);
      }
    }
  }
}

// Execute integrity checks immediately before setting up the application
verifyAppIntegrity();

// Enable sandbox globally
app.enableSandbox();

// --- System Analysis & Optimizations ---
const totalRAM = os.totalmem() / (1024 * 1024 * 1024); // in GB
const cpuCores = os.cpus().length;

// Smart Hardware acceleration
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('enable-features', 'CanvasOopRasterization');

// Adaptive performance profiling based on user's system
if (totalRAM <= 4 || cpuCores <= 2) {
  // Low-end system: limit renderer processes
  app.commandLine.appendSwitch('renderer-process-limit', '3');
  app.commandLine.appendSwitch('disable-smooth-scrolling');
} else if (totalRAM <= 8) {
  // Mid-range system: moderate limits
  app.commandLine.appendSwitch('renderer-process-limit', '8');
} else {
  // High-end system: No limits, let Chromium fly!
}

let mainWindow: BrowserWindow | null = null;

// Remove default app menu (File, Edit, View...)
Menu.setApplicationMenu(null);
app.setName('KDG Browser');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 850,
    minWidth: 1000,
    minHeight: 650,
    title: 'KDG Browser',
    backgroundColor: '#00000000', // Transparent for Mica/Aero
    transparent: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    backgroundMaterial: 'mica',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      webviewTag: true
    },
    titleBarStyle: 'hidden'
  });

  // Load from Vite server in dev, local file in prod
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    // Open dev tools in development optionally
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Enable webview integration and enforce renderer security
app.on('web-contents-created', (event, contents) => {
  // Close DevTools if opened in production
  if (app.isPackaged) {
    contents.on('devtools-opened', () => {
      contents.closeDevTools();
    });

    // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C shortcuts
    contents.on('before-input-event', (inputEvent, input) => {
      const isDevToolsShortcut = 
        input.key === 'F12' || 
        ((input.control || input.meta) && input.shift && ['I', 'J', 'C'].includes(input.key.toUpperCase()));
      if (isDevToolsShortcut) {
        inputEvent.preventDefault();
      }
      // F10 opens devtools (as requested)
      if (input.key === 'F10' && input.type === 'keyDown') {
        if (contents.isDevToolsOpened()) {
          contents.closeDevTools();
        } else {
          contents.openDevTools();
        }
      }
    });
  }

  // Right-click context menu
  contents.on('context-menu', (e, params) => {
    const menuTemplate: any[] = [];
    
    if (contents.getType() === 'webview') {
      menuTemplate.push(
        { label: 'Назад', enabled: contents.canGoBack(), click: () => contents.goBack() },
        { label: 'Вперед', enabled: contents.canGoForward(), click: () => contents.goForward() },
        { label: 'Перезагрузить', click: () => contents.reload() },
        { type: 'separator' }
      );
    }
    
    menuTemplate.push(
      { label: 'Вырезать', role: 'cut', enabled: params.editFlags.canCut },
      { label: 'Копировать', role: 'copy', enabled: params.editFlags.canCopy },
      { label: 'Вставить', role: 'paste', enabled: params.editFlags.canPaste },
      { label: 'Выделить все', role: 'selectAll' }
    );
    
    if (contents.getType() === 'webview' || !app.isPackaged) {
      menuTemplate.push(
        { type: 'separator' },
        { label: 'Исследовать элемент', click: () => contents.openDevTools() }
      );
    }
    
    const menu = Menu.buildFromTemplate(menuTemplate);
    menu.popup();
  });

  contents.on('will-attach-webview', (webviewEvent, webPreferences, params) => {
    // Enable standard security permissions on loaded webviews
    webPreferences.preload = path.join(__dirname, 'preload.cjs');
    webPreferences.nodeIntegration = false;
    webPreferences.contextIsolation = true;
    webPreferences.sandbox = true;
    webPreferences.webSecurity = true;
  });

  // Block non-HTTPS, non-kdg protocol redirects and navigations
  contents.on('will-navigate', (navEvent, url) => {
    try {
      const parsedUrl = new URL(url);
      if (
        parsedUrl.protocol !== 'https:' && 
        parsedUrl.protocol !== 'kdg:' && 
        parsedUrl.hostname !== 'localhost' && 
        parsedUrl.hostname !== '127.0.0.1'
      ) {
        navEvent.preventDefault();
      }
    } catch {
      navEvent.preventDefault();
    }
  });
});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(async () => {
    // Enforce Content Security Policy headers for all network requests
    const setCSP = (ses: any) => {
      ses.webRequest.onHeadersReceived((details: any, callback: any) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': ["default-src 'self' 'unsafe-inline' 'unsafe-eval' https: wss: kdg:; object-src 'none'"]
          }
        });
      });
    };
    setCSP(session.defaultSession);
    setCSP(session.fromPartition('persist:kdg'));

    const setupSessionPermissions = (ses: any) => {
      ses.setPermissionRequestHandler((webContents: any, permission: string, callback: (granted: boolean) => void) => {
        const allowed = ['media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal', 'clipboard-read', 'clipboard-sanitized-write'];
        if (allowed.includes(permission)) {
          callback(true);
        } else {
          callback(false);
        }
      });

      ses.setPermissionCheckHandler((webContents: any, permission: string, origin: string, details: any) => {
        return true;
      });
    };
    setupSessionPermissions(session.defaultSession);
    setupSessionPermissions(session.fromPartition('persist:kdg'));
  // Register custom protocol 'kdg://'
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient('kdg', process.execPath, [path.resolve(process.argv[1])]);
    }
  } else {
    app.setAsDefaultProtocolClient('kdg');
  }

  registerIpcHandlers();
  createWindow();

  // Handle Downloads for the custom webview partition
  const customSession = session.fromPartition('persist:kdg');
  customSession.on('will-download', (event, item, webContents) => {
    // Generate a unique ID for the download
    const id = Math.random().toString(36).substring(2, 10);
    const fileName = item.getFilename();
    const startTime = Date.now();

    // Send initial download state
    if (mainWindow) {
      mainWindow.webContents.send('download-update', {
        id,
        fileName,
        state: 'downloading',
        receivedBytes: 0,
        totalBytes: item.getTotalBytes(),
        savePath: item.getSavePath()
      });
    }

    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        if (mainWindow) mainWindow.webContents.send('download-update', { id, fileName, state: 'interrupted' });
      } else if (state === 'progressing') {
        if (mainWindow) {
          mainWindow.webContents.send('download-update', {
            id,
            fileName,
            state: 'downloading',
            receivedBytes: item.getReceivedBytes(),
            totalBytes: item.getTotalBytes(),
            savePath: item.getSavePath()
          });
        }
      }
    });

    item.once('done', (event, state) => {
      if (mainWindow) {
        mainWindow.webContents.send('download-update', {
          id,
          fileName,
          state: state === 'completed' ? 'completed' : 'cancelled',
          receivedBytes: item.getReceivedBytes(),
          totalBytes: item.getTotalBytes(),
          savePath: item.getSavePath()
        });
      }
    });
  });

  // Initialize AdBlocker
  try {
    const blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);
    blocker.enableBlockingInSession(session.defaultSession);
    console.log('AdBlocker loaded successfully!');
  } catch (err) {
    console.error('Failed to load AdBlocker:', err);
  }

  // Setup Auto Updater
  autoUpdater.autoDownload = false;

  // Window Controls IPC
  ipcMain.on('window:minimize', () => {
    if (mainWindow) mainWindow.minimize();
  });
  
  ipcMain.on('window:maximize', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) mainWindow.restore();
      else mainWindow.maximize();
    }
  });
  
  ipcMain.on('window:close', () => {
    if (mainWindow) mainWindow.close();
  });

  // Load unpacked Chrome Extensions
  const extensionsDir = path.join(app.getPath('userData'), 'Extensions');
  if (!fs.existsSync(extensionsDir)) {
    fs.mkdirSync(extensionsDir, { recursive: true });
  }

  const loadExtensions = async () => {
    try {
      const dirs = fs.readdirSync(extensionsDir, { withFileTypes: true });
      for (const dirent of dirs) {
        if (dirent.isDirectory()) {
          const extPath = path.join(extensionsDir, dirent.name);
          try {
            await session.defaultSession.loadExtension(extPath);
            await session.fromPartition('persist:kdg').loadExtension(extPath);
            console.log('Loaded extension:', dirent.name);
          } catch (e) {
            console.error('Failed to load extension', dirent.name, e);
          }
        }
      }
    } catch (e) {
      console.error('Failed to read extensions directory', e);
    }
  };

  await loadExtensions();

  ipcMain.handle('extensions:loadUnpacked', async () => {
    if (!mainWindow) return { success: false, error: 'No main window' };
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      title: 'Выберите папку с распакованным расширением'
    });
    
    if (result.canceled || result.filePaths.length === 0) {
      return { success: false, error: 'Canceled' };
    }
    
    const extPath = result.filePaths[0];
    const extName = path.basename(extPath);
    const destPath = path.join(extensionsDir, extName);
    
    try {
      // Very basic copy to userData extensions dir
      fs.cpSync(extPath, destPath, { recursive: true });
      await session.defaultSession.loadExtension(destPath);
      await session.fromPartition('persist:kdg').loadExtension(destPath);
      return { success: true, name: extName };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });

  ipcMain.handle('extensions:getList', () => {
    const defaultExts = session.defaultSession.getAllExtensions();
    return defaultExts.map(e => ({ id: e.id, name: e.name, version: e.version }));
  });

  ipcMain.handle('extensions:remove', async (e, id) => {
    try {
      session.defaultSession.removeExtension(id);
      session.fromPartition('persist:kdg').removeExtension(id);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('updater:getVersion', () => {
    return app.getVersion();
  });

  ipcMain.on('updater:check', () => {
    if (app.isPackaged) {
      autoUpdater.checkForUpdates();
    } else {
      // Mock for development
      setTimeout(() => {
        mainWindow?.webContents.send('updater:status', { status: 'update-not-available' });
      }, 200);
    }
  });

  ipcMain.on('updater:download', () => {
    if (app.isPackaged) {
      autoUpdater.downloadUpdate();
    }
  });

  ipcMain.on('updater:quitAndInstall', () => {
    if (app.isPackaged) {
      autoUpdater.quitAndInstall();
    }
  });

  autoUpdater.on('checking-for-update', () => {
    mainWindow?.webContents.send('updater:status', { status: 'checking' });
  });

  autoUpdater.on('update-available', (info) => {
    mainWindow?.webContents.send('updater:status', { status: 'update-available', info });
  });

  autoUpdater.on('update-not-available', (info) => {
    mainWindow?.webContents.send('updater:status', { status: 'update-not-available', info });
  });

  autoUpdater.on('error', (err) => {
    mainWindow?.webContents.send('updater:status', { status: 'error', error: err.message });
  });

  autoUpdater.on('download-progress', (progressObj) => {
    mainWindow?.webContents.send('updater:status', { status: 'download-progress', progress: progressObj.percent });
  });

  autoUpdater.on('update-downloaded', (info) => {
    mainWindow?.webContents.send('updater:status', { status: 'update-downloaded' });
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

} // Close the else block for single instance lock

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
