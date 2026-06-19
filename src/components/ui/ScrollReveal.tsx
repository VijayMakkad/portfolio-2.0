"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const directionMap = {
  up: { y: 40, x: 0 },
  left: { y: 0, x: -40 },
  right: { y: 0, x: 40 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y, filter: "blur(4px)" }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 0, x, y, filter: "blur(4px)" }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
