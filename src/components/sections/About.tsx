"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";
import { Code2, Layers, Rocket, Globe } from "lucide-react";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const highlights = [
  {
    icon: Code2,
    title: "Modern Development",
    description: "I write clean, scalable code using the latest technologies — Next.js, TypeScript, and modern tooling.",
  },
  {
    icon: Layers,
    title: "Full-Stack Capability",
    description: "From pixel-perfect frontend to robust backend systems, databases, and API architecture.",
  },
  {
    icon: Rocket,
    title: "Performance First",
    description: "Every project is built for speed, SEO, and exceptional user experience from day one.",
  },
  {
    icon: Globe,
    title: "Real Business Value",
    description: "I focus on practical solutions that help companies modernize their digital presence and grow.",
  },
];

export default function About() {
  const revealRef = useSectionReveal<HTMLElement>();
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef as React.RefObject<Element>, { once: true, margin: "-15% 0px" });

  return (
    <section
      id="about"
      ref={revealRef}
      className="relative section-padding overflow-hidden"
      aria-label="About section"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 dot-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={staggerItem} className="mb-6">
              <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase">
                <span className="w-8 h-px bg-blue-400/50" />
                About Me
              </span>
            </motion.div>

            <motion.h2
              variants={staggerItem}
              className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6"
            >
              A self-taught developer
              <br />
              <span className="gradient-text">who means business.</span>
            </motion.h2>

            <motion.p variants={staggerItem} className="text-[#a8a8b3] text-lg leading-relaxed mb-5">
              I&apos;m a full-stack web developer based in Ethiopia, building modern websites and business
              systems for companies that want to stand out. Self-taught, driven by curiosity, and
              obsessed with clean design and modern technology.
            </motion.p>

            <motion.p variants={staggerItem} className="text-[#6b7280] leading-relaxed mb-8">
              My work combines strong technical foundations with a deep understanding of UI/UX,
              helping real businesses — from pharmaceuticals to beauty ecommerce — establish a
              powerful, professional digital presence.
            </motion.p>

            {/* Credentials row */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              {["Next.js", "TypeScript", "UI/UX", "Full-Stack", "Ethiopia"].map((tag) => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Highlights grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                variants={staggerItem}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="gradient-border rounded-2xl p-5 group hover:glow-blue-sm transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/15 transition-colors">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 h-px bg-linear-to-r from-transparent via-white/10 to-transparent origin-left"
        />
      </div>
    </section>
  );
}
