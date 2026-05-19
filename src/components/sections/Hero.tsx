"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink, MousePointer2 } from "lucide-react";
import AnimatedText from "@/components/shared/AnimatedText";
import { useMousePosition } from "@/hooks/useMousePosition";

function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.offsetWidth / 60);
    const rows = Math.floor(canvas.offsetHeight / 60);
    const dots: Array<{ x: number; y: number; opacity: number; speed: number }> = [];

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        dots.push({
          x: (i / cols) * canvas.offsetWidth,
          y: (j / rows) * canvas.offsetHeight,
          opacity: Math.random() * 0.4 + 0.05,
          speed: Math.random() * 0.01 + 0.005,
        });
      }
    }

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      t += 0.5;

      dots.forEach((dot, i) => {
        const pulse = Math.sin(t * dot.speed + i * 0.5) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${dot.opacity * pulse})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    />
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Blue orb top right */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
      />
      {/* Purple orb bottom left */}
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
      />
      {/* Small accent orb */}
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
      />
    </div>
  );
}

export default function Hero() {
  const { normalizedX, normalizedY } = useMousePosition();

  const mouseX = useSpring(normalizedX, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(normalizedY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-1, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [-1, 1], [-5, 5]);

  const handleScrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <ParticleGrid />
      <FloatingOrbs />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/50 via-transparent to-[#080808]/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/8 mb-10"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          <span className="text-[#a8a8b3] text-xs tracking-wider">Available for new projects</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="text-[#6b7280] text-xs">Ethiopia · Remote</span>
        </motion.div>

        {/* Main heading */}
        <div className="mb-6 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05]"
          >
            Building modern
            <br />
            <span className="gradient-text-blue">digital experiences</span>
            <br />
            for businesses.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#6b7280] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I&apos;m a full-stack developer crafting modern websites and business systems
          with cutting-edge technology, performance, and exceptional UI/UX.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleScrollToProjects}
            id="hero-view-projects"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all duration-300"
            data-cursor="pointer"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleScrollToContact}
            id="hero-lets-work"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white font-semibold text-sm hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300"
            data-cursor="pointer"
          >
            Let&apos;s Work Together
            <ExternalLink size={14} className="group-hover:scale-110 transition-transform text-blue-400" />
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: "3+", label: "Projects Shipped" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "2+", label: "Years Building" },
            { value: "∞", label: "Passion for Code" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white counter-num">{value}</div>
              <div className="text-[#6b7280] text-xs mt-1 tracking-wide">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 rounded-full bg-white/40" />
        </motion.div>
        <span className="text-[#6b7280] text-[10px] tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
