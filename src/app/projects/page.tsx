import React from "react";
import { Card } from "@/components/ui/card";
import { projects } from "./data";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCards";

export default function ProjectsPage() {
  return (
    <div className="flex justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl md:w-[44.5%] shadow-lg bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-white p-4 md:p-8 space-y-6 md:space-y-8">
        <div className="space-y-1">
          <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-zinc-600 dark:text-gray-400">• Projects</span>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">My Works</h1>
          <p className="text-zinc-600 dark:text-gray-400 leading-relaxed">
            Explore my portfolio, where innovation meets precision. I'm a CS
            undergrad from SRM, aspiring to excel in full-stack development, AI,
            and Machine Learning, blending creativity with technical expertise.
          </p>
        </div>
        <div className="space-y-4 bg-white shadow-lg dark:bg-zinc-800/50 rounded-lg p-4 md:p-5">
          <div className="space-y-2">
            <h2 className="text-zinc-600 dark:text-gray-400 text-lg font-semibold mb-2">
              • Highlights
            </h2>
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <ProjectCard project={project} />
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </Card>
    </div>
  );
}
