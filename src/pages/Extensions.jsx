import React, { useState, useEffect, useRef } from 'react';
import { Puzzle, Settings, Trash2, Download, Store, X, CheckCircle, Loader, AlertCircle, FolderOpen, ExternalLink, Plus } from 'lucide-react';

// Extract extension ID from CWS URL
function extractExtIdFromUrl(input) {
  // Full CWS URL: https://chromewebstore.google.com/detail/name/abcdefghijklmnopqrstuvwxyzabcdef
  const urlMatch = input.match(/\/detail\/[^/]+\/([a-z]{32})/i) ||
                   input.match(/\/detail\/([a-z]{32})/i) ||
                   input.match(/\?id=([a-z]{32})/i);
  if (urlMatch) return urlMatch[1].toLowerCase();
  // Maybe it's just the ID
  const clean = input.trim().toLowerCase();
  if (/^[a-z]{32}$/.test(clean)) return clean;
  return null;
}

export function Extensions() {
  const [extensions, setExtensions] = useState([
    { id: 'ext1', name: 'KDG AdBlocker Plus', description: 'Встроенный блокировщик рекламы и трекеров (включен на уровне движка).', version: '1.34.0', enabled: true, builtin: true },
    { id: 'ext2', name: 'KDG AI Assistant', description: 'Интеллектуальный помощник на базе Google Gemini. Помогает с видео и текстом.', version: '2.1.0', enabled: true, builtin: true },
  ]);
  const [installing, setInstalling] = useState({}); // id -> { status, name, error }
  const [showCwsModal, setShowCwsModal] = useState(false);
  const [cwsInput, setCwsInput] = useState('');
  const [cwsError, setCwsError] = useState('');
  const inputRef = useRef(null);

  const fetchExtensions = () => {
    if (window.electronAPI?.getExtensions) {
      window.electronAPI.getExtensions().then(exts => {
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

    // Listen for extension install progress from main process
    if (window.electronAPI?.onExtensionInstalling) {
      window.electronAPI.onExtensionInstalling((_, data) => {
        setInstalling(prev => ({ ...prev, [data.id]: data }));
        if (data.status === 'installed') {
          fetchExtensions();
          // Auto-clear success after 4s
          setTimeout(() => {
            setInstalling(prev => {
              const next = { ...prev };
              delete next[data.id];
              return next;
            });
          }, 4000);
        }
      });
    }
  }, []);

  const handleLoadUnpacked = async () => {
    if (window.electronAPI?.loadUnpackedExtension) {
      const result = await window.electronAPI.loadUnpackedExtension();
      if (result.success) {
        fetchExtensions();
      } else if (result.error && result.error !== 'Canceled') {
        alert('Ошибка при загрузке расширения: ' + result.error);
      }
    }
  };

  const handleRemove = async (id) => {
    if (window.electronAPI?.removeExtension) {
      const result = await window.electronAPI.removeExtension(id);
      if (result.success) {
        fetchExtensions();
      } else {
        alert('Не удалось удалить расширение: ' + result.error);
      }
    }
  };

  const handleInstallFromCWS = async () => {
    setCwsError('');
    const extId = extractExtIdFromUrl(cwsInput);
    if (!extId) {
      setCwsError('Неверный ID или ссылка. Вставьте ссылку из Chrome Web Store или ID расширения (32 символа).');
      return;
    }

    if (!window.electronAPI?.installExtensionFromCWS) {
      setCwsError('API недоступен.');
      return;
    }

    setShowCwsModal(false);
    setCwsInput('');
    setInstalling(prev => ({ ...prev, [extId]: { id: extId, status: 'downloading' } }));

    const result = await window.electronAPI.installExtensionFromCWS(extId);
    setInstalling(prev => ({
      ...prev,
      [extId]: { id: extId, status: result.success ? 'installed' : 'error', name: result.name, error: result.error }
    }));

    if (result.success) {
      fetchExtensions();
      setTimeout(() => {
        setInstalling(prev => {
          const next = { ...prev };
          delete next[extId];
          return next;
        });
      }, 4000);
    }
  };

  const installingEntries = Object.values(installing);

  return (
    <div className="list-page-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="section-header" style={{ marginBottom: 0 }}>
          <Puzzle size={16} style={{ color: 'var(--accent)' }} />
          Расширения
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="gamer-btn"
            style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => { setShowCwsModal(true); setCwsError(''); setCwsInput(''); setTimeout(() => inputRef.current?.focus(), 50); }}
            title="Установить из Chrome Web Store"
          >
            <Store size={14} />
            Из Chrome Web Store
          </button>
          <button
            className="gamer-btn"
            style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 6, background: 'var(--chrome-hover)', color: 'var(--text-secondary)' }}
            onClick={handleLoadUnpacked}
            title="Выберите папку с manifest.json"
          >
            <FolderOpen size={14} />
            Распакованное
          </button>
        </div>
      </div>

      {/* Installing progress notifications */}
      {installingEntries.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {installingEntries.map(inst => (
            <div key={inst.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: inst.status === 'installed' ? 'rgba(74, 222, 128, 0.08)' :
                          inst.status === 'error' ? 'rgba(239, 68, 68, 0.08)' :
                          'var(--accent-subtle)',
              border: `1px solid ${inst.status === 'installed' ? 'rgba(74, 222, 128, 0.25)' :
                                    inst.status === 'error' ? 'rgba(239, 68, 68, 0.25)' :
                                    'rgba(167, 139, 250, 0.25)'}`,
              fontSize: '0.82rem'
            }}>
              {inst.status === 'downloading' && <Loader size={16} style={{ color: 'var(--accent)', animation: 'spin 1s linear infinite' }} />}
              {inst.status === 'installed' && <CheckCircle size={16} style={{ color: 'var(--accent-green)' }} />}
              {inst.status === 'error' && <AlertCircle size={16} style={{ color: '#ef4444' }} />}
              <span style={{ flex: 1, color: inst.status === 'error' ? '#ef4444' : 'var(--text-primary)' }}>
                {inst.status === 'downloading' && `Скачивание расширения ${inst.id.substring(0, 8)}...`}
                {inst.status === 'installed' && `✓ Расширение "${inst.name || inst.id}" установлено!`}
                {inst.status === 'error' && `Ошибка: ${inst.error}`}
              </span>
              <button
                onClick={() => setInstalling(prev => { const n = {...prev}; delete n[inst.id]; return n; })}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CWS install modal */}
      {showCwsModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setShowCwsModal(false)}>
          <div style={{
            background: 'var(--chrome-bg)', border: '1px solid var(--chrome-border)',
            borderRadius: 'var(--radius-lg)', padding: 28, width: 480, maxWidth: '90vw',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'var(--accent-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Store size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Установка из Chrome Web Store
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Вставьте ссылку или ID расширения
                </div>
              </div>
              <button
                onClick={() => setShowCwsModal(false)}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 12, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Откройте <strong style={{ color: 'var(--accent)' }}>chromewebstore.google.com</strong>, найдите нужное расширение, скопируйте ссылку из адресной строки и вставьте ниже:
            </div>

            <input
              ref={inputRef}
              type="text"
              value={cwsInput}
              onChange={e => { setCwsInput(e.target.value); setCwsError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleInstallFromCWS()}
              placeholder="https://chromewebstore.google.com/detail/... или ID (32 символа)"
              style={{
                width: '100%', padding: '10px 14px',
                background: 'var(--chrome-input)', border: `1px solid ${cwsError ? '#ef4444' : 'var(--chrome-border)'}`,
                borderRadius: 8, color: 'var(--text-primary)', fontSize: '0.82rem',
                outline: 'none', boxSizing: 'border-box', marginBottom: cwsError ? 6 : 16
              }}
            />

            {cwsError && (
              <div style={{ color: '#ef4444', fontSize: '0.75rem', marginBottom: 12, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                <AlertCircle size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                {cwsError}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => window.electronAPI?.loadUnpackedExtension && (setShowCwsModal(false), handleLoadUnpacked())}
                style={{
                  background: 'none', border: '1px solid var(--chrome-border)',
                  color: 'var(--text-secondary)', borderRadius: 8, padding: '8px 14px',
                  cursor: 'pointer', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                <FolderOpen size={13} /> Распакованное…
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setShowCwsModal(false)}
                  style={{
                    background: 'var(--chrome-hover)', border: 'none',
                    color: 'var(--text-secondary)', borderRadius: 8, padding: '8px 18px',
                    cursor: 'pointer', fontSize: '0.82rem'
                  }}
                >
                  Отмена
                </button>
                <button
                  onClick={handleInstallFromCWS}
                  disabled={!cwsInput.trim()}
                  style={{
                    background: cwsInput.trim() ? 'var(--accent)' : 'var(--chrome-hover)',
                    border: 'none', color: '#fff', borderRadius: 8, padding: '8px 20px',
                    cursor: cwsInput.trim() ? 'pointer' : 'not-allowed',
                    fontSize: '0.82rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 6
                  }}
                >
                  <Download size={14} />
                  Установить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extension list */}
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

      {/* Tip */}
      <div style={{
        marginTop: 24, padding: '14px 18px',
        background: 'var(--accent-subtle)', borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(167, 139, 250, 0.15)',
        fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6
      }}>
        <strong style={{ color: 'var(--accent)' }}>💡 Совет:</strong> Нажмите «<strong>Из Chrome Web Store</strong>» и вставьте ссылку на расширение — KDG Browser автоматически скачает и установит его. Перезапуск не требуется.
      </div>
    </div>
  );
}
