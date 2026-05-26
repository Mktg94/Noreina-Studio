export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Noreina Studio",
        url: "https://noreina.studio",
        jobTitle: "Full-Stack Web Developer",
        description:
          "Ethiopia-based full-stack developer building modern websites, ecommerce platforms, and business systems.",
        knowsAbout: ["Next.js", "TypeScript", "React", "Web Development", "UI/UX"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Addis Ababa",
          addressCountry: "ET",
        },
      },
      {
        "@type": "ProfessionalService",
        name: "Noreina Studio",
        url: "https://noreina.studio",
        description: "Web development and digital product studio",
        areaServed: "Worldwide",
        priceRange: "$$",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
