import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("seo");

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-primary px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium text-text-primary">
          {t("notFoundTitle")}
        </h1>
        <p className="mt-4 text-text-secondary">{t("notFoundText")}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-text-primary underline decoration-border underline-offset-4 hover:decoration-text-primary"
        >
          <span aria-hidden="true">&larr;</span>
          {t("notFoundCta")}
        </Link>
      </div>
    </main>
  );
}
