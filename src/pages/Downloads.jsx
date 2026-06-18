import React, { useState } from 'react';
import { Download, FolderOpen, Trash2, Search, CheckCircle2, AlertCircle, Play } from 'lucide-react';

export function Downloads({ downloads = [], onClearAll }) {
  const [query, setQuery] = useState('');
  
  const formatSize = (bytes) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 size={16} style={{ color: 'var(--accent-green)' }} />;
    if (status === 'error' || status === 'interrupted') return <AlertCircle size={16} style={{ color: 'var(--accent-red)' }} />;
    return <Download size={16} style={{ color: 'var(--accent-blue)' }} />;
  };

  const filtered = downloads.filter(item => {
    const filename = item.fileName || item.filename || '';
    return !query || filename.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="list-page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="section-header" style={{ marginBottom: 0 }}>
          <Download size={16} style={{ color: 'var(--accent-blue)' }} />
          Загрузки
        </div>
        {downloads.length > 0 && (
          <button
            className="gamer-btn gamer-btn-orange"
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            onClick={onClearAll}
          >
            <Trash2 size={12} />
            Очистить список
          </button>
        )}
      </div>

      <div className="search-input-box" style={{ marginBottom: 20 }}>
        <Search size={16} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Поиск по загрузкам..."
        />
      </div>

      {filtered.length === 0 ? (
        <div className="kdg-loader" style={{ height: 300 }}>
          <FolderOpen size={40} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
          <div className="loader-text" style={{ color: 'var(--text-muted)' }}>
            {query ? 'Ничего не найдено' : 'Список загрузок пуст'}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(dl => {
            const status = dl.state || dl.status;
            const progress = dl.totalBytes ? Math.round((dl.receivedBytes / dl.totalBytes) * 100) : 0;
            const filename = dl.fileName || dl.filename || 'Неизвестный файл';
            const isDone = status === 'completed';
            const isError = status === 'interrupted' || status === 'cancelled' || status === 'error';

            return (
              <div key={dl.id} className="list-item-row" style={{ padding: '16px', borderRadius: 'var(--radius-lg)' }}>
                <div className="list-item-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {getStatusIcon(status)}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span className="list-item-title" style={{ fontSize: '0.9rem' }}>{filename}</span>
                      <span className="list-item-url" style={{ fontSize: '0.75rem' }}>
                        {isDone ? 'Завершено' : isError ? 'Ошибка' : `${progress}% · Загружается`}
                        {' • '}
                        {formatSize(dl.receivedBytes)} / {formatSize(dl.totalBytes)}
                      </span>
                      {status === 'downloading' && (
                        <div className="download-progress" style={{ marginTop: 4, width: '200px', height: '4px', background: 'var(--chrome-border)', borderRadius: 2 }}>
                          <div 
                            className="download-progress-fill" 
                            style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {isDone && dl.savePath && window.electronAPI?.openDownloadedFile && (
                    <button
                      className="gamer-btn"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => window.electronAPI.openDownloadedFile(dl.savePath)}
                    >
                      <FolderOpen size={14} />
                      В папке
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
