# Experiencia: de párrafos a bullets de impacto

Fecha: 2026-08-05

## Problema

Al entrar en la home, la columna derecha abre con `Sobre mí` (290 caracteres, corto) y
sigue con `Experiencia`: cuatro descripciones de 237, 357, 385 y 471 caracteres, unos
1.450 caracteres de prosa seguida.

Todo se renderizaba igual — `text-sm text-text-secondary`, mismo peso, párrafo sin
cortes — así que en una columna de ~576px eran cuatro bloques grises indistinguibles.
El problema no era la cantidad de texto sino la ausencia de jerarquía: nada que
escanear en tres segundos, ningún dato duro que salte a la vista.

Se añade que el sidebar izquierdo ya carga el relato con jerarquía (nombre a
`text-6xl`, título, badge de thePower, foto). La columna derecha repetía en prosa lo
que la izquierda ya había dicho mejor.

## Decisión

Reescribir el contenido a bullets de impacto, en lugar de comprimir con un
desplegable o reordenar las secciones. El texto se reduce de verdad y se vuelve
escaneable, a cambio de tocar contenido y no solo presentación.

`description: string` se **sustituye** por `highlights: string[]` — no se mantienen
ambos. Un único origen de contenido evita cuatro versiones desincronizadas
(es/en × párrafo/bullets), y en un CV los bullets son el estándar de todos modos.

Reglas de redacción: 2-3 bullets por trabajo, máximo ~85 caracteres cada uno para que
no pasen de dos líneas en la columna, y cada bullet empieza por el hecho, no por
"Desarrollo de…". Sin datos nuevos: todo sale del párrafo anterior.

Resultado: de ~1.450 a ~780 caracteres, en unidades escaneables.

## Alcance

Solo dos consumidores de `experience.jobs`, verificados con grep:

- `src/messages/es.json` y `en.json` — `description` → `highlights`.
- `src/components/sections/Experience.tsx` — el `<p>` pasa a `<ul>`. El punto se
  dibuja con `::before` (4px, `bg-border`) en lugar de `list-disc`, porque el marcador
  nativo se desalinea contra el `border-l-2 border-border pl-4` de la sección.
- `scripts/generate-cv-pdf.mjs` — mapea `highlights` a un `Text` por bullet con
  prefijo `"• "`, con el estilo nuevo `expHighlight` (clon de `expDesc` con
  `marginBottom: 1`). El diseño del PDF no cambia.

## Pérdida asumida

El párrafo de thePower cerraba con *"…es la base desde la que doy charlas y formación
de IA a empresas"*. No cabe en tres bullets sin diluirlos, y ese argumento de
autoridad pertenece a la sección `Comunicación`, que ya existe para eso. Queda
pendiente reforzarlo ahí.

## Fuera de alcance

`About.tsx`, los textos de `about` y el orden de secciones en `MainContent.tsx`. La
sección "Sobre mí" ya es corta; no era el problema.

## Verificación

- `npx tsc --noEmit` — sin errores.
- `npm run lint` — sin hallazgos nuevos (los 109 errores son preexistentes en
  `design/HugoUI/`, mockups; los dos warnings en `Blog.tsx` y `ProfileCard.tsx`
  también son previos).
- `npm run build` — 17 páginas generadas.
- `npm run generate:cv` + `pdftotext` — los 11 bullets aparecen en el PDF.
