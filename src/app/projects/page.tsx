import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import React from "react";
import { projects } from "./data";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex justify-center min-h-screen p-4 ">
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
        <div className="space-y-4  bg-white shadow-lg dark:bg-zinc-800/50 rounded-lg p-4 md:p-5">
          <div className="space-y-2">
          <span className="text-zinc-600 dark:text-gray-400">• Highlights</span>
            {projects.map((project, index) => (
              <div
                key={index}
                // onClick={() => Router.push(`/projects/${project.id}`)}
                className="flex items-center justify-between p-4 bg-zinc-200/50 hover:bg-zinc-300/50 dark:bg-zinc-600/50 dark:hover:bg-zinc-700/50 rounded-lg cursor-pointer transition-colors"
              >
                <Link href={`/projects/${project.id}`}>
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full ${project.color} flex items-center justify-center text-white`}
                  >
                    {project.icon}
                  </div>
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-zinc-600 dark:text-gray-400">
                      {project.tags?.join(", ")}
                    </div>
                  </div>
                </div>
                </Link>
                <ChevronRight className="h-4 w-4 text-zinc-600 dark:text-gray-400" />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </Card>
    </div>
  );
};

export default page;
