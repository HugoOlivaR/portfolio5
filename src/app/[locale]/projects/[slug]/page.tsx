import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import SimpleFooter from "@/components/layout/SimpleFooter";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hugooliva.com";

type Project = {
  slug: string;
  title: string;
  year: string;
  image: string;
  description: string;
  content: string;
  tags: string[];
  link: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations("projects");
  const projects = t.raw("items") as Project[];
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  const url = `${BASE_URL}/${locale}/projects/${slug}`;
  const title = `${project.title} | Proyecto de Hugo Oliva`;
  const description =
    project.description ||
    "Proyecto desarrollado por Hugo Oliva, ingeniero full‑stack especializado en productos AI‑native.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: project.image
        ? [
            {
              url: project.image,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const projects = t.raw("items") as Project[];

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-3xl px-6 py-12">
        <div className="mb-8">
          <Link
            href="/projects"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
          >
            <span aria-hidden="true">&larr;</span>
            {t("backToProjects")}
          </Link>
        </div>
        <article className="space-y-6">
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
          <header className="space-y-4">
            <div className="flex items-center gap-2 justify-between">
            <h1 className="text-3xl font-bold text-text-primary">{project.title}</h1>
              <span className="text-sm text-text-secondary">{project.year}</span>
            </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-text-primary transition-colors flex items-center gap-1">
                {project.link} <ExternalLink className="w-3 h-3" />
              </a>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-bg-secondary text-text-secondary rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <div className="prose prose-invert max-w-none">
            {project.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-text-secondary leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
        <SimpleFooter />
      </div>
    </div>
  );
}
