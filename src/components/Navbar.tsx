"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Use usePathname for simplicity in Next.js 13+
import {
  Home,
  UserCircle,
  CodeSquareIcon,
  Code,
  Sun,
  MoonStarIcon,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname(); // Replaces useRouter().pathname
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  const [activeLink, setActiveLink] = useState("home");

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Update active link based on the current route
    if (pathname) {
      const currentRoute = pathname === "/" ? "home" : pathname.slice(1);
      setActiveLink(currentRoute);
    }
  }, [pathname]);

  const navItems = [
    { id: "home", icon: <Home className="h-5 w-5 sm:h-7 sm:w-7" />, label: "Home" },
    { id: "about", icon: <UserCircle className="h-5 w-5 sm:h-7 sm:w-7" />, label: "About" },
    { id: "projects", icon: <CodeSquareIcon className="h-5 w-5 sm:h-7 sm:w-7" />, label: "Projects" },
    { id: "experience", icon: <Code className="h-5 w-5 sm:h-7 sm:w-7" />, label: "Experience" },
  ];

  return (
    <nav className={`flex h-[80px] my-6 sm:h-[100px] items-center justify-center w-full transition-colors px-2 sm:px-4`}>
      <div className={`flex items-center w-full sm:w-2/5 gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-4 rounded-xl ${
        isDarkMode ? "bg-zinc-800/50" : "bg-zinc-100 shadow-lg"
      }`}>
        {/* Navigation Links */}
        <div className="flex justify-start flex-1 gap-1 sm:gap-2 md:gap-4">
          {navItems.map((item) => (
            <div key={item.id} className="group relative">
              <Link href={`/${item.id === "home" ? "" : item.id}`}>
                <div
                  className={`p-1 sm:p-2 rounded-full transition-all ease-in-out cursor-pointer ${
                    isDarkMode
                      ? "text-zinc-400 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  } ${
                    activeLink === item.id
                      ? isDarkMode
                        ? "text-white bg-zinc-700 [&>svg]:text-white"
                        : "text-black bg-gray-400 [&>svg]:text-black"
                      : `hover:bg-${isDarkMode ? "zinc-700" : "gray-400"}`
                  }`}
                >
                  {item.icon}
                </div>
              </Link>

              <span
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm py-1 px-2 rounded-full whitespace-nowrap ${
                  isDarkMode ? "bg-zinc-800 text-white" : "bg-gray-50 text-black"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <div className="group relative">
            <button
              onClick={toggleTheme}
              className={`p-1 sm:p-2 rounded-full transition-colors ease-in-out ${
                isDarkMode
                  ? "text-zinc-400 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
              ) : (
                <MoonStarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
              )}
            </button>
          </div>

          {/* Hire Me Button */}
          <Button
            size="sm"
            className={`h-8 sm:h-9 px-2 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 ${
              isDarkMode
                ? "bg-zinc-600 text-white hover:bg-zinc-800"
                : "bg-white text-black hover:bg-gray-400"
            }`}
          >
            <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="xs:inline">Hire Me</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
