// KDG Browser - Webview Preload Script
// Runs BEFORE page JavaScript in every webview.
// contextIsolation=false means we can directly modify window.

import { ipcRenderer } from 'electron';

(function () {
  const hostname = location.hostname;
  const isCWS = hostname.includes('chromewebstore.google.com') || hostname.includes('chrome.google.com');

  // Expose ipcRenderer for the did-finish-load injection script
  (window as any).ipcRenderer = ipcRenderer;

  if (!isCWS) return;

  // --- Chrome Web Store compatibility shim ---

  // Spoof userAgentData so CWS thinks we are Google Chrome 131
  Object.defineProperty(navigator, 'userAgentData', {
    get: () => ({
      brands: [
        { brand: 'Google Chrome', version: '131' },
        { brand: 'Chromium', version: '131' },
        { brand: 'Not_A Brand', version: '24' }
      ],
      mobile: false,
      platform: 'Windows'
    }),
    configurable: true
  });

  function installExtension(extId: string, onSuccess?: Function, onFailure?: Function) {
    if (!extId || !/^[a-z]{32}$/.test(extId)) {
      if (typeof onFailure === 'function') onFailure(-1, 'Invalid extension ID');
      return;
    }
    console.log('[KDG] Installing extension from CWS:', extId);
    ipcRenderer.send('kdg-install-extension', extId);
    if (typeof onSuccess === 'function') {
      setTimeout(() => onSuccess(), 300);
    }
  }

  function extractExtId(url: string): string | null {
    const match = (url || location.href).match(/\/([a-z]{32})(?:[/?#]|$)/i);
    return match ? match[1].toLowerCase() : null;
  }

  // Ensure window.chrome exists
  if (typeof (window as any).chrome === 'undefined') {
    (window as any).chrome = {};
  }
  const chrome = (window as any).chrome;

  // Inject chrome.webstore and chrome.webstorePrivate
  chrome.webstore = {
    install: function (url: string, onSuccess: Function, onFailure: Function) {
      const extId = extractExtId(url);
      if (extId) {
        installExtension(extId, onSuccess, onFailure);
      } else {
        if (typeof onFailure === 'function') onFailure(-1, 'KDG: could not determine extension ID');
      }
    },
    onInstallStageChanged: {
      addListener: function () {},
      removeListener: function () {},
      hasListener: function () { return false; },
      hasListeners: function () { return false; }
    },
    onDownloadProgress: {
      addListener: function () {},
      removeListener: function () {},
      hasListener: function () { return false; },
      hasListeners: function () { return false; }
    }
  };

  chrome.webstorePrivate = {
    getExtensionStatus: function(id: string, cb: Function) {
      if (typeof cb === 'function') cb('installable');
    },
    beginInstallWithManifest3: function(details: any, cb: Function) {
      const id = details.id || extractExtId(location.href);
      if (id) installExtension(id);
      if (typeof cb === 'function') cb('success');
    },
    completeInstall: function(id: string, cb: Function) {
      if (typeof cb === 'function') cb();
    },
    getIsAuthor: function(cb: Function) {
      if (typeof cb === 'function') cb(false);
    }
  };

  // Stub chrome.runtime so CWS doesn't break
  if (!chrome.runtime) {
    chrome.runtime = {
      id: undefined,
      connect: function () {
        return {
          onMessage: { addListener: function () {} },
          postMessage: function () {},
          disconnect: function () {}
        };
      },
      sendMessage: function () {},
      onMessage: { addListener: function () {}, removeListener: function () {} },
      getManifest: function () { return {}; },
      getURL: function (p: string) { return p; },
      lastError: undefined
    };
  }

  // Stub chrome.management (used by CWS to check if extension is already installed)
  if (!chrome.management) {
    chrome.management = {
      get: function (id: string, cb: Function) {
        // Simulate extension not installed
        if (typeof cb === 'function') cb(undefined);
        if (chrome.runtime) (chrome.runtime as any).lastError = { message: 'No such item.' };
      },
      getAll: function (cb: Function) {
        if (typeof cb === 'function') cb([]);
      }
    };
  }

  console.log('[KDG Browser] chrome.webstore shim active — Chrome Web Store install enabled');
})();
