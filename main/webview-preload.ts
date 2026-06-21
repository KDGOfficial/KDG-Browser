// KDG Browser - Webview Preload Script
// Runs BEFORE page JavaScript in every webview.
// contextIsolation is TRUE, so we use webFrame to inject shims into the Main World safely.

import { ipcRenderer, webFrame } from 'electron';

(function () {
  const hostname = location.hostname;
  const isCWS = hostname.includes('chromewebstore.google.com') || hostname.includes('chrome.google.com');

  const CHROME_VERSION = '131';
  const CHROME_VERSION_FULL = '131.0.6778.205';

  // ── Universal spoof: runs for ALL pages ──────────────────────────────────
  // Electron does NOT spoof navigator.userAgentData even when you set a custom
  // User-Agent string. Sites like Figma check userAgentData.brands and see
  // "Chromium" (without "Google Chrome"), causing them to reject the browser.
  // We must inject this override into the Main World before page scripts run.
  webFrame.executeJavaScript(`
    (function () {
      var CHROME_VER = '${CHROME_VERSION}';
      var CHROME_VER_FULL = '${CHROME_VERSION_FULL}';

      var brands = [
        { brand: 'Not_A Brand',    version: '24' },
        { brand: 'Chromium',       version: CHROME_VER },
        { brand: 'Google Chrome',  version: CHROME_VER }
      ];
      var fullVersionList = [
        { brand: 'Not_A Brand',    version: '24.0.0.0' },
        { brand: 'Chromium',       version: CHROME_VER_FULL },
        { brand: 'Google Chrome',  version: CHROME_VER_FULL }
      ];
      var highEntropyData = {
        brands: brands,
        fullVersionList: fullVersionList,
        mobile: false,
        platform: 'Windows',
        uaFullVersion: CHROME_VER_FULL,
        architecture: 'x86',
        bitness: '64',
        model: '',
        platformVersion: '10.0.0',
        wow64: false
      };

      var uaDataObject = {
        brands: brands,
        mobile: false,
        platform: 'Windows',
        getHighEntropyValues: function(hints) {
          return Promise.resolve(highEntropyData);
        },
        toJSON: function() {
          return { brands: brands, mobile: false, platform: 'Windows' };
        }
      };

      try {
        Object.defineProperty(navigator, 'userAgentData', {
          get: function() { return uaDataObject; },
          configurable: true,
          enumerable: true
        });
      } catch(e) {}

      // Ensure navigator.webdriver is false (some bot-detection checks this)
      try {
        Object.defineProperty(navigator, 'webdriver', {
          get: function() { return false; },
          configurable: true
        });
      } catch(e) {}

      // Ensure vendor is correct
      try {
        Object.defineProperty(navigator, 'vendor', {
          get: function() { return 'Google Inc.'; },
          configurable: true
        });
      } catch(e) {}

    })();
  `).catch(function() {});

  // ── CWS-only: chrome.webstore API shim ───────────────────────────────────
  if (!isCWS) return;

  // Listen for installation requests from the injected script
  window.addEventListener('kdg-install-extension', (e: any) => {
    const extId = e.detail;
    if (extId) {
      console.log('[KDG] Installing extension from CWS:', extId);
      ipcRenderer.send('kdg-install-extension', extId);
    }
  });

  // Execute the CWS shim in the Main World
  webFrame.executeJavaScript(`
    (function () {
      function extractExtId(url) {
        var match = (url || location.href).match(/\\/([a-z]{32})(?:[/?#]|$)/i);
        return match ? match[1].toLowerCase() : null;
      }

      // Ensure window.chrome exists
      if (typeof window.chrome === 'undefined') {
        window.chrome = {};
      }
      var chrome = window.chrome;

      // Inject chrome.webstore and chrome.webstorePrivate
      chrome.webstore = {
        install: function (url, onSuccess, onFailure) {
          var extId = extractExtId(url);
          if (extId) {
            window.dispatchEvent(new CustomEvent('kdg-install-extension', { detail: extId }));
            if (typeof onSuccess === 'function') setTimeout(onSuccess, 300);
          } else {
            if (typeof onFailure === 'function') onFailure(-1, 'KDG: could not determine extension ID');
          }
        },
        onInstallStageChanged: { addListener: function () {}, removeListener: function () {}, hasListener: function () { return false; }, hasListeners: function () { return false; } },
        onDownloadProgress:    { addListener: function () {}, removeListener: function () {}, hasListener: function () { return false; }, hasListeners: function () { return false; } }
      };

      chrome.webstorePrivate = {
        getExtensionStatus: function(id, cb) {
          if (typeof cb === 'function') cb('installable');
        },
        beginInstallWithManifest3: function(details, cb) {
          var id = details.id || extractExtId(location.href);
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

      // Stub chrome.management
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
