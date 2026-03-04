"use client";

import { useWebHaptics } from "web-haptics/react";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type HapticPattern = Parameters<ReturnType<typeof useWebHaptics>["trigger"]>[0];

type HapticPreset = "success" | "medium";

type HapticLinkProps = ComponentProps<typeof Link> & {
  hapticPreset?: HapticPreset;
  hapticPattern?: HapticPattern;
};

export default function HapticLink({
  hapticPreset,
  hapticPattern,
  onClick,
  children,
  ...props
}: HapticLinkProps) {
  const { trigger } = useWebHaptics({ debug: true });

  return (
    <Link
      onClick={(e) => {
        if (hapticPreset === "success") {
          trigger([
            { duration: 40 },
            { delay: 10, duration: 40, intensity: 1 },
          ]);
        } else if (hapticPreset === "medium") {
          trigger([{ duration: 30 }, { delay: 0, duration: 30, intensity: 1 }]);
        } else if (hapticPattern) {
          trigger(hapticPattern);
        } else {
          trigger();
        }
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
