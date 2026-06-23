'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import Link from 'next/link';
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from 'react';
import { FaAws, FaDatabase, FaJava } from 'react-icons/fa';
import { HiOutlineCodeBracket } from 'react-icons/hi2';
import {
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGithub,
  SiHuggingface,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from 'react-icons/si';
import { skillCategories, skills } from '@/resources/skills';
import type { Skill, SkillCategory } from '@/types';

type FilterId = 'all' | SkillCategory;

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Python: SiPython,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Java: FaJava,
  'C++': SiCplusplus,
  SQL: FaDatabase,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  'Tailwind CSS': SiTailwindcss,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  LangChain: SiLangchain,
  FastAPI: SiFastapi,
  OpenCV: SiOpencv,
  HuggingFace: SiHuggingface,
  Docker: SiDocker,
  GitHub: SiGithub,
  AWS: FaAws,
  Supabase: SiSupabase,
  'Socket.io': SiSocketdotio,
};

const tabs: Array<{ id: FilterId; label: string; command: string }> = [
  { id: 'all', label: 'All', command: 'skills --list' },
  ...skillCategories.map(category => ({
    id: category.id,
    label: category.label,
    command: category.command,
  })),
];

function getSkillIcon(iconKey: string) {
  return iconMap[iconKey] ?? HiOutlineCodeBracket;
}

function DotMeter({ proficiency }: { proficiency: Skill['proficiency'] }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Proficiency ${proficiency} of 5`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`h-1.5 w-1.5 rounded-full ${
            index < proficiency
              ? 'bg-[var(--brand-solid)]'
              : 'bg-[var(--neutral-alpha-medium)]'
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function SkillCard({
  skill,
  index,
  reducedMotion,
}: {
  skill: Skill;
  index: number;
  reducedMotion: boolean | null;
}) {
  const Icon = getSkillIcon(skill.icon);

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.35,
        delay: reducedMotion ? 0 : index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -6,
              scale: 1.025,
              transition: { type: 'spring', stiffness: 320, damping: 18 },
            }
      }
      className="group relative flex flex-col rounded-xl border c-border c-surface p-4 transition-[border-color,box-shadow] duration-200 hover:z-10 hover:border-[var(--brand-border-medium)] hover:shadow-[0_14px_40px_-12px_var(--brand-glow)] focus-within:border-[var(--brand-border-medium)] [overflow-anchor:none]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border c-border bg-[var(--neutral-alpha-weak)] transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:border-[var(--brand-border-medium)]"
            aria-hidden
          >
            <Icon className="h-4 w-4 c-text-brand" aria-hidden />
          </span>
          <h3 className="text-sm font-semibold c-text-strong truncate transition-colors group-hover:c-text-brand">
            {skill.name}
          </h3>
        </div>
        <DotMeter proficiency={skill.proficiency} />
      </div>

      {/* Reveal: always open on mobile, expands on hover/focus on >=sm.
          Animating grid-template-rows (0fr -> 1fr) grows the card downward
          without a magic max-height and without a layout-spring feedback loop. */}
      <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] sm:group-focus-within:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="opacity-100 transition-opacity duration-200 sm:opacity-0 sm:-translate-y-1 sm:transition-[opacity,transform] sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-focus-within:opacity-100 sm:group-focus-within:translate-y-0 motion-reduce:transition-none">
            <p className="pt-3 text-xs c-text-weak leading-relaxed">
              {skill.note}
            </p>
            {skill.relatedProjectSlug && (
              <Link
                href={`/work/${skill.relatedProjectSlug}`}
                aria-label={`View the ${skill.name} project`}
                className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-medium c-text-medium transition-colors group-hover:c-text-brand focus-visible:c-text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-background)] rounded-sm"
              >
                View project
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function SkillsShowcase() {
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeCommand = useMemo(
    () => tabs.find(tab => tab.id === activeFilter)?.command ?? 'skills --list',
    [activeFilter],
  );

  const filteredSkills = useMemo(
    () =>
      activeFilter === 'all'
        ? skills
        : skills.filter(skill => skill.category === activeFilter),
    [activeFilter],
  );

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex = index;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIndex = (index + 1) % tabs.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIndex = (index - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      tabRefs.current[nextIndex]?.focus();
      setActiveFilter(tabs[nextIndex].id);
    },
    [],
  );

  return (
    <motion.section
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px -60px 0px' }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Technical skills showcase"
    >
      {/* Terminal header */}
      <div
        className="mb-4 rounded-xl border c-border c-surface overflow-hidden"
        aria-hidden
      >
        <div className="flex items-center gap-2 border-b c-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs c-text-weak font-mono">skills.sh</span>
        </div>
        <div className="px-4 py-3 font-mono text-sm">
          <span className="c-text-brand">$</span>{' '}
          <span className="c-text-medium">{activeCommand}</span>
          <span className="inline-block w-2 h-4 ml-0.5 bg-[var(--brand-solid)] animate-pulse align-middle" />
        </div>
      </div>

      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter skills by category"
        className="mb-5 flex flex-wrap gap-2"
      >
        {tabs.map((tab, index) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              ref={element => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`skill-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls="skill-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveFilter(tab.id)}
              onKeyDown={event => handleTabKeyDown(event, index)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-background)] ${
                isActive
                  ? 'border-[var(--brand-border-medium)] bg-[var(--brand-alpha-weak)] c-text-brand'
                  : 'c-border c-surface c-text-medium hover:border-[var(--brand-border-medium)] hover:c-text-strong'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Skills grid. mode="popLayout" pops the exiting grid out of flow so the
          incoming grid defines the panel height immediately — this avoids the
          collapse-to-zero "jump up then down" when switching tabs. */}
      <div
        id="skill-panel"
        role="tabpanel"
        aria-labelledby={`skill-tab-${activeFilter}`}
        className="relative [overflow-anchor:none]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activeFilter}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start"
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredSkills.length === 0 && (
          <p className="text-sm c-text-weak py-8 text-center font-mono">
            No skills found for this category.
          </p>
        )}
      </div>
    </motion.section>
  );
}
