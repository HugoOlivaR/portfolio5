"use client";

import { useTranslations } from "next-intl";
import HapticButton from "../ui/HapticButton";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">{t("title")}</h2>
      <p className="text-text-secondary">{t("description")}</p>
      <form
        action="https://formspree.io/f/xnjpzoer"
        method="POST"
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-primary"
          >
            {t("form.name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder={t("form.namePlaceholder")}
            className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-secondary transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-primary"
          >
            {t("form.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("form.emailPlaceholder")}
            className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-secondary transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-text-primary"
          >
            {t("form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={t("form.messagePlaceholder")}
            className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-text-secondary transition-colors resize-none"
            required
          />
        </div>
        <HapticButton
          type="submit"
          hapticPreset="success"
          className="cursor-pointer px-6 py-2 bg-secondary text-primary border border-border rounded-lg hover:bg-primary hover:text-secondary transition-colors"
        >
          {t("form.send")}
        </HapticButton>
      </form>
    </section>
  );
}
