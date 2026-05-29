// TalkBook — Variation A · Editorial silencioso

function TBTechRowA({ tech }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: 24,
        padding: "16px 0",
        borderBottom: "1px solid var(--border)",
        cursor: "default",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 13,
        color: open ? "var(--text-primary)" : "var(--text-secondary)",
        transition: "color .2s",
      }}>{tech.name}</div>
      <div style={{
        fontSize: 14, lineHeight: 1.625,
        color: open ? "var(--text-primary)" : "var(--text-secondary)",
        transition: "color .25s",
      }}>{tech.note}</div>
    </div>
  );
}

function TBChapterA({ index, title, children }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <header style={{ display: "flex", alignItems: "baseline", gap: 14, paddingBottom: 4, borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)", letterSpacing: ".08em" }}>
          {String(index).padStart(2, "0")}
        </span>
        <h2 style={{ font: "600 22px/1.3 var(--font-sans)", color: "var(--text-primary)", margin: 0 }}>{title}</h2>
      </header>
      {children}
    </section>
  );
}

function TBArchDiagramA({ lang }) {
  const L = lang === "es" ? {
    client: "Cliente · Expo + React Native",
    clientNote: "iOS y Android desde un único TypeScript",
    api: "API · Hono sobre Workers",
    apiNote: "Streaming de chat al borde, < 400 ms",
    data: "Datos · Supabase + RLS",
    dataNote: "Biblioteca, notas y subrayados por usuario",
    ai: "OpenAI · contexto curado",
    aiNote: "Resumen del libro + tus notas, < 8K tokens",
  } : {
    client: "Client · Expo + React Native",
    clientNote: "iOS and Android from a single TypeScript base",
    api: "API · Hono on Workers",
    apiNote: "Chat streaming at the edge, < 400 ms",
    data: "Data · Supabase + RLS",
    dataNote: "Library, notes and highlights per user",
    ai: "OpenAI · curated context",
    aiNote: "Book summary + your notes, under 8K tokens",
  };
  const Box = ({ title, sub, mono }) => (
    <div style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "14px 16px", background: "var(--bg-secondary)", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-secondary)", letterSpacing: ".06em" }}>{mono}</div>
      <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 500 }}>{title}</div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{sub}</div>
    </div>
  );
  const Bar = () => (
    <div aria-hidden style={{ width: 1, height: 18, background: "var(--border)", margin: "0 auto" }}/>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
      <Box mono="A" title={L.client} sub={L.clientNote}/>
      <Bar/>
      <Box mono="B" title={L.api} sub={L.apiNote}/>
      <Bar/>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Box mono="C₁" title={L.data} sub={L.dataNote}/>
        <Box mono="C₂" title={L.ai} sub={L.aiNote}/>
      </div>
    </div>
  );
}

