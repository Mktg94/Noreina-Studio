"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { Shield, Zap, Layers, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { clientLogos } from "@/lib/projects";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const pillars = [
  {
    icon: Shield,
    title: "Focused on real business solutions",
    description:
      "I don't build templates. Every project is tailored to the real needs of the business — designed to perform, convert, and grow.",
    quote: "\"Real problems deserve real solutions.\"",
    accent: "#3b82f6",
  },
  {
    icon: Zap,
    title: "Performance-first development",
    description:
      "Speed is a feature. Every line of code I write is optimized for Core Web Vitals, fast load times, and an excellent user experience.",
    quote: "\"Fast is a competitive advantage.\"",
    accent: "#10b981",
  },
  {
    icon: Layers,
    title: "Modern scalable architecture",
    description:
      "I build systems that grow with your business — modular, maintainable, and ready for the next version of your product.",
    quote: "\"Build today for tomorrow's scale.\"",
    accent: "#8b5cf6",
  },
  {
    icon: Sparkles,
    title: "Clean UI/UX experiences",
    description:
      "Design isn't decoration. It's how your business communicates. I craft interfaces that feel premium and are intuitive to use.",
    quote: "\"Design with intention, build with precision.\"",
    accent: "#f59e0b",
  },
];

const stats = [
  { value: 3, suffix: "+", label: "Live client products" },
  { value: 100, suffix: "%", label: "Project completion rate" },
  { value: 24, suffix: "h", label: "Typical response time" },
  { value: 5, suffix: "+", label: "Years building web apps" },
];

function TrustCounters({ active }: { active: boolean }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active) return;
    stats.forEach((stat, i) => {
      const el = refs.current[i];
      if (!el) return;
      const counter = { val: 0 };
      gsap.to(counter, {
        val: stat.value,
        duration: 1.8,
        delay: i * 0.1,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(counter.val)}${stat.suffix}`;
        },
      });
    });
  }, [active]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="text-center p-6 rounded-2xl bg-[#0a0a0a] border border-white/5"
        >
          <span
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="block text-3xl md:text-4xl font-bold text-white mb-1"
          >
            0{stat.suffix}
          </span>
          <span className="text-[#6b7280] text-xs">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Credibility() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef as React.RefObject<Element>, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="credibility"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      aria-label="Why choose me"
    >
      <div className="absolute inset-0 dot-grid opacity-10" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6" ref={contentRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-8 h-px bg-blue-400/50" />
            Trust & Proof
            <span className="w-8 h-px bg-blue-400/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Why businesses
            <span className="gradient-text-blue"> choose me.</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            I bring more than code — I bring a commitment to excellence, clarity, and results.
          </p>
        </motion.div>

        <TrustCounters active={isInView} />

        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="px-5 py-3 rounded-xl border border-white/5 bg-[#0a0a0a] text-[#6b7280] hover:text-white hover:border-white/15 transition-colors duration-300"
            >
              <span className="text-sm font-semibold text-white/80">{client.name}</span>
              <span className="text-[10px] block mt-0.5 opacity-60">{client.industry}</span>
            </div>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {pillars.map(({ icon: Icon, title, description, quote, accent }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl p-8 bg-[#0a0a0a] border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300"
            >
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                style={{ background: accent }}
              />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
                >
                  <Icon size={22} style={{ color: accent }} />
                </div>
                <h3 className="text-white text-xl font-bold mb-3 leading-tight">{title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed mb-6">{description}</p>
                <div
                  className="pl-4 border-l-2 italic text-sm"
                  style={{ borderColor: `${accent}40`, color: `${accent}90` }}
                >
                  {quote}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center p-10 rounded-3xl border border-blue-500/12"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(124,58,237,0.06))",
          }}
        >
          <p className="text-white/80 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
            &ldquo;Michael delivered a polished site on time — professional communication and
            clean code throughout.&rdquo;
          </p>
          <footer className="mt-4 text-[#6b7280] text-sm">— Client feedback · Web project</footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
