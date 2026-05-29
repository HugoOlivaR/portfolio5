export type ProjectStatus = "live" | "beta" | "archived";

export type StackItem = {
  name: string;
  note: string;
};

/** A single project item as stored in messages `projects.items[]`. */
export type ProjectDetailData = {
  slug: string;
  title: string;
  link: string;
  year: string;
  image: string;
  /** Optional header/cover video (mp4/webm). Falls back to `image` as poster. */
  video?: string;
  category?: string;
  description: string;
  content?: string;
  tags: string[];
  // Enriched case-study fields (optional → sections degrade gracefully).
  eyebrow?: string;
  role?: string;
  status?: ProjectStatus;
  tagline?: string;
  thesis?: string;
  thesisNote?: string;
  problem?: string;
  stack?: StackItem[];
  features?: string[];
  architecture?: string;
  learnings?: string;
  gallery?: string[];
};

export type RelatedProject = {
  slug: string;
  title: string;
  year: string;
  image: string;
  description: string;
};

/** Shared i18n labels for the detail layout (messages `projects.detail`). */
export type DetailLabels = {
  caseStudy: string;
  role: string;
  status: string;
  site: string;
  year: string;
  statusLive: string;
  statusBeta: string;
  statusArchived: string;
  thesis: string;
  problemTitle: string;
  stackTitle: string;
  stackHint: string;
  featuresTitle: string;
  galleryTitle: string;
  galleryHint: string;
  archTitle: string;
  learningsTitle: string;
  linksTitle: string;
  relatedTitle: string;
  liveApp: string;
  viewCode: string;
  available: string;
  location: string;
  of: string;
};
