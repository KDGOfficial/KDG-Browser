import React, { useState } from 'react';
import { Search as SearchIcon, Globe, Clock, Trash2 } from 'lucide-react';

const SEARCH_ENGINES = [
  { id: 'google',  name: 'Google',     url: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}` },
  { id: 'yandex',  name: 'Яндекс',    url: (q) => `https://yandex.ru/search/?text=${encodeURIComponent(q)}` },
  { id: 'bing',    name: 'Bing',       url: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}` },
  { id: 'ddg',     name: 'DuckDuckGo', url: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}` },
];

export function Search({ onNavigateUrl }) {
  const [engine, setEngine] = useState('google');
  const [query,  setQuery]  = useState('');
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kdg-recent-search') || '[]'); } catch { return []; }
  });

  const handleSearch = (q = query) => {
    const text = q.trim();
    if (!text) return;
    const eng = SEARCH_ENGINES.find(e => e.id === engine);
    const url = eng.url(text);

    // Save recent
    const updated = [text, ...recent.filter(r => r !== text)].slice(0, 8);
    setRecent(updated);
    localStorage.setItem('kdg-recent-search', JSON.stringify(updated));

    if (onNavigateUrl) onNavigateUrl(url);
  };

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem('kdg-recent-search');
  };

  return (
    <div className="search-container">
      <div className="section-header">
        <SearchIcon size={15} />
        Поиск в интернете
      </div>

      {/* Engine tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {SEARCH_ENGINES.map(eng => (
          <button
            key={eng.id}
            className={`category-tag ${engine === eng.id ? 'active' : ''}`}
            onClick={() => setEngine(eng.id)}
          >
            {eng.name}
          </button>
        ))}
      </div>

      {/* Search input */}
      <form
        className="search-input-box"
        style={{ marginBottom: 32 }}
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
      >
        <Globe size={18} />
        <input
          type="text"
          placeholder={`Поиск в ${SEARCH_ENGINES.find(e => e.id === engine)?.name}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          style={{
            padding: '6px 16px', borderRadius: 8,
            background: 'var(--accent)', color: '#fff',
            fontSize: '0.82rem', fontWeight: 600,
            border: 'none', cursor: 'pointer'
          }}
        >
          Найти
        </button>
      </form>

      {/* Recent searches */}
      {recent.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="section-header" style={{ marginBottom: 0 }}>
              <Clock size={14} />
              Недавние запросы
            </div>
            <button
              className="copy-btn"
              onClick={clearRecent}
              style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}
            >
              <Trash2 size={11} />
              Очистить
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {recent.map(r => (
              <button
                key={r}
                className="category-tag"
                onClick={() => { setQuery(r); handleSearch(r); }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
