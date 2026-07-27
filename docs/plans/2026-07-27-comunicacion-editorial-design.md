# Comunicación & Docencia: layout editorial propio

Fecha: 2026-07-27

## Problema

La sección `comunicacion` se implementó reutilizando la maquinaria de los proyectos de
código: `src/app/[locale]/comunicacion/[slug]/page.tsx` renderiza el mismo
`ProjectDetail`, con `showCode={false}` y las etiquetas renombradas. Eso arrastra la
estructura de un caso de estudio de software —hero con año vertical, tesis, "El
contexto", "Stack técnico", "Puntos clave", "Arquitectura"— a piezas que no son
software: un módulo de docencia, un podcast y un canal de YouTube.

Los síntomas concretos:

- Un canal de YouTube no tiene stack ni arquitectura. Los bloques quedan vacíos.
- "Puntos clave" hace de comodín para tres cosas incomparables: el temario de un
  módulo, el formato de un podcast y las habilidades de guion y cámara.
- El índice `/comunicacion` y la sección de la home son cards clonadas de `Projects`,
  con el mismo peso visual. Comunicación compite con el código en vez de reforzarlo.

## Decisión

Familia visual propia en registro **editorial**, con módulos de contenido que se
activan según el formato de cada pieza. La diferencia no es cosmética: cambia el ritmo
de lectura.

| Proyectos de código | Comunicación |
| --- | --- |
| Grid de 12 columnas asimétrico, año en vertical | Columna de lectura centrada (~68ch) |
| Titular sans `clamp(3.25rem,15vw,10rem)`, tracking negativo | Titular serif, tamaño moderado, tracking normal |
| Bloques `01 / 02 / 03` con número gigante sticky | Secciones con label en versalitas y regla fina |
| Pill verde de categoría más tags | Kicker en versalitas, sin pill ni tags |
| `font-mono` en eyebrow y metadatos | Serif para la voz; mono solo en cifras y fechas |

Se comparte únicamente el *chrome*: `ProjectTopBar` (ya parametrizado con `backHref`)
y `SimpleFooter`. Nada del cuerpo.

### Alcance

Las tres superficies: sección de la home, índice `/comunicacion` y detalle
`/comunicacion/[slug]`.

### Material

Sin embeds de terceros. Enlaces externos y miniaturas locales en `/public/comunicacion`.
Se publican cifras de alcance solo donde suman: los 26.000 alumnos al año de thePower.
No se publican suscriptores de YouTube ni cifras económicas.

## Modelo de datos

`src/components/comunicacion/types.ts`, independiente de `ProjectDetailData`:

```ts
type ComFormat = "teaching" | "podcast" | "video";

type ComItemData = {
  slug; format; title; link; year; image;
  kicker;      // "Docencia · thePower"
  tagline;     // entradilla
  role;
  thesis;      // frase corta destacada
  thesisNote?;
  stats?:    { value; label }[];               // 26.000 alumnos/año · 5 bloques
  intro;                                       // narrativa, párrafos con \n\n
  syllabus?: { title; detail? }[];              // solo teaching
  episodes?: { num?; title; date?; link?; note? }[]; // solo podcast
  videos?:   { title; link; image? }[];          // solo video
  craft?:    string[];                          // solo video
  takeaway;                                     // cierre en cita
  platforms?: { name; link }[];
};
```

Los módulos son opcionales y excluyentes por formato. Cada uno tiene su propia
presentación; ninguno es un contenedor genérico.

## Anatomía del detalle

```
[ ProjectTopBar, backHref="/comunicacion" ]

  DOCENCIA · thePower          <- kicker, mono 11px, versalitas
  Profesor de                  <- h1 serif, clamp(2.5rem, 6vw, 4.5rem)
  IA aplicada                     leading-[1.05]
  Entradilla 1.25rem, text-secondary, max-w-[52ch]
  ─────────────────────────────
  Rol · 2026 · thepower.education   <- metadatos en una fila, mono xs

  26.000            5
  alumnos/año     bloques      <- stats: valor serif grande, label
                                  versalitas; fila desnuda, sin cajas

  [ imagen, aspect-[3/2], ancho de columna ]

  EL ENCARGO
  Párrafos 1.0625rem / line-height 1.7

  TEMARIO                      <- módulo teaching
  01  Integrar modelos de IA
      APIs, tokens y costes, streaming
  ──
  02  RAG y conocimiento propio

  "Esa misma claridad la aplico
   cuando asesoro a una empresa."   <- cierre, serif, con reglas

  DÓNDE
  thepower.education ↗

  MÁS DE COMUNICACIÓN
  PODCAST · La Última Versión  →    <- lista tipográfica, sin cards 4/3

[ SimpleFooter ]
```

