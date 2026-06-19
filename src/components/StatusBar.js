'use client';
import {
  Bell, Check, Share2, ChevronDown,
  Terminal as TerminalIcon, Sparkles, Wand2, GitBranch, 
  AlertCircle, AlertTriangle, XCircle, Palette, RefreshCcw, Heart
} from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './StatusBar.module.css';

export default function StatusBar({
  currentFile,
  theme,
  onThemeChange,
  onToggleTerminal,
  onToggleCopilot
}) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.statusBar}>
      <div className={styles.left}>
        <div className={styles.item} title="Git Branch">
          <GitBranch size={14} />
          <span>main</span>
        </div>
        <div className={styles.item} title="Sync">
          <RefreshCcw size={14} />
        </div>
        <div className={`${styles.item} ${styles.hideMobile}`} title="Portfolio Info">
          <span>Shitesh&apos;s Portfolio</span>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.item} onClick={onToggleCopilot}>
          <Sparkles size={14} className={styles.copilotIcon} />
          <span>Copilot</span>
        </div>
        <div className={`${styles.item} ${styles.hideMobile}`}>
          <span>TypeScript React</span>
        </div>
        <div className={`${styles.item} ${styles.hideMobile}`}>
          <span>UTF-8</span>
        </div>
        <div className={`${styles.item} ${styles.hideMobile}`} title="Prettier">
          <Check size={14} />
          <span>Prettier</span>
        </div>
        <div className={styles.item} onClick={onThemeChange} title="Change Theme">
          <Heart size={14} fill={theme === 'shitesh-dark' ? '#f472b6' : '#0284c7'} color={theme === 'shitesh-dark' ? '#f472b6' : '#0284c7'} />
          <span>{theme === 'shitesh-dark' ? 'Shitesh Dark' : 'Shitesh Light'}</span>
        </div>
        <div className={styles.item}>
          <span>{time}</span>
        </div>
      </div>
    </footer>
  );
}
