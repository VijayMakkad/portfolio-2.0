"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, RotateCcw, Check } from "lucide-react";

interface BrandPreset {
  id: string;
  name: string;
  strong: string;
  medium: string;
  weak: string;
  glow: string;
  glowStrong: string;
}

const presets: BrandPreset[] = [
  {
    id: "crimson",
    name: "Crimson",
    strong: "#ef4444",
    medium: "#f87171",
    weak: "#7f1d1d",
    glow: "rgba(239, 68, 68, 0.3)",
    glowStrong: "rgba(239, 68, 68, 0.5)",
  },
  {
    id: "emerald",
    name: "Emerald",
    strong: "#10b981",
    medium: "#34d399",
    weak: "#064e3b",
    glow: "rgba(16, 185, 129, 0.3)",
    glowStrong: "rgba(16, 185, 129, 0.5)",
  },
  {
    id: "violet",
    name: "Violet",
    strong: "#8b5cf6",
    medium: "#a78bfa",
    weak: "#4c1d95",
    glow: "rgba(139, 92, 246, 0.3)",
    glowStrong: "rgba(139, 92, 246, 0.5)",
  },
  {
    id: "blue",
    name: "Blue",
    strong: "#3b82f6",
    medium: "#60a5fa",
    weak: "#1e3a8a",
    glow: "rgba(59, 130, 246, 0.3)",
    glowStrong: "rgba(59, 130, 246, 0.5)",
  },
  {
    id: "amber",
    name: "Amber",
    strong: "#f59e0b",
    medium: "#fbbf24",
    weak: "#78350f",
    glow: "rgba(245, 158, 11, 0.3)",
    glowStrong: "rgba(245, 158, 11, 0.5)",
  },
  {
    id: "cyan",
    name: "Cyan",
    strong: "#06b6d4",
    medium: "#22d3ee",
    weak: "#164e63",
    glow: "rgba(6, 182, 212, 0.3)",
    glowStrong: "rgba(6, 182, 212, 0.5)",
  },
  {
    id: "rose",
    name: "Rose",
    strong: "#f43f5e",
    medium: "#fb7185",
    weak: "#881337",
    glow: "rgba(244, 63, 94, 0.3)",
    glowStrong: "rgba(244, 63, 94, 0.5)",
  },
  {
    id: "lime",
    name: "Lime",
    strong: "#84cc16",
    medium: "#a3e635",
    weak: "#365314",
    glow: "rgba(132, 204, 22, 0.3)",
    glowStrong: "rgba(132, 204, 22, 0.5)",
  },
];

const STORAGE_KEY = "vm-brand-preset";
const BRAND_VARS = [
  "--brand-strong",
  "--brand-medium",
  "--brand-weak",
  "--brand-glow",
  "--brand-glow-strong",
];

function applyPreset(p: BrandPreset) {
  const root = document.documentElement;
  root.style.setProperty("--brand-strong", p.strong);
  root.style.setProperty("--brand-medium", p.medium);
  root.style.setProperty("--brand-weak", p.weak);
  root.style.setProperty("--brand-glow", p.glow);
  root.style.setProperty("--brand-glow-strong", p.glowStrong);
}

function clearPreset() {
  const root = document.documentElement;
  BRAND_VARS.forEach((v) => root.style.removeProperty(v));
}

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const preset = presets.find((p) => p.id === saved);
      if (preset) {
        applyPreset(preset);
        setActiveId(preset.id);
      }
    }
  }, []);

  const handleSelect = (preset: BrandPreset) => {
    applyPreset(preset);
    localStorage.setItem(STORAGE_KEY, preset.id);
    setActiveId(preset.id);
  };

  const handleReset = () => {
    clearPreset();
    localStorage.removeItem(STORAGE_KEY);
    setActiveId(null);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="p-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--brand-strong)] transition-colors duration-200 cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 45 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Customize theme"
      >
        <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-label="Theme customizer"
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="fixed top-20 right-4 z-50 w-72 rounded-2xl glass-panel p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Have Fun!!
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] font-mono">
                    Customize the brand color
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
                  aria-label="Close customizer"
                >
                  <X className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-3">
                  Brand
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {presets.map((preset) => (
                    <motion.button
                      key={preset.id}
                      onClick={() => handleSelect(preset)}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.92 }}
                      className="relative flex aspect-square items-center justify-center rounded-xl ring-2 ring-transparent transition-all"
                      style={{
                        background: preset.strong,
                        boxShadow:
                          activeId === preset.id
                            ? `0 0 0 2px var(--surface-card), 0 0 0 4px ${preset.strong}`
                            : undefined,
                      }}
                      aria-label={`Set brand color to ${preset.name}`}
                      title={preset.name}
                    >
                      {activeId === preset.id && (
                        <Check className="h-4 w-4 text-white" strokeWidth={3} />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] py-2 text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--brand-strong)] hover:text-[var(--brand-strong)] transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset to default
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
