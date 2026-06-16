import React, { useEffect, useState } from 'react';
import { Star, Clock, Trash2, Globe } from 'lucide-react';

export function Favorites({ onNavigateUrl }) {
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeTab, setActiveTab] = useState('bookmarks');
  
  const electronAPI = window.electronAPI;

  const loadData = async () => {
    if (electronAPI) {
      try {
        const hist = await electronAPI.getHistory();
        const bkmk = await electronAPI.getBookmarks();
        setHistory(hist || []);
        setBookmarks(bkmk || []);
      } catch (err) {
        console.error('Error loading history/bookmarks:', err);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [electronAPI]);

  const handleClearHistory = async () => {
    if (electronAPI && window.confirm('Вы действительно хотите очистить всю историю просмотров?')) {
      try {
        const updated = await electronAPI.clearHistory();
        setHistory(updated || []);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleBookmark = async (url, title) => {
    if (electronAPI) {
      try {
        const updated = await electronAPI.toggleBookmark({ url, title });
        setBookmarks(updated || []);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="list-page-container">
      <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div className="section-header" style={{ marginBottom: 0 }}>
          {activeTab === 'bookmarks' ? (
            <>
              <Star size={18} style={{ color: 'var(--accent-orange)' }} />
              Избранное & Закладки
            </>
          ) : (
            <>
              <Clock size={18} style={{ color: 'var(--accent-purple)' }} />
              История посещений
            </>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`category-tag ${activeTab === 'bookmarks' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            Закладки
          </button>
          <button
            className={`category-tag ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            История
          </button>
          {activeTab === 'history' && history.length > 0 && (
            <button
              className="gamer-btn gamer-btn-orange"
              style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              onClick={handleClearHistory}
            >
              <Trash2 size={12} />
              Очистить
            </button>
          )}
        </div>
      </div>

      {activeTab === 'bookmarks' ? (
        bookmarks.length > 0 ? (
          <div>
            {bookmarks.map((item) => (
              <div key={item.id} className="list-item-row">
                <div className="list-item-content" onClick={() => onNavigateUrl(item.url)}>
                  <span className="list-item-title">{item.title}</span>
                  <span className="list-item-url">
                    <Globe size={10} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    {item.url}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="list-item-time">{formatTime(item.timestamp)}</span>
                  <button
                    className="nav-btn"
                    onClick={() => handleToggleBookmark(item.url, item.title)}
                    title="Удалить закладку"
                    style={{ color: 'var(--accent-orange)' }}
                  >
                    <Star size={16} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="kdg-loader" style={{ height: '300px' }}>
            <Star size={32} style={{ color: 'var(--text-muted)' }} />
            <div className="loader-text" style={{ color: 'var(--text-muted)' }}>Список закладок пуст</div>
          </div>
        )
      ) : (
        history.length > 0 ? (
          <div>
            {history.map((item) => (
              <div key={item.id} className="list-item-row">
                <div className="list-item-content" onClick={() => onNavigateUrl(item.url)}>
                  <span className="list-item-title">{item.title}</span>
                  <span className="list-item-url">
                    <Globe size={10} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    {item.url}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="list-item-time">{formatTime(item.timestamp)}</span>
                  <button
                    className="nav-btn"
                    onClick={() => handleToggleBookmark(item.url, item.title)}
                    title="В закладки"
                  >
                    <Star 
                      size={16} 
                      fill={bookmarks.some(b => b.url === item.url) ? "currentColor" : "none"}
                      style={{ color: bookmarks.some(b => b.url === item.url) ? "var(--accent-orange)" : "inherit" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="kdg-loader" style={{ height: '300px' }}>
            <Clock size={32} style={{ color: 'var(--text-muted)' }} />
            <div className="loader-text" style={{ color: 'var(--text-muted)' }}>История посещений пуста</div>
          </div>
        )
      )}
    </div>
  );
}
