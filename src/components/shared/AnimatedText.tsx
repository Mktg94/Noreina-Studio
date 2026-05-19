"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
  type?: "words" | "chars" | "lines";
}

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  once = true,
  as: Tag = "span",
  type = "words",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: "-10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
    else if (!once) controls.start("hidden");
  }, [isInView, controls, once]);

  const words = text.split(" ");
  const chars = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: type === "chars" ? 0.03 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: "100%", rotateX: -20 },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (type === "chars") {
    return (
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={`inline-block overflow-hidden ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={itemVariants}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  return (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-none">
          <motion.span className="inline-block" variants={itemVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
