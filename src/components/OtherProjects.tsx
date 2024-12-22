import React from "react";
import { ProjectCard } from "./ProjectCards";
import { Project } from "../types/project";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";

export const OtherProjects = ({
  currentProjectId,
  projects,
}: {
  currentProjectId: number;
  projects: Project[];
}) => {
  const otherProjects = projects.filter((p) => p.id !== currentProjectId);

  return (
    <Card className="bg-white shadow-lg dark:bg-zinc-800/50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
            Other Projects
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Explore more of my work
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white"
        >
          <Link
            href="/projects"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group flex items-center gap-1"
          >
            View All
            <span className="group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {otherProjects.map((project) => (
          <Card
            key={project.id}
            className="bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <ProjectCard project={project} />
          </Card>
        ))}
      </div>
    </Card>
  );
};
