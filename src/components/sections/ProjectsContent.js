'use client';
import { useState } from 'react';
import { ExternalLink, CheckCircle2, Globe, GitBranch, Lock, Cpu, Zap, ChevronLeft, ChevronRight, Bot, Search, Send, BrainCircuit, Sparkles } from 'lucide-react';
import styles from './Sections.module.css';

const projects = [
  {
    title: 'DocuMind AI',
    tagline: 'Enterprise Document Intelligence Platform',
    problem: 'Compliance and auditing teams waste thousands of hours manually cross-referencing multi-hundred-page enterprise documents, leading to unnoticed contradictions, regulatory compliance breaches, and massive operational risk.',
    whyExists: 'DocuMind AI exists to automate document intelligence workflows by translating unstructured collections of contracts, specifications, and regulatory codes into verifiable, traceably grounded knowledge graphs.',
    capabilities: [
      'Hybrid RAG Pipeline — combining vector search with Cross-Encoder semantic reranking and query expansion.',
      'Contradiction Intelligence Engine — detects conflicting dates, financial figures, requirements, and semantic inconsistencies across large document collections.',
      'Citation-Aware Conversational AI — grounded multi-document chat with strict source traceability and page-level grounding.',
      'Explainable AI Trust Score — 6-dimensional quantitative modeling measuring document health, ambiguity, completeness, and context integrity.',
      'Diagnostic Retrieval Inspector — visual debugging tool exposing query expansions, node relevance scores, and raw model prompts.',
      'Autonomous Knowledge Graphs — automated extraction of entities (roles, dates, etc.) and relationship mapping directly from unstructured data.'
    ],
    architecture: 'Modular, service-oriented retrieve-and-analyze engine using a hybrid vector-keyword retrieval pipeline and Cross-Encoder semantic reranking.',
    pipeline: [
      { step: 'Ingestion & Parsing', desc: 'Large documents are parsed, chunked, and analyzed for metadata.' },
      { step: 'Multi-Vector Indexing', desc: 'Stores semantic embeddings in ChromaDB and key terms in Elasticsearch/PostgreSQL.' },
      { step: 'Hybrid Retrieval', desc: 'Executes concurrent lexical and vector search, merging results via Cross-Encoder reranking.' },
      { step: 'Contradiction Reasoner', desc: 'Context-optimized LLM analysis checks facts, dates, and values for inconsistencies.' }
    ],
    techStack: {
      frontend: ['Next.js 15 (App Router)', 'TypeScript', 'React Query', 'Tailwind CSS'],
      backend: ['FastAPI (Async Python)', 'Pydantic', 'Async SQLAlchemy', 'Docker'],
      ai: ['OpenRouter API', 'OpenAI Text-Embeddings-3', 'Cross-Encoder Semantic Reranker'],
      database: ['ChromaDB (Vector Store)', 'PostgreSQL']
    },
    security: 'Multi-tenant RBAC workspace separation with cryptographically signed session tokens (JWT) and immutable audit log trails.',
    image: '/projects/documind.png',
    link: 'https://docu-mind-ai-web.vercel.app/',
    github: 'https://github.com/shiteshkhaw/DocuMind-AI',
    mockupType: 'browser',
    isFeatured: false
  },
  {
    title: 'TaskGuru',
    tagline: 'AI-Powered Productivity Operating System',
    problem: 'Traditional task managers are passive database rows that don\'t help users overcome planning paralysis, maintain habits, or optimize their personal schedules, leading to low completion rates and abandoned goals.',
    whyExists: 'TaskGuru exists to serve as an active productivity operating system, using LLM-based cognitive coaching to autonomously break down tasks, protect streaks, and gamify daily habits.',
    capabilities: [
      'AI Task Coach — Groq-powered task breaking, dynamic subtask generation, and adaptive priority suggestions.',
      'Daily Habit Tracker — analytics-driven habit streaks, history mapping, and automated reminders.',
      'Gamified Reward System — XP rewards, streak badges, leveling tiers, and celebration states to drive user retention.',
      'Team Workspaces — collaborative project boards with granular RBAC permissions and activity feeds.'
    ],
    architecture: 'Full-stack Next.js architecture deployed on Vercel, utilizing Prisma ORM to pool Neon Serverless Postgres connections.',
    pipeline: [
      { step: 'Input Validation', desc: 'Zod-validated client input maps fields and schedules due dates.' },
      { step: 'Cognitive Dissection', desc: 'Groq LLaMA-3 analyzes user backlog, dynamically breaking tasks into subtask arrays.' },
      { step: 'Activity Dispatch', desc: 'XP points credit, streak metrics recalculate, and web push notifications are broadcasted.' }
    ],
    techStack: {
      frontend: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Next.js API Routes', 'Zod', 'Web Push (VAPID) Protocol'],
      ai: ['Groq AI Cloud (LLaMA-3)', 'System Prompt Engineering'],
      database: ['PostgreSQL', 'Neon Serverless', 'Prisma ORM', 'AWS S3 (Avatar uploads)']
    },
    security: 'Google OAuth 2.0 & credentials authentication with HTTP-Only JWT tokens, CORS guards, and Zod input sanitation.',
    image: '/projects/taskguru.png',
    link: 'https://task-os-nine.vercel.app',
    github: 'https://github.com/shiteshkhaw/TaskOS/blob/main/README.md##-live-demo',
    mockupType: 'browser'
  },
  {
    title: 'Wordsage',
    tagline: 'AI-Powered Content Generation Platform',
    problem: 'Content creators and marketers spend excessive time structuring articles, copywriting, and formatting outputs, bottlenecking production scaling.',
    whyExists: 'Wordsage exists to automate structured text generation, offering custom content templates and real-time response handling in a unified web workbench.',
    capabilities: [
      'Structured Copywriting — template-based generation of articles, social copy, and product descriptions.',
      'Real-Time Ingestion — fast generation loops with clean response handling.',
      'Workbench Interface — interactive text editor for refining and exporting generated content.'
    ],
    architecture: 'Single-page React client integrated with lightweight serverless AI endpoints deployed on Vercel.',
    pipeline: [
      { step: 'Prompt Generation', desc: 'User selections compile into targeted context prompts.' },
      { step: 'LLM Execution', desc: 'API endpoints fetch generation from OpenAI/OpenRouter.' },
      { step: 'Stream Processing', desc: 'Content streams to the UI editor for live user modification.' }
    ],
    techStack: {
      frontend: ['React.js', 'Vite', 'Vanilla CSS'],
      backend: ['Vercel Serverless Functions'],
      ai: ['OpenAI API', 'Prompt Orchestration'],
      database: ['Local Session Cache']
    },
    security: 'API key isolation, rate-limited public endpoints, and input payload size guards.',
    image: '/projects/x.png',
    link: 'https://wordsage.vercel.app',
    github: 'https://github.com/shitesh-khaw/wordsage',
    mockupType: 'browser'
  },
  {
    title: 'AI-Driven Sales Pipeline Automation',
    tagline: 'End-to-End Autonomous Lead Generation & Conversion System',
    problem: 'Outbound B2B prospecting requires human SDR teams to waste hours scraping leads, copy-pasting pitches, and sorting through replies, introducing massive human latency and payroll overhead.',
    whyExists: 'This autonomous pipeline exists to run 24/7 lead acquisition, niche-based template dispatch, and intent-aware qualification without human intervention.',
    capabilities: [
      'Multi-Source Scraping — scheduled scraping across LinkedIn and Google Maps via Serp API.',
      'Niche Classification — LLM analyzes scraped business metadata to identify niches and tags.',
      'Automated Outreach — triggers template campaigns via WhatsApp Cloud and Meta Graph APIs.',
      'Conversational Qualifier — AI agent with context memory handles multi-turn negotiation and schedules calls.'
    ],
    architecture: 'Event-driven, serverless pipeline network hosted on n8n with webhook interfaces and metadata routing.',
    pipeline: [
      { step: 'Lead Ingestion', desc: 'Cron triggers Serp API leads extraction, indexing raw contacts.' },
      { step: 'Niche Routing', desc: 'LLM filters contacts by niche, selecting optimal WhatsApp templates.' },
      { step: 'Campaign Outreach', desc: 'Dispatches targeted template campaigns via Meta Graph APIs.' },
      { step: 'Intent Qualification', desc: 'Conversational agent qualifies interest, captures emails, and logs to CRM.' }
    ],
    techStack: {
      frontend: ['Retool Dashboard'],
      backend: ['n8n Workflow Engine', 'Meta Graph API (WhatsApp)', 'Webhooks'],
      ai: ['OpenRouter AI (GPT-4o & LLaMA-3)', 'Structured Intent Parsing'],
      database: ['Google Sheets CRM', 'n8n SQLite Internal Store']
    },
    security: 'Meta webhook SHA256 signature verification, encrypted credentials vault, and scoped Google Cloud Service Accounts.',
    image: '/projects/sales-scrap.png',
    link: '#',
    github: '#',
    mockupType: 'pipeline',
    phases: [
      { image: '/projects/sales-scrap.png', label: 'Phase 1 — Multi-Platform Scraping Engine', desc: 'Scheduled scraping across LinkedIn & Google Maps with platform routing' },
      { image: '/projects/sales-template.png', label: 'Phase 2 — Dynamic Niche-Based Template Sender', desc: 'Reads unsent leads, routes to niche-specific WhatsApp templates' },
      { image: '/projects/sales-ai-agent.png', label: 'Phase 3 — AI Agent: Intent Capture & Qualification', desc: 'Conversational AI with memory that qualifies leads and captures credentials' },
      { image: '/projects/sales-reengagement.png', label: 'Phase 4 — Automated Re-engagement (Gentle Bump)', desc: 'Monitors unengaged leads and automatically sends a follow-up template after 24 hours of inactivity' },
      { image: '/projects/sales-proof.png', label: 'Live Proof — AI Qualifying a Real Lead', desc: 'Real conversation: AI captures email, identifies pain points, routes to CRM' }
    ]
  },
  {
    title: 'Automation Systems',
    tagline: 'WhatsApp & Instagram messaging workflows',
    problem: 'Modern businesses lose customers due to delayed responses on social channels, but hiring 24/7 support agents is financially unfeasible.',
    whyExists: 'These automation workflows exist to enable immediate engagement and structured response processing on messaging platforms.',
    capabilities: [
      'Auto-Response Logic — parses customer messages to trigger instant FAQ replies.',
      'n8n Event Processing — webhook listeners process messaging events in milliseconds.',
      'Contact Broadcasts — manages clean, rate-limited broadcast lists without account suspensions.'
    ],
    architecture: 'Event-driven webhook routing pipelines connecting messaging brokers with automation servers.',
    pipeline: [
      { step: 'Webhook Interception', desc: 'Captures incoming messages from Instagram/WhatsApp hooks.' },
      { step: 'Content Routing', desc: 'Evaluates payload types (text, images, media) for action routing.' },
      { step: 'Dispatch Response', desc: 'Sends structured template answers back via Meta Graph node.' }
    ],
    techStack: {
      frontend: ['n8n Visual Workspace'],
      backend: ['n8n Workflow Engine', 'WhatsApp Business API', 'Instagram Graph API'],
      ai: ['OpenAI Text Intent Classifier'],
      database: ['SQLite Session Registry']
    },
    security: 'Payload header verification, rate-limiting on message dispatch, and encrypted session storage.',
    image: '/projects/wa.png',
    link: '#',
    github: '#',
    mockupType: 'workflow'
  },
  {
    title: 'Makhija Quantum AI',
    tagline: 'Official Corporate Platform',
    problem: 'Emerging tech companies need an online presence that communicates advanced concepts (Quantum, AI) while maintaining fast load times and clean designs.',
    whyExists: 'Makhija Quantum AI exists to deliver a responsive, performant official company homepage showcasing core services and team credentials.',
    capabilities: [
      'Interactive Design — smooth layouts, grid sections, and dark-theme configurations.',
      'SEO Performance — optimized assets, structured headers, and clean page weights.',
      'Responsive Scaling — layouts designed to scale from mobile displays up to ultra-wide monitors.'
    ],
    architecture: 'Static frontend architecture built with React and Tailwind CSS, optimized for edge-delivery hosting.',
    pipeline: [
      { step: 'Asset Processing', desc: 'Compresses image vectors and loads static data files.' },
      { step: 'Page Rendering', desc: 'Loads interactive components with smooth entry transitions.' },
      { step: 'Edge Delivery', desc: 'Routes page queries via Cloudflare edge servers.' }
    ],
    techStack: {
      frontend: ['React.js', 'Tailwind CSS', 'Framer Motion'],
      backend: ['None (Static Site)'],
      ai: ['None'],
      database: ['Local Memory Configuration']
    },
    security: 'HTTPS TLS v1.3 encryption, static file caching isolation, and CORS lock policies.',
    image: '/projects/y.png',
    link: 'https://makhijaquantumai.com',
    github: '#',
    mockupType: 'browser'
  }
];

