import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except API, Next internals and files with an extension
  // (robots.txt, sitemap.xml, llms.txt, images…). Unprefixed paths get a
  // locale, so unknown URLs end in a localized 404 instead of a fake 200.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
