'use client';

import { motion } from 'framer-motion';
import type { About } from '@/types';

type ExperienceTimelineProps = {
  experiences: About['work']['experiences'];
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative pl-6 sm:pl-8">
      <div
        className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--brand-solid)] via-[var(--brand-alpha-medium)] to-transparent"
        aria-hidden
      />
      <ul className="space-y-10">
        {experiences.map(experience => (
          <motion.li
            key={experience.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px 0px -60px 0px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span
              className="absolute -left-6 sm:-left-8 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--brand-border-strong)] bg-[var(--page-background,#0a0f14)]"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-solid)]" />
            </span>
            <div className="rounded-xl border c-border c-surface p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="text-lg font-semibold c-text-strong">
                  {experience.company}
                </h3>
                <time className="text-xs font-mono c-text-brand shrink-0">
                  {experience.timeframe}
                </time>
              </div>
              <p className="text-sm c-text-weak mb-3">{experience.role}</p>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, achIndex) => (
                  <li
                    key={achIndex}
                    className="text-sm c-text-medium leading-relaxed pl-3 border-l c-border"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
