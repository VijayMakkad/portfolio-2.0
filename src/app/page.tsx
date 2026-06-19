"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  GitFork,
  Mail,
  Clipboard,
  Search,
  Cpu,
  Database,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { projects } from "./projects/data";
import { BlurStagger, WordCycle } from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import MagnetButton from "@/components/ui/MagnetButton";
import ClientFeedback from "@/components/ui/testimonial";

const featuredProjects = projects.filter((p) => p.featured);
const deepResearcher = projects.find((p) => p.name.includes("Deep Researcher"));

const PortfolioCard = () => {
  const { toast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vijaymakkad0104@gmail.com").then(() => {
      toast({
        title: "Email copied!",
        description: "The email has been copied to your clipboard.",
      });
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 space-y-24">
      {/* ═══ Hero Section ═══ */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
              Available for work
            </span>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          <BlurStagger
            text="I'm Vijay Makkad"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)]"
          />

          <ScrollReveal delay={0.3}>
            <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl">
              A Student and{" "}
              <WordCycle
                words={["Full-Stack", "ML Engineer", "Backend", "AI/ML"]}
              />{" "}
              Developer at SRMIST, Chennai.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.5}>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/contact">
              <MagnetButton variant="primary">
                <Mail className="w-4 h-4" />
                Contact Me
              </MagnetButton>
            </Link>
            <MagnetButton variant="ghost" onClick={handleCopyEmail}>
              <Clipboard className="w-4 h-4" />
              Copy Email
            </MagnetButton>
          </div>
        </ScrollReveal>

        {/* Profile Video */}
        <ScrollReveal delay={0.6}>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-[var(--brand-strong)] ring-offset-2 ring-offset-[hsl(var(--background))]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              >
                <source src="/profile.mp4" type="video/mp4" />
              </video>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Currently learning ML & Webdev
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                CGPA 9.71 • B.Tech CSE
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ Deep Researcher Marquee Card ═══ */}
      {deepResearcher && (
        <ScrollReveal>
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
                ★ Featured Project
              </span>
            </div>

            <a
              href={deepResearcher.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard className="p-6 sm:p-8 group">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[var(--brand-strong)] flex items-center justify-center">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                          {deepResearcher.name}
                        </h3>
                        {deepResearcher.stars && (
                          <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            {deepResearcher.stars} stars
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {deepResearcher.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {deepResearcher.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--surface-elevated)] text-[var(--brand-strong)] border border-[var(--border-subtle)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1 text-sm text-[var(--brand-strong)] group-hover:gap-2 transition-all">
                        View on GitHub
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Right: Pipeline Visualization */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                      {[
                        { icon: Search, label: "Query", delay: 0 },
                        { icon: Database, label: "FAISS Store", delay: 0.1 },
                        { icon: Cpu, label: "LLM Synthesis", delay: 0.2 },
                        { icon: Layers, label: "RAG Pipeline", delay: 0.3 },
                      ].map(({ icon: Icon, label, delay }) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)]"
                        >
                          <Icon className="w-6 h-6 text-[var(--brand-strong)]" />
                          <span className="text-xs font-mono text-[var(--text-secondary)]">
                            {label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </a>
          </section>
        </ScrollReveal>
      )}

      {/* ═══ Featured Projects Grid ═══ */}
      <section>
        <ScrollReveal>
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
              • Projects
            </span>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm text-[var(--brand-strong)] hover:gap-2 transition-all cursor-pointer"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassCard className="p-5 h-full group">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${project.color} flex items-center justify-center text-white`}
                      >
                        <project.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--text-primary)] truncate">
                          {project.name}
                        </h3>
                        {project.stars && (
                          <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            {project.stars}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--brand-strong)] group-hover:gap-2 transition-all">
                        View Project
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ Testimonials ═══ */}
      <section>
        <ScrollReveal>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)] mb-6 block">
            • Testimonials
          </span>
        </ScrollReveal>

        <ClientFeedback />
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioCard;
