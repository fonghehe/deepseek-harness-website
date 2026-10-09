---
title: 'Architectuur'
description: 'React-componenten, Next.js-routes, animaties en VitePress-artikelen.'
---

# Architectuur

`landing-page.tsx` stelt de pagina samen. `layout/`, `controls/` en `sections/` verdelen structuur, bediening en inhoud. `previews/` bevat illustraties en CSS; `motion/` Framer Motion; `graphics/` Three.js-scènes, geometrie en shaders.

De pagina valideert de taal en geeft het woordenboek door. Server en client gebruiken hetzelfde JSX; het layout stelt `lang` en `dir` in. RichText verwerkt alleen afgesproken tags. Vastgelegde HTML en de gecompileerde toepassing van de oorspronkelijke site worden niet geladen.

`use-demo-scene.ts` combineert pauze, zichtbaarheid, actieve tab en minder animatie. CSS bewaart de voortgang; workflows wisselen na een cyclus. De vier verhalen duren 22, 17,5, 11 en 15 seconden.

Three.js laadt wanneer nodig, tekent maximaal 30fps op CSS-pixelresolutie en stopt buiten beeld of in de achtergrond. Minder animatie voorkomt GPU-initialisatie. Geometrie, materialen, textures en renderer worden opgeruimd. Framer Motion regelt veren van de header, sectie-introducties en scrollperspectief.

`pnpm build` bouwt VitePress naar `public/docs` en daarna Next.js. Documentnavigatie vernieuwt richting en SEO. De servercache scheidt origin en taal/artikelpad, houdt maximaal 128 items vijf minuten vast, verwijdert mislukte renders en ondersteunt een lege `304` bij een passende ETag.

Pages gebruikt `build:pages` en `check:pages` met de volledige `SITE_URL`. Statische metadata ligt vast bij de build; applicatiecache en ETags horen bij serverlevering. Export verandert de werkbronnen niet. Zie `DEVELOPMENT.md`.

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

[Frontendkeuzes](../highlights/) · [Website-eisen](../requirements/) · [Leerpad](../learning/)

<WebsiteLink locale="nl">Website</WebsiteLink>
