"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView, motion } from "framer-motion";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────────────────
   HeroCounter — Glass card · Scramble decode · Count-up
   ───────────────────────────────────────────────────────── */

interface HeroCounterProps {
  value: string;
  label: string;
  delay?: number;
  index?: number;
}

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function HeroCounter({ value, label, delay = 0, index = 0 }: HeroCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const [displayValue, setDisplayValue] = useState("—");

  /* Scramble-decode text effect */
  const scrambleTo = useCallback((target: string, onComplete?: () => void) => {
    const length = target.length;
    const duration = 1200; // ms
    const startTime = performance.now();
    let frame: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      let result = "";

      for (let i = 0; i < length; i++) {
        const charThreshold = (i + 1) / length;
        if (progress >= charThreshold) {
          result += target[i];
        } else if (progress > charThreshold - 0.3) {
          result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        } else {
          result += "—";
        }
      }

      setDisplayValue(result);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
        onComplete?.();
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^(\d+)(.*)$/);

    if (!match) {
      // Non-numeric (e.g. ∞): glitch in then settle
      const timer = setTimeout(() => scrambleTo(value), delay * 1000);
      return () => clearTimeout(timer);
    }

    const targetNumber = parseInt(match[1], 10);
    const suffix = match[2] || "";

    // Count-up with GSAP then scramble the suffix
    const timer = setTimeout(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetNumber,
        duration: 2,
        ease: "power3.out",
        onUpdate: () => {
          setDisplayValue(Math.floor(obj.val).toString() + suffix);
        },
      });
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, isInView, delay, scrambleTo]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className="hero-stat-card group relative text-center px-8 py-6 rounded-2xl
                 bg-white/[0.02] border border-white/[0.06]
                 backdrop-blur-sm
                 hover:bg-white/[0.04] hover:border-white/[0.12]
                 transition-all duration-500"
    >
      {/* Animated gradient border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1), rgba(6,182,212,0.08))",
          filter: "blur(1px)",
          margin: "-1px",
          zIndex: -1,
        }}
      />

      {/* Value */}
      <div className="text-3xl md:text-4xl font-bold tracking-tight text-white font-sans counter-num select-none mb-2">
        <span ref={numRef} className="inline-block gradient-text-blue">
          {displayValue}
        </span>
      </div>

      {/* Label */}
      <div className="text-[#64748b] text-[11px] md:text-xs tracking-[0.15em] uppercase font-medium">
        {label}
      </div>

      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/[0.08] rounded-tl-sm" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/[0.08] rounded-tr-sm" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/[0.08] rounded-bl-sm" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/[0.08] rounded-br-sm" />
    </motion.div>
  );
}
