'use client';

import type { TestimonialItem } from '@/types';
import { cn } from '@/lib/utils';

interface TestimonialMarqueeProps {
  items: TestimonialItem[];
  className?: string;
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const initials = item.name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <figure className="flex flex-col gap-4 rounded-xl border c-border c-surface p-6 mb-4 break-inside-avoid">
      <blockquote className="text-sm leading-relaxed c-text-medium">
        &ldquo;{item.text}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-alpha-weak)] text-xs font-semibold c-text-brand">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium c-text-strong">{item.name}</p>
          <p className="text-xs c-text-weak">{item.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function MarqueeColumn({
  items,
  reverse = false,
}: {
  items: TestimonialItem[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative h-[480px] overflow-hidden mask-marquee">
      <div
        className={cn(
          'flex flex-col animate-marquee-vertical',
          reverse && 'animate-marquee-vertical-reverse'
        )}
        style={{ animationDuration: `${items.length * 8}s` }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialMarquee({
  items,
  className,
}: TestimonialMarqueeProps) {
  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  return (
    <section className={cn('w-full max-w-6xl mx-auto px-4 py-16', className)}>
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold c-text-strong mb-2">
          Testimonials
        </h2>
        <p className="text-sm c-text-weak">
          Feedback from mentors and collaborators
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MarqueeColumn items={col1.length ? col1 : items} />
        <MarqueeColumn items={col2.length ? col2 : items} reverse />
        <MarqueeColumn items={col3.length ? col3 : items} />
      </div>
    </section>
  );
}
