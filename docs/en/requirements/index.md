---
title: 'Website essentials'
description: 'Checks for layout, navigation, accessibility, deployment and performance.'
---

# Website essentials

Use this checklist when reviewing a page change or preparing a release. Run the checks that match the files and behavior you changed.

## Review the visitor experience

| Area                    | Acceptance criterion                                                                            | Evidence in this repository              |
| ----------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Information hierarchy   | A visitor can identify the subject and next action without playing every animation              | Hero, section ordering, disclosure cards |
| Brand                   | Icons, typography and surfaces remain coherent; the favicon is the black upstream mark          | Local brand assets and styles            |
| Responsive behavior     | Menus, long labels and technical blocks fit a narrow viewport                                   | Arabic 390px browser checks              |
| Navigation              | Links work after hydration, locale changes retain query/fragment, unavailable routes return 404 | Locale and route regressions             |
| Progressive enhancement | Core copy, links and added details remain usable without JavaScript                             | No-JavaScript browser coverage           |
| Accessibility           | Keyboard focus is visible and predictable; reduced motion leaves content visible                | Disclosure, motion and axe checks        |
| Localization            | All dictionaries, metadata and article sets remain aligned                                      | `check:i18n` and localized docs tests    |
| Discovery               | Current page has the correct canonical, alternates and sharing metadata                         | SEO response and client navigation tests |
| Delivery                | Cache cannot mix domains or languages; conditional responses have empty bodies                  | Cache/ETag browser tests                 |
| Resources               | Static inputs and framework-generated chunks are deployed correctly                             | `check:assets` and manifest              |

The matrix is a starting point. Manual inspection should include line wrapping, Arabic mixed-direction text, focus order and the clarity of each action. A Lighthouse score or screenshot cannot establish all of these properties.

## Source and generated output inventory

| Path                                                                | Commit? | Reason                                                     |
| ------------------------------------------------------------------- | ------- | ---------------------------------------------------------- |
| `src/`, `docs/<locale>/`, `docs/.vitepress/`                        | Yes     | Maintained source, article content and configuration       |
| `src/components/`, `src/hooks/`                                     | Yes     | Maintained React components and scene lifecycles           |
| `tests/fixtures/assets.json`                                        | Yes     | Static input hashes and inventory                          |
| `public/brand/`, `public/fonts/`, `public/icons/`, `public/images/` | Yes     | Local static inputs; application styles now live in `src/` |
| `.next/`                                                            | No      | Next.js output regenerated locally                         |
| `public/docs/`                                                      | No      | VitePress output regenerated before the website build      |
| `docs/.vitepress/cache/`, reports, `node_modules/`                  | No      | Caches, observations and installed dependencies            |
| `.env.example`, shared editor/agent files                           | Yes     | Portable workflow and documented settings                  |
| `.env.local`, personal overrides and credentials                    | No      | Machine-specific or private values                         |

`public/harness-source` and captured HTML templates have been removed. Website JavaScript and CSS are generated from maintained components and styles during `pnpm build`. Only static brand, font, icon and Chinese QR inputs remain versioned. Content-hashed framework output belongs to the build, not to a manually vendored runtime directory.

## Keep configuration portable

Use the package manager and Node version declared by the repository. Commit the lockfile and shared tasks. Keep editor settings focused on the project and exclude personal MCP configuration, credentials and runtime history. `AGENTS.md` is the canonical instruction file; `AGENT.md` is a compatibility entry, not an assumption about automatic tool discovery. Ignore files help Git and indexing, but do not grant or revoke terminal permissions.

## Validate a content change

1. Edit maintained content or Markdown, then synchronize the other supported languages and shared descriptions.
2. Check initial response and hydrated output when changing website text. For docs, navigate between articles and languages rather than inspecting only the initial load.
3. Run formatting, translation validation and a documentation build. Run relevant browser checks if routing, SEO, direction or controls are affected.
4. Inspect a narrow screen and reduced-motion mode where relevant. Check links and code punctuation in Arabic.

```sh
pnpm format:check
pnpm check:i18n
pnpm docs:build
pnpm verify
E2E_PORT=3101 pnpm test:e2e
```

Use an unused port. Browser tests need a production build. A docs-only edit does not justify changing scene components, and a checksum failure should be investigated before recording new hashes.

## Production release checklist

- Build docs before Next.js using `pnpm build`; ship the complete `public` directory with the server.
- Set `SITE_URL` to the actual public origin. Check canonical and sharing URLs on the deployed origin rather than assuming local host-based previews represent production.
- Confirm `/docs/` opens English, all supported website/document editions work, unknown article paths return 404, and the sitemap contains the intended URLs.
- Check original demonstration controls, copy/download actions, dynamic chunk requests and the black favicon.
- Confirm cache headers distinguish HTML, framework chunks and genuinely content-hashed documentation assets.
- Run the appropriate local checks and inspect remote CI separately. Preserve failure reports instead of declaring deployment success from a build alone.

## Performance and maintenance criteria

Review transferred bytes and HTML size alongside LCP, CLS and blocking time. Warm server response timings describe delivery, while browser execution describes another cost. The performance baseline is historical evidence; do not overwrite it just to hide a regression. When expanding an article, review the content-size budget explicitly rather than silently relaxing product-page limits.

Update a scene through its component, state clock and authored CSS. Keep static input hashes in sync only after reviewing an intentional asset change. Test pause/resume, offscreen behavior, reduced motion and language-dependent wrapping. Chinese alone shows the WeChat QR contact; the other language footers link to `https://x.com/deepseek_ai`.

Continue with [Learning path](../learning/) for a sequence of source readings and hands-on changes.

## Acceptance beyond automation

Check keyboard entry, Escape and focus restoration in language/download menus; verify copy announcements with a screen reader. On a real phone, inspect scrolling and animation stages. Repeat Arabic with long labels and mixed-direction commands. Record browser, device, motion preference and evidence. A native-language reviewer must confirm wording; passing parity checks is not a translation review.

```sh
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
SITE_URL=https://example.github.io/repository/ pnpm perf:pages
```
