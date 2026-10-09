---
title: 'Project overview'
description: 'How the DeepSeek Harness website is built, organized and tested.'
---

# Project overview

This repository recreates the DeepSeek Harness website with Next.js and React. These docs explain the page layout, components, languages, animation and tests. VitePress builds the documentation.

The website and docs support 26 languages. `/docs/` opens the English edition; `/harness/` opens the Simplified Chinese website. Each docs edition has the same five chapters. Arabic, Hebrew, Persian and Urdu use RTL layouts.

## Page layout

The page starts with a headline and download controls, followed by a desktop preview, four animated demos, capability cards and a developer section. Details use native disclosure elements. Headings, links and cards remain readable with JavaScript disabled.

## Where to find the code

| What to change                        | Start here                                                        |
| ------------------------------------- | ----------------------------------------------------------------- |
| Page sections and cards               | `src/components/landing-page.tsx`, `sections/feature-section.tsx` |
| Language labels, routes and direction | `src/i18n/locales.json`                                           |
| Language menu                         | `src/components/controls/locale-menu.tsx`                         |
| Layout and RTL styles                 | `src/components/styles/harness.css`                               |
| Animation playback                    | `src/hooks/use-demo-scene.ts`                                     |
| GPU backgrounds                       | `src/components/graphics/particle-field.tsx`                      |
| Website metadata                      | `src/lib/website-metadata.ts`                                     |
| Document cache                        | `src/lib/document-cache.ts`                                       |
| Asset verification                    | `tests/tools/check-assets.mjs`                                    |

Component paths in these docs are relative to `src/components/` unless a full path is shown.

## Tools and responsibilities

Next.js handles routes, server rendering and website metadata. React renders the page and manages interactive controls. Framer Motion handles entrances and scroll effects; Three.js renders the decorative backgrounds. The four demos use CSS timelines.

VitePress uses Vue to build the documentation into `public/docs`. Next.js serves those files under `/docs/`. Dependency versions are listed in `package.json` and the lockfile.

## Assets and layout checks

Fonts, icons and brand images are stored locally. Their hashes are checked against `tests/fixtures/assets.json`; third-party attribution is in `NOTICE.md`.

Layout checks include long language labels, mobile menus, document tables and commands inside RTL pages. Compare both the initial HTML and the page after hydration.

## Verification

`pnpm verify` checks formatting, lint, assets, translations, unit tests, types and production builds. `pnpm verify:full` adds browser regressions and performance budgets.

Record which checks ran for each change. Browser coverage and lab measurements still need manual checks for screen readers, real phones, translation quality and comparison with the original site. Local results do not establish remote CI or deployment status.

## Choose a reading path

- [Architecture](./architecture/): routes, components, animation and document delivery.
- [Frontend highlights](./highlights/): implementation notes and source locations.
- [Website essentials](./requirements/): review and release checks.
- [Learning path](./learning/): source-reading steps and six exercises.

<WebsiteLink locale="en">Open the website</WebsiteLink> alongside the docs.
