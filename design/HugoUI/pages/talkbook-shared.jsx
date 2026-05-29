// TalkBook content + mobile mock screens.
// Re-uses primitives from pages/shared.jsx (TopBar, VideoPlayer, Lightbox, GalleryTile, Chip, icons).

const TALKBOOK = {
  es: {
    eyebrow: "2025 — 2026 · Lectura · IA",
    title: "TalkBook",
    tagline: "Lleva tu biblioteca contigo y habla con cada libro: un compañero de lectura que conoce lo que has leído.",
    role: "Solo project · Mobile full-stack",
    site: "talkbook.app",
    backLabel: "Volver a proyectos",
    problemTitle: "El problema",
    problemBody: "Leemos mucho y olvidamos casi todo. Las apps de lectura existentes son trackers fríos — contadores de páginas, gráficos de racha, listas para presumir — pero ninguna te ayuda a procesar lo que el libro te dijo.\n\nTalkBook nace para cerrar esa brecha. Es una biblioteca personal donde cada libro tiene un chat. Le preguntas, te resume, te discute, te recuerda esa idea que subrayaste en el avión hace tres meses.",
    bigQuote: "Cada libro merece una conversación, no solo una estrella.",
    videoTitle: "Demo en vídeo",
    videoCaption: "Recorrido por la app — añadir un libro, ver stats y abrir un chat con \u201cMeditaciones\u201d de Marco Aurelio.",
    videoDuration: "1:48",
    stackTitle: "Stack técnico",
    stackHint: "Pasa el cursor para ver por qué la elegí.",
    featuresTitle: "Features clave",
    featuresHint: "Lo que está en la beta hoy.",
    galleryTitle: "Capturas",
    galleryHint: "Click para ampliar.",
    archTitle: "Arquitectura",
    archBody: "App nativa con Expo + React Native compartiendo modelos de TypeScript con un backend Hono sobre Cloudflare Workers. La biblioteca vive en Supabase con RLS por usuario; los chats van por streaming desde un edge endpoint, con el contexto del libro (resumen + notas del usuario) inyectado antes del prompt.",
    learnTitle: "Aprendizajes",
    learnBody: "Con TalkBook he aprendido que la lectura no termina cuando cierras el libro — empieza ahí. Y a nivel técnico, que React Native con Expo ya es indistinguible de SwiftUI cuando cuidas los detalles, y que el modelo más útil para hablar de un libro no es el más grande: es el que recibe el contexto correcto en menos de 8K tokens.",
    linksTitle: "Enlaces",
    relatedTitle: "Otros proyectos",
  },
  en: {
    eyebrow: "2025 — 2026 · Reading · AI",
    title: "TalkBook",
    tagline: "Carry your library with you and talk to every book: a reading companion that knows what you have read.",
    role: "Solo project · Mobile full-stack",
    site: "talkbook.app",
    backLabel: "Back to projects",
    problemTitle: "The problem",
    problemBody: "We read a lot and forget almost everything. Existing reading apps are cold trackers — page counters, streak charts, lists to show off — but none of them help you process what the book actually said.\n\nTalkBook was born to close that gap. It's a personal library where every book has a chat. You ask, it summarizes, it pushes back, it reminds you of that idea you underlined on a plane three months ago.",
    bigQuote: "Every book deserves a conversation, not just a star.",
    videoTitle: "Demo video",
    videoCaption: "Walk-through of the app — adding a book, checking stats and opening a chat with Marcus Aurelius' \u201cMeditations\u201d.",
    videoDuration: "1:48",
    stackTitle: "Tech stack",
    stackHint: "Hover to see why I picked it.",
    featuresTitle: "Key features",
    featuresHint: "What's in the beta today.",
    galleryTitle: "Screens",
    galleryHint: "Click to expand.",
    archTitle: "Architecture",
    archBody: "Native app with Expo + React Native sharing TypeScript models with a Hono backend on Cloudflare Workers. The library lives in Supabase with per-user RLS; chats stream from an edge endpoint, with book context (summary + user notes) injected before the prompt.",
    learnTitle: "Learnings",
    learnBody: "With TalkBook I've learned that reading doesn't end when you close the book — it starts there. And technically, that React Native with Expo is now indistinguishable from SwiftUI when you mind the details, and that the most useful model to discuss a book isn't the biggest one: it's the one fed the right context in under 8K tokens.",
    linksTitle: "Links",
    relatedTitle: "Other projects",
  },
};

