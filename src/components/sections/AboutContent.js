'use client';

import { Sparkles, MapPin, Globe, Briefcase, Award, Code2, Layers, Cpu, Zap } from 'lucide-react';
import styles from './Sections.module.css';

export default function AboutContent() {
  return (
    <div className={styles.section}>
      <header className={styles.premiumHeader}>
        <div className={styles.premiumHeaderContent}>
          <div className={styles.premiumTag}>Identity & Background</div>
          <h1 className={styles.premiumMainTitle}>Shitesh <span className={styles.highlightPink}>Khaw</span></h1>
          <p className={styles.premiumMainSubtitle}>Building scalable infrastructure, intelligent automation, and operational leverage.</p>
        </div>
      </header>

      <div className={styles.aboutLayout}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              <Code2 size={40} className={styles.avatarIcon} />
            </div>
            <div className={styles.profileInfo}>
              <h3>Shitesh Khaw</h3>
              <p>Backend & AI Engineer</p>
            </div>
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.detailItem}>
              <MapPin size={16} />
              <span>Mumbai, India</span>
            </div>
            <div className={styles.detailItem}>
              <Briefcase size={16} />
              <span>System Architecture & Automation</span>
            </div>
            <div className={styles.detailItem}>
              <Globe size={16} />
              <span>English, Hindi, Marathi</span>
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

          <h2 className={styles.storyTitle} style={{ marginTop: '2rem' }}>Core Specialization</h2>
          <ul className={styles.storyText} style={{ paddingLeft: '20px', marginTop: '10px', marginBottom: '10px' }}>
            <li>Backend systems engineering and API-driven architectures (Node.js)</li>
            <li>Event-driven automation, webhook routing, and complex third-party integrations</li>
            <li>Architecting scalable, production-ready systems from loosely defined constraints</li>
            <li>Workflow optimization and operational efficiency engineering</li>
          </ul>

          <h2 className={styles.storyTitle} style={{ marginTop: '2rem' }}>Differentiation</h2>
          <p className={styles.storyText}>
            <strong>I focus on execution with intent.</strong>
          </p>
          <p className={styles.storyText}>
            Rather than shipping isolated features, I architect systems designed to evolve alongside business needs. I evaluate technical decisions based on their impact on dependencies, workflow continuity, and long-term maintainability. I build for reliability, preferring robust, automated processes over complex, high-maintenance codebases.
          </p>

          <h2 className={styles.storyTitle} style={{ marginTop: '2rem' }}>How I Think</h2>
          <p className={styles.storyText}>
            Good engineering is measured by how quietly a system operates in production.
          </p>
          <ul className={styles.storyText} style={{ paddingLeft: '20px', marginTop: '10px', marginBottom: '10px' }}>
            <li><strong>Optimize for leverage:</strong> Eliminate repetitive manual processes through structural automation.</li>
            <li><strong>Design for scale:</strong> Build infrastructure that handles growth without requiring constant human intervention.</li>
            <li><strong>Contextual engineering:</strong> Technical decisions must directly align with and enable business logic.</li>
            <li><strong>Maintainability by default:</strong> Clarity in architecture ensures a system remains adaptable over time.</li>
          </ul>
          <p className={styles.storyText}>
            The ultimate goal is to deploy systems that deliver compounding value without operational friction.
          </p>

          <h2 className={styles.storyTitle} style={{ marginTop: '2rem' }}>Experience</h2>
          <div className={styles.experienceTimeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h4>Core Contributions & Outcomes</h4>
                <ul style={{ paddingLeft: '20px', marginTop: '10px', fontSize: '0.9em', opacity: 0.9 }}>
                  <li>Architected and deployed backend services and API integrations powering core business workflows.</li>
                  <li>Engineered event-driven automation systems to streamline internal communication and operational routing.</li>
                  <li>Shipped production-ready applications, prioritizing system reliability, performance, and end-user usability.</li>
                  <li>Owned the end-to-end execution of complex integrations, taking ownership from initial architecture through deployment.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
