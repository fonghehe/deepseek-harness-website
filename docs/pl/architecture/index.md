---
title: 'Architektura'
description: 'Komponenty React, trasy Next.js, animacje i dostarczanie artykułów VitePress.'
---

# Architektura

`landing-page.tsx` składa stronę. `layout/` odpowiada za ramę, `controls/` za działania, `sections/` za sekcje, a `previews/` za ilustracje i ich CSS. `motion/` zawiera Framer Motion; `graphics/` sceny Three.js, geometrię i shadery.

Strona sprawdza język i przekazuje słownik komponentom. Serwer i klient używają tego samego JSX, a układ ustawia `lang` i `dir`. RichText obsługuje tylko uzgodnione znaczniki. Witryna nie ładuje przechwyconego HTML ani skompilowanej aplikacji oryginalnego serwisu.

`use-demo-scene.ts` łączy pauzę użytkownika, widoczność, aktywność karty i ograniczenie animacji. CSS zachowuje postęp po wstrzymaniu; scenariusz zmienia się po zakończeniu cyklu. Cztery historie trwają 22, 17,5, 11 i 15 sekund.

Three.js jest ładowany w razie potrzeby. Renderowanie ograniczono do 30fps i rozdzielczości pikseli CSS; zatrzymuje się poza ekranem i w tle, a ograniczenie animacji pomija uruchomienie GPU. Geometria, materiały, tekstury i renderer są zwalniane. Framer Motion steruje sprężynami nagłówka, wejściami sekcji i perspektywą przewijania.

`pnpm build` najpierw buduje VitePress w `public/docs`, potem Next.js. Nawigacja dokumentacji aktualizuje kierunek i SEO. Pamięć podręczna rozdziela origin oraz język/ścieżkę artykułu, przechowuje do 128 wpisów przez pięć minut i usuwa nieudane renderowania. Pasujący ETag daje `304` bez treści.

GitHub Pages używa `build:pages` i `check:pages` z pełnym `SITE_URL`. Metadane eksportu ustala się przy budowaniu; pamięć podręczna i ETag aplikacji dotyczą trybu serwerowego. Eksport nie zmienia źródeł roboczych. Instrukcje zawiera `DEVELOPMENT.md`.

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

[Praktyki frontendowe](../highlights/) · [Wymagania witryny](../requirements/) · [Ścieżka nauki](../learning/)

<WebsiteLink locale="pl">Witryna</WebsiteLink>
