'use client';

import { Mail, MessageCircle, Send, Zap, Sparkles, MapPin } from 'lucide-react';
import styles from './Sections.module.css';

// Custom SVG Icons for stability
const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CONTACT_LINKS = [
  {
    name: 'LinkedIn',
    value: 'shitesh-khaw',
    url: 'https://linkedin.com/in/shiteshkhaw',
    icon: <LinkedinIcon size={24} />,
    color: '#0077b5'
  },
  {
    name: 'GitHub',
    value: 'shitesh-khaw',
    url: 'https://github.com/shiteshkhaw',
    icon: <GithubIcon size={24} />,
    color: 'var(--text-primary)'
  },
  {
    name: 'WhatsApp',
    value: 'Automated Agent',
    url: 'https://wa.me/7045429261',
    icon: <MessageCircle size={24} />,
    color: '#25D366'
  },
];

export default function ContactContent() {
  return (
    <div className={styles.section}>
      <header className={styles.premiumHeader}>
        <div className={styles.premiumHeaderContent}>
          <div className={styles.premiumTag}>Direct Line</div>
          <h1 className={styles.premiumMainTitle}>Let&apos;s Build <span className={styles.highlightPink}>Something Impactful</span></h1>
          <p className={styles.premiumMainSubtitle}>
            I&apos;m currently open to full-time opportunities in backend development, automation, and full-stack roles.<br />
            If you&apos;re looking for someone who can take ownership and build real systems, feel free to reach out.
          </p>
        </div>
      </header>

      <div className={styles.contactContainer}>
        <div className={styles.contactMain}>
          <div className={styles.connectGrid}>
            <div className={styles.connectCardPrimary}>
              <Mail size={32} className={styles.connectIcon} />
              <h3>Email Me</h3>
              <p>For inquiries, projects, or just a chat.</p>
              <a href="mailto:shiteshkhaw@gmail.com" className={styles.emailBtn}>
                shiteshkhaw@gmail.com
                <Send size={16} />
              </a>
            </div>

            <div className={styles.suggestionCard}>
              <Zap size={32} className={styles.zapIcon} />
              <h3>Automated Flow</h3>
              <p>Prefer to use my AI assistant? Click the Copilot icon in the sidebar.</p>
              <button className={styles.copilotCtaBtn} disabled>
                AI Agent Active <Sparkles size={14} />
              </button>
            </div>
          </div>

          <div className={styles.socialLinkGrid}>
            {CONTACT_LINKS.map((link, i) => (
              <a key={i} href={link.url} className={styles.socialCardPremium} target="_blank" rel="noopener noreferrer">
                <div className={styles.socialIconContainer} style={{ color: link.color }}>
                  {link.icon}
                </div>
                <div className={styles.socialInfo}>
                  <span className={styles.socialName}>{link.name}</span>
                  <span className={styles.socialValue}>{link.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.statusSideCard}>
          <div className={styles.statusHead}>
            <div className={styles.statusDotPulse} />
            <span>Currently Active</span>
          </div>
          <div className={styles.statusStats}>
            <div className={styles.statusStatItem}>
              <MapPin size={14} />
              <span>Mumbai, India (GMT+5:30)</span>
            </div>
            <div className={styles.statusStatItem}>
              <Zap size={14} />
              <span>Typical response: &lt; 2 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
