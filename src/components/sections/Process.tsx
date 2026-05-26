"use client";

import { useRef, useState, useEffect } from "react";
import { Search, Map, Pen, Code2, Rocket, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionReveal } from "@/hooks/useSectionReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discovery",
    description: "Deep dive into your business goals, audience, and requirements. We define the scope and vision together.",
    accent: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    num: "02",
    icon: Map,
    title: "Planning",
    description: "Technical architecture, sitemap, and project roadmap. Everything planned before a single line of code.",
    accent: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    num: "03",
    icon: Pen,
    title: "Design",
    description: "Wireframes and high-fidelity UI designs. Every screen crafted with purpose and visual hierarchy.",
    accent: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
  },
  {
    num: "04",
    icon: Code2,
    title: "Development",
    description: "Clean, modular, production-ready code built with modern technologies and best practices.",
    accent: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    num: "05",
    icon: Rocket,
    title: "Launch",
    description: "Deployment, testing, SEO, and performance optimization. Your site goes live at its best.",
    accent: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    num: "06",
    icon: CheckCircle2,
    title: "Support",
    description: "Post-launch support, iterations, and continuous improvements based on real data and feedback.",
    accent: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
];

export default function Process() {
  const containerRef = useSectionReveal<HTMLElement>();
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrambledNum, setScrambledNum] = useState("01");

  // Typewriter / Cybernetic number scrambling effect on active step change
  useEffect(() => {
    let count = 0;
    const target = steps[activeIndex].num;
    const chars = "0123456789X$#@%&";
    const interval = setInterval(() => {
      setScrambledNum(() => {
        const c1 = chars[Math.floor(Math.random() * chars.length)];
        const c2 = chars[Math.floor(Math.random() * chars.length)];
        return c1 + c2;
      });
      count++;
      if (count > 6) {
        clearInterval(interval);
        setScrambledNum(target);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // GSAP ScrollTrigger for pinned layout & SVG Path drawings
  useEffect(() => {
    const mainContainer = containerRef.current;
    const leftSide = leftSideRef.current;
    const rightSide = rightSideRef.current;
    const path = pathRef.current;

    if (!mainContainer || !leftSide || !rightSide) return;

    const ctx = gsap.context(() => {
      // 1. Dynamic SVG path length calculations
      if (path) {
        const length = path.getTotalLength() || 1000;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rightSide,
            start: "top 30%",
            end: "bottom 55%",
            scrub: true,
          },
        });
      }

      // 2. Desktop pinning logic (min-width: 1024px)
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          ScrollTrigger.create({
            trigger: mainContainer,
            start: "top 15%",
            end: "bottom 85%",
            pin: leftSide,
            pinSpacing: false,
            scrub: true,
          });

          // Track active step card intersection points
          steps.forEach((_, idx) => {
            ScrollTrigger.create({
              trigger: `.process-card-${idx}`,
              start: "top 35%",
              end: "bottom 35%",
              onToggle: (self) => {
                if (self.isActive) {
                  setActiveIndex(idx);
                }
              },
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const ActiveIcon = steps[activeIndex].icon;

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative section-padding overflow-hidden bg-[#080808]"
      aria-label="My process"
    >
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Main layout container split */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* LEFT SIDE: Pinned Panel */}
          <div ref={leftSideRef} className="w-full lg:w-5/12 h-fit flex flex-col justify-start z-10">
            <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5 font-mono">
              <span className="w-8 h-px bg-blue-400/50" />
              How I Work
              <span className="w-8 h-px bg-blue-400/50" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              A process built
              <span className="gradient-text-blue"> for quality.</span>
            </h2>
            <p className="text-[#6b7280] text-base md:text-lg mb-8 leading-relaxed max-w-md font-sans">
              Every project follows a proven, structured methodology to ensure consistent, premium results at every stage.
            </p>

            {/* Desktop Active Screen with Dynamic Theme Accent Changes */}
            <div
              className="hidden lg:flex flex-col p-8 rounded-2xl border bg-[#0b0b0c] relative overflow-hidden select-none transition-all duration-700"
              style={{
                borderColor: `${steps[activeIndex].accent}20`,
                boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 40px -15px ${steps[activeIndex].glowColor}`,
              }}
            >
              {/* Backglow backdrop */}
              <div
                className="absolute -top-16 -right-16 w-36 h-36 rounded-full filter blur-3xl opacity-20 transition-all duration-700"
                style={{ background: steps[activeIndex].accent }}
              />

              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
                    style={{
                      background: `${steps[activeIndex].accent}15`,
                      border: `1px solid ${steps[activeIndex].accent}35`,
                    }}
                  >
                    <ActiveIcon size={20} style={{ color: steps[activeIndex].accent }} />
                  </div>
                  <span className="text-white font-bold tracking-tight text-sm">
                    {steps[activeIndex].title}
                  </span>
                </div>
                <div className="text-xs font-mono font-semibold" style={{ color: steps[activeIndex].accent }}>
                  STAGE {scrambledNum}
                </div>
              </div>

              {/* Big Stage text */}
              <div className="text-5xl font-black font-sans tracking-tighter opacity-15 mb-3 select-none">
                STEP {scrambledNum}
              </div>

              {/* Animated Text transitions */}
              <div className="min-h-[56px] text-slate-400 text-sm md:text-base leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {steps[activeIndex].description}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress track bars */}
              <div className="flex gap-1.5 mt-8">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-1 flex-1 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor:
                        idx === activeIndex
                          ? steps[activeIndex].accent
                          : idx < activeIndex
                          ? `${steps[activeIndex].accent}40`
                          : "rgba(255,255,255,0.04)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Vertical Cards Flow */}
          <div ref={rightSideRef} className="w-full lg:w-7/12 relative flex flex-col gap-8 lg:gap-16">
            
            {/* SVG Connecting Line with Dynamic Scroll DashOffset drawing */}
            <svg className="absolute left-6 lg:left-8 top-10 bottom-10 w-4 overflow-visible hidden md:block z-0 pointer-events-none">
              <defs>
                <linearGradient id="timeline-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              {/* Base Path line background */}
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="100%"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Active animated SVG path */}
              <path
                ref={pathRef}
                d="M 2 0 L 2 1000"
                stroke="url(#timeline-grad)"
                strokeWidth="3"
                fill="none"
                style={{ height: "100%" }}
              />
            </svg>

            {steps.map(({ num, icon: Icon, title, description, accent }, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={num}
                  className={`process-card-${i} relative pl-0 md:pl-16 lg:pl-20 transition-all duration-500`}
                >
                  {/* Step Card */}
                  <div
                    onClick={() => setActiveIndex(i)}
                    className={`group relative rounded-2xl p-6 md:p-8 bg-[#0a0a0b]/80 border transition-all duration-500 cursor-pointer ${
                      isActive
                        ? "border-white/10 shadow-2xl scale-[1.01] bg-[#0d0d0f]"
                        : "border-white/5 hover:border-white/8 hover:bg-[#0c0c0e]"
                    }`}
                    style={{
                      boxShadow: isActive
                        ? `0 15px 30px -10px rgba(0, 0, 0, 0.6), 0 0 30px -10px ${accent}25`
                        : "none",
                    }}
                  >
                    {/* Glowing dot on timeline connected to dynamic active state (Desktop) */}
                    <div
                      className={`absolute left-[-42px] lg:left-[-54px] top-8 w-4.5 h-4.5 rounded-full border-2 bg-[#080808] z-10 transition-all duration-500 hidden md:block ${
                        isActive ? "scale-125" : "scale-100"
                      }`}
                      style={{
                        borderColor: isActive ? accent : "rgba(255,255,255,0.15)",
                        boxShadow: isActive ? `0 0 10px 2px ${accent}` : "none",
                      }}
                    />

                    {/* Background Soft Glow on Card hover/active */}
                    <div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none rounded-2xl ${
                        isActive ? "opacity-[0.02]" : "group-hover:opacity-[0.01]"
                      }`}
                      style={{ background: accent }}
                    />

                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                          style={{
                            background: isActive ? `${accent}18` : "rgba(255,255,255,0.03)",
                            border: `1px solid ${isActive ? `${accent}35` : "rgba(255,255,255,0.05)"}`,
                            boxShadow: isActive ? `0 0 15px -3px ${accent}40` : "none",
                          }}
                        >
                          <Icon
                            size={22}
                            className="transition-transform duration-500 group-hover:scale-110"
                            style={{ color: isActive ? accent : "#a8a8b3" }}
                          />
                        </div>
                        <div>
                          <span
                            className="text-[10px] tracking-widest font-mono uppercase font-semibold"
                            style={{ color: isActive ? accent : "#6b7280" }}
                          >
                            Stage {num}
                          </span>
                          <h3 className="text-white font-bold text-xl tracking-tight mt-0.5">{title}</h3>
                        </div>
                      </div>

                      <div className="text-4xl font-black text-white/5 font-sans tracking-tight select-none">
                        {num}
                      </div>
                    </div>

                    <p className="text-[#6b7280] group-hover:text-[#a8a8b3] text-sm md:text-base leading-relaxed transition-colors duration-500">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
