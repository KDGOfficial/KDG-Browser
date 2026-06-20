import { app, BrowserWindow, Menu, ipcMain, session, dialog, net } from 'electron';
import path from 'path';
import os from 'os';
import fs from 'fs';
import crypto from 'crypto';
import { registerIpcHandlers } from './ipc-handlers';
import { autoUpdater } from 'electron-updater';
import { ElectronBlocker } from '@cliqz/adblocker-electron';
import fetch from 'cross-fetch';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

// --- CRX Extension Installer ---
// Extracts and installs a .crx file (which is a ZIP with a special header)
async function installCrxExtension(crxBuffer: Buffer, extensionsDir: string, extId: string): Promise<{ success: boolean; name?: string; error?: string }> {
  try {
    const AdmZip = require('adm-zip');
    
    // CRX3 format: starts with magic bytes "Cr24" followed by version (4 bytes) and header size (4 bytes)
    // We need to skip the CRX header to get to the ZIP data
    let zipStart = 0;
    const magic = crxBuffer.toString('utf8', 0, 4);
    
    if (magic === 'Cr24') {
      // CRX3 format
      const version = crxBuffer.readUInt32LE(4);
      if (version === 3) {
        const headerSize = crxBuffer.readUInt32LE(8);
        zipStart = 12 + headerSize;
      } else if (version === 2) {
        const pubKeyLen = crxBuffer.readUInt32LE(8);
        const signatureLen = crxBuffer.readUInt32LE(12);
        zipStart = 16 + pubKeyLen + signatureLen;
      }
    } else {
      // Maybe it's already a ZIP (some extensions are distributed as ZIP)
      zipStart = 0;
    }
    
    const zipBuffer = crxBuffer.slice(zipStart);
    const zip = new AdmZip(zipBuffer);
    
    // Extract to extensions directory
    const destPath = path.join(extensionsDir, extId);
    if (fs.existsSync(destPath)) {
      fs.rmSync(destPath, { recursive: true, force: true });
    }
    fs.mkdirSync(destPath, { recursive: true });
    zip.extractAllTo(destPath, true);
    
    // Read name from manifest
    let extName = extId;
    const manifestPath = path.join(destPath, 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        extName = manifest.name || extId;
      } catch {}
    }
    
    // Load extension in both sessions
    await session.defaultSession.loadExtension(destPath, { allowFileAccess: true });
    try {
      await session.fromPartition('persist:kdg').loadExtension(destPath, { allowFileAccess: true });
    } catch {}
    
    console.log('[Extensions] Installed CRX extension:', extName);
    return { success: true, name: extName };
  } catch (error: any) {
    console.error('[Extensions] Failed to install CRX:', error);
    return { success: false, error: error.message };
  }
}

