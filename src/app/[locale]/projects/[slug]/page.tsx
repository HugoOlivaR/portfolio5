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

import { routing } from "@/i18n/routing";
import { JsonLd, breadcrumbNode } from "@/lib/jsonld";
import { ID, absoluteUrl, localeUrl, pageMetadata } from "@/lib/site";

type Project = ProjectDetailData;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const t = await getTranslations({ locale, namespace: "projects" });
    for (const p of t.raw("items") as Project[]) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const projects = t.raw("items") as Project[];
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${project.title} · ${(t.raw("detail") as DetailLabels).caseStudy}`,
    description: project.description,
    image: project.image,
    imageAlt: project.title,
  });
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

  const seo = await getTranslations({ locale, namespace: "seo" });
  const url = localeUrl(locale, `/projects/${slug}`);

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "CreativeWork",
            "@id": `${url}#work`,
            name: project.title,
            headline: project.tagline ?? project.title,
            description: project.description,
            url,
            inLanguage: locale,
            image: absoluteUrl(project.image),
            dateCreated: project.year?.match(/\d{4}/)?.[0],
            keywords: project.tags?.join(", "),
            creator: { "@id": ID.person },
            author: { "@id": ID.person },
            isPartOf: { "@id": ID.website },
            ...(project.link ? { sameAs: project.link } : {}),
          },
          breadcrumbNode([
            { name: seo("breadcrumbHome"), url: localeUrl(locale) },
            { name: t("title"), url: localeUrl(locale, "/projects") },
            { name: project.title, url },
          ]),
        ]}
      />
      <ProjectDetail
      project={project}
      labels={labels}
      related={related}
      backLabel={t("backToProjects")}
      />
    </>
  );
}
