import React, { useState } from 'react';

const EXPANDED_WIDTH = 155;
const COLLAPSED_WIDTH = 52;

const styles = {
  aside: (isOpen) => ({
    width: isOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
    minWidth: isOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
    background: '#19427D',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    transition: 'width 0.3s ease, min-width 0.3s ease',
    borderRight: '2px solid #ffffff',
  }),
  hamburger: (isOpen) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isOpen ? 'flex-end' : 'center',
    width: '100%',
    padding: isOpen ? '16px 12px 8px' : '16px 0 8px',
    border: 'none',
    background: 'transparent',
    color: '#ffffff',
    cursor: 'pointer',
  }),
  nav: {
    padding: '8px 8px',
    flex: 1,
  },
  navItem: (open, isOpen) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isOpen ? 'space-between' : 'center',
    padding: isOpen ? '10px 12px' : '10px 0',
    borderRadius: 8,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background 0.15s',
    color: open ? '#ffffff' : 'rgba(255,255,255,0.6)',
    background: open ? 'rgba(255,255,255,0.14)' : 'transparent',
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    whiteSpace: 'nowrap',
  }),
  navItemLeft: (isOpen) => ({
    display: 'flex',
    alignItems: 'center',
    gap: isOpen ? 10 : 0,
    justifyContent: 'center',
  }),
  label: (isOpen) => ({
    opacity: isOpen ? 1 : 0,
    width: isOpen ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'opacity 0.2s ease, width 0.3s ease',
    fontFamily: "'DM Sans', sans-serif",
  }),
  chevron: (open, isOpen) => ({
    width: isOpen ? 16 : 0,
    height: 16,
    transition: 'transform 0.25s ease, opacity 0.2s ease, width 0.3s ease',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    flexShrink: 0,
    opacity: isOpen ? 1 : 0,
  }),
  dropdown: (open, isOpen) => ({
    overflow: 'hidden',
    maxHeight: open && isOpen ? 200 : 0,
    transition: 'max-height 0.3s ease',
  }),
  subItem: (active, isOpen) => ({
    padding: isOpen ? '9px 12px 9px 36px' : '9px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isOpen ? 'flex-start' : 'center',
    borderRadius: 8,
    margin: '2px 0',
    cursor: 'pointer',
    fontSize: 13,
    color: active ? '#ffffff' : 'rgba(255,255,255,0.55)',
    background: active ? 'rgba(255,255,255,0.14)' : 'transparent',
    transition: 'background 0.15s, color 0.15s',
    position: 'relative',
    fontFamily: "'DM Sans', sans-serif",
    whiteSpace: 'nowrap',
  }),
  dot: (active, isOpen) => ({
    position: isOpen ? 'absolute' : 'static',
    left: isOpen ? 20 : 'auto',
    top: isOpen ? '50%' : 'auto',
    transform: isOpen ? 'translateY(-50%)' : 'none',
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'currentColor',
    opacity: active ? 1 : 0.5,
    flexShrink: 0,
  }),
  subLabel: (isOpen) => ({
    opacity: isOpen ? 1 : 0,
    width: isOpen ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'opacity 0.2s ease',
    fontFamily: "'DM Sans', sans-serif",
  }),
};

export default function Sidebar({ activePage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(true);
  const [logsOpen, setLogsOpen] = useState(true);

  return (
    <aside style={styles.aside(isOpen)}>

      {/* Hamburger */}
      <button style={styles.hamburger(isOpen)} onClick={() => setIsOpen(o => !o)}>
        <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <nav style={styles.nav}>
        {/* Logs toggle */}
        <div
          style={styles.navItem(logsOpen, isOpen)}
          onClick={() => isOpen && setLogsOpen(o => !o)}
          onMouseEnter={e => {
            if (!logsOpen) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = '#ffffff';
            }
          }}
          onMouseLeave={e => {
            if (!logsOpen) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
            }
          }}
        >
          <div style={styles.navItemLeft(isOpen)}>
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <span style={styles.label(isOpen)}>Logs</span>
          </div>
          <svg style={styles.chevron(logsOpen, isOpen)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

        {/* Dropdown */}
        <div style={styles.dropdown(logsOpen, isOpen)}>
          {[
            { key: 'executor', label: 'Executor Logs' },
            { key: 'ai',       label: 'AI Logs' },
          ].map(({ key, label }) => (
            <div
              key={key}
              style={styles.subItem(activePage === key, isOpen)}
              onClick={() => onNavigate(key)}
              onMouseEnter={e => {
                if (activePage !== key) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={e => {
                if (activePage !== key) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                }
              }}
            >
              <span style={styles.dot(activePage === key, isOpen)} />
              <span style={styles.subLabel(isOpen)}>{label}</span>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}