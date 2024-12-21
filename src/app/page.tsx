// PortfolioCard.jsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  PlusCircle,
  Instagram,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const PortfolioCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
      <Card className="w-full max-w-4xl md:w-[44.5%] bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-white p-4 md:p-8 space-y-6 md:space-y-8">
        {/* Header Section */}
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-zinc-600 dark:text-gray-400">
              • Software Developer
            </span>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 text-sm px-3 py-1 rounded-full">
              • Open To Innovation
            </span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">I'm Vijay Makkad</h1>
            <p className="text-zinc-600 dark:text-gray-400">
              Student at SRMIST, Chennai.
            </p>
            <p className="text-zinc-600 dark:text-gray-400">
              Currently learning ML and Webdev.
            </p>
            <div className="flex justify-center sm:justify-start gap-3 mt-4">
              <Button
                size="sm"
                className="bg-zinc-50 text-black dark:bg-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600"
              >
                <PlusCircle className="mr-2" />
                Hire Me
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
              >
                Copy Email
              </Button>
            </div>
          </div>
          <div className="h-[150px] w-[150px] rounded-full bg-zinc-300 dark:bg-gray-700 flex items-center justify-center shadow-xl">
            <video
              autoPlay
              loop
              muted
              preload="auto"
              className="h-full w-full rounded-full object-cover pointer-events-none"
            >
              <source src="/profile.mp4" type="video/mp4" />
              <track
                src="/videos/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
            </video>
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-4 bg-white dark:bg-zinc-800/50 rounded-lg p-4 md:p-5">
          <div className="flex justify-between items-center">
            <span className="text-zinc-600 dark:text-gray-400">• Projects</span>
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
                name: "Morva labs",
                description: "Visual design, Branding",
                icon: "M",
                color: "bg-violet-600",
              },
              {
                name: "Rectangle",
                description: "Product design, Icon design",
                icon: "□",
                color: "bg-violet-600",
              },
              {
                name: "Simply",
                description: "Landing page, Illustration design",
                icon: "S",
                color: "bg-orange-400",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-zinc-200/50 hover:bg-zinc-300/50 dark:bg-zinc-600/50 dark:hover:bg-zinc-700/50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full ${project.color} flex items-center justify-center text-white`}
                  >
                    {project.icon}
                  </div>
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-zinc-600 dark:text-gray-400">
                      {project.description}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-600 dark:text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-4 bg-white dark:bg-zinc-800/50 rounded-lg p-4 md:p-5">
          <span className="text-zinc-600 dark:text-gray-400">• Products</span>
          <div className="space-y-2">
            {[
              { name: "Portafo", tag: "FRAMER TEMPLATE" },
              { name: "Faktur Invoice", tag: "FRAMER TEMPLATE" },
              { name: "Goven", tag: "FRAMER TEMPLATE" },
              { name: "Subtle Folio", tag: "FRAMER TEMPLATE" },
            ].map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-zinc-200/50 hover:bg-zinc-300/50 dark:bg-zinc-600/50 dark:hover:bg-zinc-700/50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-white">
                    {product.name[0]}
                  </div>
                  <div className="font-medium">{product.name}</div>
                </div>
                <span className="text-xs text-zinc-500 dark:text-gray-500">
                  {product.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </Card>
    </div>
  );
};

export default PortfolioCard;
