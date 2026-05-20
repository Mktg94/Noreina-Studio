"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cpu, Globe, Layers, ShieldCheck } from "lucide-react";

const techs = [
  { name: "Next.js", icon: "▲", color: "#ffffff", description: "Server Side React", level: 95, detail: "Core framework for routing, SSR, and dynamic API integrations." },
  { name: "React", icon: "⚛", color: "#61dafb", description: "UI Architecture", level: 95, detail: "Component rendering, state orchestration, and performance tuning." },
  { name: "TypeScript", icon: "TS", color: "#3178c6", description: "Static Typing", level: 90, detail: "Ensuring type safety, robust builds, and scalable system models." },
  { name: "Tailwind", icon: "~", color: "#38bdf8", description: "Utility Styling", level: 95, detail: "Fluid layouts, theme tokens, and dynamic styling properties." },
  { name: "Node.js", icon: "⬢", color: "#68a063", description: "Server Runtime", level: 85, detail: "Event-driven architecture and asynchronous pipeline scripting." },
  { name: "MongoDB", icon: "🍃", color: "#47a248", description: "Document Store", level: 80, detail: "Flexible schema definitions, aggregation pipelines, and indices." },
  { name: "PostgreSQL", icon: "🐘", color: "#336791", description: "Relational DB", level: 80, detail: "Data integrity, complex table joins, and transactional flows." },
  { name: "Framer", icon: "◈", color: "#f8fafc", description: "Fluid Motion", level: 90, detail: "Micro-interactions, layout transitions, and spring physics." },
  { name: "GSAP", icon: "⚡", color: "#88ce02", description: "Timeline Physics", level: 90, detail: "Scroll pinning triggers, staggered reveals, and path animations." },
  { name: "Python", icon: "🐍", color: "#f7c948", description: "Automations", level: 80, detail: "Algorithmic data parsing, scraping utilities, and backend routines." },
  { name: "Figma", icon: "◉", color: "#f24e1e", description: "Layout Design", level: 75, detail: "Wireframing UI flow models, layouts, and prototype designs." },
  { name: "Vercel", icon: "▲", color: "#ffffff", description: "Deploy Ops", level: 90, detail: "Edge functions, cache optimization, and Git-driven CD pipeline." },
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, { once: true, margin: "-10% 0px" });

  const [gridTilt, setGridTilt] = useState({ x: 0, y: 0 });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Mouse tilt tracking for the entire floating card board
  const handleGridMouseMove = (e: React.MouseEvent) => {
    const el = e.currentTarget;
    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    setGridTilt({ x: x * 10, y: -y * 10 });
  };

  const handleGridMouseLeave = () => {
    setGridTilt({ x: 0, y: 0 });
    setHoveredTech(null);
  };

  return (
    <section
      ref={containerRef}
      id="stack"
      className="relative section-padding overflow-hidden bg-[#080808]"
      aria-label="Technology stack"
    >
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      {/* Glow backgrounds */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-500/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-blue-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5 font-mono">
            <span className="w-8 h-px bg-blue-400/50" />
            Tech Stack
            <span className="w-8 h-px bg-blue-400/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Tools I master
            <span className="gradient-text-blue"> daily.</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto font-sans">
            A carefully curated stack chosen for performance, developer experience, and production reliability.
          </p>
        </div>

        {/* 3D Floating Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Stack details & stats */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="p-6 rounded-2xl border border-white/5 bg-[#0b0b0c] relative overflow-hidden mb-6">
              {/* Backglow backdrop based on hovered tech color */}
              {hoveredTech && (
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full filter blur-3xl opacity-20 transition-all duration-500"
                  style={{
                    background: techs.find((t) => t.name === hoveredTech)?.color || "#3b82f6",
                  }}
                />
              )}

              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Cpu size={18} className="text-blue-400" />
                Stack Synergy
              </h3>
              
              <div className="min-h-[120px] flex flex-col justify-center">
                {hoveredTech ? (
                  <div>
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider block mb-1"
                      style={{ color: techs.find((t) => t.name === hoveredTech)?.color }}
                    >
                      {hoveredTech} · {techs.find((t) => t.name === hoveredTech)?.level}% Proficiency
                    </span>
                    <h4 className="text-white text-base font-bold mb-1.5">
                      {techs.find((t) => t.name === hoveredTech)?.description}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-sans">
                      {techs.find((t) => t.name === hoveredTech)?.detail}
                    </p>
                  </div>
                ) : (
                  <p className="text-[#6b7280] text-sm leading-relaxed font-sans">
                    Hover over any of the cards in the 3D grid plane to isolate the technology, review proficiency ratings, and view architectural application notes.
                  </p>
                )}
              </div>
            </div>

            {/* Quick Stats list */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-[#a8a8b3]">
                <Globe size={14} className="text-blue-500" />
                <span>100% Responsive viewport layouts</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#a8a8b3]">
                <Layers size={14} className="text-purple-500" />
                <span>GPU Accelerated animations & transitions</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#a8a8b3]">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Production grade security standards</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Orbiting/Tilting Plane */}
          <div className="lg:col-span-8">
            <div
              onMouseMove={handleGridMouseMove}
              onMouseLeave={handleGridMouseLeave}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 rounded-3xl bg-[#09090a]/40 border border-white/5 transition-all duration-300 ease-out select-none"
              style={{
                transform: `perspective(1000px) rotateX(${gridTilt.y}deg) rotateY(${gridTilt.x}deg) translateZ(0px)`,
                transformStyle: "preserve-3d",
              }}
            >
              {techs.map(({ name, icon, color, description, level }, i) => {
                const isHovered = hoveredTech === name;
                const isDimmed = hoveredTech !== null && hoveredTech !== name;
                
                // Circumference details for proficiency circle SVG
                const radius = 24;
                const circumference = 2 * Math.PI * radius;

                return (
                  <div
                    key={name}
                    onMouseEnter={() => setHoveredTech(name)}
                    className={cn(
                      "group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#0a0a0b] border transition-all duration-500",
                      isHovered ? "border-white/15 scale-[1.03]" : "border-white/5",
                      isDimmed ? "opacity-30 blur-[0.5px]" : "opacity-100"
                    )}
                    style={{
                      transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
                      transformStyle: "preserve-3d",
                      boxShadow: isHovered
                        ? `0 15px 30px -10px rgba(0, 0, 0, 0.7), 0 0 35px -10px ${color}20`
                        : "none",
                    }}
                  >
                    {/* Glowing highlight indicator */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 1px ${color}20` }}
                    />

                    {/* Skill Circular Progress Ring */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r={radius}
                          stroke="rgba(255, 255, 255, 0.03)"
                          strokeWidth="2.5"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="50%"
                          cy="50%"
                          r={radius}
                          stroke={color}
                          strokeWidth="2.5"
                          fill="transparent"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={isInView ? { strokeDashoffset: circumference * (1 - level / 100) } : {}}
                          transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.05 }}
                        />
                      </svg>
                      
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 z-10"
                        style={{ background: `${color}10`, color }}
                      >
                        {icon}
                      </div>
                    </div>

                    <div className="text-center" style={{ transform: "translateZ(10px)" }}>
                      <div className="text-white text-xs font-bold leading-none mb-1">{name}</div>
                      <div className="text-[#6b7280] text-[9px] font-mono leading-none tracking-tight">{description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Smooth GPU-Accelerated Infinite Marquee Upgrade with Fade edges */}
        <div className="mt-20 relative w-full overflow-hidden py-4 border-y border-white/5 bg-black/20">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
          
          <div className="flex select-none pointer-events-none overflow-hidden">
            <div className="flex gap-16 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
              {[...techs, ...techs, ...techs].map((tech, idx) => (
                <span
                  key={`${tech.name}-${idx}`}
                  className="text-white/10 text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-3 shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
