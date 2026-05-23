'use client';
import { useState } from 'react';
import { ExternalLink, CheckCircle2, Globe, GitBranch, Lock, Cpu, Zap, ChevronLeft, ChevronRight, Bot, Search, Send, BrainCircuit } from 'lucide-react';
import styles from './Sections.module.css';

const projects = [
  {
    title: 'AI-Driven Sales Pipeline Automation',
    tagline: 'End-to-End Autonomous Lead Generation & Conversion System',
    desc: 'Architected and deployed a fully autonomous, multi-phase sales pipeline that eliminates manual prospecting entirely. The system scrapes leads across Google Maps and LinkedIn via Serp API, classifies businesses by niche, dispatches industry-specific WhatsApp templates, and deploys a conversational AI agent that captures user intent, qualifies interest, and collects credentials — replacing an entire SDR team with zero human intervention.',
    features: [
      'Engineered multi-source scraping via Serp.dev across Google Maps & LinkedIn',
      'Built intelligent niche classification with dynamic template routing',
      'Designed AI agent with memory + context to qualify leads autonomously',
      'Automated credential capture and CRM logging to Google Sheets',
      'Architected 4-phase n8n pipeline — scrape → outreach → conversion → re-engagement',
      'Deployed production system handling real outbound at scale'
    ],
    tech: ['n8n', 'Serp API', 'WhatsApp Cloud API', 'Google Sheets', 'OpenRouter AI', 'Webhooks', 'Meta Graph API'],
    phases: [
      { image: '/projects/sales-scrap.png', label: 'Phase 1 — Multi-Platform Scraping Engine', desc: 'Scheduled scraping across LinkedIn & Google Maps with platform routing' },
      { image: '/projects/sales-template.png', label: 'Phase 2 — Dynamic Niche-Based Template Sender', desc: 'Reads unsent leads, routes to niche-specific WhatsApp templates' },
      { image: '/projects/sales-ai-agent.png', label: 'Phase 3 — AI Agent: Intent Capture & Qualification', desc: 'Conversational AI with memory that qualifies leads and captures credentials' },
      { image: '/projects/sales-reengagement.png', label: 'Phase 4 — Automated Re-engagement (Gentle Bump)', desc: 'Monitors unengaged leads and automatically sends a follow-up template after 24 hours of inactivity' },
      { image: '/projects/sales-proof.png', label: 'Live Proof — AI Qualifying a Real Lead', desc: 'Real conversation: AI captures email, identifies pain points, routes to CRM' }
    ],
    link: '#',
    github: '#',
    mockupType: 'pipeline'
  },
  {
    title: 'TaskGuru',
    tagline: 'AI-Powered Productivity Operating System',
    desc: 'A full-stack, production-grade productivity platform featuring AI task assistance, habit tracking, team collaboration, gamification, and real-time push notifications — all in a single Next.js application. Deployed on Vercel with Neon Serverless PostgreSQL, serving real users with AI coaching powered by Groq LLaMA 3.',
    features: [
      'AI Task Coach — Groq-powered task breakdown, priority suggestions & streak guardian',
      'Full CRUD task management with subtasks, categories, due dates & reminders',
      'Daily habit tracker with streak tracking, completion history & analytics',
      'Team workspaces with RBAC (admin/member), leaderboards & activity feeds',
      'XP points, streak badges, levels & confetti-powered gamification system',
      'Web Push (VAPID) notifications, Razorpay payments & AWS S3 avatar uploads',
      'Google OAuth + email/password auth with JWT sessions & bcrypt hashing',
      'Custom SVG analytics charts — no chart library dependency'
    ],
    tech: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Groq AI', 'AWS S3', 'Razorpay', 'Web Push', 'Zod', 'JWT', 'Vercel', 'Neon'],
    image: '/projects/taskguru.png',
    link: 'https://task-os-nine.vercel.app',
    github: 'https://github.com/shiteshkhaw/TaskOS/blob/main/README.md##-live-demo',
    mockupType: 'browser'
  },
  {
    title: 'Wordsage',
    tagline: 'AI-powered content generation platform',
    desc: 'Built a full-stack application designed to help users generate structured content efficiently using AI.',
    features: ['Designed and developed the frontend and core user flows', 'Integrated AI-based content generation logic', 'Focused on usability and real-time response handling', 'Created a production-level application with real user interaction', 'Demonstrated ability to build and deploy complete systems'],
    tech: ['React', 'APIs', 'AI integration', 'Vercel'],
    image: '/projects/x.png',
    link: 'https://wordsage.vercel.app',
    github: 'https://github.com/shitesh-khaw/wordsage',
    mockupType: 'browser'
  },
  {
    title: 'Automation Systems',
    tagline: 'WhatsApp & Instagram',
    desc: 'Developed automation workflows using n8n to handle messaging, responses, and broadcast operations. Reduced manual effort significantly and enabled scalable communication workflows.',
    features: ['Built WhatsApp workflows for message handling/broadcasting', 'Created Instagram pipelines for engagement/responses', 'Integrated APIs, triggers, and webhook-based systems'],
    tech: ['n8n', 'Webhooks', 'APIs', 'Automation Logic'],
    image: '/projects/wa.png',
    link: '#',
    github: '#',
    mockupType: 'workflow'
  },
  {
    title: 'Makhija Quantum AI',
    tagline: 'Company Website',
    desc: 'Developed and deployed the official website, focusing on clean UI and performance. Delivered a live production website used by the company.',
    features: ['Built responsive UI with modern design principles', 'Ensured smooth performance and deployment'],
    tech: ['React', 'Tailwind CSS', 'Deployment'],
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
      {/* Workflow-style header */}
      <div className={styles.workflowHeader}>
        <Zap size={16} />
        <span>Automated Pipeline</span>
        {/* Phase tabs inside the header */}
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

      {/* Same dark content area as workflow card */}
      <div className={styles.workflowContent}>
        <div className={styles.phaseImageWrapper}>
          <img
            src={phases[activePhase].image}
            alt={phases[activePhase].label}
            className={styles.workflowImg}
          />
          {/* Navigation Arrows */}
          <button className={`${styles.phaseArrow} ${styles.phaseArrowLeft}`} onClick={prev}>
            <ChevronLeft size={20} />
          </button>
          <button className={`${styles.phaseArrow} ${styles.phaseArrowRight}`} onClick={next}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Phase Info Bar */}
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

export default function ProjectsContent() {
  return (
    <div className={styles.section}>
      <header className={styles.projectsIntro}>
        <h1 className={styles.mainTitle}>Featured Projects</h1>
        <p className={styles.mainSubtitle}>Building systems that automate, intelligence that scales.</p>
      </header>

      <div className={styles.projectStack}>
        {projects.map((proj, i) => (
          <div key={i} className={`${styles.projectCardPremium} ${proj.mockupType === 'pipeline' ? styles.pipelineCard : ''}`}>
            {/* Mockup Section */}
            <div className={styles.mockupWrapper}>
              {proj.mockupType === 'pipeline' ? (
                /* Multi-Phase Pipeline Gallery */
                <PipelineGallery phases={proj.phases} />
              ) : proj.mockupType === 'browser' ? (
                /* Browser Mockup Style */
                <div className={`${styles.browserWindow} ${proj.isLocked ? styles.locked : ''}`}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots}>
                      <span></span><span></span><span></span>
                    </div>
                    <div className={styles.browserUrl}>
                      <div className={styles.lockIcon} />
                      {proj.link.replace('https://', '')}
                    </div>
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
                /* Workflow Mockup Style (n8n Inspired) */
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

            {/* Project Details */}
            <div className={styles.projectDetails}>
              <div className={styles.typeIcon}>
                {proj.mockupType === 'pipeline' ? <BrainCircuit size={24} /> : proj.mockupType === 'workflow' ? <Cpu size={24} /> : <Globe size={24} />}
              </div>
              <h2 className={styles.premiumTitle}>{proj.title}</h2>
              <p className={styles.premiumTagline}>{proj.tagline}</p>

              <p className={styles.premiumDesc}>{proj.desc}</p>

              <div className={styles.featureGrid}>
                {proj.features.map(f => (
                  <div key={f} className={styles.featureItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Tags for pipeline */}
              {proj.tech && proj.mockupType === 'pipeline' && (
                <div className={styles.pipelineTechRow}>
                  {proj.tech.map(t => (
                    <span key={t} className={styles.pipelineTechTag}>{t}</span>
                  ))}
                </div>
              )}

              <div className={styles.projectActions}>
                {proj.mockupType === 'workflow' || proj.mockupType === 'pipeline' ? (
                  <button className={styles.automationBtn} disabled>
                    System Status: Active <Zap size={16} fill="currentColor" />
                  </button>
                ) : !proj.isLocked ? (
                  <a href={proj.link} className={styles.visitBtn} target="_blank" rel="noopener noreferrer">
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
        ))}
      </div>
    </div>
  );
}
