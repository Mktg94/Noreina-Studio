"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { Send, Mail, MessageCircle, CheckCircle, AlertCircle, Loader2, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef as React.RefObject<Element>, { once: true, margin: "-10% 0px" });
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      aria-label="Contact"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6" ref={contentRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-8 h-px bg-blue-400/50" />
            Get In Touch
            <span className="w-8 h-px bg-blue-400/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            Let&apos;s build something
            <span className="gradient-text-blue"> modern together.</span>
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            Have a project in mind? Let&apos;s talk about how I can help bring your idea to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Direct contact buttons */}
            <a
              href="mailto:hello@noreina.studio"
              id="contact-email-btn"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300"
              data-cursor="pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Mail size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="text-[#6b7280] text-xs mb-0.5">Email me</div>
                <div className="text-white text-sm font-medium">michaelabrham9@gmail.com</div>
              </div>
            </a>

            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
              data-cursor="pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                <Calendar size={20} className="text-violet-400" />
              </div>
              <div>
                <div className="text-[#6b7280] text-xs mb-0.5">Book a call</div>
                <div className="text-white text-sm font-medium">Schedule 20 min · Cal.com</div>
              </div>
            </a>

            <a
              href="https://wa.me/+251921786034"
              id="contact-whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300"
              data-cursor="pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <MessageCircle size={20} className="text-green-400" />
              </div>
              <div>
                <div className="text-[#6b7280] text-xs mb-0.5">WhatsApp</div>
                <div className="text-white text-sm font-medium">+251 921 786 034</div>
              </div>
            </a>

            {/* Availability */}
            <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-green-400 text-sm font-medium">Currently Available</span>
              </div>
              <p className="text-[#6b7280] text-xs leading-relaxed">
                I&apos;m open to freelance projects and long-term collaborations.
                Response time is usually within 24 hours.
              </p>
            </div>

            {/* Location */}
            <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/5">
              <div className="text-[#6b7280] text-xs mb-1 tracking-widest uppercase">Based in</div>
              <div className="text-white font-medium flex items-center gap-2">
                🇪🇹 <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="text-[#6b7280] text-xs mt-1">Available for remote work worldwide</div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`rounded-3xl p-8 bg-[#0a0a0a] border border-white/5 transition-shadow duration-500 ${
                status === "success" ? "success-flash" : ""
              }`}
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-[#a8a8b3] text-xs mb-2 tracking-wide">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    {...register("name")}
                    placeholder="John Doe"
                    className="premium-input w-full px-4 py-3 text-sm"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-[#a8a8b3] text-xs mb-2 tracking-wide">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email")}
                    placeholder="hello@company.com"
                    className="premium-input w-full px-4 py-3 text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Company */}
              <div className="mb-4">
                <label htmlFor="contact-company" className="block text-[#a8a8b3] text-xs mb-2 tracking-wide">
                  Company / Project (Optional)
                </label>
                <input
                  id="contact-company"
                  {...register("company")}
                  placeholder="Your company or project name"
                  className="premium-input w-full px-4 py-3 text-sm"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="contact-message" className="block text-[#a8a8b3] text-xs mb-2 tracking-wide">
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project, goals, and timeline..."
                  className="premium-input w-full px-4 py-3 text-sm resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                id="contact-submit-btn"
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={status === "idle" ? { scale: 1.02, y: -2 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                className="w-full py-4 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
                style={{
                  background:
                    status === "success"
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : status === "error"
                        ? "linear-gradient(135deg, #ef4444, #dc2626)"
                        : "linear-gradient(135deg, #3b82f6, #2563eb, #7c3aed)",
                  boxShadow:
                    status === "idle"
                      ? "0 0 30px rgba(59,130,246,0.2), 0 0 60px rgba(59,130,246,0.05)"
                      : "none",
                }}
                data-cursor="pointer"
              >
                {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                {status === "success" && <CheckCircle size={16} />}
                {status === "error" && <AlertCircle size={16} />}
                {status === "idle" && <Send size={16} />}

                {status === "loading" && "Sending..."}
                {status === "success" && "Message Sent!"}
                {status === "error" && "Failed — Try Again"}
                {status === "idle" && "Send Message"}
              </motion.button>

              <p className="text-center text-[#6b7280] text-xs mt-4">
                I typically respond within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
