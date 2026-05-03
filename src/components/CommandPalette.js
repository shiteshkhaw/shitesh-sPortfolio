'use client';

import { useState, useEffect, useRef } from 'react';
import { FileCode2, FileJson, FileType, FileText, Globe, Braces, Sparkles, Command } from 'lucide-react';
import styles from './CommandPalette.module.css';

export default function CommandPalette({ isOpen, onClose, files, onOpenFile, onToggleCopilot }) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    { id: 'copilot', name: "Open Shitesh's Copilot", icon: Sparkles, color: '#c084fc', shortcut: 'Ctrl+Shift+C' }
  ];

  const filteredItems = [
    ...commands.map(cmd => ({ ...cmd, type: 'command' })),
    ...files.map(file => ({ ...file, type: 'file' }))
  ].filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filteredItems[selectedIndex];
        if (item) {
          handleSelect(item);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  const handleSelect = (item) => {
    if (item.type === 'command') {
      if (item.id === 'copilot') onToggleCopilot();
    } else {
      onOpenFile(item.id);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.palette} onClick={e => e.stopPropagation()}>
        <div className={styles.inputWrapper}>
          <span className={styles.chevron}>&gt;</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Go to file or run command..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className={styles.input}
          />
          <span className={styles.escShortcut}>Esc</span>
        </div>

        <div className={styles.results}>
          {filteredItems.length > 0 ? (
            <>
              {filteredItems.some(i => i.type === 'command') && (
                <div className={styles.category}>COMMANDS</div>
              )}
              {filteredItems.filter(i => i.type === 'command').map((item, idx) => {
                const globalIdx = filteredItems.indexOf(item);
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`${styles.item} ${globalIdx === selectedIndex ? styles.active : ''}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(globalIdx)}
                  >
                    <Icon size={16} className={styles.itemIcon} style={{ color: item.color }} />
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemShortcut}>{item.shortcut}</span>
                  </div>
                );
              })}

              {filteredItems.some(i => i.type === 'file') && (
                <div className={styles.category}>FILES</div>
              )}
              {filteredItems.filter(i => i.type === 'file').map((item, idx) => {
                const globalIdx = filteredItems.indexOf(item);
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`${styles.item} ${globalIdx === selectedIndex ? styles.active : ''}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(globalIdx)}
                  >
                    <Icon size={16} className={styles.itemIcon} style={{ color: item.color }} />
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPath}>{item.id === 'readme' ? './' : 'src/'}</span>
                  </div>
                );
              })}
            </>
          ) : (
            <div className={styles.noResults}>No results found</div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.shortcutItem}>
            <span className={styles.arrowIcon}>↑↓</span>
            <span>navigate</span>
          </div>
          <div className={styles.shortcutItem}>
            <span className={styles.enterIcon}>↵</span>
            <span>open</span>
          </div>
          <div className={styles.shortcutItem}>
            <span>Esc</span>
            <span>close</span>
          </div>
          <div className={styles.tip}>
            Tip: type &quot;copilot&quot; to open AI chat
          </div>
        </div>
      </div>
    </div>
  );
}
