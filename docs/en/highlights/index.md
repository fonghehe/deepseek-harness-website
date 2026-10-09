---
title: 'Frontend highlights'
description: 'Implementation notes on controls, languages, animation, SEO and assets.'
---

# Frontend highlights

The following notes explain how this website handles layout, controls, languages and rendering. Each section points to the relevant source or check.

## 1. Page sections

The hero contains the title and download controls. Four demos show product scenarios; cards provide further details. Visitors can read the page without playing every animation.

## 2. Shared cards

`sections/feature-section.tsx` renders the capability cards from `src/i18n/site-content.json`. The cards reuse the page’s typography and spacing; the original demos remain in place.

## 3. Local assets

Brand images, fonts, file icons and the WeChat QR are served locally. `NOTICE.md` records attribution and `tests/fixtures/assets.json` records hashes. Include their bytes when measuring page payloads.

## 4. Locale registry

`src/i18n/locales.json` supplies routes, labels, language tags and reading direction for the website, docs and SEO. Validation checks keys, placeholders and article coverage. Wording and line wrapping need human review.

## 5. RTL styles

Arabic, Hebrew, Persian and Urdu use RTL. Logical CSS properties position menus and cards; code and commands stay LTR. Check mixed text, punctuation and long menu labels on a narrow screen.

## 6. Native controls

Language menus and detail cards use native disclosures and real links. JavaScript adds Escape handling, outside-click dismissal, focus recovery and query/fragment preservation.

## 7. SSR and hydration

The selected dictionary is passed to `LandingPage`. Server rendering and hydration use the same JSX. Browser tests check visible translations after scripts load, including demo messages.

## 8. Playback and cleanup

`use-demo-scene.ts` combines visibility, foreground state, motion preference and user pause. CSS preserves playback position. Three.js backgrounds stop offscreen and release GPU resources on unmount; details are in [Architecture](../architecture/).

## 9. Metadata updates

Next.js writes localized metadata, canonical URLs, alternate links and sharing data into the response. The VitePress theme updates document metadata after article or language navigation.

## 10. Document cache

The docs cache separates origins and article paths, limits entries, merges concurrent renders and removes failed renders. ETag tests check matching `304` responses and separation between domains and languages.

## 11. Asset checks

`check:assets` verifies static input hashes and rejects captured runtime files. `pnpm build` generates the website’s JavaScript and CSS. Source and static inputs are committed; `.next` and generated docs are ignored.

## 12. Verification tools

Oxlint checks code, Oxfmt checks formatting, Playwright exercises browser behavior, axe checks selected accessibility rules and Lighthouse measures lab performance. `pnpm verify` runs the deterministic checks; `verify:full` adds browser and performance checks.

## Checks that need manual review

Check real phones, keyboard and screen-reader flows, translations and comparison with the original site. Use fresh performance measurements for the current build; dated reports only describe the version they measured.

See [Website essentials](../requirements/) for the checklist and [Learning path](../learning/) for exercises.

## Background initialization

Decoration starts after font readiness and the hero entrance, followed by paint and an idle task. The constant zero-influence flow-map branch is removed without changing its output. Debug frame counters are opt-in; offscreen/background pause, 30fps, reduced motion and GPU disposal remain. Audit Node and Pages separately and compare repeated lab measurements with real devices.

- `src/components/graphics/schedule-scene.ts`, `fluid-shaders.ts`
- `src/components/graphics/particle-field.tsx`, `tile-scene.ts`
- `tests/tools/audit-performance.mjs`, `tests/fixtures/performance-budgets.json`
