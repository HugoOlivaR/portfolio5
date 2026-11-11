import { getBlogPosts } from "./blog";
import { siteContent } from "./content";
import { BASE_URL, PERSON, SOCIAL, localeUrl } from "./site";

/**
 * llms.txt (https://llmstxt.org): a plain-Markdown map of the site for
 * assistants. Built from the same messages as the pages so it never drifts.
 * Spanish first (main market), with the English entry points at the end.
 */
export function buildLlmsTxt({ full }: { full: boolean }): string {
  const { messages: m, services, projects, comunicacion } = siteContent("es");
  const en = siteContent("en");
  const posts = getBlogPosts("es");
  const jobs = m.experience.jobs;
  const out: string[] = [];

  out.push(`# ${PERSON.name}`);
  out.push("");
  out.push(`> ${m.seo.personDescription}`);
  out.push("");
  out.push(`${m.about.paragraph1} ${m.about.paragraph2}`);
  out.push("");
  out.push(
    `Ubicación: ${m.profile.location} (trabaja en remoto y presencial). Idiomas: español e inglés. Contacto: ${PERSON.email}.`,
  );
  out.push("");

  out.push("## Servicios");
  out.push("");
  for (const s of services) {
    out.push(
      `- [${s.title}](${localeUrl("es", `/services/${s.slug}`)}): ${s.summary}`,
    );
  }
  out.push("");

  if (full) {
    for (const s of services) {
      out.push(`### ${s.title}`);
      out.push("");
      out.push(s.standfirst);
      out.push("");
      out.push(s.lead);
      out.push("");
      for (const c of s.columns) out.push(`- **${c.title}** ${c.text}`);
      out.push("");
      if (s.audiences && s.formats) {
        out.push(`**${m.services.builder.audience}**`);
        for (const a of s.audiences) out.push(`- ${a.title}: ${a.detail}`);
        out.push("");
        out.push(`**${m.services.builder.format}**`);
        for (const f of s.formats)
          out.push(`- ${f.title}${f.meta ? ` (${f.meta})` : ""}: ${f.detail}`);
        out.push("");
      }
      out.push(`**${s.rowsTitle}:**`);
      for (const r of s.rows) out.push(`- ${r.title}: ${r.detail}`);
      out.push("");
      out.push(`**${s.processTitle}:**`);
      s.process.forEach((p, i) => out.push(`${i + 1}. ${p.title}: ${p.detail}`));
      out.push("");
      out.push(`**${s.proofTitle}:**`);
      for (const g of s.proof)
        out.push(`- ${g.kind}: ${g.names.map((n) => n.name).join(", ")}`);
      out.push("");
      out.push(`**${m.services.labels.faq}:**`);
      for (const f of s.faq) out.push(`- ${f.q} ${f.a}`);
      out.push("");
    }
  }

  out.push("## Trayectoria");
  out.push("");
  for (const j of jobs) {
    out.push(
      `- ${j.title} en ${j.company} (${j.period})${full ? `: ${j.highlights.join(" ")}` : ""}`,
    );
  }
  out.push("");

  out.push("## Proyectos y casos de estudio");
  out.push("");
  for (const p of projects) {
    out.push(
      `- [${p.title}](${localeUrl("es", `/projects/${p.slug}`)}): ${p.description}${p.role ? ` Rol: ${p.role}.` : ""}`,
    );
    if (full && p.problem) {
      out.push("");
      out.push(`  ${p.problem.replace(/\n\n/g, "\n\n  ")}`);
      out.push("");
    }
  }
  out.push("");

  out.push("## Docencia y comunicación");
  out.push("");
  for (const c of comunicacion) {
    out.push(
      `- [${c.title}](${localeUrl("es", `/comunicacion/${c.slug}`)}): ${c.tagline}`,
    );
  }
  out.push("");

  out.push("## Blog");
  out.push("");
  for (const post of posts) {
    out.push(
      `- [${post.title}](${localeUrl("es", `/blog/${post.slug}`)})${post.date ? ` (${post.date})` : ""}: ${post.excerpt}`,
    );
  }
  out.push("");

  if (full) {
    for (const post of posts) {
      out.push(`### ${post.title}`);
      out.push("");
      out.push(`URL: ${localeUrl("es", `/blog/${post.slug}`)}`);
      out.push("");
      // Strip MDX/JSX tags; the prose is what matters here.
      out.push(post.content.replace(/<[^>]+>/g, "").trim());
      out.push("");
    }
  }

  out.push("## Perfiles");
  out.push("");
  out.push(`- LinkedIn: ${SOCIAL.linkedin}`);
  out.push(`- GitHub: ${SOCIAL.github}`);
  out.push(`- X: ${SOCIAL.x}`);
  out.push(`- YouTube: ${SOCIAL.youtube}`);
  out.push(`- Podcast La Última Versión: ${SOCIAL.podcast}`);
  out.push(`- CV (PDF): ${BASE_URL}/cv/hugo-oliva-cv.pdf`);
  out.push("");

  out.push("## English");
  out.push("");
  out.push(`- [Home (English)](${localeUrl("en")}): ${en.messages.seo.personDescription}`);
  for (const s of en.services) {
    out.push(
      `- [${s.title}](${localeUrl("en", `/services/${s.slug}`)}): ${s.summary}`,
    );
  }
  out.push("");

  out.push("## Optional");
  out.push("");
  if (!full) {
    out.push(
      `- [llms-full.txt](${BASE_URL}/llms-full.txt): versión completa con el detalle de los servicios, la trayectoria, los casos de estudio y los artículos.`,
    );
  }
  out.push(`- [Sitemap](${BASE_URL}/sitemap.xml)`);
  out.push("");

  return out.join("\n");
}

export function llmsResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
