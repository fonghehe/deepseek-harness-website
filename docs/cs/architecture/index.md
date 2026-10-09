---
title: 'Architektura'
description: 'Komponenty React, cesty Next.js, animace a doručování článků VitePress.'
---

# Architektura

`landing-page.tsx` skládá stránku. `layout/`, `controls/` a `sections/` oddělují rámec, ovládání a obsah. `previews/` drží ilustrace a CSS; `motion/` Framer Motion; `graphics/` scény Three.js, geometrii a shadery.

Stránka ověřuje jazyk a předává slovník komponentám. Server a klient používají stejné JSX; layout nastavuje `lang` a `dir`. RichText zpracovává jen dohodnuté značky. Zachycené HTML ani zkompilovaná aplikace původního webu se nenačítají.

`use-demo-scene.ts` spojuje pauzu uživatele, viditelnost, aktivní kartu a omezené animace. CSS uchovává postup při pauze; scénář se mění po cyklu. Čtyři příběhy trvají 22, 17,5, 11 a 15 sekund.

Three.js se načítá podle potřeby. Kreslí nejvýše 30fps při rozlišení pixelů CSS, zastaví se mimo obraz a na pozadí. Omezené animace vynechají GPU. Geometrie, materiály, textury a renderer se uvolňují. Framer Motion řídí pružiny záhlaví, vstupy sekcí a perspektivu při posunu.

`pnpm build` sestaví VitePress do `public/docs` a potom Next.js. Navigace dokumentů obnovuje směr a SEO. Serverová mezipaměť odděluje origin a jazyk/cestu článku, drží nejvýše 128 položek pět minut a odstraňuje neúspěšná vykreslení. Odpovídající ETag vrací prázdnou `304`.

Pages používá `build:pages` a `check:pages` s úplným `SITE_URL`. Statická metadata určuje sestavení; mezipaměť a ETag aplikace patří serverovému režimu. Export nemění pracovní zdroje. Pokyny jsou v `DEVELOPMENT.md`.

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

[Frontendové postupy](../highlights/) · [Požadavky webu](../requirements/) · [Studijní cesta](../learning/)

<WebsiteLink locale="cs">Web</WebsiteLink>
