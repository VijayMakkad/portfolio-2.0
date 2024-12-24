"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "next-themes";

interface ParticlesBackgroundProps {
  id: string;
  className?: string;
}

const ParticlesBackground = ({ id, className }: ParticlesBackgroundProps) => {
  const { resolvedTheme } = useTheme();
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 1,
            },
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: resolvedTheme === "dark" ? "#ffffff" : "#333333",
        },
        links: {
          color: resolvedTheme === "dark" ? "#ffffff" : "#333333",
          distance: 150,
          enable: true,
          opacity: resolvedTheme === "dark" ? 0.4 : 0.8,
          width: resolvedTheme === "dark" ? 1 : 1.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: 150,
        },
        opacity: {
          value: resolvedTheme === "dark" ? 0.3 : 0.7,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [resolvedTheme]
  );

  if (!init || isMobile) return null;

  return (
    <Particles
      id={id}
      options={options}
      className={`fixed inset-0 w-full h-full ${className || ""}`}
    />
  );
};

export default ParticlesBackground;

