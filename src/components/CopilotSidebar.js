'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, MessageSquare, Trash2, Minus } from 'lucide-react';
import { sendMessageToGemini } from '@/lib/ai';
import styles from './CopilotSidebar.module.css';

const SUGGESTIONS = [
  "Tell me about Shitesh?",
  "What are his top projects?",
  "How can I contact him?",
  "Tell me about his skills?"
];

export default function CopilotSidebar({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const chatBottomRef = useRef(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text = input) => {
    const finalInput = typeof text === 'string' ? text : input;
    if (!finalInput.trim() || isLoading) return;
    
    const userMsg = { role: 'user', content: finalInput };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setMsgCount(prev => prev + 1);

    const response = await sendMessageToGemini(finalInput, messages);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Sparkles size={16} className={styles.headerIcon} />
          <span>Shitesh&apos;s AI Assistant</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionBtn}><Minus size={14} /></button>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Context Badge Row */}
      <div className={styles.contextInfo}>
        <div className={styles.contextBadge}>
          <MessageSquare size={12} />
          <span>portfolio · shitesh-khaw</span>
        </div>
        <div className={styles.messageLimit}>
          {Math.max(0, 10 - msgCount)} msgs left
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={styles.chatArea}>
        {messages.length === 0 && !isLoading && (
          <div className={styles.assistantIntro}>
            <div className={styles.botAvatar}>
              <Sparkles size={32} className={styles.pulseIcon} />
            </div>
            <h2 className={styles.introTitle}>Hi! I&apos;m Shitesh&apos;s Copilot 👋</h2>
            <p className={styles.introSubtitle}>
              Ask me anything about his projects, skills, experience, or achievements.
            </p>
            
            <div className={styles.introGrid}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => handleSend(s)} className={styles.suggestionItem}>
                  <Sparkles size={14} className={styles.suggestionIcon} />
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}>
            <div className={styles.messageHeader}>
              <span className={styles.roleName}>
                {msg.role === 'user' ? 'You' : "Shitesh's Copilot"}
              </span>
            </div>
            <div className={styles.messageContent}>{msg.content}</div>
          </div>
        ))}

        {isLoading && (
          <div className={styles.message}>
            <div className={styles.messageHeader}>
              <span className={styles.roleName}>Shitesh&apos;s Copilot</span>
            </div>
            <div className={styles.loadingDots}>
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Section */}
      <div className={styles.inputArea}>
        {messages.length > 0 && (
          <div className={styles.quickSuggestions}>
            {SUGGESTIONS.map((s, i) => (
              <button key={i} onClick={() => handleSend(s)} className={styles.quickBtn}>
                {s}
              </button>
            ))}
          </div>
        )}
        
        <div className={styles.inputBoxWrapper}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask anything about Shitesh..."
            className={styles.textInput}
            rows={1}
          />
          <div className={styles.inputFooter}>
            <button className={styles.trashBtn} onClick={() => {setMessages([]); setMsgCount(0);}} title="Clear History">
              <Trash2 size={16} />
            </button>
            <button 
              className={styles.sendBigBtn} 
              onClick={() => handleSend()} 
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
