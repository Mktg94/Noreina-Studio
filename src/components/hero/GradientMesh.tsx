"use client";

/** CSS-only gradient orbs — no Framer Motion loop (saves GPU during scroll). */
export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="gradient-orb gradient-orb-blue" />
      <div className="gradient-orb gradient-orb-purple" />
      <div className="gradient-orb gradient-orb-cyan" />
      <div className="absolute inset-0 bg-[#080808]/25 mix-blend-multiply" />
    </div>
  );
}
