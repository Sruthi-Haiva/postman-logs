import React, { useState, useRef, useEffect, useCallback } from 'react';
import { syntaxHighlight } from '../utils/syntaxHighlight';

function IconBtn({ onClick, title, children, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 14px',
        border: '1.5px solid',
        borderColor: hover ? '#19427D' : '#c4d9f5',
        borderRadius: 6,
        background: hover ? '#e8f0fb' : '#ffffff',
        color: '#19427D',
        fontSize: 13, fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.12s',
        fontFamily: "'DM Sans', sans-serif",
        userSelect: 'none',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default function JsonViewer({ data }) {
  const outputRef   = useRef(null);
  const findInputRef = useRef(null);

  const [showFind, setShowFind]   = useState(false);
  const [findTerm, setFindTerm]   = useState('');
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [copied, setCopied]       = useState(false);

  const baseHtml = data ? syntaxHighlight(JSON.stringify(data, null, 2)) : '';

  const applyFind = useCallback((term, jumpTo = 0) => {
    if (!outputRef.current) return;
    if (!term) {
      outputRef.current.innerHTML = baseHtml;
      setMatchCount(0);
      setCurrentMatch(0);
      return;
    }

    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    let idx = 0;
    const marked = baseHtml.replace(regex, () => {
      const i = idx++;
      return `<mark data-idx="${i}" style="background:${i === jumpTo ? '#ffa500' : '#fff0a0'};border-radius:2px;color:${i === jumpTo ? '#fff' : 'inherit'}">${term}</mark>`;
    });
    outputRef.current.innerHTML = marked;
    setMatchCount(idx);
    setCurrentMatch(jumpTo < idx ? jumpTo : 0);

    const marks = outputRef.current.querySelectorAll('mark');
    const target = marks[jumpTo < idx ? jumpTo : 0];
    if (target) target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [baseHtml]);

  useEffect(() => {
    if (showFind) applyFind(findTerm, 0);
    else if (outputRef.current) outputRef.current.innerHTML = baseHtml;
  }, [baseHtml, showFind]); // eslint-disable-line

  const step = (dir) => {
    const next = ((currentMatch + dir) % matchCount + matchCount) % matchCount;
    applyFind(findTerm, next);
  };

  const handleFindInput = (e) => {
    setFindTerm(e.target.value);
    applyFind(e.target.value, 0);
  };

  const handleFindKey = (e) => {
    if (e.key === 'Enter')  { e.preventDefault(); step(e.shiftKey ? -1 : 1); }
    if (e.key === 'Escape') closeFind();
  };

  const openFind = () => {
    setShowFind(true);
    setTimeout(() => findInputRef.current?.focus(), 50);
  };

  const closeFind = () => {
    setShowFind(false);
    setFindTerm('');
    setMatchCount(0);
    if (outputRef.current) outputRef.current.innerHTML = baseHtml;
  };

  const handleCopy = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Toolbar */}
      {data && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          padding: '10px 32px',
          borderBottom: '1px solid #dce8f5',
          background: '#f9fbff',
        }}>
          {/* Copy */}
          <IconBtn
            onClick={handleCopy}
            title="Copy JSON"
            style={copied ? { background: '#e6faf2', borderColor: '#3dba87', color: '#1e7a55' } : {}}
          >
            {copied ? (
              <>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy
              </>
            )}
          </IconBtn>

          {/* Find toggle */}
          <IconBtn onClick={showFind ? closeFind : openFind} title="Find in JSON">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Find
          </IconBtn>

          {/* Find box inline */}
          {showFind && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 6px 4px 12px',
              border: '1.5px solid #19427D',
              borderRadius: 6,
              background: '#ffffff',
            }}>
              <input
                ref={findInputRef}
                value={findTerm}
                onChange={handleFindInput}
                onKeyDown={handleFindKey}
                placeholder="Search..."
                style={{
                  border: 'none', outline: 'none',
                  fontSize: 13, fontFamily: "'IBM Plex Mono', monospace",
                  color: '#19427D', width: 180, background: 'transparent',
                }}
              />
              {matchCount > 0 && (
                <span style={{ fontSize: 12, color: '#5a7aa8', whiteSpace: 'nowrap' }}>
                  {currentMatch + 1} / {matchCount}
                </span>
              )}
              {findTerm && matchCount === 0 && (
                <span style={{ fontSize: 12, color: '#b94040', whiteSpace: 'nowrap' }}>No results</span>
              )}
              <div style={{ display: 'flex', gap: 2 }}>
                {[['↑', -1], ['↓', 1]].map(([arrow, dir]) => (
                  <button
                    key={dir}
                    onClick={() => step(dir)}
                    style={{
                      border: 'none', background: 'none', cursor: 'pointer',
                      color: '#19427D', padding: '2px 5px', borderRadius: 4,
                      fontSize: 14, lineHeight: 1,
                    }}
                  >{arrow}</button>
                ))}
              </div>
              <button
                onClick={closeFind}
                style={{
                  border: 'none', background: 'none', cursor: 'pointer',
                  color: '#a0b8d8', padding: '2px 4px', fontSize: 16, lineHeight: 1,
                }}
              >✕</button>
            </div>
          )}
        </div>
      )}

      {/* JSON Output */}
      <div
        ref={outputRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'auto',
          padding: '20px 32px',
          background: '#ffffff',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 13,
          lineHeight: 1.8,
          color: '#19427D',
          whiteSpace: 'pre',
          animation: 'fadeSlide 0.22s ease',
        }}
        dangerouslySetInnerHTML={{ __html: baseHtml || '<span style="color:#a0b8d8;font-style:italic;font-family:DM Sans,sans-serif">No data loaded.</span>' }}
      />
    </div>
  );
}
