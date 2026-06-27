'use client';
import {
  Bell, Check, Share2, ChevronDown,
  Terminal as TerminalIcon, Sparkles, Wand2, GitBranch, 
  AlertCircle, AlertTriangle, XCircle, Palette, RefreshCcw, Heart
} from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './StatusBar.module.css';

const getThemeColor = (t) => {
  if (t === 'shitesh-dark') return '#f472b6';
  if (t === 'shitesh-light') return '#0284c7';
  if (t === 'shitesh-mono') return '#000000';
  if (t === 'shitesh-calm') return '#5eead4';
  return '#f472b6';
};

const getThemeName = (t) => {
  if (t === 'shitesh-dark') return 'Shitesh Dark';
  if (t === 'shitesh-light') return 'Shitesh Light';
  if (t === 'shitesh-mono') return 'Grayscale';
  if (t === 'shitesh-calm') return 'Calming Sage';
  return 'Shitesh Dark';
};

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
          <Heart size={14} fill={getThemeColor(theme)} color={getThemeColor(theme)} />
          <span>{getThemeName(theme)}</span>
        </div>
        <div className={styles.item}>
          <span>{time}</span>
        </div>
      </div>
    </footer>
  );
}
