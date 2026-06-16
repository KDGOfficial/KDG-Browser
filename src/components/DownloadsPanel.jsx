import React, { useState } from 'react';
import { Download, X, CheckCircle2, AlertCircle, FolderOpen } from 'lucide-react';

/**
 * DownloadsPanel — панель загрузок.
 * В Electron реальные загрузки можно слушать через session.on('will-download').
 * Здесь — готовый UI + заглушка для демонстрации.
 */
export function DownloadsPanel({ downloads = [], onClose, onClearAll }) {
  const formatSize = (bytes) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const formatSpeed = (bytesPerSec) => {
    if (!bytesPerSec) return '';
    return `${(bytesPerSec / 1024).toFixed(0)} KB/s`;
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 size={14} style={{ color: 'var(--accent-green)' }} />;
    if (status === 'error')     return <AlertCircle  size={14} style={{ color: 'var(--accent)' }} />;
    return <Download size={14} style={{ color: 'var(--accent-blue)' }} />;
  };

  return (
    <div className="downloads-panel">
      <div className="downloads-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Download size={16} style={{ color: 'var(--accent-blue)' }} />
          <span>Загрузки</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {downloads.length > 0 && (
            <button
              className="nav-btn"
              onClick={onClearAll}
              title="Очистить список"
              style={{ fontSize: '0.72rem', color: 'var(--text-muted)', width: 'auto', padding: '0 8px' }}
            >
              Очистить
            </button>
          )}
          <button className="nav-btn" onClick={onClose} title="Закрыть">
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="downloads-list">
        {downloads.length === 0 ? (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 12, padding: 40, color: 'var(--text-muted)', textAlign: 'center'
          }}>
            <FolderOpen size={42} style={{ opacity: 0.3 }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Нет загрузок</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>
              Файлы, которые вы скачаете, появятся здесь
            </div>
          </div>
        ) : (
          downloads.map((dl) => (
            <div key={dl.id} className="download-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {getStatusIcon(dl.status)}
                <span className="download-item-name">{dl.filename}</span>
              </div>
              {dl.status === 'downloading' && (
                <div className="download-progress">
                  <div
                    className="download-progress-fill"
                    style={{ width: `${dl.progress || 0}%` }}
                  />
                </div>
              )}
              <div className="download-item-info">
                <span>
                  {dl.status === 'completed' ? 'Завершено' :
                   dl.status === 'error'     ? 'Ошибка'    :
                   `${dl.progress || 0}% · ${formatSpeed(dl.speed)}`}
                </span>
                <span>{formatSize(dl.totalBytes)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
