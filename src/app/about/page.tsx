"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Copy,
  PlusCircle,
  ArrowRight,
  BotIcon,
  Monitor,
  FuelIcon,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import profilePic from "../../placeholder/IMG_7613.jpg";
import { useToast } from "../../hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import SkillsSection from "@/components/Skill";


export default function AboutPage() {
  const { toast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vijaymakkad0104@gmail.com").then(() => {
      toast({
        title: "Email copied!",
        description: "The email has been copied to your clipboard.",
      });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl md:w-[44.5%] shadow-lg bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-white p-4 md:p-8 space-y-6 md:space-y-8">
        {/* About Badge */}
        <div className="inline-flex items-center py-1  text-zinc-600 dark:text-gray-400  ">
          <span className="text-zinc-600 dark:text-gray-400">• About</span>
        </div>

        {/* Introduction Section */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">It's Me Vijay</h1>
          <p className="text-zinc-600 dark:text-gray-400 leading-relaxed">
            I'm Vijay Makkad, a dedicated Computer Science undergraduate with a
            passion for software development and innovation. Currently pursuing
            my studies at SRM Institute of Science and Technology, I aspire to
            excel in Full-Stack Development, AI, and Machine Learning. With
            experience in web development, machine learning, and leading
            technical projects, I thrive on bridging creativity and technology
            to solve complex challenges. My goal is to create impactful
            solutions that seamlessly integrate functionality and user
            experience, transforming ideas into reality through code and
            innovation.
          </p>
        </div>

        {/* Profile Image */}
        <Card className="overflow-hidden border-none rounded-2xl bg-[#f5e6d3]">
          <Image
            src={profilePic}
            alt="Profile photo"
            height={500}
            width={500}
            className="w-full aspect-[4/3] object-cover"
          />
        </Card>

        {/* More About Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">More About Me</h2>
          <p className="text-zinc-600 dark:text-gray-400 leading-relaxed">
            Vijay Makkad is a Computer Science undergraduate at SRM Institute of
            Science and Technology with a strong drive to stay at the forefront
            of emerging technologies and development trends. Actively engaged in
            technical communities, Vijay collaborates on innovative projects and
            continuously hones his skills through internships and leadership
            roles.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            size="sm"
            className="bg-white text-black dark:bg-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600"
          >
            <PlusCircle className="mr-2" />
            <Link href={'/contact'}>Contact Me</Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
            onClick={handleCopyEmail}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Email
          </Button>
        </div>

        {/* Side Projects Section */}
        <div className="space-y-4 bg-white shadow-lg dark:bg-zinc-800/50 rounded-lg p-4 md:p-5">
          <div className="flex justify-between items-center">
            <span className="text-zinc-600 dark:text-gray-400">
              • Side Projects
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white"
            >
              <Link href={"/projects"} className="flex">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-2">
            {[
              {
                name: "Chatty AI",
                description: <SquareArrowOutUpRight className="w-5 h-5" />,
                icon: <BotIcon className="h-5 w-5" />,
                color: "bg-violet-600",
                link: "https://chattyai-a35j9lzr7tecrqg9tcu.streamlit.app/",
              },
              {
                name: "Fuelemy",
                description: <SquareArrowOutUpRight className="w-5 h-5" />,
                icon: <FuelIcon className="h-5 w-5" />,
                color: "bg-blue-400",
                link: "https://fuelemy-frontend.vercel.app/",
              },
              {
                name: "Blog Website",
                description: <SquareArrowOutUpRight className="w-5 h-5" />,
                icon: <Monitor className="w-5 h-5" />,
                color: "bg-orange-400",
                link: "https://sample-blog-vijaymakkad.vercel.app/",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-zinc-200/50 hover:bg-zinc-300/50 dark:bg-zinc-600/50 dark:hover:bg-zinc-700/50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full ${project.color} flex items-center justify-center text-white dark:text-white`}
                  >
                    {project.icon}
                  </div>
                  <div className="font-medium">{project.name}</div>
                </div>
                <Link href={project.link} target="_blank">
                  <span className="text-xs text-zinc-500 dark:text-gray-500">
                    {project.description}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        {/* <div className="space-y-4 bg-white shadow-lg dark:bg-zinc-800/50 rounded-lg p-4 md:p-5">
          <span className="text-zinc-600 dark:text-gray-400">• Skills</span> */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
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
              "Deep Learning",
              "GenAI",
            ].map((skill, index) => (
              <div
                key={index}
                className="p-3 bg-zinc-200/50 dark:bg-zinc-600/50 rounded-lg text-center text-sm text-zinc-700 dark:text-gray-300 transition-transform transform hover:-translate-y-1 hover:scale-105 hover:bg-zinc-300 dark:hover:bg-zinc-500"
              >
                {skill}
              </div>
            ))}
          </div> */}
        {/* </div> */}
          <SkillsSection/>

        <Footer />
      </Card>
    </div>
  );
}
