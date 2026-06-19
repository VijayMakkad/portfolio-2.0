"use client";

import React from "react";
import {
  Copy,
  Mail,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Monitor,
  Fuel,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import profilePic from "../../placeholder/IMG_7613.jpg";
import { useToast } from "../../hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlurStagger } from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import MagnetButton from "@/components/ui/MagnetButton";

const skills = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "JavaScript",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "Java",
  "C++",
  "SQL",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Python",
  "TensorFlow",
  "PyTorch",
  "Flask",
  "Docker",
  "Prometheus",
  "Grafana",
  "OpenTelemetry",
  "GenAI",
];

const sideProjects = [
  {
    name: "Chatty AI",
    icon: Bot,
    color: "bg-violet-600",
    link: "https://chattyai-a35j9lzr7tecrqg9tcu.streamlit.app/",
  },
  {
    name: "Fuelemy",
    icon: Fuel,
    color: "bg-blue-500",
    link: "https://fuelemy-frontend.vercel.app/",
  },
  {
    name: "Blog Website",
    icon: Monitor,
    color: "bg-orange-500",
    link: "https://sample-blog-vijaymakkad.vercel.app/",
  },
];

export default function AboutPage() {
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <ScrollReveal>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
            • About
          </span>
        </ScrollReveal>
        <BlurStagger
          text="It's Me Vijay"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]"
        />
      </div>

      {/* Intro + Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <ScrollReveal className="lg:col-span-3 space-y-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            I&apos;m Vijay Makkad, a dedicated Computer Science undergraduate
            with a passion for software development and innovation. Currently
            pursuing my studies at SRM Institute of Science and Technology, I
            aspire to excel in Full-Stack Development, AI, and Machine Learning.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            With experience in web development, machine learning, and leading
            technical projects, I thrive on bridging creativity and technology to
            solve complex challenges. My goal is to create impactful solutions
            that seamlessly integrate functionality and user experience.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/contact">
              <MagnetButton variant="primary">
                <Mail className="w-4 h-4" />
                Contact Me
              </MagnetButton>
            </Link>
            <MagnetButton variant="ghost" onClick={handleCopyEmail}>
              <Copy className="w-4 h-4" />
              Copy Email
            </MagnetButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="lg:col-span-2">
          <GlassCard className="overflow-hidden" tilt3D glowOnHover={false}>
            <Image
              src={profilePic}
              alt="Vijay Makkad"
              width={500}
              height={600}
              className="w-full aspect-[4/5] object-cover"
              priority
            />
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* Side Projects */}
      <section>
        <ScrollReveal>
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
              • Side Projects
            </span>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm text-[var(--brand-strong)] hover:gap-2 transition-all cursor-pointer"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {sideProjects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassCard className="p-4 group" tilt3D={false}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${project.color} flex items-center justify-center text-white`}
                      >
                        <project.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-[var(--text-primary)]">
                        {project.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--brand-strong)] transition-colors" />
                  </div>
                </GlassCard>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <ScrollReveal>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)] mb-6 block">
            • Skills
          </span>
        </ScrollReveal>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill} delay={i * 0.03}>
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-sm font-mono cursor-pointer glass-panel text-[var(--text-secondary)] hover:text-[var(--brand-strong)] hover:border-[var(--brand-strong)] transition-colors"
              >
                {skill}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
