"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

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
      const sections = navItems.map((item) => item.key);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
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
          <a
            key={item.key}
            href={item.href}
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
          </a>
        );
      })}
    </nav>
  );
}
