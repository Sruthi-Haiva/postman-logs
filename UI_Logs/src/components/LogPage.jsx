import React, { useState } from 'react';
import JsonViewer from './JsonViewer';
import TableView from './TableView';

function ToggleBtn({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '7px 16px',
        border: 'none',
        borderRadius: 7,
        background: active ? '#19427D' : 'transparent',
        color: active ? '#ffffff' : '#5a7aa8',
        fontSize: 13,
        cursor: 'pointer',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#e8f0fb'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      {icon}
      {label}
    </button>
  );
}

export default function LogPage({
  apiBase,
  endpoint,
  allColumns,        
  defaultColumns,    
}) {
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('raw');

  const fetchLogs = async () => {
    const trimmed = sessionId.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const url = `${apiBase}${endpoint}?session_id=${encodeURIComponent(trimmed)}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.error) {
        setError(json.error);
      } else {
        setData(json);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Input */}
      <div style={{
        padding: '16px 32px',
        borderBottom: '1px solid #dce8f5',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
      }}>
        <input
          type="text"
          value={sessionId}
          onChange={e => setSessionId(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchLogs()}
          placeholder="Enter Session ID..."
          style={{
            flex: 1, maxWidth: 480,
            padding: '10px 16px',
            border: '1.5px solid #c4d9f5',
            borderRadius: 8, fontSize: 14,
            fontFamily: "'IBM Plex Mono', monospace",
            color: '#19427D', background: '#f4f8ff', outline: 'none',
          }}
          onFocus={e => { e.target.style.borderColor = '#19427D'; e.target.style.boxShadow = '0 0 0 3px rgba(25,66,125,0.08)'; }}
          onBlur={e => { e.target.style.borderColor = '#c4d9f5'; e.target.style.boxShadow = 'none'; }}
        />

        <button
          onClick={fetchLogs}
          disabled={loading || !sessionId.trim()}
          style={{
            padding: '10px 24px',
            background: loading || !sessionId.trim() ? '#a0b8d8' : '#19427D',
            color: '#ffffff', border: 'none', borderRadius: 8,
            fontSize: 14, fontWeight: 600,
            cursor: loading || !sessionId.trim() ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          {loading && (
            <span style={{
              display: 'inline-block', width: 14, height: 14,
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff', borderRadius: '50%',
              animation: 'spin 0.7s linear infinite',
            }}/>
          )}
          {loading ? 'Loading...' : 'Send'}
        </button>
         {data && (
          <div style={{
            marginLeft: 'auto',
            display: 'flex', alignItems: 'center', gap: 2,
            padding: 4,
            background: '#f4f8ff',
            borderRadius: 9,
            border: '1.5px solid #dce8f5',
          }}>
            <ToggleBtn
              label="Raw JSON"
              active={viewMode === 'raw'}
              onClick={() => setViewMode('raw')}
              icon={
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              }
            />
            <ToggleBtn
              label="Table"
              active={viewMode === 'table'}
              onClick={() => setViewMode('table')}
              icon={
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="3" y1="15" x2="21" y2="15"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
              }
            />
          </div>
         )}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          margin: '20px 32px',
          background: '#fff0f0', border: '1px solid #f5c4c4',
          borderRadius: 8, padding: '14px 18px',
          fontSize: 13, color: '#b94040',
          fontFamily: "'IBM Plex Mono', monospace",
          whiteSpace: 'pre-wrap', flexShrink: 0,
        }}>
          {error}
        </div>
      )}

      {/* Empty state */}
      {!data && !error && !loading && (
        <div style={{
          padding: '32px', fontSize: 14,
          color: '#a0b8d8', fontStyle: 'italic',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Enter a session ID above to load logs.
        </div>
      )}

      {data && viewMode === 'raw'   && <JsonViewer data={data} />}
      
      {data && viewMode === 'table' && (
        <TableView
          data={data}
          allColumns={allColumns}          
          defaultColumns={defaultColumns}  
        />
      )}
    </div>
  );
}