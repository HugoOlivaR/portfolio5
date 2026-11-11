import { permanentRedirect } from "next/navigation";

// There is no services index: the list lives on the home page.
export default async function ServicesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}#services`);
}
