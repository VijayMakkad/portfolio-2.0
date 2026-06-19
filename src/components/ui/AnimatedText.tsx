"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Mode 1: Blur Stagger ─── */

interface BlurStaggerProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function BlurStagger({
  text,
  className = "",
  delay = 0,
  as: Tag = "h1",
}: BlurStaggerProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.04,
              delayChildren: delay,
            },
          },
        }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: {
                opacity: 0,
                filter: "blur(12px)",
                y: 8,
              },
              visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="inline-block mr-[0.3em] will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─── Mode 2: Word Cycle ─── */

interface WordCycleProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function WordCycle({
  words,
  className = "",
  interval = 2500,
}: WordCycleProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block text-[var(--brand-strong)]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
