import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Globe, Palette, Shield, Sparkles, 
  Download, RefreshCw, Layers, Cpu, CheckCircle, AlertCircle
} from 'lucide-react';

export function Settings({ settings, onSaveSettings, onRefreshBookmarks, onOpenMigrationWizard }) {
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
  const [appVersion, setAppVersion] = useState('3.1.0');
  const [updateStatus, setUpdateStatus] = useState({ status: 'idle', message: '', progress: 0 });

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

    async function initUpdates() {
      if (electronAPI?.getVersion) {
        const version = await electronAPI.getVersion();
        setAppVersion(version);
      }
      
      if (electronAPI?.onUpdateStatus) {
        electronAPI.onUpdateStatus((event, data) => {
          if (data.status === 'checking') {
            setUpdateStatus({ status: 'checking', message: 'Проверка обновлений...', progress: 0 });
          } else if (data.status === 'update-available') {
            setUpdateStatus({ status: 'available', message: `Доступна новая версия: ${data.info?.version || ''}`, progress: 0 });
          } else if (data.status === 'update-not-available') {
            setUpdateStatus({ status: 'idle', message: 'У вас установлена последняя версия.', progress: 0 });
          } else if (data.status === 'download-progress') {
            setUpdateStatus({ status: 'downloading', message: 'Скачивание обновления...', progress: data.progress });
          } else if (data.status === 'update-downloaded') {
            setUpdateStatus({ status: 'ready', message: 'Обновление готово к установке.', progress: 100 });
          } else if (data.status === 'error') {
            setUpdateStatus({ status: 'error', message: `Ошибка обновления: ${data.error}`, progress: 0 });
          }
        });
      }
    }
    initUpdates();
  }, [electronAPI]);

  const handleCheckUpdates = () => {
    setUpdateStatus({ status: 'checking', message: 'Проверка обновлений...', progress: 0 });
    if (electronAPI?.checkForUpdates) {
      electronAPI.checkForUpdates();
    }
  };

  const handleDownloadUpdate = () => {
    setUpdateStatus({ status: 'downloading', message: 'Начинаем загрузку...', progress: 0 });
    if (electronAPI?.downloadUpdate) {
      electronAPI.downloadUpdate();
    }
  };

  const handleInstallUpdate = () => {
    if (electronAPI?.quitAndInstallUpdate) {
      electronAPI.quitAndInstallUpdate();
    }
  };

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
                    { id: 'light', name: 'Светлая тема', desc: 'Свежий и чистый светлый дизайн', color: '#f8fafc' },
                    { id: 'aero', name: 'Aero Glass', desc: 'Полностью прозрачный стеклянный дизайн', color: 'rgba(56, 189, 248, 0.4)' }
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
              <h3>Комплексный импорт данных</h3>
              <p className="settings-subtext" style={{ marginBottom: '16px' }}>
                Мастер миграции поможет перенести закладки, историю посещений, пароли и настройки из любого установленного браузера.
              </p>

              <div className="import-buttons-row">
                <button className="gamer-btn gamer-btn-orange" onClick={onOpenMigrationWizard}>
                  Запустить Мастер миграции
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
              <h1 className="about-title">KDG Browser v{appVersion}</h1>
              <p className="about-tagline">Полнофункциональный ИИ-браузер для «Канала Доброго Геймера»</p>
              
              <div className="about-details">
                <div className="details-row">
                  <span>Версия сборки</span>
                  <strong>{appVersion} (Chromium Core)</strong>
                </div>
                <div className="details-row" style={{ alignItems: 'flex-start' }}>
                  <span>Обновления</span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    {updateStatus.status === 'idle' || updateStatus.status === 'error' ? (
                      <button className="gamer-btn" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={handleCheckUpdates}>
                        Проверить обновления
                      </button>
                    ) : null}
                    
                    {updateStatus.status === 'checking' && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                        <RefreshCw size={14} className="spin" /> Проверка...
                      </span>
                    )}

                    {updateStatus.status === 'available' && (
                      <button className="gamer-btn gamer-btn-orange" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={handleDownloadUpdate}>
                        Скачать обновление
                      </button>
                    )}

                    {updateStatus.status === 'downloading' && (
                      <div style={{ width: '150px', textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', marginBottom: '4px', color: 'var(--accent-orange)' }}>
                          Загрузка: {Math.round(updateStatus.progress || 0)}%
                        </div>
                        <div style={{ width: '100%', height: '4px', background: 'var(--surface-3)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${updateStatus.progress || 0}%`, height: '100%', background: 'var(--accent-orange)' }}></div>
                        </div>
                      </div>
                    )}

                    {updateStatus.status === 'ready' && (
                      <button className="gamer-btn gamer-btn-orange" style={{ padding: '6px 12px', fontSize: '0.85rem', background: 'var(--accent-green)', borderColor: 'var(--accent-green)' }} onClick={handleInstallUpdate}>
                        Установить и перезапустить
                      </button>
                    )}

                    {updateStatus.message && updateStatus.status !== 'checking' && updateStatus.status !== 'downloading' && (
                      <div style={{ fontSize: '0.8rem', color: updateStatus.status === 'error' ? '#ff4a4a' : 'var(--text-muted)', marginTop: '4px', maxWidth: '200px', textAlign: 'right' }}>
                        {updateStatus.message}
                      </div>
                    )}
                  </div>
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
