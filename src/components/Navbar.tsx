"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Home, UserCircle, CodeSquareIcon, Sun, MoonStarIcon, PlusCircle, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [activeLink, setActiveLink] = useState("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname) {
      const currentRoute = pathname === "/" ? "home" : pathname.slice(1);
      setActiveLink(currentRoute);
    }
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { id: "home", icon: <Home className="h-5 w-5 sm:h-7 sm:w-7" />, label: "Home" },
    { id: "about", icon: <UserCircle className="h-5 w-5 sm:h-7 sm:w-7" />, label: "About" },
    { id: "experience", icon: <TrendingUp className="h-5 w-5 sm:h-7 sm:w-7" />, label: "Experience" },
    { id: "projects", icon: <CodeSquareIcon className="h-5 w-5 sm:h-7 sm:w-7" />, label: "Projects" },
  ];

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <nav className={`flex h-[80px] my-6 sm:h-[100px] items-center justify-center w-full transition-colors px-2 sm:px-4`}>
      <div className={`flex z-10 items-center w-full sm:w-2/5 gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-4 rounded-xl ${
        currentTheme === "dark" ? "bg-zinc-800/50" : "bg-zinc-100 shadow-lg"
      }`}>
        {/* Navigation Links */}
        <div className="flex justify-start flex-1 gap-1 sm:gap-2 md:gap-4">
          {navItems.map((item) => (
            <div key={item.id} className="group relative">
              <Link href={`/${item.id === "home" ? "" : item.id}`}>
                <div
                  className={`p-1 sm:p-2 rounded-full transition-all ease-in-out cursor-pointer ${
                    currentTheme === "dark"
                      ? "text-zinc-400 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  } ${
                    activeLink === item.id
                      ? currentTheme === "dark"
                        ? "text-white bg-zinc-700 [&>svg]:text-white"
                        : "text-black bg-gray-400 [&>svg]:text-black"
                      : `hover:bg-${currentTheme === "dark" ? "zinc-700" : "gray-400"}`
                  }`}
                >
                  {item.icon}
                </div>
              </Link>

              <span
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm py-1 px-2 rounded-full whitespace-nowrap ${
                  currentTheme === "dark" ? "bg-zinc-800 text-white" : "bg-gray-50 text-black"
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
                currentTheme === "dark"
                  ? "text-zinc-400 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {currentTheme === "dark" ? (
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
              currentTheme === "dark"
                ? "bg-zinc-600 text-white hover:bg-zinc-800"
                : "bg-white text-black hover:bg-gray-400"
            }`}
          >
            <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <Link href={"/contact"}><span className="xs:inline">Contact Me</span></Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

