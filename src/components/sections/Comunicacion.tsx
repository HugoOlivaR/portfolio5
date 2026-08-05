import { useTranslations } from "next-intl";
import Image from "next/image";
import HapticLink from "@/components/ui/HapticLink";
import type { ComItemData } from "@/components/comunicacion/types";

/**
 * Home teaser. Deliberately dense: the portfolio is dev-first, so this section
 * reinforces Projects instead of competing with it visually.
 */
export default function Comunicacion() {
  const t = useTranslations("comunicacion");
  const items = t.raw("items") as ComItemData[];

  return (
    <section id="comunicacion" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          {t("title")}
        </h2>
        <HapticLink
          href="/comunicacion"
          hapticPreset="medium"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
        >
          {t("viewAll")}
          <span aria-hidden="true">&rarr;</span>
        </HapticLink>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">
        {t("subtitle")}
      </p>
      <ul className="flex flex-col">
        {items.slice(0, 3).map((item) => (
          <li
            key={item.slug}
            className="group relative border-b border-border last:border-0"
          >
            <HapticLink
              href={`/comunicacion/${item.slug}`}
              hapticPreset="medium"
              className="flex items-center gap-4 py-4"
            >
              {item.image && (
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded border border-border">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
              )}
              <span className="flex min-w-0 flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary">
                  {item.kicker}
                </span>
                <span className="font-serif text-[1.0625rem] text-text-primary group-hover:underline group-hover:decoration-border group-hover:underline-offset-4">
                  {item.title}
                </span>
                <span className="truncate text-xs text-text-secondary">
                  {item.tagline}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="ml-auto text-text-secondary transition-transform group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </HapticLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
