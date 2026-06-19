"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface TimelineContentProps {
  children: React.ReactNode;
  /** Index used for staggered reveals via the custom variant. */
  animationNum?: number;
  className?: string;
  /** Override the default reveal animation. */
  customVariants?: Variants;
  /** Replay every time the element scrolls into view. */
  once?: boolean;
}

/**
 * Scroll-reveal wrapper used by the testimonial grid and the experience
 * timeline. Reveals its children with a blur + rise as they enter the
 * viewport, staggered by `animationNum`.
 */
const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function TimelineContent({
  children,
  animationNum = 0,
  className,
  customVariants,
  once = true,
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants ?? defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default TimelineContent;
