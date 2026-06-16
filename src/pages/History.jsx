import React, { useEffect, useState } from 'react';
import { Clock, Globe, Star, Trash2, Search } from 'lucide-react';

export function History({ onNavigateUrl }) {
  const [history,   setHistory]   = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [query,     setQuery]     = useState('');
  const electronAPI = window.electronAPI;

  const loadData = async () => {
    if (!electronAPI) return;
    try {
      const [hist, bkmk] = await Promise.all([
        electronAPI.getHistory(),
        electronAPI.getBookmarks()
      ]);
      setHistory(hist || []);
      setBookmarks(bkmk || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadData(); }, [electronAPI]);

  const handleClearHistory = async () => {
    if (electronAPI && window.confirm('Очистить всю историю посещений?')) {
      try {
        const updated = await electronAPI.clearHistory();
        setHistory(updated || []);
      } catch (err) { console.error(err); }
    }
  };

  const handleToggleBookmark = async (url, title) => {
    if (!electronAPI) return;
    try {
      const updated = await electronAPI.toggleBookmark({ url, title });
      setBookmarks(updated || []);
    } catch (err) { console.error(err); }
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now - d;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1)  return 'только что';
    if (diffMin < 60) return `${diffMin} мин назад`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH} ч назад`;
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
           ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const filtered = history.filter(item =>
    !query || item.title?.toLowerCase().includes(query.toLowerCase()) || item.url?.toLowerCase().includes(query.toLowerCase())
  );

  // Group by date
  const grouped = filtered.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="list-page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="section-header" style={{ marginBottom: 0 }}>
          <Clock size={16} style={{ color: 'var(--accent-blue)' }} />
          История посещений
        </div>
        {history.length > 0 && (
          <button
            className="gamer-btn gamer-btn-orange"
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            onClick={handleClearHistory}
          >
            <Trash2 size={12} />
            Очистить историю
          </button>
        )}
      </div>

      {/* Search */}
      <div className="search-input-box" style={{ marginBottom: 20 }}>
        <Search size={16} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Поиск в истории..."
        />
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="kdg-loader" style={{ height: 300 }}>
          <Clock size={40} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
          <div className="loader-text" style={{ color: 'var(--text-muted)' }}>
            {query ? 'Ничего не найдено' : 'История посещений пуста'}
          </div>
        </div>
      ) : (
        Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <div style={{
              fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.8px', color: 'var(--text-muted)',
              padding: '10px 0 6px', borderBottom: '1px solid var(--chrome-border)',
              marginBottom: 8
            }}>
              {date}
            </div>
            {items.map(item => {
              const isBookmarked = bookmarks.some(b => b.url === item.url);
              return (
                <div key={item.id} className="list-item-row">
                  <div className="list-item-content" onClick={() => onNavigateUrl(item.url)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${(() => { try { return new URL(item.url).hostname; } catch { return ''; } })()}&sz=32`}
                        width={14} height={14}
                        style={{ borderRadius: 2, objectFit: 'contain', opacity: 0.8 }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                        alt=""
                      />
                      <span className="list-item-title">{item.title || item.url}</span>
                    </div>
                    <span className="list-item-url">{item.url}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span className="list-item-time">{formatTime(item.timestamp)}</span>
                    <button
                      className="nav-btn"
                      onClick={() => handleToggleBookmark(item.url, item.title)}
                      title={isBookmarked ? 'Убрать из закладок' : 'В закладки'}
                      style={{ color: isBookmarked ? 'var(--accent-orange)' : undefined }}
                    >
                      <Star size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}
