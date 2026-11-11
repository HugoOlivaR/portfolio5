import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServiceDetail from "@/components/services/ServiceDetail";
import type { BuilderLabels } from "@/components/services/TrainingBuilder";
import type {
  FormLabels,
  ServiceData,
  ServiceLabels,
} from "@/components/services/types";
import { routing } from "@/i18n/routing";
import {
  JsonLd,
  breadcrumbNode,
  faqNode,
  serviceNode,
} from "@/lib/jsonld";
import { localeUrl, pageMetadata } from "@/lib/site";

async function getServices(locale: string) {
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    t,
    items: t.raw("items") as ServiceData[],
    labels: t.raw("labels") as ServiceLabels,
    builder: t.raw("builder") as BuilderLabels,
    form: t.raw("form") as FormLabels,
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const { items } = await getServices(locale);
    for (const s of items) params.push({ locale, slug: s.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { items } = await getServices(locale);
  const service = items.find((s) => s.slug === slug);
  if (!service) return {};

  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { t, items, labels, builder, form } = await getServices(locale);
  const seo = await getTranslations({ locale, namespace: "seo" });
  const service = items.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceNode(locale, service),
          faqNode(service.faq),
          breadcrumbNode([
            { name: seo("breadcrumbHome"), url: localeUrl(locale) },
            {
              name: seo("breadcrumbServices"),
              url: `${localeUrl(locale)}#services`,
            },
            {
              name: service.title,
              url: localeUrl(locale, `/services/${slug}`),
            },
          ]),
        ]}
      />
      <ServiceDetail
        service={service}
        labels={labels}
        builder={service.audiences ? builder : undefined}
        form={form}
        related={items.filter((s) => s.slug !== slug)}
        backLabel={t("backToHome")}
      />
    </>
  );
}
