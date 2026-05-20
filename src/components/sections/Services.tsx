"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Globe, ShoppingCart, LayoutDashboard, Building2,
  Megaphone, Palette, Zap, X, Check
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    description: "Corporate sites that build credibility and convert visitors into customers.",
    accent: "#3b82f6",
    tags: ["Next.js", "SEO", "CMS"],
    details: [
      "Prismic / Sanity headless CMS integration",
      "Stripe and form integrations",
      "Dynamic multi-language support",
      "Full SEO site audit & metadata routing",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Platforms",
    description: "Full-featured online stores with payments, inventory, and admin dashboards.",
    accent: "#8b5cf6",
    tags: ["Store", "Payments", "Admin"],
    details: [
      "Secure Stripe / Telebirr / Paypal gateways",
      "Real-time cart & catalog analytics",
      "Order status flow notifications",
      "Administrative catalog manager dashboard",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    description: "Clean, powerful dashboards for managing data, users, and operations.",
    accent: "#06b6d4",
    tags: ["Analytics", "Data", "UI"],
    details: [
      "Custom charting & report generations",
      "Role-based authentication & route guards",
      "Live activity log feeds",
      "Bulk export controls (CSV, Excel)",
    ],
  },
  {
    icon: Building2,
    title: "Business Systems",
    description: "Custom management systems tailored to your business workflows and processes.",
    accent: "#10b981",
    tags: ["ERP", "CRM", "Custom"],
    details: [
      "Automated client invoicing workflows",
      "Sales CRM pipelines & stages",
      "Cron-based automated data synchronization",
      "Slack / Telegram notifications webhooks",
    ],
  },
  {
    icon: Megaphone,
    title: "Landing Pages",
    description: "High-converting landing pages with animations and performance optimization.",
    accent: "#f59e0b",
    tags: ["Conversion", "Speed", "CTA"],
    details: [
      "Sub-second initial page load times",
      "Targeted Call-To-Action optimization",
      "Scroll-reactive entrance animations",
      "Tailored branding aesthetic systems",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Thoughtful interface design that balances aesthetics with usability.",
    accent: "#ec4899",
    tags: ["Figma", "Prototypes", "Design"],
    details: [
      "High-fidelity responsive UI prototypes",
      "Interactive component systems design",
      "Accessibility audit compliant (WCAG)",
      "Curated colors & typography structures",
    ],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Audit and optimize existing sites for Core Web Vitals and speed.",
    accent: "#f97316",
    tags: ["Speed", "SEO", "Lighthouse"],
    details: [
      "Lighthouse scores targeting 95+",
      "Dynamic bundle-splitting integrations",
      "Advanced image compression & lazy loading",
      "Server-Side Rendering conversion audits",
    ],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, { once: true, margin: "-10% 0px" });

  // Glow trail cursor coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mouseActive, setMouseActive] = useState(false);

  // Modal State
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setMouseActive(true);
  };

  const handleMouseLeave = () => {
    setMouseActive(false);
    setHoveredCardIndex(null);
  };

  // Reusable micro-animations mapped to icons
  const getIconAnimation = (title: string, isHovered: boolean) => {
    if (!isHovered) return {};
    switch (title) {
      case "Business Websites":
        return { rotate: 360, transition: { duration: 2, ease: "linear", repeat: Infinity } };
      case "Ecommerce Platforms":
        return { x: [0, -3, 3, -3, 0], transition: { duration: 0.5 } };
      case "Admin Dashboards":
        return { scale: [1, 1.15, 1], transition: { duration: 0.5 } };
      case "Business Systems":
        return { y: [0, -4, 0], transition: { duration: 0.5, repeat: Infinity } };
      case "Landing Pages":
        return { rotate: [0, -10, 10, -10, 0], transition: { duration: 0.6 } };
      case "UI/UX Design":
        return { rotate: 15, scale: 1.1, transition: { duration: 0.3 } };
      case "Performance Optimization":
        return { skewX: -10, skewY: 10, scale: 1.1, transition: { duration: 0.4 } };
      default:
        return {};
    }
  };

  return (
    <>
      <section
      ref={containerRef}
      id="services"
      className="relative section-padding overflow-hidden bg-[#080808]"
      aria-label="Services"
    >
      {/* 1. Animated circuit board beam connector lines behind grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0">
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Connection line path 1 */}
        <path
          d="M 100 200 L 500 200 L 500 500 L 1000 500 L 1000 800"
          fill="none"
          stroke="url(#beam-grad)"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className="animate-[draw-beam_15s_linear_infinite]"
        />

        {/* Connection line path 2 */}
        <path
          d="M 900 100 L 900 400 L 400 400 L 400 700 L 100 700"
          fill="none"
          stroke="url(#beam-grad)"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className="animate-[draw-beam_12s_linear_infinite_reverse]"
        />
      </svg>

      {/* 2. Cursor glow trail overlay */}
      {mouseActive && (
        <div
          className="absolute pointer-events-none rounded-full w-[350px] h-[350px] bg-[#3b82f6]/6 blur-[90px] transition-opacity duration-300 z-0 hidden lg:block"
          style={{
            left: coords.x - 175,
            top: coords.y - 175,
          }}
        />
      )}

      {/* Static center glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/3 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5 font-mono">
            <span className="w-8 h-px bg-blue-400/50" />
            What I Build
            <span className="w-8 h-px bg-blue-400/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Services &amp;
            <span className="gradient-text-blue"> Expertise.</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto font-sans">
            End-to-end digital solutions — from concept to deployment — built for businesses that want to lead.
          </p>
        </div>

        {/* Services grid */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {services.map(({ icon: Icon, title, description, accent, tags, details }, i) => {
            const isHovered = hoveredCardIndex === i;
            return (
              <div
                key={title}
                onMouseEnter={() => setHoveredCardIndex(i)}
                onClick={() => setSelectedService({ icon: Icon, title, description, accent, tags, details })}
                className="group relative rounded-2xl p-6 bg-[#0a0a0b]/80 border border-white/5 hover:border-white/12 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md select-none"
              >
                {/* Active scale glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `inset 0 0 0 1px ${accent}25, 0 0 30px ${accent}08` }}
                />

                {/* Corner light source */}
                <div
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: accent }}
                />

                {/* Animated Icon container */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-500"
                  style={{
                    background: isHovered ? `${accent}20` : `${accent}12`,
                    border: `1px solid ${isHovered ? `${accent}40` : `${accent}25`}`,
                    boxShadow: isHovered ? `0 0 10px -2px ${accent}40` : "none",
                  }}
                >
                  <motion.div animate={getIconAnimation(title, isHovered) as any}>
                    <Icon size={20} style={{ color: accent }} />
                  </motion.div>
                </div>

                <h3 className="text-white font-semibold text-base mb-2 leading-tight">{title}</h3>
                <p className="text-[#6b7280] group-hover:text-[#a8a8b3] text-sm leading-relaxed mb-4 transition-colors duration-300">
                  {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-full"
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
              </div>
            );
          })}

          {/* Contact Lead CTA card */}
          <div
            className="group relative rounded-2xl p-6 overflow-hidden flex flex-col items-center justify-center text-center min-h-[190px] cursor-pointer bg-linear-to-br from-blue-500/8 via-purple-600/8 to-transparent border border-blue-500/20"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor="pointer"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <span className="text-2xl mb-2 animate-pulse">✦</span>
            <h3 className="text-white font-semibold text-sm mb-1">Have a project?</h3>
            <p className="text-[#6b7280] group-hover:text-blue-400 text-xs transition-colors duration-300">Let&apos;s discuss it →</p>
          </div>
        </div>
      </div>
    </section>

      {/* 3. Detail Popup Modal (Expanding card details on click) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0a0c] p-6 shadow-2xl overflow-hidden z-10"
            >
              {/* Backglow backdrop */}
              <div
                className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: selectedService.accent }}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-[#6b7280] hover:text-white p-1 rounded-lg border border-white/5 hover:bg-white/5 transition-colors"
                data-cursor="pointer"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-5 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${selectedService.accent}15`,
                    border: `1px solid ${selectedService.accent}30`,
                  }}
                >
                  <selectedService.icon size={22} style={{ color: selectedService.accent }} />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold tracking-tight">{selectedService.title}</h3>
                  <div className="flex gap-1.5 mt-1">
                    {selectedService.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-1.5 py-0.2 rounded-full"
                        style={{
                          background: `${selectedService.accent}10`,
                          border: `1px solid ${selectedService.accent}15`,
                          color: selectedService.accent,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Description */}
              <p className="text-[#a8a8b3] text-sm md:text-base leading-relaxed mb-6 font-sans">
                {selectedService.description}
              </p>

              {/* Scope/Details checklist */}
              <div className="flex flex-col gap-3.5">
                <h4 className="text-white text-xs font-mono font-semibold tracking-wider uppercase opacity-60">
                  What is Included
                </h4>
                <div className="flex flex-col gap-2.5">
                  {selectedService.details.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: `${selectedService.accent}15` }}
                      >
                        <Check size={9} style={{ color: selectedService.accent }} strokeWidth={4} />
                      </div>
                      <span className="text-[#6b7280] text-sm font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Bottom Button */}
              <div className="mt-8 pt-5 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2 text-sm font-medium rounded-xl text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10 active:scale-95"
                  data-cursor="pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
