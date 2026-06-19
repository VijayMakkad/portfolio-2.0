"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function TimeDisplay() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="hidden md:flex items-center gap-1.5 px-2 font-mono text-xs text-[var(--text-secondary)]">
      <Clock className="h-3.5 w-3.5" />
      <span className="tabular-nums">{time}</span>
    </div>
  );
}
