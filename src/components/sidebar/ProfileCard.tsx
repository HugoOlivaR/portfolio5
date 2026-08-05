"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import HapticLink from "@/components/ui/HapticLink";

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
        <h2 className="text-2xl text-text-secondary">{t("title")}</h2>
        {/* Credential badge — links inward to the teaching detail, not to thePower. */}
        <HapticLink
          href="/comunicacion/thepower"
          hapticPreset="medium"
          className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-accent-green-soft bg-bg-secondary py-1.5 pl-2 pr-3 transition-[color,border-color,box-shadow] duration-200 hover:border-accent-green hover:shadow-[0_0_14px_-4px_var(--accent-green)]"
        >
          <Image
            src="/comunicacion/logo-tp.png"
            alt=""
            width={16}
            height={17}
            className="h-4 w-auto shrink-0"
          />
          <span className="text-xs text-text-secondary transition-colors group-hover:text-text-primary">
            {t("badge")}
          </span>
          <span
            aria-hidden="true"
            className="text-[10px] text-text-secondary transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-accent-green"
          >
            &rarr;
          </span>
        </HapticLink>
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