const TB_STACK = {
  es: [
    { name: "Expo SDK 53", note: "Build, OTA updates y dev client. Lo que hace que iterar en móvil deje de doler." },
    { name: "React Native", note: "Una sola base; el 95 % de la UI es compartida entre iOS y Android. SwiftUI sin el coste del lock-in." },
    { name: "TypeScript", note: "Strict mode end-to-end. Los modelos del libro y de los mensajes son los mismos en cliente y servidor." },
    { name: "Hono · Workers", note: "Endpoint de streaming que vive al borde. Latencia de primer token < 400 ms en Europa." },
    { name: "Supabase", note: "Auth + Postgres + Storage para portadas. RLS para que tu biblioteca sea solo tuya." },
    { name: "OpenAI · stream", note: "GPT-4 mini con tool calling para citar páginas. Resumen on-device cuando se puede." },
    { name: "Google Books", note: "Búsqueda y portadas. ISBN como llave. Sin scraping, sin sorpresas legales." },
    { name: "MMKV", note: "Cache local de portadas y borradores de chat. Arrancar la app no debería esperar a la red." },
  ],
  en: [
    { name: "Expo SDK 53", note: "Builds, OTA updates and dev client. The thing that makes iterating on mobile stop hurting." },
    { name: "React Native", note: "Single codebase; 95% of UI is shared between iOS and Android. SwiftUI without the lock-in." },
    { name: "TypeScript", note: "Strict mode end-to-end. Book and message models are the same in client and server." },
    { name: "Hono · Workers", note: "Streaming endpoint at the edge. First-token latency < 400 ms in Europe." },
    { name: "Supabase", note: "Auth + Postgres + Storage for covers. RLS so your library is yours alone." },
    { name: "OpenAI · stream", note: "GPT-4 mini with tool calling to cite pages. On-device summaries when feasible." },
    { name: "Google Books", note: "Search and covers. ISBN as the key. No scraping, no legal surprises." },
    { name: "MMKV", note: "Local cache for covers and chat drafts. Opening the app shouldn't wait on the network." },
  ],
};

const TB_FEATURES = {
  es: [
    "Biblioteca personal con estados (leyendo, leído, pendiente) y notas por libro.",
    "Chat por libro con IA que conoce tu progreso, tus subrayados y tus notas.",
    "Búsqueda por ISBN o título contra Google Books, con portada de alta resolución.",
    "Estadísticas mensuales: racha, ritmo medio, libros terminados y evolución del año.",
    "Subrayados rápidos por foto: capturas un pasaje y la IA lo transcribe y lo guarda.",
    "Modo offline: tu biblioteca, notas y resúmenes están disponibles sin red.",
    "Exportar conversaciones a Markdown para llevarlas a tus apuntes (Obsidian, Notion).",
  ],
  en: [
    "Personal library with states (reading, finished, to-read) and per-book notes.",
    "Per-book AI chat that knows your progress, your highlights and your notes.",
    "Search by ISBN or title against Google Books, with high-resolution covers.",
    "Monthly stats: streak, average pace, finished books and yearly evolution.",
    "Quick highlights by photo: snap a passage, the AI transcribes and stores it.",
    "Offline mode: your library, notes and summaries are available without network.",
    "Export conversations to Markdown to take into your notes (Obsidian, Notion).",
  ],
};

