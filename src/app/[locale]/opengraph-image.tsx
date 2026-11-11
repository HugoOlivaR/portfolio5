import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { siteContent } from "@/lib/content";

export const alt = "Hugo Oliva";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Default share card for every page that has no image of its own. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const { messages: m, services } = siteContent(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a3a3a3",
          }}
        >
          {m.profile.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -3 }}>
            Hugo Oliva
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {services.map((s) => (
              <div key={s.slug} style={{ display: "flex", fontSize: 38, color: "#d4d4d4" }}>
                — {s.title}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a3a3a3",
            borderTop: "1px solid #262626",
            paddingTop: 28,
          }}
        >
          <span>hugooliva.com</span>
          <span>CTO · Tesora — {locale === "es" ? "Profesor de IA · thePower" : "AI instructor · thePower"}</span>
        </div>
      </div>
    ),
    size,
  );
}
