import React, { useEffect, useState } from 'react';
import { BrainCircuit, ShieldAlert } from 'lucide-react';

export function Footer() {
  const [hasApiKey, setHasApiKey] = useState(true);
  const electronAPI = window.electronAPI;

  useEffect(() => {
    async function checkApiKey() {
      if (electronAPI?.getSettings) {
        try {
          const settings = await electronAPI.getSettings();
          setHasApiKey(!!settings?.geminiKey);
        } catch (e) {
          console.error(e);
        }
      }
    }
    checkApiKey();
    // Set up brief polling for settings updates
    const interval = setInterval(checkApiKey, 5000);
    return () => clearInterval(interval);
  }, [electronAPI]);

  return (
    <footer className="browser-footer">
      <div>
        <span>KDG Browser v1.0.0 | Разработано для Канала Доброго Геймера</span>
      </div>
      
      <div className="footer-status">
        <BrainCircuit size={14} style={{ color: hasApiKey ? 'var(--accent-green)' : 'var(--text-muted)' }} />
        <span>ИИ Движок: Google Gemini 1.5 Flash</span>
        <div className={`status-dot ${hasApiKey ? 'active' : ''}`} />
        <span style={{ fontSize: '0.7rem', color: hasApiKey ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
          {hasApiKey ? 'АКТИВЕН' : 'БЕЗ КЛЮЧА'}
        </span>
      </div>
    </footer>
  );
}
