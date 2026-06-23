'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Send, X, MessageCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message } from '@/types/chat';

const quickPrompts = [
  "What are Vijay's skills?",
  'Tell me about his projects',
  'Work experience?',
  'How to contact him?',
];

const initialHistory: Message[] = [
  {
    role: 'bot',
    content:
      "Hey! I'm VM Bot — ask me anything about Vijay's background, skills, projects, or experience!",
  },
];

const formatMessage = (text: string): string => {
  let formatted = text;
  formatted = formatted.replace(
    /^# (.*$)/gm,
    "<h3 class='font-bold text-base mt-3 mb-1'>$1</h3>"
  );
  formatted = formatted.replace(
    /^## (.*$)/gm,
    "<h4 class='font-semibold text-sm mt-2 mb-1'>$1</h4>"
  );
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(
    /\b((https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)/g,
    url => {
      let href = url;
      if (!href.startsWith('http')) href = `https://${href}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-[var(--brand-strong)] underline underline-offset-2">${url}</a>`;
    }
  );

  const lines = formatted.split('\n');
  let inList = false;
  const result: string[] = [];
  let listItems: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('*')) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      listItems.push(
        `<li class="ml-4 text-sm">${trimmed.substring(1).trim()}</li>`
      );
    } else {
      if (inList) {
        result.push(`<ul class="list-disc my-1">${listItems.join('')}</ul>`);
        listItems = [];
        inList = false;
      }
      if (trimmed)
        result.push(`<p class="text-sm leading-relaxed">${trimmed}</p>`);
    }
  }
  if (inList)
    result.push(`<ul class="list-disc my-1">${listItems.join('')}</ul>`);

  return result.join('');
};

const ChatBot: React.FC<{ botName?: string }> = ({ botName = 'VM Bot' }) => {
  const [messages, setMessages] = useState<Message[]>(initialHistory);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetch('/api/chat')
      .then(res => res.json())
      .then((data: { configured?: boolean }) =>
        setIsConfigured(Boolean(data.configured))
      )
      .catch(() => setIsConfigured(false));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

  const handleFabMove = (e: React.MouseEvent) => {
    if (!fabRef.current) return;
    const rect = fabRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    fabRef.current.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
  };

  const handleFabLeave = () => {
    if (fabRef.current) {
      fabRef.current.style.transform = 'translate(0px, 0px)';
    }
  };

  const handleSubmit = async (text?: string) => {
    const userMessage = (text || input).trim();
    if (!userMessage) return;

    setShowQuickPrompts(false);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.filter(m => m.role === 'user' || m.role === 'bot'),
        }),
      });

      const data = (await res.json()) as {
        reply?: string;
        error?: string;
        message?: string;
      };

      if (res.status === 503) {
        setIsConfigured(false);
        setMessages(prev => [
          ...prev,
          {
            role: 'bot',
            content:
              data.message ??
              'Chat is not configured yet. Please email vijaymakkad0104@gmail.com instead.',
          },
        ]);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error ?? 'Request failed');
      }

      setMessages(prev => [
        ...prev,
        { role: 'bot', content: data.reply ?? 'No response received.' },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: "Sorry, I'm having trouble responding. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] rounded-2xl glass-panel overflow-hidden flex flex-col shadow-2xl"
            style={{ boxShadow: '0 0 24px var(--brand-solid, #06b6d4)28, 0 8px 32px rgba(0,0,0,0.5)', border: '1px solid var(--brand-alpha-medium, rgba(6,182,212,0.2))' }}
          >
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--neutral-border-medium, #1e293b)' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-solid, #06b6d4)' }}>
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--brand-on-solid, #fff)' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--neutral-on-background-strong, #f8fafc)' }}>
                    {botName}
                  </p>
                  <p className="text-[10px] font-mono" style={{ color: 'var(--neutral-on-background-weak, #94a3b8)' }}>
                    {isConfigured === false ? 'Not configured' : 'Powered by Gemini'}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsChatOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg transition-colors cursor-pointer"
                style={{ color: 'var(--neutral-on-background-weak, #94a3b8)' }}
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[50vh]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm ${
                      msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                    }`}
                    style={msg.role === 'user'
                      ? { background: 'var(--brand-solid, #06b6d4)', color: 'var(--brand-on-solid, #fff)' }
                      : { background: 'var(--neutral-background-medium, #151b22)', color: 'var(--neutral-on-background-strong, #f8fafc)' }
                    }
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(msg.content),
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {showQuickPrompts && messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {quickPrompts.map(prompt => (
                    <motion.button
                      key={prompt}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSubmit(prompt)}
                      className="px-3 py-1.5 text-xs rounded-full transition-colors cursor-pointer"
                      style={{ border: '1px solid var(--neutral-border-medium, #1e293b)', color: 'var(--neutral-on-background-weak, #94a3b8)' }}
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1" style={{ background: 'var(--neutral-background-medium, #151b22)' }}>
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--brand-solid, #06b6d4)' }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="p-3 flex gap-2"
              style={{ borderTop: '1px solid var(--neutral-border-medium, #1e293b)' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={
                  isConfigured === false
                    ? 'Chat unavailable — use contact form'
                    : 'Ask about Vijay...'
                }
                className="flex-1 text-sm px-4 py-2.5 rounded-xl transition-all focus:outline-none"
                style={{
                  background: 'var(--neutral-background-medium, #151b22)',
                  color: 'var(--neutral-on-background-strong, #f8fafc)',
                  border: '1px solid var(--neutral-border-medium, #1e293b)',
                }}
              />
              <motion.button
                type="submit"
                disabled={!input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl disabled:opacity-30 cursor-pointer transition-opacity"
                style={{ background: 'var(--brand-solid, #06b6d4)', color: 'var(--brand-on-solid, #fff)' }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={fabRef}
        onClick={() => setIsChatOpen(!isChatOpen)}
        onMouseMove={handleFabMove}
        onMouseLeave={handleFabLeave}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer will-change-transform"
        style={{
          background: 'var(--brand-solid, #06b6d4)',
          color: 'var(--brand-on-solid, #fff)',
          boxShadow: '0 0 20px var(--brand-alpha-strong, rgba(6,182,212,0.35)), 0 4px 16px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chat"
      >
        {!isChatOpen && (
          <span className="absolute inset-0 rounded-2xl animate-pulse-ring" style={{ background: 'var(--brand-solid, #06b6d4)' }} />
        )}
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ChatBot;
