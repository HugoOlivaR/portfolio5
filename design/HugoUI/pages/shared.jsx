// Shared primitives + Tesora content — used by both variations.
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ─── Icons ──────────────────────────────────────────────────────────────
const SunIcon = (p) => (
  <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
);
const MoonIcon = (p) => (
  <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
);
const ArrowLeftIcon = (p) => (
  <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);
const ExtIcon = (p) => (
  <svg {...p} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);
const PlayIcon = (p) => (
  <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
);
const PauseIcon = (p) => (
  <svg {...p} fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
);
const VolumeIcon = (p) => (
  <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path d="M3 10v4h4l5 5V5L7 10H3z"/><path d="M16.5 12a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" opacity=".8"/></svg>
);
const ExpandIcon = (p) => (
  <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
);
const CloseIcon = (p) => (
  <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
);
const ArrowRightIcon = (p) => (
  <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const GitHubIcon = (p) => (
  <svg {...p} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
);

// ─── Content ─────────────────────────────────────────────────────────────
const TESORA = {
  es: {
    eyebrow: "2025 — 2026 · Fintech",
    title: "Tesora",
    tagline: "Plataforma de gestión financiera con IA: conecta tus bancos, unifica tu patrimonio y recibe asesoramiento inteligente.",
    role: "Founder · Lead full-stack",
    site: "tesora.app",
    backLabel: "Volver a proyectos",
    problemTitle: "El problema",
    problemBody: "Los productos de finanzas personales que existen suelen quedarse en dos extremos: o son agregadores fríos que solo muestran números, o son apps de coaching genéricas sin acceso real a tu situación.\n\nTesora nace para cerrar esa brecha — un agregador serio con un asistente de IA que sí conoce tu patrimonio, tus deudas y tus inversiones, y puede razonar sobre ellos en tiempo real.",
    bigQuote: "Un solo lugar para ver, entender y mover tu dinero.",
    videoTitle: "Demo en vídeo",
    videoCaption: "Recorrido por el onboarding — conectar banca, primer Health Score y conversación con el asistente.",
    videoDuration: "2:14",
    stackTitle: "Stack técnico",
    stackHint: "Pasa el cursor para ver por qué la elegí.",
    featuresTitle: "Features clave",
    featuresHint: "Lo que está en producción hoy.",
    galleryTitle: "Capturas",
    galleryHint: "Click para ampliar.",
    archTitle: "Arquitectura",
    archBody: "Mantengo todo razonablemente plano: un frontend Next.js que llama a server actions y a un Edge worker que orquesta el asistente. La capa de IA tiene acceso a una vista de solo-lectura sobre los datos del usuario, nunca a las credenciales bancarias.",
    learnTitle: "Aprendizajes",
    learnBody: "Con Tesora he aprendido a ver mi dinero de una forma completamente distinta: ya no solo miro saldos sueltos, sino que entiendo cómo se relacionan mis ingresos, gastos, deudas e inversiones en tiempo real. Y a nivel técnico, he interiorizado que la IA útil no es la más grande — es la que tiene el contexto correcto.",
    linksTitle: "Enlaces",
    relatedTitle: "Otros proyectos",
  },
  en: {
    eyebrow: "2025 — 2026 · Fintech",
    title: "Tesora",
    tagline: "AI-powered personal finance: connect your banks, unify your wealth, get intelligent advice.",
    role: "Founder · Lead full-stack",
    site: "tesora.app",
    backLabel: "Back to projects",
    problemTitle: "The problem",
    problemBody: "Existing personal-finance products tend to live at two extremes: cold aggregators that only display numbers, or generic coaching apps with no real access to your situation.\n\nTesora was born to close that gap — a serious aggregator with an AI assistant that actually knows your wealth, your debts, and your investments, and can reason over them in real time.",
    bigQuote: "One place to see, understand and move your money.",
    videoTitle: "Demo video",
    videoCaption: "Walk-through of the onboarding — connecting a bank, first Health Score and a conversation with the assistant.",
    videoDuration: "2:14",
    stackTitle: "Tech stack",
    stackHint: "Hover to see why I picked it.",
    featuresTitle: "Key features",
    featuresHint: "What's shipping today.",
    galleryTitle: "Screens",
    galleryHint: "Click to expand.",
    archTitle: "Architecture",
    archBody: "I keep things reasonably flat: a Next.js frontend calling server actions and an Edge worker that orchestrates the assistant. The AI layer has read-only access to a view of the user's data — never to banking credentials.",
    learnTitle: "Learnings",
    learnBody: "With Tesora I've learned to see my money in a completely different way: no longer just scattered balances, but how income, expenses, debts and investments relate in real time. And technically, I've internalized that useful AI isn't the biggest model — it's the one with the right context.",
    linksTitle: "Links",
    relatedTitle: "Other projects",
  },
};

const STACK = {
  es: [
    { name: "Next.js 16", note: "App Router + RSC + Server Actions. La capa que sostiene todo el frontend y la mitad del backend." },
    { name: "React 19", note: "useOptimistic y transitions para que las mutaciones financieras se sientan instantáneas sin mentir al usuario." },
    { name: "TypeScript", note: "Strict mode en toda la base, validación de inputs con Zod antes de tocar la DB." },
    { name: "PostgreSQL", note: "Supabase + Drizzle. Row Level Security real — cada usuario solo ve sus filas, también desde la IA." },
    { name: "OpenAI", note: "GPT con tool-calling sobre una vista de solo lectura del patrimonio. El modelo razona, no toca credenciales." },
    { name: "Stripe", note: "Suscripciones, billing del marketplace de asesores, y connect para repartir pagos." },
    { name: "Tailwind v4", note: "Sistema de diseño con tokens semánticos; cero CSS suelto en componentes." },
    { name: "Vercel", note: "Deploy continuo + Edge runtime para latencias bajas en LATAM y Europa." },
  ],
  en: [
    { name: "Next.js 16", note: "App Router + RSC + Server Actions. The layer holding up the whole frontend and half of the backend." },
    { name: "React 19", note: "useOptimistic and transitions so financial mutations feel instant without lying to the user." },
    { name: "TypeScript", note: "Strict mode across the board, input validation with Zod before anything hits the DB." },
    { name: "PostgreSQL", note: "Supabase + Drizzle. Real Row Level Security — each user only sees their own rows, including from the AI." },
    { name: "OpenAI", note: "GPT with tool-calling over a read-only view of net worth. The model reasons, it never touches credentials." },
    { name: "Stripe", note: "Subscriptions, billing for the advisor marketplace, and Connect to split payments." },
    { name: "Tailwind v4", note: "Design system with semantic tokens; zero loose CSS inside components." },
    { name: "Vercel", note: "Continuous deploy + Edge runtime for low latencies across LATAM and Europe." },
  ],
};

const FEATURES = {
  es: [
    "Agregación segura de cuentas y patrimonio unificado, con histórico mensual.",
    "Análisis inteligente de gastos y categorización automática.",
    "Gestión de deudas con simulaciones Avalanche y Snowball.",
    "Marketplace de asesores financieros certificados, con billing integrado.",
    "Asistente IA conversacional con acceso contextual a tus datos.",
    "Planificación de ahorro con escenarios realistas y proyecciones.",
    "Financial Health Score dinámico y alertas proactivas por email.",
  ],
  en: [
    "Secure account aggregation and unified net worth, with monthly history.",
    "Smart expense analysis and automatic categorization.",
    "Debt management with Avalanche and Snowball simulations.",
    "Marketplace of certified financial advisors, with integrated billing.",
    "Conversational AI assistant with contextual access to your data.",
    "Savings planning with realistic scenarios and projections.",
    "Dynamic Financial Health Score and proactive email alerts.",
  ],
};

const RELATED = [
  { slug: "cosmo-ai", title: "Cosmo AI", image: "assets/cosmo-main.webp", year: "2024 — 2025",
    es: "Asistente de productividad con IA: tareas, proyectos y apps en un solo chat personalizado.",
    en: "AI productivity assistant: tasks, projects and apps in one personalized chat." },
  { slug: "btc-tracker", title: "BTC Tracker", image: "assets/btc-tracker.webp", year: "2026",
    es: "Tracker de compras de Bitcoin: precio medio, holdings y P&L en tiempo real.",
    en: "Bitcoin tracker: average price, holdings and real-time P&L." },
  { slug: "roundtable", title: "Roundtable", image: "assets/roundtable-main.webp", year: "2026",
    es: "Mesa redonda personal con pensadores históricos y modernos representados por agentes de IA.",
    en: "Personal roundtable with historical and modern thinkers represented by AI agents." },
];

// ─── TopBar ─────────────────────────────────────────────────────────────
function TopBar({ lang, setLang, theme, setTheme, t }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 30,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 48px",
      background: "color-mix(in oklab, var(--bg-primary) 88%, transparent)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <a style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--text-secondary)", fontSize: 14, cursor: "pointer", transition: "color .2s" }}
         onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
         onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
        <ArrowLeftIcon width={16} height={16} />
        <span>{t.backLabel}</span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme"
                style={{ background: "transparent", border: 0, padding: 4, color: "var(--text-primary)", cursor: "pointer" }}>
          {theme === "dark" ? <SunIcon width={18} height={18}/> : <MoonIcon width={18} height={18}/>}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14 }}>
          <button onClick={() => setLang("en")} style={{ padding: "4px 8px", color: lang === "en" ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: lang === "en" ? 500 : 400, background: "transparent", border: 0, cursor: "pointer" }}>EN</button>
          <span style={{ color: "var(--text-secondary)" }}>|</span>
          <button onClick={() => setLang("es")} style={{ padding: "4px 8px", color: lang === "es" ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: lang === "es" ? 500 : 400, background: "transparent", border: 0, cursor: "pointer" }}>ES</button>
        </div>
      </div>
    </header>
  );
}

