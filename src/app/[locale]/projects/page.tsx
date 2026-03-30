import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import SimpleFooter from "@/components/layout/SimpleFooter";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hugooliva.com";

export const metadata: Metadata = {
  title: "Proyectos full‑stack y AI-native | Hugo Oliva",
  description:
    "Selección de proyectos reales desarrollados por Hugo Oliva: productos full‑stack, integraciones de IA y herramientas de productividad.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/projects`,
    title: "Proyectos full‑stack y AI-native | Hugo Oliva",
    description:
      "Explora proyectos de finanzas con IA, asistentes de productividad, herramientas de pensamiento y más.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos full‑stack y AI-native | Hugo Oliva",
    description:
      "Portfolio de proyectos que combinan desarrollo full‑stack moderno con inteligencia artificial aplicada.",
  },
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const projects = t.raw("items") as Array<{
    slug: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    image: string;
    category: string;
  }>;

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-3xl px-6 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
          >
            <span aria-hidden="true">&larr;</span>
            {t("backToHome")}
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-8">
          {t("title")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="space-y-4 hover:scale-105 duration-200"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block space-y-4"
              >
                {project.image && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h2 className="text-xl font-medium text-text-primary">
                  {project.title}
                </h2>
              </Link>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-primary transition-colors flex items-center gap-1"
              >
                {project.link} <ExternalLink className="w-3 h-3" />
              </a>

              <Link
                href={`/projects/${project.slug}`}
                className="block space-y-4"
              >
                <p className="text-text-secondary leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.category && (
                    <span className="text-xs px-2 py-1 bg-bg-secondary text-green-500 border border-green-500 rounded">
                      {project.category}
                    </span>
                  )}
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border border-border px-2 py-1 bg-bg-secondary text-text-secondary rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <SimpleFooter />
      </div>
    </div>
  );
}
