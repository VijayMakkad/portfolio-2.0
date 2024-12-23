import React from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Github, Globe } from 'lucide-react';
import { projects } from "../data";
import { OtherProjects } from "../../../components/OtherProjects";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Metadata } from 'next';

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const projectId = parseInt(resolvedParams.id, 10);
  const project = projects.find((p) => p.id === projectId);
  
  return {
    title: project ? `${project.name} | Projects` : 'Project Not Found',
    description: project ? project.description : 'Project details not available',
  };
}

export default async function ProjectPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const projectId = parseInt(resolvedParams.id, 10);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex justify-center min-h-screen p-4">
        <Card className="w-full max-w-4xl md:w-[44.5%] shadow-lg bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-white p-4 md:p-8">
          <div>Project not found</div>
        </Card>
      </div>
    );
  }

  const Icon = project.icon;

  return (
    <div className="flex justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl md:w-[44.5%] shadow-lg bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-white p-4 md:p-8 space-y-6">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 rounded-full ${project.color} flex items-center justify-center text-white`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              {project.name}
            </h1>
          </div>

          <p className="text-zinc-600 dark:text-gray-400 leading-relaxed">
            {project.description}
          </p>

          {project.tags && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-full text-sm text-zinc-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between gap-4">
          {project.liveLink && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.githubRepo && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <OtherProjects
            currentProjectId={project.id}
            projects={projects}
          />
        </div>
        <Footer />
      </Card>
    </div>
  );
}