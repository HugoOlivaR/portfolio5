"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from "next/image";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
};

export default function Blog() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch(`/api/blog?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 3)));
  }, [locale]);

  return (
    <section id="blog" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">{t("title")}</h2>
        <Link
          href="/blog"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
        >
          {t("viewAll")}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg p-4 hover:border-text-secondary transition-colors space-y-2 hover:bg-bg-secondary"
          >
            {post.image && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
            )}
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-text-primary hover:underline">
                {post.title}
              </h3>
              <span className="text-xs text-text-secondary">{post.date}</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
