"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import HapticLink from "../ui/HapticLink";

const navItems = [
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "education", href: "#education" },
  { key: "blog", href: "#blog" },
  { key: "contact", href: "#contact" },
];

export default function Navigation() {
  const t = useTranslations("nav");
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.key);
          if (!element) return null;
          return { key: item.key, top: element.offsetTop };
        })
        .filter((section): section is { key: string; top: number } => section !== null);

      if (!sections.length) {
        setActiveSection("");
        return;
      }

      const scrollPosition = window.scrollY + 1;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveSection(sections[sections.length - 1].key);
        return;
      }

      for (let i = 0; i < sections.length; i++) {
        const current = sections[i];
        const next = sections[i + 1];
        const sectionEnd = next ? next.top : Infinity;

        if (scrollPosition >= current.top && scrollPosition < sectionEnd) {
          setActiveSection(current.key);
          return;
        }
      }

      if (scrollPosition < sections[0].top) {
        setActiveSection(sections[0].key);
        return;
      }

      setActiveSection(sections[sections.length - 1].key);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const isActive = activeSection === item.key;
        return (
          <HapticLink
            key={item.key}
            href={item.href}
            hapticPreset="medium"
            className={`group flex items-center gap-3 py-1 transition-all duration-300 ease-out ${
              isActive
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary font-normal"
            }`}
          >
            <span
              className={`h-[2px] transition-all duration-300 ease-out ${
                isActive
                  ? "w-8 bg-primary"
                  : "w-3 bg-text-secondary group-hover:w-5 group-hover:bg-text-primary"
              }`}
            />
            <span>{t(item.key)}</span>
          </HapticLink>
        );
      })}
    </nav>
  );
}
