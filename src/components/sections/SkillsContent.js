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
      { name: 'REST API Design', level: 92, icon: <FileJson size={14} />, tip: 'Designed scalable REST APIs with versioning, rate-limiting & Zod validation' },
      { name: 'Node.js Runtime', level: 90, icon: <Server size={14} />, tip: 'Built production services handling real traffic with async patterns' },
      { name: 'Express.js Framework', level: 87, icon: <Globe2 size={14} />, tip: 'Core framework for backend services — middleware, error handling, routing' },
      { name: 'Webhooks & Event-driven Systems', level: 88, icon: <Webhook size={14} />, tip: 'Architected event-based integrations across Meta, Stripe & custom platforms' },
      { name: 'Prisma ORM', level: 85, icon: <Database size={14} />, tip: 'Type-safe database access with migrations, relations & connection pooling' },
    ],
  },
  {
    name: 'Frontend Engineering',
    icon: <Layout size={20} />,
    color: '#f472b6',
    skills: [
      { name: 'Next.js 15 (App Router)', level: 87, icon: <Code2 size={14} />, tip: 'Server components, SSR/SSG, middleware, API routes — used in TaskGuru' },
      { name: 'React Component Architecture', level: 85, icon: <Component size={14} />, tip: 'Context providers, custom hooks, modular reusable component systems' },
      { name: 'TypeScript', level: 82, icon: <Code2 size={14} />, tip: 'Type-safe full-stack development — interfaces, generics, discriminated unions' },
      { name: 'Tailwind CSS Systems', level: 88, icon: <Paintbrush size={14} />, tip: 'Utility-first design systems — used in production apps at scale' },
      { name: 'Performance Optimization', level: 80, icon: <Gauge size={14} />, tip: 'Lazy loading, code splitting, Core Web Vitals, dynamic imports' },
    ],
  },
  {
    name: 'Databases & Infrastructure',
    icon: <Terminal size={20} />,
    color: '#ffb86c',
    skills: [
      { name: 'PostgreSQL (Neon Serverless)', level: 84, icon: <HardDrive size={14} />, tip: 'Schema design, indexing, relations, connection pooling with Neon' },
      { name: 'MongoDB & Schema Design', level: 80, icon: <HardDrive size={14} />, tip: 'Document modeling for scalable, flexible data layers' },
      { name: 'AWS S3 (File Storage)', level: 78, icon: <HardDrive size={14} />, tip: 'Presigned URL uploads, bucket policies, avatar storage in TaskGuru' },
      { name: 'Git & CI/CD', level: 86, icon: <GitBranch size={14} />, tip: 'Branching strategies, rebasing, GitHub Actions, Vercel deployments' },
      { name: 'Deployment (Vercel)', level: 82, icon: <Rocket size={14} />, tip: 'Zero-downtime deployments with preview branches and env management' },
    ],
  },
  {
    name: 'Automation & Integration Systems',
    icon: <Workflow size={20} />,
    color: '#58a6ff',
    skills: [
      { name: 'Workflow Automation (n8n)', level: 95, icon: <Zap size={14} />, tip: 'Designed multi-phase production pipelines — from scraping to AI conversion' },
      { name: 'API Integrations', level: 92, icon: <Plug size={14} />, tip: 'Connected 15+ third-party services: Razorpay, Resend, Groq, AWS, OAuth' },
      { name: 'Event-based Systems', level: 88, icon: <Radio size={14} />, tip: 'Webhook-driven architectures with intelligent routing logic' },
      { name: 'Social Platform Automation', level: 90, icon: <Share2 size={14} />, tip: 'WhatsApp, Instagram, and Meta Graph API automation at scale' },
    ],
  },
  {
    name: 'AI & Intelligent Systems',
    icon: <BrainCircuit size={20} />,
    color: '#c084fc',
    skills: [
      { name: 'AI API Integration (Groq / OpenAI)', level: 90, icon: <Bot size={14} />, tip: 'Groq LLaMA 3, OpenRouter, OpenAI APIs — live in TaskGuru & WordSage' },
      { name: 'Prompt Engineering', level: 87, icon: <MessageSquare size={14} />, tip: 'System prompts, chain-of-thought, few-shot patterns for production apps' },
      { name: 'AI-powered Feature Design', level: 88, icon: <Wand2 size={14} />, tip: 'AI coach, task breaker, habit suggester, streak guardian — all in TaskGuru' },
      { name: 'NLP & Intent Detection', level: 76, icon: <Cpu size={14} />, tip: 'Text classification, intent routing in conversational AI pipelines' },
    ],
  },
  {
    name: 'Security & Reliability',
    icon: <ShieldCheck size={20} />,
    color: '#f97316',
    skills: [
      { name: 'JWT Authentication & OAuth', level: 88, icon: <KeyRound size={14} />, tip: 'Stateless JWT sessions + Google OAuth 2.0 — production-hardened in TaskGuru' },
      { name: 'Role-Based Access Control', level: 83, icon: <Lock size={14} />, tip: 'Granular RBAC (admin/member) with middleware guards in production' },
      { name: 'API Security Practices', level: 84, icon: <ShieldCheck size={14} />, tip: 'Rate limiting (5 req/min auth), CORS, HTTP-only cookies, COOP headers' },
      { name: 'Input Validation (Zod)', level: 87, icon: <ScanSearch size={14} />, tip: 'Schema validation on all API inputs — XSS prevention, SQL injection guards' },
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
