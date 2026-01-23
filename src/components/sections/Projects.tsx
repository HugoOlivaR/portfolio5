import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Projects() {
  const t = useTranslations("projects");
  const projects = t.raw("items") as Array<{
    slug: string;
    title: string;
    link: string;
    description: string;
    tags: string[];
    image: string;
  }>;

  return (
    <section id="projects" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">{t("title")}</h2>
        <Link
          href="/projects"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
        >
          {t("viewAll")}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="grid gap-12">
        {projects.slice(0, 3).map((project) => (
          <div
            key={project.slug}
            className="block hover:border-text-secondary transition-colors space-y-3"
          >
            {project.image && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>
            )}
            <h3 className="font-medium text-text-primary">{project.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
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
            <div className="flex items-center gap-4">
              <Link href={`/projects/${project.slug}`} className="text-sm text-text-primary transition-colors underline">
                {t("readMore")}
              </Link>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-text-primary transition-colors flex items-center gap-1">
                {t("viewProject")} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