// ─── VideoPlayer — custom fake player with real progress ────────────────
function VideoPlayer({ poster, label, duration = 134, ariaLabel }) {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef(null);
  const lastRef = useRef(0);

  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return; }
    lastRef.current = performance.now();
    const tick = (now) => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setTime((t) => {
        const next = t + dt;
        if (next >= duration) { setPlaying(false); return 0; }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, duration]);

  const pct = (time / duration) * 100;
  const fmt = (s) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
  const showChrome = hovering || !playing;

  return (
    <div role="region" aria-label={ariaLabel || "Video player"}
      style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", background: "#000", cursor: "pointer" }}
      onClick={() => setPlaying(p => !p)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <img src={poster} alt={label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: playing ? "brightness(.85)" : "brightness(.7)", transition: "filter .3s" }}/>
      {/* Center play */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
        opacity: playing ? 0 : 1, transition: "opacity .25s",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "rgba(255,255,255,.95)", color: "#0a0a0a",
          display: "flex", alignItems: "center", justifyContent: "center",
          paddingLeft: 4,
        }}>
          <PlayIcon width={28} height={28}/>
        </div>
      </div>
      {/* Bottom chrome */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "14px 16px 12px",
        background: "linear-gradient(to top, rgba(0,0,0,.7), rgba(0,0,0,0))",
        opacity: showChrome ? 1 : 0, transition: "opacity .25s",
        color: "#fff", display: "flex", flexDirection: "column", gap: 8,
      }}
        onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative", height: 3, background: "rgba(255,255,255,.25)", borderRadius: 2, cursor: "pointer" }}
             onClick={(e) => {
               const r = e.currentTarget.getBoundingClientRect();
               setTime(Math.max(0, Math.min(duration, ((e.clientX - r.left) / r.width) * duration)));
             }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: "#fff", borderRadius: 2 }}/>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontFamily: "var(--font-mono)" }}>
          <button onClick={() => setPlaying(p => !p)} aria-label={playing ? "Pause" : "Play"}
            style={{ background: "transparent", border: 0, color: "#fff", cursor: "pointer", padding: 0, display: "inline-flex" }}>
            {playing ? <PauseIcon width={18} height={18}/> : <PlayIcon width={18} height={18}/>}
          </button>
          <VolumeIcon width={16} height={16}/>
          <span style={{ opacity: .9 }}>{fmt(time)} / {fmt(duration)}</span>
          <span style={{ flex: 1 }}/>
          <span style={{ opacity: .8 }}>{label}</span>
          <ExpandIcon width={16} height={16}/>
        </div>
      </div>
    </div>
  );
}

