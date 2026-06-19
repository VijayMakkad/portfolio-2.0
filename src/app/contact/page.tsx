"use client";

import { useEffect, useState, FormEvent } from "react";
import { useTheme } from "next-themes";
import emailjs from "@emailjs/browser";
import { Footer } from "@/components/Footer";
import { useToast } from "../../hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { BlurStagger } from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import MagnetButton from "@/components/ui/MagnetButton";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    emailjs.init("u9xBEFql84WizMKro");
  }, []);

  if (!mounted) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send("service_scttsvv", "template_qow6c28", {
        from_name: name,
        from_email: email,
        message: message,
      });

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        duration: 5000,
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <ScrollReveal>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--text-secondary)]">
              • Hire Me
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-green-500/10 text-green-500 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              AVAILABLE FOR WORK
            </span>
          </div>
        </ScrollReveal>

        <BlurStagger
          text="Let's Collaborate!"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]"
        />

        <ScrollReveal delay={0.2}>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl">
            Have a project or idea? Let&apos;s create something extraordinary
            together. Reach out now!
          </p>
        </ScrollReveal>
      </div>

      {/* Contact Form */}
      <ScrollReveal delay={0.3}>
        <GlassCard className="p-6 sm:p-8" tilt3D={false} glowOnHover={false}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] text-sm px-4 py-3 rounded-xl border border-[var(--border-subtle)] focus:border-[var(--brand-strong)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-strong)] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] text-sm px-4 py-3 rounded-xl border border-[var(--border-subtle)] focus:border-[var(--brand-strong)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-strong)] transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Tell me about your project..."
                rows={6}
                className="w-full bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] text-sm px-4 py-3 rounded-xl border border-[var(--border-subtle)] focus:border-[var(--brand-strong)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-strong)] transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl bg-[var(--brand-strong)] text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer hover:shadow-neon transition-shadow disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </GlassCard>
      </ScrollReveal>

      <Footer />
    </div>
  );
}
