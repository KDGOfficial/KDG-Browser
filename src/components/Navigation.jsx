import React from 'react';
import { Home, Search, Star, BrainCircuit, Clock, Settings, Download, Puzzle } from 'lucide-react';

const navItems = [
  { id: 'home',      label: 'Главная',  icon: Home },
  { id: 'search',    label: 'Поиск',    icon: Search },
  { id: 'favorites', label: 'Закладки', icon: Star },
  { id: 'history',   label: 'История',  icon: Clock },
  { id: 'downloads', label: 'Загрузки', icon: Download },
  { id: 'extensions',label: 'Расширения',icon: Puzzle },
  { id: 'ai',        label: 'ИИ',       icon: BrainCircuit },
  { id: 'settings',  label: 'Настройки', icon: Settings },
];

export function Navigation({ activeSection, setActiveSection }) {
  return (
    <aside className="dashboard-sidebar">
      {navItems.map(({ id, label, icon: Icon }) => {
        const active = activeSection === id;
        return (
          <button
            key={id}
            className={`sidebar-btn ${active ? 'active' : ''}`}
            onClick={() => setActiveSection(id)}
            data-tooltip={label}
          >
            <Icon />
            <span>{label}</span>
          </button>
        );
      })}
    </aside>
  );
}
