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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hugooliva.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations("comunicacion");
  const items = t.raw("items") as ComItemData[];
  const item = items.find((p) => p.slug === slug);

  if (!item) {
    return {};
  }

  const url = `${BASE_URL}/${locale}/comunicacion/${slug}`;
  const title = `${item.title} | Hugo Oliva`;
  const description =
    item.tagline ||
    "Comunicación y docencia de Hugo Oliva: enseñar y divulgar tecnología e inteligencia artificial.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: item.image
        ? [
            {
              url: item.image,
              alt: item.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: item.image ? [item.image] : undefined,
    },
  };
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

  return (
    <ComunicacionDetail
      item={item}
      labels={labels}
      related={related}
      backLabel={t("backToComunicacion")}
    />
  );
}
