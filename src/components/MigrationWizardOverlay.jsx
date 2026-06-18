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

  const getBrowserIcon = (id) => {
    // Return emoji as fallback, ideally use SVG icons
    switch(id) {
      case 'chrome': return '🔴';
      case 'edge': return '🔵';
      case 'brave': return '🦁';
      case 'opera': return '⭕';
      case 'opera-gx': return '🎮';
      case 'vivaldi': return 'V';
      case 'yandex': return 'Y';
      case 'firefox': return '🦊';
      default: return '🌐';
    }
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
