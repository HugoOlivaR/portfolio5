import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import HapticLink from "@/components/ui/HapticLink";
import ProjectTopBar from "@/components/projects/ProjectTopBar";
import type { ComItemData, ComLabels, RelatedComItem } from "./types";

/** Small caps label that opens every editorial section. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
      {children}
    </h2>
  );
}

/** Section wrapper: hairline rule, label, then content in the reading column. */
function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-8">
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ComunicacionDetail({
  item,
  labels,
  related,
  backLabel,
}: {
  item: ComItemData;
  labels: ComLabels;
  related: RelatedComItem[];
  backLabel: string;
}) {
  const site = item.link.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <ProjectTopBar backLabel={backLabel} backHref="/comunicacion" />

      {/* Single reading column — the opposite of the 12-col grid used for code. */}
      <main className="mx-auto max-w-[46rem] px-6 pb-24 md:px-8">
        {/* ── Masthead ─────────────────────────────────────────── */}
        <header className="pt-12 md:pt-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
            {item.kicker}
          </div>
          <h1 className="mt-5 font-serif text-[clamp(2.25rem,6vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.01em] text-text-primary text-balance">
            {item.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-text-secondary text-pretty">
            {item.tagline}
          </p>
          <div className="mt-8 h-px bg-border" />
          <dl className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-xs text-text-secondary">
            {item.role && (
              <div className="flex gap-2">
                <dt className="sr-only">{labels.role}</dt>
                <dd className="text-text-primary">{item.role}</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="sr-only">{labels.year}</dt>
              <dd>{item.year}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="sr-only">{labels.link}</dt>
              <dd>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 transition-colors hover:text-text-primary hover:decoration-text-primary"
                >
                  {site}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </dd>
            </div>
          </dl>
        </header>

        {/* ── Stats — bare row, no boxes ───────────────────────── */}
        {item.stats && item.stats.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
            {item.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-3xl font-medium leading-none text-text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Image ───────────────────────────────────────────── */}
        {item.image && (
          <div className="relative mt-12 aspect-[3/2] w-full overflow-hidden rounded-md border border-border">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 736px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-14 flex flex-col gap-14">
          {/* ── Narrative ─────────────────────────────────────── */}
          {item.intro && (
            <Section label={item.introTitle ?? labels.introTitle}>
              <div className="flex flex-col gap-5">
                {item.intro.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[1.0625rem] leading-[1.7] text-text-primary text-pretty"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Section>
          )}

          {/* ── Programs — teaching ───────────────────────────── */}
          {item.programs && item.programs.length > 0 && (
            <Section label={labels.programsTitle}>
              <ul className="flex flex-col">
                {item.programs.map((program) => {
                  const row = (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <span className="flex items-baseline gap-1.5 font-serif text-lg text-text-primary">
                          {program.name}
                          {program.link && (
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-text-secondary transition-colors group-hover:text-text-primary" />
                          )}
                        </span>
                        {program.detail && (
                          <span className="text-sm leading-relaxed text-text-secondary text-pretty">
                            {program.detail}
                          </span>
                        )}
                      </div>
                      {program.meta && (
                        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary sm:pt-2 sm:text-right">
                          {program.meta}
                        </span>
                      )}
                    </>
                  );
                  return (
                    <li
                      key={program.name}
                      className="border-b border-border py-5 first:pt-0 last:border-0 last:pb-0"
                    >
                      {program.link ? (
                        <a
                          href={program.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-8"
                        >
                          {row}
                        </a>
                      ) : (
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-8">
                          {row}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Section>
          )}

          {/* ── Syllabus — teaching ───────────────────────────── */}
          {item.syllabus && item.syllabus.length > 0 && (
            <Section label={labels.syllabusTitle}>
              <ol className="flex flex-col">
                {item.syllabus.map((unit, i) => (
                  <li
                    key={unit.title}
                    className="flex gap-5 border-b border-border py-5 first:pt-0 last:border-0 last:pb-0"
                  >
                    <span className="mt-0.5 font-mono text-xs text-text-secondary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-medium text-text-primary">
                        {unit.title}
                      </span>
                      {unit.detail && (
                        <span className="text-sm leading-relaxed text-text-secondary">
                          {unit.detail}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {/* ── Episodes — podcast ────────────────────────────── */}
          {item.episodes && item.episodes.length > 0 && (
            <Section label={labels.episodesTitle}>
              <ul className="flex flex-col">
                {item.episodes.map((ep) => {
                  const row = (
                    <>
                      <span className="flex shrink-0 gap-4 font-mono text-xs text-text-secondary">
                        {ep.num && (
                          <span className="text-text-primary">{ep.num}</span>
                        )}
                        {ep.date && <span>{ep.date}</span>}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-text-primary text-pretty">
                        {ep.title}
                      </span>
                    </>
                  );
                  return (
                    <li
                      key={ep.num ?? ep.title}
                      className="border-b border-border py-5 first:pt-0 last:border-0 last:pb-0"
                    >
                      {ep.link ? (
                        <a
                          href={ep.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col gap-2 sm:flex-row sm:gap-6"
                        >
                          {row}
                          <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-text-secondary transition-colors group-hover:text-text-primary" />
                        </a>
                      ) : (
                        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                          {row}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Section>
          )}

          {/* ── Craft — video ─────────────────────────────────── */}
          {item.craft && item.craft.length > 0 && (
            <Section label={item.craftTitle ?? labels.craftTitle}>
              <ul className="flex flex-col">
                {item.craft.map((line) => (
                  <li
                    key={line}
                    className="border-b border-border py-4 text-[1.0625rem] leading-relaxed text-text-primary first:pt-0 last:border-0 last:pb-0"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* ── Featured videos — video ───────────────────────── */}
          {item.videos && item.videos.length > 0 && (
            <Section label={labels.videosTitle}>
              <ul className="flex flex-col">
                {item.videos.map((video) => (
                  <li
                    key={video.link}
                    className="border-b border-border py-4 first:pt-0 last:border-0 last:pb-0"
                  >
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4"
                    >
                      {video.image && (
                        <span className="relative aspect-[16/9] w-24 shrink-0 overflow-hidden rounded border border-border">
                          <Image
                            src={video.image}
                            alt={video.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </span>
                      )}
                      <span className="flex-1 text-[0.9375rem] text-text-primary">
                        {video.title}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-text-secondary transition-colors group-hover:text-text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* ── Thesis + takeaway, the editorial close ───────────── */}
        {(item.thesis || item.takeaway) && (
          <section className="mt-16 border-y border-border py-12">
            {item.thesis && (
              <p className="font-serif text-2xl font-medium italic leading-snug text-text-primary text-balance md:text-[1.75rem]">
                {item.thesis}
              </p>
            )}
            {item.thesisNote && (
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {item.thesisNote}
              </p>
            )}
            {item.takeaway && (
              <div className="mt-10">
                <SectionLabel>{labels.takeawayTitle}</SectionLabel>
                <p className="mt-4 text-[1.0625rem] leading-[1.7] text-text-primary text-pretty">
                  {item.takeaway}
                </p>
              </div>
            )}
          </section>
        )}

        {/* ── Platforms ───────────────────────────────────────── */}
        {item.platforms && item.platforms.length > 0 && (
          <section className="mt-14">
            <SectionLabel>{labels.platformsTitle}</SectionLabel>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {item.platforms.map((platform) => (
                <li key={platform.link}>
                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.9375rem] text-text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-text-primary"
                  >
                    {platform.name}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Related — typographic list, not cards ───────────── */}
        {related.length > 0 && (
          <section className="mt-14 border-t border-border pt-8">
            <SectionLabel>{labels.relatedTitle}</SectionLabel>
            <ul className="mt-4 flex flex-col">
              {related.map((sibling) => (
                <li
                  key={sibling.slug}
                  className="border-b border-border last:border-0"
                >
                  <HapticLink
                    href={`/comunicacion/${sibling.slug}`}
                    hapticPreset="medium"
                    className="group flex items-baseline justify-between gap-6 py-4"
                  >
                    <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                        {sibling.kicker}
                      </span>
                      <span className="font-serif text-lg text-text-primary group-hover:underline group-hover:decoration-border group-hover:underline-offset-4">
                        {sibling.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-text-secondary transition-transform group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </HapticLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-16 flex flex-wrap justify-between gap-4 border-t border-border pt-8 font-mono text-xs text-text-secondary">
          <span>{labels.location}</span>
          <span>{labels.available}</span>
        </footer>
      </main>
    </div>
  );
}
