import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SimpleFooter from "@/components/layout/SimpleFooter";
import ComunicacionRow from "@/components/comunicacion/ComunicacionRow";
import type { ComItemData } from "@/components/comunicacion/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hugooliva.com";

export const metadata: Metadata = {
  title: "Comunicación & Docencia | Hugo Oliva",
  description:
    "Docencia, podcast y vídeo: cómo Hugo Oliva comunica y enseña tecnología e inteligencia artificial más allá del código.",
  alternates: {
    canonical: "/comunicacion",
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/comunicacion`,
    title: "Comunicación & Docencia | Hugo Oliva",
    description:
      "Docencia en thePower, el podcast La Última Versión y contenido en vídeo. Sé construir… y sé explicarlo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comunicación & Docencia | Hugo Oliva",
    description:
      "Docencia, podcast y vídeo: comunicar y enseñar tecnología con criterio.",
  },
};

export default async function ComunicacionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("comunicacion");
  const items = t.raw("items") as ComItemData[];

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-6 py-12">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
          >
            <span aria-hidden="true">&larr;</span>
            {t("backToHome")}
          </Link>
        </div>

        <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.1] tracking-[-0.01em] text-text-primary">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-text-secondary text-pretty">
          {t("subtitle")}
        </p>

        <ul className="mt-14 flex flex-col border-t border-border pt-10">
          {items.map((item) => (
            <ComunicacionRow key={item.slug} item={item} />
          ))}
        </ul>

        <SimpleFooter />
      </div>
    </div>
  );
}
