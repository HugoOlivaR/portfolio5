"use client";

import { useEffect, useState } from "react";
import type { FormLabels } from "./types";

// Same Formspree inbox as the contact form on the home page.
const ENDPOINT = "https://formspree.io/f/xnjpzoer";

/** Fired by the training builder so its proposal lands in the message. */
export const PROPOSAL_EVENT = "service-proposal";

const FIELD =
  "w-full rounded-lg bg-bg-primary px-4 py-3.5 text-base text-text-primary placeholder:text-text-secondary outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-text-primary";

/**
 * The page's one contact point. Every call to action scrolls here instead of
 * opening a mail client; the message is sent from the page.
 */
export default function ServiceContact({
  labels,
  subject,
  submitLabel,
  placeholder,
  email,
}: {
  labels: FormLabels;
  subject: string;
  submitLabel: string;
  placeholder: string;
  email: string;
}) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  useEffect(() => {
    const onProposal = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setStatus("idle");
    };
    window.addEventListener(PROPOSAL_EVENT, onProposal);
    return () => window.removeEventListener(PROPOSAL_EVENT, onProposal);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex min-h-[20rem] flex-col justify-center bg-bg-primary p-8 md:p-10"
      >
        <p className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-text-primary">
          {labels.sentTitle}
        </p>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-text-primary">
          {labels.sentText}
        </p>
      </div>
    );
  }

  return (
    // Without JS the form still posts to Formspree and lands on its thank-you page.
    <form
      action={ENDPOINT}
      method="POST"
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="_subject" value={subject} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-base text-text-primary">
          {labels.name}
          <input name="name" required autoComplete="name" className={FIELD} />
        </label>
        <label className="flex flex-col gap-2 text-base text-text-primary">
          {labels.email}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-base text-text-primary">
        {labels.company}
        <input name="company" autoComplete="organization" className={FIELD} />
      </label>
      <label className="flex flex-col gap-2 text-base text-text-primary">
        {labels.message}
        <textarea
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className={`${FIELD} resize-y`}
        />
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent-green px-8 text-base font-medium text-black transition-transform duration-200 disabled:cursor-wait disabled:opacity-70 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
        >
          {status === "sending" ? labels.sending : submitLabel}
          {status !== "sending" && <span aria-hidden="true">&rarr;</span>}
        </button>
        {status === "error" && (
          <p role="alert" className="text-base text-text-primary">
            {labels.error}{" "}
            <a
              href={`mailto:${email}`}
              className="underline underline-offset-4"
            >
              {email}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
