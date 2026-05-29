import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import type {
  DetailLabels,
  ProjectDetailData,
  RelatedProject,
} from "@/components/projects/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hugooliva.com";

type Project = ProjectDetailData;

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
  const labels = t.raw("detail") as DetailLabels;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const related: RelatedProject[] = projects
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      year: p.year,
      image: p.image,
      description: p.tagline ?? p.description,
    }));

  return (
    <ProjectDetail
      project={project}
      labels={labels}
      related={related}
      backLabel={t("backToProjects")}
    />
  );
}
