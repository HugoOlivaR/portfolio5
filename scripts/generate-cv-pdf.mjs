import fs from "fs";
import path from "path";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  renderToFile,
} from "@react-pdf/renderer";

const h = React.createElement;

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "public", "cv");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "hugo-oliva-cv.pdf");

// --- Colors matching portfolio light mode ---
const C = {
  black: "#000000",
  dark: "#1a1a1a",
  body: "#374151",
  muted: "#666666",
  light: "#a0a0a0",
  border: "#e5e5e5",
  bgLight: "#f5f5f5",
  white: "#ffffff",
};

function readMessages(locale = "es") {
  const messagesPath = path.join(ROOT, "src", "messages", `${locale}.json`);
  const raw = fs.readFileSync(messagesPath, "utf8");
  return JSON.parse(raw);
}

// --- Styles ---
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: C.body,
    backgroundColor: C.white,
    paddingTop: 30,
    paddingBottom: 32,
    paddingHorizontal: 36,
  },

  // --- Header ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: C.black,
  },
  headerLeft: {},
  headerRight: {
    alignItems: "flex-end",
    gap: 3,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 24,
    color: C.black,
    letterSpacing: -0.5,
  },
  titleRole: {
    fontSize: 11,
    color: C.muted,
    marginTop: 2,
  },
  contactLine: {
    fontSize: 8.5,
    color: C.muted,
  },
  contactLink: {
    fontSize: 8.5,
    color: C.black,
    textDecoration: "none",
  },

  // --- Layout ---
  body: {
    flexDirection: "row",
    marginTop: 12,
    gap: 20,
  },
  sidebar: {
    width: "32%",
  },
  main: {
    width: "68%",
  },

  // --- Sections ---
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: C.black,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    marginBottom: 6,
  },

  // --- Summary ---
  summary: {
    fontSize: 8.5,
    color: C.body,
    lineHeight: 1.45,
  },

  // --- Experience items ---
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  expRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: C.dark,
  },
  expPeriod: {
    fontSize: 8.5,
    color: C.muted,
  },
  expCompany: {
    fontSize: 8.5,
    color: C.muted,
    marginBottom: 2,
    textDecoration: "none",
  },
  expDesc: {
    fontSize: 8,
    color: C.body,
    lineHeight: 1.4,
  },

  // --- Timeline indicator ---
  timelineItem: {
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: C.border,
    marginBottom: 8,
  },

  // --- Skills ---
  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 3,
    marginTop: 3,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginBottom: 4,
  },
  pill: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  pillText: {
    fontSize: 7,
    color: C.dark,
  },

  // --- Education ---
  eduItem: {
    marginBottom: 5,
  },
  eduDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: C.dark,
  },
  eduInstitution: {
    fontSize: 7.5,
    color: C.body,
    lineHeight: 1.35,
    marginTop: 1,
  },
  eduPeriod: {
    fontSize: 7,
    color: C.muted,
    marginTop: 1,
  },

  // --- Projects ---
  projItem: {
    marginBottom: 7,
  },
  projHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  projTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: C.dark,
  },
  projYear: {
    fontSize: 8,
    color: C.muted,
  },
  projDesc: {
    fontSize: 8,
    color: C.body,
    lineHeight: 1.35,
    marginBottom: 3,
  },
  projLink: {
    fontSize: 7.5,
    color: C.muted,
    textDecoration: "none",
  },

  // --- Footer ---
  footer: {
    position: "absolute",
    bottom: 16,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: C.light,
  },
});

