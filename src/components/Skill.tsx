import React from 'react';
import { Card } from "@/components/ui/card";
import { HoverEffect } from "../components/ui/card-hover-effect";


const SkillsSection = () => {
    const skillItems = [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "JavaScript",
      "TypeScript",
      "Tailwind",
      "Java",
      "C++",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "GitHub",
      "Python",
      "TensorFlow",
      "PyTorch",
      "Matplotlib",
      "Seaborn",
      "Flask",
      "GenAI"
    ].map(skill => ({
      title: skill,
      link: `#${skill.toLowerCase().replace('.', '')}` // Creating unique links
    }));
  
    return (
      <Card className="space-y-4 bg-white shadow-lg dark:bg-zinc-800/50 rounded-lg p-4 md:p-5">
        <span className="text-zinc-600 dark:text-gray-400">• Skills</span>
        <div className="w-full">
          <HoverEffect items={skillItems} />
        </div>
      </Card>
    );
  };
  
  export default SkillsSection;