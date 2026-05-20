"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ScrollVelocity {
  /** Normalized velocity 0–1 (capped at a max threshold) */
  velocity: number;
  /** Raw pixel delta per frame */
  delta: number;
  /** 1 = down, -1 = up, 0 = still */
  direction: number;
  /** Current scroll Y position */
  scrollY: number;
}

export function useScrollVelocity(): ScrollVelocity {
  const [state, setState] = useState<ScrollVelocity>({
    velocity: 0,
    delta: 0,
    direction: 0,
    scrollY: 0,
  });

  const lastY = useRef(0);
  const rafId = useRef(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const currentY = window.scrollY;
    const delta = Math.abs(currentY - lastY.current);
    const direction = currentY > lastY.current ? 1 : currentY < lastY.current ? -1 : 0;

    // Cap velocity at 200px/frame for normalization
    const MAX_DELTA = 200;
    const velocity = Math.min(delta / MAX_DELTA, 1);

    setState({ velocity, delta, direction, scrollY: currentY });
    lastY.current = currentY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(() => {
          update();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return state;
}
