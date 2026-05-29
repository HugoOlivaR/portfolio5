"use client";

import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import HapticLink from "@/components/ui/HapticLink";
import ProjectTopBar from "./ProjectTopBar";
import TechStack from "./TechStack";
import ProjectGallery from "./ProjectGallery";
import type {
  DetailLabels,
  ProjectDetailData,
  RelatedProject,
} from "./types";

const GITHUB_URL = "https://github.com/HugoOlivaR";

/** A numbered case-study block: sticky giant number + title, offset content. */
function Block({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-6 border-t border-border pt-12 md:grid-cols-12 md:gap-8">
      <header className="flex items-baseline gap-4 md:sticky md:top-24 md:col-span-3 md:h-fit md:flex-col md:items-start md:gap-2">
        <div className="font-semibold leading-none tracking-tight text-text-primary text-4xl md:text-[3.5rem]">
          {String(num).padStart(2, "0")}
        </div>
        <div className="text-xs uppercase tracking-[0.12em] text-text-secondary md:text-sm">
          {title}
        </div>
      </header>
      <div className="flex flex-col gap-5 md:col-start-5 md:col-span-8">
        {children}
      </div>
    </section>
  );
}

function StatusPill({
  status,
  labels,
}: {
  status: ProjectDetailData["status"];
  labels: DetailLabels;
}) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-2 text-green-500">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
        {labels.statusLive}
      </span>
    );
  }
  const label = status === "beta" ? labels.statusBeta : labels.statusArchived;
  return <span className="text-text-primary">{label}</span>;
}

