"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import {
  Globe, ShoppingCart, LayoutDashboard, Building2,
  Megaphone, Palette, Zap
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    description: "Corporate sites that build credibility and convert visitors into customers.",
    accent: "#3b82f6",
    tags: ["Next.js", "SEO", "CMS"],
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Platforms",
    description: "Full-featured online stores with payments, inventory, and admin dashboards.",
    accent: "#8b5cf6",
    tags: ["Store", "Payments", "Admin"],
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    description: "Clean, powerful dashboards for managing data, users, and operations.",
    accent: "#06b6d4",
    tags: ["Analytics", "Data", "UI"],
  },
  {
    icon: Building2,
    title: "Business Systems",
    description: "Custom management systems tailored to your business workflows and processes.",
    accent: "#10b981",
    tags: ["ERP", "CRM", "Custom"],
  },
  {
    icon: Megaphone,
    title: "Landing Pages",
    description: "High-converting landing pages with animations and performance optimization.",
    accent: "#f59e0b",
    tags: ["Conversion", "Speed", "CTA"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Thoughtful interface design that balances aesthetics with usability.",
    accent: "#ec4899",
    tags: ["Figma", "Prototypes", "Design"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Audit and optimize existing sites for Core Web Vitals and speed.",
    accent: "#f97316",
    tags: ["Speed", "SEO", "Lighthouse"],
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="services"
      className="relative section-padding overflow-hidden"
      aria-label="Services"
    >
      <div className="absolute inset-0 grid-bg opacity-10" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/4 blur-[120px] rounded-full pointer-events-none" />

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
            What I Build
            <span className="w-8 h-px bg-blue-400/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Services &amp;
            <span className="gradient-text-blue"> Expertise.</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            End-to-end digital solutions — from concept to deployment — built for businesses that want to lead.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {services.map(({ icon: Icon, title, description, accent, tags }, i) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl p-6 bg-[#0a0a0a] border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300"
              style={{ "--accent": accent } as React.CSSProperties}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 0 1px ${accent}25, 0 0 40px ${accent}08` }}
              />

              {/* Corner decoration */}
              <div
                className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: accent }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{
                  background: `${accent}12`,
                  border: `1px solid ${accent}25`,
                }}
              >
                <Icon size={20} style={{ color: accent }} />
              </div>

              <h3 className="text-white font-semibold text-base mb-2 leading-tight">{title}</h3>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-4">{description}</p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: `${accent}10`,
                      border: `1px solid ${accent}20`,
                      color: accent,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            variants={staggerItem}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl p-6 overflow-hidden flex flex-col items-center justify-center text-center min-h-[180px] cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(124,58,237,0.1))",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor="pointer"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-2xl mb-2">✦</span>
            <h3 className="text-white font-semibold text-sm mb-1">Have a project?</h3>
            <p className="text-[#6b7280] text-xs">Let&apos;s discuss it →</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
