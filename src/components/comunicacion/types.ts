/** Which kind of communication piece this is — decides which module renders. */
export type ComFormat = "teaching" | "podcast" | "video";

export type ComStat = {
  value: string;
  label: string;
};

/** A syllabus unit — `teaching` only. */
export type ComSyllabusUnit = {
  title: string;
  detail?: string;
};

/** A program taught inside the same institution — `teaching` only. */
export type ComProgram = {
  name: string;
  link?: string;
  /** Mono meta line, e.g. "IA · perfiles no técnicos". */
  meta?: string;
  /** What I contribute in this specific program. */
  detail?: string;
};

/** An episode row — `podcast` only. */
export type ComEpisode = {
  num?: string;
  title: string;
  date?: string;
  link?: string;
};

/** A featured video — `video` only. */
export type ComVideo = {
  title: string;
  link: string;
  image?: string;
};

export type ComPlatform = {
  name: string;
  link: string;
};

/** A single item as stored in messages `comunicacion.items[]`. */
export type ComItemData = {
  slug: string;
  format: ComFormat;
  title: string;
  link: string;
  year: string;
  image: string;
  /** Overline, e.g. "Docencia · thePower". Replaces the category pill. */
  kicker: string;
  /** Standfirst under the headline. */
  tagline: string;
  role?: string;
  thesis?: string;
  thesisNote?: string;
  stats?: ComStat[];
  /** Narrative body, paragraphs split on "\n\n". */
  intro?: string;
  /** Overrides the shared intro label, e.g. "El encargo" vs "El laboratorio". */
  introTitle?: string;
  programs?: ComProgram[];
  syllabus?: ComSyllabusUnit[];
  episodes?: ComEpisode[];
  videos?: ComVideo[];
  craft?: string[];
  /** Overrides the shared craft label, e.g. "Qué imparto" vs "El oficio". */
  craftTitle?: string;
  /** Closing pull-quote. */
  takeaway?: string;
  platforms?: ComPlatform[];
};

export type RelatedComItem = {
  slug: string;
  kicker: string;
  title: string;
};

/** i18n labels for the editorial layout (messages `comunicacion.detail`). */
export type ComLabels = {
  role: string;
  year: string;
  link: string;
  introTitle: string;
  programsTitle: string;
  syllabusTitle: string;
  episodesTitle: string;
  videosTitle: string;
  craftTitle: string;
  takeawayTitle: string;
  platformsTitle: string;
  relatedTitle: string;
  location: string;
  available: string;
};
