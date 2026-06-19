'use client';
import { ChevronDown, ChevronRight, Sparkles, Folder, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar({ files, activeFile, onOpenFile, onToggleCopilot }) {
  const [expanded, setExpanded] = useState(true);
  const [projectsExpanded, setProjectsExpanded] = useState(true);

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <button className={styles.folderToggle} onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span className={styles.folderName}>PORTFOLIO</span>
        </button>
        {expanded && (
          <div className={styles.tree}>
            {/* Top-level files before projects */}
            {files.filter(f => !f.folder && ['home', 'about'].includes(f.id)).map((file) => (
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

            {/* projects folder */}
            <button
              className={styles.file}
              style={{ paddingLeft: '14px', color: 'var(--text-secondary)' }}
              onClick={() => setProjectsExpanded(!projectsExpanded)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {projectsExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <div className={styles.fileIcon} style={{ color: '#858585' }}>
                  {projectsExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
                </div>
              </div>
              <span className={styles.fileName} style={{ fontWeight: '600' }}>projects</span>
            </button>

            {/* Nested projects files */}
            {projectsExpanded && files.filter(f => f.folder === 'projects').map((file) => (
              <button
                key={file.id}
                className={`${styles.file} ${activeFile === file.id ? styles.active : ''}`}
                onClick={() => onOpenFile(file.id)}
                style={{ paddingLeft: '38px' }}
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

            {/* Top-level files after projects */}
            {files.filter(f => !f.folder && !['home', 'about'].includes(f.id)).map((file) => (
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