// Download CRX from Chrome Web Store
async function downloadCrxFromCWS(extensionId: string): Promise<Buffer | null> {
  // CWS CRX download URL format
  const CHROME_VERSION = '131.0.6778.205';
  const crxUrl = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=${CHROME_VERSION}&acceptformat=crx2,crx3&x=id%3D${extensionId}%26uc`;
  
  try {
    const response = await fetch(crxUrl, {
      headers: {
        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME_VERSION} Safari/537.36`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error: any) {
    console.error('[Extensions] Failed to download CRX:', error);
    return null;
  }
}

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
    // Use our webview-specific preload (injects chrome.webstore before page loads)
    webPreferences.preload = path.join(__dirname, 'webview-preload.cjs');
    webPreferences.nodeIntegration = false;
    webPreferences.contextIsolation = false; // Must be false for preload to access window directly on CWS
    webPreferences.sandbox = false; // Must be false to allow preload
    webPreferences.webSecurity = true;
  });

  // Handle webview after it's attached
  contents.on('did-attach-webview', (attachEvent, webviewContents) => {
    const CHROME_VERSION = '131.0.6778.205'; // Override for Chrome Web Store compatibility
    const CHROME_UA = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME_VERSION} Safari/537.36`;
    webviewContents.setUserAgent(CHROME_UA);

    // Listen for IPC messages from our webview preload
    webviewContents.ipc.on('kdg-install-extension', async (ipcEvent, extId: string) => {
      console.log('[Extensions] Install request from CWS webview:', extId);
      const extensionsDir = path.join(app.getPath('userData'), 'Extensions');
      if (mainWindow) mainWindow.webContents.send('extension:installing', { id: extId, status: 'downloading' });
      const crxBuffer = await downloadCrxFromCWS(extId);
      if (!crxBuffer) {
        if (mainWindow) mainWindow.webContents.send('extension:installing', { id: extId, status: 'error', error: 'Не удалось скачать расширение' });
        return;
      }
      const result = await installCrxExtension(crxBuffer, extensionsDir, extId);
      if (mainWindow) {
        mainWindow.webContents.send('extension:installing', {
          id: extId,
          status: result.success ? 'installed' : 'error',
          name: result.name,
          error: result.error
        });
      }
    });

    webviewContents.on('did-finish-load', () => {
      const url = webviewContents.getURL();
      if (url.includes('chromewebstore.google.com') || url.includes('chrome.google.com/webstore')) {
        // Inject our custom install button and fix the CWS page
        webviewContents.executeJavaScript(`
          (function() {
            // ── 1. Ensure chrome.webstore exists (for scripts that check it) ──
            if (typeof window.chrome === 'undefined') window.chrome = {};
            if (!window.chrome.webstore) {
              window.chrome.webstore = {
                install: function(url, onSuccess, onFailure) {
                  var m = (url || location.href).match(/\/([a-z]{32})(?:[/?#]|$)/i);
                  var extId = m ? m[1].toLowerCase() : null;
                  if (extId) {
                    window.__kdgTriggerInstall(extId);
                    if (typeof onSuccess === 'function') setTimeout(onSuccess, 200);
                  } else if (typeof onFailure === 'function') {
                    onFailure(-1, 'KDG: no ID');
                  }
                },
                onInstallStageChanged: { addListener: function(){}, removeListener: function(){}, hasListener: function(){ return false; } },
                onDownloadProgress: { addListener: function(){}, removeListener: function(){}, hasListener: function(){ return false; } }
              };
            }

            // ── 2. Extract extension ID from page URL ──
            var extIdMatch = location.href.match(/\/([a-z]{32})(?:[/?#]|$)/i);
            var extId = extIdMatch ? extIdMatch[1].toLowerCase() : null;

            // ── 3. IPC trigger function ──
            window.__kdgTriggerInstall = function(id) {
              if (window.ipcRenderer) {
                window.ipcRenderer.send('kdg-install-extension', id || extId);
              } else {
                window.postMessage({ type: '__KDG_INSTALL_EXT__', extId: id || extId }, '*');
              }
            };

            // ── 4. Inject KDG Install button if not already added ──
            if (!document.getElementById('kdg-install-btn') && extId) {
              var style = document.createElement('style');
              style.textContent = [
                '#kdg-install-banner { position:fixed; bottom:20px; right:20px; z-index:999999;',
                '  background:linear-gradient(135deg,#7c3aed,#4f46e5); color:#fff;',
                '  border-radius:12px; padding:14px 20px; box-shadow:0 8px 32px rgba(79,70,229,.5);',
                '  display:flex; align-items:center; gap:12px; font-family:sans-serif; font-size:14px; }',
                '#kdg-install-btn { background:rgba(255,255,255,.2); border:1px solid rgba(255,255,255,.4);',
                '  color:#fff; padding:8px 16px; border-radius:8px; cursor:pointer; font-size:13px;',
                '  font-weight:600; transition:all .2s; }',
                '#kdg-install-btn:hover { background:rgba(255,255,255,.35); transform:scale(1.03); }',
                '#kdg-install-close { background:none; border:none; color:rgba(255,255,255,.7);',
                '  cursor:pointer; font-size:18px; line-height:1; padding:0 4px; }'
              ].join(' ');
              document.head.appendChild(style);

              var banner = document.createElement('div');
              banner.id = 'kdg-install-banner';
              banner.innerHTML = [
                '<span>🎮 <strong>KDG Browser</strong></span>',
                '<button id="kdg-install-btn" onclick="window.__kdgTriggerInstall(\'' + extId + '\')" >',
                '  ⬇ Установить расширение',
                '</button>',
                '<button id="kdg-install-close" onclick="this.parentElement.remove()">✕</button>'
              ].join('');
              document.body.appendChild(banner);
            }

            // ── 5. Wire postMessage listener for fallback ──
            if (!window.__kdgMsgListenerSet) {
              window.__kdgMsgListenerSet = true;
              window.addEventListener('message', function(e) {
                if (e.data && e.data.type === '__KDG_INSTALL_EXT__' && e.data.extId && window.ipcRenderer) {
                  window.ipcRenderer.send('kdg-install-extension', e.data.extId);
                }
              });
            }
          })();
        `).catch(() => {});
      }
    });
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
    // Chrome User-Agent for webview session (hides "Electron" from sites like Chrome Web Store)
    const CHROME_VERSION = '131.0.6778.205'; // Override for Chrome Web Store compatibility
    const CHROME_UA = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME_VERSION} Safari/537.36`;
    session.fromPartition('persist:kdg').setUserAgent(CHROME_UA);

    // CSP: only enforce for our own app shell (defaultSession), NOT for external web pages in webview
    // Overriding CSP for external sites breaks them (especially Chrome Web Store)
    session.defaultSession.webRequest.onHeadersReceived((details: any, callback: any) => {
      // Only apply CSP to our own pages, not external URLs
      const url = details.url || '';
      if (url.startsWith('http://localhost') || url.startsWith('kdg://') || url.startsWith('file://')) {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': ["default-src 'self' 'unsafe-inline' 'unsafe-eval' https: wss: kdg:; object-src 'none'"]
          }
        });
      } else {
        callback({ responseHeaders: details.responseHeaders });
      }
    });

    // For webview session: strip X-Frame-Options and CSP to allow sites to load,
    // and inject chrome.webstore stub on Chrome Web Store pages
    session.fromPartition('persist:kdg').webRequest.onHeadersReceived((details: any, callback: any) => {
      const responseHeaders = { ...details.responseHeaders };
      // Remove headers that can block content in webview
      delete responseHeaders['x-frame-options'];
      delete responseHeaders['X-Frame-Options'];
      delete responseHeaders['content-security-policy'];
      delete responseHeaders['Content-Security-Policy'];
      delete responseHeaders['content-security-policy-report-only'];
      callback({ responseHeaders });
    });

    // Spoof sec-ch-ua headers to bypass Chrome Web Store blocking
    const applySecChUaSpoofing = (ses: any) => {
      ses.webRequest.onBeforeSendHeaders((details: any, callback: any) => {
        details.requestHeaders['User-Agent'] = CHROME_UA;
        details.requestHeaders['sec-ch-ua'] = '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"';
        details.requestHeaders['sec-ch-ua-mobile'] = '?0';
        details.requestHeaders['sec-ch-ua-platform'] = '"Windows"';
        callback({ requestHeaders: details.requestHeaders });
      });
    };
    
    applySecChUaSpoofing(session.defaultSession);
    applySecChUaSpoofing(session.fromPartition('persist:kdg'));

    // Inject chrome.webstore compatibility shim on Chrome Web Store pages
    session.fromPartition('persist:kdg').webRequest.onBeforeRequest(
      { urls: ['https://chromewebstore.google.com/*', 'https://chrome.google.com/webstore/*'] },
      (details, callback) => { callback({}); }
    );


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
  autoUpdater.allowPrerelease = false;
  autoUpdater.allowDowngrade = false;
  autoUpdater.logger = console as any;

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
            await session.defaultSession.loadExtension(extPath, { allowFileAccess: true });
            try { await session.fromPartition('persist:kdg').loadExtension(extPath, { allowFileAccess: true }); } catch {}
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

  // --- Intercept CRX downloads from Chrome Web Store ---
  // This allows installing extensions directly from CWS by catching the download intent
  const handleCwsDownload = async (ses: Electron.Session) => {
    ses.on('will-download', async (event, item, webContents) => {
      const url = item.getURL();
      const mimeType = item.getMimeType();
      const filename = item.getFilename();
      
      // Detect CRX files (Chrome extensions)
      if (
        filename.endsWith('.crx') || 
        mimeType === 'application/x-chrome-extension' ||
        url.includes('clients2.google.com') && url.includes('crx')
      ) {
        event.preventDefault();
        
        // Extract extension ID from URL or filename
        let extId = filename.replace('.crx', '');
        const idMatch = url.match(/id%3D([a-z]{32})/i) || url.match(/id=([a-z]{32})/i);
        if (idMatch) extId = idMatch[1];
        
        // Notify UI that installation is starting
        if (mainWindow) {
          mainWindow.webContents.send('extension:installing', { id: extId, status: 'downloading' });
        }
        
        // Download the CRX ourselves using the direct Google endpoint
        const crxBuffer = await downloadCrxFromCWS(extId);
        if (!crxBuffer) {
          if (mainWindow) mainWindow.webContents.send('extension:installing', { id: extId, status: 'error', error: 'Не удалось скачать расширение' });
          return;
        }
        
        const result = await installCrxExtension(crxBuffer, extensionsDir, extId);
        if (mainWindow) {
          mainWindow.webContents.send('extension:installing', { 
            id: extId, 
            status: result.success ? 'installed' : 'error',
            name: result.name,
            error: result.error
          });
        }
      }
    });
  };
  
  handleCwsDownload(session.defaultSession);
  handleCwsDownload(session.fromPartition('persist:kdg'));

  // --- IPC: Install extension from Chrome Web Store by ID ---
  ipcMain.handle('extensions:installFromCWS', async (_, extensionId: string) => {
    if (!extensionId || typeof extensionId !== 'string') {
      return { success: false, error: 'Неверный ID расширения' };
    }
    
    const cleanId = extensionId.trim().toLowerCase();
    if (!/^[a-z]{32}$/.test(cleanId)) {
      return { success: false, error: 'Неверный формат ID расширения (должно быть 32 строчных латинских символа)' };
    }
    
    if (mainWindow) mainWindow.webContents.send('extension:installing', { id: cleanId, status: 'downloading' });
    
    const crxBuffer = await downloadCrxFromCWS(cleanId);
    if (!crxBuffer) {
      return { success: false, error: 'Не удалось скачать расширение с Chrome Web Store. Проверьте ID расширения и интернет-соединение.' };
    }
    
    const result = await installCrxExtension(crxBuffer, extensionsDir, cleanId);
    if (mainWindow && result.success) {
      mainWindow.webContents.send('extension:installing', { id: cleanId, status: 'installed', name: result.name });
    }
    return result;
  });

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
      fs.cpSync(extPath, destPath, { recursive: true });
      await session.defaultSession.loadExtension(destPath, { allowFileAccess: true });
      try { await session.fromPartition('persist:kdg').loadExtension(destPath, { allowFileAccess: true }); } catch {}
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
      // Also remove from disk
      const extPath = path.join(extensionsDir, id);
      session.defaultSession.removeExtension(id);
      try { session.fromPartition('persist:kdg').removeExtension(id); } catch {}
      if (fs.existsSync(extPath)) {
        fs.rmSync(extPath, { recursive: true, force: true });
      }
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
