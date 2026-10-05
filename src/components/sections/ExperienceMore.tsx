"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import HapticButton from "@/components/ui/HapticButton";

/**
 * Reveals the older jobs in place. The jobs themselves are rendered on the
 * server and passed as children — this only owns the open/closed state.
 */
export default function ExperienceMore({
  showMore,
  showLess,
  children,
}: {
  showMore: string;
  showLess: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      {open && (
        <div id={id} className="space-y-6">
          {children}
        </div>
      )}
      <HapticButton
        type="button"
        hapticPreset="medium"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
      >
        {open ? showLess : showMore}
        <ChevronDown
          aria-hidden="true"
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </HapticButton>
    </>
  );
}
