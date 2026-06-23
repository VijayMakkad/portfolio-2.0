'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { ShowcaseProject } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
  title?: string;
  className?: string;
}

export function ProjectShowcase({
  projects,
  title = 'Selected Work',
  className,
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  const animate = useCallback(() => {
    currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.12);
    currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.12);

    if (previewRef.current) {
      previewRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left + 24,
      y: e.clientY - rect.top - 80,
    };
  };

  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn('relative w-full max-w-3xl mx-auto px-4 py-16', className)}
    >
      <h2 className="text-sm font-mono uppercase tracking-widest c-text-weak mb-8">
        {title}
      </h2>

      <ul className="flex flex-col">
        {projects.map((project, index) => (
          <li key={project.title}>
            <Link
              href={project.link}
              className="group flex items-baseline justify-between border-t c-border py-6 transition-colors hover:border-[var(--brand-border-medium)]"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex flex-col gap-1">
                <span className="text-xl sm:text-2xl font-medium c-text-strong group-hover:text-[var(--brand-on-background-medium)] transition-colors">
                  {project.title}
                </span>
                <span className="text-sm c-text-weak max-w-md">
                  {project.description}
                </span>
              </div>
              <span className="text-sm font-mono c-text-weak group-hover:text-[var(--brand-on-background-medium)] transition-colors shrink-0 ml-4">
                {project.year}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={previewRef}
        className={cn(
          'pointer-events-none absolute top-0 left-0 z-20 w-64 h-40 rounded-lg overflow-hidden border c-border shadow-2xl transition-opacity duration-300',
          activeProject ? 'opacity-100' : 'opacity-0'
        )}
        style={{ willChange: 'transform' }}
      >
        {activeProject && (
          <div
            className="w-full h-full bg-gradient-to-br from-[var(--brand-alpha-strong)] to-[var(--brand-alpha-weak)] flex items-center justify-center"
            style={{
              backgroundImage: activeProject.image
                ? `url(${activeProject.image})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!activeProject.image && (
              <span className="text-xs text-white/80 px-4 text-center">
                {activeProject.title}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
