import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://hugooliva.com"
).replace(/\/$/, "");

export const PERSON = {
  name: "Hugo Oliva",
  email: "hugoliva158@gmail.com",
  image: "/me.webp",
  city: "Madrid",
  country: "ES",
} as const;

/** Public profiles. Single source for the sidebar, JSON-LD `sameAs` and llms.txt. */
export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/hugooliva/",
  github: "https://github.com/HugoOlivaR",
  x: "https://x.com/hugoolivacom",
  youtube: "https://youtube.com/@hugoolivaa",
  podcast: "https://laultimaversion.com",
} as const;

export const SAME_AS = Object.values(SOCIAL);

/** Stable JSON-LD node ids, so every page can point at the same entities. */
export const ID = {
  person: `${BASE_URL}/#person`,
  website: `${BASE_URL}/#website`,
} as const;

/** `/es` + `/blog` → `https://hugooliva.com/es/blog`. `path` is "" for the home. */
export function localeUrl(locale: string, path = ""): string {
  return `${BASE_URL}/${locale}${path}`;
}

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

/** Canonical for this locale plus hreflang alternates for every locale. */
export function localeAlternates(
  locale: string,
  path = "",
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localeUrl(l, path);
  languages["x-default"] = localeUrl(routing.defaultLocale, path);
  return { canonical: localeUrl(locale, path), languages };
}

const OG_LOCALE: Record<Locale, string> = { es: "es_ES", en: "en_US" };

/**
 * Full metadata for a page. Next.js replaces `openGraph`/`twitter` objects
 * wholesale between segments, so each page sends the complete set here
 * instead of relying on the layout.
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  absoluteTitle = false,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = localeUrl(locale, path);
  const ogImage = image ?? `/${locale}/opengraph-image`;
  const images = [
    image
      ? { url: ogImage, alt: imageAlt ?? title }
      : { url: ogImage, width: 1200, height: 630, alt: imageAlt ?? title },
  ];
  const fullTitle = absoluteTitle ? title : `${title} | ${PERSON.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: localeAlternates(locale, path),
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: PERSON.name,
      locale: OG_LOCALE[locale as Locale] ?? "es_ES",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images,
      ...(type === "article"
        ? { publishedTime, authors: [localeUrl(locale)] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@hugoolivacom",
    },
  };
}
