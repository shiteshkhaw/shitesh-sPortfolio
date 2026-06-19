'use client';

import { useState } from 'react';
import {
  Database, Terminal, Layout, Workflow,
  Sparkles, Server, Globe2, FileJson, Webhook,
  Component, Paintbrush, Gauge,
  GitBranch, TestTube2, Rocket, HardDrive,
  Zap, Plug, Radio, Share2,
  BrainCircuit, MessageSquare, Bot, Wand2,
  ShieldCheck, KeyRound, Lock, ScanSearch,
  Code2, Cpu
} from 'lucide-react';
import styles from './Sections.module.css';

const skillCategories = [
  {
    name: 'Backend Systems & API Architecture',
    icon: <Database size={20} />,
    color: '#4ade80',
    skills: [
      { name: 'Python & FastAPI', level: 91, icon: <Code2 size={14} />, tip: 'Asynchronous API development with Pydantic validation, dependency injection, and auto-OpenAPI docs' },
      { name: 'Node.js & Express.js', level: 90, icon: <Server size={14} />, tip: 'Production services utilizing concurrent event loops, modular routers, and custom middleware' },
      { name: 'REST & Webhook Systems', level: 92, icon: <FileJson size={14} />, tip: 'Scale-ready API endpoints with versioning, rate limiting, and secure webhook validation' },
      { name: 'Prisma ORM', level: 85, icon: <Database size={14} />, tip: 'Type-safe database client with schema migrations, relational mapping, and pooling' },
    ],
  },
  {
    name: 'AI & Intelligent Systems',
    icon: <BrainCircuit size={20} />,
    color: '#c084fc',
    skills: [
      { name: 'RAG Architecture', level: 92, icon: <Sparkles size={14} />, tip: 'Hybrid vector-keyword search, semantic reranking (Cross-Encoder), and context optimization' },
      { name: 'Vector DBs (ChromaDB)', level: 88, icon: <Database size={14} />, tip: 'High-dimensional embeddings storing, indexing, and semantic similarity filtering' },
      { name: 'Agentic Workflows & Memory', level: 90, icon: <Wand2 size={14} />, tip: 'Autonomous systems with conversation memory, intent parsing, and dynamic routing' },
      { name: 'AI API Integrations', level: 93, icon: <Bot size={14} />, tip: 'Integration of LLMs (Groq LLaMA 3, OpenAI, OpenRouter) into production workflows' },
      { name: 'Prompt Engineering', level: 88, icon: <MessageSquare size={14} />, tip: 'Chain-of-thought, few-shot prompts, dynamic context windowing, and output parser guards' },
    ],
  },
  {
    name: 'Databases & Infrastructure',
    icon: <Terminal size={20} />,
    color: '#ffb86c',
    skills: [
      { name: 'PostgreSQL (Neon Serverless)', level: 85, icon: <HardDrive size={14} />, tip: 'Relational database schema design, indexing, connection pooling, and Neon branching' },
      { name: 'Docker & Containerization', level: 84, icon: <Cpu size={14} />, tip: 'Standardizing developmental environments and deploying containerized microservices' },
      { name: 'Redis Caching & Queues', level: 82, icon: <Zap size={14} />, tip: 'Reducing latency via Redis key-value caching and job queues for asynchronous background tasks' },
      { name: 'AWS Cloud Services (S3)', level: 80, icon: <HardDrive size={14} />, tip: 'Cloud storage management, presigned upload URLs, and asset delivery optimizations' },
      { name: 'Git, CI/CD & Deployments', level: 87, icon: <GitBranch size={14} />, tip: 'Branching flows, automated lint-test-deploy GitHub Actions pipelines, and Vercel hosting' },
    ],
  },
  {
    name: 'Automation & Integration Systems',
    icon: <Workflow size={20} />,
    color: '#58a6ff',
    skills: [
      { name: 'Workflow Automation (n8n)', level: 95, icon: <Zap size={14} />, tip: 'Designing multi-phase production workflows — from lead scraping to AI qualification' },
      { name: 'API Integrations & Meta Graph', level: 92, icon: <Plug size={14} />, tip: 'Connected 15+ SaaS and cloud services: Stripe, WhatsApp Cloud API, Instagram Graph API' },
      { name: 'Webhook & Event Brokers', level: 90, icon: <Radio size={14} />, tip: 'Event-driven message routing, payload transformations, and reliable HTTP callback systems' },
    ],
  },
  {
    name: 'Frontend Engineering',
    icon: <Layout size={20} />,
    color: '#f472b6',
    skills: [
      { name: 'Next.js 15 (App Router)', level: 87, icon: <Code2 size={14} />, tip: 'Server Components, SSR/SSG pre-rendering, route handlers, and middleware authorization' },
      { name: 'React Component Architecture', level: 85, icon: <Component size={14} />, tip: 'Custom hooks, contexts, state managers, and design system components' },
      { name: 'TypeScript', level: 84, icon: <Code2 size={14} />, tip: 'Strong typing across client/server models, interfaces, generic types, and utility interfaces' },
      { name: 'Tailwind CSS Systems', level: 88, icon: <Paintbrush size={14} />, tip: 'Utility-first layout design, interactive hover effects, and theme configuration' },
    ],
  },
  {
    name: 'Security & Reliability',
    icon: <ShieldCheck size={20} />,
    color: '#f97316',
    skills: [
      { name: 'JWT & OAuth Authentication', level: 88, icon: <KeyRound size={14} />, tip: 'Stateless JWT validation sessions, token expirations, and Google OAuth 2.0 login flows' },
      { name: 'Role-Based Access Control', level: 85, icon: <Lock size={14} />, tip: 'Granular user authorization levels (admin/member) with route and API middleware locks' },
      { name: 'API Security & Validation', level: 86, icon: <ShieldCheck size={14} />, tip: 'Implementing rate limiting, CORS configurations, and robust validation schemas using Zod' },
    ],
  },
];


