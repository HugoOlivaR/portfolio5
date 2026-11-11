export type ServiceEntry = { title: string; detail: string; meta?: string };

export type ServiceImage = {
  src: string;
  alt: string;
  href?: string;
  /** Muted loop shown instead of the still; `src` becomes its poster. */
  video?: string;
  caption?: string;
  /** Margin-photo size in the rows section; deliberately unequal. */
  shape?: "square" | "wide" | "small" | "tall";
};

/** A single service as stored in messages `services.items[]`. Slugs are shared across locales. */
export type ServiceData = {
  slug: string;
  /** schema.org `serviceType`, phrased the way people search for it. */
  serviceType: string;
  title: string;
  /** One line for the home page and llms.txt. */
  summary: string;
  standfirst: string;
  metaTitle: string;
  metaDescription: string;
  heroCta: string;
  heroImage: ServiceImage;
  heroImage2: ServiceImage;
  /** Two one-sentence claims for the hero board tiles. */
  statements: [string, string];
  lead: string;
  /** Four plain answers: who, what, where/how, how to start. */
  columns: { title: string; text: string }[];
  /** Training only: inputs for the proposal builder. */
  audiences?: ServiceEntry[];
  formats?: ServiceEntry[];
  rowsTitle: string;
  rows: (ServiceEntry & { image?: ServiceImage })[];
  processTitle: string;
  /** `weight` sets each stage's share of the process bar. */
  process: (ServiceEntry & { weight: number })[];
  proofTitle: string;
  proof: { kind: string; names: { name: string; href?: string }[] }[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  formPlaceholder: string;
};

export type FormLabels = {
  name: string;
  email: string;
  company: string;
  message: string;
  sending: string;
  sentTitle: string;
  sentText: string;
  error: string;
};

export type ServiceLabels = {
  faq: string;
  related: string;
  location: string;
  available: string;
  emailMe: string;
};
