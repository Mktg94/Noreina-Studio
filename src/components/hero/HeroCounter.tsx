"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";

interface HeroCounterProps {
  value: string;
  label: string;
  delay?: number;
}

export default function HeroCounter({ value, label, delay = 0 }: HeroCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Match digits
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      // Non-numeric value (like ∞)
      setDisplayValue("0");
      gsap.to(numRef.current, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          setDisplayValue(value);
          gsap.fromTo(numRef.current,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              delay,
            }
          );
        },
      });
      return;
    }

    const targetNumber = parseInt(match[1], 10);
    const suffix = match[2] || "";

    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetNumber,
      duration: 2,
      ease: "power3.out",
      delay,
      onUpdate: () => {
        setDisplayValue(Math.floor(obj.val).toString() + suffix);
      },
    });
  }, [value, isInView, delay]);

  return (
    <div ref={containerRef} className="text-center min-w-[120px]">
      <div className="text-3xl md:text-4xl font-bold tracking-tight text-white font-sans counter-num select-none">
        <span ref={numRef} className="inline-block gradient-text-blue">
          {displayValue}
        </span>
      </div>
      <div className="text-[#a8a8b3]/60 text-xs md:text-sm mt-2 tracking-wide uppercase font-medium">
        {label}
      </div>
    </div>
  );
}
