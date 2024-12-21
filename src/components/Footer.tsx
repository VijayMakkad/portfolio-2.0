"use client"
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Twitter, Github,PlusCircle, Clipboard } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export const Footer = () => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const email = "vijaymakkad0104@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      toast({
        title: "Email Copied!",
        description: "The email has been copied to your clipboard.",
        duration: 5000, // 10 seconds in milliseconds
        className:"bg-white dark:bg-zinc-800"
      });
      setIsCopied(true);
      
      setTimeout(() => {
        setIsCopied(false);
      }, 10000); // Match the toast duration
    });
  };

  return (
    <div className="space-y-3 p-4 md:p-8 shadow-lg bg-white dark:bg-zinc-800/50 rounded-lg">
      {/* CTA Section */}
      <div className="text-center space-y-4 mb-6 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white">
          Let's work together.
        </h2>
        <p className="text-zinc-600 dark:text-gray-400 text-base md:text-lg">
          Integrating Web Development and Machine Learning Solutions.
        </p>
        <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6">
          <Button
            size="sm"
            className="bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-white"
          >
            <PlusCircle/>Hire Me
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700/50 items-center justify-center"
          >
            <Clipboard/> Copy Email
          </Button>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-zinc-100/90 dark:bg-zinc-800/90 rounded-lg">
          <div className="flex justify-start items-center gap-2 text-zinc-600 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-gray-400"></span>
            Follow Me
          </div>
          <div className="flex gap-2 items-center justify-center sm:justify-end">
            {[
              { Icon: Twitter, href: "#" },
              { Icon: Instagram, href: "https://www.instagram.com/user._.doesnotexisttt/" },
              { Icon: Github, href: "https://github.com/VijayMakkad" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/vijay-makkad-1573681b3/" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
              >
                <social.Icon className="w-5 h-5 text-zinc-700 dark:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center p-4 bg-zinc-100/90 dark:bg-zinc-800/90 rounded-lg">
        <p className="text-zinc-500 dark:text-gray-500 text-sm">© 2024</p>
        <p className="text-zinc-500 dark:text-gray-500 text-sm">
          by{" "}
          <a
            href="mailTo:vijaymakkad0104@gmail.com"
            className="underline hover:text-zinc-700 dark:hover:text-gray-400"
          >
            Vijay Makkad
          </a>
        </p>
      </div>
    </div>
  );
};