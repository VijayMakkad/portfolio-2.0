"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import { TimelineContent } from "./timeline-animation";

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating?: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Suraj Das",
    role: "Project Head, Jindal Steel and Power",
    text: "Vijay's full-stack expertise delivered a seamless solution that revolutionized our night surveillance with real-time monitoring and efficiency.",
    rating: 5,
  },
  {
    name: "Shreyans Bhargava",
    role: "COO at Fuelemy",
    text: "Working with Vijay was a pleasure. His technical skills are exceptional, and he consistently goes above and beyond to ensure project success.",
    rating: 5,
  },
  {
    name: "Chandan Singh",
    role: "Technical Head, EasyGold",
    text: "Vijay's expertise in front-end and back-end development made him an invaluable asset to the organization.",
    rating: 5,
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface ClientFeedbackProps {
  testimonials?: Testimonial[];
  className?: string;
}

export default function ClientFeedback({
  testimonials = defaultTestimonials,
  className = "",
}: ClientFeedbackProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}
    >
      {testimonials.map((item, i) => (
        <TimelineContent key={item.name} animationNum={i} className="h-full">
          <figure className="glass-panel group relative flex h-full flex-col gap-4 rounded-2xl p-6 transition-shadow duration-300 hover:neon-glow">
            <Quote className="h-8 w-8 text-[var(--brand-strong)] opacity-30 transition-opacity duration-300 group-hover:opacity-60" />

            {item.rating ? (
              <div className="flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-3.5 w-3.5 fill-[var(--brand-strong)] text-[var(--brand-strong)]"
                  />
                ))}
              </div>
            ) : null}

            <blockquote className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              &ldquo;{item.text}&rdquo;
            </blockquote>

            <figcaption className="flex items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-strong)] text-xs font-semibold text-white">
                {initials(item.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                  {item.name}
                </p>
                <p className="truncate text-xs text-[var(--text-secondary)]">
                  {item.role}
                </p>
              </div>
            </figcaption>
          </figure>
        </TimelineContent>
      ))}
    </div>
  );
}
