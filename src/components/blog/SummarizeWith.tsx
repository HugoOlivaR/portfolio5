"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface SummarizeWithProps {
  postUrl: string;
  prompt: string;
  label: string;
  tooltipText?: string;
}

interface AiService {
  name: string;
  icon: string;
  invertInDark?: boolean;
  type: "direct" | "copyRedirect";
  getUrl: (prompt: string, postUrl: string) => string;
}

const aiServices: AiService[] = [
  {
    name: "ChatGPT",
    type: "direct",
    getUrl: (prompt, postUrl) =>
      `https://chatgpt.com/?q=${encodeURIComponent(`${prompt} ${postUrl}`)}`,
    icon: "/ai-icons/openai.svg",
    invertInDark: true,
  },
  {
    name: "Gemini",
    type: "copyRedirect",
    getUrl: () => "https://gemini.google.com/app",
    icon: "/ai-icons/gemini-color.svg",
  },
  {
    name: "Claude",
    type: "copyRedirect",
    getUrl: () => "https://claude.ai/new",
    icon: "/ai-icons/claude-color.svg",
  },
  {
    name: "Grok",
    type: "copyRedirect",
    getUrl: () => "https://grok.com/",
    icon: "/ai-icons/grok.svg",
    invertInDark: true,
  },
  {
    name: "Perplexity",
    type: "direct",
    getUrl: (prompt, postUrl) =>
      `https://www.perplexity.ai/search/new?q=${encodeURIComponent(`${prompt} ${postUrl}`)}`,
    icon: "/ai-icons/perplexity-color.svg",
  },
];

export function SummarizeWith({
  postUrl,
  prompt,
  label,
  tooltipText = "Prompt copiado, redirigiendo...",
}: SummarizeWithProps) {
  const [copiedService, setCopiedService] = useState<string | null>(null);

  const handleCopyAndRedirect = useCallback(
    async (service: AiService) => {
      const fullPrompt = `${prompt} ${postUrl}`;
      await navigator.clipboard.writeText(fullPrompt);
      setCopiedService(service.name);

      setTimeout(() => {
        setCopiedService(null);
        window.open(service.getUrl(prompt, postUrl), "_blank");
      }, 1500);
    },
    [prompt, postUrl],
  );

  const buttonClass =
    "flex items-center justify-center w-9 h-9 rounded-lg bg-bg-primary border border-border text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all duration-200";

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 px-4 bg-bg-secondary rounded-lg border border-border">
      <span className="text-sm text-text-secondary font-medium">{label}:</span>
      <div className="flex gap-2">
        {aiServices.map((service) => (
          <div key={service.name} className="relative">
            {service.type === "direct" ? (
              <a
                href={service.getUrl(prompt, postUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass}
                title={service.name}
              >
                <Image src={service.icon} alt={service.name} width={20} height={20} className={service.invertInDark ? "dark:invert" : ""} />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => handleCopyAndRedirect(service)}
                className={buttonClass}
                title={service.name}
              >
                <Image src={service.icon} alt={service.name} width={20} height={20} className={service.invertInDark ? "dark:invert" : ""} />
              </button>
            )}
            {copiedService === service.name && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-text-primary bg-bg-primary border border-border rounded-lg shadow-lg whitespace-nowrap animate-in fade-in">
                {tooltipText}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-border" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
