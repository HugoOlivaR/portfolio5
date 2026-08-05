import Image from "next/image";
import HapticLink from "@/components/ui/HapticLink";
import type { ComItemData } from "./types";

/**
 * One full-width row of the `/comunicacion` contents page. The whole row is a
 * single link (`after:inset-0`) — the external link lives on the detail page,
 * so there are no nested anchors to work around.
 */
export default function ComunicacionRow({ item }: { item: ComItemData }) {
  const stat = item.stats?.[0];

  return (
    <li className="group relative grid grid-cols-1 gap-5 border-b border-border py-10 first:pt-0 last:border-0 md:grid-cols-12 md:gap-8">
      <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
          {item.kicker}
        </span>
        <span className="font-mono text-[11px] text-text-secondary">
          {item.year}
        </span>
      </div>

      <div className="flex flex-col gap-3 md:col-span-5">
        <h2 className="font-serif text-2xl font-medium leading-tight tracking-[-0.01em] text-text-primary md:text-[1.75rem]">
          <HapticLink
            href={`/comunicacion/${item.slug}`}
            hapticPreset="medium"
            className="after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-border group-hover:underline-offset-[6px]"
          >
            {item.title}
          </HapticLink>
        </h2>
        <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-text-secondary text-pretty">
          {item.tagline}
        </p>
        {stat && (
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">
            {stat.value} · {stat.label}
          </p>
        )}
      </div>

      {item.image && (
        <div className="md:col-span-4">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded border border-border">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      )}
    </li>
  );
}
