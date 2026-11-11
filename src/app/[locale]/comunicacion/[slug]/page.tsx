import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ComunicacionDetail from "@/components/comunicacion/ComunicacionDetail";
import type {
  ComItemData,
  ComLabels,
  RelatedComItem,
} from "@/components/comunicacion/types";

import { routing } from "@/i18n/routing";
import { JsonLd, breadcrumbNode } from "@/lib/jsonld";
import { ID, absoluteUrl, localeUrl, pageMetadata } from "@/lib/site";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const t = await getTranslations({ locale, namespace: "comunicacion" });
    for (const item of t.raw("items") as ComItemData[]) {
      params.push({ locale, slug: item.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "comunicacion" });
  const items = t.raw("items") as ComItemData[];
  const item = items.find((p) => p.slug === slug);
  if (!item) return {};

  return pageMetadata({
    locale,
    path: `/comunicacion/${slug}`,
    title: item.title,
    description: item.tagline,
    image: item.image,
    imageAlt: item.title,
  });
}


export default async function ComunicacionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("comunicacion");
  const items = t.raw("items") as ComItemData[];
  const labels = t.raw("detail") as ComLabels;

  const item = items.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  const related: RelatedComItem[] = items
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      slug: p.slug,
      kicker: p.kicker,
      title: p.title,
    }));

  const seo = await getTranslations({ locale, namespace: "seo" });
  const url = localeUrl(locale, `/comunicacion/${slug}`);

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: item.title,
            description: item.tagline,
            inLanguage: locale,
            isPartOf: { "@id": ID.website },
            about: { "@id": ID.person },
            author: { "@id": ID.person },
            ...(item.image ? { primaryImageOfPage: absoluteUrl(item.image) } : {}),
          },
          breadcrumbNode([
            { name: seo("breadcrumbHome"), url: localeUrl(locale) },
            { name: t("title"), url: localeUrl(locale, "/comunicacion") },
            { name: item.title, url },
          ]),
        ]}
      />
      <ComunicacionDetail
      item={item}
      labels={labels}
      related={related}
      backLabel={t("backToComunicacion")}
      />
    </>
  );
}
