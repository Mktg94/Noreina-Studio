"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Smooth ring position with lerp
  const ringPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const animateRing = () => {
      ringPos.current.x += (x - ringPos.current.x) * 0.12;
      ringPos.current.y += (y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animateRing);
    };
    animFrameRef.current = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [x, y, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const addHover = () => {
      const interactables = document.querySelectorAll(
        "a, button, [data-cursor='pointer'], input, textarea, select, label"
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });
    addHover();

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: x - 4,
          top: y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: isHovering ? "#3b82f6" : "#ffffff",
          mixBlendMode: "difference",
          transition: "background-color 0.2s ease, width 0.2s ease, height 0.2s ease",
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring cursor */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: `1px solid ${isHovering ? "rgba(59,130,246,0.8)" : "rgba(255,255,255,0.4)"}`,
          transition: "border-color 0.3s ease, width 0.3s ease, height 0.3s ease",
          transform: `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`,
          ...(isHovering && {
            width: 48,
            height: 48,
            boxShadow: "0 0 20px rgba(59,130,246,0.3)",
          }),
        }}
      />
    </>
  );
}
