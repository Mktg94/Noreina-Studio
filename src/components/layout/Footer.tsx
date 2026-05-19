"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";
import { Mail, ArrowUpRight, Zap } from "lucide-react";

// Inline brand icons (lucide-react v1 removed brand icons)
const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => <Mail size={14} />;

const socials = [
  {
    Icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/Mktg94",
    id: "footer-github",
  },
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://linkedin.com",
    id: "footer-linkedin",
  },
  {
    Icon: MailIcon,
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
              {socials.map(({ Icon, label, href, id }) => (
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
                    <Icon />
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
