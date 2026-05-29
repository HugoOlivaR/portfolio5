"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

// Span pattern for a lightly asymmetric masonry on md+ (6-col grid).
const SPANS = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2 md:row-span-3",
  "md:col-span-2 md:row-span-3",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2 md:row-span-2",
];

export default function ProjectGallery({
  images,
  title,
  ofLabel,
}: {
  images: string[];
  title: string;
  ofLabel: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) =>
        i === null ? null : (i + dir + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:auto-rows-[100px] md:grid-cols-6">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-lg border border-border bg-bg-secondary transition-colors hover:border-text-secondary md:aspect-auto ${
              SPANS[i] ?? "md:col-span-2 md:row-span-2"
            }`}
          >
            <Image
              src={src}
              alt={`${title} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-black/55 px-2 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/92"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-6 py-4 text-white">
            <span className="font-mono text-xs text-white/60">
              {String(open + 1).padStart(2, "0")} {ofLabel}{" "}
              {String(images.length).padStart(2, "0")} · {title}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="p-1.5 text-white/80 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full max-h-[80vh] w-full max-w-3xl">
              <Image
                src={images[open]}
                alt={`${title} ${open + 1}`}
                fill
                sizes="90vw"
                className="rounded-xl border border-white/10 object-contain"
              />
            </div>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 p-3 text-white transition-colors hover:bg-white/10 sm:left-6"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 p-3 text-white transition-colors hover:bg-white/10 sm:right-6"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
