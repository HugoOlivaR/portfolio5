"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ProfileCard() {
  const t = useTranslations("profile");
  const name = t("name");
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
      <div className="order-2 md:order-1 flex flex-col gap-1">
        <h1 className="text-6xl font-semibold text-text-primary">{name}</h1>
        <h2 className="text-2
        xl text-text-secondary">{t("title")}</h2>
      </div>
      <div className="order-1 md:order-2 w-32 h-32 rounded-full border-2 border-border bg-bg-secondary flex items-center justify-center overflow-hidden">
        <Image src="/profile.webp" alt={name} width={2000} height={2000} className="object-cover" />
      </div>
    </div>
  );
}
