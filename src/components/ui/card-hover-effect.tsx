import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const SkillCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl h-full w-full p-2 overflow-hidden border border-zinc-200 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 backdrop-blur-sm bg-white dark:bg-white/5 shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

const SkillCardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-700 dark:text-zinc-100 text-sm font-medium text-center", className)}>
      {children}
    </h4>
  );
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.title}
          className="relative group block p-1 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-700/50 dark:to-zinc-800 block rounded-xl shadow-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0, y: 5 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1.02,
                  transition: { 
                    duration: 0.2,
                    ease: "easeOut" 
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 5,
                  scale: 1,
                  transition: { 
                    duration: 0.15, 
                    ease: "easeIn" 
                  },
                }}
              />
            )}
          </AnimatePresence>
          <motion.div
            initial={false}
            animate={{
              y: hoveredIndex === idx ? -5 : 0,
              transition: { duration: 0.2 }
            }}
            className="shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <SkillCard>
              <SkillCardTitle>{item.title}</SkillCardTitle>
            </SkillCard>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};