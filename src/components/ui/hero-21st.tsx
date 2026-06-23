'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlurInHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function BlurInHeadline({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h1',
}: BlurInHeadlineProps) {
  const words = text.split(' ');

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
        className="inline-flex flex-wrap justify-center"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: {
                opacity: 0,
                filter: 'blur(12px)',
                y: 8,
              },
              visible: {
                opacity: 1,
                filter: 'blur(0px)',
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

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]',
        'bg-gradient-to-r from-[var(--color-1)] via-[var(--color-2)] to-[var(--color-3)]',
        className
      )}
    >
      {children}
    </span>
  );
}

interface SublineWithGradientProps {
  text: string;
  roleWords: string[];
  className?: string;
}

export function SublineWithGradient({
  text,
  roleWords,
  className,
}: SublineWithGradientProps) {
  const pattern = new RegExp(`(${roleWords.join('|')})`, 'g');
  const parts = text.split(pattern);

  return (
    <p className={cn('text-center text-lg sm:text-xl c-text-weak', className)}>
      {parts.map((part, i) =>
        roleWords.includes(part) ? (
          <GradientText key={i}>{part}</GradientText>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}
