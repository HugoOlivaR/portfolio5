import { useTranslations } from "next-intl";
import ExperienceMore from "./ExperienceMore";

type Job = {
  title: string;
  company: string;
  period: string;
  highlights: string[];
  companyUrl: string;
};

// Jobs shown on the landing; the rest sit behind "show more".
const VISIBLE_JOBS = 3;

function JobItem({ job }: { job: Job }) {
  return (
    <div className="border-l-2 border-border pl-4 space-y-2">
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
      {/* Dot drawn with ::before, not list-disc: the native marker
          misaligns against the section's left border. */}
      <ul className="space-y-1.5">
        {job.highlights.map((highlight, i) => (
          <li
            key={i}
            className="relative pl-3.5 text-sm text-text-secondary leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-border"
          >
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  const t = useTranslations("experience");
  const jobs = t.raw("jobs") as Job[];
  const visible = jobs.slice(0, VISIBLE_JOBS);
  const older = jobs.slice(VISIBLE_JOBS);

  return (
    <section id="experience" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          {t("title")}
        </h2>
      </div>
      <div className="space-y-6">
        {visible.map((job, index) => (
          <JobItem key={index} job={job} />
        ))}
        {older.length > 0 && (
          <ExperienceMore showMore={t("showMore")} showLess={t("showLess")}>
            {older.map((job, index) => (
              <JobItem key={index} job={job} />
            ))}
          </ExperienceMore>
        )}
      </div>
    </section>
  );
}
