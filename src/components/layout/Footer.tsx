"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";
import { Github, Linkedin, Mail, ArrowUpRight, Zap } from "lucide-react";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
    id: "footer-github",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    id: "footer-linkedin",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hello@noreina.studio",
    id: "footer-email",
  },
];

const footerLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 overflow-hidden" role="contentinfo">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-500/5 blur-[80px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" opacity="0.95" />
                  <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="white" opacity="0.3" />
                </svg>
              </div>
              <div>
                <span className="text-white font-semibold text-sm tracking-tight leading-none block">
                  Noreina<span className="text-blue-400">.</span>
                </span>
                <span className="text-[#6b7280] text-[10px] tracking-widest uppercase">Studio</span>
              </div>
            </div>
            <p className="text-[#6b7280] text-sm leading-relaxed max-w-xs">
              Building modern digital experiences for businesses. Ethiopia-based, world-class delivery.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2 mt-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[#6b7280] text-xs">Available for new projects</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className="text-[#6b7280] hover:text-white text-sm transition-colors animated-underline"
                    data-cursor="pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">Connect</h3>
            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, href, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#6b7280] hover:text-white transition-colors group"
                  data-cursor="pointer"
                >
                  <div className="w-8 h-8 rounded-lg glass border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all">
                    <Icon size={14} />
                  </div>
                  <span className="text-sm">{label}</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6b7280] text-xs">
            © {new Date().getFullYear()} Noreina Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[#6b7280] text-xs">
            <Zap size={10} className="text-blue-400" />
            <span>Built with Next.js · Deployed on Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
