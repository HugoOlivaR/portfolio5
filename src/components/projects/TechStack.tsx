"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { StackItem } from "./types";

/**
 * Tech stack as an interactive "ledger": full-width rows (names never
 * truncate), with a smooth in-place expand for each technology's note.
 * Hover to preview on desktop, tap to open on mobile/keyboard.
 */
export default function TechStack({
  stack,
  hint,
}: {
  stack: StackItem[];
  hint: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-border">
        {stack.map((tech, i) => {
          const open = i === active;
          return (
            <div
              key={tech.name}
              className={i > 0 ? "border-t border-border" : undefined}
            >
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={open}
                className={`group relative flex w-full items-center gap-4 px-5 py-4 text-left transition-colors ${
                  open ? "bg-bg-secondary" : "hover:bg-bg-secondary/60"
                }`}
              >
                {/* Animated accent rail */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 h-full w-[2px] origin-top bg-text-primary transition-transform duration-300 ease-out ${
                    open ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <span
                  className={`font-mono text-xs tabular-nums tracking-[0.08em] transition-colors ${
                    open ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 text-base font-medium transition-colors md:text-lg ${
                    open
                      ? "text-text-primary"
                      : "text-text-secondary group-hover:text-text-primary"
                  }`}
                >
                  {tech.name}
                </span>
                <Plus
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${
                    open
                      ? "rotate-45 text-text-primary"
                      : "rotate-0 text-text-secondary"
                  }`}
                />
              </button>

              {/* In-place expanding note (grid-rows fr trick → animates height) */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  open
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-5 py-3 pl-11 text-sm leading-relaxed text-text-secondary">
                    {tech.note}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-text-secondary">
        <span className="italic">{hint}</span>
        <span className="font-mono tabular-nums tracking-[0.08em]">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(stack.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
