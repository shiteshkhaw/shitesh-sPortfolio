'use client';
import { X } from 'lucide-react';
import styles from './EditorTabs.module.css';

export default function EditorTabs({ files, openTabs, activeFile, onSelectTab, onCloseTab }) {
  const currentFile = files.find((f) => f.id === activeFile);
  const breadcrumbs = ['shitesh-khaw', 'src'];
  if (currentFile && currentFile.folder) {
    breadcrumbs.push(currentFile.folder);
  }

  return (
    <div className={styles.tabsArea}>
      <div className={styles.tabs}>
        {openTabs.map((tabId) => {
          const file = files.find((f) => f.id === tabId);
          if (!file) return null;
          return (
            <button
              key={tabId}
              className={`${styles.tab} ${tabId === activeFile ? styles.active : ''}`}
              onClick={() => onSelectTab(tabId)}
            >
              <span className={styles.tabIcon} style={{ color: file.color }}>
                {(() => {
                  const Icon = file.icon;
                  return <Icon size={14} />;
                })()}
              </span>
              <span className={styles.tabName}>{file.name}</span>
              <span className={styles.tabClose} onClick={(e) => onCloseTab(tabId, e)}>
                <X size={14} />
              </span>
            </button>
          );
        })}
      </div>
      <div className={styles.breadcrumbs}>
        {breadcrumbs.map((crumb, i) => (
          <span key={i}>
            <span className={styles.crumb}>{crumb}</span>
            <span className={styles.separator}> {'>'} </span>
          </span>
        ))}
        {currentFile && (
          <span className={styles.crumbActive}>{currentFile.name}</span>
        )}
      </div>
    </div>
  );
}
