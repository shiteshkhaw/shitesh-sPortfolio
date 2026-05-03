'use client';
import HomeContent from './sections/HomeContent';
import AboutContent from './sections/AboutContent';
import ProjectsContent from './sections/ProjectsContent';
import SkillsContent from './sections/SkillsContent';
import ContactContent from './sections/ContactContent';
import ReadmeContent from './sections/ReadmeContent';
import { ChevronRight, Folder } from 'lucide-react';
import styles from './EditorContent.module.css';

const SECTIONS = {
  home: HomeContent,
  about: AboutContent,
  projects: ProjectsContent,
  skills: SkillsContent,
  contact: ContactContent,
  readme: ReadmeContent,
};

export default function EditorContent({ activeFile, currentFile }) {
  const Content = SECTIONS[activeFile] || HomeContent;

  return (
    <div className={styles.editor}>
      {activeFile !== 'home' && (
        <div className={styles.lineNumbers}>
          {Array.from({ length: 60 }, (_, i) => (
            <span key={i} className={styles.lineNum}>{i + 1}</span>
          ))}
        </div>
      )}
      <div className={`${styles.content} ${activeFile === 'home' ? styles.fullWidth : ''}`}>
        <Content />
      </div>
    </div>
  );
}
