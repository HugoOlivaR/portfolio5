import { BASE_URL, ID, PERSON, SAME_AS, absoluteUrl, localeUrl } from "./site";
import type { ServiceData } from "@/components/services/types";

type Node = Record<string, unknown>;

/** Renders one JSON-LD block. `<` is escaped so content can't close the script tag. */
export function JsonLd({ data }: { data: Node | Node[] }) {
  const graph = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const serviceId = (locale: string, slug: string) =>
  `${localeUrl(locale, `/services/${slug}`)}#service`;

export function personNode({
  locale,
  jobTitle,
  description,
}: {
  locale: string;
  jobTitle: string;
  description: string;
}): Node {
  return {
    "@type": "Person",
    "@id": ID.person,
    name: PERSON.name,
    url: localeUrl(locale),
    image: absoluteUrl(PERSON.image),
    email: `mailto:${PERSON.email}`,
    jobTitle,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSON.city,
      addressCountry: PERSON.country,
    },
    worksFor: [
      {
        "@type": "Organization",
        name: "Tesora",
        url: "https://tesora.app",
        legalName: "TESORA Patrimonio SL",
      },
      { "@type": "Organization", name: "Musive", url: "https://musive.io" },
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: locale === "es" ? "Profesor de IA aplicada" : "Applied AI instructor",
        description:
          locale === "es"
            ? "Profesor colaborador en tres másteres de thePower: AI Maker, Desarrollo Agéntico y Full Stack con IA."
            : "Collaborating instructor in three master's programs at thePower: AI Maker, Agentic Development and Full Stack with AI.",
      },
      {
        "@type": "Occupation",
        name: "CTO",
        description: "Co-founder & CTO, Tesora",
      },
    ],
    affiliation: {
      "@type": "EducationalOrganization",
      name: "thePower",
      url: "https://thepower.education",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad a Distancia de Madrid (UDIMA)",
    },
    knowsAbout: [
      "Artificial intelligence",
      "Generative AI",
      "AI agents",
      "Agentic software development",
      "Claude Code",
      "OpenAI Codex",
      "Model Context Protocol (MCP)",
      "Retrieval-augmented generation (RAG)",
      "Large language models",
      "Process automation with n8n",
      "AI training for companies",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "React Native",
    ],
    knowsLanguage: ["es", "en"],
    sameAs: SAME_AS,
  };
}

export function websiteNode(locale: string, description: string): Node {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: BASE_URL,
    name: PERSON.name,
    description,
    inLanguage: locale,
    publisher: { "@id": ID.person },
    author: { "@id": ID.person },
  };
}

export function serviceNode(locale: string, service: ServiceData): Node {
  const url = localeUrl(locale, `/services/${service.slug}`);
  return {
    "@type": "Service",
    "@id": serviceId(locale, service.slug),
    name: service.title,
    serviceType: service.serviceType,
    description: service.metaDescription,
    url,
    inLanguage: locale,
    provider: { "@id": ID.person },
    areaServed: [
      { "@type": "Country", name: locale === "es" ? "España" : "Spain" },
      { "@type": "Place", name: "Remote" },
    ],
    audience: { "@type": "BusinessAudience", name: locale === "es" ? "Empresas" : "Companies" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: (service.formats ?? service.rows).map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.title, description: o.detail },
      })),
    },
  };
}

export function faqNode(faq: { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbNode(items: { name: string; url: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
