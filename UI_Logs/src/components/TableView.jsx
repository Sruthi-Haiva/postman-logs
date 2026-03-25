import React, { useState, useEffect } from 'react';
import { resolvePath, formatCell } from '../utils/columns';
import EditColumnsPanel from './EditColumnsPanel';

function StatusBadge({ value }) {
  const code = parseInt(value, 10);
  const isOk = code >= 200 && code < 300;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 12, fontWeight: 600,
      fontFamily: "'IBM Plex Mono', monospace",
      background: isOk ? '#e6faf2' : '#fff0f0',
      color: isOk ? '#1e7a55' : '#b94040',
      border: `1px solid ${isOk ? '#a0e6c6' : '#f5c4c4'}`,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: isOk ? '#3dba87' : '#e05050',
        flexShrink: 0,
      }}/>
      {value}
    </span>
  );
}

function CellContent({ colKey, value }) {
  const [expanded, setExpanded] = useState(false);

  if (colKey.includes('statusCode') && !isNaN(parseInt(value, 10))) {
    return <StatusBadge value={value} />;
  }

  if (colKey === 'timestamp' && value && value !== '—') {
    const d = new Date(parseInt(value, 10));
    return (
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#5a7aa8' }}>
        {d.toLocaleString()}
      </span>
    );
  }

  const str = String(value);
  if (str.length > 80) {
    return (
      <span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#19427D' }}>
          {expanded ? str : str.slice(0, 80) + '…'}
        </span>
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            marginLeft: 6, border: 'none', background: 'none',
            color: '#19427D', fontSize: 11, cursor: 'pointer',
            fontWeight: 600, padding: 0,
            textDecoration: 'underline',
          }}
        >
          {expanded ? 'less' : 'more'}
        </button>
      </span>
    );
  }

  return (
    <span style={{
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#19427D'
    }}>
      {value === '—' ? <span style={{ color: '#c4d9f5' }}>—</span> : str}
    </span>
  );
}

export default function TableView({ data, defaultColumns, allColumns }) {
  const [columns, setColumns] = useState(defaultColumns);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    setColumns(defaultColumns);
  }, [defaultColumns]);

  const rows = Array.isArray(data) ? data : [data];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Toolbar */}
      <div style={{
        padding: '10px 32px',
        borderBottom: '1px solid #dce8f5',
        background: '#f9fbff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 13, color: '#5a7aa8' }}>
          {rows.length} row{rows.length !== 1 ? 's' : ''}
        </span>
        <button
          onClick={() => setPanelOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '7px 16px',
            border: '1.5px solid #c4d9f5',
            borderRadius: 7,
            background: '#ffffff',
            color: '#19427D',
            fontSize: 13, fontWeight: 500,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="7" height="18"/>
            <rect x="14" y="3" width="7" height="18"/>
          </svg>
          Edit Columns
        </button>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowX: 'auto', overflowY: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 13,
        }}>
          <thead>
            <tr style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              {columns.map(col => (
                <th key={col.key} style={{
                  padding: '11px 16px',
                  textAlign: 'left',
                  background: '#19427D',
                  color: '#ffffff',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map(col => {
                  const val = formatCell(resolvePath(row, col.key));
                  return (
                    <td key={col.key} style={{
                      padding: '10px 16px',
                      verticalAlign: 'top',
                      borderRight: '1px solid #eaf1fb',
                      minWidth: 120,
                      maxWidth: 320,
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      overflowWrap: 'normal',
                    }}>
                      <CellContent colKey={col.key} value={val} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Panel */}
      <EditColumnsPanel
        visible={panelOpen}
        columns={columns}
        allColumns={allColumns}
        onChange={setColumns}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}