import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Globe, Palette, Shield, Sparkles, 
  Download, RefreshCw, Layers, Cpu, CheckCircle, AlertCircle
} from 'lucide-react';

export function Settings({ settings, onSaveSettings, onRefreshBookmarks }) {
  const electronAPI = window.electronAPI;
  
  const [localSettings, setLocalSettings] = useState({
    geminiKey: '',
    searchEngine: 'google',
    theme: 'dark',
    homepage: 'kdg://home',
    hasPromptedDefault: false,
    memorySaver: true
  });
  
  const [activeSection, setActiveSection] = useState('general');
  const [isDefault, setIsDefault] = useState(false);
  const [importStatus, setImportStatus] = useState({ type: '', message: '', count: 0 });
  const [saveStatus, setSaveStatus] = useState(false);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    async function checkDefaultStatus() {
      if (electronAPI?.isDefaultBrowser) {
        const status = await electronAPI.isDefaultBrowser();
        setIsDefault(status);
      }
    }
    checkDefaultStatus();
  }, [electronAPI]);

  const handleChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onSaveSettings(updated);
    
    // Show quick temporary save flash
    setSaveStatus(true);
    const timer = setTimeout(() => setSaveStatus(false), 1200);
    return () => clearTimeout(timer);
  };

  const handleSetDefault = async () => {
    if (electronAPI?.setDefaultBrowser) {
      const result = await electronAPI.setDefaultBrowser();
      if (result) {
        // Re-check shortly after
        setTimeout(async () => {
          const status = await electronAPI.isDefaultBrowser();
          setIsDefault(status);
        }, 1500);
      }
    }
  };

  const handleImport = async (browserType) => {
    setImportStatus({ type: 'loading', message: `Импорт из ${browserType}...`, count: 0 });
    if (!electronAPI?.importBookmarks) return;
    
    try {
      const res = await electronAPI.importBookmarks(browserType);
      if (res.success) {
        setImportStatus({
          type: 'success',
          message: `Импорт успешно завершен! Добавлено закладок: ${res.count}`,
          count: res.count
        });
        if (onRefreshBookmarks) onRefreshBookmarks();
      } else {
        setImportStatus({
          type: 'error',
          message: res.error || 'Не удалось найти закладки или файлы браузера.',
          count: 0
        });
      }
    } catch (e) {
      setImportStatus({ type: 'error', message: 'Произошла непредвиденная ошибка при импорте.', count: 0 });
    }
  };

  const handleImportDialog = async () => {
    setImportStatus({ type: 'loading', message: 'Выбор файла закладок...', count: 0 });
    if (!electronAPI?.importBookmarksDialog) return;
    
    try {
      const res = await electronAPI.importBookmarksDialog();
      if (res.success) {
        setImportStatus({
          type: 'success',
          message: `Импорт из файла ${res.filePath || ''} завершен! Добавлено закладок: ${res.count}`,
          count: res.count
        });
        if (onRefreshBookmarks) onRefreshBookmarks();
      } else if (!res.canceled) {
        setImportStatus({
          type: 'error',
          message: res.error || 'Не удалось импортировать файл.',
          count: 0
        });
      } else {
        setImportStatus({ type: '', message: '', count: 0 });
      }
    } catch (e) {
      setImportStatus({ type: 'error', message: 'Не удалось прочитать или импортировать файл.', count: 0 });
    }
  };

  const menuItems = [
    { id: 'general', label: 'Основные', icon: Globe },
    { id: 'search', label: 'Поисковая система', icon: SettingsIcon },
    { id: 'appearance', label: 'Внешний вид', icon: Palette },
    { id: 'import', label: 'Импорт данных', icon: Download },
    { id: 'default', label: 'По умолчанию', icon: CheckCircle },
    { id: 'about', label: 'О браузере', icon: Sparkles }
  ];

  return (
    <div className="settings-page-container">
      {/* Settings Navigation Sidebar */}
      <div className="settings-nav-sidebar">
        <div className="settings-nav-title">
          <SettingsIcon size={16} className="title-icon-spin" />
          Настройки
        </div>
        <div className="settings-nav-list">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`settings-nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        
        {saveStatus && (
          <div className="settings-save-toast">
            <CheckCircle size={12} style={{ color: 'var(--accent-green)' }} />
            <span>Настройки сохранены</span>
          </div>
        )}
      </div>

      {/* Settings Content Area */}
      <div className="settings-content-viewport">
        {activeSection === 'general' && (
          <div className="settings-section">
            <h2>Основные настройки</h2>
            <p className="section-description">Настройки домашней страницы, запуска и ключевых параметров</p>

            <div className="settings-card">
              <div className="settings-card-row">
                <div className="settings-label-desc">
                  <div className="settings-label-text">Домашняя страница</div>
                  <div className="settings-subtext">Страница, открываемая по умолчанию при запуске или нажатии кнопки Домой</div>
                </div>
                <input
                  type="text"
                  className="settings-text-input"
                  value={localSettings.homepage}
                  onChange={(e) => handleChange('homepage', e.target.value)}
                />
              </div>

              <div className="settings-card-row">
                <div className="settings-label-desc">
                  <div className="settings-label-text">Экономия памяти (Оптимизация)</div>
                  <div className="settings-subtext">Приостановка активности неактивных вкладок в фоне для ускорения работы браузера</div>
                </div>
                <label className="cyber-switch">
                  <input
                    type="checkbox"
                    checked={localSettings.memorySaver}
                    onChange={(e) => handleChange('memorySaver', e.target.checked)}
                  />
                  <span className="cyber-slider"></span>
                </label>
              </div>
            </div>

            <div className="settings-card" style={{ marginTop: '16px' }}>
              <h3>Ключ Google Gemini API</h3>
              <p className="settings-subtext" style={{ marginBottom: '12px' }}>
                Используется для ИИ-помощника (функции резюме, поиска фактов и умного диалога Cometa).
              </p>
              <input
                type="password"
                className="settings-text-input"
                style={{ width: '100%' }}
                placeholder="Вставьте ваш API ключ (AIzaSy...)"
                value={localSettings.geminiKey}
                onChange={(e) => handleChange('geminiKey', e.target.value)}
              />
            </div>
          </div>
        )}

        {activeSection === 'search' && (
          <div className="settings-section">
            <h2>Поисковая система</h2>
            <p className="section-description">Выберите поисковую систему, используемую для поиска в адресной строке</p>

            <div className="settings-card">
              <div className="settings-card-row">
                <div className="settings-label-desc">
                  <div className="settings-label-text">Поиск по умолчанию</div>
                  <div className="settings-subtext">Используется при вводе поисковых запросов в адресную строку</div>
                </div>
                <select
                  className="settings-select"
                  value={localSettings.searchEngine}
                  onChange={(e) => handleChange('searchEngine', e.target.value)}
                >
                  <option value="google">Google</option>
                  <option value="yandex">Яндекс</option>
                  <option value="bing">Bing</option>
                  <option value="duckduckgo">DuckDuckGo</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div className="settings-section">
            <h2>Внешний вид</h2>
            <p className="section-description">Кастомизация визуального стиля KDG Browser под ваши предпочтения</p>

            <div className="settings-card">
              <div className="settings-card-row" style={{ display: 'block' }}>
                <div className="settings-label-text" style={{ marginBottom: '12px' }}>Выбор цветовой схемы</div>
                <div className="theme-grid">
                  {[
                    { id: 'dark', name: 'Тёмная ночь', desc: 'Классический темный интерфейс', color: '#1a1a2e' },
                    { id: 'gamer', name: 'Геймерский стиль', desc: 'Глубокий темный с неоновым рубином', color: '#0d0d12' },
                    { id: 'light', name: 'Светлая тема', desc: 'Свежий и чистый светлый дизайн', color: '#f8fafc' }
                  ].map(t => (
                    <button
                      key={t.id}
                      className={`theme-card-option ${localSettings.theme === t.id ? 'active' : ''}`}
                      onClick={() => handleChange('theme', t.id)}
                    >
                      <div className="theme-preview-color" style={{ backgroundColor: t.color }} />
                      <div className="theme-option-info">
                        <div className="theme-option-name">{t.name}</div>
                        <div className="theme-option-desc">{t.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'import' && (
          <div className="settings-section">
            <h2>Импорт данных</h2>
            <p className="section-description">Перенесите ваши закладки и историю из других браузеров в KDG Browser</p>

            <div className="settings-card">
              <h3>Быстрый импорт закладок</h3>
              <p className="settings-subtext" style={{ marginBottom: '16px' }}>
                Мы автоматически найдем и перенесем закладки из установленных на вашем компьютере браузеров.
              </p>

              <div className="import-buttons-row">
                <button className="gamer-btn gamer-btn-orange" onClick={() => handleImport('chrome')}>
                  Импортировать из Google Chrome
                </button>
                <button className="gamer-btn gamer-btn-orange" onClick={() => handleImport('edge')}>
                  Импортировать из Microsoft Edge
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--chrome-border)', margin: '20px 0' }} />

              <h3>Ручной импорт закладок</h3>
              <p className="settings-subtext" style={{ marginBottom: '12px' }}>
                Вы можете загрузить закладки, экспортированные из любого браузера (Firefox, Safari и др.) в формате HTML.
              </p>

              <button className="gamer-btn" onClick={handleImportDialog}>
                Выбрать HTML-файл закладок...
              </button>

              {importStatus.message && (
                <div className={`import-status-box ${importStatus.type}`}>
                  {importStatus.type === 'success' && <CheckCircle size={14} className="status-icon" />}
                  {importStatus.type === 'error' && <AlertCircle size={14} className="status-icon" />}
                  {importStatus.type === 'loading' && <RefreshCw size={14} className="status-icon spin" />}
                  <span>{importStatus.message}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'default' && (
          <div className="settings-section">
            <h2>Браузер по умолчанию</h2>
            <p className="section-description">Настройка KDG Browser как основного приложения для просмотра сайтов</p>

            <div className="settings-card">
              <div className="settings-card-row">
                <div className="settings-label-desc">
                  <div className="settings-label-text">Использование по умолчанию</div>
                  <div className="settings-subtext">
                    {isDefault 
                      ? 'KDG Browser выбран вашим браузером по умолчанию' 
                      : 'KDG Browser в данный момент не является вашим браузером по умолчанию'}
                  </div>
                </div>

                {isDefault ? (
                  <div className="default-badge">
                    <CheckCircle size={14} />
                    <span>Установлен по умолчанию</span>
                  </div>
                ) : (
                  <button className="gamer-btn gamer-btn-orange" onClick={handleSetDefault}>
                    Сделать по умолчанию
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="settings-section">
            <h2>О браузере KDG</h2>
            <p className="section-description">Информация о сборке и версии приложения</p>

            <div className="settings-card" style={{ textAlign: 'center', padding: '32px' }}>
              <div className="about-logo">
                <Sparkles size={48} className="logo-sparkle-glow" />
              </div>
              <h1 className="about-title">KDG Browser v3.0.0</h1>
              <p className="about-tagline">Полнофункциональный ИИ-браузер для «Канала Доброго Геймера»</p>
              
              <div className="about-details">
                <div className="details-row">
                  <span>Версия сборки</span>
                  <strong>3.0.0 (Chromium Core)</strong>
                </div>
                <div className="details-row">
                  <span>Статус обновлений</span>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Версия актуальна</span>
                </div>
                <div className="details-row">
                  <span>Разработчик</span>
                  <span>KDG Developer Team</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                © 2026 KDG Browser. Все права защищены.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