export default function ProjectDetail({
  project,
  labels,
  related,
  backLabel,
}: {
  project: ProjectDetailData;
  labels: DetailLabels;
  related: RelatedProject[];
  backLabel: string;
}) {
  const site = project.link.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const hasGallery = !!project.gallery && project.gallery.length > 0;

  // Number the case-study blocks dynamically based on which data exists.
  let n = 0;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <ProjectTopBar backLabel={backLabel} />

      <main className="mx-auto max-w-6xl px-6 pb-24 md:px-10 lg:px-16">
        {/* ── Hero — asymmetric ───────────────────────────────── */}
        <section className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-12 md:items-end md:gap-8 md:pt-12">
          {/* Vertical year — desktop only */}
          <div
            className="hidden self-start pt-3 font-mono text-xs tracking-[0.24em] text-text-secondary md:col-span-1 md:block"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {project.year}
          </div>

          {/* Title block */}
          <div className="flex flex-col gap-5 md:col-start-2 md:col-span-7">
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-text-secondary">
              {project.eyebrow ?? `${labels.caseStudy} · ${project.year}`}
            </div>
            <h1 className="font-semibold leading-[0.9] tracking-[-0.04em] text-text-primary text-[clamp(3.25rem,15vw,10rem)] md:leading-[0.86]">
              {project.title}
            </h1>
          </div>

          {/* Meta column */}
          <div className="flex flex-col gap-4 md:col-start-10 md:col-span-3 md:self-end md:pb-3">
            {(project.tagline ?? project.description) && (
              <p className="text-base leading-relaxed text-text-secondary">
                {project.tagline ?? project.description}
              </p>
            )}
            <div className="h-px bg-border" />
            <dl className="flex flex-col gap-2 text-sm">
              {project.role && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-text-secondary">{labels.role}</dt>
                  <dd className="text-right text-text-primary">{project.role}</dd>
                </div>
              )}
              {project.status && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-text-secondary">{labels.status}</dt>
                  <dd>
                    <StatusPill status={project.status} labels={labels} />
                  </dd>
                </div>
              )}
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-secondary">{labels.site}</dt>
                <dd>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-text-primary transition-colors hover:text-text-secondary"
                  >
                    {site} <ExternalLink className="h-3 w-3" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ── Cover ───────────────────────────────────────────── */}
        {(project.video || project.image) && (
          <div className="mt-10 grid grid-cols-1 md:mt-14 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-12">
              <div
                className={`relative w-full overflow-hidden rounded-xl border border-border ${
                  project.video ? "aspect-[16/10]" : "aspect-video"
                }`}
              >
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.image || undefined}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={project.title}
                    className="absolute inset-0 h-full w-full bg-black object-cover"
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1000px"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Tags ────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.category && (
            <span className="rounded border border-green-500 bg-bg-secondary px-2.5 py-1 text-xs text-green-500">
              {project.category}
            </span>
          )}
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border bg-bg-secondary px-2.5 py-1 text-xs text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Thesis pull-quote ───────────────────────────────── */}
        {project.thesis && (
          <section className="mt-16 grid grid-cols-1 gap-2 py-10 md:grid-cols-12 md:items-center md:gap-8">
            <div className="md:col-span-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                {labels.thesis}
              </div>
              <div
                aria-hidden
                className="-mb-10 font-serif font-semibold leading-none text-text-primary/15 text-[7rem] md:mb-0 md:text-[10rem]"
              >
                &ldquo;
              </div>
            </div>
            <div className="md:col-start-7 md:col-span-5">
              <p className="text-2xl font-medium leading-snug tracking-tight text-text-primary text-balance md:text-3xl">
                {project.thesis}
              </p>
              {project.thesisNote && (
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {project.thesisNote}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── Numbered blocks ─────────────────────────────────── */}
        <div className="mt-16 flex flex-col gap-16">
          {project.problem && (
            <Block num={++n} title={labels.problemTitle}>
              {project.problem.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-text-primary text-pretty"
                >
                  {para}
                </p>
              ))}
            </Block>
          )}

          {project.stack && project.stack.length > 0 && (
            <Block num={++n} title={labels.stackTitle}>
              <TechStack stack={project.stack} hint={labels.stackHint} />
            </Block>
          )}

          {project.features && project.features.length > 0 && (
            <Block num={++n} title={labels.featuresTitle}>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
                {project.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-5 bg-bg-primary p-6 md:min-h-[130px]"
                  >
                    <div className="min-w-[2.5rem] font-semibold leading-none tracking-tight text-text-secondary text-3xl md:text-[2.75rem]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="pt-1 text-base leading-snug text-text-primary">
                      {f}
                    </p>
                  </div>
                ))}
                {project.features.length % 2 === 1 && (
                  <div className="hidden bg-bg-secondary md:block" />
                )}
              </div>
            </Block>
          )}

          {hasGallery && (
            <Block num={++n} title={labels.galleryTitle}>
              <p className="text-sm text-text-secondary">{labels.galleryHint}</p>
              <ProjectGallery
                images={project.gallery!}
                title={project.title}
                ofLabel={labels.of}
              />
            </Block>
          )}

          {project.architecture && (
            <Block num={++n} title={labels.archTitle}>
              <p className="text-lg leading-relaxed text-text-secondary text-pretty">
                {project.architecture}
              </p>
            </Block>
          )}
        </div>

        {/* ── Learnings ───────────────────────────────────────── */}
        {project.learnings && (
          <section className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-16 md:grid-cols-12 md:gap-8">
            <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:items-start md:gap-2">
              <div className="font-semibold leading-none tracking-tight text-text-primary text-4xl md:text-[3.5rem]">
                {String(++n).padStart(2, "0")}
              </div>
              <div className="text-xs uppercase tracking-[0.12em] text-text-secondary md:text-sm">
                {labels.learningsTitle}
              </div>
            </div>
            <blockquote className="text-pretty text-2xl font-medium leading-snug tracking-tight text-text-primary md:col-start-5 md:col-span-8 md:text-[2.25rem]">
              <span aria-hidden className="text-text-secondary">
                &ldquo;
              </span>
              {project.learnings}
              <span aria-hidden className="text-text-secondary">
                &rdquo;
              </span>
            </blockquote>
          </section>
        )}

        {/* ── Links ───────────────────────────────────────────── */}
        <section className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-12 md:grid-cols-12 md:gap-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-text-primary md:col-span-3">
            {labels.linksTitle}
          </h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 md:col-start-5 md:col-span-8">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1.5 bg-bg-primary p-5 transition-colors hover:bg-bg-secondary"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">
                  {labels.liveApp}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-text-secondary" />
              </div>
              <span className="text-xs text-text-secondary">{site}</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1.5 bg-bg-primary p-5 transition-colors hover:bg-bg-secondary"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">
                  {labels.viewCode}
                </span>
                <Github className="h-3.5 w-3.5 text-text-secondary" />
              </div>
              <span className="text-xs text-text-secondary">GitHub</span>
            </a>
          </div>
        </section>

        {/* ── Related ─────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-12 md:grid-cols-12 md:gap-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-text-primary md:col-span-3">
              {labels.relatedTitle}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-start-5 md:col-span-8 lg:grid-cols-3">
              {related.map((p) => (
                <HapticLink
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  hapticPreset="medium"
                  className="group flex flex-col gap-2.5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 300px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.08em] text-text-secondary">
                    {p.year}
                  </div>
                  <div className="text-[15px] font-medium text-text-primary">
                    {p.title}
                  </div>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {p.description}
                  </p>
                </HapticLink>
              ))}
            </div>
          </section>
        )}

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="mt-20 flex flex-wrap justify-between gap-4 border-t border-border pt-8 text-sm text-text-secondary">
          <span>{labels.location}</span>
          <span>{labels.available}</span>
        </footer>
      </main>
    </div>
  );
}
