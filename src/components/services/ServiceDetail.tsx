import Image from "next/image";
import HapticLink from "@/components/ui/HapticLink";
import ProjectTopBar from "@/components/projects/ProjectTopBar";
import { PERSON } from "@/lib/site";
import LoopVideo from "./LoopVideo";
import ServiceContact from "./ServiceContact";
import TrainingBuilder, { type BuilderLabels } from "./TrainingBuilder";
import type {
  FormLabels,
  ServiceData,
  ServiceImage,
  ServiceLabels,
} from "./types";

/*
 * Service page, laid out like a printed report: one 12-column grid, headings
 * hung from an axis at column 5, sections alternating between text pages and
 * full-bleed fields of flat tone. No rules, no eyebrows, no numbering: order
 * and grouping come from position, scale and tone.
 */

const WRAP = "mx-auto w-full max-w-[80rem] px-5 md:px-8";
const H2 =
  "font-serif text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-text-primary text-balance";
const BODY = "text-[1.0625rem] leading-relaxed text-text-primary text-pretty";

/** Every call to action scrolls to the contact form at the end of the page. */
function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#contacto"
      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent-green px-8 text-base font-medium text-black transition-transform duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}

/** A picture that links to the case study it comes from. */
function Picture({
  image,
  sizes,
  className = "",
  imgClassName = "object-cover",
  priority = false,
}: {
  image: ServiceImage;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const motion =
    "transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]";
  const img = image.video ? (
    // Real footage: a muted loop, with the still as its poster.
    <LoopVideo
      src={image.video}
      poster={image.src}
      aria-label={image.alt}
      preload="metadata"
      className={`absolute inset-0 h-full w-full ${imgClassName} ${motion}`}
    />
  ) : (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={90}
      className={`${imgClassName} ${motion}`}
    />
  );
  return image.href ? (
    <HapticLink
      href={image.href}
      hapticPreset="medium"
      className={`group relative block overflow-hidden ${className}`}
    >
      {img}
    </HapticLink>
  ) : (
    <div className={`group relative overflow-hidden ${className}`}>{img}</div>
  );
}

const ROW_IMAGE: Record<NonNullable<ServiceImage["shape"]>, string> = {
  square: "aspect-square w-full",
  wide: "aspect-[3/2] w-full",
  small: "aspect-square w-2/3",
  tall: "aspect-[3/4] w-full",
};

export default function ServiceDetail({
  service,
  labels,
  builder,
  form,
  related,
  backLabel,
}: {
  service: ServiceData;
  labels: ServiceLabels;
  builder?: BuilderLabels;
  form: FormLabels;
  related: ServiceData[];
  backLabel: string;
}) {
  const totalWeight = service.process.reduce((sum, p) => sum + p.weight, 0);
  // Flat tones for the process bar; the longest stage takes the accent.
  const heaviest = service.process.reduce(
    (best, p, i) => (p.weight > service.process[best].weight ? i : best),
    0,
  );

  return (
    <div className="min-h-svh bg-bg-primary text-text-primary">
      <ProjectTopBar backLabel={backLabel} backHref="/#services" plain />

      <main>
        {/* ── Hero: a two-by-two board of tiles ─────────────────── */}
        <header className="px-2 pt-2">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-12">
            <div className="col-span-2 flex min-h-[46svh] flex-col justify-end lg:min-h-[min(68svh,40rem)] bg-bg-secondary p-6 md:p-10 lg:col-span-8">
              <h1 className="font-serif text-[clamp(2.125rem,6.2vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-text-primary text-balance">
                {service.title}
              </h1>
              <p className="mt-6 max-w-[44ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.45] text-text-primary text-pretty">
                {service.standfirst}
              </p>
              <div className="mt-9">
                <CtaButton>{service.heroCta}</CtaButton>
              </div>
            </div>
            <Picture
              image={service.heroImage}
              sizes="(max-width: 1024px) 100vw, 34vw"
              priority
              className="shutter col-span-2 aspect-[4/3] bg-bg-secondary lg:col-span-4 lg:aspect-auto"
              imgClassName="object-cover object-center"
            />
            <Picture
              image={service.heroImage2}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="col-span-2 aspect-[16/9] bg-bg-secondary lg:col-span-6 lg:aspect-auto lg:min-h-[22rem]"
              imgClassName={
                service.heroImage2.src.includes("mimify")
                  ? "object-cover object-left-top"
                  : "object-cover object-center"
              }
            />
            <p className="col-span-1 bg-bg-secondary p-5 text-[clamp(1.125rem,1.7vw,1.5rem)] leading-[1.25] text-text-primary md:p-7 lg:col-span-3">
              {service.statements[0]}
            </p>
            <p className="col-span-1 bg-accent-green p-5 text-[clamp(1.125rem,1.7vw,1.5rem)] leading-[1.25] text-black md:p-7 lg:col-span-3">
              {service.statements[1]}
            </p>
          </div>
        </header>

        {/* ── Intro: the lead, then four plain answers ──────────── */}
        <section className={`${WRAP} py-24 md:py-32`}>
          <p className="reveal max-w-[60ch] text-[clamp(1.375rem,2.2vw,1.875rem)] leading-[1.3] text-text-primary text-pretty">
            {service.lead}
          </p>
          <div className="reveal-stagger mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {service.columns.map((col) => (
              <p key={col.title} className={BODY}>
                <strong className="font-semibold">{col.title}</strong>{" "}
                {col.text}
              </p>
            ))}
          </div>
        </section>

        {/* ── Builder: the live thing, on a field of tone ───────── */}
        {builder && service.audiences && service.formats && (
          <section className="bg-bg-secondary py-20 md:py-28">
            <div className={WRAP}>
              <TrainingBuilder
                audiences={service.audiences}
                formats={service.formats}
                labels={builder}
                />
            </div>
          </section>
        )}

        {/* ── Rows: heading pinned in the side zone, rows on the axis ─ */}
        <section className={`${WRAP} py-24 md:py-36`}>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-4">
              <h2 className={`reveal ${H2} lg:sticky lg:top-28`}>
                {service.rowsTitle}
              </h2>
            </div>
            <div className="flex flex-col gap-16 md:gap-20 lg:col-span-8">
              {service.rows.map((row, i) => (
                <article
                  key={row.title}
                  className="reveal grid gap-6 md:grid-cols-8 md:gap-x-8"
                >
                  <div className={row.image ? "md:col-span-5" : "md:col-span-6"}>
                    <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-[1.08] tracking-[-0.01em] text-text-primary text-balance">
                      {row.title}
                    </h3>
                    <p className={`mt-4 max-w-[40ch] ${BODY}`}>{row.detail}</p>
                  </div>
                  {row.image && (
                    <figure
                      className={`md:col-span-3 ${
                        i % 2 ? "max-md:ml-auto max-md:w-[70%]" : "max-md:w-full"
                      }`}
                    >
                      <Picture
                        image={row.image}
                        sizes="(max-width: 768px) 80vw, 22vw"
                        className={`bg-bg-secondary ${ROW_IMAGE[row.image.shape ?? "wide"]}`}
                        imgClassName={
                          row.image.shape === "tall"
                            ? "object-cover object-[50%_35%]"
                            : row.image.video
                              ? "object-cover object-center"
                              : "object-cover object-left-top"
                        }
                      />
                      {row.image.caption && (
                        <figcaption className="mt-3 text-base text-text-secondary">
                          {row.image.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process: the stages as one proportional bar ───────── */}
        <section className="bg-bg-secondary py-24 md:py-32">
          <div className={WRAP}>
            <h2 className={`reveal ${H2}`}>{service.processTitle}</h2>
            <ol
              data-ui
              className="reveal mt-14 flex flex-col gap-1.5 md:mt-16 md:flex-row"
            >
              {service.process.map((stage, i) => (
                <li
                  key={stage.title}
                  className="flex flex-col"
                  style={{ flexGrow: stage.weight, flexBasis: 0 }}
                >
                  <div
                    className={`flex min-h-[72px] items-start p-5 md:min-h-[11rem] md:p-6 ${
                      i === heaviest
                        ? "bg-accent-green text-black"
                        : i % 2
                          ? "bg-border text-text-primary"
                          : "bg-bg-primary text-text-primary"
                    }`}
                    style={{
                      minHeight: `max(72px, ${(stage.weight / totalWeight) * 28}rem)`,
                    }}
                  >
                    <span className="text-[clamp(1.25rem,1.8vw,1.625rem)] font-medium leading-tight">
                      {stage.title}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[26ch] pb-4 text-base leading-snug text-text-primary md:pb-0">
                    {stage.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Proof: plain names in columns ─────────────────────── */}
        <section className={`${WRAP} py-24 md:py-32`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
            <h2 className="reveal font-serif text-[clamp(1.75rem,2.4vw,2rem)] font-medium leading-[1.1] text-text-primary text-balance lg:col-span-3">
              {service.proofTitle}
            </h2>
            <div className="reveal-stagger grid gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:col-start-5">
              {service.proof.map((group) => (
                <ul
                  key={group.kind}
                  className="flex flex-col gap-1 text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.5]"
                >
                  <li className="text-text-secondary">{group.kind}</li>
                  {group.names.map((n) => (
                    <li key={n.name} className="text-text-primary">
                      {n.href ? (
                        n.href.startsWith("http") ? (
                          <a
                            href={n.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-text-primary"
                          >
                            {n.name}
                          </a>
                        ) : (
                          <HapticLink
                            href={n.href}
                            hapticPreset="medium"
                            className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-text-primary"
                          >
                            {n.name}
                          </HapticLink>
                        )
                      ) : (
                        n.name
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ: one band per question, answers always visible ── */}
        <section>
          <div className="flex min-h-[min(36svh,22rem)] items-end bg-accent-green">
            <h2
              className={`${WRAP} pb-8 font-serif text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em] text-black md:pb-10`}
            >
              {labels.faq}
            </h2>
          </div>
          {service.faq.map((item, i) => (
            <div
              key={item.q}
              className={i % 2 ? "bg-bg-secondary" : "bg-bg-primary"}
            >
              <div
                className={`${WRAP} reveal grid gap-4 py-10 md:py-14 lg:grid-cols-12 lg:gap-x-8`}
              >
                <h3 className="text-[clamp(1.375rem,2vw,1.75rem)] font-semibold leading-tight text-text-primary text-balance lg:col-span-5">
                  {item.q}
                </h3>
                <p className={`max-w-[52ch] ${BODY} lg:col-span-6 lg:col-start-7`}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Close: the idea again, and the form that answers it ─ */}
        <section id="contacto" className="scroll-mt-16 bg-bg-secondary">
          <div
            className={`${WRAP} grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-x-8`}
          >
            <div className="flex flex-col justify-between gap-10 lg:col-span-6">
              <h2 className="reveal font-serif text-[clamp(2.25rem,4.8vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.035em] text-text-primary">
                {service.ctaTitle}
              </h2>
              <p className="max-w-[40ch] text-[clamp(1.125rem,1.6vw,1.25rem)] leading-relaxed text-text-primary text-pretty">
                {service.ctaText}{" "}
                <span className="text-text-secondary">
                  {labels.emailMe} {PERSON.email}
                </span>
              </p>
            </div>
            <div className="lg:col-span-6">
              <ServiceContact
                labels={form}
                subject={service.title}
                submitLabel={service.ctaButton}
                placeholder={service.formPlaceholder}
                email={PERSON.email}
              />
            </div>
          </div>
        </section>

        {/* ── The other service, then the name as the footer ────── */}
        <section className={`${WRAP} py-20 md:py-28`}>
          {related.map((sibling) => (
            <HapticLink
              key={sibling.slug}
              href={`/services/${sibling.slug}`}
              hapticPreset="medium"
              className="group grid gap-4 lg:grid-cols-12 lg:gap-x-8"
            >
              <span className="lg:col-span-8 lg:col-start-5">
                <span className="block font-serif text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-text-primary">
                  {sibling.title}{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-2"
                  >
                    &rarr;
                  </span>
                </span>
                <span className={`mt-4 block max-w-[48ch] ${BODY}`}>
                  {sibling.summary}
                </span>
              </span>
            </HapticLink>
          ))}
        </section>

        <footer className={`${WRAP} pb-10`}>
          <p className="font-serif text-[clamp(3rem,14vw,12rem)] font-medium leading-[0.85] tracking-[-0.045em] text-text-primary">
            Hugo Oliva
          </p>
          <div className="mt-6 flex flex-wrap justify-between gap-4 text-base text-text-secondary">
            <span>{labels.location}</span>
            <span>{labels.available}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