Variantes del módulo central:

- **teaching** → `TEMARIO`: filas con numeración mono discreta, título y detalle.
- **podcast** → `EPISODIOS`: listado de archivo (`#01 · 26 mar 2026 · título ↗`).
- **video** → `EL OFICIO` (guion, cámara, edición, constancia) y, si hay URLs,
  `VÍDEOS` con enlaces.

## Índice `/comunicacion`

Sumario editorial en filas de ancho completo, no rejilla de cards:

```
DOCENCIA        Profesor en thePower      ┌────┐
2026            Módulo de IA aplicada     │ img│
                en el programa Full       └────┘
                Stack con IA.
                26.000 alumnos/año
───────────────────────────────────────────────
PODCAST         La Última Versión         ┌────┐
2026            IA, finanzas y futuro     │ img│
                digital. Sin humo.        └────┘
```

Grid de 12: kicker y año a la izquierda, título serif con entradilla y un dato en el
centro, miniatura `aspect-[4/3]` a la derecha. **Un solo enlace** por fila
(`after:inset-0`); el enlace externo vive solo en el detalle. Esto elimina los tres
`<Link>` anidados que hoy hacen falta para esquivar el `<a>` externo. Hover: subrayado
del título y zoom sutil de la miniatura, sin escalar la fila.

## Sección de la home

Teaser compacto, por una razón estratégica además de estética: el portfolio es
dev-first y comunicación es capa de refuerzo. Hoy son tres cards con imagen 16/9 en
`grid gap-12`, con lo que pesa igual o más que `Projects`, que va justo encima. Pasa a
tres filas densas: miniatura cuadrada de 56px, kicker, título, una línea de
descripción y "Ver todo →".

## Contenido

Se retiran de `comunicacion.items[]`: `eyebrow`, `problem`, `features`,
`architecture`, `stack`, `status`, `gallery`, `category`, `tags`. El kicker sustituye a
la pill de categoría; los tags no aportan en registro editorial.

- **thePower**: los `features` actuales ya tienen forma `"Título: detalle"`, así que se
  parten en `syllabus[{title, detail}]`. `stats`: 26.000 alumnos/año y 5 bloques. El
  `thesisNote` pierde la cifra, que ya vive en los stats.
- **La Última Versión**: `episodes` con los dos publicados (#01 del 26 mar 2026, #00 del
  19 mar 2026), extraídos del campo `content`. `platforms`: YouTube, Spotify y la web.
  Sin stat de número de episodios: "2 episodios" resta en lugar de sumar; los stats son
  `Semanal` y `2 voces`.
- **Canal de YouTube**: los `features` pasan a `craft`. Sin stats de alcance; el único
  dato es `desde 2023`. El módulo `videos` queda pendiente de URLs concretas.

## Archivos

| Acción | Archivo |
| --- | --- |
| nuevo | `src/components/comunicacion/types.ts` |
| nuevo | `src/components/comunicacion/ComunicacionDetail.tsx` |
| nuevo | `src/components/comunicacion/ComunicacionRow.tsx` |
| reescribir | `src/components/sections/Comunicacion.tsx` |
| reescribir | `src/app/[locale]/comunicacion/page.tsx` |
| reescribir | `src/app/[locale]/comunicacion/[slug]/page.tsx` |
| editar | `src/messages/es.json`, `src/messages/en.json` |
| revertir | `src/components/projects/ProjectDetail.tsx` |

La reversión cierra el círculo: los props `basePath` y `showCode` se añadieron solo
para encajar comunicación en el layout de código. Desacoplado esto, `ProjectDetail`
vuelve a su estado en `HEAD`. `ProjectTopBar` mantiene `backHref`, que sí usa el nuevo
detalle.

## Verificación

El proyecto no tiene infraestructura de tests: los scripts son `dev`, `build`, `start`,
`lint` y `generate:cv`. La verificación es `npm run lint` y `npm run build`, más
comprobar que las rutas de comunicación en `es` y `en` se generan.
