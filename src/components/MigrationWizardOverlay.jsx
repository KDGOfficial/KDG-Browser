import React, { useState, useEffect } from 'react';
import { DownloadCloud, CheckCircle, ChevronRight, X, Loader2 } from 'lucide-react';
import '../styles/migration.css';

export function MigrationWizardOverlay({ electronAPI, onFinished }) {
  const [step, setStep] = useState(1);
  const [browsers, setBrowsers] = useState([]);
  const [selectedBrowser, setSelectedBrowser] = useState(null);
  
  const [options, setOptions] = useState({
    bookmarks: true,
    history: true,
    passwords: true,
    cookies: true
  });
  
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (electronAPI?.getAvailableBrowsers) {
      electronAPI.getAvailableBrowsers().then(setBrowsers).catch(console.error);
    }
  }, [electronAPI]);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleImport = async () => {
    setIsImporting(true);
    setError(null);
    try {
      const result = await electronAPI.runImport({
        browserId: selectedBrowser.id,
        options
      });
      if (result.success) {
        setImportResult(result.count);
        setStep(4); // Success step
      } else {
        setError(result.error || 'Ошибка при импорте данных');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  // SVG icons for browsers
  const getBrowserIcon = (id) => {
    const icons = {
      chrome: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="24" fill="#fff"/>
          <path fill="#4285F4" d="M24 9.6A14.4 14.4 0 0 1 35.76 28.8H24a4.8 4.8 0 0 1 0-9.6h13.68A14.4 14.4 0 0 0 9.6 24 14.4 14.4 0 0 0 24 38.4a14.4 14.4 0 0 0 11.76-22.4z"/>
          <circle cx="24" cy="24" r="9.6" fill="#fff"/>
          <path fill="#EA4335" d="M24 9.6h13.68a14.4 14.4 0 0 0-25.44 4.8z"/>
          <path fill="#34A853" d="M12.24 28.8A14.4 14.4 0 0 0 24 38.4l5.76-9.97A4.8 4.8 0 0 1 24 19.2z"/>
          <path fill="#FBBC05" d="M9.6 24a14.4 14.4 0 0 1 2.64-8.4l9.84 8.4H24a4.8 4.8 0 0 1-4.8 4.8l-9.36 5.76A14.36 14.36 0 0 1 9.6 24z"/>
          <circle cx="24" cy="24" r="5.76" fill="#4285F4"/>
        </svg>
      ),
      edge: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <defs>
            <linearGradient id="edge1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0078D4"/>
              <stop offset="100%" stopColor="#00BCF2"/>
            </linearGradient>
            <linearGradient id="edge2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1490DF"/>
              <stop offset="100%" stopColor="#34C5F3"/>
            </linearGradient>
          </defs>
          <path fill="url(#edge1)" d="M4 20C4 11.2 11.2 4 24 4c7.6 0 14.4 3.4 19 8.8C38.2 8.4 31.6 6 24 6c-10 0-18 8-18 18 0 5.4 2.4 10.2 6.2 13.5C15 40 17 42 24 42c10.6 0 18.6-6.4 19.6-16H24c-4.4 0-8-3.6-8-8 0-2.2.9-4.2 2.3-5.7C16.4 11 14 8 10 8 6.6 10.8 4 15.2 4 20z"/>
          <path fill="url(#edge2)" d="M42 30H24c4.4 0 8-3.6 8-8 0-4.4-3.6-8-8-8H16c-2.2 0-4 1.8-4 4s1.8 4 4 4h8c2.2 0 4 1.8 4 4s-1.8 4-4 4H10c4 4.8 10 8 16 8 8 0 14-4 16-8z"/>
        </svg>
      ),
      brave: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <path fill="#FF5500" d="M24 4L7 14v20l17 10 17-10V14z"/>
          <path fill="#FF7139" d="M24 4L7 14l17 5 17-5z"/>
          <path fill="#fff" d="M30 22l-6 6-6-6 2-6h8z"/>
        </svg>
      ),
      opera: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="20" fill="#FF1B2D"/>
          <path fill="#fff" d="M24 10c-4 0-7.5 6.3-7.5 14S20 38 24 38s7.5-6.3 7.5-14S28 10 24 10z" opacity="0.5"/>
          <ellipse cx="24" cy="24" rx="7.5" ry="14" fill="none" stroke="#fff" strokeWidth="3"/>
        </svg>
      ),
      'opera-gx': (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="20" fill="#1a1a2e"/>
          <ellipse cx="24" cy="24" rx="7.5" ry="14" fill="none" stroke="#FF1B2D" strokeWidth="3"/>
          <path fill="#FF1B2D" d="M16 20h16v2H16zM16 26h16v2H16z"/>
        </svg>
      ),
      vivaldi: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="20" fill="#EF3939"/>
          <path fill="#fff" d="M24 36L12 16h6l6 13 6-13h6z"/>
        </svg>
      ),
      yandex: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="20" fill="#FC3F1D"/>
          <path fill="#fff" d="M26 12h-4c-4.4 0-7 2.2-7 6.2 0 3.2 1.6 5 4.6 7l-5 10.8h4.2l4.8-10.2H26v10.2h4V12zm-4 10.8h-1.8c-2.6-1.8-3-3-3-4.4 0-2 1.2-3.2 3.4-3.2H22z"/>
        </svg>
      ),
      firefox: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="20" fill="#FF9500"/>
          <circle cx="24" cy="24" r="11" fill="#FF5722"/>
          <path fill="#FF9500" d="M35 14C32 8 26 5 20 6c4 2 7 5.5 7 10s-3 8.5-8 10c6 .5 12-2 15-8 1-2 1.5-3 1-4z"/>
        </svg>
      ),
      'firefox-esr': (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="20" fill="#FF9500"/>
          <circle cx="24" cy="24" r="11" fill="#FF5722"/>
          <path fill="#FF9500" d="M35 14C32 8 26 5 20 6c4 2 7 5.5 7 10s-3 8.5-8 10c6 .5 12-2 15-8 1-2 1.5-3 1-4z"/>
        </svg>
      ),
      waterfox: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="20" fill="#00ACEC"/>
          <path fill="#fff" d="M14 24c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z" fillOpacity="0.3"/>
          <path fill="#fff" d="M20 18c2-4 8-4 10 0s2 10-2 12c-4 2-10-2-10-4 0-2 1-6 2-8z"/>
        </svg>
      ),
      librewolf: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="20" fill="#0091C6"/>
          <path fill="#fff" d="M24 14l-8 14h16z" fillOpacity="0.9"/>
          <circle cx="24" cy="30" r="4" fill="#fff"/>
        </svg>
      ),
      chromium: (
        <svg viewBox="0 0 48 48" width="36" height="36">
          <circle cx="24" cy="24" r="24" fill="#e8e8e8"/>
          <circle cx="24" cy="24" r="10" fill="#fff" stroke="#999" strokeWidth="2"/>
          <path fill="#aaa" d="M24 9.6h13.68a14.4 14.4 0 0 0-25.44 4.8z"/>
          <path fill="#999" d="M12.24 28.8A14.4 14.4 0 0 0 24 38.4l5.76-9.97A4.8 4.8 0 0 1 24 19.2z"/>
          <path fill="#bbb" d="M9.6 24a14.4 14.4 0 0 1 2.64-8.4l9.84 8.4H24a4.8 4.8 0 0 1-4.8 4.8l-9.36 5.76A14.36 14.36 0 0 1 9.6 24z"/>
        </svg>
      ),
    };
    return icons[id] || (
      <svg viewBox="0 0 48 48" width="36" height="36">
        <circle cx="24" cy="24" r="20" fill="#555"/>
        <text x="24" y="30" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">?</text>
      </svg>
    );
  };


  return (
    <div className="overlay-backdrop fade-in">
      <div className="migration-wizard-container glass-panel slide-up">
        {/* Header */}
        <div className="migration-header">
          <div className="migration-title">
            <DownloadCloud size={24} style={{ color: 'var(--accent)' }} />
            <span>Мастер миграции</span>
          </div>
          {step < 4 && !isImporting && (
            <button className="icon-btn" onClick={onFinished}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="migration-content">
          {step === 1 && (
            <div className="migration-step-center">
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Добро пожаловать в KDG Browser!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center', maxWidth: '400px' }}>
                Мы можем импортировать ваши закладки, историю, пароли и другие данные из вашего предыдущего браузера, чтобы вы могли сразу начать комфортное использование.
              </p>
              <div className="migration-actions-center">
                <button className="kdg-btn primary" onClick={handleNext}>
                  Начать импорт
                </button>
                <button className="kdg-btn secondary" onClick={onFinished}>
                  Пропустить
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="migration-step">
              <h3>Выберите браузер для импорта</h3>
              {browsers.length === 0 ? (
                <div className="migration-empty">Поддерживаемые браузеры не найдены.</div>
              ) : (
                <div className="browser-grid">
                  {browsers.map(b => (
                    <div 
                      key={b.id} 
                      className={`browser-card ${selectedBrowser?.id === b.id ? 'selected' : ''}`}
                      onClick={() => setSelectedBrowser(b)}
                    >
                      <div className="browser-icon">{getBrowserIcon(b.id)}</div>
                      <div className="browser-name">{b.name}</div>
                      {selectedBrowser?.id === b.id && (
                        <div className="browser-check"><CheckCircle size={16} /></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="migration-actions-between">
                <button className="kdg-btn secondary" onClick={handleBack}>Назад</button>
                <button 
                  className="kdg-btn primary" 
                  onClick={handleNext}
                  disabled={!selectedBrowser}
                >
                  Далее <ChevronRight size={16} style={{ marginLeft: 8 }}/>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="migration-step">
              <h3>Что будем импортировать из {selectedBrowser?.name}?</h3>
              
              <div className="options-list">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={options.bookmarks} 
                    onChange={e => setOptions({...options, bookmarks: e.target.checked})} 
                  />
                  <span>Закладки</span>
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={options.history} 
                    onChange={e => setOptions({...options, history: e.target.checked})} 
                  />
                  <span>История посещений</span>
                </label>
                
                {selectedBrowser?.type === 'chromium' && (
                  <>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={options.passwords} 
                        onChange={e => setOptions({...options, passwords: e.target.checked})} 
                      />
                      <span>Пароли</span>
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={options.cookies} 
                        onChange={e => setOptions({...options, cookies: e.target.checked})} 
                      />
                      <span>Cookies (авторизации на сайтах)</span>
                    </label>
                  </>
                )}
                {selectedBrowser?.type === 'firefox' && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Импорт паролей из Firefox временно не поддерживается.
                  </div>
                )}
              </div>

              {error && (
                <div className="migration-error">
                  {error}
                </div>
              )}

              <div className="migration-actions-between">
                <button className="kdg-btn secondary" onClick={handleBack} disabled={isImporting}>Назад</button>
                <button 
                  className="kdg-btn primary" 
                  onClick={handleImport}
                  disabled={isImporting || (!options.bookmarks && !options.history && !options.passwords && !options.cookies)}
                >
                  {isImporting ? <><Loader2 size={16} className="spin" style={{marginRight: 8}}/>Импорт...</> : 'Импортировать'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="migration-step-center">
              <CheckCircle size={64} style={{ color: 'var(--success)', marginBottom: '16px' }} />
              <h2>Импорт успешно завершен!</h2>
              
              <div className="import-summary">
                {options.bookmarks && <div>Закладок: {importResult?.bookmarks || 0}</div>}
                {options.history && <div>Записей истории: {importResult?.history || 0}</div>}
                {options.passwords && <div>Паролей: {importResult?.passwords || 0}</div>}
                {options.cookies && <div>Cookies: {importResult?.cookies || 0}</div>}
              </div>

              <div className="migration-actions-center" style={{ marginTop: '32px' }}>
                <button className="kdg-btn primary" onClick={onFinished}>
                  Отлично
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
