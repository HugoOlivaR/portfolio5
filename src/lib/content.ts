import es from "@/messages/es.json";
import en from "@/messages/en.json";
import type { Locale } from "@/i18n/routing";
import type { ProjectDetailData } from "@/components/projects/types";
import type { ComItemData } from "@/components/comunicacion/types";
import type { ServiceData } from "@/components/services/types";

/**
 * Typed access to the site content outside a request (sitemap, llms.txt).
 * Pages keep using next-intl; this reads the same message files.
 */
const MESSAGES = { es, en } as const;

export function siteContent(locale: Locale) {
  const m = MESSAGES[locale];
  return {
    messages: m,
    services: m.services.items as ServiceData[],
    projects: m.projects.items as unknown as ProjectDetailData[],
    comunicacion: m.comunicacion.items as unknown as ComItemData[],
  };
}
