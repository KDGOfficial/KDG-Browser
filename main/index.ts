import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import { registerIpcHandlers } from './ipc-handlers';

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
    backgroundColor: '#0d0d12',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true // Allow rendering other websites in tabs
    },
    // Gamer title bar color/design
    titleBarStyle: 'default'
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

// Enable webview integration in modern Electron version
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (webviewEvent, webPreferences, params) => {
    // Enable standard security permissions on loaded webviews
    webPreferences.preload = path.join(__dirname, 'preload.cjs');
    webPreferences.nodeIntegration = false;
    webPreferences.contextIsolation = true;
  });
});

app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
