# Development

## Run locally

Use the Node version in `.node-version` and the pnpm version in `package.json`. The project currently uses Node 24.14.1 and pnpm 11.16.0.

```sh
pnpm install
pnpm docs:build
pnpm dev --port 3100
```

Open `/harness/` for the Simplified Chinese website, `/en/harness/` for English and `/docs/` for the English documentation. Other website languages use `/<locale>/harness/`; docs use `/docs/<locale>/`.

For documentation editing, run `pnpm docs:dev`. To use a separate website build directory, run `NEXT_DIST_DIR=.next-preview pnpm dev --port 3104`. Choose an unused port and leave existing servers running.

## Check a change

```sh
pnpm verify
```

This runs formatting, lint, asset and translation checks, unit tests, type checking and a production build. The build generates VitePress docs before building Next.js.

| Command                     | Purpose                                                                       |
| --------------------------- | ----------------------------------------------------------------------------- |
| `pnpm lint`                 | Oxlint code checks; warnings fail the check                                   |
| `pnpm lint:fix`             | Apply safe lint fixes                                                         |
| `pnpm format`               | Format maintained source and docs with Oxfmt                                  |
| `pnpm format:check`         | Check formatting without writing files                                        |
| `pnpm typecheck`            | Check website, tests, VitePress config and theme                              |
| `pnpm typecheck:docs`       | Check only documentation TypeScript                                           |
| `pnpm check:assets`         | Verify hashes of 21 static inputs and reject captured runtime files           |
| `pnpm check:i18n`           | Check locale coverage, keys, placeholders, rich text and article descriptions |
| `pnpm check:links --strict` | Check external destinations                                                   |

`docs/tsconfig.json` loads `vitepress/client` types for `import.meta.env`, separately from Next.js types. Oxlint rules live in `.oxlintrc.json`; Oxfmt uses `.oxfmtrc.json` with single quotes, trailing commas and a 100-column width. Generated files, SVGs, binary assets and the lockfile are excluded from formatting. The Open Graph route uses native `<img>` elements with `ImageResponse` and has a scoped lint exception.

The lint rules were converted with the [official migration tool](https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint). Some compiler, deprecation and location-assignment rules differ from the earlier setup. Type checking runs separately.

For browser and performance checks:

```sh
pnpm exec playwright install chromium firefox webkit
E2E_PORT=3101 pnpm verify:full
```

Browser tests require a production build. `verify:full` runs the deterministic pipeline, Chromium regressions, Firefox/WebKit critical flows and Lighthouse payload budgets. Particle profiling runs after the functional tests to avoid GPU contention. For a focused browser run after building, use `E2E_PORT=3101 pnpm test:e2e`.

Tools live in `tests/tools/`; inputs and reference images live in `tests/fixtures/`. Generated reports go to ignored `test-results/` and `playwright-report/`. GitHub Actions runs the same commands. Record local results separately from remote CI and deployment checks. External-link failures may need a retry if the remote service is unavailable.

## Find the source

`src/components/landing-page.tsx` composes the page. Component directories are relative to `src/components/`:

| Directory   | Contents                                                |
| ----------- | ------------------------------------------------------- |
| `layout/`   | Header, footer and wordmark                             |
| `controls/` | Language, download, clipboard and contact controls      |
| `sections/` | Demo sections and capability cards                      |
| `previews/` | Five illustrations, container queries and CSS timelines |
| `motion/`   | Framer Motion entrances, perspective and CTA effects    |
| `graphics/` | Three.js scenes, shaders, geometry and cleanup          |
| `shared/`   | Heading and rich-text helpers                           |
| `styles/`   | Fonts, page layout and RTL styles                       |

Use direct imports so client boundaries and lazy scene loading remain visible. The shared playback hook is `src/hooks/use-demo-scene.ts`. Routes and localized root layouts live in `src/app/`. Next.js handles server rendering and hydration; client components handle browser events and decorative scenes.

The language menu stays visible through the first 80px of scroll. When the header collapses, the menu unmounts and closes. Scrolling back restores a closed menu. Desktop controls are 32px high; mobile targets are at least 44px.

## Animation and backgrounds

The four CSS demos run for 22s (plugins), 17.5s (files), 11s (workflow) and 15s (trace). `animation-play-state` preserves their progress when paused. Workflow scenarios change at the end of a cycle. `use-demo-scene.ts` combines viewport visibility, foreground state, reduced motion and user pause.

Framer Motion handles header springs, section entrances and scroll-linked perspective. Three.js draws the hero fluid mesh and ecosystem tiles. Scene modules load when visible and in the foreground, compile shaders asynchronously and render at no more than 30fps using CSS-pixel resolution. Unmount releases geometry, materials, textures and renderers. Reduced motion skips GPU modules; CSS backgrounds remain if WebGL is unavailable. The CTA canvas is disabled on mobile.

For visual changes, compare desktop and mobile layout, fonts, spacing, menu behavior and each demo stage. Check keyboard focus, no-JavaScript content and reduced motion when affected. A component build alone does not establish visual fidelity.

## Languages, docs and metadata

`src/i18n/locales.json` defines all 26 languages, their labels, tags, directions and routes. Arabic, Hebrew, Persian and Urdu use RTL; commands and code stay LTR. The language menu uses native disclosure controls and real links. Website language switching preserves the query and fragment; docs switching preserves the article.

`src/config/product.json` holds product URLs and feature-source IDs. Keep translated cards aligned with those IDs. Translation checks allow different line-break tags; the Chinese introduction combines two paragraphs. These checks do not judge translation quality.

Each docs locale has overview, architecture, highlights, requirements and learning pages. When changing shared content, update the translated editions. Keep frontmatter descriptions aligned with `docs/descriptions.json` and update `docs/navigation.json` if navigation changes. `/docs/` opens English in Next.js and standalone VitePress development and preview. The docs describe this website's implementation.

