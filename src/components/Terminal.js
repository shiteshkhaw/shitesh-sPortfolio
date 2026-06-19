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
        if (args.trim().toLowerCase() === 'projects') {
          newHistory.push({ type: 'output', content: 'apps.js  workflows.js' });
        } else {
          newHistory.push({ type: 'output', content: 'home.tsx  about.html  projects/  skills.json  contact.css  README.md  Shitesh_Khaw_Resume.pdf' });
        }
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
          const cleanArg = args.replace('projects/', '').toLowerCase();
          const file = files.find(f => f.name.toLowerCase() === cleanArg || f.name.toLowerCase() === args.toLowerCase());
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

  const [activePane, setActivePane] = useState('terminal');

  // Problems states
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [hasScanned, setHasScanned] = useState(false);

  // Output states
  const [isRebooting, setIsRebooting] = useState(false);
  const [activeOutputFilter, setActiveOutputFilter] = useState('all');

  // Debug Console states
  const [debugLogs, setDebugLogs] = useState([
    { type: 'info', content: '// ShiteshOS Node Debugger Console v1.0.0' },
    { type: 'info', content: '// Evaluating expressions in active environment context' }
  ]);
  const [debugInput, setDebugInput] = useState('');
  const debugScrollRef = useRef(null);

  useEffect(() => {
    if (debugScrollRef.current) {
      debugScrollRef.current.scrollTop = debugScrollRef.current.scrollHeight;
    }
  }, [debugLogs]);

  const handleScan = () => {
    setIsScanning(true);
    setScanStep(1);
    setHasScanned(false);
    
    setTimeout(() => {
      setScanStep(2);
      setTimeout(() => {
        setScanStep(3);
        setTimeout(() => {
          setScanStep(4);
          setTimeout(() => {
            setIsScanning(false);
            setHasScanned(true);
          }, 500);
        }, 400);
      }, 400);
    }, 400);
  };

  const handleRestartServer = () => {
    setIsRebooting(true);
    setTimeout(() => {
      setIsRebooting(false);
    }, 1500);
  };

  const handleDebugCommand = (cmdText) => {
    const cleanCmd = cmdText.trim();
    if (!cleanCmd) return;
    
    const newLogs = [...debugLogs, { type: 'input', content: `> ${cleanCmd}` }];
    
    if (cleanCmd === 'portfolio.getProfile()') {
      newLogs.push({ 
        type: 'result', 
        content: JSON.stringify({ 
          name: "Shitesh Khaw", 
          role: "Backend & AI Engineer", 
          locale: "Mumbai, India", 
          contact: "shiteshkhaw@gmail.com" 
        }, null, 2) 
      });
    } else if (cleanCmd === 'db.getConnectionPool()') {
      newLogs.push({ 
        type: 'result', 
        content: JSON.stringify({ 
          client: "neon-postgres", 
          poolSize: 8, 
          activeConnections: 3, 
          latency: "14ms", 
          status: "HEALTHY" 
        }, null, 2) 
      });
    } else if (cleanCmd === 'ai.getAgentCapacity()') {
      newLogs.push({ 
        type: 'result', 
        content: JSON.stringify({ 
          provider: "Groq LLaMA-3", 
          activePipelines: [ "DocuMind-RAG", "TaskGuru-Dissect", "Outbound-WhatsApp" ], 
          tps: 84.5, 
          intentParser: "98.7% confidence" 
        }, null, 2) 
      });
    } else if (cleanCmd === 'sys.getCachedNodes()') {
      newLogs.push({ 
        type: 'result', 
        content: JSON.stringify([ 
          "home.tsx", 
          "about.html", 
          "skills.json", 
          "contact.css", 
          "README.md" 
        ], null, 2) 
      });
    } else if (cleanCmd.toLowerCase() === 'help') {
      newLogs.push({ 
        type: 'info', 
        content: 'Available commands: help, portfolio.getProfile(), db.getConnectionPool(), ai.getAgentCapacity(), sys.getCachedNodes()' 
      });
    } else {
      newLogs.push({ 
        type: 'error', 
        content: `ReferenceError: ${cleanCmd} is not defined\n(Available: portfolio.getProfile(), db.getConnectionPool(), ai.getAgentCapacity(), sys.getCachedNodes())` 
      });
    }
    
    setDebugLogs(newLogs);
    setDebugInput('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activePane === 'terminal' ? styles.active : ''}`}
            onClick={() => setActivePane('terminal')}
            style={{ background: 'none', border: 'none', borderBottom: activePane === 'terminal' ? '2px solid var(--border-active)' : '2px solid transparent' }}
          >
            TERMINAL
          </button>
          <button 
            className={`${styles.tab} ${activePane === 'problems' ? styles.active : ''}`}
            onClick={() => setActivePane('problems')}
            style={{ background: 'none', border: 'none', borderBottom: activePane === 'problems' ? '2px solid var(--border-active)' : '2px solid transparent' }}
          >
            PROBLEMS <span className={styles.problemsBadge}>{hasScanned ? '0' : '1'}</span>
          </button>
          <button 
            className={`${styles.tab} ${activePane === 'output' ? styles.active : ''}`}
            onClick={() => setActivePane('output')}
            style={{ background: 'none', border: 'none', borderBottom: activePane === 'output' ? '2px solid var(--border-active)' : '2px solid transparent' }}
          >
            OUTPUT
          </button>
          <button 
            className={`${styles.tab} ${activePane === 'debug' ? styles.active : ''}`}
            onClick={() => setActivePane('debug')}
            style={{ background: 'none', border: 'none', borderBottom: activePane === 'debug' ? '2px solid var(--border-active)' : '2px solid transparent' }}
          >
            DEBUG CONSOLE
          </button>
        </div>
        <button onClick={onClose} className={styles.closeBtn}>
          <X size={14} />
        </button>
      </div>
      
      {activePane === 'terminal' ? (
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
      ) : activePane === 'problems' ? (
        <div className={styles.panelContent}>
          {isScanning ? (
            <div className={styles.diagnosticWrapper}>
              <div className={styles.scanHeader}>
                <span className={styles.scanningPulse}></span>
                <strong>Running codebase-wide diagnostics audit...</strong>
              </div>
              <div className={styles.scanSteps}>
                <div className={scanStep >= 1 ? styles.scanStepDone : styles.scanStepPending}>
                  {scanStep >= 1 ? '✓' : '⟳'} Inspecting typescript compiler configurations and type signatures...
                </div>
                <div className={scanStep >= 2 ? styles.scanStepDone : styles.scanStepPending}>
                  {scanStep >= 2 ? '✓' : '⟳'} Linting component state hooks and dependency scopes...
                </div>
                <div className={scanStep >= 3 ? styles.scanStepDone : styles.scanStepPending}>
                  {scanStep >= 3 ? '✓' : '⟳'} Auditing n8n webhooks and API credentials encryption...
                </div>
                <div className={scanStep >= 4 ? styles.scanStepDone : styles.scanStepPending}>
                  {scanStep >= 4 ? '✓' : '⟳'} Compiling router paths and asset caching parameters...
                </div>
              </div>
            </div>
          ) : hasScanned ? (
            <div className={styles.diagnosticWrapper}>
              <div style={{ color: '#4ade80', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span>✓</span> Workspace Audited: 100% Production Grade. Zero errors, zero warnings.
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '14px' }}>
                All TypeScript definitions are sound, ESLint integrity is satisfied, and hot-reload components are decoupled.
              </p>
              <button className={styles.panelActionBtn} onClick={handleScan}>Re-run Audit</button>
            </div>
          ) : (
            <div className={styles.diagnosticWrapper}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
                Workspace audit recommended. Perform a scan of TypeScript components, hooks dependency chains, and automated workflow webhooks.
              </p>
              <button className={styles.panelActionBtn} onClick={handleScan}>Run Codebase Audit</button>
            </div>
          )}
        </div>
      ) : activePane === 'output' ? (
        <div className={styles.panelContent}>
          {isRebooting ? (
            <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span>▲ Restarting Next.js Turbopack compiler...</span><br />
              <span style={{ opacity: 0.5 }}>- Terminating active process on port 3000...</span><br />
              <span style={{ opacity: 0.7 }}>- Loading environment structures from .env.local...</span><br />
              <span style={{ opacity: 0.9 }}>- Re-connecting Neon Serverless PostgreSQL instance...</span><br />
              <span style={{ color: '#4ade80' }}>✓ Handshake successful: Pool ready (8 active connections).</span>
            </div>
          ) : (
            <div className={styles.outputWorkspace}>
              <div className={styles.outputToolbar}>
                <div className={styles.telemetryGroup}>
                  <span className={styles.telemetryDot}></span>
                  <span>Port: <strong>3000</strong></span>
                  <span className={styles.divider}>|</span>
                  <span>Average Compilation: <strong>240ms</strong></span>
                  <span className={styles.divider}>|</span>
                  <span>Watcher: <strong style={{ color: '#4ade80' }}>ACTIVE</strong></span>
                </div>
                <button className={styles.panelActionBtnSmall} onClick={handleRestartServer}>Restart Server</button>
              </div>
              <div className={styles.logFilterRow}>
                {['all', 'system', 'build'].map(filter => (
                  <button 
                    key={filter} 
                    className={`${styles.filterBtn} ${activeOutputFilter === filter ? styles.filterBtnActive : ''}`}
                    onClick={() => setActiveOutputFilter(filter)}
                  >
                    {filter.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className={styles.scrollingOutputLogs}>
                {(activeOutputFilter === 'all' || activeOutputFilter === 'system') && (
                  <>
                    <span style={{ color: 'var(--text-muted)' }}>▲ Next.js 15.1.0 (Turbopack compiler active)</span><br />
                    <span style={{ color: 'var(--text-muted)' }}>- Environment configs loaded: .env.local</span><br />
                    <span style={{ color: 'var(--text-muted)' }}>- Server listening at http://localhost:3000</span><br />
                    <span style={{ color: '#4ade80' }}>✓ Client handshake established successfully.</span><br />
                  </>
                )}
                {(activeOutputFilter === 'all' || activeOutputFilter === 'build') && (
                  <>
                    <span style={{ color: 'var(--text-muted)' }}>✓ Compiled / (app router main layout) in 1.2s</span><br />
                    <span style={{ color: 'var(--text-muted)' }}>✓ Compiled /api/chat in 180ms</span><br />
                    <span style={{ color: '#ffb86c' }}>[Watchpack] file changes detected: src/components/sections/ProjectsContent.js</span><br />
                    <span style={{ color: '#4ade80' }}>✓ Hot reloaded successfully (compiled in 110ms)</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.panelContent} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className={styles.debugHeaderRow}>
            <span>Evaluate expressions in current developer memory cache:</span>
            <div className={styles.debugQuickBtns}>
              <button onClick={() => handleDebugCommand('portfolio.getProfile()')}>getProfile()</button>
              <button onClick={() => handleDebugCommand('db.getConnectionPool()')}>getConnectionPool()</button>
              <button onClick={() => handleDebugCommand('ai.getAgentCapacity()')}>getAgentCapacity()</button>
              <button onClick={() => handleDebugCommand('sys.getCachedNodes()')}>getCachedNodes()</button>
            </div>
          </div>
          
          <div className={styles.debugLogsArea} ref={debugScrollRef}>
            {debugLogs.map((log, idx) => (
              <div key={idx} className={`${styles.debugLine} ${styles[log.type]}`}>
                {log.type === 'result' ? (
                  <pre style={{ margin: 0, paddingLeft: '12px', borderLeft: '2px solid #ff2b8f', color: '#ffb86c', whiteSpace: 'pre-wrap' }}>
                    {log.content}
                  </pre>
                ) : (
                  <span>{log.content}</span>
                )}
              </div>
            ))}
          </div>

          <div className={styles.debugInputLine}>
            <span style={{ color: '#ff2b8f', marginRight: '6px' }}>&gt;</span>
            <input 
              type="text" 
              className={styles.debugInputBox} 
              placeholder="Type debug expression (e.g. help, portfolio.getProfile())..."
              value={debugInput}
              onChange={(e) => setDebugInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleDebugCommand(debugInput);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
