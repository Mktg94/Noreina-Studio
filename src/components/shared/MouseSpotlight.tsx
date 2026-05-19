"use client";

import { useRef, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function MouseSpotlight() {
  const { x, y } = useMousePosition();
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.left = `${x}px`;
      spotlightRef.current.style.top = `${y}px`;
    }
  }, [x, y]);

  return (
    <div
      ref={spotlightRef}
      className="spotlight hidden md:block"
      aria-hidden="true"
    />
  );
}
