// Variation B — "Asimétrico editorial"
// Empuja el sistema: grid asimétrico, número de impacto, stack como matriz visual.

function BlockB({ children, num, title, lang }) {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32, paddingTop: 48, borderTop: "1px solid var(--border)" }}>
      <header style={{ gridColumn: "1 / span 3", display: "flex", flexDirection: "column", gap: 8, position: "sticky", top: 88, height: "fit-content" }}>
        <div style={{
          font: "600 56px/1 var(--font-display)",
          letterSpacing: "-0.04em",
          color: "var(--text-primary)",
        }}>{String(num).padStart(2, "0")}</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".12em" }}>{title}</div>
      </header>
      <div style={{ gridColumn: "5 / span 8", display: "flex", flexDirection: "column", gap: 20 }}>
        {children}
      </div>
    </section>
  );
}

function StackMatrixB({ stack, lang }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = stack[activeIdx];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "stretch" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        background: "var(--border)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        overflow: "hidden",
      }}>
        {stack.map((tech, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={tech.name}
              onMouseEnter={() => setActiveIdx(i)}
              onFocus={() => setActiveIdx(i)}
              style={{
                aspectRatio: "1 / 1",
                background: isActive ? "var(--bg-primary)" : "var(--bg-secondary)",
                border: 0,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                cursor: "default",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                fontFamily: "var(--font-sans)",
                textAlign: "left",
                transition: "background-color .2s, color .2s",
              }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".08em", color: "var(--text-secondary)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.2 }}>{tech.name}</span>
            </button>
          );
        })}
      </div>
      <aside style={{
        border: "1px solid var(--border)", borderRadius: 10, padding: 24,
        background: "var(--bg-secondary)",
        display: "flex", flexDirection: "column", gap: 16, justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-secondary)", letterSpacing: ".08em" }}>
            {String(activeIdx + 1).padStart(2, "0")} / {String(stack.length).padStart(2, "0")}
          </div>
          <div style={{ font: "600 28px/1.2 var(--font-sans)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {active.name}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>{active.note}</p>
        </div>
        <div style={{ fontSize: 11, color: "var(--text-secondary)", fontStyle: "italic" }}>
          {lang === "es" ? "Pasa el cursor por cualquier tile." : "Hover any tile."}
        </div>
      </aside>
    </div>
  );
}

function FlowDiagramB({ lang }) {
  const L = lang === "es" ? {
    a: "Cliente",
    aSub: "Next.js · App Router",
    b: "Edge",
    bSub: "Server actions · orquestación",
    c: "Postgres",
    cSub: "RLS · Drizzle",
    d: "OpenAI",
    dSub: "Tool-calling sobre vista solo-lectura",
    e: "PSD2",
    eSub: "Agregación bancaria",
    f: "Stripe",
    fSub: "Suscripciones + connect",
    edge1: "data",
    edge2: "tools",
    edge3: "banks",
    edge4: "pay",
  } : {
    a: "Client", aSub: "Next.js · App Router",
    b: "Edge", bSub: "Server actions · orchestration",
    c: "Postgres", cSub: "RLS · Drizzle",
    d: "OpenAI", dSub: "Tool-calling over read-only view",
    e: "PSD2", eSub: "Bank aggregation",
    f: "Stripe", fSub: "Subs + connect",
    edge1: "data", edge2: "tools", edge3: "banks", edge4: "pay",
  };
  const Node = ({ title, sub, style }) => (
    <div style={{
      border: "1px solid var(--border)",
      borderRadius: 8, padding: "10px 14px", background: "var(--bg-secondary)",
      display: "flex", flexDirection: "column", gap: 2, minWidth: 140,
      ...style,
    }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{title}</div>
      <div style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
  return (
    <div style={{
      position: "relative",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: 28,
      marginTop: 8,
      background: "var(--bg-primary)",
      overflow: "hidden",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 1 }}>
        <Node title={L.a} sub={L.aSub}/>
        <Node title={L.b} sub={L.bSub}/>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Node title={L.c} sub={L.cSub}/>
          <Node title={L.d} sub={L.dSub}/>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 60, marginTop: 28, position: "relative", zIndex: 1 }}>
        <div/>
        <div style={{ display: "flex", gap: 12 }}>
          <Node title={L.e} sub={L.eSub} style={{ flex: 1 }}/>
          <Node title={L.f} sub={L.fSub} style={{ flex: 1 }}/>
        </div>
        <div/>
      </div>
      {/* Lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden>
        <defs>
          <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-secondary)"/>
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function VariationB({ lang, setLang, theme, setTheme }) {
  const t = TESORA[lang];
  const [lbIndex, setLbIndex] = useState(null);

  const tiles = useMemo(() => ([
    { label: "01 · Dashboard", kind: "img", src: "assets/tesora-main.webp", aspect: "16 / 9" },
    { label: "02 · Net worth", kind: "mock", render: () => <MockDashboard/>, aspect: "16 / 9" },
    { label: "03 · Asistente IA", kind: "mock", render: () => <MockAIChat/>, aspect: "4 / 5" },
    { label: "04 · Health Score", kind: "mock", render: () => <MockHealthScore/>, aspect: "4 / 5" },
    { label: "05 · Simulador deuda", kind: "mock", render: () => <MockDebtSim/>, aspect: "16 / 9" },
    { label: "06 · Marketplace", kind: "mock", render: () => <MockMarketplace/>, aspect: "4 / 5" },
  ]), []);

  return (
    <div style={{ position: "relative", background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100%", fontFamily: "var(--font-sans)" }}>
      <TopBar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t}/>

      <main style={{ padding: "0 64px 96px" }}>

        {/* Hero — asimétrico */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 32,
          alignItems: "end",
          padding: "96px 0 48px",
        }}>
          {/* Year vertical */}
          <div style={{
            gridColumn: "1 / span 1",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: ".24em",
            color: "var(--text-secondary)",
            alignSelf: "start",
            paddingTop: 12,
          }}>2025 — 2026</div>

          {/* Title block */}
          <div style={{ gridColumn: "2 / span 7", display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)", letterSpacing: ".12em", textTransform: "uppercase" }}>
              Case study · Fintech · Founder
            </div>
            <h1 style={{
              font: "600 220px/.86 var(--font-display)",
              letterSpacing: "-0.06em",
              color: "var(--text-primary)",
              margin: 0,
              textAlign: "left",
            }}>{t.title}</h1>
          </div>

          {/* Right column */}
          <div style={{ gridColumn: "10 / span 3", display: "flex", flexDirection: "column", gap: 16, alignSelf: "end", paddingBottom: 12 }}>
            <p style={{ font: "400 16px/1.55 var(--font-sans)", color: "var(--text-secondary)", margin: 0 }}>
              {t.tagline}
            </p>
            <div style={{ height: 1, background: "var(--border)" }}/>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>{lang === "es" ? "Rol" : "Role"}</span>
                <span style={{ color: "var(--text-primary)" }}>{t.role}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>{lang === "es" ? "Estado" : "Status"}</span>
                <span style={{ color: "var(--success)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span className="dot-pulse" style={{ width: 6, height: 6, borderRadius: 999, background: "var(--success)" }}/>
                  {lang === "es" ? "En producción" : "Live"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>{lang === "es" ? "Sitio" : "Site"}</span>
                <a href={`https://${t.site}`} target="_blank" rel="noopener noreferrer"
                   style={{ color: "var(--text-primary)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  {t.site} <ExtIcon width={11} height={11}/>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Cover — vídeo demo, offset left */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32, marginBottom: 24 }}>
          <div style={{ gridColumn: "2 / span 10" }}>
            <VideoPlayer
              poster="assets/tesora-main.webp"
              label={`Tesora · ${t.videoDuration}`}
              ariaLabel={t.videoTitle}
            />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32, marginBottom: 96 }}>
          <p style={{ gridColumn: "2 / span 10", fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)", margin: 0, fontStyle: "italic" }}>
            {t.videoCaption}
          </p>
        </div>

        {/* Big-number pull quote */}
        <section style={{
          display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32,
          alignItems: "center", padding: "32px 0 48px",
          borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
          marginBottom: 64,
        }}>
          <div style={{ gridColumn: "2 / span 5" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-secondary)", letterSpacing: ".12em", marginBottom: 12 }}>
              {lang === "es" ? "TESIS" : "THESIS"}
            </div>
            <div style={{
              font: "600 120px/.9 var(--font-display)",
              letterSpacing: "-0.05em",
              color: "var(--text-primary)",
            }}>
              1<span style={{ color: "var(--text-secondary)" }}>×</span>
            </div>
          </div>
          <div style={{ gridColumn: "7 / span 5" }}>
            <p style={{ font: "500 28px/1.35 var(--font-sans)", color: "var(--text-primary)", margin: 0, textWrap: "balance", letterSpacing: "-0.01em" }}>
              {t.bigQuote}
            </p>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 16, lineHeight: 1.6 }}>
              {lang === "es"
                ? "Una sola app — cuentas, deudas, inversiones y un asistente que entiende el contexto entero."
                : "One app — accounts, debts, investments, and an assistant that understands the full context."}
            </p>
          </div>
        </section>

        {/* 01 Problema */}
        <BlockB num={1} title={t.problemTitle} lang={lang}>
          <p style={{ font: "400 19px/1.65 var(--font-sans)", color: "var(--text-primary)", margin: 0, whiteSpace: "pre-wrap", textWrap: "pretty" }}>
            {t.problemBody}
          </p>
        </BlockB>

        {/* 02 Stack */}
        <BlockB num={2} title={t.stackTitle} lang={lang}>
          <StackMatrixB stack={STACK[lang]} lang={lang}/>
        </BlockB>

        {/* 04 Features — números gigantes */}
        <BlockB num={3} title={t.featuresTitle} lang={lang}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "var(--border)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            {FEATURES[lang].map((f, i) => (
              <div key={i} style={{
                background: "var(--bg-primary)",
                padding: "28px 24px",
                display: "flex", gap: 20, alignItems: "flex-start",
                minHeight: 130,
              }}>
                <div style={{
                  font: "600 44px/1 var(--font-display)",
                  letterSpacing: "-0.03em",
                  color: "var(--text-secondary)",
                  minWidth: 56,
                }}>{String(i + 1).padStart(2, "0")}</div>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text-primary)", margin: 0, paddingTop: 4 }}>{f}</p>
              </div>
            ))}
            {/* Empty cell if odd count */}
            {FEATURES[lang].length % 2 === 1 && (
              <div style={{ background: "var(--bg-secondary)" }}/>
            )}
          </div>
        </BlockB>

        {/* 05 Capturas — masonry */}
        <BlockB num={4} title={t.galleryTitle} lang={lang}>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>{t.galleryHint}</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "100px",
            gap: 14,
          }}>
            {tiles.map((tile, i) => {
              const spans = [
                { c: "1 / span 4", r: "span 3" },
                { c: "5 / span 2", r: "span 3" },
                { c: "1 / span 2", r: "span 4" },
                { c: "3 / span 2", r: "span 4" },
                { c: "5 / span 2", r: "span 2" },
                { c: "5 / span 2", r: "span 2" },
              ][i] || { c: "auto", r: "span 3" };
              return (
                <GalleryTile key={i} tile={tile} onOpen={() => setLbIndex(i)}
                  style={{ gridColumn: spans.c, gridRow: spans.r }}/>
              );
            })}
          </div>
        </BlockB>

        {/* 06 Arquitectura */}
        <BlockB num={5} title={t.archTitle} lang={lang}>
          <p style={{ font: "400 17px/1.65 var(--font-sans)", color: "var(--text-secondary)", margin: 0 }}>{t.archBody}</p>
          <FlowDiagramB lang={lang}/>
        </BlockB>

        {/* 07 Aprendizajes — gigantesco */}
        <section style={{
          display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32,
          paddingTop: 96, paddingBottom: 64, marginTop: 48,
          borderTop: "1px solid var(--border)",
        }}>
          <div style={{ gridColumn: "1 / span 3", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ font: "600 56px/1 var(--font-display)", letterSpacing: "-0.04em", color: "var(--text-primary)" }}>06</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".12em" }}>{t.learnTitle}</div>
          </div>
          <blockquote style={{
            gridColumn: "5 / span 8",
            margin: 0,
            font: "500 36px/1.35 var(--font-display)",
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            textWrap: "pretty",
          }}>
            <span aria-hidden style={{ color: "var(--text-secondary)" }}>"</span>
            {t.learnBody}
            <span aria-hidden style={{ color: "var(--text-secondary)" }}>"</span>
          </blockquote>
        </section>

        {/* Links */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32, paddingTop: 48, borderTop: "1px solid var(--border)", marginBottom: 64 }}>
          <h3 style={{ gridColumn: "1 / span 3", font: "600 14px/1.3 var(--font-sans)", textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-primary)", margin: 0 }}>{t.linksTitle}</h3>
          <div style={{ gridColumn: "5 / span 8", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            {[
              { href: `https://${t.site}`, label: lang === "es" ? "App en producción" : "Live app", sub: t.site, icon: <ExtIcon width={14} height={14}/> },
              { href: "https://github.com/HugoOlivaR", label: "GitHub", sub: lang === "es" ? "Privado · demo" : "Private · demo", icon: <GitHubIcon width={14} height={14}/> },
              { href: "#", label: lang === "es" ? "Post relacionado" : "Related post", sub: lang === "es" ? "Cómo OpenAI cambió Tesora" : "How OpenAI changed Tesora", icon: <ArrowRightIcon width={14} height={14}/> },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                 style={{ background: "var(--bg-primary)", padding: "20px 18px", display: "flex", flexDirection: "column", gap: 6, color: "var(--text-primary)", transition: "background-color .2s" }}
                 onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-secondary)"}
                 onMouseLeave={(e) => e.currentTarget.style.background = "var(--bg-primary)"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{l.label}</span>
                  {l.icon}
                </div>
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{l.sub}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Related */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32, paddingTop: 48, borderTop: "1px solid var(--border)" }}>
          <h3 style={{ gridColumn: "1 / span 3", font: "600 14px/1.3 var(--font-sans)", textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-primary)", margin: 0 }}>{t.relatedTitle}</h3>
          <div style={{ gridColumn: "5 / span 8", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {RELATED.map((p) => (
              <a key={p.slug} href="#"
                 style={{ display: "flex", flexDirection: "column", gap: 10, color: "inherit", cursor: "pointer", transition: "transform .25s" }}
                 onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                 onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                <div style={{ aspectRatio: "4 / 3", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
                  <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                </div>
                <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", letterSpacing: ".08em" }}>{p.year}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{p.title}</div>
                <p style={{ fontSize: 12, lineHeight: 1.5, color: "var(--text-secondary)", margin: 0 }}>{p[lang]}</p>
              </a>
            ))}
          </div>
        </section>

        <footer style={{ paddingTop: 80, marginTop: 64, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-secondary)" }}>
          <span>Hugo Oliva · Madrid</span>
          <span>{lang === "es" ? "Disponible para proyectos" : "Open for projects"}</span>
        </footer>
      </main>

      <Lightbox tiles={tiles} openIndex={lbIndex} setOpenIndex={setLbIndex}/>
    </div>
  );
}

Object.assign(window, { VariationB });
