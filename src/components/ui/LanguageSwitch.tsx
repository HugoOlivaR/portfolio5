"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "text-text-primary font-medium"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        EN
      </button>
      <span className="text-text-secondary">|</span>
      <button
        onClick={() => switchLocale("es")}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "es"
            ? "text-text-primary font-medium"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        ES
      </button>
    </div>
  );
}
