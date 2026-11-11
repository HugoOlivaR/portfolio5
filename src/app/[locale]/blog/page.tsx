import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/lib/blog";
import Image from "next/image";
import SimpleFooter from "@/components/layout/SimpleFooter";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMetadata({
    locale,
    path: "/blog",
    title: t("blogTitle"),
    description: t("blogDescription"),
  });
}

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
