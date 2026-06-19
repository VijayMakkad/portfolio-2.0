"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Star, Circle } from "lucide-react";
import { Footer } from "@/components/Footer";
import { BlurStagger } from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { TimelineContent } from "@/components/ui/timeline-animation";

interface Experience {
  date: string;
  title: string;
  company: string;
  description: string;
  type: "star" | "circle";
  color: string;
}

const experiences: Experience[] = [
  {
    date: "Aug 2025 – Present",
    title: "Software Engineer",
    company: "Cloudera",
    description:
      "Building and operating large-scale data platform services. Working across reliability and observability with Prometheus, Grafana, OpenTelemetry, and Docker to keep distributed systems healthy and performant.",
    type: "star",
    color: "bg-red-600",
  },
  {
    date: "Oct 2023 – Aug 2025",
    title: "Associate Technical Lead",
    company: "Founders Club, SRMIST",
    description:
      "Led a team of 3 developers to build multiple full-stack projects for the college. Coordinated design reviews, sprint planning, and deployments.",
    type: "star",
    color: "bg-violet-600",
  },
  {
    date: "Oct 2024 – Mar 2025",
    title: "Backend Developer Intern",
    company: "Fuelemy",
    description:
      "Developed scalable RESTful APIs with Hono/TypeScript, PostgreSQL, and Drizzle ORM. Reduced API response time by 60%. Deployed with Docker/Bun achieving 99.5% uptime.",
    type: "star",
    color: "bg-blue-600",
  },
  {
    date: "Jul 2024 – Jan 2025",
    title: "Project Intern",
    company: "Samsung Prism",
    description:
      "Developed CNN-based action recognition model using MovieNet architecture. Achieved 97% training accuracy. Co-authored research paper submitted to ICACECS 2025.",
    type: "star",
    color: "bg-emerald-600",
  },
  {
    date: "Jul 2024 – Oct 2024",
    title: "Web Developer Intern",
    company: "EasyGold Ltd.",
    description:
      "Developed Cart and Accounts pages using React and Java SpringBoot. Integrated payment workflows and responsive UI components.",
    type: "circle",
    color: "bg-amber-600",
  },
  {
    date: "Jun 2024 – Jul 2024",
    title: "Summer Intern",
    company: "Jindal Steel and Power",
    description:
      "Built Night Vigilance Portal with React frontend and Java SpringBoot backend. Enabled real-time monitoring and surveillance reporting.",
    type: "circle",
    color: "bg-red-600",
  },
];

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // SVG line grows as you scroll
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      {/* Header */}
      <div className="mb-16 space-y-4">
        <ScrollReveal>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
            • Work Experience
          </span>
        </ScrollReveal>
        <BlurStagger
          text="My Journey"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]"
        />
        <ScrollReveal delay={0.2}>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl">
            From college projects to industry internships — building real-world
            impact through code and innovation.
          </p>
        </ScrollReveal>
      </div>

      {/* Timeline */}
      <div ref={containerRef} className="relative">
        {/* Animated vertical line */}
        <svg
          className="absolute left-6 md:left-8 top-0 bottom-0 w-1 h-full"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
        >
          {/* Background line */}
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="var(--border-subtle)"
            strokeWidth="2"
          />
          {/* Animated fill line */}
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="var(--brand-strong)"
            strokeWidth="2"
            style={{ pathLength }}
          />
        </svg>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <TimelineContent key={i} animationNum={i}>
              <div className="relative pl-16 md:pl-20">
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-3.5 md:left-5.5 top-2 w-5 h-5 rounded-full ${exp.color} flex items-center justify-center ring-4 ring-[hsl(var(--background))]`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: i * 0.1,
                  }}
                >
                  {exp.type === "star" ? (
                    <Star className="w-2.5 h-2.5 text-white fill-current" />
                  ) : (
                    <Circle className="w-2 h-2 text-white fill-current" />
                  )}
                </motion.div>

                {/* Card */}
                <GlassCard className="p-5 sm:p-6" tilt3D={false}>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">
                        {exp.title}
                      </h3>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        {exp.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[var(--brand-strong)]" />
                      <span className="text-sm font-medium text-[var(--brand-strong)]">
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </GlassCard>
              </div>
            </TimelineContent>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
