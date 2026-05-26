import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { caseStudies } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return { title: "Case Study" };
  return {
    title: `${study.title} — Case Study`,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  return (
    <article className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <span
          className="text-xs font-mono uppercase tracking-widest mb-4 block"
          style={{ color: study.accentColor }}
        >
          {study.industry} · {study.year}
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
          {study.title}
        </h1>
        <p className="text-[#6b7280] text-lg mb-10">{study.subtitle}</p>

        <p className="text-[#a8a8b3] leading-relaxed mb-12">{study.description}</p>

        <section className="mb-10">
          <h2 className="text-white font-semibold text-lg mb-3">Challenge</h2>
          <p className="text-[#94a3b8] leading-relaxed">{study.challenge}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-white font-semibold text-lg mb-3">Approach</h2>
          <ul className="space-y-2">
            {study.approach.map((item) => (
              <li key={item} className="flex gap-3 text-[#94a3b8] text-sm">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: study.accentColor }}
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-white font-semibold text-lg mb-3">Results</h2>
          <ul className="space-y-2">
            {study.results.map((item) => (
              <li key={item} className="text-[#94a3b8] text-sm">
                ✓ {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-2 mb-10">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs border border-white/10 text-[#a8a8b3]"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={study.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{
            background: `linear-gradient(135deg, ${study.accentColor}, ${study.accentColor}99)`,
          }}
        >
          View live site
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}
