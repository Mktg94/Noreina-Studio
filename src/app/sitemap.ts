import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://noreina.studio";

  const workPages = Object.keys(caseStudies).map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...workPages,
  ];
}
