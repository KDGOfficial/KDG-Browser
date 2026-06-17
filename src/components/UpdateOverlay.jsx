import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, Download } from 'lucide-react';

export function UpdateOverlay({ electronAPI, onFinished }) {
  const [status, setStatus] = useState('checking'); // checking, no-available, available, downloading, downloaded, error
  const [progress, setProgress] = useState(0);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!electronAPI) {
      // In web development / browser testing mock environment
      setTimeout(() => {
        setStatus('no-available');
        onFinished();
      }, 500);
      return;
    }

    // Set up updater status handler
    electronAPI.onUpdateStatus((event, data) => {
      const currentStatus = data?.status;
      if (currentStatus === 'checking') {
        setStatus('checking');
      } else if (currentStatus === 'update-available') {
        setStatus('available');
        setInfo(data.info);
      } else if (currentStatus === 'update-not-available') {
        setStatus('no-available');
        onFinished();
      } else if (currentStatus === 'download-progress') {
        setStatus('downloading');
        setProgress(Math.round(data.progress || 0));
      } else if (currentStatus === 'update-downloaded') {
        setStatus('downloaded');
      } else if (currentStatus === 'error') {
        setStatus('error');
        setError(data.error || 'Произошла непредвиденная ошибка при поиске обновлений.');
        onFinished();
      }
    });

    // Start checking immediately
    electronAPI.checkForUpdates();
  }, [electronAPI, onFinished]);

  const handleStartDownload = () => {
    if (electronAPI) {
      electronAPI.downloadUpdate();
      setStatus('downloading');
    }
  };

  const handleQuitAndInstall = () => {
    if (electronAPI) {
      electronAPI.quitAndInstallUpdate();
    }
  };

  const handleSkip = () => {
    setVisible(false);
    setTimeout(onFinished, 500);
  };

  // Only show the overlay if an update is found, downloading, or downloaded.
  // Otherwise, run silently in the background.
  const isSilentStatus = status === 'checking' || status === 'no-available' || status === 'error';

  if (!visible || isSilentStatus) {
    return null;
  }

  return (
    <div className="update-overlay-container" style={{ opacity: visible ? 1 : 0 }}>
      <div className="update-overlay-card">
        <div className="logo-container" style={{ fontSize: '1.4rem', justifyContent: 'center', marginBottom: '8px' }}>
          <span className="logo-icon">🎮</span>
          <span className="home-logo-kdg">KDG</span>
          <span className="home-logo-browser">Browser</span>
        </div>

        {status === 'checking' && (
          <>
            <h2 className="update-title">Проверка обновлений</h2>
            <div className="update-status-box">
              <div className="update-spinner-ring"></div>
              <span className="update-status-text">Ищем новые версии на сервере обновлений KDG...</span>
            </div>
          </>
        )}

        {status === 'no-available' && (
          <>
            <h2 className="update-title" style={{ color: 'var(--accent-green)' }}>Система обновлена</h2>
            <div className="update-status-box">
              <CheckCircle size={48} style={{ color: 'var(--accent-green)', filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.4))' }} />
              <span className="update-status-text">У вас установлена последняя версия браузера!</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Запуск главного окна...</span>
            </div>
          </>
        )}

        {status === 'available' && (
          <>
            <h2 className="update-title">Доступно обновление!</h2>
            <div className="update-status-box" style={{ gap: '16px' }}>
              <RefreshCw size={44} style={{ color: 'var(--accent)', animation: 'update-spin 6s linear infinite' }} />
              <span className="update-status-text" style={{ fontSize: '0.95rem' }}>
                Доступна версия <strong>v{info?.version || 'Новая'}</strong> (текущая: v{electronAPI ? '3.2.6' : '3.0.0'})
              </span>
              
              {info?.releaseNotes && (
                <div className="update-info-details">
                  <strong>Что нового:</strong>
                  <div style={{ marginTop: '6px', whiteSpace: 'pre-wrap' }}>
                    {info.releaseNotes}
                  </div>
                </div>
              )}

              <div className="update-btn-group">
                <button className="update-btn update-btn-primary" onClick={handleStartDownload}>
                  <Download size={14} /> Скачать
                </button>
                <button className="update-btn update-btn-secondary" onClick={handleSkip}>
                  Позже <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}

        {status === 'downloading' && (
          <>
            <h2 className="update-title">Загрузка обновления</h2>
            <div className="update-status-box">
              <span className="update-status-text">Скачиваем новый пакет обновления: {progress}%</span>
              <div className="update-progress-bar">
                <div className="update-progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </>
        )}

        {status === 'downloaded' && (
          <>
            <h2 className="update-title" style={{ color: 'var(--accent-green)' }}>Обновление готово!</h2>
            <div className="update-status-box">
              <ShieldCheck size={48} style={{ color: 'var(--accent-green)', filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.4))' }} />
              <span className="update-status-text">Новый пакет успешно загружен. Требуется перезагрузка.</span>
              
              <div className="update-btn-group">
                <button className="update-btn update-btn-primary" onClick={handleQuitAndInstall}>
                  Установить и перезапустить
                </button>
                <button className="update-btn update-btn-secondary" onClick={handleSkip}>
                  Позже
                </button>
              </div>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="update-title" style={{ color: 'var(--accent-red)' }}>Ошибка обновления</h2>
            <div className="update-status-box" style={{ gap: '16px' }}>
              <AlertTriangle size={44} style={{ color: 'var(--accent-red)' }} />
              <span className="update-status-text" style={{ fontSize: '0.85rem' }}>
                Не удалось проверить или загрузить обновления:
                <div style={{ color: 'var(--text-muted)', marginTop: '8px', fontFamily: 'monospace', background: 'rgba(0,0,0,0.15)', padding: '8px', borderRadius: '4px' }}>
                  {error}
                </div>
              </span>
              <button className="update-btn update-btn-secondary" onClick={handleSkip} style={{ width: '100%' }}>
                Продолжить работу в браузере
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
