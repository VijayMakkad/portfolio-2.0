'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, CheckCircle, AlertCircle } from 'lucide-react';
import { person } from '@/resources';

/* ── Toast ──────────────────────────────────────────────── */
type ToastType = 'success' | 'error';
interface ToastState { type: ToastType; message: string }

function Toast({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-24 right-4 sm:right-6 z-[70] flex items-start gap-3 rounded-xl px-4 py-3 shadow-2xl max-w-sm"
      style={{
        background: 'var(--page-background, #0a0f14)',
        border: `1px solid ${toast.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${toast.type === 'success' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)'}`,
      }}
    >
      {toast.type === 'success'
        ? <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#4ade80' }} />
        : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#f87171' }} />
      }
      <p className="text-sm" style={{ color: 'var(--neutral-on-background-strong, #f8fafc)' }}>{toast.message}</p>
      <button onClick={onDismiss} className="ml-auto shrink-0 cursor-pointer" style={{ color: 'var(--neutral-on-background-weak, #64748b)' }}>
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ── Contact Form ───────────────────────────────────────── */
function ContactForm({ onSuccess, onError }: { onSuccess: () => void; onError: (m: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);

  const field: React.CSSProperties = {
    background: 'var(--neutral-background-medium, rgba(255,255,255,0.04))',
    border: '1px solid var(--neutral-border-medium, rgba(255,255,255,0.08))',
    color: 'var(--neutral-on-background-strong, #f8fafc)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) { onError(data.message ?? data.error ?? 'Failed to send.'); return; }
      setName(''); setEmail(''); setMessage('');
      onSuccess();
    } catch { onError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" name="website" value={website}
        onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--neutral-on-background-weak, #94a3b8)' }}>Name</label>
          <input style={field} type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Vijay Makkad" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--neutral-on-background-weak, #94a3b8)' }}>Email</label>
          <input style={field} type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="vijay@example.com" required />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium" style={{ color: 'var(--neutral-on-background-weak, #94a3b8)' }}>Message</label>
        <textarea style={{ ...field, resize: 'none', minHeight: '100px' }} value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Tell me about your project or idea..." required rows={4} />
      </div>

      <motion.button type="submit" disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
        className="flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm cursor-pointer disabled:opacity-50"
        style={{ background: 'var(--brand-solid, #06b6d4)', color: 'var(--brand-on-solid, #fff)' }}
      >
        {loading ? (
          <>
            <motion.div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
              animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
            Sending...
          </>
        ) : (
          <><Send className="w-4 h-4" /> Send message</>
        )}
      </motion.button>
    </form>
  );
}

/* ── Platform cards ─────────────────────────────────────── */
interface Platform {
  name: string;
  description: string;
  accentColor: string;
  glowColor: string;
  href?: string;
  isMessage?: boolean;
  icon: React.ReactNode;
}

const platforms: Platform[] = [
  {
    name: 'GitHub',
    description: 'Code & Projects',
    accentColor: 'var(--neutral-on-background-strong, #e2e8f0)',
    glowColor: 'rgba(226,232,240,0.08)',
    href: 'https://github.com/VijayMakkad',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    description: 'Professional Network',
    accentColor: '#60a5fa',
    glowColor: 'rgba(96,165,250,0.08)',
    href: 'https://www.linkedin.com/in/vijay-makkad-1573681b3/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    description: 'Direct Message',
    accentColor: 'var(--brand-on-background-medium, #22d3ee)',
    glowColor: 'var(--brand-alpha-weak, rgba(6,182,212,0.08))',
    href: `mailto:${person.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    name: 'Resume',
    description: 'Download CV',
    accentColor: '#4ade80',
    glowColor: 'rgba(74,222,128,0.08)',
    href: '/resume.pdf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    name: 'LeetCode',
    description: '1700+ Rating',
    accentColor: '#fb923c',
    glowColor: 'rgba(251,146,60,0.08)',
    href: 'https://leetcode.com/u/VijayMakkad/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
  },
  {
    name: 'Message',
    description: 'Send a note',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.08)',
    isMessage: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    ),
  },
];

/* ── Main component ─────────────────────────────────────── */
export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Update the spotlight position via direct DOM writes (no re-render per move)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const el = spotlightRef.current;
    if (!rect || !el) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    });
  };

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full overflow-hidden"
        style={{
          borderTop: '1px solid var(--neutral-border-medium, rgba(255,255,255,0.06))',
          borderBottom: '1px solid var(--neutral-border-medium, rgba(255,255,255,0.06))',
        }}
      >
        {/* ── Layered backgrounds ─────────────────────────── */}

        {/* 1. Line grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, var(--brand-alpha-weak, rgba(6,182,212,0.07)) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-alpha-weak, rgba(6,182,212,0.07)) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        {/* 2. Subtle brand gradient wash at top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--brand-solid, #06b6d4), transparent)' }}
        />

        {/* 3. Soft ambient orb — brand colour, bottom right */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '480px', height: '480px',
            borderRadius: '50%',
            right: '-80px', bottom: '-160px',
            background: 'var(--brand-solid, #06b6d4)',
            opacity: 0.04,
            filter: 'blur(80px)',
          }}
        />

        {/* 4. Cursor-tracking spotlight — follows mouse within section (DOM-driven) */}
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 pointer-events-none will-change-transform"
          style={{
            width: '600px', height: '600px',
            borderRadius: '50%',
            transform: 'translate(-9999px, -9999px)',
            background: 'radial-gradient(circle, var(--brand-alpha-weak, rgba(6,182,212,0.09)) 0%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />

        {/* ── Content ─────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center gap-12 px-4 sm:px-6 py-20">

          {/* Header */}
          <div
            className="text-center"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: 'var(--brand-alpha-weak, rgba(6,182,212,0.08))',
                border: '1px solid var(--brand-alpha-medium, rgba(6,182,212,0.18))',
                color: 'var(--brand-on-background-medium, #22d3ee)',
              }}
            >
              {/* Live dot */}
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--brand-solid, #06b6d4)' }} />
              Connect &amp; Collaborate
            </div>

            <h2
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
              style={{ color: 'var(--neutral-on-background-strong, #f8fafc)' }}
            >
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg max-w-md mx-auto leading-relaxed"
              style={{ color: 'var(--neutral-on-background-weak, #94a3b8)' }}>
              Open to full-time roles, freelance, and interesting collaborations.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl">
            {platforms.map((p, i) => {
              const isHovered = hoveredIdx === i;
              const delay = `${i * 70}ms`;

              const card = (
                <div
                  className="relative overflow-hidden rounded-2xl p-6 cursor-pointer select-none flex flex-col items-center"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, var(--neutral-background-medium, rgba(255,255,255,0.06)), ${p.glowColor})`
                      : 'var(--neutral-background-medium, rgba(255,255,255,0.03))',
                    border: `1px solid ${isHovered ? `${p.accentColor}30` : 'var(--neutral-border-medium, rgba(255,255,255,0.07))'}`,
                    transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isHovered ? `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${p.accentColor}18` : 'none',
                  }}
                >
                  {/* Shimmer sweep on hover */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
                      transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                      transition: 'transform 0.6s ease',
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 mx-auto"
                    style={{
                      background: isHovered ? `${p.accentColor}18` : 'var(--neutral-alpha-weak, rgba(255,255,255,0.04))',
                      color: isHovered ? p.accentColor : 'var(--neutral-on-background-weak, #64748b)',
                      transform: isHovered ? 'rotate(6deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      border: `1px solid ${isHovered ? `${p.accentColor}28` : 'var(--neutral-border-medium, rgba(255,255,255,0.07))'}`,
                    }}
                  >
                    {p.icon}
                  </div>

                  {/* Text */}
                  <p
                    className="font-semibold text-base mb-0.5 text-center transition-colors duration-200"
                    style={{ color: isHovered ? 'var(--neutral-on-background-strong, #f8fafc)' : 'var(--neutral-on-background-strong, #e2e8f0)' }}
                  >
                    {p.name}
                  </p>
                  <p
                    className="text-sm text-center transition-colors duration-200"
                    style={{ color: isHovered ? 'var(--neutral-on-background-weak, #94a3b8)' : 'var(--neutral-on-background-weak, #475569)' }}
                  >
                    {p.description}
                  </p>

                  {/* Arrow */}
                  <div
                    className="flex items-center justify-center gap-1 mt-4 text-sm font-medium transition-all duration-200"
                    style={{ color: isHovered ? p.accentColor : 'var(--neutral-on-background-weak, #334155)' }}
                  >
                    {p.isMessage ? 'Write' : 'Connect'}
                    <svg
                      className="w-3.5 h-3.5"
                      style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.2s ease' }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              );

              const wrapStyle: React.CSSProperties = {
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`,
              };

              if (p.isMessage) {
                return (
                  <div key={p.name} style={wrapStyle} onClick={() => setModalOpen(true)}>
                    {card}
                  </div>
                );
              }
              return (
                <a key={p.name} href={p.href}
                  target={p.name === 'Resume' || p.name === 'LeetCode' ? '_blank' : undefined}
                  rel="noopener noreferrer" style={{ ...wrapStyle, textDecoration: 'none' }}>
                  {card}
                </a>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Contact modal ────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 z-50 w-full sm:w-[480px] rounded-2xl p-6 flex flex-col gap-5"
              style={{
                background: 'var(--page-background, #0a0f14)',
                border: '1px solid var(--neutral-border-medium, rgba(255,255,255,0.08))',
                boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px var(--brand-alpha-weak, rgba(6,182,212,0.1))',
              }}
            >
              {/* Brand accent line at top of modal */}
              <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--brand-solid, #06b6d4), transparent)' }} />

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--neutral-on-background-strong, #f8fafc)' }}>
                    Send a message
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--neutral-on-background-weak, #94a3b8)' }}>
                    Replies go to{' '}
                    <a href={`mailto:${person.email}`} className="underline" style={{ color: 'var(--brand-on-background-medium, #22d3ee)' }}>
                      {person.email}
                    </a>
                  </p>
                </div>
                <button onClick={() => setModalOpen(false)}
                  className="p-2 rounded-xl cursor-pointer transition-colors"
                  style={{ color: 'var(--neutral-on-background-weak, #64748b)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ContactForm
                onSuccess={() => { setModalOpen(false); showToast('success', "Message sent! I'll get back to you soon."); }}
                onError={msg => showToast('error', msg)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast toast={toast} onDismiss={() => setToast(null)} />}
      </AnimatePresence>
    </>
  );
}
