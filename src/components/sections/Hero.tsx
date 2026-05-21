"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "@/hooks/useMousePosition";
import HeroCounter from "@/components/hero/HeroCounter";
import GradientMesh from "@/components/hero/GradientMesh";

/* ─── Lazy-load GPU shader (desktop only) ──────────── */
const HeroShader = dynamic(() => import("../hero/HeroShader"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050510]" />,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── HUD Corner Bracket ──────────────────────────────
   Decorative sci-fi display corners                    */
function HUDCorner({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const base = "absolute pointer-events-none hud-corner";
  const size = "w-10 h-10 md:w-14 md:h-14";
  const borderColor = "border-white/[0.07]";

  const map = {
    tl: `top-4 left-4 md:top-8 md:left-8 border-t border-l ${borderColor}`,
    tr: `top-4 right-4 md:top-8 md:right-8 border-t border-r ${borderColor}`,
    bl: `bottom-4 left-4 md:bottom-8 md:left-8 border-b border-l ${borderColor}`,
    br: `bottom-4 right-4 md:bottom-8 md:right-8 border-b border-r ${borderColor}`,
  };

  return <div className={`${base} ${size} ${map[position]}`} />;
}

/* ─── Magnetic Button ─────────────────────────────────
   Physics-based cursor attraction on hover             */
function MagneticButton({
  children,
  className,
  onClick,
  href,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (btnRef.current) {
      btnRef.current.style.transform = "translate(0, 0)";
    }
  }, []);

  return (
    <button
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

/* ─── Orbital Ring ────────────────────────────────────
   Two counter-rotating rings of light dots             */
function OrbitalRing() {
  const dots1 = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const dots2 = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none orbital-ring z-[1]">
      {/* Outer ring — clockwise */}
      <div className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] spin-slow">
        {dots1.map((i) => (
          <div
            key={`o-${i}`}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? "3px" : "2px",
              height: i % 3 === 0 ? "3px" : "2px",
              left: "50%",
              top: "50%",
              background:
                i % 4 === 0
                  ? "rgba(59,130,246,0.5)"
                  : i % 4 === 1
                  ? "rgba(139,92,246,0.4)"
                  : i % 4 === 2
                  ? "rgba(6,182,212,0.35)"
                  : "rgba(255,255,255,0.15)",
              boxShadow:
                i % 3 === 0
                  ? "0 0 6px rgba(59,130,246,0.4)"
                  : "none",
              transform: `rotate(${i * 15}deg) translateX(${
                typeof window !== "undefined" && window.innerWidth < 768
                  ? 300
                  : typeof window !== "undefined" && window.innerWidth < 1024
                  ? 400
                  : 500
              }px)`,
            }}
          />
        ))}
      </div>

      {/* Inner ring — counter-clockwise */}
      <div
        className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px]"
        style={{ animation: "spin-slow 30s linear infinite reverse" }}
      >
        {dots2.map((i) => (
          <div
            key={`i-${i}`}
            className="absolute rounded-full"
            style={{
              width: "1.5px",
              height: "1.5px",
              left: "50%",
              top: "50%",
              background:
                i % 2 === 0
                  ? "rgba(139,92,246,0.35)"
                  : "rgba(255,255,255,0.12)",
              transform: `rotate(${i * 22.5}deg) translateX(${
                typeof window !== "undefined" && window.innerWidth < 768
                  ? 200
                  : typeof window !== "undefined" && window.innerWidth < 1024
                  ? 275
                  : 350
              }px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Floating Particles (CSS) ────────────────────────
   Lightweight ambient particles without WebGL           */
function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 15 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.15 + 0.03,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 20, -30, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION — 2027 Cinematic Edition
   ═══════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  /* ─── Responsive detection ────────────────────────── */
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  /* ─── Cinematic GSAP Timeline ─────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 0. Letterbox cinematic bars retract
      tl.to(".hero-letterbox-top", {
        scaleY: 0,
        duration: 1.2,
        ease: "power3.inOut",
      }, 0.1);
      tl.to(".hero-letterbox-bottom", {
        scaleY: 0,
        duration: 1.2,
        ease: "power3.inOut",
      }, 0.1);

      // 1. HUD corners — slide in from edges
      tl.fromTo(
        ".hud-corner",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.08 },
        0.6
      );

      // 2. Badge — scale + blur materialise
      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -25, scale: 0.85, filter: "blur(10px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.0 },
        0.8
      );

      // 3. Line 1 — "Building modern" — cinematic clip reveal
      tl.fromTo(
        ".hero-line-1 .hero-line-inner",
        { y: "120%", opacity: 0, filter: "blur(8px)" },
        { y: "0%", opacity: 1, filter: "blur(0px)", duration: 1.2 },
        1.0
      );

      // 4. Line 2 — "digital experiences" — char-by-char chromatic reveal
      tl.fromTo(
        ".hero-line-2 .hero-char",
        { opacity: 0, y: 80, rotateX: -60, scale: 0.6, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.025,
        },
        1.3
      );

      // 5. Line 3 — "for businesses." — clip reveal
      tl.fromTo(
        ".hero-line-3 .hero-line-inner",
        { y: "120%", opacity: 0, filter: "blur(8px)" },
        { y: "0%", opacity: 1, filter: "blur(0px)", duration: 1.2 },
        1.7
      );

      // 6. Subtitle — fade deblur
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
        2.1
      );

      // 7. CTAs — spring in
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: "back.out(1.4)" },
        2.4
      );

      // 8. Stats row
      tl.fromTo(
        ".hero-stats",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        2.7
      );

      // 9. Orbital ring
      tl.fromTo(
        ".orbital-ring",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        2.5
      );

      // ─── Scroll-triggered dimensional zoom ─────────
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 0.82,
        opacity: 0,
        y: -80,
        filter: "blur(10px)",
        ease: "none",
      });

      // HUD corners expand on scroll
      gsap.to(".hud-corner", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        scale: 1.5,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ─── Mouse parallax (3D tilt) ───────────────────── */
  const { normalizedX, normalizedY } = useMousePosition();
  const mouseX = useSpring(normalizedX, { stiffness: 40, damping: 30 });
  const mouseY = useSpring(normalizedY, { stiffness: 40, damping: 30 });
  const rotateX = useTransform(mouseY, [-1, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [-1, 1], [-4, 4]);
  const translateX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const translateY = useTransform(mouseY, [-1, 1], [-8, 8]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* ─── Render split characters with chromatic hue ─── */
  const renderChars = (text: string) => {
    const totalChars = text.replace(/ /g, "").length;
    let charIndex = 0;

    return text.split("").map((char, i) => {
      const isSpace = char === " ";
      if (!isSpace) charIndex++;

      // Chromatic hue shift across the word
      const hueRotation = (charIndex / totalChars) * 40 - 20; // -20° to +20°

      return (
        <span
          key={i}
          className={`inline-block hero-char ${isSpace ? "" : "gradient-char-holo"}`}
          style={{
            display: isSpace ? "inline" : "inline-block",
            filter: isSpace ? "none" : `hue-rotate(${hueRotation}deg)`,
            transformOrigin: "50% 100%",
          }}
        >
          {isSpace ? "\u00A0" : char}
        </span>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050510]"
      aria-label="Hero section"
    >
      {/* ═══ CINEMATIC LETTERBOX BARS ═══════════════════ */}
      <div
        className="hero-letterbox-top absolute top-0 left-0 right-0 h-[15vh] bg-[#050510] z-50 origin-top"
        style={{ transformOrigin: "top" }}
      />
      <div
        className="hero-letterbox-bottom absolute bottom-0 left-0 right-0 h-[15vh] bg-[#050510] z-50 origin-bottom"
        style={{ transformOrigin: "bottom" }}
      />

      {/* ═══ BACKGROUND LAYERS ══════════════════════════ */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      {isDesktop && <HeroShader />}
      <GradientMesh />
      {isDesktop && <FloatingParticles />}

      {/* Cinematic vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/40 via-transparent to-[#050510] pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050510]/60 via-transparent to-[#050510]/60 pointer-events-none z-[2]" />

      {/* Radial glow behind heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-500/[0.03] blur-[140px] rounded-full pointer-events-none z-[2]" />
      <div className="absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-500/[0.04] blur-[100px] rounded-full pointer-events-none z-[2]" />

      {/* ═══ HUD FRAME CORNERS ══════════════════════════ */}
      <HUDCorner position="tl" />
      <HUDCorner position="tr" />
      <HUDCorner position="bl" />
      <HUDCorner position="br" />

      {/* HUD coordinate labels */}
      <div className="absolute top-5 left-20 md:top-10 md:left-24 text-[9px] text-white/[0.08] font-mono tracking-widest hud-corner select-none pointer-events-none">
        47.3769° N
      </div>
      <div className="absolute bottom-5 right-20 md:bottom-10 md:right-24 text-[9px] text-white/[0.08] font-mono tracking-widest hud-corner select-none pointer-events-none">
        SYS.2027
      </div>

      {/* ═══ ORBITAL RING ═══════════════════════════════ */}
      {isDesktop && <OrbitalRing />}

      {/* ═══ CONTENT ════════════════════════════════════ */}
      <motion.div
        ref={contentRef}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center flex flex-col items-center justify-center select-none"
      >
        {/* ─── Status Badge ────────────────────────────── */}
        <div
          className="hero-badge relative inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Holographic animated border */}
          <div className="absolute inset-0 rounded-full holo-border-badge" />
          <div className="absolute inset-[1px] rounded-full bg-[#0a0a1a]/90 backdrop-blur-xl" />

          <span className="relative flex h-2 w-2 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          </span>
          <span className="relative z-10 text-[#a8a8b3] text-xs tracking-wider font-sans font-medium">
            Available for new projects
          </span>
          <span className="relative z-10 w-px h-3.5 bg-white/10" />
          <span className="relative z-10 text-[#64748b] text-xs font-sans">
            Ethiopia · Remote
          </span>
        </div>

        {/* ─── Main Heading ────────────────────────────── */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[9rem] font-bold tracking-[-0.05em] text-white leading-[0.95] mb-10"
          style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
        >
          {/* Line 1 — clip reveal */}
          <span className="hero-line-1 block overflow-hidden">
            <span className="hero-line-inner block">Building modern</span>
          </span>

          {/* Line 2 — char-by-char chromatic gradient reveal */}
          <span
            className="hero-line-2 block my-1 md:my-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            {renderChars("digital experiences")}
          </span>

          {/* Line 3 — clip reveal */}
          <span className="hero-line-3 block overflow-hidden">
            <span className="hero-line-inner block text-white/80">
              for businesses.
            </span>
          </span>
        </h1>

        {/* ─── Subtitle ────────────────────────────────── */}
        <p
          className="hero-subtitle text-[#94a3b8] text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-sans"
          style={{ transform: "translateZ(40px)" }}
        >
          Full-stack developer crafting modern websites and business systems
          with cutting-edge technology, performance, and exceptional UI/UX.
        </p>

        {/* ─── CTA Buttons ─────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          style={{ transform: "translateZ(25px)" }}
        >
          <MagneticButton
            onClick={() => scrollTo("#projects")}
            className="hero-cta group relative flex items-center gap-3 px-10 py-4.5 rounded-2xl bg-white text-[#0a0a1a] font-semibold text-sm overflow-hidden transition-all duration-300 active:scale-95"
            data-cursor="pointer"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">View Projects</span>
            <ArrowRight
              size={16}
              className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollTo("#contact")}
            className="hero-cta group relative flex items-center gap-3 px-10 py-4.5 rounded-2xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 active:scale-95"
            data-cursor="pointer"
          >
            {/* Glass + holographic border */}
            <div className="absolute inset-0 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.06] transition-all duration-500" />
            <span className="relative z-10">Let&apos;s Work Together</span>
            <ExternalLink
              size={14}
              className="relative z-10 group-hover:scale-110 transition-transform text-blue-400"
            />
          </MagneticButton>
        </div>

        {/* ─── Stats ───────────────────────────────────── */}
        <div
          className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl"
          style={{ transform: "translateZ(15px)" }}
        >
          {[
            { value: "3+", label: "Projects Shipped", delay: 0.1 },
            { value: "100%", label: "Client Satisfaction", delay: 0.2 },
            { value: "2+", label: "Years Building", delay: 0.3 },
            { value: "∞", label: "Passion for Code", delay: 0.4 },
          ].map(({ value, label, delay }, index) => (
            <HeroCounter
              key={label}
              value={value}
              label={label}
              delay={delay}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* ═══ SCROLL INDICATOR ═══════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none"
      >
        {/* Animated scroll mouse */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-6 h-10 rounded-full border border-white/15 flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-2.5 rounded-full bg-gradient-to-b from-blue-400/80 to-transparent"
          />
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full border border-blue-500/5" />
        </motion.div>

        <span className="text-[#475569] text-[9px] tracking-[0.25em] uppercase font-mono">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}
