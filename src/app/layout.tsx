import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import ChatBot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";
import { vmBotConfig } from "@/config/chatConfig";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import ParticlesBackground from "@/components/ParticlesBackground";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vijay Makkad",
  description: "Know about Vijay Makkad!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased relative min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Particles Background */}
          <ParticlesBackground id="tsparticles" />

          {/* Foreground Content */}
          <div className="relative z-10">
            <Navbar />
            <main className="min-h-screen container mx-auto">
              {children}
              <Toaster />
            </main>
            <ChatBot config={vmBotConfig} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

