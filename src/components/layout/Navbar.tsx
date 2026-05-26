"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

interface MagneticLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  index: number;
  onClick: (href: string) => void;
}

function MagneticLink({ href, label, isActive, index, onClick }: MagneticLinkProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave, { passive: true });
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  return (
    <button
      ref={ref}
      onClick={() => onClick(href)}
      className={cn(
        "relative px-4 py-2 text-sm rounded-lg transition-all duration-300 font-sans font-medium select-none z-10 group",
        "hover:text-white",
        isActive ? "text-white" : "text-[#6b7280]"
      )}
      data-cursor="pointer"
      style={{ willChange: "transform" }}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        <span className="text-[10px] font-mono text-blue-500/60 font-semibold tracking-widest transition-colors duration-300 group-hover:text-blue-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        {label}
      </span>
      <span
        className={cn(
          "absolute inset-0 rounded-lg transition-all duration-400 -z-0",
          isActive
            ? "bg-white/[0.06] border border-white/[0.08]"
            : "bg-transparent group-hover:bg-white/[0.03]"
        )}
      />
      {isActive && (
        <span className="absolute -bottom-px left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
      )}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/50 backdrop-blur-2xl border-b border-white/[0.04] py-3"
            : "bg-transparent py-6"
        )}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-120%)",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group"
            data-cursor="pointer"
          >
            <div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" opacity="0.95" />
                <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="white" opacity="0.3" />
              </svg>
            </div>
            <div className="flex items-center">
              <span className="text-white font-semibold text-sm tracking-tight leading-none">
                Noreina<span className="text-blue-400">.</span>
              </span>
              <span
                className={cn(
                  "text-[#6b7280] text-[10px] tracking-widest uppercase leading-none ml-1.5 overflow-hidden transition-all duration-500",
                  scrolled ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-[60px]"
                )}
              >
                Studio
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map(({ href, label }, index) => (
              <MagneticLink
                key={href}
                href={href}
                label={label}
                isActive={activeSection === href}
                index={index}
                onClick={handleNavClick}
              />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick("#contact")}
              className="relative px-5 py-2.5 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-300 group"
              data-cursor="pointer"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift" />
              <span className="relative z-10 flex items-center gap-2">
                Let&apos;s Talk
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>

          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-300 hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-cursor="pointer"
          >
            <div className="relative w-5 h-4">
              <span
                className={cn(
                  "absolute left-0 block w-full h-px bg-white transition-all duration-300",
                  mobileOpen ? "top-1/2 rotate-45" : "top-0"
                )}
                style={{ transformOrigin: "center" }}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 block w-full h-px bg-white transition-all duration-300",
                  mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block w-full h-px bg-white transition-all duration-300",
                  mobileOpen ? "top-1/2 -rotate-45" : "top-full"
                )}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />

          <nav
            className="relative w-full flex flex-col justify-center items-center px-8"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-5 w-full max-w-sm">
              {navLinks.map(({ href, label }, index) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={cn(
                    "group flex items-center gap-4 text-left w-full py-3 transition-all duration-300",
                    activeSection === href ? "text-white" : "text-white/40 hover:text-white/70"
                  )}
                  data-cursor="pointer"
                  style={{
                    animation: `mobileNavFadeIn 0.5s ${0.08 * index}s both cubic-bezier(0.16, 1, 0.3, 1)`,
                  }}
                >
                  <span className="text-[11px] font-mono font-semibold tracking-widest text-blue-500/60 w-8 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight leading-none">
                    {label}
                  </span>
                  <span className={cn(
                    "ml-auto w-6 h-px transition-all duration-500",
                    activeSection === href
                      ? "bg-blue-400/60 w-12"
                      : "bg-white/10 group-hover:w-10 group-hover:bg-white/20"
                  )} />
                </button>
              ))}

              <div
                className="mt-8 pt-8 border-t border-white/[0.04] w-full flex flex-col gap-4"
                style={{
                  animation: `mobileNavFadeIn 0.5s ${0.08 * navLinks.length + 0.15}s both cubic-bezier(0.16, 1, 0.3, 1)`,
                }}
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="relative w-full py-4 text-center font-medium text-white rounded-xl overflow-hidden group active:scale-[0.98] transition-transform duration-200"
                  data-cursor="pointer"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600" />
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                  <span className="relative z-10">Start a Project</span>
                </button>
                <p className="text-center text-[#6b7280] text-xs font-sans tracking-wide">
                  Ethiopia · Remote · Worldwide
                </p>
              </div>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @keyframes mobileNavFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
