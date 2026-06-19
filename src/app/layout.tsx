import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";
import { vmBotConfig } from "@/config/chatConfig";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import AnimatedBackground from "@/components/AnimatedBackground";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vijay Makkad — Software Developer & ML Engineer",
  description:
    "Portfolio of Vijay Makkad — Full-Stack Developer, ML Engineer, and CS student at SRMIST. Building intelligent systems with AI, React, and Python.",
  keywords: [
    "Vijay Makkad",
    "portfolio",
    "software developer",
    "ML engineer",
    "full-stack",
    "React",
    "Next.js",
    "Python",
    "AI",
  ],
  openGraph: {
    title: "Vijay Makkad — Software Developer & ML Engineer",
    description:
      "Full-Stack Developer, ML Engineer, and CS student at SRMIST.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${jetbrainsMono.variable} font-display antialiased relative min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Animated Background */}
          <AnimatedBackground />

          {/* Foreground Content */}
          <div className="relative z-10">
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Toaster />
            <ChatBot config={vmBotConfig} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
