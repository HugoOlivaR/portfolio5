import { getTranslations, setRequestLocale } from "next-intl/server";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";
import type { ServiceData } from "@/components/services/types";
import { JsonLd, personNode, serviceNode, websiteNode } from "@/lib/jsonld";
import { ID, localeUrl } from "@/lib/site";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const seo = await getTranslations({ locale, namespace: "seo" });
  const services = (await getTranslations({ locale, namespace: "services" })).raw(
    "items",
  ) as ServiceData[];

  return (
    <div className="min-h-screen flex justify-center">
      <JsonLd
        data={[
          personNode({
            locale,
            jobTitle: seo("jobTitle"),
            description: seo("personDescription"),
          }),
          websiteNode(locale, seo("homeDescription")),
          {
            "@type": "ProfilePage",
            "@id": `${localeUrl(locale)}#webpage`,
            url: localeUrl(locale),
            name: seo("homeTitle"),
            description: seo("homeDescription"),
            inLanguage: locale,
            isPartOf: { "@id": ID.website },
            mainEntity: { "@id": ID.person },
            about: { "@id": ID.person },
          },
          ...services.map((s) => serviceNode(locale, s)),
        ]}
      />
      <div className="flex w-full max-w-6xl max-lg:flex-col">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
