import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, X, ArrowLeft, ArrowRight, RotateCw, Home as HomeIcon, 
  Star, BrainCircuit, Settings, Globe, Search as SearchIcon,
  Lock, Shield, Download, MoreVertical, ChevronDown
} from 'lucide-react';

// Get favicon URL from any website
function getFaviconUrl(url) {
  if (!url || url.startsWith('kdg://')) return null;
  try {
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return null;
  }
}

// Detect if URL is secure
function getSecurityState(url) {
  if (!url || url.startsWith('kdg://')) return 'internal';
  if (url.startsWith('https://')) return 'secure';
  if (url.startsWith('http://')) return 'insecure';
  return 'unknown';
}

function TabFavicon({ url, isActive }) {
  const [imgError, setImgError] = useState(false);
  const faviconUrl = getFaviconUrl(url);

  if (!faviconUrl || imgError) {
    return <Globe size={13} style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }} />;
  }

  return (
    <img
      src={faviconUrl}
      width={14} height={14}
      style={{ borderRadius: 2, flexShrink: 0, objectFit: 'contain' }}
      onError={() => setImgError(true)}
      alt=""
    />
  );
}

export function Header({
  tabs,
  activeTabId,
  setActiveTabId,
  handleAddTab,
  handleCloseTab,
  addressValue,
  setAddressValue,
  handleAddressSubmit,
  handleGoBack,
  handleGoForward,
  handleRefresh,
  handleGoHome,
  activeTab,
  isLoading,
  isAiOpen,
  setIsAiOpen,
  setIsSettingsOpen,
  isBookmarked,
  handleToggleBookmark,
  isDownloadsOpen,
  setIsDownloadsOpen,
  downloadCount
}) {
  const securityState = getSecurityState(activeTab?.url);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handleInputFocus = (e) => {
    setFocused(true);
    e.target.select();
  };

  const handleInputBlur = () => {
    setFocused(false);
  };

  const getAddressDisplay = () => {
    if (focused) return addressValue;
    if (activeTab?.url?.startsWith('kdg://')) return 'KDG Browser — Домашняя страница';
    return addressValue;
  };

  return (
    <header className="browser-header">
      {/* ── Tab Strip ─────────────────────────────────── */}
      <div className="tab-strip">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              className={`browser-tab ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTabId(tab.id)}
              title={tab.title}
            >
              <TabFavicon url={tab.url} isActive={isActive} />
              <span className="tab-title-text">{tab.title}</span>
              <button
                className="browser-tab-close"
                onClick={(e) => handleCloseTab(tab.id, e)}
                title="Закрыть вкладку"
              >
                <X size={10} />
              </button>
            </div>
          );
        })}

        <button className="add-tab-btn" onClick={handleAddTab} title="Открыть новую вкладку (Ctrl+T)">
          <Plus size={15} />
        </button>
      </div>

      {/* ── Navigation / Address Bar ───────────────────── */}
      <div className="nav-bar">
        {/* Back / Forward / Reload / Home */}
        <div className="nav-btn-group" style={{ display: 'flex', gap: '2px' }}>
          <button
            className="nav-btn"
            onClick={handleGoBack}
            disabled={activeTab?.url?.startsWith('kdg://') || !activeTab?.canGoBack}
            title="Назад (Alt+←)"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            className="nav-btn"
            onClick={handleGoForward}
            disabled={activeTab?.url?.startsWith('kdg://') || !activeTab?.canGoForward}
            title="Вперёд (Alt+→)"
          >
            <ArrowRight size={16} />
          </button>
          <button
            className="nav-btn"
            onClick={handleRefresh}
            title={isLoading ? 'Остановить (Esc)' : 'Обновить (F5)'}
          >
            {isLoading
              ? <X size={16} />
              : <RotateCw size={15} />
            }
          </button>
          <button className="nav-btn" onClick={handleGoHome} title="Домашняя страница">
            <HomeIcon size={15} />
          </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleAddressSubmit} className="address-bar-container" style={{ flex: 1 }}>
          {/* Security indicator */}
          {securityState === 'secure' && (
            <Lock size={13} className="address-icon" style={{ color: 'var(--accent-green)' }} />
          )}
          {securityState === 'insecure' && (
            <Shield size={13} className="address-icon" style={{ color: 'var(--accent-orange)' }} />
          )}
          {securityState === 'internal' && (
            <BrainCircuit size={13} className="address-icon" style={{ color: 'var(--accent)' }} />
          )}
          {securityState === 'unknown' && (
            <Globe size={13} className="address-icon" />
          )}

          <input
            ref={inputRef}
            type="text"
            className="address-bar-input"
            value={focused ? addressValue : getAddressDisplay()}
            onChange={(e) => setAddressValue(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Поиск или адрес сайта..."
          />

          {/* Bookmark star */}
          {!activeTab?.url?.startsWith('kdg://') && (
            <button
              type="button"
              className={`bookmark-toggle-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={handleToggleBookmark}
              title={isBookmarked ? 'Удалить закладку' : 'Добавить закладку (Ctrl+D)'}
            >
              <Star size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          )}
        </form>

        {/* Right-side actions */}
        <div className="nav-actions">
          {/* Downloads */}
          <button
            className={`nav-btn ${isDownloadsOpen ? 'active' : ''}`}
            onClick={() => setIsDownloadsOpen?.(!isDownloadsOpen)}
            title="Загрузки (Ctrl+J)"
            style={{ position: 'relative' }}
          >
            <Download size={16} />
            {downloadCount > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--accent)', border: '1.5px solid var(--chrome-toolbar)'
              }} />
            )}
          </button>

          {/* AI Assistant */}
          <button
            className={`nav-btn ${isAiOpen ? 'active' : ''}`}
            onClick={() => setIsAiOpen(!isAiOpen)}
            title="ИИ-Помощник KDG"
            style={{ color: isAiOpen ? 'var(--accent)' : undefined }}
          >
            <BrainCircuit size={16} />
          </button>

          {/* Settings */}
          <button
            className="nav-btn"
            onClick={() => setIsSettingsOpen(true)}
            title="Настройки (Ctrl+,)"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