// ─── Mock product screens (used as gallery items) ───────────────────────
function MockDashboard() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", padding: 20, display: "flex", flexDirection: "column", gap: 14, fontFamily: "var(--font-sans)" }}>
      <div style={{ fontSize: 11, color: "#a0a0a0", letterSpacing: ".06em" }}>PATRIMONIO TOTAL</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <div style={{ fontSize: 38, fontWeight: 600, color: "#fff", letterSpacing: "-.02em" }}>€127.420</div>
        <div style={{ fontSize: 12, color: "#22c55e" }}>+4,2% este mes</div>
      </div>
      <div style={{ position: "relative", height: 90, marginTop: 4 }}>
        <svg viewBox="0 0 300 90" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,.18)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </linearGradient>
          </defs>
          <path d="M0 70 L 30 62 L 60 65 L 90 50 L 120 55 L 150 40 L 180 42 L 210 30 L 240 28 L 270 20 L 300 18 L 300 90 L 0 90 Z" fill="url(#g1)"/>
          <path d="M0 70 L 30 62 L 60 65 L 90 50 L 120 55 L 150 40 L 180 42 L 210 30 L 240 28 L 270 20 L 300 18" fill="none" stroke="#fff" strokeWidth="1.4"/>
        </svg>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 4 }}>
        {[
          { l: "Cuentas", v: "€34.120" },
          { l: "Inversión", v: "€89.300" },
          { l: "Deuda", v: "−€2.000" },
        ].map((c) => (
          <div key={c.l} style={{ border: "1px solid #262626", borderRadius: 8, padding: "10px 12px", background: "#141414" }}>
            <div style={{ fontSize: 10, color: "#a0a0a0", marginBottom: 4 }}>{c.l}</div>
            <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>{c.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockAIChat() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", padding: 18, display: "flex", flexDirection: "column", gap: 10, fontFamily: "var(--font-sans)", fontSize: 12 }}>
      <div style={{ fontSize: 11, color: "#a0a0a0", letterSpacing: ".06em", marginBottom: 4 }}>ASISTENTE TESORA</div>
      <div style={{ alignSelf: "flex-end", maxWidth: "78%", background: "#fff", color: "#0a0a0a", padding: "8px 12px", borderRadius: 10, lineHeight: 1.45 }}>
        ¿Cuánto gasté en suscripciones este mes?
      </div>
      <div style={{ alignSelf: "flex-start", maxWidth: "88%", background: "#141414", border: "1px solid #262626", color: "#fff", padding: "10px 12px", borderRadius: 10, lineHeight: 1.5 }}>
        €92,30 en 6 suscripciones — un 18 % más que en febrero. La que más subió: <span style={{ color: "#22c55e" }}>Cloudflare Pro (+€14)</span>.
      </div>
      <div style={{ alignSelf: "flex-end", maxWidth: "70%", background: "#fff", color: "#0a0a0a", padding: "8px 12px", borderRadius: 10 }}>
        Simula cancelar Cloudflare durante 6 meses.
      </div>
      <div style={{ alignSelf: "flex-start", maxWidth: "92%", background: "#141414", border: "1px solid #262626", color: "#fff", padding: "10px 12px", borderRadius: 10, lineHeight: 1.5 }}>
        Ahorrarías ~€84. Aplicándolo a la deuda Avalanche, terminas <b>2 meses antes</b> y pagas €18 menos de intereses.
      </div>
      <div style={{ marginTop: "auto", display: "flex", gap: 8, alignItems: "center", border: "1px solid #262626", borderRadius: 10, padding: "8px 12px", background: "#141414" }}>
        <span style={{ color: "#a0a0a0", fontSize: 11 }}>Pregunta lo que sea sobre tu dinero…</span>
      </div>
    </div>
  );
}

function MockHealthScore() {
  const score = 78;
  const ang = (score / 100) * 270 - 135;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", padding: 20, display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--font-sans)" }}>
      <div style={{ fontSize: 11, color: "#a0a0a0", letterSpacing: ".06em" }}>FINANCIAL HEALTH SCORE</div>
      <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 200 130" style={{ width: "100%", maxWidth: 220, height: "auto" }}>
          <path d="M 25 115 A 75 75 0 0 1 175 115" fill="none" stroke="#262626" strokeWidth="10" strokeLinecap="round"/>
          <path d="M 25 115 A 75 75 0 0 1 175 115" fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="round"
                strokeDasharray="235" strokeDashoffset={235 - (score/100)*235}/>
          <text x="100" y="100" textAnchor="middle" fill="#fff" fontSize="44" fontWeight="600" letterSpacing="-0.02em">{score}</text>
          <text x="100" y="120" textAnchor="middle" fill="#a0a0a0" fontSize="10" letterSpacing="0.1em">DE 100</text>
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: "#a0a0a0" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Ratio de ahorro</span><span style={{ color: "#fff" }}>22 %</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Cobertura emergencia</span><span style={{ color: "#fff" }}>4,1 meses</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Diversificación</span><span style={{ color: "#fff" }}>Equilibrada</span></div>
      </div>
    </div>
  );
}

