// KDG Browser - Webview Preload Script
// Runs BEFORE page JavaScript in every webview.
// contextIsolation is TRUE, so we use webFrame to inject shims into the Main World safely.

import { ipcRenderer, webFrame } from 'electron';

(function () {
  const hostname = location.hostname;
  const isCWS = hostname.includes('chromewebstore.google.com') || hostname.includes('chrome.google.com');

  if (!isCWS) return;

  // Listen for installation requests from the injected script
  window.addEventListener('kdg-install-extension', (e: any) => {
    const extId = e.detail;
    if (extId) {
      console.log('[KDG] Installing extension from CWS:', extId);
      ipcRenderer.send('kdg-install-extension', extId);
    }
  });

  // Execute the shim directly in the Main World so CWS scripts can access it
  webFrame.executeJavaScript(`
    (function () {
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

      function extractExtId(url) {
        const match = (url || location.href).match(/\\/([a-z]{32})(?:[/?#]|$)/i);
        return match ? match[1].toLowerCase() : null;
      }

      // Ensure window.chrome exists
      if (typeof window.chrome === 'undefined') {
        window.chrome = {};
      }
      const chrome = window.chrome;

      // Inject chrome.webstore and chrome.webstorePrivate
      chrome.webstore = {
        install: function (url, onSuccess, onFailure) {
          const extId = extractExtId(url);
          if (extId) {
            window.dispatchEvent(new CustomEvent('kdg-install-extension', { detail: extId }));
            if (typeof onSuccess === 'function') setTimeout(onSuccess, 300);
          } else {
            if (typeof onFailure === 'function') onFailure(-1, 'KDG: could not determine extension ID');
          }
        },
        onInstallStageChanged: { addListener: function () {}, removeListener: function () {}, hasListener: function () { return false; }, hasListeners: function () { return false; } },
        onDownloadProgress: { addListener: function () {}, removeListener: function () {}, hasListener: function () { return false; }, hasListeners: function () { return false; } }
      };

      chrome.webstorePrivate = {
        getExtensionStatus: function(id, cb) {
          if (typeof cb === 'function') cb('installable');
        },
        beginInstallWithManifest3: function(details, cb) {
          const id = details.id || extractExtId(location.href);
          if (id) {
            window.dispatchEvent(new CustomEvent('kdg-install-extension', { detail: id }));
          }
          if (typeof cb === 'function') cb('success');
        },
        completeInstall: function(id, cb) {
          if (typeof cb === 'function') cb();
        },
        getIsAuthor: function(cb) {
          if (typeof cb === 'function') cb(false);
        }
      };

      // Stub chrome.runtime so CWS doesn't break
      if (!chrome.runtime) {
        chrome.runtime = {
          id: undefined,
          connect: function () {
            return { onMessage: { addListener: function () {} }, postMessage: function () {}, disconnect: function () {} };
          },
          sendMessage: function () {},
          onMessage: { addListener: function () {}, removeListener: function () {} },
          getManifest: function () { return {}; },
          getURL: function (p) { return p; },
          lastError: undefined
        };
      }

      // Stub chrome.management (used by CWS to check if extension is already installed)
      if (!chrome.management) {
        chrome.management = {
          get: function (id, cb) {
            if (typeof cb === 'function') cb(undefined);
            if (chrome.runtime) chrome.runtime.lastError = { message: 'No such item.' };
          },
          getAll: function (cb) {
            if (typeof cb === 'function') cb([]);
          }
        };
      }

      console.log('[KDG Browser] chrome.webstore shim active — Chrome Web Store install enabled');
    })();
  `);
})();
