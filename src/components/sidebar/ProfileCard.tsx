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
        {/* One h1 with name + positioning: it's what search engines and LLMs
            read as "who is this", so both halves belong in it. */}
        <h1 className="flex flex-col gap-1">
          <span className="text-6xl font-semibold text-text-primary">
            {name}
          </span>{" "}
          <span className="text-2xl font-normal text-text-secondary">
            {t("title")}
          </span>
        </h1>
      </div>
      <div className="order-1 md:order-2 relative w-40 h-40 rounded-full border-2 border-border bg-bg-secondary overflow-hidden">
        <Image
          src="/me.webp"
          alt={name}
          fill
          sizes="176px"
          className="object-cover object-[center_85%] scale-125"
        />
      </div>
    </div>
  );
}
