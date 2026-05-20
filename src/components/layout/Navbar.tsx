"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About", num: "01" },
  { href: "#projects", label: "Projects", num: "02" },
  { href: "#services", label: "Services", num: "03" },
  { href: "#process", label: "Process", num: "04" },
  { href: "#stack", label: "Stack", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

// Reusable physics-based magnetic link wrapper
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // 35% magnetic attraction
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove, { passive: true });
      el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }
    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.15 }}
      className="relative flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  // Smart Show/Hide Navbar on Scroll direction + Background state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for background styling
      setScrolled(currentScrollY > 40);

      // Hide or reveal navigation bar
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Handle smooth scroll clicks
  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -80,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-white/5 py-2.5 bg-black/40 backdrop-blur-2xl"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo with Morph Animation on scroll */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group"
            data-cursor="pointer"
          >
            <motion.div
              animate={{
                scale: scrolled ? 0.9 : 1,
                rotate: scrolled ? 45 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" opacity="0.95" />
                <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="white" opacity="0.3" />
              </svg>
            </motion.div>
            <div className="flex items-center">
              <span className="text-white font-semibold text-sm tracking-tight leading-none">
                Noreina<span className="text-blue-400">.</span>
              </span>
              <motion.span
                animate={{
                  opacity: scrolled ? 0 : 1,
                  x: scrolled ? -8 : 0,
                  width: scrolled ? 0 : "auto",
                }}
                transition={{ duration: 0.3 }}
                className="text-[#6b7280] text-[10px] tracking-widest uppercase leading-none ml-1.5 overflow-hidden block"
              >
                Studio
              </motion.span>
            </div>
          </a>

          {/* Desktop Navigation Links with Magnetic Attraction & Sliding Background Indicator */}
          <nav className="hidden md:flex items-center gap-1.5 relative" role="navigation" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => {
              const isActive = activeSection === href;
              return (
                <Magnetic key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className={cn(
                      "relative px-4 py-2 text-sm rounded-lg transition-colors duration-300 font-sans font-medium select-none z-10",
                      isActive ? "text-white font-semibold" : "text-[#6b7280] hover:text-white"
                    )}
                    data-cursor="pointer"
                  >
                    {/* Active Sliding Background Capsule */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-white/5 rounded-lg border border-white/8 -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 26 }}
                      />
                    )}
                    {label}
                  </button>
                </Magnetic>
              );
            })}
          </nav>

          {/* CTA with Magnetic Effect */}
          <div className="hidden md:flex items-center gap-3">
            <Magnetic>
              <button
                onClick={() => handleNavClick("#contact")}
                className="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 transition-all duration-300 glow-blue-sm shadow-md"
                data-cursor="pointer"
              >
                Let&apos;s Talk
              </button>
            </Magnetic>
          </div>

          {/* Mobile hamburger menu button */}
          <button
            id="mobile-menu-btn"
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-cursor="pointer"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
              className="block w-5 h-px bg-white transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-5 h-px bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7, backgroundColor: "#ffffff" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
              className="block w-5 h-px bg-white"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Full-Screen Takeover with Staggered Links */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl flex flex-col justify-center items-center px-8"
          >
            {/* Background elements */}
            <div className="absolute inset-0 dot-grid opacity-5 pointer-events-none" />

            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.15,
                  },
                },
                hidden: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
              className="flex flex-col gap-6 w-full max-w-md"
            >
              {navLinks.map(({ href, label, num }) => (
                <motion.div
                  key={href}
                  variants={{
                    hidden: { opacity: 0, y: 30, rotateX: -20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { type: "spring", stiffness: 120, damping: 15 },
                    },
                  }}
                  className="w-full"
                >
                  <button
                    onClick={() => handleNavClick(href)}
                    className="flex items-baseline gap-4 text-left w-full text-4xl sm:text-5xl font-bold tracking-tight text-white/80 hover:text-white transition-colors py-2 font-sans select-none"
                    data-cursor="pointer"
                  >
                    <span className="text-xs font-mono font-semibold tracking-wider text-blue-500">
                      {num}
                    </span>
                    <span>{label}</span>
                  </button>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
                }}
                className="mt-8 pt-8 border-t border-white/5 w-full flex flex-col gap-4"
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full py-4 text-center font-medium text-white rounded-xl bg-linear-to-r from-blue-600 to-purple-600 glow-blue-sm active:scale-95 transition-transform"
                  data-cursor="pointer"
                >
                  Let&apos;s Work Together
                </button>
                <p className="text-center text-[#6b7280] text-xs font-sans tracking-wide">
                  Ethiopia · Remote · Available Worldwide
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
