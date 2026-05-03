'use client';

import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  Layout as LayoutIcon,
  X,
  Minus,
  Maximize2
} from 'lucide-react';
import styles from './TitleBar.module.css';

const MENUS = ['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help', 'Copilot'];

export default function TitleBar({ onToggleCommandPalette, onToggleCopilot, onToggleTerminal, onOpenFile, onToggleSidebar }) {
  return (
    <div className={styles.container}>
      {/* Top Row: Window Controls & Search */}
      <div className={styles.topRow}>
        <div className={styles.windowControls}>
          <div className={`${styles.dot} ${styles.close}`}></div>
          <div className={`${styles.dot} ${styles.minimize}`}></div>
          <div className={`${styles.dot} ${styles.maximize}`}></div>
        </div>
        
        <div className={styles.searchArea}>
          <div className={styles.searchNav}>
            <ChevronLeft size={16} />
            <ChevronRight size={16} />
          </div>
          <div className={styles.searchBar} onClick={onToggleCommandPalette}>
            <Search size={14} className={styles.searchIcon} />
            <span className={styles.searchText}>shitesh-khaw : portfolio</span>
            <div className={styles.searchShortcut}>
              <span>Ctrl</span>
              <span>P</span>
            </div>
          </div>
          <div className={styles.searchActions}>
            <LayoutIcon size={16} onClick={onToggleSidebar} style={{ cursor: 'pointer' }} />
          </div>
        </div>

      </div>

      {/* Bottom Row: Menus */}
      <div className={styles.bottomRow}>
        <div className={styles.menus}>
          {MENUS.map((menu) => (
            <span 
              key={menu} 
              className={`${styles.menuItem} ${menu === 'Copilot' ? styles.copilotMenu : ''}`}
              onClick={() => {
                if (menu === 'Copilot') onToggleCopilot?.();
                else if (menu === 'Terminal') onToggleTerminal?.();
                else if (menu === 'File' || menu === 'Go') onToggleCommandPalette?.();
                else if (menu === 'View') onToggleSidebar?.();
                else if (menu === 'Help') onOpenFile?.('readme');
                else if (menu === 'Run') onToggleTerminal?.();
                else if (menu === 'Edit') alert('Editing is disabled in portfolio mode.');
              }}
            >
              {menu}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
