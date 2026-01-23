import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">{t("title")}</h2>
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>{t("paragraph1")}</p>
        <p>{t("paragraph2")}</p>
        <p>{t("paragraph3")}</p>
      </div>
    </section>
  );
}
