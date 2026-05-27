"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import type { PortfolioProject } from "@/lib/projects";
import ProjectMockup from "./ProjectMockup";

export default function FeaturedProject({ project }: { project: PortfolioProject }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="featured-project-reveal relative mb-14 rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0a0a0b]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 30% 50%, ${project.accentColor}22, transparent 70%)`,
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[340px] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/5">
          <span
            className="inline-block text-[10px] font-mono uppercase tracking-widest mb-4 px-3 py-1 rounded-full border"
            style={{
              color: project.accentColor,
              borderColor: `${project.accentColor}40`,
              background: `${project.accentColor}12`,
            }}
          >
            Featured project
          </span>
          <div className="h-[calc(100%-2rem)] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <ProjectMockup id={project.id} isHovered={hovered} accentColor={project.accentColor} />
          </div>
        </div>

        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <span className="text-[#6b7280] text-xs tracking-widest uppercase font-mono">{project.industry}</span>
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-2 mb-2">{project.title}</h3>
          <p className="text-[#a8a8b3] text-sm mb-6">{project.subtitle}</p>
          <p className="text-[#6b7280] text-sm leading-relaxed mb-6 max-w-lg">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.outcomes.map((o) => (
              <span
                key={o}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#a8a8b3] bg-white/[0.02]"
              >
                {o}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-[#6b7280] mb-8 font-mono">
            <span>
              <span className="text-white/50">Role</span> · {project.role}
            </span>
            <span>
              <span className="text-white/50">Timeline</span> · {project.timeline}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0a0a1a] text-sm font-semibold hover:opacity-90 transition-opacity"
              data-cursor="pointer"
            >
              Live site
              <ExternalLink size={14} />
            </a>
            {project.caseUrl && (
              <Link
                href={project.caseUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-colors"
                style={{
                  borderColor: `${project.accentColor}40`,
                  color: project.accentColor,
                  background: `${project.accentColor}10`,
                }}
                data-cursor="pointer"
              >
                Case study
                <BookOpen size={14} />
              </Link>
            )}
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-3 text-sm text-[#6b7280] hover:text-white transition-colors"
              data-cursor="pointer"
            >
              All projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