function SkillItem({ skill, catColor }) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div
      className={styles.skillItemPremium}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <div className={styles.skillInfoPremium}>
        <span className={styles.skillNamePremium}>
          <span className={styles.skillIcon} style={{ color: catColor }}>{skill.icon}</span>
          {skill.name}
        </span>
        <span className={styles.skillLevelPremium}>{skill.level}%</span>
      </div>
      <div className={styles.skillBarContainer}>
        <div
          className={styles.skillBarFill}
          style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, #1d1e22, ${catColor})` }}
        />
      </div>
      {showTip && (
        <div className={styles.skillTooltip}>
          {skill.tip}
        </div>
      )}
    </div>
  );
}

export default function SkillsContent() {
  return (
    <div className={styles.section}>
      <header className={styles.premiumHeader}>
        <div className={styles.premiumHeaderContent}>
          <div className={styles.premiumTag}>Technical Arsenal</div>
          <h1 className={styles.premiumMainTitle}>Stack & <span className={styles.highlightPink}>Specializations</span></h1>
          <p className={styles.premiumMainSubtitle}>Technologies I use to build scalable, production-ready systems.</p>
        </div>
      </header>

      {/* Badges */}
      <div className={styles.skillsBadgeRow}>
        <div className={styles.skillsBadge} style={{ '--badge-color': '#ff2b8f' }}>
          <span className={styles.badgeEmoji}>🧠</span>
          <span>Built: <strong>DocuMind AI</strong> (Enterprise Document Intelligence Platform)</span>
        </div>
        <div className={styles.skillsBadge} style={{ '--badge-color': '#6366f1' }}>
          <span className={styles.badgeEmoji}>⚡</span>
          <span>Built: <strong>TaskGuru</strong> (AI Productivity OS — Next.js 15 + PostgreSQL + Groq AI)</span>
        </div>
        <div className={styles.skillsBadge} style={{ '--badge-color': '#58a6ff' }}>
          <span className={styles.badgeEmoji}>🚀</span>
          <span>Built: <strong>Wordsage</strong> (AI-powered content generation platform)</span>
        </div>
        <div className={styles.skillsBadge} style={{ '--badge-color': '#4ade80' }}>
          <span className={styles.badgeEmoji}>🤖</span>
          <span>Deployed: <strong>AI Sales Pipeline</strong> (n8n + LLM — autonomous lead conversion)</span>
        </div>
      </div>

      <div className={styles.skillsGridPremium}>
        {skillCategories.map((cat, i) => (
          <div key={i} className={styles.skillCategoryCard} style={{ '--cat-color': cat.color }}>
            <div className={styles.skillCategoryHeader}>
              <div className={styles.skillCatIcon}>{cat.icon}</div>
              <h3>{cat.name}</h3>
            </div>

            <div className={styles.skillItemsList}>
              {cat.skills.map((skill, j) => (
                <SkillItem key={j} skill={skill} catColor={cat.color} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.skillsFooter}>
        <div className={styles.footerNote}>
          <Sparkles size={16} />
          <span>Focused on building systems, not just interfaces.</span>
        </div>
      </div>
    </div>
  );
}
