"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Building2, ShoppingBag, BarChart3 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectMockup from "./ProjectMockup";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: "hamernassa",
    title: "Hamernassa",
    subtitle: "Medical & Pharmaceutical Import",
    industry: "Healthcare · Corporate",
    description:
      "A high-end corporate website for a medical and pharmaceutical import company. Features product showcasing, company branding, and a clean professional design that builds trust in the medical sector.",
    highlights: [
      "Clean corporate UI design",
      "Product & equipment showcase",
      "Professional company branding",
      "Modern business presentation",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
    status: "Live",
    gradient: "from-blue-500/20 via-blue-400/5 to-transparent",
    borderGlow: "rgba(59,130,246,0.3)",
    accentColor: "#3b82f6",
    icon: Building2,
    bgPattern: "grid-bg",
    liveUrl: "https://hamernassa.vercel.app/",
    caseUrl: "#",
    num: "01",
  },
  {
    id: "spotless",
    title: "Spotless Skin Lab",
    subtitle: "Luxury Cosmetics Ecommerce",
    industry: "Beauty · Ecommerce",
    description:
      "A luxury beauty and cosmetics ecommerce platform with elegant product presentation, a shopping cart, and a premium UI that matches international beauty brand standards.",
    highlights: [
      "Luxury beauty aesthetic",
      "Full ecommerce functionality",
      "Premium product presentation",
      "Admin dashboard & order management",
    ],
    stack: ["Next.js", "MongoDB", "Tailwind CSS", "TypeScript"],
    status: "Live",
    gradient: "from-purple-500/20 via-pink-400/5 to-transparent",
    borderGlow: "rgba(168,85,247,0.3)",
    accentColor: "#a855f7",
    icon: ShoppingBag,
    bgPattern: "dot-grid",
    liveUrl: "https://spotless-beauty.vercel.app/",
    caseUrl: "#",
    num: "02",
  },
  {
    id: "pricetracker",
    title: "Price Tracker",
    subtitle: "Smart Product Price Intelligence",
    industry: "SaaS · Analytics",
    description:
      "A smart price tracking platform that monitors product prices across ecommerce stores, gives alerts, and provides analytics dashboards. Heading toward a full SaaS direction.",
    highlights: [
      "Multi-platform price scraping",
      "Smart alert system",
      "Analytics dashboard",
      "Future SaaS direction",
    ],
    stack: ["Next.js", "Python", "PostgreSQL", "Chart.js"],
    status: "In Development",
    gradient: "from-cyan-500/20 via-blue-400/5 to-transparent",
    borderGlow: "rgba(6,182,212,0.3)",
    accentColor: "#06b6d4",
    icon: BarChart3,
    bgPattern: "grid-bg",
    liveUrl: "https://price-tracker-with-cursor-web-app.vercel.app/",
    caseUrl: "#",
    num: "03",
  },
];

// Magnetic Button Wrapper
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove, { passive: true });
      el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }
    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="flex-1"
    >
      {children}
    </motion.div>
  );
}

// Interactive 3D Project Card
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="project-card-reveal group relative select-none cursor-pointer p-[1px] rounded-[24px] overflow-hidden transition-all duration-300"
      style={{ perspective: "1000px" }}
    >
      {/* 1. Animated gradient border glow that rotates continuously on hover */}
      <div
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none"
        style={{ transform: "translateZ(-10px)" }}
      >
        <div
          className="absolute top-1/2 left-1/2 w-[200%] h-[200%] origin-center animate-[spin-slow_8s_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg, ${project.accentColor}, transparent 25%, ${project.accentColor} 50%, transparent 75%, ${project.accentColor})`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Static Border when not hovered */}
      <div className="absolute inset-0 rounded-[24px] border border-white/5 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

      {/* 2. Inner 3D Card Container */}
      <div
        className="relative rounded-[23px] overflow-hidden bg-[#0a0a0b] transition-all duration-300 ease-out h-full"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0px)`,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 50px -10px ${project.borderGlow}`
            : "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Soft glowing ambient background radial mesh */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.borderGlow}, transparent 70%)`,
            transform: "translateZ(-20px)",
          }}
        />

        {/* Top visual mockup area */}
        <div
          className={`relative h-64 md:h-72 overflow-hidden bg-linear-to-br ${project.gradient} border-b border-white/5`}
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 p-4">
            {/* The interactive live web mockup container */}
            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <ProjectMockup id={project.id} isHovered={isHovered} accentColor={project.accentColor} />
            </div>
          </div>

          {/* Status badge */}
          <div className="absolute top-6 left-6" style={{ transform: "translateZ(40px)" }}>
            {project.status === "In Development" ? (
              <div className="badge-dev flex items-center gap-1.5 backdrop-blur-md">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"
                />
                In Development
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Live
              </div>
            )}
          </div>

          {/* Large Back Number */}
          <div
            className="absolute top-6 right-6 text-5xl font-black text-white/3 select-none pointer-events-none"
            style={{ transform: "translateZ(10px)" }}
          >
            {project.num}
          </div>
        </div>

        {/* Content area */}
        <div className="p-7" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-[#6b7280] text-xs tracking-widest uppercase font-mono">{project.industry}</span>
              <h3 className="text-white text-2xl font-bold tracking-tight mt-0.5">{project.title}</h3>
              <p className="text-[#a8a8b3]/80 text-sm mt-0.5">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-[#6b7280] text-sm leading-relaxed mb-5 font-sans">{project.description}</p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs text-[#a8a8b3] font-sans">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: project.accentColor }} />
                {h}
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span key={tech} className="tech-tag font-sans">{tech}</span>
            ))}
          </div>

          {/* Magnetic CTA Buttons */}
          <div className="flex gap-3 pt-2" style={{ transform: "translateZ(50px)" }}>
            <MagneticButton>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all w-full select-none"
                data-cursor="pointer"
                id={`project-live-${project.id}`}
              >
                <ExternalLink size={14} />
                Live Preview
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={project.caseUrl}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all w-full select-none"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}20, ${project.accentColor}10)`,
                  border: `1px solid ${project.accentColor}30`,
                  color: project.accentColor,
                }}
                data-cursor="pointer"
                id={`project-case-${project.id}`}
              >
                <BookOpen size={14} />
                Case Study
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger reveal stagger for cards
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card-reveal",
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative section-padding overflow-hidden bg-[#080808]"
      aria-label="Featured projects"
    >
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5 font-mono">
            <span className="w-8 h-px bg-blue-400/50" />
            Featured Work
            <span className="w-8 h-px bg-blue-400/50" />
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Projects that
            <span className="gradient-text-blue"> speak for themselves.</span>
          </h2>

          <p className="text-[#6b7280] text-lg max-w-xl mx-auto font-sans">
            Real products built for real businesses — from healthcare to ecommerce to SaaS.
          </p>
        </div>

        {/* Projects grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
