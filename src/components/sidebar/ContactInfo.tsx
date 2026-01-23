"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function LocationIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function ContactInfo() {
  const t = useTranslations("profile");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    const email = t("email");
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center gap-2 text-text-secondary">
        <LocationIcon />
        <span>{t("location")}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-text-secondary">{t("availability")}</span>
      </div>
      <button
        onClick={handleCopyEmail}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
      >
        <span className="transition-transform duration-200">
          {copied ? <CheckIcon /> : <EmailIcon />}
        </span>
        <span className="transition-opacity duration-200">
          {copied ? t("copied") : t("email")}
        </span>
      </button>
    </div>
  );
}
