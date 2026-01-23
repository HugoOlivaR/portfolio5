import { useTranslations } from "next-intl";

export default function Education() {
  const t = useTranslations("education");
  const items = t.raw("items") as Array<{
    degree: string;
    institution: string;
    period: string;
  }>;

  return (
    <section id="education" className="space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">{t("title")}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border-l-2 border-border pl-4 space-y-1"
          >
            <h3 className="font-medium text-text-primary">{item.degree}</h3>
            <p className="text-sm text-text-secondary">{item.institution}</p>
            <p className="text-sm text-text-secondary">{item.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
