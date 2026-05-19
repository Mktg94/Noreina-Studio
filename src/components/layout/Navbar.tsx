"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { mobileMenuVariants, staggerItem, staggerContainer } from "@/lib/animations";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[9990] transition-all duration-500",
          scrolled
            ? "glass border-b border-white/5 py-3"
            : "bg-transparent py-5"
        )}
        style={scrolled ? { backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 group"
            data-cursor="pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" opacity="0.95" />
                <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="white" opacity="0.3" />
              </svg>
            </motion.div>
            <div>
              <span className="text-white font-semibold text-sm tracking-tight leading-none block">
                Noreina<span className="text-blue-400">.</span>
              </span>
              <span className="text-[#6b7280] text-[10px] tracking-widest uppercase leading-none">Studio</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className={cn(
                  "px-4 py-2 text-sm rounded-lg transition-all duration-200 animated-underline",
                  activeSection === href
                    ? "text-white"
                    : "text-[#6b7280] hover:text-white"
                )}
                data-cursor="pointer"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick("#contact")}
              className="px-5 py-2.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 transition-all duration-300 glow-blue-sm"
              data-cursor="pointer"
            >
              Let&apos;s Talk
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-cursor="pointer"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-5 h-px bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 right-0 w-full max-w-sm z-[9989] glass-strong border-l border-white/5 flex flex-col pt-24 pb-8 px-8"
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1"
            >
              {navLinks.map(({ href, label }) => (
                <motion.button
                  key={href}
                  variants={staggerItem}
                  onClick={() => handleNavClick(href)}
                  className="text-left text-2xl font-medium text-white/80 hover:text-white py-3 border-b border-white/5 last:border-0 transition-colors"
                  data-cursor="pointer"
                >
                  {label}
                </motion.button>
              ))}
            </motion.nav>

            <motion.div
              variants={staggerItem}
              className="mt-auto"
            >
              <button
                onClick={() => handleNavClick("#contact")}
                className="w-full py-4 text-center font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 mt-6"
                data-cursor="pointer"
              >
                Let&apos;s Work Together
              </button>
              <p className="text-center text-[#6b7280] text-xs mt-4">
                Based in Ethiopia · Available Worldwide
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[9988] bg-black/60 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
