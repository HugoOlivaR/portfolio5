"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface AiQuizCardProps {
  aiUsed: string;
  aiReason: string;
  title: string;
  subtitle: string;
  successText: string;
  retryText: string;
}

const aiOptions = [
  { id: "chatgpt", label: "ChatGPT", icon: "/ai-icons/openai.svg", invertInDark: true },
  { id: "gemini", label: "Gemini", icon: "/ai-icons/gemini-color.svg" },
  { id: "claude", label: "Claude", icon: "/ai-icons/claude-color.svg" },
  { id: "grok", label: "Grok", icon: "/ai-icons/grok.svg", invertInDark: true },
  { id: "perplexity", label: "Perplexity", icon: "/ai-icons/perplexity-color.svg" },
];

export function AiQuizCard({
  aiUsed,
  aiReason,
  title,
  subtitle,
  successText,
  retryText,
}: AiQuizCardProps) {
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [shaking, setShaking] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleGuess = useCallback(
    (id: string) => {
      if (status === "correct") return;

      setSelected(id);

      if (id === aiUsed) {
        setStatus("correct");
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.7 },
        });
      } else {
        setStatus("wrong");
        setShaking(true);
        setTimeout(() => {
          setShaking(false);
          setStatus("idle");
          setSelected(null);
        }, 1500);
      }
    },
    [aiUsed, status],
  );

  const correctLabel = aiOptions.find((o) => o.id === aiUsed)?.label ?? aiUsed;

  return (
    <div
      className={`mt-10 p-6 rounded-xl border-2 transition-all duration-300 ${
        status === "correct"
          ? "border-green-500 bg-green-500/5"
          : status === "wrong"
            ? "border-red-500 bg-red-500/5"
            : "border-border bg-bg-secondary"
      } ${shaking ? "animate-shake" : ""}`}
    >
      <div className="text-center space-y-2 mb-6">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">{subtitle}</p>
      </div>

      <div className="flex justify-center gap-3 flex-wrap">
        {aiOptions.map((option) => {
          const isSelected = selected === option.id;
          const isCorrectAnswer = status === "correct" && isSelected;
          const isWrongAnswer = status === "wrong" && isSelected;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleGuess(option.id)}
              disabled={status === "correct"}
              className={`flex flex-col items-center gap-2 w-[4.5rem] py-3 rounded-xl border-2 transition-all duration-200 ${
                isCorrectAnswer
                  ? "border-green-500 bg-green-500/10 scale-110"
                  : isWrongAnswer
                    ? "border-red-500 bg-red-500/10"
                    : status === "correct"
                      ? "border-border bg-bg-primary opacity-40 cursor-default"
                      : "border-border bg-bg-primary hover:border-text-secondary hover:scale-105 cursor-pointer"
              }`}
            >
              <Image
                src={option.icon}
                alt={option.label}
                width={28}
                height={28}
                className={option.invertInDark ? "dark:invert" : ""}
              />
              <span
                className={`text-xs font-medium ${
                  isCorrectAnswer
                    ? "text-green-600 dark:text-green-400"
                    : isWrongAnswer
                      ? "text-red-600 dark:text-red-400"
                      : "text-text-secondary"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {status === "correct" && (
        <div className="text-center mt-4 space-y-1 animate-in fade-in">
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            {successText.replace("[ai]", correctLabel)}
          </p>
          <p className="text-xs text-text-secondary italic">{aiReason}</p>
        </div>
      )}
      {status === "wrong" && (
        <p className="text-center text-sm font-medium text-red-600 dark:text-red-400 mt-4">
          {retryText}
        </p>
      )}
    </div>
  );
}
