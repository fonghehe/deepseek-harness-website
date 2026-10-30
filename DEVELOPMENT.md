# Development

## Run locally

Use the Node version in `.node-version` and pnpm version in `package.json`.

```sh
pnpm install
pnpm docs:build
pnpm dev --port 3100
```

Open `/harness/` for Chinese, `/en/harness/` for English and `/docs/` for the English documentation. Other languages use `/<locale>/harness/` and `/docs/<locale>/`.

Use `pnpm docs:dev` to edit the documentation on its own. For an isolated website preview:

```sh
NEXT_DIST_DIR=.next-preview pnpm dev --port 3104
```

Choose an unused port and leave other servers running.

## Check changes

```sh
pnpm verify
```

This checks formatting, lint, assets, translations, unit tests and types, then builds VitePress and Next.js.

| Command                             | Use                                                                |
| ----------------------------------- | ------------------------------------------------------------------ |
| `pnpm lint` / `pnpm lint:fix`       | Check code / apply safe Oxlint fixes                               |
| `pnpm format` / `pnpm format:check` | Format source / check formatting with Oxfmt                        |
| `pnpm typecheck`                    | Check website, tests and documentation types                       |
| `pnpm check:assets`                 | Verify static inputs; reject captured runtime files                |
| `pnpm check:i18n`                   | Check languages, placeholders, source IDs and article descriptions |
| `pnpm check:links --strict`         | Check external destinations                                        |

For browser and performance checks:

```sh
pnpm exec playwright install chromium firefox webkit
E2E_PORT=3101 pnpm verify:full
```

`verify:full` adds browser regressions and Lighthouse payload budgets. Browser tests need a production build. After building, run a focused test with `E2E_PORT=3101 pnpm exec playwright test <test-file>`. GPU tests run after the functional suite to avoid contention.

Tools live in `tests/tools/`, inputs in `tests/fixtures/`, and generated reports in ignored `test-results/` and `playwright-report/`. Keep local results separate from remote CI, deployment and real-device checks. A network timeout does not establish that an external link is broken.

Visual fixtures are stored under `tests/fixtures/visual/<platform>/`. Compare macOS runs with `darwin` and CI runs with `linux`; fonts can render differently. Review actual and difference images before updating fixtures. Keep screenshot thresholds and performance budgets unchanged unless the underlying contract changes.

To reproduce CI, start Docker and run `pnpm verify:ci`. It verifies a temporary copy with the workflow's Node/pnpm versions and Playwright image, including all three browsers and Pages checks. Reports go to `test-results/ci/`; failed temporary workspaces remain for diagnosis. The working checkout and its servers are preserved.

## Find the source

`src/components/landing-page.tsx` composes the website. Direct imports keep server/client and lazy-loading boundaries visible.

| Location                                | Responsibility                                               |
| --------------------------------------- | ------------------------------------------------------------ |
| `src/app/`                              | Routes, localized root layouts and documentation delivery    |
| `src/components/layout/`, `controls/`   | Header, footer, language, download and clipboard controls    |
| `src/components/sections/`, `previews/` | Sections, illustrations, container queries and CSS timelines |
| `src/components/motion/`                | Entrances, scroll perspective and CTA effects                |
| `src/components/graphics/`              | Three.js scenes, shaders and cleanup                         |
| `src/components/shared/`, `styles/`     | Text helpers, fonts, layout and RTL styles                   |
| `src/hooks/`                            | Playback and shared browser signals                          |
| `src/i18n/`, `src/config/`              | Languages, content and product destinations                  |
| `src/lib/`                              | Metadata, documentation rendering and caching                |
| `docs/`                                 | VitePress theme and localized articles                       |

## Animation and controls

The four CSS demos run for 22s (plugins), 17.5s (files), 11s (workflow) and 15s (trace). `use-demo-scene.ts` combines visibility, foreground state, reduced motion and user pause. CSS `animation-play-state` preserves progress; workflow scenarios change at the end of a cycle.

`browser-environment.ts` shares native media-query and visibility listeners through `useSyncExternalStore`. Server snapshots keep decoration inactive during hydration. The last subscriber releases the listener.

`ScrollEntrances` enhances server-rendered children inside `<main>`. It hides pending elements before reading their starting styles, then observes them in two groups: normal and CTA inset. Use `data-entrance-delay` in seconds for staggering. CSS `transition-delay` would also delay hiding and can make later cards appear immediately. Keyboard focus reveals a card without waiting; pointer focus preserves clicks. Reduced motion and no-JavaScript content remain readable.

