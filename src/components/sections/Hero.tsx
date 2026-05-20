"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "@/hooks/useMousePosition";
import HeroCounter from "@/components/hero/HeroCounter";
import GradientMesh from "@/components/hero/GradientMesh";

// Dynamically import Three.js particle field to optimize performance and prevent SSR issues
const ParticleField = dynamic(() => import("../hero/ParticleField"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#080808]/50" />,
});

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Monitor screen size to conditionally render Three.js for performance
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // GSAP Text Reveal & Scroll-Triggered Zoom Out
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text reveal animation (letter-by-letter stagger)
      gsap.fromTo(
        ".hero-char",
        {
          opacity: 0,
          y: 70,
          rotateX: -40,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.015,
          ease: "power4.out",
          delay: 0.3,
        }
      );

      // 2. Status badge fade and scale
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );

      // 3. Subtitle fade in
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 }
      );

      // 4. CTA buttons fade and stagger
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.1, stagger: 0.15 }
      );

      // 5. Scroll-triggered zoom out and fade out of the hero section on scroll
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 0.82,
        opacity: 0,
        y: 80,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Parallax Effect (Mouse-reactive)
  const { normalizedX, normalizedY } = useMousePosition();
  const mouseX = useSpring(normalizedX, { stiffness: 60, damping: 25 });
  const mouseY = useSpring(normalizedY, { stiffness: 60, damping: 25 });

  // Rotate entire container based on mouse movement
  const rotateX = useTransform(mouseY, [-1, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [-1, 1], [-4, 4]);

  const handleScrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper function to split text into characters for cinematic stagger animation
  const renderSplitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block hero-char"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808] perspective-1000"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {isDesktop && <ParticleField />}
      <GradientMesh />

      {/* Vignette overlays to add cinematic depth */}
      <div className="absolute inset-0 bg-linear-to-b from-[#080808]/20 via-transparent to-[#080808] pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-[#080808]/60 via-transparent to-[#080808]/60 pointer-events-none" />

      {/* Content wrapper with 3D mouse parallax */}
      <motion.div
        ref={contentRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center flex flex-col items-center justify-center select-none"
      >
        {/* Status badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/8 mb-8"
          style={{ transform: "translateZ(25px)" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          <span className="text-[#a8a8b3] text-xs tracking-wider font-sans">Available for new projects</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="text-[#6b7280] text-xs font-sans">Ethiopia · Remote</span>
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] mb-6 preserve-3d"
          style={{ transform: "translateZ(50px)" }}
        >
          <span className="block">{renderSplitText("Building modern")}</span>
          <span className="block gradient-text-blue">{renderSplitText("digital experiences")}</span>
          <span className="block">{renderSplitText("for businesses.")}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle text-[#a8a8b3] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-sans"
          style={{ transform: "translateZ(35px)" }}
        >
          I&apos;m a full-stack developer crafting modern websites and business systems
          with cutting-edge technology, performance, and exceptional UI/UX.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 preserve-3d"
          style={{ transform: "translateZ(20px)" }}
        >
          <button
            onClick={handleScrollToProjects}
            className="hero-cta group flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/5 active:scale-95"
            data-cursor="pointer"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleScrollToContact}
            className="hero-cta group flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white font-semibold text-sm hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 active:scale-95"
            data-cursor="pointer"
          >
            Let&apos;s Work Together
            <ExternalLink size={14} className="group-hover:scale-110 transition-transform text-blue-400" />
          </button>
        </div>

        {/* Stats row with viewport counters */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 border-t border-white/5 pt-12 w-full max-w-4xl"
          style={{ transform: "translateZ(15px)" }}
        >
          {[
            { value: "3+", label: "Projects Shipped", delay: 0.1 },
            { value: "100%", label: "Client Satisfaction", delay: 0.2 },
            { value: "2+", label: "Years Building", delay: 0.3 },
            { value: "∞", label: "Passion for Code", delay: 0.4 },
          ].map(({ value, label, delay }) => (
            <HeroCounter key={label} value={value} label={label} delay={delay} />
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 rounded-full bg-white/40" />
        </motion.div>
        <span className="text-[#6b7280] text-[10px] tracking-widest uppercase font-mono">Scroll</span>
      </motion.div>
    </section>
  );
}
