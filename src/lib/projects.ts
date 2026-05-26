export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  description: string;
  challenge: string;
  approach: string[];
  results: string[];
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
    stack: ["Next.js", "MongoDB", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://spotless-beauty.vercel.app/",
    accentColor: "#a855f7",
    year: "2025",
  },
};

export const clientLogos = [
  { name: "Hamernassa", industry: "Healthcare" },
  { name: "Spotless Skin Lab", industry: "Beauty" },
  { name: "Price Tracker", industry: "SaaS" },
];
