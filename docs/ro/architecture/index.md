---
title: 'Arhitectură'
description: 'Componente React, rute Next.js, animații și livrarea articolelor VitePress.'
---

# Arhitectură

`landing-page.tsx` compune pagina. `layout/`, `controls/` și `sections/` separă cadrul, acțiunile și conținutul. `previews/` păstrează ilustrații și CSS; `motion/` Framer Motion; `graphics/` scene Three.js, geometrie și shadere.

Pagina validează limba și transmite dicționarul componentelor. Serverul și clientul folosesc același JSX; layout-ul setează `lang` și `dir`. RichText procesează doar etichetele convenite. Site-ul nu încarcă HTML capturat sau aplicația compilată a site-ului original.

`use-demo-scene.ts` combină pauza, vizibilitatea, fila activă și mișcarea redusă. CSS păstrează progresul; scenariile se schimbă la final de ciclu. Cele patru povești durează 22, 17,5, 11 și 15 secunde.

Three.js se încarcă la nevoie. Desenează cel mult 30fps la rezoluția pixelilor CSS, se oprește în afara ecranului și în fundal, iar mișcarea redusă evită inițializarea GPU. Geometria, materialele, texturile și rendererul sunt eliberate. Framer Motion gestionează arcurile antetului, apariția secțiunilor și perspectiva la derulare.

`pnpm build` construiește VitePress în `public/docs`, apoi Next.js. Navigarea documentelor actualizează direcția și SEO. Cache-ul separă originea și limba/calea articolului, păstrează maximum 128 de intrări cinci minute și elimină randările eșuate. Un ETag potrivit întoarce `304` fără corp.

Pages folosește `build:pages` și `check:pages` cu `SITE_URL` complet. Metadatele statice se fixează la build; cache-ul și ETag-urile aplicației aparțin modului server. Exportul nu schimbă sursele de lucru. Instrucțiunile sunt în `DEVELOPMENT.md`.

```text
src/components/
├── landing-page.tsx
├── layout/
├── controls/
├── sections/
├── previews/
├── motion/
├── graphics/
├── shared/
└── styles/

page.tsx → locale + dictionary → LandingPage → Next.js SSR
/docs/ → /docs/en/ → VitePress article
```

[Practici frontend](../highlights/) · [Cerințele site-ului](../requirements/) · [Traseu de învățare](../learning/)

<WebsiteLink locale="ro">Site</WebsiteLink>
