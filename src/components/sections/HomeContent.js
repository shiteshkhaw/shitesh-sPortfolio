'use client';

import { Sparkles, Terminal, Cpu, Database, Mail, MessageCircle, Zap, Folder, FileCode2 } from 'lucide-react';
import styles from './Sections.module.css';

// Custom SVG Icons for stability (Lucide exports are buggy in this environment)
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const PILLS = [
  { label: 'Backend Engineer', color: '#4ade80', icon: <Terminal size={14} /> },
  { label: 'AI / ML Dev', color: '#f472b6', icon: <Cpu size={14} /> },
  { label: 'Data Scientist', color: '#38bdf8', icon: <Database size={14} /> },
  { label: '@ EduVanceAI', color: '#c084fc', icon: <Sparkles size={14} /> },
];

const STATS = [
  { value: '3+', label: 'YEARS' },
  { value: '10+', label: 'PROJECTS' },
  { value: '∞', label: 'CURIOSITY' },
  { value: '↑', label: 'ALWAYS LEARNING' },
];

const SOCIALS = [
  { name: 'GitHub', icon: <GithubIcon size={16} />, url: 'https://github.com/shiteshkhaw' },
  { name: 'LinkedIn', icon: <LinkedinIcon size={16} />, url: 'https://linkedin.com/in/shiteshkhaw' },
  { name: 'Instagram', icon: <InstagramIcon size={16} />, url: 'https://instagram.com/shitesh_khaw' },
  { name: 'Email', icon: <Mail size={16} />, url: 'mailto:shiteshkhaw@gmail.com' },
  { name: 'Youtube', icon: <Zap size={16} />, url: '#' },
];

export default function HomeContent() {
  return (
    <div className={styles.section}>
      <div className={styles.heroContainer}>
        <div className={styles.heroMain}>
          <div className={styles.heroNameLarge}>
            <div className={styles.firstName}>Shitesh</div>
            <div className={styles.lastName}>Khaw</div>
          </div>

          <div className={styles.pillsContainer}>
            {PILLS.map((pill, i) => (
              <div key={i} className={styles.pill} style={{ '--pill-color': pill.color }}>
                <span className={styles.pillIcon} style={{ color: pill.color }}>{pill.icon}</span>
                {pill.label}
              </div>
            ))}
          </div>

          <div className={styles.heroDescriptionTwin}>
            // Hi, I'm Shitesh Khaw
          </div>

          <div className={styles.heroIntroText}>
            I build automation systems and <span className={styles.highlightPink}>scalable web applications</span> that help businesses reduce manual work and grow faster using <span className={styles.highlightBlue}>APIs, AI, and backend engineering</span>.
            <br /><br />
            Currently focused on backend development, automation workflows, and real-world problem solving.
            <br /><br />
            <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0', fontSize: '0.9em', opacity: 0.9 }}>
              <li style={{ marginBottom: '8px' }}>→ Built live products used in real environments</li>
              <li style={{ marginBottom: '8px' }}>→ Experienced with WhatsApp & Instagram automation systems</li>
              <li>→ Open to full-time roles (₹40k–₹60k range)</li>
            </ul>
          </div>

          <div className={styles.heroActions}>
            <button className={styles.mainBtn}>
              <Folder size={18} fill="#fff" />
              Projects
            </button>
            <button className={styles.ghostBtn}>About Me</button>
            <button className={styles.ghostBtn}>Contact</button>
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {STATS.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Socials Row */}
        <div className={styles.socialsRow}>
          {SOCIALS.map((social, i) => (
            <a key={i} href={social.url} className={styles.socialIconBox} target="_blank" rel="noopener noreferrer">
              {social.icon}
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
