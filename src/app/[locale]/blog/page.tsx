import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/lib/blog";
import Image from "next/image";
import SimpleFooter from "@/components/layout/SimpleFooter";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hugooliva.com";

export const metadata: Metadata = {
  title: "Blog de desarrollo y AI-native | Hugo Oliva",
  description:
    "Artículos sobre desarrollo full‑stack, Next.js, React y construcción de productos AI‑native por Hugo Oliva.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/blog`,
    title: "Blog de desarrollo y AI-native | Hugo Oliva",
    description:
      "Guías y reflexiones sobre desarrollo full‑stack moderno, IA aplicada y producto digital.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de desarrollo y AI-native | Hugo Oliva",
    description:
      "Artículos técnicos y estratégicos sobre cómo construir productos AI‑native y aplicaciones full‑stack.",
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = getBlogPosts(locale);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-6xl px-6 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
          >
            <span aria-hidden="true">&larr;</span>
            {t("backToHome")}
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-8">
          {t("title")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="space-y-4 hover:scale-105 duration-200 block border rounded-lg overflow-hidden"
            >
              {post.image && (
                <div className="relative w-full aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-text-primary">
                    {post.title}
                  </h2>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t("readMore")} &rarr;</span>
                  <span className="text-sm text-text-secondary">
                    {post.date}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <SimpleFooter />
      </div>
    </div>
  );
}
