"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Layer 1: Dot grid */}
      <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-20" />

      {/* Layer 2: Animated SVG paths */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 dark:opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M ${-100 + i * 200},${300 + i * 80} Q ${400 + i * 100},${
              100 + i * 50
            } ${900 + i * 150},${400 + i * 60}`}
            fill="none"
            stroke="var(--brand-strong)"
            strokeWidth="1"
            strokeOpacity={0.3 - i * 0.04}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2,
            }}
          />
        ))}
      </svg>

      {/* Layer 3: Ambient glow orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--brand-glow-strong), transparent 70%)",
          top: "10%",
          left: "60%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--brand-glow), transparent 70%)",
          bottom: "10%",
          left: "10%",
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
