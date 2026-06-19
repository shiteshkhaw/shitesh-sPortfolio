'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, MapPin, Globe, Briefcase, Code2, Layers, Cpu, Zap, GitBranch, Database, ShieldCheck, Terminal } from 'lucide-react';
import styles from './Sections.module.css';

const LOG_MESSAGES = [
  "[SYSTEM] Port status: 8000 active (FastAPI engine)",
  "[SYSTEM] Resource usage: Memory 64.2MB | CPU 1.2% | Latency 42ms",
  "[DB] Neon Postgres pool: 8 active connections established",
  "[DB] Executed database migration in 24ms (nominal)",
  "[AI] Initialized Groq LLaMA-3 agent core orchestration",
  "[AI] Resolved lead query: Intent classification qualified",
  "[AI] Document analysis request: DocuMind RAG engine engaged",
  "[PIPELINE] n8n webhook listener online on port 5678",
  "[PIPELINE] WhatsApp Cloud API webhook dispatched lead details",
  "[METRICS] Health status check: all services fully operational",
  "[API] GET /api/v1/projects - 200 OK (elapsed 12ms)",
  "[SYSTEM] Cache hit: Redis memory utilization 2.4%",
];

export default function AboutContent() {
  const [logs, setLogs] = useState([
    "[SYSTEM] Booting developer profile container...",
    "[SYSTEM] Environment: Node.js + Next.js App Router",
    "[API] Listening at port 8000 (FastAPI active)",
    "[DB] Connected to Neon Serverless PostgreSQL",
    "[AI] Loaded Groq AI orchestration pipelines"
  ]);

  const logContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        const updated = [...prev, nextMsg];
        if (updated.length > 25) updated.shift();
        return updated;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={styles.section}>
      <header className={styles.premiumHeader}>
        <div className={styles.premiumHeaderContent}>
          <div className={styles.premiumTag}>Identity & Diagnostics</div>
          <h1 className={styles.premiumMainTitle}>Shitesh <span className={styles.highlightPink}>Khaw</span></h1>
          <p className={styles.premiumMainSubtitle}>Building scalable infrastructure, intelligent automation, and operational leverage.</p>
        </div>
      </header>

      <div className={styles.aboutLayout}>
        {/* Diagnostic Panel Box */}
        <div className={styles.diagnosticCard}>
          <div className={styles.diagnosticHeader}>
            <div className={styles.statusGroup}>
              <span className={styles.diagnosticPulseDot}></span>
              <h3>SYSTEM_MONITOR.log</h3>
            </div>
            <span className={styles.diagnosticBadge}>ACTIVE</span>
          </div>

          {/* Interactive SVG Node Graph */}
          <div className={styles.topologyWrapper}>
            <div className={styles.topologyTitle}>ENGINE ARCHITECTURE TOPOLOGY</div>
            <svg viewBox="0 0 300 150" className={styles.topologySvg}>
              {/* Animated Flow Lines */}
              <path d="M 40 75 L 140 35" stroke="rgba(88, 166, 255, 0.4)" strokeWidth="1.5" fill="none" />
              <path d="M 40 75 L 140 115" stroke="rgba(88, 166, 255, 0.4)" strokeWidth="1.5" fill="none" />
              <path d="M 140 35 L 260 75" stroke="rgba(88, 166, 255, 0.4)" strokeWidth="1.5" fill="none" />
              <path d="M 140 115 L 260 75" stroke="rgba(88, 166, 255, 0.4)" strokeWidth="1.5" fill="none" />

              {/* Data Packets Animation */}
              <path d="M 40 75 L 140 35" stroke="#38bdf8" strokeWidth="2" fill="none" className={styles.flowLine} />
              <path d="M 40 75 L 140 115" stroke="#f472b6" strokeWidth="2" fill="none" className={styles.flowLine} style={{ animationDelay: '-0.5s' }} />
              <path d="M 140 35 L 260 75" stroke="#4ade80" strokeWidth="2" fill="none" className={styles.flowLine} style={{ animationDelay: '-0.25s' }} />
              <path d="M 140 115 L 260 75" stroke="#ffb86c" strokeWidth="2" fill="none" className={styles.flowLine} style={{ animationDelay: '-0.75s' }} />

              {/* Node Circles */}
              {/* Frontend Node */}
              <circle cx="40" cy="75" r="7" className={styles.nodeCircle} style={{ fill: '#38bdf8' }} />
              {/* API Node */}
              <circle cx="140" cy="35" r="7" className={styles.nodeCircle} style={{ fill: '#4ade80' }} />
              {/* Worker Node */}
              <circle cx="140" cy="115" r="7" className={styles.nodeCircle} style={{ fill: '#f472b6' }} />
              {/* DB Node */}
              <circle cx="260" cy="75" r="7" className={styles.nodeCircle} style={{ fill: '#ffb86c' }} />

              {/* Labels */}
              <text x="40" y="93" className={styles.nodeLabel}>Client UI</text>
              <text x="140" y="20" className={styles.nodeLabel}>FastAPI</text>
              <text x="140" y="132" className={styles.nodeLabel}>n8n Agent</text>
              <text x="260" y="93" className={styles.nodeLabel}>Database</text>
            </svg>
          </div>

          {/* Scrolling Terminal Logs */}
          <div className={styles.diagnosticLogBox}>
            <div className={styles.terminalHeader}>
              <Terminal size={12} style={{ color: '#8b949e', marginRight: '6px' }} />
              <span>LIVE TELEMETRY STREAM</span>
            </div>
            <div className={styles.terminalBody} ref={logContainerRef}>
              {logs.map((log, idx) => (
                <div key={idx} className={styles.logLine}>
                  <span className={styles.logTimestamp}>{new Date().toLocaleTimeString()}</span>
                  <span className={styles.logContent}>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className={styles.storyContent}>
          <h2 className={styles.storyTitle}>Professional Summary</h2>
          <p className={styles.storyText}>
            I engineer systems that solve complex operational problems.
          </p>
          <p className={styles.storyText}>
            My focus is on designing backend architectures, deploying intelligent automation, and building integrations that eliminate manual inefficiencies. I operate at the intersection of engineering and product execution, translating ambiguous business requirements into robust, maintainable technical solutions.
          </p>
          <p className={styles.storyText}>
            The objective is never just to write code, but to create leverage—building infrastructure that operates reliably at scale with minimal intervention.
          </p>

          <h2 className={styles.storyTitle} style={{ marginTop: '2.5rem' }}>Core Specialization</h2>
          <div className={styles.specsGrid}>
            <div className={styles.specCard}>
              <div className={styles.specHeader}>
                <Code2 size={18} className={styles.specIconPink} />
                <h3>Backend Architecture</h3>
              </div>
              <p>High-performance APIs using Python (FastAPI) and Node.js (Express.js) with type safety via TypeScript and schema validation (Zod/Pydantic).</p>
            </div>
            <div className={styles.specCard}>
              <div className={styles.specHeader}>
                <Cpu size={18} className={styles.specIconPurple} />
                <h3>Intelligent Systems</h3>
              </div>
              <p>Advanced RAG pipelines, semantic contradiction engines, vector search storage (ChromaDB), and LLM intent routing orchestration.</p>
            </div>
            <div className={styles.specCard}>
              <div className={styles.specHeader}>
                <Layers size={18} className={styles.specIconBlue} />
                <h3>Workflow Automation</h3>
              </div>
              <p>Event-driven workflows built on n8n pipelines, integrating third-party messaging (WhatsApp/Instagram APIs) and robust webhooks.</p>
            </div>
            <div className={styles.specCard}>
              <div className={styles.specHeader}>
                <Database size={18} className={styles.specIconGreen} />
                <h3>Infrastructure & security</h3>
              </div>
              <p>Relational database schema design (PostgreSQL/Prisma), Docker containerization, Redis caching, and Granular RBAC middleware access locks.</p>
            </div>
          </div>

          <h2 className={styles.storyTitle} style={{ marginTop: '2.5rem' }}>Cognitive Architecture (How I Think)</h2>
          <ul className={styles.storyText} style={{ paddingLeft: '20px', marginTop: '10px', marginBottom: '10px' }}>
            <li><strong>Optimize for leverage:</strong> Eliminate repetitive manual processes through structural automation.</li>
            <li><strong>Design for scale:</strong> Build infrastructure that handles growth without requiring constant human intervention.</li>
            <li><strong>Contextual engineering:</strong> Technical decisions must directly align with and enable business logic.</li>
            <li><strong>Maintainability by default:</strong> Clarity in architecture ensures a system remains adaptable over time.</li>
          </ul>

          <h2 className={styles.storyTitle} style={{ marginTop: '2.5rem' }}>Compilation Logs (Experience Timeline)</h2>
          <div className={styles.gitTimeline}>
            
            <div className={styles.gitCommitCard}>
              <div className={styles.commitMeta}>
                <span className={styles.commitHash}>commit a8f219b</span>
                <span className={styles.commitDate}>Sep 2023 - Dec 2023</span>
              </div>
              <div className={styles.commitAuthor}>Author: Shitesh Khaw &lt;shiteshkhaw@gmail.com&gt;</div>
              <div className={styles.commitMessage}>
                <strong>Deployed DocuMind AI Document Intelligence Platform</strong>
                <ul>
                  <li>Architected hybrid vector RAG and Cross-Encoder reranking for precise context extraction.</li>
                  <li>Programmed semantic contradiction engines analyzing monetary and date deviations across documents.</li>
                  <li>Visualized retrieval statistics and confidence routing via a custom administrative dashboard.</li>
                </ul>
              </div>
            </div>

            <div className={styles.gitCommitCard}>
              <div className={styles.commitMeta}>
                <span className={styles.commitHash}>commit c7f289d</span>
                <span className={styles.commitDate}>Jan 2024 - Jul 2024</span>
              </div>
              <div className={styles.commitAuthor}>Author: Shitesh Khaw &lt;shiteshkhaw@gmail.com&gt;</div>
              <div className={styles.commitMessage}>
                <strong>Built and deployed TaskGuru AI Operating System</strong>
                <ul>
                  <li>Programmed Groq LLaMA-3 task coach to dissect complex actions and protect user streaks.</li>
                  <li>Formulated real-time workspace collaboration featuring VAPID web push notifications.</li>
                  <li>Secured user endpoints via HTTP-Only JWT cookies and Google OAuth 2.0 logins.</li>
                </ul>
              </div>
            </div>

            <div className={styles.gitCommitCard}>
              <div className={styles.commitMeta}>
                <span className={styles.commitHash}>commit b465a3d</span>
                <span className={styles.commitDate}>Aug 2024 - Dec 2024</span>
              </div>
              <div className={styles.commitAuthor}>Author: Shitesh Khaw &lt;shiteshkhaw@gmail.com&gt;</div>
              <div className={styles.commitMessage}>
                <strong>Shipped autonomous B2B sales automation pipeline</strong>
                <ul>
                  <li>Scraped 10k+ leads via Serp API and classified niches autonomously with LLMs.</li>
                  <li>Deployed WhatsApp conversational AI agents to qualify client intent and capture details.</li>
                  <li>Eliminated human SDR involvement, logging qualified sales pipelines directly to Google Sheets CRM.</li>
                </ul>
              </div>
            </div>

            <div className={styles.gitCommitCard}>
              <div className={styles.commitMeta}>
                <span className={styles.commitHash}>commit d9e8f7c</span>
                <span className={styles.commitDate}>Jan 2025 - Mar 2025</span>
              </div>
              <div className={styles.commitAuthor}>Author: Shitesh Khaw &lt;shiteshkhaw@gmail.com&gt;</div>
              <div className={styles.commitMessage}>
                <strong>Deployed Makhija Quantum AI Corporate Platform</strong>
                <ul>
                  <li>Designed responsive user interface using React and Tailwind CSS.</li>
                  <li>Optimized asset loading speeds and SEO indices, leading to fast initial paint times.</li>
                  <li>Configured edge cache controls and Secure TLS 1.3 encryption standards.</li>
                </ul>
              </div>
            </div>

            <div className={styles.gitCommitCard}>
              <div className={styles.commitMeta}>
                <span className={styles.commitHash}>commit e8d7c6b</span>
                <span className={styles.commitDate}>Apr 2025 - Aug 2025</span>
              </div>
              <div className={styles.commitAuthor}>Author: Shitesh Khaw &lt;shiteshkhaw@gmail.com&gt;</div>
              <div className={styles.commitMessage}>
                <strong>Shipped messaging automation systems for WhatsApp & Instagram</strong>
                <ul>
                  <li>Integrated Meta Graph and Cloud APIs to handle live incoming messaging events.</li>
                  <li>Designed asynchronous webhook listener pipelines in n8n resolving messages under 200ms.</li>
                  <li>Set up rate-limiting guards and campaign broadcasts avoiding account throttling.</li>
                </ul>
              </div>
            </div>

            <div className={styles.gitCommitCard}>
              <div className={styles.commitMeta}>
                <span className={styles.commitHash}>commit f7c6b5a</span>
                <span className={styles.commitDate}>Sep 2025 - Present (2026)</span>
              </div>
              <div className={styles.commitAuthor}>Author: Shitesh Khaw &lt;shiteshkhaw@gmail.com&gt;</div>
              <div className={styles.commitMessage}>
                <strong>Built Wordsage AI Content Generation workbench</strong>
                <ul>
                  <li>Designed structured article drafting workflows with Vite and React.</li>
                  <li>Integrated custom prompt templates with OpenAI and OpenRouter streams.</li>
                  <li>Implemented client-side cache and responsive document export features.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
