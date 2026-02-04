import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { SummarizeWith } from "@/components/blog/SummarizeWith";
import SimpleFooter from "@/components/layout/SimpleFooter";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hugooliva.com";

export async function generateStaticParams() {
  const locales = ["en", "es"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getAllBlogSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
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
  const post = getBlogPost(locale, slug);

  if (!post) {
    return {};
  }

  const url = `${BASE_URL}/${locale}/blog/${slug}`;
  const title = `${post.title} | Blog de Hugo Oliva`;
  const description =
    post.excerpt ||
    "Artículo del blog de Hugo Oliva sobre desarrollo full‑stack, IA aplicada y producto digital.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.date || undefined,
      authors: ["Hugo Oliva"],
      images: post.image
        ? [
            {
              url: post.image,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const post = getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-3xl px-6 py-12">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
          >
            <span aria-hidden="true">&larr;</span>
            {t("backToBlog")}
          </Link>
        </div>
        <article className="space-y-6">
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold text-text-primary">{post.title}</h1>
            <p className="text-text-secondary">{post.date}</p>
            {post.excerpt && (
              <p className="text-text-secondary text-lg">{post.excerpt}</p>
            )}
          </header>
          {post.image && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <SummarizeWith
            postUrl={`${BASE_URL}/${locale}/blog/${slug}`}
            prompt={t("summarizePrompt")}
            label={t("summarizeWith")}
          />
          <div className="prose prose-lg max-w-none
            prose-headings:text-text-primary prose-headings:font-semibold
            prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
            prose-p:text-text-secondary prose-p:leading-relaxed prose-p:my-4
            prose-a:text-text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-text-secondary prose-a:transition-colors
            prose-strong:text-text-primary prose-strong:font-semibold
            prose-em:text-text-secondary prose-em:italic
            prose-code:text-text-primary prose-code:bg-bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-text-secondary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-text-secondary prose-blockquote:my-6
            prose-ul:text-text-secondary prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
            prose-ol:text-text-secondary prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-text-secondary prose-li:my-1 prose-li:marker:text-text-secondary
            prose-hr:border-border prose-hr:my-8
            prose-img:rounded-lg prose-img:my-6
            prose-table:text-text-secondary prose-th:text-text-primary prose-th:font-semibold prose-td:border-border
          ">
            <MDXRemote source={post.content} />
          </div>
        </article>
        <SimpleFooter />
      </div>
    </div>
  );
}
