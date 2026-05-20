'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  Atom as FileReact, 
  Globe as FileGlobe, 
  FileCode2, 
  Braces as FileJson, 
  FileType as FileCss, 
  FileText as FileMd, 
  FileDigit as FilePdf,
  Files,
  Search,
  GitBranch,
  Box,
  Settings,
  Sparkle as SparkleIcon
} from 'lucide-react';
import TitleBar from '@/components/TitleBar';
import ActivityBar from '@/components/ActivityBar';
import Sidebar from '@/components/Sidebar';
import EditorTabs from '@/components/EditorTabs';
import EditorContent from '@/components/EditorContent';
import StatusBar from '@/components/StatusBar';
import Terminal from '@/components/Terminal';
import CommandPalette from '@/components/CommandPalette';
import CopilotSidebar from '@/components/CopilotSidebar';
import styles from './page.module.css';

const FILES = [
  { id: 'home', name: 'home.tsx', icon: FileReact, lang: 'TSX', color: '#61dafb' },
  { id: 'about', name: 'about.html', icon: FileGlobe, lang: 'HTML', color: '#e34f26' },
  { id: 'projects', name: 'projects.js', icon: FileCode2, lang: 'JavaScript', color: '#f7df1e' },
  { id: 'skills', name: 'skills.json', icon: FileJson, lang: 'JSON', color: '#cbcb41' },
  { id: 'contact', name: 'contact.css', icon: FileCss, lang: 'CSS', color: '#38bdf8' },
  { id: 'readme', name: 'README.md', icon: FileMd, lang: 'Markdown', color: '#42a5f5' },
  { id: 'resume', name: 'Shitesh_Khaw_Resume.pdf', icon: FilePdf, lang: 'PDF', color: '#ef4444' },
];

export default function Home() {
  const [activeFile, setActiveFile] = useState('home');
  const [openTabs, setOpenTabs] = useState(['home']);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [theme, setTheme] = useState('shitesh-dark');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  // Terminal Resizing
  const [terminalHeight, setTerminalHeight] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const resizerRef = useRef(null);

  const openFile = useCallback((fileId) => {
    setActiveFile(fileId);
    setOpenTabs((prev) => (prev.includes(fileId) ? prev : [...prev, fileId]));
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, []);

  const toggleCopilot = useCallback(() => setCopilotOpen((p) => !p), []);

  const closeTab = useCallback((fileId, e) => {
    e.stopPropagation();
    setOpenTabs((prev) => {
      const next = prev.filter((id) => id !== fileId);
      if (activeFile === fileId) {
        setActiveFile(next[next.length - 1] || 'home');
        if (next.length === 0) return ['home'];
      }
      return next;
    });
  }, [activeFile]);

  const toggleTerminal = useCallback(() => setTerminalOpen((p) => !p), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((p) => !p), []);
  const toggleCommandPalette = useCallback(() => setCommandPaletteOpen((p) => !p), []);

  // Resizing events
  const startResizing = useCallback(() => {
    setIsResizing(true);
    document.body.style.cursor = 'ns-resize';
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = 'default';
  }, []);

  const resize = useCallback((e) => {
    if (isResizing) {
      const newHeight = window.innerHeight - e.clientY - 22; // Subtracting status bar height
      if (newHeight >= 100 && newHeight <= window.innerHeight * 0.7) {
        setTerminalHeight(newHeight);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const currentFile = FILES.find((f) => f.id === activeFile) || FILES[0];

  return (
    <div className={styles.ide}>
      <TitleBar 
        onToggleCommandPalette={toggleCommandPalette} 
        onToggleCopilot={toggleCopilot} 
        onToggleTerminal={toggleTerminal}
        onOpenFile={openFile}
        onToggleSidebar={toggleSidebar}
      />
      <div className={styles.main}>
        <ActivityBar
          onToggleSidebar={toggleSidebar}
          onToggleTerminal={toggleTerminal}
          onToggleCopilot={toggleCopilot}
          onToggleCommandPalette={toggleCommandPalette}
          activeSidebar={sidebarOpen ? 'explorer' : ''}
        />
        {sidebarOpen && (
          <Sidebar
            files={FILES}
            activeFile={activeFile}
            onOpenFile={openFile}
            onToggleCopilot={toggleCopilot}
          />
        )}
        <div className={styles.editorArea}>
          <EditorTabs
            files={FILES}
            openTabs={openTabs}
            activeFile={activeFile}
            onSelectTab={openFile}
            onCloseTab={closeTab}
          />
          <div className={styles.editorWrapper}>
            <EditorContent activeFile={activeFile} currentFile={currentFile} />
          </div>
          
          {terminalOpen && (
            <>
              <div 
                className={styles.terminalResizer} 
                onMouseDown={startResizing}
                ref={resizerRef}
              />
              <div style={{ height: `${terminalHeight}px`, minHeight: '100px' }}>
                <Terminal
                  onClose={toggleTerminal}
                  onOpenFile={openFile}
                  files={FILES}
                />
              </div>
            </>
          )}
        </div>
        {copilotOpen && (
          <CopilotSidebar onClose={toggleCopilot} />
        )}
      </div>
      <StatusBar
        currentFile={currentFile}
        theme={theme}
        onThemeChange={setTheme}
        onToggleTerminal={toggleTerminal}
        onToggleCopilot={toggleCopilot}
      />
      <CommandPalette 
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        files={FILES}
        onOpenFile={openFile}
        onToggleCopilot={toggleCopilot}
      />
    </div>
  );
}
