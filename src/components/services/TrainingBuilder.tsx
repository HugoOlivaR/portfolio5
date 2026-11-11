"use client";

import { useState } from "react";
import HapticButton from "@/components/ui/HapticButton";
import { PROPOSAL_EVENT } from "./ServiceContact";
import type { ServiceEntry } from "./types";

export type BuilderLabels = {
  title: string;
  text: string;
  audience: string;
  format: string;
  for: string;
  proposal: string;
  ask: string;
  tools: string;
  mailIntro: string;
  mailOutro: string;
};

function Choice({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: ServiceEntry[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-4 text-base font-medium text-text-primary">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option, i) => {
          const active = i === value;
          return (
            <HapticButton
              key={option.title}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(i)}
              className={`min-h-11 cursor-pointer rounded-full px-5 py-2.5 text-base transition-[background-color,color,transform] duration-200 motion-safe:active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary ${
                active
                  ? "bg-text-primary text-bg-primary"
                  : "bg-bg-primary text-text-primary hover:bg-border"
              }`}
            >
              {option.title}
            </HapticButton>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * The page's live thing: pick who the training is for and its format, read
 * the proposal, and carry it into the contact form further down the page.
 * Without JS the default proposal still renders and the link still scrolls.
 */
export default function TrainingBuilder({
  audiences,
  formats,
  labels,
}: {
  audiences: ServiceEntry[];
  formats: ServiceEntry[];
  labels: BuilderLabels;
}) {
  const [a, setA] = useState(0);
  const [f, setF] = useState(1);
  const audience = audiences[a];
  const format = formats[f];

  const proposal = `${format.title} ${labels.for} ${audience.title.charAt(0).toLowerCase()}${audience.title.slice(1)}`;
  const draft = `${labels.mailIntro} ${proposal}${format.meta ? ` (${format.meta})` : ""}.\n\n${labels.mailOutro}`;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="flex flex-col gap-9 lg:col-span-5">
        <div className="reveal">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-text-primary">
            {labels.title}
          </h2>
          <p className="mt-5 max-w-[38ch] text-[1.0625rem] leading-relaxed text-text-primary text-pretty">
            {labels.text}
          </p>
        </div>
        <Choice
          legend={labels.audience}
          options={audiences}
          value={a}
          onChange={setA}
        />
        <Choice
          legend={labels.format}
          options={formats}
          value={f}
          onChange={setF}
        />
      </div>

      <div className="flex flex-col bg-bg-primary p-7 md:p-10 lg:col-span-7">
        <div
          aria-live="polite"
          key={`${a}-${f}`}
          className="flex-1 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500"
        >
          <p
            aria-label={`${labels.proposal}: ${proposal}`}
            className="font-serif text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] tracking-[-0.01em] text-text-primary text-balance"
          >
            {proposal}
          </p>
          {format.meta && (
            <p className="mt-4 text-base font-medium text-accent-green">
              {format.meta}
            </p>
          )}
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-text-primary text-pretty">
            {audience.detail}
          </p>
          <p className="mt-3 max-w-[52ch] text-[1.0625rem] leading-relaxed text-text-primary text-pretty">
            {format.detail}
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <a
            href="#contacto"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent(PROPOSAL_EVENT, { detail: draft }),
              )
            }
            className="inline-flex min-h-14 items-center justify-center gap-2 self-start rounded-full bg-accent-green px-8 text-base font-medium text-black transition-transform duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          >
            {labels.ask}
            <span aria-hidden="true">&rarr;</span>
          </a>
          <p className="text-base text-text-secondary">{labels.tools}</p>
        </div>
      </div>
    </div>
  );
}
