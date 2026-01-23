import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import SimpleFooter from "@/components/layout/SimpleFooter";

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
        <h1 className="text-3xl font-bold text-text-primary mb-8">{t("title")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block space-y-4"
            >
              {project.image && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
              )}
              <h2 className="text-xl font-medium text-text-primary">
                {project.title}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {project.description}
              </p>
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
              <span className="text-sm text-accent">{t("viewProject")} &rarr;</span>
            </Link>
          ))}
        </div>
        <SimpleFooter />
      </div>
    </div>
  );
}
