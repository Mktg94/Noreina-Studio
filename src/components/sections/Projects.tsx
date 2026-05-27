"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectMockup from "./ProjectMockup";
import FeaturedProject from "./FeaturedProject";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { featuredProject, portfolioProjects, type PortfolioProject } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      setPosition({
        x: (clientX - (left + width / 2)) * 0.35,
        y: (clientY - (top + height / 2)) * 0.35,
      });
    };
    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
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

function ProjectCard({ project }: { project: PortfolioProject }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      className="project-card-reveal group relative select-none p-[1px] rounded-[24px] overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[200%] h-[200%] origin-center animate-[spin-slow_8s_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg, ${project.accentColor}, transparent 25%, ${project.accentColor} 50%, transparent 75%, ${project.accentColor})`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="absolute inset-0 rounded-[24px] border border-white/5 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

      <div
        className="relative rounded-[23px] overflow-hidden bg-[#0a0a0b] transition-transform duration-300 ease-out h-full"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 50px -10px ${project.borderGlow}`
            : "0 10px 30px -15px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className={`relative h-64 md:h-72 overflow-hidden bg-linear-to-br ${project.gradient} border-b border-white/5`}
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="absolute inset-0 p-4">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <ProjectMockup id={project.id} isHovered={isHovered} accentColor={project.accentColor} />
            </div>
          </div>

          <div className="absolute top-6 left-6">
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

          <div className="absolute top-6 right-6 text-5xl font-black text-white/3 select-none pointer-events-none">
            {project.num}
          </div>
        </div>

        <div className="p-7" style={{ transform: "translateZ(40px)" }}>
          <span className="text-[#6b7280] text-xs tracking-widest uppercase font-mono">{project.industry}</span>
          <h3 className="text-white text-2xl font-bold tracking-tight mt-0.5">{project.title}</h3>
          <p className="text-[#a8a8b3]/80 text-sm mt-0.5 mb-4">{project.subtitle}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.outcomes.slice(0, 3).map((o) => (
              <span
                key={o}
                className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-[#94a3b8] bg-white/[0.02]"
              >
                {o}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-[10px] font-mono text-[#6b7280] mb-4">
            <span>{project.role}</span>
            <span className="text-white/20">·</span>
            <span>{project.timeline}</span>
          </div>

          <p className="text-[#6b7280] text-sm leading-relaxed mb-5 font-sans line-clamp-3">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span key={tech} className="tech-tag font-sans">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <MagneticButton>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all w-full"
                data-cursor="pointer"
              >
                <ExternalLink size={14} />
                Live Preview
              </a>
            </MagneticButton>

            {project.caseUrl ? (
              <MagneticButton>
                <Link
                  href={project.caseUrl}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all w-full"
                  style={{
                    background: `linear-gradient(135deg, ${project.accentColor}20, ${project.accentColor}10)`,
                    border: `1px solid ${project.accentColor}30`,
                    color: project.accentColor,
                  }}
                  data-cursor="pointer"
                >
                  <BookOpen size={14} />
                  Case Study
                </Link>
              </MagneticButton>
            ) : (
              <div
                className="flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm text-[#6b7280] border border-white/5 bg-white/[0.02]"
                title="Case study coming soon"
              >
                Case study soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-project-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".featured-project-reveal",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".project-card-reveal",
        { opacity: 0, y: 60, scale: 0.95 },
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
      ref={sectionRef}
      id="projects"
      className="relative section-padding overflow-hidden bg-[#080808]"
      aria-label="Featured projects"
    >
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
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
            Real products built for real businesses — with live links, timelines, and case studies.
          </p>
        </div>

        <FeaturedProject project={featuredProject} />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
