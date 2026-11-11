import { useTranslations } from "next-intl";
import Image from "next/image";
import HapticLink from "@/components/ui/HapticLink";
import type { ServiceData } from "@/components/services/types";

/**
 * Home summary: the two offers in the same quiet register as the rest of the
 * home. The selling happens on each service page.
 */
export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceData[];

  return (
    <section id="services" className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">{t("title")}</h2>
      <p className="text-text-secondary leading-relaxed">{t("subtitle")}</p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.slug}>
            <HapticLink
              href={`/services/${item.slug}`}
              hapticPreset="medium"
              className="group flex items-center gap-5 rounded-lg p-3 -mx-3 transition-colors hover:bg-bg-secondary"
            >
              <span className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-md bg-bg-secondary">
                <Image
                  src={item.heroImage.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <h3 className="font-medium text-text-primary">{item.title}</h3>
                <span className="text-sm leading-relaxed text-text-secondary">
                  {item.summary}
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
