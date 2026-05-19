"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Check if already loaded in this session
    if (sessionStorage.getItem("noreina_loaded")) {
      setIsHidden(true);
      return;
    }

    const duration = 2000;
    const interval = 16;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const eased = Math.pow(current / steps, 0.6) * 100;
      setProgress(Math.min(eased, 100));

      if (current >= steps) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setIsComplete(true);
          sessionStorage.setItem("noreina_loaded", "true");
          setTimeout(() => setIsHidden(true), 600);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (isHidden) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center"
      animate={isComplete ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center mb-16"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight text-lg">Noreina Studio</span>
        </div>
        <p className="text-[#6b7280] text-xs tracking-widest uppercase">Loading experience</p>
      </motion.div>

      {/* Progress bar */}
      <div className="relative z-10 w-48">
        <div className="h-px bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-[#3b82f6] text-xs font-mono tracking-wider">
            {Math.round(progress).toString().padStart(3, "0")}
          </span>
          <span className="text-[#6b7280] text-xs font-mono">100</span>
        </div>
      </div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 text-[#6b7280] text-xs tracking-widest uppercase"
      >
        Ethiopia · Full-Stack Developer
      </motion.p>
    </motion.div>
  );
}
