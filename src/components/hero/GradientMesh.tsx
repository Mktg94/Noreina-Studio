"use client";

import { motion } from "framer-motion";

export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Orb 1: Blue Glow */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.25, 0.85, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full filter blur-[120px] opacity-[0.25]"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.2) 50%, transparent 100%)",
        }}
      />

      {/* Orb 2: Purple Glow */}
      <motion.div
        animate={{
          x: [0, -90, 50, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.15, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-10%] left-[-15%] w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] rounded-full filter blur-[140px] opacity-[0.2]"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.7) 0%, rgba(109, 40, 217, 0.15) 50%, transparent 100%)",
        }}
      />

      {/* Orb 3: Turquoise Accent Glow */}
      <motion.div
        animate={{
          x: [0, 60, -50, 0],
          y: [0, 90, -40, 0],
          scale: [0.8, 1.2, 0.9, 0.8],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full filter blur-[100px] opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(8, 145, 178, 0.1) 60%, transparent 100%)",
        }}
      />

      {/* Deep dark overlay to ensure readability */}
      <div className="absolute inset-0 bg-[#080808]/40 mix-blend-multiply" />
    </div>
  );
}
