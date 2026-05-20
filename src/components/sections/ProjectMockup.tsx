"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag, TrendingDown, Star, Play, Check, AlertCircle } from "lucide-react";

interface ProjectMockupProps {
  id: string;
  isHovered: boolean;
  accentColor: string;
}

export default function ProjectMockup({ id, isHovered, accentColor }: ProjectMockupProps) {
  // ─── 1. HAMERNASSA REAL LANDING PAGE MOCKUP ────────────────
  if (id === "hamernassa") {
    return (
      <div className="relative w-full h-full bg-[#0a192f] flex flex-col font-sans select-none overflow-hidden text-white/95 transition-colors duration-500">
        {/* Browser Top Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-[#071120]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <div className="ml-4 flex-1 max-w-[150px] h-4 rounded-md bg-white/5 flex items-center justify-center text-[7px] text-[#94a3b8]/60 font-mono">
            hamernassa.vercel.app
          </div>
        </div>

        {/* Website Content */}
        <div className="flex-1 p-3.5 flex flex-col justify-between relative bg-radial from-[#0e2747] via-[#0a192f] to-[#081220]">
          {/* Header */}
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <div className="flex items-center gap-1">
              {/* Medicine capsule icon */}
              <div className="w-4 h-4 rounded-full bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/30">
                <div className="w-1.5 h-2.5 rounded-full bg-[#10b981]" />
              </div>
              <span className="text-[7.5px] font-bold tracking-tight text-white leading-none">
                Hamernassa <span className="text-[#10b981] font-normal text-[6.5px]">Pharma</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-3 rounded-full bg-[#10B981] text-[6.5px] font-bold flex items-center justify-center text-white scale-85">
                Quote
              </div>
            </div>
          </div>

          {/* Body Section split */}
          <div className="grid grid-cols-12 gap-2 my-auto items-center">
            {/* Left Column (Hero Content) */}
            <div className="col-span-7 text-left">
              <h4 className="text-[9.5px] font-extrabold leading-tight tracking-tight text-white">
                Trusted Pharmaceutical <br />
                & Medical Equipment <br />
                <span className="text-[#10b981] font-bold">Import Solutions</span>
              </h4>
              <p className="text-[5.5px] text-[#94a3b8] mt-1 max-w-[125px] leading-relaxed">
                Pioneering high-quality medical supplies and logistics in Ethiopia.
              </p>
              
              {/* Action pills */}
              <div className="flex gap-1.5 mt-2.5">
                <div className="px-2 py-0.5 rounded-full bg-white text-black text-[5px] font-bold font-sans">
                  Explore
                </div>
                <div className="px-2 py-0.5 rounded-full border border-white/20 text-white text-[5px] font-medium font-sans">
                  Partner
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex gap-1.5 mt-2 opacity-80">
                <span className="text-[4px] px-1 py-0.2 bg-white/5 border border-white/10 rounded-xs text-[#10b981] font-mono">
                  ✓ EFDA
                </span>
                <span className="text-[4px] px-1 py-0.2 bg-white/5 border border-white/10 rounded-xs text-[#10b981] font-mono">
                  ✓ ISO
                </span>
              </div>
            </div>

            {/* Right Column (Interactive Stats Grid) */}
            <div className="col-span-5 grid grid-cols-2 gap-1 bg-white/3 border border-white/5 p-1.5 rounded-xl backdrop-blur-md">
              {[
                { val: "150+", lbl: "Partners" },
                { val: "500+", lbl: "Products" },
                { val: "12", lbl: "Regions" },
                { val: "100%", lbl: "Compliant" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  animate={isHovered ? { scale: [1, 1.05, 1], y: [0, -1, 0] } : {}}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="bg-[#0b1b33] border border-white/5 p-1 rounded-sm text-center"
                >
                  <div className="text-[7.5px] font-bold text-[#10b981] leading-none">{stat.val}</div>
                  <div className="text-[4px] text-[#94a3b8] scale-90 origin-center mt-0.5">{stat.lbl}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── 2. SPOTLESS SKIN LAB REAL LANDING PAGE MOCKUP ────────
  if (id === "spotless") {
    return (
      <div className="relative w-full h-full bg-[#fcf9f5] flex flex-col font-sans select-none overflow-hidden text-[#1a1a1a] transition-colors duration-500">
        {/* Browser Top Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-black/5 bg-[#f5efe6]">
          <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
          <div className="ml-4 flex-1 max-w-[150px] h-4 rounded-md bg-black/5 flex items-center justify-center text-[7px] text-black/40 font-mono">
            spotless-beauty.vercel.app
          </div>
        </div>

        {/* Website Content */}
        <div className="flex-1 p-3.5 flex flex-col justify-between relative bg-gradient-to-tr from-[#faf5ef] to-[#fffefc]">
          {/* Header */}
          <div className="flex justify-between items-center pb-2 border-b border-[#b57c63]/15">
            <div className="flex items-center gap-1">
              <ShoppingBag size={8} className="text-[#b57c63]" />
              <span className="text-[8px] font-serif font-bold tracking-tight text-[#3b2d29] leading-none">
                Spotless Skin <span className="text-[#b57c63] font-sans font-normal text-[6.5px]">LAB</span>
              </span>
            </div>
            <div className="w-7 h-3 rounded-full bg-black text-[6px] font-bold text-white flex items-center justify-center scale-85">
              Shop
            </div>
          </div>

          {/* Body Section split */}
          <div className="grid grid-cols-12 gap-2 my-auto items-center">
            {/* Left Column (Hero Content) */}
            <div className="col-span-7 text-left">
              <span className="text-[4px] font-mono tracking-widest text-[#b57c63] uppercase block mb-1">
                Premium Beauty & Fashion
              </span>
              <h4 className="text-[11px] font-serif font-bold leading-tight text-[#2d221e] tracking-tight">
                Discover Your <br />
                <span className="bg-gradient-to-r from-[#b57c63] to-[#c38d75] bg-clip-text text-transparent italic font-normal">
                  Natural Glow
                </span>
              </h4>
              <p className="text-[5.5px] text-[#6b5851] mt-1 max-w-[125px] leading-relaxed">
                Authentic US & Korean skincare imported directly to Ethiopia.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mt-2.5">
                <span className="text-[4px] font-semibold bg-[#b57c63]/8 text-[#b57c63] px-1 py-0.2 rounded-xs">
                  🌿 Cruelty Free
                </span>
                <span className="text-[4px] font-semibold bg-[#b57c63]/8 text-[#b57c63] px-1 py-0.2 rounded-xs">
                  ✓ 100% Authentic
                </span>
              </div>
            </div>

            {/* Right Column (Elegant Product Card Showcase) */}
            <div className="col-span-5 flex justify-center relative">
              <motion.div
                animate={isHovered ? { y: -3, rotate: 1 } : { y: 0, rotate: -2 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                className="w-16 p-1.5 rounded-xl border border-[#b57c63]/10 bg-white shadow-md relative flex flex-col items-center"
              >
                {/* Simulated luxury cosmetic tube */}
                <div className="w-8 h-12 bg-gradient-to-b from-[#fdfbf7] to-[#f5ebd6] rounded-sm relative flex flex-col justify-between items-center p-1 border border-black/5">
                  <div className="w-1.5 h-1.5 bg-[#b57c63] rounded-full" />
                  <div className="text-[3px] font-mono text-black/50 scale-75 origin-center">SERUM</div>
                  <div className="w-4 h-0.5 bg-black/10 rounded-xs" />
                </div>
                
                {/* Small product title */}
                <div className="w-10 h-1 bg-black/25 rounded-xs mt-1.5" />
                <div className="flex items-center gap-0.2 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={3} fill="#b57c63" stroke="none" />
                  ))}
                </div>

                {/* Floating New badge */}
                <div className="absolute top-[-4px] right-[-6px] bg-[#b57c63] text-white text-[4px] font-bold px-1 py-0.2 rounded-full shadow-sm scale-90">
                  New
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── 3. PRICE TRACKER REAL LANDING PAGE MOCKUP ─────────────
  return (
    <div className="relative w-full h-full bg-[#f8fafc] flex flex-col font-sans select-none overflow-hidden text-[#0f172a] transition-colors duration-500">
      {/* Browser Top Bar */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-black/5 bg-[#edf2f7]">
        <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <div className="ml-4 flex-1 max-w-[150px] h-4 rounded-md bg-black/5 flex items-center justify-center text-[7px] text-black/40 font-mono">
          price-tracker.vercel.app
        </div>
      </div>

      {/* Website Content */}
      <div className="flex-1 p-3.5 flex flex-col justify-between relative bg-radial from-white via-[#f8fafc] to-[#f1f5f9]">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-black/5">
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 bg-[#4F46E5] rounded-md flex items-center justify-center">
              <TrendingDown size={8} className="text-white" />
            </div>
            <span className="text-[8px] font-extrabold tracking-tight text-slate-800 leading-none">
              Price Tracker
            </span>
          </div>
          <div className="w-10 h-3.5 rounded-full bg-[#0f172a] text-[6px] font-bold text-white flex items-center justify-center scale-85 gap-0.5">
            <span>Grid</span>
          </div>
        </div>

        {/* Body Section (Centered Mockup focus) */}
        <div className="flex flex-col items-center text-center my-auto">
          <span className="text-[4px] font-bold text-[#4f46e5] bg-[#4f46e5]/10 px-1 py-0.2 rounded-full mb-1">
            New: AI-Powered Price Predictions
          </span>
          <h4 className="text-[10px] font-extrabold leading-none tracking-tight text-slate-800">
            Stop Overpaying. <br />
            <span className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] bg-clip-text text-transparent">
              Shop Like a Pro.
            </span>
          </h4>
          <p className="text-[5.5px] text-[#64748b] mt-0.5 max-w-[160px] leading-relaxed">
            Monitor, analyze, and track product prices across stores.
          </p>

          <div className="flex gap-1.5 mt-2">
            <div className="px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white text-[5px] font-bold flex items-center gap-0.5">
              Add to Chrome
            </div>
            <div className="px-2.5 py-0.5 rounded-full border border-slate-300 text-slate-700 text-[5px] font-bold flex items-center gap-0.5">
              <Play size={4} fill="currentColor" stroke="none" /> Watch Demo
            </div>
          </div>
        </div>

        {/* Browser Dashboard simulator underneath (animated elements) */}
        <div className="mx-2 h-14 bg-white rounded-t-lg border-t border-x border-slate-200/80 shadow-md p-1.5 flex gap-2 relative overflow-hidden">
          {/* Left panel */}
          <div className="w-1/2 flex flex-col justify-between border-r border-slate-100 pr-1">
            <div className="flex justify-between items-center text-[4px] text-slate-400">
              <span>Tracked Product</span>
              <span className="text-emerald-500 font-bold">Active</span>
            </div>
            <div className="w-14 h-4 bg-slate-100 rounded-sm mt-0.5" />
            <div className="flex gap-1 mt-1">
              <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xs px-1 text-[3.5px] font-bold">
                +$1,240 Saved
              </div>
              <div className="bg-blue-50 text-blue-600 border border-blue-100 rounded-xs px-1 text-[3.5px] font-bold">
                12 Alerts
              </div>
            </div>
          </div>

          {/* Right panel list of rows */}
          <div className="w-1/2 flex flex-col gap-1 justify-center">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-sm p-0.5">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-slate-200 rounded-xs" />
                  <div className="flex flex-col gap-0.2">
                    <div className="w-8 h-1 bg-slate-300 rounded-xs" />
                    <div className="w-4 h-0.5 bg-slate-200 rounded-xs" />
                  </div>
                </div>
                <motion.div
                  animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.6 }}
                  className="w-4 h-2.5 rounded-sm bg-[#4f46e5] text-white text-[3.5px] font-bold flex items-center justify-center scale-90"
                >
                  <Check size={2.5} strokeWidth={4} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
