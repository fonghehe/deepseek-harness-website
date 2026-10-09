---
title: 'Learning path'
description: 'Source-reading steps and six exercises for this website.'
---

# Learning path

Start by reading the page and tracing its source. The six exercises below cover cards, languages, caching, motion, document metadata and assets.

## Stage 1: Read the experience before the implementation

Open the English website, follow its sections, use a disclosure card and change language. Repeat in Arabic at a narrow viewport. Try keyboard navigation and reduced motion. Note which controls remain meaningful without JavaScript. Then read `src/i18n/locales.json`, `site-content.json`, `src/components/styles/harness.css` and `controls/locale-menu.tsx`.

Deliverable: a short journey map relating hero, demonstrations, detail and action, plus a list of layout and interaction states. Explain why a native disclosure works here and which behaviors JavaScript adds.

## Stage 2: Trace one document response

Read a localized `page.tsx`, its root `layout.tsx`, `landing-page.tsx`, `sections/feature-section.tsx` and `website-metadata.ts` in that order. Compare response HTML with the hydrated DOM. Identify server content versus client event handling. Next.js handles its own serialization: this project does not modify Flight records or captured templates.

Deliverable: a request-flow diagram with locale, origin, server component composition, metadata and hydration. Explain why one dictionary and one JSX tree avoid independent HTML/client templates. Trace the bounded cache and ETag separately in the documentation route.

## Stage 3: Follow documentation delivery

Read VitePress config, its theme, `docs/descriptions.json` and the docs Route Handler. Run standalone documentation development, then build and serve it through Next.js. Compare initial metadata with metadata after article navigation. Observe the English default and article-preserving language switch.

Deliverable: distinguish static build generation, server metadata injection and client metadata updates. Explain why VitePress uses Vue even though the website runtime uses React.

## Lab 1: Edit a card

Choose an existing card in `site-content.json` and improve its title/detail in all the supported languages. Keep its stable source ID and links. Trace how the server `FeatureSection` maps this content to JSX. Keep its native details usable without JavaScript; do not create a second client-only HTML template.

Run `check:i18n`, build and inspect the card before and after hydration. Check the narrow Arabic version and the disclosure without JavaScript. Check that the card keeps its localized content after hydration and the four demos still work.

## Lab 2: Check a locale

Pick Arabic and Japanese. Follow each from registry to website path, document language, direction, docs path, accessible labels, metadata and sitemap. Switch with a query string and fragment, then change documentation language while reading the architecture article.

List the files needed for another language, including the dictionary, descriptions and five articles. Check mixed-direction commands and label wrapping manually.

## Lab 3: Check ETags and cache isolation

Use a production server and retrieve a document twice. Copy the first response's ETag into the second request:

```sh
curl -i http://localhost:3100/docs/en/architecture/
curl -i -H 'If-None-Match: W/"COPY_THE_RETURNED_HASH"' http://localhost:3100/docs/en/architecture/
curl -i -H 'Host: preview.example' http://localhost:3100/docs/en/architecture/
```

Use the actual returned value, not the placeholder. Expect an empty `304` only for a matching document. Check a different locale and, with `SITE_URL` unset in a preview, a different host. Its canonical URL and ETag must correspond to that document. Read the cache test before adding assertions.

Explain why a warm cache cannot remove JavaScript parsing, why failed renders must be evicted, and why maintained asset URLs must revalidate while newly built content-hashed chunks can be immutable.

## Lab 4: Check reduced motion

Inspect the hero with normal and reduced motion. Follow the rule that disables entrance animations and ensure it also leaves final content visible. A frozen initial `opacity: 0` is a functional failure even when the page has no console errors. Observe demonstration pause controls and ensure decorative Canvas work is suppressed in reduced motion.

Read accessibility and particle tests. Describe the loop's visibility/foreground conditions, 30fps cap and CSS-pixel resolution. Collect before/after observations under the same conditions; do not claim a lower resource cost from a single noisy timing or change the normal demonstration experience to improve a score.

## Lab 5: Check metadata after navigation

Improve one article's description in `docs/descriptions.json` and matching frontmatter for all editions. Build docs, open the article, navigate to another chapter, then switch to Arabic and back to English. Inspect `title`, description, canonical, sharing URL, alternate links and document direction after each step.

Check that metadata from the previous article is removed. Trace the theme’s cleanup and cancellation code and the server’s origin handling.

## Lab 6: Edit a scene

Read `sections/capability-demos.tsx`, `use-demo-scene.ts`, `graphics/particle-field.tsx` and `tests/fixtures/assets.json`. Change a scene transition in source, preserving user pause and visibility behavior. Review static input hashes only when those inputs change. Build and inspect the generated application chunks; none should load from the removed `/harness-source/` path.

List the source files, static inputs and generated outputs, then identify the cache policy for each.

## Record the change

Record the problem, changed files, checks run and remaining limits. Attach a screenshot, response or test result where it helps explain the change. Attribute reused branding to its source.

## A practical verification sequence

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm perf:check
pnpm check:links --strict
```

Choose browser and performance checks based on the change. Record external service failures separately from local failures. Compare your request trace with [Architecture](../architecture/).

## Profile a change

Profile one long task, make a small change and compare resource bytes, interaction behavior and screenshots. Save reports outside versioned source. Review snapshot differences before updating a baseline; local screenshots are regression references, not proof of upstream pixel fidelity.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Term              | Meaning                                             |
| ----------------- | --------------------------------------------------- |
| SSR               | Server-side rendering                               |
| Hydration         | Hydration: attaching client behavior to server HTML |
| Reduced motion    | Reduced motion preference                           |
| RTL               | Right-to-left layout                                |
| Visual regression | Visual regression testing                           |
| Resource budget   | Resource budget                                     |
