import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Settings API
  getSettings: () => ipcRenderer.invoke('settings:get'),
  saveSettings: (settings: { geminiKey: string }) => ipcRenderer.invoke('settings:save', settings),

  // History API
  getHistory: () => ipcRenderer.invoke('history:get'),
  addHistory: (item: { url: string; title: string }) => ipcRenderer.invoke('history:add', item),
  clearHistory: () => ipcRenderer.invoke('history:clear'),

  // Bookmarks API
  getBookmarks: () => ipcRenderer.invoke('bookmarks:get'),
  toggleBookmark: (item: { url: string; title: string }) => ipcRenderer.invoke('bookmarks:toggle', item),

  // AI Gemini API
  generateAIContent: (payload: { prompt: string; systemInstruction?: string }) => 
    ipcRenderer.invoke('ai:generate', payload),

  // Default browser API
  isDefaultBrowser: () => ipcRenderer.invoke('browser:isDefault'),
  setDefaultBrowser: () => ipcRenderer.invoke('browser:setDefault'),

  // Bookmarks Import API
  importBookmarks: (type: 'chrome' | 'edge') => ipcRenderer.invoke('bookmarks:import', type),
  importBookmarksDialog: () => ipcRenderer.invoke('bookmarks:importDialog'),

  // Full Data Importer API
  getAvailableBrowsers: () => ipcRenderer.invoke('importer:getAvailableBrowsers'),
  runImport: (payload: { browserId: string; options: any }) => ipcRenderer.invoke('importer:runImport', payload),

  // Dialog API
  openImageDialog: () => ipcRenderer.invoke('dialog:openImage'),

  // Auto Updater API
  getVersion: () => ipcRenderer.invoke('updater:getVersion'),
  checkForUpdates: () => ipcRenderer.send('updater:check'),
  downloadUpdate: () => ipcRenderer.send('updater:download'),
  quitAndInstallUpdate: () => ipcRenderer.send('updater:quitAndInstall'),
  onUpdateStatus: (callback: (event: any, data: any) => void) => {
    ipcRenderer.removeAllListeners('updater:status');
    ipcRenderer.on('updater:status', callback);
  },

  // Downloads API
  onDownloadUpdate: (callback: (event: any, data: any) => void) => {
    // We do not remove all listeners here because multiple components might want to listen,
    // but in our app we only bind it once in App.jsx.
    ipcRenderer.removeAllListeners('download-update');
    ipcRenderer.on('download-update', callback);
  },
  openDownloadedFile: (filePath: string) => ipcRenderer.invoke('download:openFolder', filePath),

  // Window Controls
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  closeWindow: () => ipcRenderer.send('window:close'),

  // Extensions API
  getExtensions: () => ipcRenderer.invoke('extensions:getList'),
  loadUnpackedExtension: () => ipcRenderer.invoke('extensions:loadUnpacked'),
  removeExtension: (id: string) => ipcRenderer.invoke('extensions:remove', id),
  installExtensionFromCWS: (extensionId: string) => ipcRenderer.invoke('extensions:installFromCWS', extensionId),
  onExtensionInstalling: (callback: (event: any, data: any) => void) => {
    ipcRenderer.removeAllListeners('extension:installing');
    ipcRenderer.on('extension:installing', callback);
  }
});
