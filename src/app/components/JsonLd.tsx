export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alvin Putra",
    url: "https://utaaa.my.id",
    image: "https:/utaaa.my.id/assets/profile/my.jpeg",
    jobTitle: "Mahasiswa Sistem Informasi / Frontend Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Nasional (UNAS)",
      url: "https://www.unas.ac.id/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      addressCountry: "Indonesia",
    },
    description:
      "Alvin Putra is a Frontend Developer and Information Systems student at Universitas Nasional (UNAS), Jakarta. Specializing in modern web technologies including Next.js, React, and TypeScript.",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Frontend Development",
      "Web Security",
      "UI/UX Design",
      "Search Engine Optimization (SEO)",
      "Generative Engine Optimization (GEO)",
    ],
    sameAs: [
      "https://github.com/tsubametaa",
      "https://linkedin.com/in/alvinputra12",
      "https://instagram.com/_alvinfputra_",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
