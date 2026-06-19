"use client";

import React, { useState } from "react";
import {
  Instagram,
  Linkedin,
  Github,
  FileText,
  Clipboard,
  Check,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import MagnetButton from "@/components/ui/MagnetButton";
import ScrollReveal from "@/components/ui/ScrollReveal";

const socials = [
  {
    Icon: FileText,
    href: "https://drive.google.com/file/d/1jTMISVMdCXfVyqlHvXzn4DLXugNL3NVD/view?usp=sharing",
    label: "Resume",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/user._.doesnotexisttt/",
    label: "Instagram",
  },
  {
    Icon: Github,
    href: "https://github.com/VijayMakkad",
    label: "GitHub",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/vijay-makkad-1573681b3/",
    label: "LinkedIn",
  },
];

export const Footer = () => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("vijaymakkad0104@gmail.com").then(() => {
      toast({
        title: "Email Copied!",
        description: "The email has been copied to your clipboard.",
        duration: 3000,
      });
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    });
  };

  return (
    <ScrollReveal>
      <footer className="space-y-6 mt-12 pt-12 border-t border-[var(--border-subtle)]">
        {/* CTA Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Let&apos;s work{" "}
            <span className="text-[var(--brand-strong)]">together.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-md mx-auto">
            Integrating Web Development and Machine Learning Solutions.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Link href="/contact">
              <MagnetButton variant="primary">
                <Mail className="w-4 h-4" />
                Contact Me
              </MagnetButton>
            </Link>
            <MagnetButton variant="ghost" onClick={handleCopy}>
              {isCopied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Clipboard className="w-4 h-4" />
              )}
              {isCopied ? "Copied!" : "Copy Email"}
            </MagnetButton>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-2xl glass-panel">
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
            Follow Me
          </span>
          <div className="flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--brand-weak)] text-[var(--text-secondary)] hover:text-[var(--brand-strong)] transition-colors cursor-pointer group"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-4">
          <p className="text-xs text-[var(--text-secondary)] font-mono">
            © {new Date().getFullYear()} —{" "}
            <a
              href="mailto:vijaymakkad0104@gmail.com"
              className="hover:text-[var(--brand-strong)] transition-colors"
            >
              Vijay Makkad
            </a>
          </p>
        </div>
      </footer>
    </ScrollReveal>
  );
};