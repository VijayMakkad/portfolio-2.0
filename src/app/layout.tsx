import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins font
import "./globals.css";
import ChatBot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";
import { vmBotConfig } from "@/config/chatConfig";
import { ThemeProvider } from "next-themes";

// Import Poppins font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Adjust weights as needed
});

export const metadata: Metadata = {
  title: "Vijay Makkad",
  description: "Dynamic Portfolio using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased text-white`} // Apply Poppins font
      >
        {/* Theme Provider wraps the entire app */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Static Navbar */}
          <Navbar />
          {/* Main Content Area */}
          <main className="min-h-screen container mx-auto">
            {children}
          </main>
          {/* Static ChatBot */}
          <ChatBot config={vmBotConfig} />
        </ThemeProvider>
      </body>
    </html>
  );
}
