import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrainCircuit, Settings as SettingsIcon, X } from 'lucide-react';
import { Header }        from './components/Header';
import { Navigation }    from './components/Navigation';
import { Home }          from './pages/Home';
import { Search }        from './pages/Search';
import { Favorites }     from './pages/Favorites';
import { AIAnalysis }    from './pages/AIAnalysis';
import { AIAssistant }   from './components/AIAssistant';
import { DownloadsPanel } from './components/DownloadsPanel';
import { History }        from './pages/History';
import { Settings }       from './pages/Settings';
import { Downloads }      from './pages/Downloads';
import { Extensions }     from './pages/Extensions';
import { UpdateOverlay }  from './components/UpdateOverlay';
import { MigrationWizardOverlay } from './components/MigrationWizardOverlay';

const BROWSER_VERSION = '4.0.0-alpha.7';

export default function App() {
  const electronAPI = window.electronAPI;

  // ── Settings State ───────────────────────────────────────────────
  const [settings, setSettings] = useState({
    geminiKey: 'AIzaSyDRUFM-LnQZY87nYNL3VpMJtTGxVNd0yqU',
    searchEngine: 'google',
    theme: 'dark',
    homepage: 'kdg://home',
    hasPromptedDefault: false,
    hasCompletedMigration: false,
    memorySaver: true
  });

  // ── Tabs ────────────────────────────────────────────────────────
  const [tabs, setTabs] = useState([
    {
      id: 'tab-1',
      title: 'KDG Browser',
      url: 'kdg://home',
      webviewUrl: 'about:blank',
      canGoBack: false,
      canGoForward: false,
      activeDashboardSection: 'home'
    }
  ]);
  const [activeTabId, setActiveTabId]     = useState('tab-1');
  const [addressValue, setAddressValue]   = useState('kdg://home');
  const [isLoading, setIsLoading]         = useState(false);

  // ── UI panels ────────────────────────────────────────────────────
  const [isAiOpen,       setIsAiOpen]       = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [showDefaultBanner, setShowDefaultBanner] = useState(false);
  const [showUpdateCheck,   setShowUpdateCheck]   = useState(true);
  const [showMigrationWizard, setShowMigrationWizard] = useState(false);

  // ── Data ─────────────────────────────────────────────────────────
  const [bookmarkedUrls, setBookmarkedUrls] = useState([]);
  const [downloads,      setDownloads]      = useState([]);

  // Webview refs
  const webviewRefs = useRef({});
  const initializedWebviews = useRef(new WeakSet());

  const activeTabIdRef = useRef(activeTabId);
  useEffect(() => {
    activeTabIdRef.current = activeTabId;
    
    // Notify main process for electron-chrome-extensions
    setTimeout(() => {
      const wv = webviewRefs.current[activeTabId];
      if (wv && wv.getWebContentsId && electronAPI?.setActiveTab) {
        try {
          electronAPI.setActiveTab(wv.getWebContentsId());
        } catch (e) {}
      }
    }, 100);
  }, [activeTabId, electronAPI]);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  // ── Initial load ─────────────────────────────────────────────────
  useEffect(() => {
    async function loadInitialData() {
      if (electronAPI) {
        try {
          const loadedSettings = await electronAPI.getSettings();
          if (loadedSettings) {
            setSettings(prev => ({ ...prev, ...loadedSettings }));
            if (loadedSettings.hasCompletedMigration === undefined || loadedSettings.hasCompletedMigration === false) {
              setShowMigrationWizard(true);
            }
          }

          const bookmarks = await electronAPI.getBookmarks();
          if (bookmarks) setBookmarkedUrls(bookmarks.map(b => b.url));
        } catch (e) {
          console.error('Failed to load settings:', e);
        }
      }
    }
    loadInitialData();

    // Setup Downloads Listener
    if (electronAPI?.onDownloadUpdate) {
      electronAPI.onDownloadUpdate((event, data) => {
        setDownloads(prev => {
          const exists = prev.findIndex(d => d.id === data.id);
          if (exists >= 0) {
            const copy = [...prev];
            copy[exists] = { ...copy[exists], ...data };
            return copy;
          }
          // If it's a new download, automatically open the panel
          setIsDownloadsOpen(true);
          return [{ ...data }, ...prev];
        });
      });
    }
  }, [electronAPI]);

  // ── Theme Apply Effect ───────────────────────────────────────────
  useEffect(() => {
    // Apply theme to document body
    document.body.className = `theme-${settings.theme}`;
  }, [settings.theme]);

  // ── Default Browser Banner Check ─────────────────────────────────
  useEffect(() => {
    async function checkDefaultBrowser() {
      if (electronAPI?.isDefaultBrowser && settings.hasPromptedDefault === false) {
        try {
          const isDefault = await electronAPI.isDefaultBrowser();
          if (!isDefault) {
            setShowDefaultBanner(true);
          }
        } catch (e) {
          console.error('Failed to check default browser:', e);
        }
      }
    }
    // Small delay to allow initial settings load
    const timer = setTimeout(checkDefaultBrowser, 1500);
    return () => clearTimeout(timer);
  }, [electronAPI, settings.hasPromptedDefault]);

  const handleMakeDefault = async () => {
    if (electronAPI?.setDefaultBrowser) {
      await electronAPI.setDefaultBrowser();
      setShowDefaultBanner(false);
      const updated = { ...settings, hasPromptedDefault: true };
      await electronAPI.saveSettings(updated);
      setSettings(updated);
    }
  };

  const handleDismissDefault = async () => {
    setShowDefaultBanner(false);
    const updated = { ...settings, hasPromptedDefault: true };
    if (electronAPI?.saveSettings) {
      await electronAPI.saveSettings(updated);
    }
    setSettings(updated);
  };

  // ── Sync address bar ─────────────────────────────────────────────
  useEffect(() => {
    if (activeTab) setAddressValue(activeTab.url);
  }, [activeTabId, activeTab?.url]);

  // ── Keyboard shortcuts ───────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey) {
        if (e.key === 't') { e.preventDefault(); handleAddTab(); }
        if (e.key === 'w') { e.preventDefault(); if (tabs.length > 1) handleCloseTab(activeTabId, e); }
        if (e.key === 'd') { e.preventDefault(); handleToggleBookmark(); }
        if (e.key === 'j') { e.preventDefault(); setIsDownloadsOpen(v => !v); }
        if (e.key === ',') { e.preventDefault(); setDashboardSection('settings'); }
        if (e.key === 'l') { e.preventDefault(); document.querySelector('.address-bar-input')?.focus(); }
        if (e.key === 'r') { e.preventDefault(); handleRefresh(); }
        
        // Ctrl+1..8 — switch tabs
        const num = parseInt(e.key);
        if (num >= 1 && num <= 8 && tabs[num - 1]) {
          e.preventDefault();
          setActiveTabId(tabs[num - 1].id);
        }
        if (e.key === '9') {
          e.preventDefault();
          setActiveTabId(tabs[tabs.length - 1].id);
        }
      }
      if (e.key === 'F5') { e.preventDefault(); handleRefresh(); }
      if (e.key === 'F6') { e.preventDefault(); document.querySelector('.address-bar-input')?.focus(); }
      if (e.key === 'F12') {
        e.preventDefault();
        const wv = webviewRefs.current[activeTabId];
        if (wv && wv.isDevToolsOpened) {
          if (wv.isDevToolsOpened()) wv.closeDevTools();
          else wv.openDevTools();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tabs, activeTabId, settings]);

  // ── Tab management ───────────────────────────────────────────────
  const handleAddTab = useCallback(() => {
    const newId = `tab-${Math.random().toString(36).slice(2, 9)}`;
    const url = settings.homepage || 'kdg://home';
    const newTab = {
      id: newId,
      title: 'Новая вкладка',
      url: url,
      webviewUrl: url.startsWith('kdg://') ? 'about:blank' : url,
      canGoBack: false,
      canGoForward: false,
      activeDashboardSection: 'home'
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
  }, [settings.homepage]);

  const handleCloseTab = useCallback((id, e) => {
    e?.stopPropagation();
    setTabs(prev => {
      if (prev.length === 1) return prev;
      const idx = prev.findIndex(t => t.id === id);
      const next = prev.filter(t => t.id !== id);
      if (id === activeTabId) {
        const nextIdx = idx === 0 ? 0 : idx - 1;
        setActiveTabId(next[nextIdx].id);
      }
      delete webviewRefs.current[id];
      return next;
    });
  }, [activeTabId]);

  // ── Navigation ───────────────────────────────────────────────────
  const handleNavigate = useCallback((url, newTitle) => {
    let clean = url.trim();
    let activeSec = 'home';
    let title = newTitle || clean;

    if (clean.startsWith('kdg://')) {
      if (clean === 'kdg://settings') {
        activeSec = 'settings';
        title = 'Настройки';
      } else if (clean === 'kdg://home') {
        activeSec = 'home';
        title = 'KDG Browser';
      } else if (clean.startsWith('kdg://video/')) {
        activeSec = 'home';
      }
    } else {
      const isExplicitUrl = /^(https?:\/\/)/i.test(clean);
      const isImplicitUrl = /^([\da-z.-]+)\.([a-z.]{2,6})([/\w .?&=%#-]*)*\/?$/i.test(clean);
      const isIp = /^(https?:\/\/)?(localhost|127\.0\.0\.1|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/.*)?$/i.test(clean);

      if (!isExplicitUrl && !isImplicitUrl && !isIp) {
        let searchUrl = 'https://www.google.com/search?q=';
        if (settings.searchEngine === 'yandex') searchUrl = 'https://yandex.ru/search/?text=';
        else if (settings.searchEngine === 'bing') searchUrl = 'https://www.bing.com/search?q=';
        else if (settings.searchEngine === 'duckduckgo') searchUrl = 'https://duckduckgo.com/?q=';
        clean = `${searchUrl}${encodeURIComponent(clean)}`;
      } else if (!isExplicitUrl) {
        clean = `https://${clean}`;
      }
    }

    setTabs(prev => prev.map(t =>
      t.id === activeTabId
        ? { 
            ...t, 
            url: clean, 
            webviewUrl: clean.startsWith('kdg://') ? (t.webviewUrl || 'about:blank') : clean,
            title: title, 
            activeDashboardSection: clean.startsWith('kdg://') ? activeSec : t.activeDashboardSection,
            activeVideo: clean.startsWith('kdg://') ? t.activeVideo : undefined 
          }
        : t
    ));

    if (!clean.startsWith('kdg://') && electronAPI) {
      electronAPI.addHistory({ url: clean, title: title }).catch(console.error);
    }
  }, [activeTabId, electronAPI, settings.searchEngine]);

  const handleAddressSubmit = (e) => { e.preventDefault(); handleNavigate(addressValue); };

  const handleGoBack = () => { 
    if (activeTab.url.startsWith('kdg://')) {
      if (activeTab.webviewUrl && activeTab.webviewUrl !== 'about:blank') {
        setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, url: t.webviewUrl, activeDashboardSection: undefined, activeVideo: undefined } : t));
      } else if (activeTab.url !== 'kdg://home') {
        setDashboardSection('home');
      }
      return;
    }
    const wv = webviewRefs.current[activeTabId]; 
    if (wv?.canGoBack()) wv.goBack(); 
  };
  const handleGoForward = () => { 
    if (activeTab.url.startsWith('kdg://')) return;
    const wv = webviewRefs.current[activeTabId]; 
    if (wv?.canGoForward()) wv.goForward(); 
  };
  const handleRefresh   = () => {
    const wv = webviewRefs.current[activeTabId];
    if (wv) { if (isLoading) wv.stop(); else wv.reload(); }
    else handleNavigate(activeTab.url, activeTab.title);
  };
  const handleGoHome = () => {
    handleNavigate(settings.homepage || 'kdg://home', 'KDG Browser');
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, activeDashboardSection: 'home', activeVideo: undefined } : t));
  };

  // ── Bookmarks ────────────────────────────────────────────────────
  const handleToggleBookmark = async () => {
    if (!electronAPI) return;
    try {
      const bookmarks = await electronAPI.toggleBookmark({ url: activeTab.url, title: activeTab.title || activeTab.url });
      if (bookmarks) setBookmarkedUrls(bookmarks.map(b => b.url));
    } catch (err) { console.error(err); }
  };

  // ── Settings Save ────────────────────────────────────────────────
  const handleSaveSettings = async (newSettings) => {
    if (!electronAPI) return;
    try {
      await electronAPI.saveSettings(newSettings);
      setSettings(newSettings);
    } catch (e) { console.error(e); }
  };

  // ── Video select ─────────────────────────────────────────────────
  const handleSelectVideo = (video, autoOpenAI = false) => {
    setTabs(prev => prev.map(t =>
      t.id === activeTabId
        ? { ...t, url: `kdg://video/${video.id}`, webviewUrl: t.webviewUrl || 'about:blank', title: `KDG: ${video.title}`, activeVideo: video }
        : t
    ));
    if (autoOpenAI) setIsAiOpen(true);
  };

  const setDashboardSection = (sec) => {
    setTabs(prev => prev.map(t =>
      t.id === activeTabId
        ? { 
            ...t, 
            activeDashboardSection: sec, 
            url: sec === 'settings' ? 'kdg://settings' : 'kdg://home', 
            webviewUrl: t.webviewUrl || 'about:blank',
            activeVideo: undefined,
            title: sec === 'settings' ? 'Настройки' : 'KDG Browser'
          }
        : t
    ));
  };

  // ── Page Context Extraction for Cometa ────────────────────────────
  const getActivePageContext = async () => {
    const activeWv = webviewRefs.current[activeTabId];
    if (!activeWv || activeTab.url.startsWith('kdg://')) {
      return null;
    }
    try {
      const url = activeTab.url;
      const title = activeTab.title || await activeWv.executeJavaScript('document.title');
      const content = await activeWv.executeJavaScript('document.body.innerText');
      const selection = await activeWv.executeJavaScript('window.getSelection().toString()');
      return { url, title, content, selection };
    } catch (err) {
      console.error('Error getting webview page context:', err);
      return {
        url: activeTab.url,
        title: activeTab.title,
        content: '',
        selection: ''
      };
    }
  };

  // ── Memory Saver (Sleeping Tabs) ─────────────────────────────────
  useEffect(() => {
    setTabs(prev => prev.map(t => 
      t.id === activeTabId ? { ...t, lastActive: Date.now(), isSleeping: false } : t
    ));
  }, [activeTabId]);

  useEffect(() => {
    if (!settings.memorySaver) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setTabs(prev => prev.map(t => {
        if (t.id === activeTabId || t.isSleeping || !t.lastActive) return t;
        // Усыпляем вкладку после 5 минут неактивности
        if (now - t.lastActive > 5 * 60 * 1000) {
          console.log(`Tab ${t.id} went to sleep to save memory`);
          return { ...t, isSleeping: true };
        }
        return t;
      }));
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [settings.memorySaver, activeTabId]);

  // ── Webview listeners ────────────────────────────────────────────
  const handleWebviewRef = useCallback((id, el) => {
    if (!el) return;
    if (initializedWebviews.current.has(el)) {
      if (webviewRefs.current[id] !== el) webviewRefs.current[id] = el;
      return;
    }
    initializedWebviews.current.add(el);
    webviewRefs.current[id] = el;

    el.addEventListener('did-start-loading',  () => { if (id === activeTabIdRef.current) setIsLoading(true);  });
    el.addEventListener('did-stop-loading',   () => { if (id === activeTabIdRef.current) setIsLoading(false); });
    el.addEventListener('did-finish-load',    () => { if (id === activeTabIdRef.current) setIsLoading(false); });

    el.addEventListener('did-navigate', (e) => {
      setTabs(prev => prev.map(t => {
        if (t.id !== id) return t;
        // Only redirect to home on about:blank; don't redirect on chrome-error during
        // intermediate auth redirects (e.g. Figma OAuth flow) to avoid reload loop
        if (e.url === 'about:blank') {
          return { ...t, url: 'kdg://home', webviewUrl: 'about:blank', canGoBack: false };
        }
        if (e.url === 'chrome-error://chromewebdata/') {
          // Keep the current URL, just mark as errored — don't redirect to home
          return { ...t, canGoBack: el.canGoBack(), canGoForward: el.canGoForward() };
        }
        if (t.url.startsWith('kdg://')) {
          return { ...t, webviewUrl: e.url, canGoBack: el.canGoBack(), canGoForward: el.canGoForward() };
        }
        return { ...t, url: e.url, webviewUrl: e.url, canGoBack: el.canGoBack(), canGoForward: el.canGoForward() };
      }));
      if (electronAPI && !e.url.startsWith('about:blank') && e.url !== 'chrome-error://chromewebdata/') {
        electronAPI.addHistory({ url: e.url, title: el.getTitle() || e.url }).catch(console.error);
      }
    });

    el.addEventListener('did-navigate-in-page', (e) => {
      setTabs(prev => prev.map(t => {
        if (t.id !== id) return t;
        if (e.url === 'about:blank') {
          return { ...t, url: 'kdg://home', webviewUrl: 'about:blank', canGoBack: false };
        }
        if (e.url === 'chrome-error://chromewebdata/') {
          return { ...t, canGoBack: el.canGoBack(), canGoForward: el.canGoForward() };
        }
        if (t.url.startsWith('kdg://')) {
          return { ...t, webviewUrl: e.url, canGoBack: el.canGoBack(), canGoForward: el.canGoForward() };
        }
        return { ...t, url: e.url, webviewUrl: e.url, canGoBack: el.canGoBack(), canGoForward: el.canGoForward() };
      }));
    });

    el.addEventListener('page-title-updated', (e) => {
      setTabs(prev => prev.map(t => t.id === id ? { ...t, title: e.title } : t));
    });

    el.addEventListener('page-favicon-updated', (e) => {
      if (e.favicons?.[0]) {
        setTabs(prev => prev.map(t => t.id === id ? { ...t, favicon: e.favicons[0] } : t));
      }
    });

    // Handle targeting of clicks trying to open new windows
    el.addEventListener('new-window', (e) => {
      e.preventDefault();
      const newId = `tab-${Math.random().toString(36).slice(2, 9)}`;
      const newTab = {
        id: newId,
        title: 'Загрузка...',
        url: e.url,
        webviewUrl: e.url.startsWith('kdg://') ? 'about:blank' : e.url,
        canGoBack: false,
        canGoForward: false,
        activeDashboardSection: 'home'
      };
      setTabs(prev => [...prev, newTab]);
      setActiveTabId(newId);
    });

    // Download support
    el.addEventListener('will-download', () => {
      setIsDownloadsOpen(true);
    });
  }, [activeTabId, electronAPI]);

  const isBookmarked = bookmarkedUrls.includes(activeTab?.url);

  const currentCanGoBack = activeTab?.url.startsWith('kdg://') 
    ? (activeTab?.url !== 'kdg://home' || (activeTab?.webviewUrl && activeTab?.webviewUrl !== 'about:blank')) 
    : activeTab?.canGoBack;
    
  const currentCanGoForward = activeTab?.url.startsWith('kdg://')
    ? false
    : activeTab?.canGoForward;

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        tabs={tabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
        handleAddTab={handleAddTab}
        handleCloseTab={handleCloseTab}
        addressValue={addressValue}
        setAddressValue={setAddressValue}
        handleAddressSubmit={handleAddressSubmit}
        handleGoBack={handleGoBack}
        handleGoForward={handleGoForward}
        handleRefresh={handleRefresh}
        handleGoHome={handleGoHome}
        activeTab={{ ...activeTab, canGoBack: currentCanGoBack, canGoForward: currentCanGoForward }}
        isLoading={isLoading}
        isAiOpen={isAiOpen}
        setIsAiOpen={setIsAiOpen}
        setIsSettingsOpen={() => {
          if (activeTab.activeDashboardSection === 'settings') {
            handleGoBack();
          } else {
            setDashboardSection('settings');
          }
        }}
        isBookmarked={isBookmarked}
        handleToggleBookmark={handleToggleBookmark}
        isDownloadsOpen={isDownloadsOpen}
        setIsDownloadsOpen={setIsDownloadsOpen}
        downloadCount={downloads.filter(d => d.status === 'downloading').length}
      />

      {/* Default Browser Prompt Banner */}
      {showDefaultBanner && (
        <div className="default-browser-banner">
          <div className="default-banner-content">
            <span className="banner-icon">🎮</span>
            <span>KDG Browser не является вашим браузером по умолчанию. Сделайте его основным для прохождения игр!</span>
          </div>
          <div className="default-banner-actions">
            <button className="banner-btn banner-btn-primary" onClick={handleMakeDefault}>
              Сделать по умолчанию
            </button>
            <button className="banner-btn banner-btn-secondary" onClick={handleDismissDefault}>
              Не сейчас
            </button>
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="main-layout">
        <div style={{ display: activeTab.url.startsWith('kdg://') ? 'flex' : 'none', flex: 1, overflow: 'hidden' }}>
          <Navigation
            activeSection={activeTab.activeDashboardSection}
            setActiveSection={setDashboardSection}
          />
          <div className="content-viewport">
            <>
                {activeTab.activeDashboardSection === 'home' && (
                  <Home onNavigateUrl={(url) => handleNavigate(url)} />
                )}
                {activeTab.activeDashboardSection === 'search' && (
                  <Search onNavigateUrl={(url) => handleNavigate(url)} />
                )}
                {activeTab.activeDashboardSection === 'favorites' && (
                  <Favorites onNavigateUrl={(url) => handleNavigate(url)} />
                )}
                {activeTab.activeDashboardSection === 'history' && (
                  <History onNavigateUrl={(url) => handleNavigate(url)} />
                )}
                {activeTab.activeDashboardSection === 'downloads' && (
                  <Downloads downloads={downloads} onClearAll={() => setDownloads([])} />
                )}
                {activeTab.activeDashboardSection === 'extensions' && (
                  <Extensions />
                )}
                {activeTab.activeDashboardSection === 'ai' && (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
                    <div className="section-header">
                      <BrainCircuit size={16} style={{ color: 'var(--accent)' }} />
                      ИИ Лаборатория — Общий чат
                    </div>
                    <div className="cyber-panel" style={{ flex: 1, overflow: 'hidden', padding: 0 }}>
                      <AIAssistant isOpen={true} onClose={() => {}} />
                    </div>
                  </div>
                )}
                {activeTab.activeDashboardSection === 'settings' && (
                  <Settings
                    settings={settings}
                    onSaveSettings={handleSaveSettings}
                    onRefreshBookmarks={async () => {
                      const bookmarks = await electronAPI.getBookmarks();
                      if (bookmarks) setBookmarkedUrls(bookmarks.map(b => b.url));
                    }}
                    onOpenMigrationWizard={() => setShowMigrationWizard(true)}
                    onClose={handleGoBack}
                  />
                )}
            </>
          </div>
        </div>

        {/* Webview for real websites */}
        <div 
          className="webview-container" 
          style={{ 
            position: activeTab.url.startsWith('kdg://') ? 'absolute' : 'relative',
            left: activeTab.url.startsWith('kdg://') ? '-9999px' : '0',
            top: 0,
            width: '100%',
            height: '100%',
            flex: 1,
            overflow: 'hidden',
            opacity: activeTab.url.startsWith('kdg://') ? 0 : 1,
            pointerEvents: activeTab.url.startsWith('kdg://') ? 'none' : 'auto'
          }}
        >
          {tabs.map(tab => {
            if (tab.isSleeping && tab.id !== activeTabId) {
              return null;
            }
            const isTabActive = tab.id === activeTabId;
            return (
              <webview
                key={tab.id}
                ref={(el) => handleWebviewRef(tab.id, el)}
                src={tab.webviewUrl || 'about:blank'}
                partition="persist:kdg"
                allowpopups="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: isTabActive ? '0' : '-9999px',
                  width: '100%', 
                  height: '100%',
                  opacity: isTabActive ? 1 : 0,
                  pointerEvents: isTabActive ? 'auto' : 'none',
                  zIndex: isTabActive ? 1 : -1
                }}
              />
            );
          })}
        </div>

        {/* AI Drawer */}
        <AIAssistant
          isOpen={isAiOpen}
          onClose={() => setIsAiOpen(false)}
          currentVideo={activeTab.activeVideo}
          activeTabUrl={activeTab.url}
          getActivePageContext={getActivePageContext}
        />

        {/* Downloads Panel */}
        {isDownloadsOpen && (
          <DownloadsPanel
            downloads={downloads}
            onClose={() => setIsDownloadsOpen(false)}
            onClearAll={() => setDownloads([])}
          />
        )}
      </div>

      {/* Startup Update Check Overlay */}
      {showUpdateCheck && (
        <UpdateOverlay
          electronAPI={electronAPI}
          onFinished={() => setShowUpdateCheck(false)}
        />
      )}

      {/* Migration Wizard Overlay */}
      {!showUpdateCheck && showMigrationWizard && (
        <MigrationWizardOverlay
          electronAPI={electronAPI}
          onFinished={async () => {
            setShowMigrationWizard(false);
            const updated = { ...settings, hasCompletedMigration: true };
            await handleSaveSettings(updated);
          }}
        />
      )}
    </div>
  );
}
