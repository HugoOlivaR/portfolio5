import { setRequestLocale } from "next-intl/server";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex w-full max-w-6xl max-lg:flex-col">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}
