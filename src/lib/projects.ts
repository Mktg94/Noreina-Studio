import type { LucideIcon } from "lucide-react";
import { Building2, ShoppingBag, BarChart3 } from "lucide-react";

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  description: string;
  challenge: string;
  approach: string[];
  results: string[];
  role: string;
  timeline: string;
  outcomes: string[];
  stack: string[];
  liveUrl: string;
  accentColor: string;
  year: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  hamernassa: {
    slug: "hamernassa",
    title: "Hamernassa",
    subtitle: "Medical & Pharmaceutical Import",
    industry: "Healthcare · Corporate",
    description:
      "A high-end corporate website for a medical and pharmaceutical import company operating in Ethiopia.",
    challenge:
      "The client needed a trustworthy digital presence that communicates professionalism in the medical sector while showcasing products and company credibility.",
    approach: [
      "Structured information architecture for products and company profile",
      "Clean corporate UI with strong typography and whitespace",
      "Performance-focused Next.js build with SEO-ready metadata",
      "Contact flow integrated for B2B enquiries",
    ],
    results: [
      "Live production site deployed on Vercel",
      "Professional brand presentation for medical sector",
      "Fast, mobile-responsive experience",
    ],
    role: "Design + full-stack build",
    timeline: "2–3 weeks",
    outcomes: ["Trust-first corporate UI", "Mobile-first layout", "B2B enquiry flow"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
    liveUrl: "https://hamernassa.vercel.app/",
    accentColor: "#3b82f6",
    year: "2025",
  },
  spotless: {
    slug: "spotless",
    title: "Spotless Skin Lab",
    subtitle: "Luxury Cosmetics Ecommerce",
    industry: "Beauty · Ecommerce",
    description:
      "A luxury beauty ecommerce platform with premium product presentation and full shopping functionality.",
    challenge:
      "Build an ecommerce experience that matches international beauty brand standards while remaining fast and maintainable.",
    approach: [
      "Luxury visual language with product-first layouts",
      "Cart, checkout, and admin-ready architecture",
      "MongoDB-backed product and order data",
      "Responsive design across all device sizes",
    ],
    results: [
      "Full ecommerce flow with premium UI",
      "Admin dashboard for order management",
      "Deployed and accessible worldwide",
    ],
    role: "Full-stack build",
    timeline: "3–5 weeks",
    outcomes: ["Luxury brand UI", "Product-first UX", "Ecommerce-ready architecture"],
    stack: ["Next.js", "MongoDB", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://spotless-beauty.vercel.app/",
    accentColor: "#a855f7",
    year: "2025",
  },
};

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  description: string;
  highlights: string[];
  stack: string[];
  status: "Live" | "In Development";
  gradient: string;
  borderGlow: string;
  accentColor: string;
  icon: LucideIcon;
  liveUrl: string;
  caseUrl: string | null;
  num: string;
  role: string;
  timeline: string;
  outcomes: string[];
  featured?: boolean;
}

function fromCaseStudy(study: CaseStudy, extras: Partial<PortfolioProject>): PortfolioProject {
  return {
    id: study.slug,
    title: study.title,
    subtitle: study.subtitle,
    industry: study.industry,
    description: study.description,
    highlights: study.outcomes,
    stack: study.stack,
    status: "Live",
    gradient: extras.gradient ?? "from-blue-500/20 via-blue-400/5 to-transparent",
    borderGlow: extras.borderGlow ?? "rgba(59,130,246,0.3)",
    accentColor: study.accentColor,
    icon: extras.icon ?? Building2,
    liveUrl: study.liveUrl,
    caseUrl: `/work/${study.slug}`,
    num: extras.num ?? "01",
    role: study.role,
    timeline: study.timeline,
    outcomes: study.outcomes,
    featured: extras.featured,
  };
}

export const portfolioProjects: PortfolioProject[] = [
  fromCaseStudy(caseStudies.hamernassa, {
    num: "01",
    featured: true,
    gradient: "from-blue-500/20 via-blue-400/5 to-transparent",
    borderGlow: "rgba(59,130,246,0.3)",
    icon: Building2,
    highlights: [
      "Clean corporate UI design",
      "Product & equipment showcase",
      "Professional company branding",
      "Modern business presentation",
    ],
  }),
  fromCaseStudy(caseStudies.spotless, {
    num: "02",
    gradient: "from-purple-500/20 via-pink-400/5 to-transparent",
    borderGlow: "rgba(168,85,247,0.3)",
    icon: ShoppingBag,
    highlights: [
      "Luxury beauty aesthetic",
      "Full ecommerce functionality",
      "Premium product presentation",
      "Admin dashboard & order management",
    ],
  }),
  {
    id: "pricetracker",
    title: "Price Tracker",
    subtitle: "Smart Product Price Intelligence",
    industry: "SaaS · Analytics",
    description:
      "A smart price tracking platform that monitors product prices across ecommerce stores, gives alerts, and provides analytics dashboards.",
    highlights: [
      "Multi-platform price scraping",
      "Smart alert system",
      "Analytics dashboard",
      "SaaS-ready architecture",
    ],
    stack: ["Next.js", "Python", "PostgreSQL", "Chart.js"],
    status: "In Development",
    gradient: "from-cyan-500/20 via-blue-400/5 to-transparent",
    borderGlow: "rgba(6,182,212,0.3)",
    accentColor: "#06b6d4",
    icon: BarChart3,
    liveUrl: "https://price-tracker-with-cursor-web-app.vercel.app/",
    caseUrl: null,
    num: "03",
    role: "Solo build",
    timeline: "Ongoing",
    outcomes: ["Live demo deployed", "Scraping pipeline", "Dashboard UI"],
  },
];

export const featuredProject = portfolioProjects.find((p) => p.featured) ?? portfolioProjects[0];

export const clientLogos = [
  { name: "Hamernassa", industry: "Healthcare" },
  { name: "Spotless Skin Lab", industry: "Beauty" },
  { name: "Price Tracker", industry: "SaaS" },
];
