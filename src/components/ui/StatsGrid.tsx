'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { label: 'LeetCode rating', value: 1700, suffix: '+', decimals: 0 },
  { label: 'Projects shipped', value: 8, suffix: '', decimals: 0 },
  { label: 'Years building', value: 3, suffix: '+', decimals: 0 },
];

function AnimatedNumber({
  value,
  suffix,
  decimals,
  active,
}: {
  value: number;
  suffix: string;
  decimals: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = value * eased;
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [active, value]);

  return (
    <span className="text-2xl sm:text-3xl font-bold tabular-nums c-text-brand">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg mx-auto"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="rounded-xl border c-border c-surface p-4 text-center"
        >
          <AnimatedNumber
            value={stat.value}
            suffix={stat.suffix}
            decimals={stat.decimals}
            active={isInView}
          />
          <p className="mt-1 text-xs font-mono uppercase tracking-wider c-text-weak">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
