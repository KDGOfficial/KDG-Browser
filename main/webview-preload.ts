// KDG Browser - Webview Preload Script
// Runs BEFORE page JavaScript in every webview.
// contextIsolation=false means we can directly modify window.

import { ipcRenderer } from 'electron';

(function () {
  const hostname = location.hostname;
  const isCWS = hostname.includes('chromewebstore.google.com') || hostname.includes('chrome.google.com');

  // Expose ipcRenderer for the did-finish-load injection script
  (window as any).ipcRenderer = ipcRenderer;

  // No CWS shims needed, electron-chrome-extensions handles it.
})();
