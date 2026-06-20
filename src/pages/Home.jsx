import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, X, Globe } from 'lucide-react';

function getFaviconUrl(url) {
  if (!url || url.startsWith('kdg://')) return null;
  try {
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return null;
  }
}

function SiteFavicon({ url }) {
  const [imgError, setImgError] = useState(false);
  const faviconUrl = getFaviconUrl(url);

  if (!faviconUrl || imgError) {
    return <Globe size={24} style={{ color: 'var(--text-muted)' }} />;
  }

  return (
    <img
      src={faviconUrl}
      width={28} height={28}
      style={{ borderRadius: 4, objectFit: 'contain' }}
      onError={() => setImgError(true)}
      alt=""
    />
  );
}

const SEARCH_ENGINES = [
  {
    id: 'google',
    name: 'Google',
    logo: 'G',
    color: '#4285F4',
    url: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
      </svg>
    )
  },
  {
    id: 'yandex',
    name: 'Яндекс',
    color: '#FC3F1D',
    url: (q) => `https://yandex.ru/search/?text=${encodeURIComponent(q)}`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="24" fill="#FC3F1D"/>
        <text x="24" y="32" textAnchor="middle" fill="white" fontSize="26" fontWeight="900" fontFamily="Arial">Я</text>
      </svg>
    )
  },
  {
    id: 'bing',
    name: 'Bing',
    color: '#008272',
    url: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="8" fill="#008272"/>
        <path d="M14 10l6 2.5v20l8-5-3.5-1.5L28 16l8 14-14 8-8-4.5V10z" fill="white"/>
      </svg>
    )
  },
  {
    id: 'ddg',
    name: 'DuckDuckGo',
    color: '#DE5833',
    url: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="24" fill="#DE5833"/>
        <circle cx="24" cy="20" r="10" fill="white"/>
        <circle cx="21" cy="18" r="2.5" fill="#1D1D1D"/>
        <circle cx="27" cy="18" r="2.5" fill="#1D1D1D"/>
        <circle cx="21.8" cy="17.2" r="1" fill="white"/>
        <circle cx="27.8" cy="17.2" r="1" fill="white"/>
        <ellipse cx="24" cy="34" rx="8" ry="4" fill="white"/>
      </svg>
    )
  }
];

const DEFAULT_QUICK_LINKS = [
  { id: '1', name: 'YouTube',   url: 'https://youtube.com' },
  { id: '2', name: 'GitHub',    url: 'https://github.com' },
  { id: '3', name: 'Gmail',     url: 'https://mail.google.com' },
  { id: '4', name: 'Reddit',    url: 'https://reddit.com' }
];

export function Home({ onNavigateUrl }) {
  const [quickLinks, setQuickLinks] = useState([]);
  
  useEffect(() => {
    // Load links from IPC
    if (window.electronAPI?.getSettings) {
      window.electronAPI.getSettings().then(settings => {
        if (settings && settings.quickLinks) {
          setQuickLinks(settings.quickLinks);
        } else {
          setQuickLinks(DEFAULT_QUICK_LINKS);
        }
      });
    } else {
      setQuickLinks(DEFAULT_QUICK_LINKS);
    }
  }, []);

  const saveQuickLinks = (newLinks) => {
    setQuickLinks(newLinks);
    if (window.electronAPI?.getSettings && window.electronAPI?.saveSettings) {
      window.electronAPI.getSettings().then(settings => {
        window.electronAPI.saveSettings({ ...settings, quickLinks: newLinks });
      });
    }
  };

  const addQuickLink = () => {
    const url = window.prompt('Введите URL сайта (например, https://example.com):');
    if (!url) return;
    
    let name = '';
    try {
      name = window.prompt('Введите название (необязательно):') || new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    } catch {
      name = url;
    }
    
    const newLink = {
      id: Date.now().toString(),
      name,
      url: url.startsWith('http') ? url : `https://${url}`
    };
    saveQuickLinks([...quickLinks, newLink]);
  };

  const removeQuickLink = (e, id) => {
    e.stopPropagation();
    saveQuickLinks(quickLinks.filter(l => l.id !== id));
  };
  const [engine,   setEngine]  = useState('google');
  const [query,    setQuery]   = useState('');
  const [greeting]             = useState(() => {
    const h = new Date().getHours();
    if (h < 6)  return 'Доброй ночи';
    if (h < 12) return 'Доброе утро';
    if (h < 18) return 'Добрый день';
    return 'Добрый вечер';
  });
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const inputRef = useRef(null);
  const active = SEARCH_ENGINES.find(e => e.id === engine);

  const handleSearch = (e) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    const url = active.url(q);
    if (onNavigateUrl) onNavigateUrl(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleQuickLink = (url) => {
    if (onNavigateUrl) onNavigateUrl(url);
  };

  return (
    <div className="home-page">
      {/* Mesh gradient background */}
      <div className="home-mesh-bg" />

      {/* Background glow orbs */}
      <div className="home-orb home-orb-1" />
      <div className="home-orb home-orb-2" />
      <div className="home-orb home-orb-3" />

      <div className="home-content">

        {/* Greeting */}
        <div className="home-greeting">{greeting} 👋</div>

        {/* Clock */}
        <div className="home-clock">{time}</div>

        {/* Logo */}
        <div className="home-logo">
          <span className="home-logo-kdg">KDG</span>
          <span className="home-logo-browser"> Browser</span>
        </div>

        {/* Engine selector */}
        <div className="engine-selector">
          {SEARCH_ENGINES.map(eng => (
            <button
              key={eng.id}
              className={`engine-btn ${engine === eng.id ? 'active' : ''}`}
              onClick={() => { setEngine(eng.id); inputRef.current?.focus(); }}
              style={{ '--eng-color': eng.color }}
            >
              {eng.icon}
              <span>{eng.name}</span>
            </button>
          ))}
        </div>

        {/* Search box */}
        <form className="home-search-box" onSubmit={handleSearch}>
          <div
            className="home-search-inner"
            style={{ '--eng-color': active.color }}
          >
            <span className="home-search-engine-logo">{active.icon}</span>
            <input
              ref={inputRef}
              className="home-search-input"
              type="text"
              placeholder={`Поиск в ${active.name}...`}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button type="submit" className="home-search-btn">
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Quick links */}
        <div className="quick-links-section">
          <div className="quick-links-label">Быстрый доступ</div>
          <div className="quick-links-grid">
            {quickLinks.map(link => (
              <div key={link.id} className="quick-link-wrapper">
                <button
                  className="quick-link-item"
                  onClick={() => handleQuickLink(link.url)}
                  title={link.url}
                >
                  <div className="quick-link-icon-real">
                    <SiteFavicon url={link.url} />
                  </div>
                  <span className="quick-link-name">{link.name}</span>
                </button>
                <button className="quick-link-remove" onClick={(e) => removeQuickLink(e, link.id)} title="Удалить">
                  <X size={12} />
                </button>
              </div>
            ))}
            
            <button className="quick-link-item add-new" onClick={addQuickLink} title="Добавить сайт">
              <div className="quick-link-icon-real add-icon">
                <Plus size={24} />
              </div>
              <span className="quick-link-name">Добавить</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
