"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Briefcase,
  Code2,
  Sun,
  Moon,
  Mail,
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import TimeDisplay from "@/components/TimeDisplay";
import ThemeCustomizer from "@/components/ThemeCustomizer";

const navItems = [
  { id: "home", href: "/", icon: Home, label: "Home" },
  { id: "about", href: "/about", icon: User, label: "About" },
  { id: "experience", href: "/experience", icon: Briefcase, label: "Experience" },
  { id: "projects", href: "/projects", icon: Code2, label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.9]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const activeId =
    pathname === "/" ? "home" : navItems.find((n) => pathname.startsWith(n.href) && n.href !== "/")?.id || "home";

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-2xl glass-panel"
        style={{
          // @ts-expect-error -- motion style typing
          "--tw-bg-opacity": bgOpacity,
        }}
      >
        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link key={item.id} href={item.href}>
                <motion.div
                  className={`relative p-2.5 rounded-xl cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-[var(--brand-strong)] rounded-xl"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <item.icon className="relative z-10 h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[var(--border-subtle)] mx-1" />

        {/* Local Time */}
        <TimeDisplay />

        {/* Theme Customizer */}
        <ThemeCustomizer />

        {/* Theme Toggle */}
        <motion.button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="p-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--brand-strong)] transition-colors duration-200 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Contact CTA */}
        <Link href="/contact">
          <motion.div
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[var(--brand-strong)] text-white text-xs sm:text-sm font-medium cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--brand-glow)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Contact</span>
          </motion.div>
        </Link>
      </motion.div>
    </motion.nav>
  );
}