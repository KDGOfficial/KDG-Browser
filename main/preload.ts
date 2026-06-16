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

  // Dialog API
  openImageDialog: () => ipcRenderer.invoke('dialog:openImage')
});
