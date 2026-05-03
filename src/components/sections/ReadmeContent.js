'use client';

import { 
  Rocket, Wrench, Package, Terminal as TerminalIcon, 
  Palette, Zap, Phone, Heart, GitBranch, Shield, 
  Cpu, Globe, Star, BookOpen
} from 'lucide-react';
import styles from './Sections.module.css';

// Custom GitHub Icon for stability
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ReadmeContent() {
  return (
    <div className={styles.section}>
      <header className={styles.premiumHeader}>
        <div className={styles.premiumHeaderContent}>
          <div className={styles.premiumTag}>Documentation v2.1</div>
          <h1 className={styles.premiumMainTitle}>Project <span className={styles.highlightPink}>Manifesto</span></h1>
          <p className={styles.premiumMainSubtitle}>Architecture, core principles, and the tech stack behind this IDE.</p>
        </div>
      </header>

      <div className={styles.readmeContainerPremium}>
        <div className={styles.readmeSectionPremium}>
          <div className={styles.readmeIconHeader}>
            <div className={styles.readmeIconCircle}>
              <Rocket size={20} />
            </div>
            <h2>Core Objective</h2>
          </div>
          <p className={styles.readmeTextPremium}>
            This portfolio is more than just a website; it&apos;s a high-performance **VS Code Twin** 
            designed to mirror a developer&apos;s natural workspace. Built with <strong>Next.js 15</strong> 
            and <strong>Turbopack</strong>, it prioritizes speed, interactivity, and absolute visual parity 
            with modern IDE environments.
          </p>
        </div>

        <div className={styles.readmeGridPremium}>
          <div className={styles.readmeMiniCard}>
            <div className={styles.miniIcon}><Cpu size={18} /></div>
            <h3>AI-Integrated</h3>
            <p>Built-in Copilot sidebar powered by Groq AI for contextual assistance.</p>
          </div>
          <div className={styles.readmeMiniCard}>
            <div className={styles.miniIcon}><Zap size={18} /></div>
            <h3>Turbopack Ready</h3>
            <p>Leverages Next.js 15 App Router and Turbopack for near-instant rendering.</p>
          </div>
          <div className={styles.readmeMiniCard}>
            <div className={styles.miniIcon}><Shield size={18} /></div>
            <h3>Type Safe</h3>
            <p>Strict TypeScript implementation for robust and reliable system logic.</p>
          </div>
          <div className={styles.readmeMiniCard}>
            <div className={styles.miniIcon}><GithubIcon size={18} /></div>
            <h3>Open Source</h3>
            <p>Modular architecture designed for transparency and community contribution.</p>
          </div>
        </div>

        <div className={styles.readmeSectionPremium}>
          <div className={styles.readmeIconHeader}>
            <div className={styles.readmeIconCircle}>
              <BookOpen size={20} />
            </div>
            <h2>Technical Specifications</h2>
          </div>
          <div className={styles.techTagCloud}>
            {['Next.js 15', 'React 19', 'Vanilla CSS', 'Lucide React', 'Groq AI', 'n8n', 'Vercel'].map(t => (
              <span key={t} className={styles.techTag}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.readmeFinalFooter}>
          <div className={styles.footerInner}>
            <Heart size={16} className={styles.heartPulse} />
            <span>Built by Shitesh Khaw • 2026 Edition</span>
          </div>
        </div>
      </div>
    </div>
  );
}
