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
      { name: 'REST API Design', level: 90, icon: <FileJson size={14} />, tip: 'Designed scalable APIs for real-world applications' },
      { name: 'Node.js Runtime', level: 90, icon: <Server size={14} />, tip: 'Built production services handling real traffic' },
      { name: 'Express.js Framework', level: 85, icon: <Globe2 size={14} />, tip: 'Core framework for all backend services' },
      { name: 'Webhooks & Event-driven Systems', level: 88, icon: <Webhook size={14} />, tip: 'Architected event-based integrations across platforms' },
    ],
  },
  {
    name: 'Frontend Engineering',
    icon: <Layout size={20} />,
    color: '#f472b6',
    skills: [
      { name: 'Next.js (SSR, SSG)', level: 85, icon: <Code2 size={14} />, tip: 'Server-rendered apps with optimized performance' },
      { name: 'React Component Architecture', level: 85, icon: <Component size={14} />, tip: 'Modular, reusable component systems' },
      { name: 'Tailwind CSS Systems', level: 88, icon: <Paintbrush size={14} />, tip: 'Utility-first design systems at scale' },
      { name: 'Performance Optimization', level: 80, icon: <Gauge size={14} />, tip: 'Lazy loading, code splitting, Core Web Vitals' },
    ],
  },
  {
    name: 'Data & Developer Tooling',
    icon: <Terminal size={20} />,
    color: '#ffb86c',
    skills: [
      { name: 'MongoDB & Schema Design', level: 80, icon: <HardDrive size={14} />, tip: 'Document modeling for scalable data layers' },
      { name: 'Query Optimization', level: 75, icon: <Database size={14} />, tip: 'Indexing and aggregation pipeline tuning' },
      { name: 'Git Version Control', level: 85, icon: <GitBranch size={14} />, tip: 'Branching strategies, rebasing, CI workflows' },
      { name: 'API Testing (Postman)', level: 90, icon: <TestTube2 size={14} />, tip: 'Automated test collections and environment management' },
      { name: 'Deployment (Vercel)', level: 80, icon: <Rocket size={14} />, tip: 'Zero-downtime deployments with preview branches' },
    ],
  },
  {
    name: 'Automation & Integration Systems',
    icon: <Workflow size={20} />,
    color: '#58a6ff',
    skills: [
      { name: 'Workflow Automation (n8n)', level: 95, icon: <Zap size={14} />, tip: 'Designed multi-phase production pipelines' },
      { name: 'API Integrations', level: 90, icon: <Plug size={14} />, tip: 'Connected 10+ third-party services in production' },
      { name: 'Event-based Systems', level: 88, icon: <Radio size={14} />, tip: 'Webhook-driven architectures with routing logic' },
      { name: 'Social Platform Automation', level: 90, icon: <Share2 size={14} />, tip: 'WhatsApp, Instagram, and Meta API automation' },
    ],
  },
  {
    name: 'AI & Intelligent Systems',
    icon: <BrainCircuit size={20} />,
    color: '#c084fc',
    skills: [
      { name: 'Prompt Engineering', level: 85, icon: <MessageSquare size={14} />, tip: 'Crafted production prompts for content generation' },
      { name: 'AI API Integration', level: 88, icon: <Bot size={14} />, tip: 'OpenRouter, OpenAI APIs in live systems' },
      { name: 'NLP Fundamentals', level: 75, icon: <Cpu size={14} />, tip: 'Intent detection and text classification' },
      { name: 'AI-powered Features', level: 85, icon: <Wand2 size={14} />, tip: 'Built Wordsage — AI content generation platform' },
    ],
  },
  {
    name: 'Security & Reliability',
    icon: <ShieldCheck size={20} />,
    color: '#f97316',
    skills: [
      { name: 'JWT Authentication', level: 85, icon: <KeyRound size={14} />, tip: 'Stateless auth with refresh token rotation' },
      { name: 'Role-Based Access Control', level: 80, icon: <Lock size={14} />, tip: 'Granular RBAC in production applications' },
      { name: 'API Security Practices', level: 82, icon: <ShieldCheck size={14} />, tip: 'Rate limiting, CORS, helmet.js hardening' },
      { name: 'Input Validation & Sanitization', level: 85, icon: <ScanSearch size={14} />, tip: 'Zod schemas, XSS prevention, SQL injection guards' },
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
        <div className={styles.skillsBadge} style={{ '--badge-color': '#f97316' }}>
          <span className={styles.badgeEmoji}>🚧</span>
          <span>Currently Building: <strong>Securova</strong> (AI Security Platform)</span>
        </div>
        <div className={styles.skillsBadge} style={{ '--badge-color': '#58a6ff' }}>
          <span className={styles.badgeEmoji}>⚡</span>
          <span>Built: <strong>Wordsage</strong> (AI-powered content system)</span>
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
