"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

const techs = [
  { name: "Next.js", icon: "▲", color: "#ffffff", description: "React Framework" },
  { name: "React", icon: "⚛", color: "#61dafb", description: "UI Library" },
  { name: "TypeScript", icon: "TS", color: "#3178c6", description: "Type Safety" },
  { name: "Tailwind", icon: "~", color: "#38bdf8", description: "CSS Framework" },
  { name: "Node.js", icon: "⬢", color: "#68a063", description: "Runtime" },
  { name: "MongoDB", icon: "🍃", color: "#47a248", description: "Database" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791", description: "Database" },
  { name: "Framer", icon: "◈", color: "#0055ff", description: "Motion" },
  { name: "GSAP", icon: "⚡", color: "#88ce02", description: "Animation" },
  { name: "Python", icon: "🐍", color: "#f7c948", description: "Scripting" },
  { name: "Figma", icon: "◉", color: "#f24e1e", description: "Design" },
  { name: "Vercel", icon: "▲", color: "#ffffff", description: "Deployment" },
];

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="stack"
      className="relative section-padding overflow-hidden"
      aria-label="Technology stack"
    >
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-8 h-px bg-blue-400/50" />
            Tech Stack
            <span className="w-8 h-px bg-blue-400/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Tools I master
            <span className="gradient-text-blue"> daily.</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            A carefully curated stack chosen for performance, developer experience, and production reliability.
          </p>
        </motion.div>

        {/* Tech grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
        >
          {techs.map(({ name, icon, color, description }, i) => (
            <motion.div
              key={name}
              variants={staggerItem}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/15 transition-all duration-300 cursor-default"
              style={{ "--color": color } as React.CSSProperties}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `0 0 30px ${color}12, inset 0 0 0 1px ${color}15` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-300 group-hover:scale-110"
                style={{ background: `${color}10`, border: `1px solid ${color}20`, color }}
              >
                {icon}
              </div>

              <div className="text-center">
                <div className="text-white text-xs font-semibold leading-none mb-0.5">{name}</div>
                <div className="text-[#6b7280] text-[10px] leading-none">{description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee row — scrolling strip */}
        <div className="mt-16 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...techs, ...techs, ...techs].map(({ name }, i) => (
              <span
                key={`${name}-${i}`}
                className="text-white/10 text-sm font-medium tracking-widest uppercase shrink-0"
              >
                {name} ·
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
