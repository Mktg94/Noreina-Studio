"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { ExternalLink, BookOpen, Clock, Building2, ShoppingBag, BarChart3 } from "lucide-react";

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
    borderGlow: "rgba(59,130,246,0.2)",
    accentColor: "#3b82f6",
    icon: Building2,
    bgPattern: "grid-bg",
    liveUrl: "#",
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
    borderGlow: "rgba(168,85,247,0.2)",
    accentColor: "#a855f7",
    icon: ShoppingBag,
    bgPattern: "dot-grid",
    liveUrl: "#",
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
    borderGlow: "rgba(6,182,212,0.2)",
    accentColor: "#06b6d4",
    icon: BarChart3,
    bgPattern: "grid-bg",
    liveUrl: "#",
    caseUrl: "#",
    num: "03",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10% 0px" });
  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl overflow-hidden border border-white/5 bg-[#0a0a0a] hover:border-white/10 transition-all duration-500"
        style={{ "--glow": project.borderGlow } as React.CSSProperties}
      >
        {/* Hover glow border */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${project.borderGlow}` }}
        />

        {/* Top visual area */}
        <div className={`relative h-64 md:h-72 overflow-hidden bg-linear-to-br ${project.gradient}`}>
          <div className={`absolute inset-0 ${project.bgPattern} opacity-30`} />

          {/* Floating icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center backdrop-blur-sm border"
              style={{
                background: `${project.accentColor}15`,
                borderColor: `${project.accentColor}30`,
              }}
            >
              <Icon size={40} style={{ color: project.accentColor }} />
            </div>
          </motion.div>

          {/* Status badge */}
          <div className="absolute top-5 left-5">
            {project.status === "In Development" ? (
              <div className="badge-dev flex items-center gap-1.5">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"
                />
                In Development
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Live
              </div>
            )}
          </div>

          {/* Number */}
          <div className="absolute top-5 right-5 text-5xl font-black text-white/5 select-none">
            {project.num}
          </div>
        </div>

        {/* Content area */}
        <div className="p-7">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-[#6b7280] text-xs tracking-widest uppercase">{project.industry}</span>
              <h3 className="text-white text-2xl font-bold tracking-tight mt-0.5">{project.title}</h3>
              <p className="text-[#a8a8b3] text-sm">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-[#6b7280] text-sm leading-relaxed mb-5">{project.description}</p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs text-[#a8a8b3]">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: project.accentColor }} />
                {h}
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.a
              href={project.liveUrl}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
              data-cursor="pointer"
              id={`project-live-${project.id}`}
            >
              <ExternalLink size={14} />
              Live Preview
            </motion.a>
            <motion.a
              href={project.caseUrl}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
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
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef as React.RefObject<Element>, { once: true });

  return (
    <section
      id="projects"
      className="relative section-padding overflow-hidden"
      aria-label="Featured projects"
    >
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5"
          >
            <span className="w-8 h-px bg-blue-400/50" />
            Featured Work
            <span className="w-8 h-px bg-blue-400/50" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5"
          >
            Projects that
            <span className="gradient-text-blue"> speak for themselves.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#6b7280] text-lg max-w-xl mx-auto"
          >
            Real products built for real businesses — from healthcare to ecommerce to SaaS.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
