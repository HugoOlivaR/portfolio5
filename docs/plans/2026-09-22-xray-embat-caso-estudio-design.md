# X-Ray (HackSpain 2026 · Embat): caso de estudio en el porfolio

Fecha: 2026-09-22

## Problema

El porfolio abre con `Proyectos` y sólo enseña tres: `items.slice(0, 3)` en
`Projects.tsx` y el mismo corte en `scripts/generate-cv-pdf.mjs`. Los siete
proyectos que hay son todos individuales —Tesora, Cosmo, BTC Tracker,
TalkBook…—: ninguno enseña trabajo con plazo, equipo y jurado enfrente.

El 18–20 de septiembre de 2026 hubo uno: HackSpain 2026 en la ETSIT de la UPM,
36 horas, cinco tracks de startups, y el track de Embat —fintech española de
tesorería— resuelto con X-Ray por un equipo de cinco. El repo es público, el
vídeo de producto está renderizado y subido a YouTube, y no estaba en ninguna
parte del porfolio.

## Decisión

Entra como **caso de estudio en `projects.items[]`**, no como sección nueva.
Una sección "Hackathons" con un solo elemento pesa más de lo que informa, y el
layout de detalle (`ProjectDetail.tsx`) ya soporta todos los campos que el
relato necesita. El contexto del hackathon se cuenta en `eyebrow`, en `role`
y en el primer párrafo de `problem`.

Va **en la posición 1, detrás de Tesora**. Tesora está en producción y es
propia; X-Ray es un fin de semana. Pero entra en el corte de tres, así que sale
en la home y en el CV, que es donde tiene que estar: complementa a Tesora
(B2C personal ↔ B2B corporativo) sin discutirle el primer puesto.

`status: "archived"` — el despliegue de Railway existe hoy pero sale del aire en
cuanto se apague el proyecto, así que el porfolio no enlaza a la app. El enlace
canónico es **el vídeo de producto en YouTube**, y el repo público va en el
bloque de enlaces.

## Alcance

**Contenido** (`src/messages/es.json` y `en.json`): una entrada nueva
`x-ray-embat` en `projects.items[1]`, con el esquema completo de caso de
estudio. Sin campos nuevos salvo los tres de abajo.

**Código** — tres campos opcionales en `ProjectDetailData`, todos con
`??` sobre el valor actual, así que ningún proyecto existente cambia:

- `linkLabel` — la fila del hero decía siempre `detail.site` ("Sitio"). Con el
  enlace apuntando a YouTube, "Sitio" miente; aquí dice "Vídeo".
- `linkCta` — la tarjeta de enlaces decía siempre `detail.liveApp`
  ("Ver en producción"). Aquí, "Ver el vídeo de producto".
- `repo` — `GITHUB_URL` estaba fijo al perfil personal. X-Ray vive en el repo
  del equipo (`antoniomachuca/hackspain-2026-embat`), que es público.

**Assets** (`public/projects/x-ray/`): el mp4 del vídeo como cabecera —igual
que Tesora— y seis capturas para la galería. No son maquetas ni fotos de
pantalla: se renderizaron con `remotion still` sobre las composiciones del
propio vídeo, que ejecutan los componentes reales del front. Se generan así:

```bash
cd ../hackspain-2026-embat/video
npx remotion still Acto1-Motor salida.png --frame=60
```

## Fuera de alcance

- No se toca `experience`. HackSpain no es un empleo; si más adelante conviene
  que un recruiter lo vea sin entrar en `/projects`, se decide aparte.
- No se enlaza el despliegue de Railway (`xray-embat.up.railway.app`), vivo hoy.
- El vídeo pesa 25 MB en `public/`. Es el criterio que ya sigue Tesora, cuyo
  mp4 pesa 85 MB.

## Encontrado por el camino

`src/messages/en.json` tenía la clave `gallery` **duplicada** dentro de
`tesora`: primero con las seis capturas, después vacía. `JSON.parse` se queda
con la última, así que la galería de Tesora en inglés lleva vacía desde
entonces mientras la española sí se ve. Al normalizar el fichero la clave
duplicada desaparece y queda la vacía — el comportamiento es el mismo que
antes. Arreglarlo es copiar las seis rutas de `es.json`; queda pendiente.

## Verificación

- `npx tsc --noEmit` sin errores.
- `npm run dev` → `/es/projects/x-ray-embat` y `/en/projects/x-ray-embat`.
- La home y `/projects` listan X-Ray en segunda posición.
