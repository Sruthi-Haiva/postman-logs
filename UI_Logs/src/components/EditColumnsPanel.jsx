import React, { useState, useRef } from 'react';

export default function EditColumnsPanel({ visible, columns, allColumns, onChange, onClose }) {
  const dragIdx = useRef(null);
  const [dragOver, setDragOver] = useState(null);
  const [search, setSearch] = useState('');

  const activeKeys = columns.map(c => c.key);

  const available = allColumns.filter(
    c =>
      !activeKeys.includes(c.key) &&
      (c.label.toLowerCase().includes(search.toLowerCase()) ||
        c.key.toLowerCase().includes(search.toLowerCase()))
  );

  const onDragStart = (e, idx) => {
    dragIdx.current = idx;
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnter = (idx) => setDragOver(idx);

  const onDrop = (e, dropIdx) => {
    e.preventDefault();
    if (dragIdx.current === null || dragIdx.current === dropIdx) return;

    const reordered = [...columns];
    const [moved] = reordered.splice(dragIdx.current, 1);
    reordered.splice(dropIdx, 0, moved);

    onChange(reordered);
    dragIdx.current = null;
    setDragOver(null);
  };

  const onDragEnd = () => {
    dragIdx.current = null;
    setDragOver(null);
  };

  const removeColumn = (key) => onChange(columns.filter(c => c.key !== key));
  const addColumn = (col) => onChange([...columns, col]);

  return (
    <>
      {visible && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.18)',
            zIndex: 99,
          }}
        />
      )}

      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: 360,
        height: '100vh',
        background: '#ffffff',
        borderLeft: '1px solid #dce8f5',
        boxShadow: '-4px 0 24px rgba(25,66,125,0.12)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.25s ease',
      }}>

        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid #dce8f5',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#f4f8ff',
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#19427D' }}>Edit Columns</span>
          <button onClick={onClose} style={{
            border: 'none', background: 'none', cursor: 'pointer',
            color: '#a0b8d8', fontSize: 20, lineHeight: 1, padding: '2px 4px',
          }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

          {/* Active */}
          <div style={{ padding: '16px 20px 8px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#a0b8d8', marginBottom: 10 }}>
              Active Columns ({columns.length})
            </div>

            {columns.map((col, idx) => (
              <div
                key={col.key}
                draggable
                onDragStart={e => onDragStart(e, idx)}
                onDragEnter={() => onDragEnter(idx)}
                onDragOver={e => e.preventDefault()}
                onDrop={e => onDrop(e, idx)}
                onDragEnd={onDragEnd}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px',
                  marginBottom: 4,
                  borderRadius: 8,
                  border: '1.5px solid',
                  borderColor: dragOver === idx ? '#19427D' : '#dce8f5',
                  background: dragOver === idx ? '#e8f0fb' : '#ffffff',
                  cursor: 'grab',
                  transition: 'border-color 0.1s, background 0.1s',
                  userSelect: 'none',
                }}
              >
                {/* Drag handle */}
                <span style={{ color: '#c4d9f5', fontSize: 14, flexShrink: 0 }}>⠿</span>

                <span style={{ flex: 1, fontSize: 13, color: '#19427D', fontFamily: "'DM Sans', sans-serif", wordBreak: 'break-word',overflowWrap: 'anywhere',whiteSpace: 'normal', }}>
                  {col.label}
                  <span style={{ fontSize: 11, color: '#a0b8d8', fontFamily: "'IBM Plex Mono', monospace", display: 'block', wordBreak: 'break-word', overflowWrap: 'anywhere', }}>
                    {col.key}
                  </span>
                </span>

                {/* Remove */}
                <button
                  onClick={() => removeColumn(col.key)}
                  title="Remove column"
                  style={{
                    border: 'none', background: 'none', cursor: 'pointer',
                    color: '#c4d9f5', fontSize: 16, lineHeight: 1, padding: '2px 4px',
                    flexShrink: 0,
                    transition: 'color 0.12s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#b94040'}
                  onMouseLeave={e => e.currentTarget.style.color = '#c4d9f5'}
                >✕</button>
              </div>
            ))}

            {columns.length === 0 && (
              <div style={{ fontSize: 13, color: '#a0b8d8', fontStyle: 'italic', padding: '8px 0' }}>
                No active columns. Add from below.
              </div>
            )}
          </div>

          <div style={{ height: 1, background: '#dce8f5', margin: '8px 0' }} />

          {/* Available columns */}
          <div style={{ padding: '8px 20px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#a0b8d8', letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase' }}>
              Add Columns
            </div>

            {/* Search */}
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search columns..."
              style={{
                width: '100%', marginBottom: 10,
                padding: '8px 12px',
                border: '1.5px solid #c4d9f5',
                borderRadius: 8, fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                color: '#19427D', background: '#f4f8ff',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = '#19427D'}
              onBlur={e => e.target.style.borderColor = '#c4d9f5'}
            />

            {available.length === 0 && (
              <div style={{ fontSize: 13, color: '#a0b8d8', fontStyle: 'italic' }}>
                {search ? 'No matches.' : 'All columns are active.'}
              </div>
            )}

            {available.map(col => (
              <div
                key={col.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', marginBottom: 4,
                  borderRadius: 8,
                  border: '1.5px solid #dce8f5',
                  background: '#f9fbff',
                  cursor: 'pointer',
                  transition: 'border-color 0.12s, background 0.12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#19427D'; e.currentTarget.style.background = '#e8f0fb'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#dce8f5'; e.currentTarget.style.background = '#f9fbff'; }}
                onClick={() => addColumn(col)}
              >
                <span style={{ flex: 1, fontSize: 13, color: '#19427D', fontFamily: "'DM Sans', sans-serif", wordBreak: 'break-word',overflowWrap: 'anywhere',whiteSpace: 'normal', }}>
                  {col.label}
                  <span style={{ fontSize: 11, color: '#a0b8d8', fontFamily: "'IBM Plex Mono', monospace", display: 'block', wordBreak: 'break-word', overflowWrap: 'anywhere', }}>
                    {col.key}
                  </span>
                </span>
                <span style={{ color: '#19427D', fontSize: 18, lineHeight: 1, fontWeight: 300 }}>+</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid #dce8f5',
          background: '#f4f8ff',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              background: '#19427D', color: '#fff',
              border: 'none', borderRadius: 8,
              fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}
          >Done</button>
        </div>
      </div>
    </>
  );
}