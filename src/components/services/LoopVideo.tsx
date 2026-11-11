"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping footage. Plays on its own like a moving picture, but stays
 * on its poster frame for visitors who ask for reduced motion.
 */
export default function LoopVideo(props: React.ComponentProps<"video">) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return <video ref={ref} muted loop playsInline {...props} />;
}
