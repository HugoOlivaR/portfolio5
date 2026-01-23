"use client";

import LanguageSwitch from "@/components/ui/LanguageSwitch";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SocialLinks from "@/components/sidebar/SocialLinks";

export default function SimpleFooter() {
  return (
    <footer className="border-t border-border py-6 mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm text-text-secondary">Hugo Oliva</span>
        <div className="flex items-center gap-6">
          <SocialLinks />
          <ThemeToggle />
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  );
}