The VitePress theme updates direction and metadata after client navigation and cancels stale updates. Website and docs SEO use the locale registry for canonical URLs, hreflang and sharing metadata. Generic Arabic uses `ar` without an invented regional Open Graph locale. VitePress's `metaChunk` moves shared language config into a cacheable hashed asset.

Commit React components, CSS, shaders, dictionaries, Markdown and static inputs. Ignore `.next`, generated `public/docs`, caches and reports. Keep captured HTML and compiled upstream runtime files out of the website. Review asset changes before updating `tests/fixtures/assets.json`; `check:assets` is read-only.

## Document caching

`src/lib/document-cache.ts` caches built VitePress articles in production. It keeps at most 128 entries for five minutes, merges concurrent renders and removes failed renders. Keys include origin and locale/article path. Development bypasses the cache.

Weak SHA-256 ETags support conditional `304` responses with no body. With `SITE_URL` set, document HTML permits five-minute shared caching; preview HTML must revalidate. Hashed VitePress assets are immutable. Next.js manages its own generated chunk caching and website rendering.

## Measure performance

`pnpm perf` starts a production server, measures the English and Arabic website pages plus the English architecture article, then stops that server. Set `SITE_AUDIT_URL` to measure an existing preview. Chromium must be installed; `CHROME_PATH` can select an executable. Reports include mobile Lighthouse results, transferred bytes, HTML size and warm-response medians under `test-results/performance/`.

`tests/fixtures/performance-budgets.json` permits 20% HTML and 25% transfer growth over the recorded baseline. The English architecture article has a separate 48 KiB HTML ceiling. Its transfer limit and website budgets remain unchanged. `pnpm perf:baseline` replaces the baseline, so review that change rather than using it to bypass a regression.

The historical mobile run at `2026-10-05T06:40:17.287Z` used SwiftShader:

| Page    | Performance score, before → after | Transferred bytes, before → after |
| ------- | --------------------------------- | --------------------------------- |
| English | 50 → 39                           | 340,874 → 498,783                 |
| Arabic  | 50 → 38                           | 341,841 → 499,744                 |

Accessibility and SEO scores stayed at 100; CLS stayed at zero. The historical payload budgets passed, but the migration did not improve these measured scores or bytes. These are local lab results, not field or real-device results. Use fresh measurements for later changes.

Keyboard tests and axe cover selected English and Arabic website/docs scenarios. Manually check reading order, focus, screen readers and translations as well.

## Deploy the Next.js server

```sh
pnpm build
pnpm start --port 3100
```

Keep the complete `public` directory, including generated `public/docs`, in the deployment. Set `SITE_URL` to the production origin in `.env.local` (see `.env.example`). Local previews use the request origin. The normal server deployment uses the domain root.

## Publish to GitHub Pages

Use the same complete `SITE_URL` for export and verification, including the repository path when needed:

```sh
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
E2E_PAGES=1 E2E_PORT=3109 SITE_URL=https://example.github.io/repository/ pnpm exec playwright test --project=chromium
```

The builder copies source into ignored `.pages-build`, generates static routes and unoptimized images there, builds docs with the deployment prefix, and writes `out/`. It removes the temporary directory after success or failure. The working source, normal `.next` build and running servers remain untouched. `check:pages` checks the website root, nested docs entry, local references, locale routes, direction, canonical/hreflang and sitemap.

Pages renders the Chinese root entry directly. Its docs entry uses a static refresh and a usable link to English. Metadata is fixed at build time. Request-origin handling, the application document cache, ETags and application-defined headers are features of the Node.js deployment. Rebuild Pages when its URL changes.

To enable publication, add your GitHub remote and choose **Settings → Pages → Build and deployment → Source: GitHub Actions** before the first push. Push to the default branch (`main`), or run `Publish website` manually on that branch. `.github/workflows/quality.yml` obtains the actual Pages URL, verifies and exports the site, uploads `out/`, then calls `.github/workflows/pages.yml` to deploy that same verified artifact in the `github-pages` environment. It needs no personal access token. Configure custom domains in Pages settings before rebuilding. The workflow reports the website and documentation URLs after deployment.

The Pages root opens the website; `/docs/` opens the English documentation. Upload the whole `out/` directory so `out/index.html` serves the website and `out/docs/` retains the documentation.

## Editor settings and contributions

Shared editor setup is documented in [`.vscode/README.md`](.vscode/README.md). VS Code and Cursor use the same tasks and formatting settings. Tasks build docs before website development and build the site before E2E tests.

[AGENTS.md](AGENTS.md) is the shared agent instruction file. [AGENT.md](AGENT.md) is a compatibility entry; [Cursor rules](.cursor/rules/project.mdc) reference the same instructions and `.claude/CLAUDE.md` imports them. Shared settings contain no personal models, credentials, providers or broad tool permissions. Keep local overrides and runtime state ignored.

`.gitignore` excludes dependencies, generated output, reports, secrets and personal state. `.cursorignore` and `.cursorindexingignore` limit editor context and indexing; they do not restrict terminal or MCP access.

See [CONTRIBUTING.md](CONTRIBUTING.md) for changes and translation review, [SECURITY.md](SECURITY.md) for private reports and [NOTICE.md](NOTICE.md) for third-party attribution. Original source is MIT licensed. After publication, the repository About panel can link to the deployed site; private vulnerability reporting and Discussions can be enabled in repository settings.

Configuration references: [Codex configuration](https://learn.chatgpt.com/docs/config-file/config-reference), [Claude project memory](https://code.claude.com/docs/en/memory), [Claude settings](https://code.claude.com/docs/en/settings), [Cursor rules](https://cursor.com/docs/rules), and [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
