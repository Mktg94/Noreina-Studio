"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCounter from "@/components/hero/HeroCounter";
import GradientMesh from "@/components/hero/GradientMesh";
import CanvasErrorBoundary from "@/components/shared/CanvasErrorBoundary";

const ParticleField = dynamic(() => import("../hero/ParticleField"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#050510] z-0" aria-hidden="true" />
  ),
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function HUDCorner({ position, className = "" }: { position: "tl" | "tr" | "bl" | "br"; className?: string }) {
  const styles: Record<string, string> = {
    tl: "top-4 left-4 md:top-8 md:left-8 border-t border-l",
    tr: "top-4 right-4 md:top-8 md:right-8 border-t border-r",
    bl: "bottom-4 left-4 md:bottom-8 md:left-8 border-b border-l",
    br: "bottom-4 right-4 md:bottom-8 md:right-8 border-b border-r",
  };

  return (
    <div
      className={`absolute w-12 h-12 md:w-16 md:h-16 pointer-events-none hud-corner border-white/[0.06] ${styles[position]} ${className}`}
    />
  );
}

function MagneticButton({
  children,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
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
    if (btnRef.current) btnRef.current.style.transform = "translate(0, 0)";
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

function OrbitalRing() {
  const outerDots = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const innerDots = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
      aria-hidden="true"
    >
      <div className="absolute w-[min(90vw,1000px)] aspect-square spin-slow opacity-0 orbital-dot-ring">
        {outerDots.map((i) => {
          const isAccent = i % 3 === 0;
          const colorIdx = i % 4;
          const bg =
            colorIdx === 0
              ? "rgba(59,130,246,0.5)"
              : colorIdx === 1
              ? "rgba(139,92,246,0.4)"
              : colorIdx === 2
              ? "rgba(6,182,212,0.35)"
              : "rgba(255,255,255,0.15)";

          return (
            <div
              key={`o-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: isAccent ? 3 : 2,
                height: isAccent ? 3 : 2,
                background: bg,
                boxShadow: isAccent ? `0 0 6px ${bg}` : "none",
                transform: `rotate(${i * 15}deg) translateX(50cqmin)`,
              }}
            />
          );
        })}
      </div>

      <div
        className="absolute w-[min(65vw,700px)] aspect-square opacity-0 orbital-dot-ring"
        style={{ animation: "spin-slow 30s linear infinite reverse" }}
      >
        {innerDots.map((i) => (
          <div
            key={`i-${i}`}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 1.5,
              height: 1.5,
              background: i % 2 === 0 ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.1)",
              transform: `rotate(${i * 22.5}deg) translateX(50cqmin)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function renderChars(text: string, className: string) {
  const nonSpaceCount = text.replace(/ /g, "").length;
  let idx = 0;

  return text.split("").map((char, i) => {
    const isSpace = char === " ";
    if (!isSpace) idx++;
    const hue = (idx / nonSpaceCount) * 35 - 15;

    return (
      <span
        key={i}
        className={`inline-block hero-char ${isSpace ? "" : className}`}
        style={{
          display: isSpace ? "inline" : "inline-block",
          filter: isSpace ? "none" : `hue-rotate(${hue}deg)`,
          transformOrigin: "50% 100%",
          willChange: "transform, opacity",
        }}
      >
        {isSpace ? "\u00A0" : char}
      </span>
    );
  });
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const scrollActiveRef = useRef(false);
  const webglPausedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [webglScrollPaused, setWebglScrollPaused] = useState(false);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!mounted || !isDesktop) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number };
    const id =
      w.requestIdleCallback?.(() => setWebglReady(true), { timeout: 1200 }) ??
      window.setTimeout(() => setWebglReady(true), 500);

    return () => {
      if (w.requestIdleCallback) window.cancelIdleCallback?.(id as unknown as number);
      else window.clearTimeout(id as unknown as number);
    };
  }, [mounted, isDesktop]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".hero-letterbox-top", { scaleY: 0, duration: 1.2, ease: "power3.inOut" }, 0.1);
      tl.to(".hero-letterbox-bottom", { scaleY: 0, duration: 1.2, ease: "power3.inOut" }, 0.1);

      tl.fromTo(
        ".hud-corner",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.06 },
        0.5
      );

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -25, scale: 0.85, filter: "blur(10px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9 },
        0.7
      );

      const allChars = headingRef.current?.querySelectorAll(".hero-char");
      if (allChars && allChars.length > 0) {
        tl.fromTo(
          allChars,
          { opacity: 0, y: 80, rotateX: -50, scale: 0.7, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)",
            duration: 0.9, stagger: 0.02, ease: "power3.out",
          },
          1.0
        );
      }

      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 },
        2.6
      );

      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.4)" },
        3.0
      );

      tl.fromTo(
        ".hero-stats",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        3.4
      );

      const orbitalEls = sectionRef.current?.querySelectorAll(".orbital-dot-ring");
      if (orbitalEls && orbitalEls.length > 0) {
        tl.fromTo(
          orbitalEls,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.0, stagger: 0.12, ease: "power2.out" },
          3.2
        );
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            scrollActiveRef.current = self.progress > 0.02;
            const pauseWebgl = self.progress > 0.03;
            if (pauseWebgl !== webglPausedRef.current) {
              webglPausedRef.current = pauseWebgl;
              setWebglScrollPaused(pauseWebgl);
            }
          },
        },
      });

      scrollTl.to(
        contentRef.current,
        { scale: 0.82, opacity: 0, y: -80, ease: "none" },
        0
      );
      scrollTl.to(".hud-corner", { opacity: 0, scale: 1.25, ease: "none" }, 0);
      scrollTl.to(".hero-letterbox-top", { scaleY: 1, ease: "none" }, 0.35);
      scrollTl.to(".hero-letterbox-bottom", { scaleY: 1, ease: "none" }, 0.35);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const el = parallaxRef.current;
    if (!el) return;

    let running = true;

    const animate = () => {
      if (!running) return;
      if (!scrollActiveRef.current) {
        currentParallax.current.x += (mouseRef.current.x - currentParallax.current.x) * 0.06;
        currentParallax.current.y += (mouseRef.current.y - currentParallax.current.y) * 0.06;
        const px = currentParallax.current;
        el.style.transform = `perspective(1200px) rotateX(${px.y * 2.5}deg) rotateY(${px.x * -2.5}deg) translateX(${px.x * 5}px) translateY(${px.y * 5}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <div className="hero-letterbox-top absolute top-0 left-0 right-0 h-[15vh] bg-[#050510] z-50 origin-top" />
      <div className="hero-letterbox-bottom absolute bottom-0 left-0 right-0 h-[15vh] bg-[#050510] z-50 origin-bottom" />

      <div className="absolute inset-0 grid-bg opacity-[0.12]" />
      {mounted && isDesktop && webglReady && (
        <CanvasErrorBoundary>
          <ParticleField scrollPaused={webglScrollPaused} />
        </CanvasErrorBoundary>
      )}
      <GradientMesh />

      <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/40 via-transparent to-[#050510] pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050510]/60 via-transparent to-[#050510]/60 pointer-events-none z-[2]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-blue-500/[0.03] blur-[160px] rounded-full pointer-events-none z-[2]" />
      <div className="absolute top-[45%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-violet-500/[0.04] blur-[120px] rounded-full pointer-events-none z-[2]" />

      <HUDCorner position="tl" />
      <HUDCorner position="tr" />
      <HUDCorner position="bl" />
      <HUDCorner position="br" />

      <div className="absolute top-6 left-20 md:top-10 md:left-24 text-[9px] text-white/[0.06] font-mono tracking-widest hud-corner select-none pointer-events-none">
        47.3769° N
      </div>
      <div className="absolute bottom-6 right-20 md:bottom-10 md:right-24 text-[9px] text-white/[0.06] font-mono tracking-widest hud-corner select-none pointer-events-none">
        SYS.2027
      </div>

      {mounted && isDesktop && <OrbitalRing />}

      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center flex flex-col items-center justify-center select-none"
      >
        <div ref={parallaxRef} style={{ transformStyle: "preserve-3d" }}>
          <div
            className="hero-badge relative inline-flex items-center gap-3 px-6 py-3 rounded-full mb-14"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="absolute inset-0 rounded-full holo-border-badge" />
            <div className="absolute inset-[1px] rounded-full bg-[#0a0a1a]/90 backdrop-blur-xl" />

            <span className="relative flex h-2 w-2 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </span>
            <span className="relative z-10 w-px h-3.5 bg-white/10" />
            <span className="relative z-10 text-[#64748b] text-xs font-sans">
              Ethiopia · Remote
            </span>
          </div>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[3.5rem] xl:text-[4.5rem] 2xl:text-[5.5rem] font-bold tracking-[-0.05em] text-white leading-[0.95] mb-10"
            style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
          >
            <span className="block mb-1 md:mb-2">
              {renderChars("Websites & systems", "gradient-char-holo")}
            </span>
            <span className="block mb-1 md:mb-2">
              {renderChars("that win you clients", "gradient-char-holo")}
            </span>
            <span className="block">
              {renderChars("and scale your business.", "gradient-char-holo")}
            </span>
          </h1>

          <p
            className="hero-subtitle text-[#94a3b8] text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-sans"
            style={{ transform: "translateZ(40px)" }}
          >
            Ethiopia-based full-stack developer delivering premium Next.js builds — fast, conversion-focused, and engineered for production.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            style={{ transform: "translateZ(25px)" }}
          >
            <MagneticButton
              onClick={() => scrollTo("#projects")}
              className="hero-cta group relative flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-[#0a0a1a] font-semibold text-sm overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.06)]"
              data-cursor="pointer"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10">View Projects</span>
              <ArrowRight
                size={16}
                className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollTo("#contact")}
              className="hero-cta group relative flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 active:scale-95"
              data-cursor="pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.06] transition-all duration-500" />
              <span className="relative z-10">Let&apos;s Work Together</span>
              <ExternalLink
                size={14}
                className="relative z-10 group-hover:scale-110 transition-transform text-blue-400"
              />
            </MagneticButton>
          </div>

          <div
            className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl"
            style={{ transform: "translateZ(15px)" }}
          >
            {[
              { value: "3+", label: "Live client products", delay: 0.1 },
              { value: "100%", label: "Project completion", delay: 0.2 },
              { value: "24h", label: "Response time", delay: 0.3 },
              { value: "5+", label: "Years building", delay: 0.4 },
            ].map(({ value, label, delay }, index) => (
              <HeroCounter key={label} value={value} label={label} delay={delay} index={index} />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.0, duration: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none"
      >
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
          <div className="absolute inset-0 rounded-full border border-blue-500/5" />
        </motion.div>
        <span className="text-[#475569] text-[9px] tracking-[0.25em] uppercase font-mono">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}
