'use client';

import { 
  Folder as ExplorerIcon, 
  Search, 
  GitBranch, 
  FileDown as Download, 
  Box,
  Settings, 
  Sparkle,
  Code2
} from 'lucide-react';
import styles from './ActivityBar.module.css';

export default function ActivityBar({ 
  onToggleSidebar, 
  onToggleTerminal, 
  onToggleCopilot,
  onToggleCommandPalette,
  activeSidebar = 'explorer'
}) {
  const handleDownload = () => {
    // Mock download action
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Shitesh_Khaw_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Downloading Shitesh_Khaw_Resume.pdf (Mock)');
  };

  return (
    <div className={styles.activityBar}>
      <div className={styles.top}>
        <div 
          className={`${styles.iconBtn} ${activeSidebar === 'explorer' ? styles.active : ''}`} 
          onClick={onToggleSidebar}
          title="Explorer"
        >
          <ExplorerIcon size={24} className={styles.icon} strokeWidth={1.5} />
        </div>
        <div className={styles.iconBtn} onClick={onToggleCommandPalette} title="Search">
          <Search size={24} className={styles.icon} strokeWidth={1.5} />
        </div>
        <div className={styles.iconBtn} title="Source Control">
          <GitBranch size={24} className={styles.icon} strokeWidth={1.5} />
        </div>
        <div className={styles.iconBtn} title="Run and Debug">
          <Code2 size={24} className={styles.icon} strokeWidth={1.5} />
        </div>
        <div className={styles.iconBtn} title="Extensions">
          <Box size={24} className={styles.icon} strokeWidth={1.5} />
        </div>
        <div className={styles.iconBtn} onClick={handleDownload} title="Download Resume">
          <Download size={24} className={styles.icon} strokeWidth={1.5} />
        </div>
        <div className={styles.iconBtn} onClick={onToggleCopilot} title="Shitesh's Copilot">
          <Sparkle 
            size={24} 
            className={`${styles.icon} ${styles.geminiIcon}`} 
            strokeWidth={1.5}
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.iconBtn} title="Settings">
          <Settings size={24} className={styles.icon} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
