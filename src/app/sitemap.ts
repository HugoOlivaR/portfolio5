import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";
import { siteContent } from "@/lib/content";
import { localeUrl } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

/** One entry per locale, each listing every language version as an alternate. */
function localized(
  path: string,
  opts: Omit<Entry, "url" | "alternates"> = {},
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localeUrl(l, path)]),
  );
  return routing.locales.map((locale) => ({
    url: localeUrl(locale, path),
    alternates: { languages },
    ...opts,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Slugs are shared across locales, so the default locale lists them all.
  const { services, projects, comunicacion } = siteContent(
    routing.defaultLocale,
  );
  const posts = getBlogPosts(routing.defaultLocale);

  return [
    ...localized("", { changeFrequency: "monthly", priority: 1 }),
    ...services.flatMap((s) =>
      localized(`/services/${s.slug}`, {
        changeFrequency: "monthly",
        priority: 0.9,
      }),
    ),
    ...localized("/projects", { changeFrequency: "monthly", priority: 0.7 }),
    ...projects.flatMap((p) =>
      localized(`/projects/${p.slug}`, { priority: p.featured ? 0.8 : 0.5 }),
    ),
    ...localized("/comunicacion", { priority: 0.7 }),
    ...comunicacion.flatMap((c) =>
      localized(`/comunicacion/${c.slug}`, { priority: 0.6 }),
    ),
    ...localized("/blog", { changeFrequency: "weekly", priority: 0.7 }),
    ...posts.flatMap((post) =>
      localized(`/blog/${post.slug}`, {
        priority: 0.6,
        ...(post.date ? { lastModified: new Date(post.date) } : {}),
      }),
    ),
  ];
}