const TB_RELATED = [
  { slug: "tesora", title: "Tesora", image: "assets/tesora-main.webp", year: "2025 — 2026",
    es: "Plataforma de gestión financiera con IA: conecta tus bancos y unifica tu patrimonio.",
    en: "AI personal-finance platform: connect your banks and unify your net worth." },
  { slug: "cosmo-ai", title: "Cosmo AI", image: "assets/cosmo-main.webp", year: "2024 — 2025",
    es: "Asistente de productividad con IA: tareas, proyectos y apps en un solo chat.",
    en: "AI productivity assistant: tasks, projects and apps in one chat." },
  { slug: "roundtable", title: "Roundtable", image: "assets/roundtable-main.webp", year: "2026",
    es: "Mesa redonda personal con pensadores históricos representados por agentes de IA.",
    en: "Personal roundtable with historical thinkers represented by AI agents." },
];

// ────────────────────────────────────────────────────────────────────────
// Mobile mock primitives — a "phone screen" canvas with TalkBook UI inside.
// All mocks render inside `position:absolute inset:0` of a tile (4:5 or 16:9).
// ────────────────────────────────────────────────────────────────────────

// Phone frame: shows a single phone-shaped device floating on a dark surface.
function PhoneShell({ children, scale = 1, bg = "#fafaf7", deviceTilt = 0 }) {
  // viewport is the tile; we fit a 9:19.5 phone within it.
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(120% 100% at 50% 0%, #1a1a1a 0%, #0a0a0a 65%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <div style={{
        position: "relative",
        height: `${88 * scale}%`,
        aspectRatio: "9 / 19.5",
        background: "#0a0a0a",
        borderRadius: 28,
        padding: 6,
        boxShadow: "0 0 0 1px #2a2a2a inset, 0 30px 80px -20px rgba(0,0,0,.6)",
        transform: `rotate(${deviceTilt}deg)`,
      }}>
        <div style={{
          position: "relative",
          width: "100%", height: "100%",
          borderRadius: 22,
          overflow: "hidden",
          background: bg,
          fontFamily: "var(--font-sans)",
          color: "#0a0a0a",
        }}>
          {/* status bar */}
          <div style={{
            position: "relative", height: 22,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "0 16px",
            fontSize: 9, fontWeight: 600, color: "#0a0a0a",
          }}>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>9:41</span>
            <span style={{ width: 60, height: 12, background: "#0a0a0a", borderRadius: 6, position: "absolute", left: "50%", transform: "translateX(-50%)", top: 4 }}/>
            <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
              <span style={{ width: 14, height: 6, border: "1px solid #0a0a0a", borderRadius: 2, position: "relative" }}>
                <span style={{ position: "absolute", inset: 1, background: "#0a0a0a", width: "70%" }}/>
              </span>
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

// Two phones side by side (used in 16:9 tiles for richer hero shots)
function PhonePair({ left, right }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(120% 100% at 50% 0%, #1a1a1a 0%, #0a0a0a 65%)",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
      overflow: "hidden",
    }}>
      {[left, right].map((Inner, i) => (
        <div key={i} style={{
          position: "relative",
          height: "82%",
          aspectRatio: "9 / 19.5",
          background: "#0a0a0a",
          borderRadius: 24,
          padding: 5,
          boxShadow: "0 0 0 1px #2a2a2a inset, 0 20px 60px -20px rgba(0,0,0,.6)",
          transform: i === 0 ? "translateY(8px) rotate(-2deg)" : "translateY(-8px) rotate(2deg)",
        }}>
          <div style={{
            position: "relative",
            width: "100%", height: "100%",
            borderRadius: 19, overflow: "hidden", background: "#fafaf7",
            fontFamily: "var(--font-sans)", color: "#0a0a0a",
          }}>
            <div style={{
              position: "relative", height: 18,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0 12px", fontSize: 8, fontWeight: 600,
            }}>
              <span>9:41</span>
              <span style={{ width: 44, height: 10, background: "#0a0a0a", borderRadius: 5, position: "absolute", left: "50%", transform: "translateX(-50%)", top: 4 }}/>
              <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
                <span style={{ width: 12, height: 5, border: "1px solid #0a0a0a", borderRadius: 2, position: "relative" }}>
                  <span style={{ position: "absolute", inset: 1, background: "#0a0a0a", width: "70%" }}/>
                </span>
              </span>
            </div>
            <Inner/>
          </div>
        </div>
      ))}
    </div>
  );
}