Framer Motion handles header springs and scroll perspective. Three.js modules load when visible and in the foreground, compile shaders asynchronously and draw at no more than 30fps using CSS-pixel resolution. Offscreen scenes pause; unmount releases GPU resources. Reduced motion skips GPU allocation, mobile skips the CTA canvas, and CSS backgrounds remain when WebGL is unavailable.

The language menu stays visible through 80px of scroll, then closes as the header collapses. Desktop controls are 32px high; mobile targets are at least 44px. Check keyboard focus, menus, animation stages, reduced motion and no-JavaScript content after relevant changes.

## Languages and documentation

`src/i18n/locales.json` is the shared registry for the website and docs. Arabic, Hebrew, Persian and Urdu use RTL; code and commands stay LTR. Website language switches preserve query and fragment; docs switches preserve the article. Product URLs and feature-source IDs belong to `src/config/product.json`.

Each language has five articles: overview, architecture, highlights, requirements and learning. Update corresponding translations when changing shared content. Keep frontmatter aligned with `docs/descriptions.json`; update `docs/navigation.json` when labels change. Translation checks verify structure, not native-language quality.

VitePress uses Vue to generate `public/docs`; Next.js serves the result. `/docs/` opens English in server delivery, standalone development and preview. Client navigation updates document direction and SEO. The docs theme has its own TypeScript config, checked by `pnpm typecheck`.

Website metadata uses the locale registry and Next.js Metadata API. Set `SITE_URL` for the public origin; local server previews use the request origin. Keep canonical, hreflang, sitemap and sharing metadata consistent. Generic Arabic uses `ar` without an invented region.

## Documentation cache

`src/lib/document-cache.ts` caches built articles in production: at most 128 entries for five minutes, concurrent renders merged, failed renders evicted. Keys include origin and locale/article path. Development bypasses the cache.

Weak ETags support `304` responses with no body. With `SITE_URL` set, document HTML permits five-minute shared caching; preview HTML must revalidate. Hashed VitePress assets are immutable. Website pages use Next.js rendering.

## Measure performance

```sh
pnpm perf:check
```

This starts an owned production server, measures English, Arabic and the English architecture article, checks payload budgets, then stops the server. Reports go to `test-results/performance/`. Use `SITE_AUDIT_URL` for an existing preview or `CHROME_PATH` for an installed Chromium executable.

`pnpm perf:repeat` runs three samples. Scores and timings are local lab observations; compare changes under the same conditions and check real devices separately. `tests/fixtures/performance-budgets.json` defines payload limits. Review baseline changes deliberately; do not replace the baseline to clear a regression.

## Deploy the Next.js server

```sh
pnpm build
pnpm start --port 3100
```

Set `SITE_URL` to the production origin in `.env.local` (see `.env.example`). Deploy the build with the complete `public` directory, including generated docs. Server deployment uses the domain root.

## Publish to GitHub Pages

Use the same complete URL for export and verification, including any repository prefix:

```sh
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
E2E_PAGES=1 E2E_PORT=3109 SITE_URL=https://example.github.io/repository/ pnpm exec playwright test --project=chromium
```

The builder works in temporary `.pages-build`, generates routes and prefixed resources, writes `out/`, then removes the temporary directory. It preserves working source, normal builds and running servers. Publish the whole `out/`: the root serves the website and `/docs/` opens English.

Pages fixes metadata at build time. Request-origin metadata, application-defined cache headers and conditional document ETags belong to the Next.js server. Rebuild the export when the public URL changes.

In GitHub, select **Settings → Pages → Build and deployment → Source: GitHub Actions**. A push to `main`, or a manual `Publish website` run, verifies and deploys the same artifact through `.github/workflows/quality.yml` and `pages.yml`. The workflow obtains the actual Pages URL and needs no personal access token. Configure custom domains before rebuilding.

## Editor setup and contributions

See [`.vscode/README.md`](.vscode/README.md) for tasks and debugging. Keep credentials, personal overrides, machine paths and runtime state local. Commit source, localized Markdown, shared configuration and static inputs; ignore generated output and reports.

See [CONTRIBUTING.md](CONTRIBUTING.md) for changes and translation review, [SECURITY.md](SECURITY.md) for private reports and [NOTICE.md](NOTICE.md) for asset attribution. Original code and documentation use the [MIT license](LICENSE).
