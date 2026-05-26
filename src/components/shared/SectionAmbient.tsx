"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Section id → ambient hue (HSL) for scroll-linked background wash */
const THEMES: Record<string, { hue: number; sat: number }> = {
  hero: { hue: 220, sat: 70 },
  about: { hue: 240, sat: 40 },
  projects: { hue: 215, sat: 75 },
  services: { hue: 265, sat: 65 },
  process: { hue: 195, sat: 60 },
  stack: { hue: 280, sat: 55 },
  credibility: { hue: 155, sat: 50 },
  contact: { hue: 225, sat: 70 },
};

function applyTheme(hue: number, sat: number) {
  document.documentElement.style.setProperty("--section-hue", String(hue));
  document.documentElement.style.setProperty("--section-sat", `${sat}%`);
}

export default function SectionAmbient() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    applyTheme(220, 70);

    if (reduced) return;

    const triggers: ScrollTrigger[] = [];

    Object.entries(THEMES).forEach(([id, { hue, sat }]) => {
      const el = document.getElementById(id);
      if (!el) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => applyTheme(hue, sat),
          onEnterBack: () => applyTheme(hue, sat),
        })
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      className="section-ambient-wash pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
