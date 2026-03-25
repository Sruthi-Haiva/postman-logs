import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import LogPage from './components/LogPage';

import {
  EXECUTOR_LOGS_ALL_COLUMNS,
  EXECUTOR_LOGS_DEFAULT_COLUMNS,
  AI_LOGS_ALL_COLUMNS,
  AI_LOGS_DEFAULT_COLUMNS,
} from './utils/columns';

const API_BASE = 'http://localhost:8000';


const PAGES = {
  executor: {
    title: 'Executor Logs',
    endpoint: '/executor-logs/fetch-data/',
    allColumns: EXECUTOR_LOGS_ALL_COLUMNS,
    defaultColumns: EXECUTOR_LOGS_DEFAULT_COLUMNS,
  },
  ai: {
    title: 'AI Logs',
    endpoint: '/ai-logs/fetch-data/',
    allColumns: AI_LOGS_ALL_COLUMNS,
    defaultColumns: AI_LOGS_DEFAULT_COLUMNS,
  },
};

export default function App() {
  const [activePage, setActivePage] = useState('executor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const page = PAGES[activePage];

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(prev => !prev)}
      />

      <main style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#ffffff'
      }}>
        
        {/* Header */}
        <header style={{
          padding: '20px 32px',
          borderBottom: '1px solid #dce8f5',
          background: '#ffffff',
        }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: '#19427D' }}>
            {page.title}
          </h1>
        </header>


        <LogPage
          key={activePage} 
          apiBase={API_BASE}
          endpoint={page.endpoint}
          allColumns={page.allColumns}
          defaultColumns={page.defaultColumns}
        />
      </main>
    </div>
  );
}