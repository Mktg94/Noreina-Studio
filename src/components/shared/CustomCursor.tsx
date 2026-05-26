"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type CursorMode = "default" | "pointer" | "text" | "hidden";

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsMobile(mobile || reduced);

    const onResize = () => {
      const m = window.matchMedia("(max-width: 768px)").matches;
      const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobile(m || r);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const resolveMode = (el: Element | null): CursorMode => {
      if (!el) return "default";
      const cursorEl = el.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl?.dataset.cursor === "hidden") return "hidden";
      if (cursorEl?.dataset.cursor === "text") return "text";
      if (cursorEl?.dataset.cursor === "pointer") return "pointer";
      if (
        el.closest("a, button, [role='button'], [data-cursor='pointer']")
      ) {
        return "pointer";
      }
      if (el.closest("input, textarea, [contenteditable='true'], [data-cursor='text']")) {
        return "text";
      }
      return "default";
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setMode(resolveMode(e.target as Element));
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.35;
      pos.current.y += (target.current.y - pos.current.y) * 0.35;
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.12;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, [isMobile]);

  if (isMobile || mode === "hidden") return null;

  const isPointer = mode === "pointer";
  const isText = mode === "text";

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          marginLeft: isText ? -1 : -4,
          marginTop: isText ? -10 : -4,
          width: isText ? 2 : 8,
          height: isText ? 20 : 8,
          borderRadius: isText ? 1 : "50%",
          backgroundColor: isPointer ? "#3b82f6" : "#ffffff",
          mixBlendMode: isText ? "normal" : "difference",
        }}
        animate={{ scale: isClicking ? 0.6 : isPointer ? 0 : 1, opacity: isPointer ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />

      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          marginLeft: isPointer ? -24 : isText ? -12 : -16,
          marginTop: isPointer ? -24 : isText ? -12 : -16,
          width: isPointer ? 48 : isText ? 24 : 32,
          height: isPointer ? 48 : isText ? 24 : 32,
          borderRadius: isText ? 4 : "50%",
          border: `1px solid ${
            isPointer
              ? "rgba(59,130,246,0.85)"
              : isText
                ? "rgba(255,255,255,0.55)"
                : "rgba(255,255,255,0.4)"
          }`,
          boxShadow: isPointer ? "0 0 20px rgba(59,130,246,0.25)" : "none",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, border-radius 0.25s ease",
        }}
      />
    </>
  );
}
