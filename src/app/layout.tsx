import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/shared/LoadingScreen";
import CustomCursor from "@/components/shared/CustomCursor";
import ScrollProgress from "@/components/shared/ScrollProgress";
import SmoothScroll from "@/components/shared/SmoothScroll";
import MouseSpotlight from "@/components/shared/MouseSpotlight";
import JsonLd from "@/components/shared/JsonLd";
import SectionAmbient from "@/components/shared/SectionAmbient";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Noreina Studio — Full-Stack Web Developer",
    template: "%s | Noreina Studio",
  },
  description:
    "Ethiopia-based full-stack developer building modern websites, ecommerce platforms, and business systems for companies worldwide. Specializing in Next.js, TypeScript, and premium UI/UX.",
  keywords: [
    "full-stack developer",
    "web developer Ethiopia",
    "Next.js developer",
    "TypeScript",
    "modern websites",
    "ecommerce development",
    "business systems",
    "Noreina Studio",
    "web development",
    "UI/UX design",
  ],
  authors: [{ name: "Noreina Studio" }],
  creator: "Noreina Studio",
  metadataBase: new URL("https://noreina.studio"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noreina.studio",
    title: "Noreina Studio — Full-Stack Web Developer",
    description:
      "Building modern digital experiences for businesses. Ethiopia-based, world-class delivery.",
    siteName: "Noreina Studio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Noreina Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noreina Studio — Full-Stack Web Developer",
    description:
      "Building modern digital experiences for businesses. Ethiopia-based, world-class delivery.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <JsonLd />
      </head>
      <body className="bg-[#080808] text-white antialiased noise-overlay" suppressHydrationWarning>
        <LoadingScreen />
        <SmoothScroll>
          <SectionAmbient />
          <CustomCursor />
          <ScrollProgress />
          <MouseSpotlight />
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
