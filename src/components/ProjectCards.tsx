import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Project } from '../types/project';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const Icon = project.icon;

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="flex items-center justify-between p-4 bg-zinc-200/50 hover:bg-zinc-300/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50 rounded-lg cursor-pointer transition-colors">
        <div className="flex items-center gap-4">
          <div className={`h-10 w-10 rounded-full ${project.color} flex items-center justify-center text-white`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="font-medium text-zinc-900 dark:text-white">
              {project.name}
            </div>
            <div className="text-sm text-zinc-600 dark:text-gray-400">
              {project.tags?.join(", ")}
            </div>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-zinc-500 dark:text-gray-400" />
      </div>
    </Link>
  );
};

