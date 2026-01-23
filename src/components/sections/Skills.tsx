import { useTranslations } from "next-intl";

export default function Skills() {
  const t = useTranslations("skills");
  const categories = t.raw("categories") as {
    frontend: string[];
    backend: string[];
  };

  const skillGroups = [
    { key: "frontend", title: t("frontend"), skills: categories.frontend },
    { key: "backend", title: t("backend"), skills: categories.backend },
  ];

  return (
    <section id="skills" className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">{t("title")}</h2>
      <div className="space-y-4">
        {skillGroups.map((group) => (
          <div key={group.key} className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm px-3 py-1 border border-border rounded-full text-text-primary hover:bg-bg-secondary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
