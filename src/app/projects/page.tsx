"use client";

import React from "react";
import { ArrowUpRight, Star, GitFork } from "lucide-react";
import { projects } from "./data";
import { Footer } from "@/components/Footer";
import { BlurStagger } from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <ScrollReveal>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
            • Projects
          </span>
        </ScrollReveal>
        <BlurStagger
          text="My Works"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]"
        />
        <ScrollReveal delay={0.2}>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl">
            Explore my portfolio — from AI-powered research tools to real-time
            communication platforms. Each project reflects precision engineering
            and creative problem-solving.
          </p>
        </ScrollReveal>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ScrollReveal
            key={project.id}
            delay={i * 0.08}
            className={
              // Make first project span 2 columns on large screens
              i === 0 ? "md:col-span-2 lg:col-span-2" : ""
            }
          >
            <a
              href={project.githubRepo || project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <GlassCard className="p-5 sm:p-6 h-full group">
                <div className="relative space-y-4 h-full flex flex-col">
                  {/* Hover sheen */}
                  <div
                    className="pointer-events-none absolute -inset-5 sm:-inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(160px circle at top right, var(--brand-glow), transparent 70%)",
                    }}
                  />
                  {/* Header */}
                  <div className="relative flex items-start gap-3">
                    <div
                      className={`w-11 h-11 shrink-0 rounded-xl ${project.color} flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                    >
                      <project.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[var(--text-primary)] truncate">
                          {project.name}
                        </h3>
                        {project.featured && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[var(--brand-weak)] text-[var(--brand-strong)] uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        {project.stars !== undefined && project.stars > 0 && (
                          <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            {project.stars}
                          </span>
                        )}
                        {project.forks !== undefined && project.forks > 0 && (
                          <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                            <GitFork className="w-3 h-3" />
                            {project.forks}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="relative text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tags & Link */}
                  <div className="relative space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {project.liveLink && (
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--brand-strong)] group-hover:gap-2 transition-all">
                          View Project
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </a>
          </ScrollReveal>
        ))}
      </div>

      <Footer />
    </div>
  );
}