// --- Document ---
function CvDocument({ messages }) {
  const { profile, about, experience, projects, skills, education } = messages;

  const socialLinks = [
    { label: "github.com/HugoOlivaR", href: "https://github.com/HugoOlivaR" },
    { label: "linkedin.com/in/hugooliva", href: "https://www.linkedin.com/in/hugooliva/" },
    { label: "hugooliva.com", href: "https://hugooliva.com" },
  ];

  const tools = ["Git", "Docker", "Figma", "Vercel", "CI/CD", "REST APIs", "OpenAI API"];

  return h(
    Document,
    {
      title: "Hugo Oliva - Frontend Engineer CV",
      author: "Hugo Oliva",
      subject: "CV for Frontend Engineer position at Revolut",
    },
    h(
      Page,
      { size: "A4", style: s.page, wrap: true },

      // ===== HEADER =====
      h(
        View,
        { style: s.header },
        h(
          View,
          { style: s.headerLeft },
          h(Text, { style: s.name }, profile.name),
          h(Text, { style: s.titleRole }, "Frontend Engineer")
        ),
        h(
          View,
          { style: s.headerRight },
          h(Text, { style: s.contactLine }, profile.location),
          h(
            Link,
            { src: `mailto:${profile.email}`, style: s.contactLink },
            profile.email
          ),
          ...socialLinks.map((link) =>
            h(Link, { key: link.href, src: link.href, style: s.contactLink }, link.label)
          )
        )
      ),

      // ===== BODY =====
      h(
        View,
        { style: s.body },

        // --- SIDEBAR ---
        h(
          View,
          { style: s.sidebar },

          // Skills
          h(
            View,
            { style: s.section },
            h(Text, { style: s.sectionTitle }, skills.title),

            h(Text, { style: s.skillCategory }, skills.frontend),
            h(
              View,
              { style: s.pillRow },
              ...skills.categories.frontend.map((skill) =>
                h(View, { key: skill, style: s.pill }, h(Text, { style: s.pillText }, skill))
              )
            ),

            h(Text, { style: s.skillCategory }, skills.backend),
            h(
              View,
              { style: s.pillRow },
              ...skills.categories.backend.map((skill) =>
                h(View, { key: skill, style: s.pill }, h(Text, { style: s.pillText }, skill))
              )
            ),

            h(Text, { style: s.skillCategory }, skills.tools),
            h(
              View,
              { style: s.pillRow },
              ...tools.map((tool) =>
                h(View, { key: tool, style: s.pill }, h(Text, { style: s.pillText }, tool))
              )
            )
          ),

          // Education
          h(
            View,
            { style: s.section },
            h(Text, { style: s.sectionTitle }, education.title),
            ...education.items.map((item, i) =>
              h(
                View,
                { key: i, style: s.eduItem },
                h(Text, { style: s.eduDegree }, item.degree),
                h(Text, { style: s.eduInstitution }, item.institution),
                h(Text, { style: s.eduPeriod }, item.period)
              )
            )
          ),

          // Languages
          h(
            View,
            { style: s.section },
            h(Text, { style: s.sectionTitle }, "Idiomas"),
            h(
              View,
              { style: s.eduItem },
              h(Text, { style: s.eduDegree }, "Español"),
              h(Text, { style: s.eduPeriod }, "Nativo")
            ),
            h(
              View,
              { style: s.eduItem },
              h(Text, { style: s.eduDegree }, "Inglés"),
              h(Text, { style: s.eduPeriod }, "Profesional")
            )
          )
        ),

        // --- MAIN CONTENT ---
        h(
          View,
          { style: s.main },

          // Summary / Profile
          h(
            View,
            { style: s.section },
            h(Text, { style: s.sectionTitle }, "Perfil"),
            h(
              Text,
              { style: s.summary },
              `${about.paragraph1} ${about.paragraph2}`
            )
          ),

          // Experience
          h(
            View,
            { style: s.section },
            h(Text, { style: s.sectionTitle }, experience.title),
            ...experience.jobs.map((job, i) =>
              h(
                View,
                { key: i, style: s.timelineItem, wrap: false },
                h(
                  View,
                  { style: s.expHeader },
                  h(Text, { style: s.expRole }, job.title),
                  h(Text, { style: s.expPeriod }, job.period)
                ),
                h(Link, { src: job.companyUrl, style: s.expCompany }, job.company),
                h(Text, { style: s.expDesc }, job.description)
              )
            )
          ),

          // Projects
          h(
            View,
            { style: s.section },
            h(Text, { style: s.sectionTitle }, "Proyectos destacados"),
            ...projects.items.slice(0, 3).map((project) =>
              h(
                View,
                { key: project.slug, style: s.projItem, wrap: false },
                h(
                  View,
                  { style: s.projHeader },
                  h(Text, { style: s.projTitle }, project.title),
                  h(Text, { style: s.projYear }, project.year)
                ),
                h(Text, { style: s.projDesc }, project.description),
                h(
                  View,
                  { style: s.pillRow },
                  ...project.tags.map((tag) =>
                    h(
                      View,
                      { key: `${project.slug}-${tag}`, style: s.pill },
                      h(Text, { style: s.pillText }, tag)
                    )
                  )
                ),
                project.link
                  ? h(Link, { src: project.link, style: s.projLink }, project.link)
                  : null
              )
            )
          )
        )
      ),

      // ===== FOOTER =====
      h(
        View,
        { style: s.footer, fixed: true },
        h(Text, { style: s.footerText }, "Hugo Oliva · Frontend Engineer"),
        h(Text, { style: s.footerText }, profile.email)
      )
    )
  );
}

// --- Main ---
async function main() {
  const messages = readMessages("es");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const doc = h(CvDocument, { messages });
  await renderToFile(doc, OUTPUT_FILE);
  console.log(`CV generado en ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
