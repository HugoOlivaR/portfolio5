import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "@/i18n/routing";
import "../globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hugooliva.com";

export const metadata: Metadata = {
  title: "Hugo Oliva | Full Stack Developer",
  description:
    "Personal portfolio of Hugo Oliva - Full Stack Developer specializing in React, Node.js, and cloud technologies.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    url: "/",
    title: "Hugo Oliva | Full Stack Developer & AI-Native Engineer",
    description:
      "Portfolio de Hugo Oliva, ingeniero full‑stack especializado en React, Next.js y productos AI‑native. Proyectos reales, blog técnico y casos de uso con IA.",
    siteName: "Hugo Oliva",
    images: [
      {
        url: "/profile.webp",
        width: 1200,
        height: 630,
        alt: "Foto de perfil de Hugo Oliva, ingeniero full‑stack AI‑native",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo Oliva | Full Stack Developer & AI-Native Engineer",
    description:
      "Portfolio de proyectos full‑stack y AI‑native de Hugo Oliva: Next.js, React, Node.js e integraciones de inteligencia artificial.",
    images: ["/profile.webp"],
  },
  alternates: {
    canonical: "/",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const isDark = themeCookie ? themeCookie === "dark" : true;

  return (
    <html lang={locale} className={isDark ? "dark" : ""} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
                document.cookie = 'theme=' + theme + ';path=/;max-age=31536000';
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Hugo Oliva",
              jobTitle: "Full Stack Developer & AI-Native Engineer",
              email: "mailto:hugoliva158@gmail.com",
              url: BASE_URL,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Madrid",
                addressCountry: "ES",
              },
              sameAs: [
                "https://www.linkedin.com/in/hugo-oliva", // ajusta si el perfil es distinto
                "https://github.com/hugolivaa",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
