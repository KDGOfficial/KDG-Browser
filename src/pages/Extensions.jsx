import React, { useState, useEffect } from 'react';
import { Puzzle, Settings, Trash2, Power } from 'lucide-react';

export function Extensions() {
  const [extensions, setExtensions] = useState([
    { id: 'ext1', name: 'KDG AdBlocker Plus', description: 'Встроенный блокировщик рекламы и трекеров (включен на уровне движка).', version: '1.34.0', enabled: true, builtin: true },
    { id: 'ext2', name: 'KDG AI Assistant', description: 'Интеллектуальный помощник на базе Google Gemini. Помогает с видео и текстом.', version: '2.1.0', enabled: true, builtin: true },
  ]);

  const fetchExtensions = () => {
    if (window.electron?.ipcRenderer) {
      window.electron.ipcRenderer.invoke('extensions:getList').then(exts => {
        if (exts) {
          const loaded = exts.map(e => ({
            id: e.id,
            name: e.name,
            version: e.version,
            description: 'Установленное расширение Chrome.',
            enabled: true,
            builtin: false
          }));
          setExtensions(prev => {
            const builtins = prev.filter(p => p.builtin);
            return [...builtins, ...loaded];
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchExtensions();
  }, []);

  const handleLoadUnpacked = async () => {
    if (window.electron?.ipcRenderer) {
      const result = await window.electron.ipcRenderer.invoke('extensions:loadUnpacked');
      if (result.success) {
        fetchExtensions();
      } else if (result.error && result.error !== 'Canceled') {
        alert('Ошибка при загрузке расширения: ' + result.error);
      }
    }
  };

  const handleRemove = async (id) => {
    if (window.electron?.ipcRenderer) {
      const result = await window.electron.ipcRenderer.invoke('extensions:remove', id);
      if (result.success) {
        fetchExtensions();
      } else {
        alert('Не удалось удалить расширение: ' + result.error);
      }
    }
  };

  return (
    <div className="list-page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="section-header" style={{ marginBottom: 0 }}>
          <Puzzle size={16} style={{ color: 'var(--accent)' }} />
          Расширения
        </div>
        <button
          className="gamer-btn"
          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
          onClick={handleLoadUnpacked}
          title="Выберите папку с manifest.json"
        >
          Загрузить распакованное расширение
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {extensions.map(ext => (
          <div key={ext.id} className="list-item-row" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
            <div className="list-item-content">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-md)', 
                  background: ext.enabled ? 'var(--accent-subtle)' : 'var(--chrome-hover)',
                  border: `1px solid ${ext.enabled ? 'rgba(167, 139, 250, 0.3)' : 'var(--chrome-border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Puzzle size={24} style={{ color: ext.enabled ? 'var(--accent)' : 'var(--text-muted)' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="list-item-title" style={{ fontSize: '1rem' }}>{ext.name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--chrome-hover)', padding: '2px 6px', borderRadius: 4 }}>
                      v{ext.version}
                    </span>
                    {ext.builtin && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-green)', border: '1px solid var(--accent-green)', padding: '1px 6px', borderRadius: 4 }}>
                        Встроено
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {ext.description}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <label className="cyber-switch">
                <input type="checkbox" checked={ext.enabled} readOnly />
                <span className="cyber-slider" style={{ cursor: ext.builtin ? 'not-allowed' : 'pointer', opacity: ext.builtin ? 0.7 : 1 }}></span>
              </label>
              
              <button className="nav-btn" title="Настройки" disabled={ext.builtin}>
                <Settings size={18} />
              </button>
              
              <button 
                className="nav-btn" 
                title="Удалить" 
                disabled={ext.builtin}
                onClick={() => handleRemove(ext.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