// Tab bar shared across all phone screens
function TBTabBar({ active = "biblioteca" }) {
  const tabs = [
    { id: "biblioteca", label: "Biblioteca", icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 5h6v14H4zM14 7h6v12h-6zM10 9h4M10 13h4M10 17h4"/></svg>
    )},
    { id: "buscar", label: "Buscar", icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
    )},
    { id: "stats", label: "Stats", icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19V5M9 19v-7M14 19v-4M19 19V9"/></svg>
    )},
    { id: "chats", label: "Chats", icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
    )},
  ];
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      height: 44,
      borderTop: "1px solid #e7e2d6",
      background: "#fafaf7",
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
    }}>
      {tabs.map(t => (
        <div key={t.id} style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
          color: t.id === active ? "#d97706" : "#8a8578",
          fontSize: 8, fontWeight: t.id === active ? 600 : 500,
        }}>
          {t.icon}
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// Book cover SVG with title — placeholder for real covers
function BookCover({ title, author, palette, w = 50, h = 76 }) {
  const [bg, fg, accent] = palette;
  return (
    <svg width={w} height={h} viewBox="0 0 100 152" style={{ borderRadius: 3, boxShadow: "0 4px 14px -6px rgba(0,0,0,.4), 0 0 0 .5px rgba(0,0,0,.08)" }}>
      <rect width="100" height="152" fill={bg}/>
      <rect x="0" y="0" width="3" height="152" fill="rgba(0,0,0,.18)"/>
      {accent && <rect x="8" y="20" width="84" height="2" fill={accent}/>}
      <text x="50" y={accent ? 50 : 60} textAnchor="middle" fill={fg} fontSize="11" fontWeight="700" fontFamily="serif">
        <tspan x="50" dy="0">{title.split(" ").slice(0, 2).join(" ")}</tspan>
        {title.split(" ").length > 2 && <tspan x="50" dy="12">{title.split(" ").slice(2).join(" ")}</tspan>}
      </text>
      {author && <text x="50" y="135" textAnchor="middle" fill={fg} fontSize="7" opacity=".7" fontFamily="sans-serif">{author}</text>}
    </svg>
  );
}

const COVERS = [
  { t: "Meditaciones", a: "Marco Aurelio", p: ["#3a2418", "#e8d9b8", "#c9974a"] },
  { t: "El método Lean Startup", a: "Eric Ries", p: ["#f8f7f3", "#0a0a0a", "#1a5fbf"] },
  { t: "El poder del ahora", a: "Eckhart Tolle", p: ["#0f3d2e", "#fff", "#d4a017"] },
  { t: "El caballero de la armadura oxidada", a: "Robert Fisher", p: ["#a23a1f", "#fff", "#f4d160"] },
  { t: "Sapiens", a: "Y. N. Harari", p: ["#e8e3d8", "#0a0a0a", "#c44536"] },
  { t: "Padre rico, padre pobre", a: "R. Kiyosaki", p: ["#1a3a5f", "#fff", "#d4a017"] },
  { t: "El hombre en busca de sentido", a: "V. Frankl", p: ["#2a2a2a", "#f8f7f3", "#d4a017"] },
  { t: "El camino del hombre superior", a: "David Deida", p: ["#5a3a1f", "#f8f7f3", "#c9974a"] },
];

// ─── Screens ────────────────────────────────────────────────────────────

function ScreenLibrary() {
  return (
    <div style={{ position: "absolute", inset: 0, paddingBottom: 44, overflow: "hidden", background: "#fafaf7" }}>
      <div style={{ padding: "10px 14px 6px" }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-.01em" }}>Mi Biblioteca</div>
        <div style={{ fontSize: 9, color: "#8a8578", marginTop: 2 }}>Tu espacio personal de lectura</div>
      </div>
      <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 600 }}>Leyendo · 3</div>
        <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
          {[0,1,2].map(i => (
            <BookCover key={i} title={COVERS[i].t} author={COVERS[i].a} palette={COVERS[i].p} w={64} h={97}/>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4 }}>Leídos · 7</div>
        <div style={{ display: "flex", gap: 8, overflow: "hidden" }}>
          {[3,4,5].map(i => (
            <BookCover key={i} title={COVERS[i].t} author={COVERS[i].a} palette={COVERS[i].p} w={64} h={97}/>
          ))}
        </div>
      </div>
      <TBTabBar active="biblioteca"/>
    </div>
  );
}

function ScreenStats() {
  return (
    <div style={{ position: "absolute", inset: 0, paddingBottom: 44, overflow: "hidden", background: "#fafaf7" }}>
      <div style={{ padding: "10px 14px 8px" }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-.01em" }}>Estadísticas</div>
      </div>
      <div style={{ padding: "0 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { l: "LEÍDOS", v: "7", s: "de 15 en biblioteca" },
          { l: "EN LECTURA", v: "3", s: "activos ahora" },
          { l: "RACHA", v: "12", s: "mejor: 1 mes" },
          { l: "RITMO MEDIO", v: "21d", s: "por libro" },
        ].map((c, i) => (
          <div key={i} style={{ border: "1px solid #e7e2d6", borderRadius: 8, padding: "8px 10px", background: "#fff" }}>
            <div style={{ fontSize: 7, color: "#8a8578", letterSpacing: ".08em", fontWeight: 600 }}>{c.l}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0a0a0a", marginTop: 2, letterSpacing: "-.02em" }}>{c.v}</div>
            <div style={{ fontSize: 7, color: "#8a8578", marginTop: 1 }}>{c.s}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: "10px 14px 0", border: "1px solid #e7e2d6", borderRadius: 8, padding: 10, background: "#fff" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#0a0a0a" }}>Evolución mensual</div>
        <div style={{ fontSize: 7, color: "#8a8578" }}>Libros terminados</div>
        <svg viewBox="0 0 200 70" style={{ width: "100%", marginTop: 4 }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="tbg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" stopOpacity=".35"/>
              <stop offset="100%" stopColor="#d97706" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 65 L 33 60 L 66 58 L 99 55 L 132 48 L 165 30 L 200 12 L 200 70 L 0 70 Z" fill="url(#tbg)"/>
          <path d="M0 65 L 33 60 L 66 58 L 99 55 L 132 48 L 165 30 L 200 12" fill="none" stroke="#d97706" strokeWidth="1.6"/>
          {["NOV","DIC","ENE","FEB","MAR"].map((m, i) => (
            <text key={m} x={20 + i * 40} y="69" fontSize="6" fill="#8a8578" textAnchor="middle">{m}</text>
          ))}
        </svg>
      </div>
      <TBTabBar active="stats"/>
    </div>
  );
}

function ScreenChatList() {
  return (
    <div style={{ position: "absolute", inset: 0, paddingBottom: 44, overflow: "hidden", background: "#fafaf7" }}>
      <div style={{ padding: "10px 14px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-.01em" }}>Chats</div>
        <span style={{ fontSize: 9, color: "#fff", background: "#d97706", padding: "3px 8px", borderRadius: 10, fontWeight: 600 }}>+ Nuevo</span>
      </div>
      <div style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          { i: 0, msg: "cuál es tu meditación favorita", time: "14:31", n: 4 },
          { i: 1, msg: "explícame el pivot vs perseverar", time: "ayer", n: 7 },
          { i: 2, msg: "qué dice sobre el ego", time: "lun", n: 3 },
          { i: 3, msg: "resumen del capítulo 4", time: "feb", n: 2 },
        ].map((c) => (
          <div key={c.i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 4px", borderBottom: "1px solid #efeae0" }}>
            <BookCover title={COVERS[c.i].t} author={COVERS[c.i].a} palette={COVERS[c.i].p} w={28} h={42}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#0a0a0a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{COVERS[c.i].t}</div>
              <div style={{ fontSize: 8, color: "#8a8578", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.msg}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
              <span style={{ fontSize: 7, color: "#8a8578" }}>{c.time}</span>
              <span style={{ fontSize: 7, color: "#fff", background: "#d97706", borderRadius: 8, padding: "1px 6px", fontWeight: 700 }}>{c.n}</span>
            </div>
          </div>
        ))}
      </div>
      <TBTabBar active="chats"/>
    </div>
  );
}

function ScreenBookChat() {
  return (
    <div style={{ position: "absolute", inset: 0, paddingBottom: 44, overflow: "hidden", background: "#fafaf7" }}>
      {/* book header */}
      <div style={{ display: "flex", gap: 8, padding: "8px 12px 8px", borderBottom: "1px solid #efeae0", alignItems: "center" }}>
        <BookCover title="Meditaciones" author="Marco Aurelio" palette={["#3a2418","#e8d9b8","#c9974a"]} w={26} h={40}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700 }}>Meditaciones</div>
          <div style={{ fontSize: 7, color: "#8a8578" }}>Marco Aurelio · pág. 84 / 192</div>
        </div>
      </div>
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6, fontSize: 8.5, lineHeight: 1.45 }}>
        <div style={{ alignSelf: "flex-end", maxWidth: "78%", background: "#d97706", color: "#fff", padding: "6px 9px", borderRadius: 10 }}>
          ¿Qué dice sobre el miedo a la muerte?
        </div>
        <div style={{ alignSelf: "flex-start", maxWidth: "88%", background: "#fff", border: "1px solid #efeae0", color: "#0a0a0a", padding: "7px 9px", borderRadius: 10 }}>
          Para Marco, la muerte es un proceso natural — no algo a temer, sino a comprender. En el libro 2, §17, escribe sobre la vida como un punto del tiempo y el cuerpo como agua que fluye.
          <div style={{ marginTop: 4, fontSize: 7, color: "#8a8578" }}>↳ Libro 2 · §17</div>
        </div>
        <div style={{ alignSelf: "flex-end", maxWidth: "70%", background: "#d97706", color: "#fff", padding: "6px 9px", borderRadius: 10 }}>
          Subráyalo para luego.
        </div>
        <div style={{ alignSelf: "flex-start", maxWidth: "70%", background: "#fff", border: "1px solid #efeae0", color: "#0a0a0a", padding: "7px 9px", borderRadius: 10 }}>
          Hecho. Lo añadí a tus notas de <b>Meditaciones</b>.
        </div>
      </div>
      <div style={{ position: "absolute", left: 10, right: 10, bottom: 50, padding: "6px 10px", border: "1px solid #e7e2d6", borderRadius: 16, background: "#fff", fontSize: 9, color: "#8a8578" }}>
        Pregunta lo que sea del libro…
      </div>
      <TBTabBar active="chats"/>
    </div>
  );
}

function ScreenReader() {
  return (
    <div style={{ position: "absolute", inset: 0, paddingBottom: 44, overflow: "hidden", background: "#f5f1e8" }}>
      <div style={{ padding: "10px 14px 4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 8, color: "#8a8578", fontWeight: 600 }}>← Meditaciones</span>
        <span style={{ fontSize: 8, color: "#8a8578" }}>84 / 192</span>
      </div>
      <div style={{ padding: "12px 18px", fontFamily: "var(--font-display)", fontSize: 9, lineHeight: 1.6, color: "#2a2418" }}>
        <div style={{ fontSize: 7, color: "#8a8578", letterSpacing: ".15em", marginBottom: 8, fontFamily: "var(--font-sans)" }}>LIBRO II · §17</div>
        <p style={{ margin: 0 }}>De la vida del hombre, la duración es un punto; la substancia, fluyente; la sensación, oscura; la composición del cuerpo entero, corruptible; el alma, un torbellino; la fortuna, difícil de conjeturar; la fama, falta de juicio. En una palabra, todo lo que pertenece al cuerpo es como un río; lo del alma, sueño y vaho; <mark style={{ background: "#f4d160", padding: "0 1px" }}>la vida, una guerra, un peregrinaje</mark>; la celebridad póstuma, olvido.</p>
        <p style={{ margin: "6px 0 0" }}>¿Qué, pues, podrá servirnos de guía? Una sola cosa, y una sola: la filosofía.</p>
      </div>
      <div style={{ position: "absolute", right: 10, bottom: 50, display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ width: 28, height: 28, background: "#d97706", color: "#fff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, boxShadow: "0 4px 12px -4px rgba(217,119,6,.5)" }}>＋</span>
      </div>
      <TBTabBar active="biblioteca"/>
    </div>
  );
}

function ScreenSearch() {
  return (
    <div style={{ position: "absolute", inset: 0, paddingBottom: 44, overflow: "hidden", background: "#fafaf7" }}>
      <div style={{ padding: "10px 14px 6px" }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-.01em" }}>Buscar</div>
        <div style={{ marginTop: 8, padding: "5px 10px", background: "#fff", border: "1px solid #e7e2d6", borderRadius: 14, fontSize: 9, color: "#0a0a0a", display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="10" height="10" fill="none" stroke="#8a8578" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <span>sapiens harari</span>
        </div>
      </div>
      <div style={{ padding: "8px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 7, color: "#8a8578", letterSpacing: ".08em", fontWeight: 600 }}>RESULTADOS · 4</div>
        {[
          { t: "Sapiens. De animales a dioses", a: "Yuval Noah Harari", y: "2011" },
          { t: "Homo Deus", a: "Yuval Noah Harari", y: "2015" },
          { t: "21 lecciones para el siglo XXI", a: "Yuval Noah Harari", y: "2018" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 8, padding: "5px 4px", borderBottom: "1px solid #efeae0", alignItems: "center" }}>
            <BookCover title={r.t} author={r.a} palette={i === 0 ? ["#e8e3d8","#0a0a0a","#c44536"] : i === 1 ? ["#0a0a0a","#fff","#d97706"] : ["#1a5fbf","#fff","#d4a017"]} w={26} h={40}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 600 }}>{r.t}</div>
              <div style={{ fontSize: 7, color: "#8a8578" }}>{r.a} · {r.y}</div>
            </div>
            <span style={{ fontSize: 8, color: "#d97706", fontWeight: 700, border: "1px solid #d97706", borderRadius: 8, padding: "1px 6px" }}>＋</span>
          </div>
        ))}
      </div>
      <TBTabBar active="buscar"/>
    </div>
  );
}

// ─── Tile-level mocks (what GalleryTile renders) ────────────────────────
function MockTBLibrary()   { return <PhoneShell><ScreenLibrary/></PhoneShell>; }
function MockTBStats()     { return <PhoneShell><ScreenStats/></PhoneShell>; }
function MockTBChatList()  { return <PhoneShell><ScreenChatList/></PhoneShell>; }
function MockTBBookChat()  { return <PhoneShell><ScreenBookChat/></PhoneShell>; }
function MockTBReader()    { return <PhoneShell><ScreenReader/></PhoneShell>; }
function MockTBSearch()    { return <PhoneShell><ScreenSearch/></PhoneShell>; }

// 16:9 hero-style mock with two phones
function MockTBPair() {
  return <PhonePair left={ScreenLibrary} right={ScreenBookChat}/>;
}
function MockTBPair2() {
  return <PhonePair left={ScreenStats} right={ScreenChatList}/>;
}

Object.assign(window, {
  TALKBOOK, TB_STACK, TB_FEATURES, TB_RELATED,
  MockTBLibrary, MockTBStats, MockTBChatList, MockTBBookChat, MockTBReader, MockTBSearch,
  MockTBPair, MockTBPair2,
});
