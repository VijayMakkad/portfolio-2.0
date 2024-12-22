"use client"

import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Circle, Star } from 'lucide-react'
import React from 'react'

interface Experience {
  date: string
  title: string
  company: string
  description: string
  icon: 'circle' | 'star'
}

const experiences: Experience[] = [
  {
    date: "Jul 2024 - Present",
    title: "Project Intern",
    company: "Samsung Prism",
    description: "Developed a ML Model using Tensorflow and MovieNet for Video Action Recognition.",
    icon: "star"
  },
  {
    date: "Oct 2023 - Present",
    title: "Associate Technical Lead",
    company: "Founders Club, SRMIST",
    description: "Worked along side a team of 3 to develop multiple projects for the college.",
    icon: "star"
  },
  {
    date: "Jul 2024 - Oct 2024",
    title: "Web Developer Intern",
    company: "EasyGold Ltd.",
    description: "Developed Cart and Accounts pages using React and Java SpringBoot.",
    icon: "circle"
  },
  {
    date: "Jun 2024 - July 2024",
    title: "Summer Intern",
    company: "Jindal Steel and Power",
    description: "Developed Night Vigilance Portal for the company using React and Java SpringBoot.",
    icon: "circle"
  }
]

const Page = () => {
  return (
    <div className="flex justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl md:w-[44.5%] shadow-lg bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-white p-4 md:p-8 space-y-6 md:space-y-8">
        {/* Work Experience Section */}
        <div className="space-y-6">
        <span className="text-zinc-600 dark:text-gray-400">
              • Work Experience
            </span>
          <div className="relative space-y-8">
            {/* Vertical Line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-zinc-200 dark:bg-zinc-700" />
            
            {/* Experience Items */}
            {experiences.map((experience, index) => (
              <div key={index} className="relative pl-8">
                {/* Timeline Icon */}
                <div className="absolute left-0 top-1.5 -translate-x-[1px]">
                  {experience.icon === 'star' ? (
                    <Star className="w-4 h-4 text-zinc-400 dark:text-zinc-500 fill-current" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-400 dark:text-zinc-500 fill-current" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {experience.date}
                  </span>
                  <h3 className="text-xl font-semibold">
                    {experience.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {experience.company}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    {experience.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </Card>
    </div>
  )
}

export default Page
