import { useTranslations } from "next-intl";

export default function Experience() {
  const t = useTranslations("experience");
  const jobs = t.raw("jobs") as Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    companyUrl: string;
  }>;

  return (
    <section id="experience" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          {t("title")}
        </h2>
      </div>
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <div key={index} className="border-l-2 border-border pl-4 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="font-medium text-text-primary">{job.title}</h3>
              <span className="text-sm text-text-secondary">{job.period}</span>
            </div>
            <p className="text-sm text-text-secondary">
              <a
                href={job.companyUrl || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {job.company}
              </a>
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
