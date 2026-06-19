"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt3D?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  tilt3D = true,
  glowOnHover = true,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt3D || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    cardRef.current.style.setProperty("--rx", `${rotateX}deg`);
    cardRef.current.style.setProperty("--ry", `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--rx", "0deg");
      cardRef.current.style.setProperty("--ry", "0deg");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass-panel rounded-2xl overflow-hidden will-change-transform cursor-pointer ${
        isHovered && glowOnHover ? "neon-glow-strong" : ""
      } ${className}`}
      style={{
        transform: tilt3D
          ? "perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))"
          : undefined,
        transition: "transform 0.15s ease-out",
      }}
    >
      {children}
    </motion.div>
  );
}
