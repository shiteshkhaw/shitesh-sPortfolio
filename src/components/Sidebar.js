'use client';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar({ files, activeFile, onOpenFile, onToggleCopilot }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <button className={styles.folderToggle} onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span className={styles.folderName}>PORTFOLIO</span>
        </button>
        {expanded && (
          <div className={styles.tree}>
            {files.map((file) => (
              <button
                key={file.id}
                className={`${styles.file} ${activeFile === file.id ? styles.active : ''}`}
                onClick={() => onOpenFile(file.id)}
              >
                <div className={styles.fileIcon} style={{ color: file.color }}>
                  {(() => {
                    const Icon = file.icon;
                    return <Icon size={16} />;
                  })()}
                </div>
                <span className={styles.fileName}>{file.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.copilotSection}>
        <button className={styles.copilotButton} onClick={onToggleCopilot}>
          <Sparkles size={16} className={styles.copilotIcon} />
          <span className={styles.copilotLabel}>Shitesh&apos;s Copilot</span>
          <span className={styles.aiLabel}>AI</span>
        </button>
      </div>
    </div>
  );
}
