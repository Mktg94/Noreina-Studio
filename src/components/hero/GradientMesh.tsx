"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   Enhanced Gradient Mesh — 5 Holographic Orbs
   Lissajous paths · Better color palette · Depth layers
   ───────────────────────────────────────────────────────── */

export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Orb 1 — Electric Blue (dominant) */}
      <motion.div
        animate={{
          x: [0, 100, -60, 30, 0],
          y: [0, -80, 50, -30, 0],
          scale: [1, 1.3, 0.85, 1.15, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] right-[-12%] w-[85vw] h-[85vw] max-w-[850px] max-h-[850px] rounded-full blur-[130px] opacity-[0.22]"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.9) 0%, rgba(29,78,216,0.25) 45%, transparent 100%)",
        }}
      />

      {/* Orb 2 — Violet Plasma */}
      <motion.div
        animate={{
          x: [0, -110, 70, -40, 0],
          y: [0, 90, -70, 50, 0],
          scale: [1, 1.2, 1.35, 0.9, 1],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[-12%] left-[-18%] w-[95vw] h-[95vw] max-w-[950px] max-h-[950px] rounded-full blur-[150px] opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(109,40,217,0.2) 45%, transparent 100%)",
        }}
      />

      {/* Orb 3 — Cyan Accent */}
      <motion.div
        animate={{
          x: [0, 70, -60, 40, 0],
          y: [0, 100, -50, 70, 0],
          scale: [0.8, 1.25, 0.95, 1.1, 0.8],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[25%] left-[15%] w-[55vw] h-[55vw] max-w-[550px] max-h-[550px] rounded-full blur-[110px] opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.7) 0%, rgba(8,145,178,0.12) 55%, transparent 100%)",
        }}
      />

      {/* Orb 4 — Magenta Whisper */}
      <motion.div
        animate={{
          x: [0, -50, 80, -30, 0],
          y: [0, -60, 40, -80, 0],
          scale: [0.9, 1.1, 0.85, 1.2, 0.9],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[10%] right-[25%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full blur-[100px] opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(190,24,93,0.1) 50%, transparent 100%)",
        }}
      />

      {/* Orb 5 — Deep Indigo Anchor */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1.1, 0.95, 1.2, 1.1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[-5%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.7) 0%, rgba(67,56,202,0.15) 50%, transparent 100%)",
        }}
      />

      {/* Deep dark overlay — ensures text readability */}
      <div className="absolute inset-0 bg-[#080808]/35 mix-blend-multiply" />
    </div>
  );
}
