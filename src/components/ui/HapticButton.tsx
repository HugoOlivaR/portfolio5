"use client";

import { useWebHaptics } from "web-haptics/react";
import type { ComponentProps } from "react";

type HapticPattern = Parameters<ReturnType<typeof useWebHaptics>["trigger"]>[0];

type HapticPreset = "success" | "medium";

type HapticButtonProps = ComponentProps<"button"> & {
  hapticPreset?: HapticPreset;
  hapticPattern?: HapticPattern;
};

export default function HapticButton({
  hapticPreset,
  hapticPattern,
  onClick,
  children,
  ...props
}: HapticButtonProps) {
  const { trigger } = useWebHaptics({ debug: true });

  return (
    <button
      onClick={(e) => {
        if (hapticPreset === "success") {
          trigger([
            { duration: 30 },
            { delay: 60, duration: 40, intensity: 1 },
          ]);
        } else if (hapticPreset === "medium") {
          trigger([{ duration: 25 }], { intensity: 0.7 });
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
    </button>
  );
}