const phaseIcons = [Search, Send, BrainCircuit, Zap, Bot];

function PipelineGallery({ phases }) {
  const [activePhase, setActivePhase] = useState(0);

  const next = () => setActivePhase((prev) => (prev + 1) % phases.length);
  const prev = () => setActivePhase((prev) => (prev - 1 + phases.length) % phases.length);

  const PhaseIcon = phaseIcons[activePhase] || Zap;

  return (
    <div className={styles.workflowCard}>
      <div className={styles.workflowHeader}>
        <Zap size={16} />
        <span>Automated Pipeline</span>
        <div className={styles.phaseTabs}>
          {phases.map((phase, i) => {
            const Icon = phaseIcons[i] || Zap;
            return (
              <button
                key={i}
                className={`${styles.phaseTab} ${i === activePhase ? styles.phaseTabActive : ''}`}
                onClick={() => setActivePhase(i)}
              >
                <Icon size={12} />
                <span className={styles.phaseTabLabel}>{i < 4 ? `Phase ${i + 1}` : 'Proof'}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.workflowContent}>
        <div className={styles.phaseImageWrapper}>
          <img
            src={phases[activePhase].image}
            alt={phases[activePhase].label}
            className={styles.workflowImg}
          />
          <button className={`${styles.phaseArrow} ${styles.phaseArrowLeft}`} onClick={prev}>
            <ChevronLeft size={20} />
          </button>
          <button className={`${styles.phaseArrow} ${styles.phaseArrowRight}`} onClick={next}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.phaseInfoBar}>
        <div className={styles.phaseInfoIcon}>
          <PhaseIcon size={16} />
        </div>
        <div className={styles.phaseInfoText}>
          <span className={styles.phaseInfoLabel}>{phases[activePhase].label}</span>
          <span className={styles.phaseInfoDesc}>{phases[activePhase].desc}</span>
        </div>
        <div className={styles.phaseCounter}>
          {activePhase + 1} / {phases.length}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ proj }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div 
      className={`${styles.projectCardPremium} ${proj.mockupType === 'pipeline' ? styles.pipelineCard : ''} ${proj.isFeatured ? styles.featuredCard : ''}`}
    >
      <div className={styles.mockupWrapper}>
        {proj.mockupType === 'pipeline' ? (
          <PipelineGallery phases={proj.phases || []} />
        ) : proj.mockupType === 'browser' ? (
          <div className={`${styles.browserWindow} ${proj.isLocked ? styles.locked : ''} ${proj.isFeatured ? styles.featuredBrowser : ''}`}>
            <div className={styles.browserHeader}>
              <div className={styles.browserDots}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.browserUrl}>
                <div className={styles.lockIcon} />
                {proj.link.replace('https://', '')}
              </div>
              {proj.isFeatured && (
                <span className={styles.featuredBrowserBadge}>
                  CORE PLATFORM
                </span>
              )}
            </div>
            <div className={styles.browserContent}>
              <img src={proj.image} alt={proj.title} className={styles.projectImg} />
              {proj.isLocked ? (
                <div className={styles.lockedOverlay}>
                  <Lock size={48} className={styles.bigLock} />
                  <p>Preview Locked</p>
                  <span className={styles.lockedSub}>Private Beta - Access Required</span>
                </div>
              ) : (
                <div className={styles.liveBadge}>
                  <span className={styles.liveDot} />
                  Live Preview
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.workflowCard}>
            <div className={styles.workflowHeader}>
              <Zap size={16} />
              <span>Automated Workflow</span>
            </div>
            <div className={styles.workflowContent}>
              <img src={proj.image} alt={proj.title} className={styles.workflowImg} />
            </div>
          </div>
        )}
      </div>

      <div className={styles.projectDetails}>
        <div className={styles.projectDetailsTop}>
          <div className={styles.typeIcon}>
            {proj.mockupType === 'pipeline' ? <BrainCircuit size={24} /> : proj.mockupType === 'workflow' ? <Cpu size={24} /> : <Globe size={24} />}
          </div>
          {proj.isFeatured && (
            <span className={styles.featuredBadge}>
              <Sparkles size={12} />
              FEATURED SYSTEM
            </span>
          )}
        </div>
        <h2 className={styles.premiumTitle}>{proj.title}</h2>
        <p className={styles.premiumTagline}>{proj.tagline}</p>

        <div className={styles.projectTabRow}>
          <button 
            className={`${styles.projectTabBtn} ${activeTab === 'overview' ? styles.projectTabBtnActive : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            System Overview
          </button>
          <button 
            className={`${styles.projectTabBtn} ${activeTab === 'architecture' ? styles.projectTabBtnActive : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            Technical Architecture
          </button>
        </div>

        {activeTab === 'overview' ? (
          <div className={styles.tabContentFade}>
            <div className={styles.specSection}>
              <h4 className={styles.specHeading}>Problem Statement</h4>
              <p className={styles.specText}>{proj.problem}</p>
            </div>

            <div className={styles.specSection}>
              <h4 className={styles.specHeading}>Why {proj.title} Exists</h4>
              <p className={styles.specText}>{proj.whyExists}</p>
            </div>

            <div className={styles.specSection}>
              <h4 className={styles.specHeading}>Key Capabilities</h4>
              <div className={styles.featureGrid}>
                {proj.capabilities.map(cap => (
                  <div key={cap} className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.tabContentFade}>
            <div className={styles.specSection}>
              <h4 className={styles.specHeading}>Architecture Overview</h4>
              <p className={styles.specText}>{proj.architecture}</p>
            </div>

            {proj.pipeline && (
              <div className={styles.specSection}>
                <h4 className={styles.specHeading}>End-to-End Processing Pipeline</h4>
                <div className={styles.pipelineStepsContainer}>
                  {proj.pipeline.map((step, idx) => (
                    <div key={idx} className={styles.pipelineStep}>
                      <div className={styles.stepIndicator}>
                        <span className={styles.stepNum}>{idx + 1}</span>
                        {idx < proj.pipeline.length - 1 && <span className={styles.stepLine}></span>}
                      </div>
                      <div className={styles.stepMain}>
                        <div className={styles.stepTitle}>{step.step}</div>
                        <p className={styles.stepDesc}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.specSection}>
              <h4 className={styles.specHeading}>Technology Stack</h4>
              <div className={styles.dividedTechGrid}>
                {proj.techStack.frontend && proj.techStack.frontend.length > 0 && (
                  <div className={styles.techCategoryBox}>
                    <span className={styles.techCategoryLabel}>Frontend</span>
                    <div className={styles.techStackRow}>
                      {proj.techStack.frontend.map(t => (
                        <span key={t} className={styles.techTagMini}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                {proj.techStack.backend && proj.techStack.backend.length > 0 && (
                  <div className={styles.techCategoryBox}>
                    <span className={styles.techCategoryLabel}>Backend</span>
                    <div className={styles.techStackRow}>
                      {proj.techStack.backend.map(t => (
                        <span key={t} className={styles.techTagMini}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                {proj.techStack.ai && proj.techStack.ai.length > 0 && (
                  <div className={styles.techCategoryBox}>
                    <span className={styles.techCategoryLabel}>AI Stack</span>
                    <div className={styles.techStackRow}>
                      {proj.techStack.ai.map(t => (
                        <span key={t} className={styles.techTagMini}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                {proj.techStack.database && proj.techStack.database.length > 0 && (
                  <div className={styles.techCategoryBox}>
                    <span className={styles.techCategoryLabel}>Database</span>
                    <div className={styles.techStackRow}>
                      {proj.techStack.database.map(t => (
                        <span key={t} className={styles.techTagMini}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.specSection}>
              <h4 className={styles.specHeading}>Authentication & Security Model</h4>
              <p className={styles.specText}>{proj.security}</p>
            </div>
          </div>
        )}

        <div className={styles.projectActions} style={{ marginTop: '24px' }}>
          {proj.mockupType === 'workflow' || proj.mockupType === 'pipeline' ? (
            <button className={styles.automationBtn} disabled>
              System Status: Active <Zap size={16} fill="currentColor" />
            </button>
          ) : !proj.isLocked ? (
            <a href={proj.link} className={`${styles.visitBtn} ${proj.isFeatured ? styles.featuredVisitBtn : ''}`} target="_blank" rel="noopener noreferrer">
              Visit Website <ExternalLink size={16} />
            </a>
          ) : (
            <button className={styles.visitBtnDisabled} disabled>
              Request Access <Lock size={16} />
            </button>
          )}
          {proj.github && proj.github !== '#' && (
            <a href={proj.github} className={styles.githubIconBtn} target="_blank" rel="noopener noreferrer">
              <GitBranch size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsContent({ type = 'apps' }) {
  const filteredProjects = projects.filter((proj) => {
    if (type === 'workflows') {
      return proj.mockupType === 'workflow' || proj.mockupType === 'pipeline';
    } else {
      return proj.mockupType === 'browser';
    }
  });

  return (
    <div className={styles.section}>
      <header className={styles.projectsIntro}>
        <h1 className={styles.mainTitle}>
          {type === 'workflows' ? 'Cloud Automation Workflows' : 'Featured Web Applications'}
        </h1>
        <p className={styles.mainSubtitle}>
          {type === 'workflows'
            ? 'Production-grade n8n pipelines, WhatsApp integrations, and cloud agents.'
            : 'Enterprise document intelligence, full-stack operating systems, and interactive apps.'}
        </p>
      </header>

      <div className={styles.projectStack}>
        {filteredProjects.map((proj, i) => (
          <ProjectCard key={i} proj={proj} />
        ))}
      </div>
    </div>
  );
}