function TBVariationA({ lang, setLang, theme, setTheme }) {
  const t = TALKBOOK[lang];
  const [lbIndex, setLbIndex] = useState(null);

  const tiles = useMemo(() => ([
    { label: "01 · Biblioteca + Chat", kind: "mock", render: () => <MockTBPair/>,    aspect: "16 / 9" },
    { label: "02 · Mi Biblioteca",    kind: "mock", render: () => <MockTBLibrary/>,  aspect: "4 / 5" },
    { label: "03 · Estadísticas",     kind: "mock", render: () => <MockTBStats/>,    aspect: "4 / 5" },
    { label: "04 · Stats + Chats",    kind: "mock", render: () => <MockTBPair2/>,    aspect: "16 / 9" },
    { label: "05 · Chat con el libro",kind: "mock", render: () => <MockTBBookChat/>, aspect: "4 / 5" },
    { label: "06 · Lector + notas",   kind: "mock", render: () => <MockTBReader/>,   aspect: "4 / 5" },
  ]), []);

  return (
    <div style={{ position: "relative", background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100%", fontFamily: "var(--font-sans)" }}>
      <TopBar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t}/>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px 32px 96px", display: "flex", flexDirection: "column", gap: 80 }}>

        {/* Hero */}
        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)", letterSpacing: ".08em" }}>
            {t.eyebrow}
          </div>
          <h1 style={{
            font: "600 84px/.95 var(--font-display)",
            letterSpacing: "-0.04em",
            color: "var(--text-primary)",
            margin: 0,
          }}>{t.title}</h1>
          <p style={{ font: "400 20px/1.5 var(--font-sans)", color: "var(--text-secondary)", margin: 0, maxWidth: 620, textWrap: "balance" }}>
            {t.tagline}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, paddingTop: 8, fontSize: 14, color: "var(--text-secondary)", flexWrap: "wrap" }}>
            <a href={`https://${t.site}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text-primary)" }}>
              {t.site} <ExtIcon width={12} height={12}/>
            </a>
            <span>·</span>
            <span>{t.role}</span>
            <span>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--success)" }}>
              <span className="dot-pulse" style={{ width: 6, height: 6, borderRadius: 999, background: "var(--success)" }}/>
              {lang === "es" ? "Beta privada" : "Private beta"}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 4 }}>
            <Chip>Mobile</Chip>
            <Chip>React Native</Chip>
            <Chip>Expo</Chip>
            <Chip>TypeScript</Chip>
            <Chip>OpenAI</Chip>
            <Chip>Supabase</Chip>
          </div>
        </section>

        {/* Cover */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
          <img src="assets/talkbook-main.webp" alt="TalkBook — tres pantallas"
               style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>

        {/* 01 Problema */}
        <TBChapterA index={1} title={t.problemTitle}>
          <div style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}>
            {t.problemBody}
          </div>
          <blockquote style={{
            margin: "16px 0 0", paddingLeft: 20,
            borderLeft: "2px solid var(--border)",
            font: "500 22px/1.4 var(--font-sans)",
            color: "var(--text-primary)",
            textWrap: "balance",
          }}>"{t.bigQuote}"</blockquote>
        </TBChapterA>

        {/* 02 Video */}
        <TBChapterA index={2} title={t.videoTitle}>
          <VideoPlayer
            poster="assets/talkbook-main.webp"
            label={`TalkBook · ${t.videoDuration}`}
            duration={108}
            ariaLabel={t.videoTitle}
          />
          <p style={{ fontSize: 13, lineHeight: 1.5, color: "var(--text-secondary)", margin: 0, fontStyle: "italic" }}>
            {t.videoCaption}
          </p>
        </TBChapterA>

        {/* 03 Stack */}
        <TBChapterA index={3} title={t.stackTitle}>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>{t.stackHint}</p>
          <div style={{ borderTop: "1px solid var(--border)", marginTop: 8 }}>
            {TB_STACK[lang].map((tech) => <TBTechRowA key={tech.name} tech={tech}/>)}
          </div>
        </TBChapterA>

        {/* 04 Features */}
        <TBChapterA index={4} title={t.featuresTitle}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {TB_FEATURES[lang].map((f, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 12, alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text-primary)" }}>{f}</span>
              </li>
            ))}
          </ul>
        </TBChapterA>

        {/* 05 Capturas */}
        <TBChapterA index={5} title={t.galleryTitle}>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>{t.galleryHint}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "120px", gap: 12 }}>
            {tiles.map((tile, i) => {
              const spans = [
                { c: "1 / span 4", r: "span 2" },
                { c: "5 / span 2", r: "span 2" },
                { c: "1 / span 2", r: "span 2" },
                { c: "3 / span 4", r: "span 2" },
                { c: "1 / span 3", r: "span 2" },
                { c: "4 / span 3", r: "span 2" },
              ][i] || { c: "auto", r: "span 2" };
              return (
                <GalleryTile key={i} tile={tile} onOpen={() => setLbIndex(i)}
                  style={{ gridColumn: spans.c, gridRow: spans.r }}/>
              );
            })}
          </div>
        </TBChapterA>

        {/* 06 Arquitectura */}
        <TBChapterA index={6} title={t.archTitle}>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>{t.archBody}</p>
          <TBArchDiagramA lang={lang}/>
        </TBChapterA>

        {/* 07 Aprendizajes */}
        <TBChapterA index={7} title={t.learnTitle}>
          <p style={{
            font: "500 22px/1.55 var(--font-sans)",
            color: "var(--text-primary)",
            margin: 0,
            textWrap: "pretty",
          }}>{t.learnBody}</p>
        </TBChapterA>

        {/* Links */}
        <section style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
          <h3 style={{ font: "600 16px/1.3 var(--font-sans)", color: "var(--text-primary)", margin: 0 }}>{t.linksTitle}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { href: `https://${t.site}`, label: lang === "es" ? "Listarse para la beta privada" : "Join the private beta", icon: <ExtIcon width={14} height={14}/> },
              { href: "https://github.com/HugoOlivaR", label: lang === "es" ? "Código en GitHub (privado, demo bajo petición)" : "Code on GitHub (private, demo on request)", icon: <GitHubIcon width={14} height={14}/> },
              { href: "#", label: lang === "es" ? "Cómo construyo apps móviles con Expo en 2026 — en el blog" : "How I build mobile apps with Expo in 2026 — on the blog", icon: <ArrowRightIcon width={14} height={14}/> },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                 style={{
                   display: "flex", alignItems: "center", justifyContent: "space-between",
                   padding: "16px 0", borderBottom: "1px solid var(--border)",
                   color: "var(--text-secondary)", fontSize: 15, transition: "color .2s",
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
                 onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                <span>{l.label}</span>
                {l.icon}
              </a>
            ))}
          </div>
        </section>

        {/* Related */}
        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h3 style={{ font: "600 16px/1.3 var(--font-sans)", color: "var(--text-primary)", margin: 0 }}>{t.relatedTitle}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {TB_RELATED.map((p) => (
              <a key={p.slug} href="#"
                 style={{ display: "flex", flexDirection: "column", gap: 10, color: "inherit", cursor: "pointer" }}>
                <div style={{ aspectRatio: "16 / 10", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                </div>
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", letterSpacing: ".06em" }}>{p.year}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{p.title}</div>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: "var(--text-secondary)", margin: 0 }}>{p[lang]}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-secondary)" }}>
          <span>Hugo Oliva · Madrid</span>
          <span>{lang === "es" ? "Disponible para proyectos" : "Open for projects"}</span>
        </footer>
      </main>

      <Lightbox tiles={tiles} openIndex={lbIndex} setOpenIndex={setLbIndex}/>
    </div>
  );
}

Object.assign(window, { TBVariationA });
