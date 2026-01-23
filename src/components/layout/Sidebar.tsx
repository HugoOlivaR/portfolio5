"use client";

import ProfileCard from "../sidebar/ProfileCard";
import ContactInfo from "../sidebar/ContactInfo";
import SocialLinks from "../sidebar/SocialLinks";
import Navigation from "../sidebar/Navigation";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageSwitch from "../ui/LanguageSwitch";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-1/2 bg-bg-primary px-8 py-12 flex flex-col max-lg:relative max-lg:w-full max-lg:h-auto max-lg:border-r-0 max-lg:border-b">
      <div className="flex-1 flex flex-col gap-6">
        <ProfileCard />
        <ContactInfo />
        <SocialLinks />
        <Navigation />
      </div>
      <div className="flex items-center justify-between pt-6">
        <ThemeToggle />
        <LanguageSwitch />
      </div>
    </aside>
  );
}
