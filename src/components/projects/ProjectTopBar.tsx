"use client";

import { ArrowLeft } from "lucide-react";
import HapticLink from "@/components/ui/HapticLink";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitch from "@/components/ui/LanguageSwitch";

export default function ProjectTopBar({ backLabel }: { backLabel: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg-primary/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <HapticLink
          href="/projects"
          hapticPreset="medium"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{backLabel}</span>
        </HapticLink>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