function MockDebtSim() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", padding: 20, display: "flex", flexDirection: "column", gap: 14, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: 11, color: "#a0a0a0", letterSpacing: ".06em" }}>SIMULADOR DE DEUDA</div>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ fontSize: 10, padding: "2px 8px", border: "1px solid #fff", color: "#fff", borderRadius: 4 }}>Avalanche</span>
          <span style={{ fontSize: 10, padding: "2px 8px", border: "1px solid #262626", color: "#a0a0a0", borderRadius: 4 }}>Snowball</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { l: "Tarjeta visa", pct: 92, v: "€1.842", apr: "19,9 %" },
          { l: "Préstamo coche", pct: 64, v: "€8.200", apr: "6,5 %" },
          { l: "Crédito personal", pct: 28, v: "€2.500", apr: "4,2 %" },
        ].map((d) => (
          <div key={d.l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#fff" }}>
              <span>{d.l} <span style={{ color: "#a0a0a0", marginLeft: 6 }}>{d.apr}</span></span>
              <span>{d.v}</span>
            </div>
            <div style={{ height: 6, background: "#141414", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${d.pct}%`, height: "100%", background: "#fff" }}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "auto", border: "1px solid #262626", borderRadius: 8, padding: 12, background: "#141414", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, color: "#a0a0a0" }}>Pagada en</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#22c55e" }}>22 meses</div>
      </div>
    </div>
  );
}

function MockMarketplace() {
  const advisors = [
    { n: "Lucía Vargas", s: "Inversión a largo plazo", r: "4.9", p: "€80/h" },
    { n: "Marc Roig", s: "Fiscalidad freelance", r: "4.8", p: "€95/h" },
    { n: "Ana Beltrán", s: "Planificación familiar", r: "4.9", p: "€70/h" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0a0a", padding: 20, display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--font-sans)" }}>
      <div style={{ fontSize: 11, color: "#a0a0a0", letterSpacing: ".06em" }}>ASESORES CERTIFICADOS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {advisors.map((a) => (
          <div key={a.n} style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid #262626", borderRadius: 8, padding: 10, background: "#141414" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#262626", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500 }}>{a.n.split(" ").map(x => x[0]).join("")}</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{a.n}</div>
              <div style={{ fontSize: 10, color: "#a0a0a0" }}>{a.s}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
              <div style={{ fontSize: 11, color: "#fff" }}>★ {a.r}</div>
              <div style={{ fontSize: 10, color: "#a0a0a0" }}>{a.p}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Gallery item (rect with mock content + click-to-lightbox) ───────────
function GalleryTile({ tile, onOpen, style }) {
  return (
    <button onClick={() => onOpen(tile)}
      style={{
        position: "relative", display: "block", overflow: "hidden",
        borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-secondary)",
        padding: 0, cursor: "zoom-in", color: "inherit", textAlign: "left",
        transition: "border-color .25s",
        ...style,
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--text-secondary)"}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
      <div style={{ position: "absolute", inset: 0 }}>
        {tile.kind === "img" ? (
          <img src={tile.src} alt={tile.label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: tile.pos || "center" }}/>
        ) : (
          tile.render()
        )}
      </div>
      <div style={{
        position: "absolute", left: 12, bottom: 12, right: 12,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        pointerEvents: "none",
      }}>
        <span style={{ fontSize: 11, color: "#fff", background: "rgba(0,0,0,.55)", padding: "3px 8px", borderRadius: 4, backdropFilter: "blur(4px)", fontFamily: "var(--font-mono)" }}>
          {tile.label}
        </span>
      </div>
    </button>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────
function Lightbox({ tiles, openIndex, setOpenIndex }) {
  useEffect(() => {
    if (openIndex == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i == null ? null : (i + 1) % tiles.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i == null ? null : (i - 1 + tiles.length) % tiles.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, tiles.length, setOpenIndex]);

  if (openIndex == null) return null;
  const tile = tiles[openIndex];

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,.92)",
      display: "flex", flexDirection: "column",
    }}
      onClick={() => setOpenIndex(null)}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", color: "#fff" }}>
        <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "#a0a0a0" }}>
          {String(openIndex + 1).padStart(2, "0")} / {String(tiles.length).padStart(2, "0")} · {tile.label}
        </span>
        <button onClick={(e) => { e.stopPropagation(); setOpenIndex(null); }}
          style={{ background: "transparent", border: 0, color: "#fff", cursor: "pointer", padding: 6 }}>
          <CloseIcon width={20} height={20}/>
        </button>
      </div>
      {/* Image area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 80px 32px", position: "relative" }}
           onClick={(e) => e.stopPropagation()}>
        <div style={{
          position: "relative",
          width: "min(900px, 90%)",
          aspectRatio: tile.aspect || "16 / 9",
          maxHeight: "100%",
          border: "1px solid #262626",
          borderRadius: 12,
          overflow: "hidden",
          background: "#0a0a0a",
        }}>
          {tile.kind === "img" ? (
            <img src={tile.src} alt={tile.label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: tile.pos || "center" }}/>
          ) : (
            tile.render()
          )}
        </div>
        {/* Nav */}
        <button onClick={(e) => { e.stopPropagation(); setOpenIndex((i) => (i - 1 + tiles.length) % tiles.length); }}
          aria-label="Previous"
          style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "1px solid #262626", color: "#fff", padding: 12, borderRadius: "50%", cursor: "pointer" }}>
          <ArrowLeftIcon width={18} height={18}/>
        </button>
        <button onClick={(e) => { e.stopPropagation(); setOpenIndex((i) => (i + 1) % tiles.length); }}
          aria-label="Next"
          style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "1px solid #262626", color: "#fff", padding: 12, borderRadius: "50%", cursor: "pointer" }}>
          <ArrowRightIcon width={18} height={18}/>
        </button>
      </div>
    </div>
  );
}

// ─── Tag chips ───────────────────────────────────────────────────────────
function Chip({ children, accent }) {
  return (
    <span style={{
      fontSize: 12, padding: "4px 10px",
      background: "var(--bg-secondary)",
      border: "1px solid var(--border)",
      borderRadius: 4,
      color: accent ? "var(--success)" : "var(--text-secondary)",
      borderColor: accent ? "var(--success)" : "var(--border)",
      fontFamily: "var(--font-sans)",
    }}>{children}</span>
  );
}

Object.assign(window, {
  TESORA, STACK, FEATURES, RELATED,
  TopBar, VideoPlayer, Lightbox, GalleryTile, Chip,
  MockDashboard, MockAIChat, MockHealthScore, MockDebtSim, MockMarketplace,
  ArrowLeftIcon, ArrowRightIcon, ExtIcon, GitHubIcon,
});
