"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

interface MagnetButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  disabled?: boolean;
}

export default function MagnetButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
  disabled = false,
}: MagnetButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    buttonRef.current.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translate(0px, 0px)";
    }
  };

  const variants = {
    primary:
      "bg-[var(--brand-strong)] text-white hover:bg-[var(--brand-medium)] shadow-neon",
    ghost:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--brand-strong)] hover:text-[var(--brand-strong)]",
    outline:
      "bg-transparent text-[var(--brand-strong)] border-2 border-[var(--brand-strong)] hover:bg-[var(--brand-strong)] hover:text-white",
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm tracking-wide cursor-pointer transition-all duration-200 ${
        variants[variant]
      } ${disabled ? "opacity-40 pointer-events-none" : ""} ${className}`}
      style={{ transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s, border-color 0.2s, color 0.2s" }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
