'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import styles from './Terminal.module.css';

export default function Terminal({ onClose, onOpenFile, files }) {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Shitesh\'s Portfolio Terminal!' },
    { type: 'output', content: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const fullCmd = input.trim();
      const cmdParts = fullCmd.split(' ');
      const cmd = cmdParts[0].toLowerCase();
      const args = cmdParts.slice(1).join(' ');
      
      const newHistory = [...history, { type: 'command', content: fullCmd }];

      if (cmd === 'help') {
        newHistory.push({ type: 'output', content: 'Available commands: ls, whoami, pwd, cd, echo, clear, date, open <file>, cat <file>, git log, python --version' });
      } else if (cmd === 'ls') {
        newHistory.push({ type: 'output', content: 'home.tsx about.html projects.js skills.json contact.css README.md Shitesh_Khaw_Resume.pdf' });
      } else if (cmd === 'whoami') {
        newHistory.push({ type: 'output', content: 'Name: Shitesh Khaw\nRole: Backend & AI Engineer\nLocation: India 🇮🇳\nEmail: shiteshkhaw@gmail.com' });
      } else if (cmd === 'pwd') {
        newHistory.push({ type: 'output', content: '/home/shitesh/portfolio' });
      } else if (cmd === 'cd') {
        newHistory.push({ type: 'output', content: args ? `cd: ${args}: Permission denied (Portfolio is read-only)` : '' });
      } else if (cmd === 'echo') {
        newHistory.push({ type: 'output', content: args });
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'date') {
        newHistory.push({ type: 'output', content: new Date().toString() });
      } else if (cmd === 'open' || cmd === 'cat') {
        if (!args) {
          newHistory.push({ type: 'error', content: `${cmd}: missing file operand` });
        } else {
          const file = files.find(f => f.name.toLowerCase() === args.toLowerCase());
          if (file) {
            onOpenFile(file.id);
            newHistory.push({ type: 'output', content: `Opening ${file.name}...` });
          } else {
            newHistory.push({ type: 'error', content: `${cmd}: ${args}: No such file or directory` });
          }
        }
      } else if (fullCmd === 'git log') {
        newHistory.push({ type: 'output', content: 'commit 8e5f2a1 (HEAD -> main)\nAuthor: Shitesh Khaw\nDate: Fri Mar 27 2026\n\n    Initial commit: Built VS Code Portfolio' });
      } else if (fullCmd === 'python --version') {
        newHistory.push({ type: 'output', content: 'Python 3.10.12' });
      } else if (fullCmd !== '') {
        newHistory.push({ type: 'error', content: `Command not found: ${cmd}. Type "help" for a list of commands.` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <div className={`${styles.tab} ${styles.active}`}>TERMINAL</div>
          <div className={styles.tab}>PROBLEMS</div>
          <div className={styles.tab}>OUTPUT</div>
          <div className={styles.tab}>DEBUG CONSOLE</div>
        </div>
        <button onClick={onClose} className={styles.closeBtn}>
          <X size={14} />
        </button>
      </div>
      <div className={styles.terminalBody} ref={scrollRef}>
        {history.map((item, i) => (
          <div key={i} className={styles.line}>
            {item.type === 'command' && (
              <span className={styles.prompt}>
                <span className={styles.user}>shitesh</span>
                <span className={styles.at}>@</span>
                <span className={styles.host}>portfolio</span>
                <span className={styles.colon}>:</span>
                <span className={styles.path}>~</span>
                <span className={styles.dollar}>$</span>
              </span>
            )}
            <span className={`${styles.content} ${styles[item.type]}`}>{item.content}</span>
          </div>
        ))}
        <div className={styles.inputLine}>
          <span className={styles.prompt}>
            <span className={styles.user}>shitesh</span>
            <span className={styles.at}>@</span>
            <span className={styles.host}>portfolio</span>
            <span className={styles.colon}>:</span>
            <span className={styles.path}>~</span>
            <span className={styles.dollar}>$</span>
          </span>
          <input
            type="text"
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
