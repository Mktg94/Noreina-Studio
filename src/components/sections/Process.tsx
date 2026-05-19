"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { Search, Map, Pen, Code2, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discovery",
    description: "Deep dive into your business goals, audience, and requirements. We define the scope and vision together.",
    accent: "#3b82f6",
  },
  {
    num: "02",
    icon: Map,
    title: "Planning",
    description: "Technical architecture, sitemap, and project roadmap. Everything planned before a single line of code.",
    accent: "#8b5cf6",
  },
  {
    num: "03",
    icon: Pen,
    title: "Design",
    description: "Wireframes and high-fidelity UI designs. Every screen crafted with purpose and visual hierarchy.",
    accent: "#ec4899",
  },
  {
    num: "04",
    icon: Code2,
    title: "Development",
    description: "Clean, modular, production-ready code built with modern technologies and best practices.",
    accent: "#06b6d4",
  },
  {
    num: "05",
    icon: Rocket,
    title: "Launch",
    description: "Deployment, testing, SEO, and performance optimization. Your site goes live at its best.",
    accent: "#10b981",
  },
  {
    num: "06",
    icon: CheckCircle2,
    title: "Support",
    description: "Post-launch support, iterations, and continuous improvements based on real data and feedback.",
    accent: "#f59e0b",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="process"
      className="relative section-padding overflow-hidden"
      aria-label="My process"
    >
      <div className="absolute inset-0 dot-grid opacity-10" />

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
            How I Work
            <span className="w-8 h-px bg-blue-400/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            A process built
            <span className="gradient-text-blue"> for quality.</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            Every project follows a proven methodology — from discovery to delivery — ensuring consistent, exceptional results.
          </p>
        </motion.div>

        {/* Timeline grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {steps.map(({ num, icon: Icon, title, description, accent }, i) => (
            <motion.div
              key={num}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl p-6 bg-[#0a0a0a] border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 0 1px ${accent}20` }}
              />

              {/* Number bg */}
              <div className="absolute top-4 right-4 text-5xl font-black text-white/4 select-none leading-none">
                {num}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
              >
                <Icon size={22} style={{ color: accent }} />
              </div>

              {/* Connector line (not on last items) */}
              {i < steps.length - 1 && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-5 hidden lg:block"
                  style={{ background: `linear-gradient(to bottom, ${accent}40, transparent)` }}
                />
              )}

              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">{description}</p>

              {/* Step indicator */}
              <div className="mt-4 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
                <span className="text-[10px] tracking-widest uppercase font-medium" style={{ color: accent }}>
                  Step {num}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
