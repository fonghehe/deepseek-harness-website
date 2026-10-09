# Repository instructions

## Start with the existing implementation

- Read `DEVELOPMENT.md`, `package.json`, and the relevant files before making changes. Check `git status --short` and preserve existing staged, unstaged, and untracked work.
- Prefer small, additive changes. Keep the current landing page, four animated demonstrations, copy/download controls and particle performance behavior unless the user asks to change them.
- Keep implementation simple: native HTML controls, logical CSS properties, shared configuration and existing dependencies. Add dependencies only when they solve a concrete problem.
- Do not commit, push, deploy or change Git history unless the user requests it. Do not overwrite personal editor or agent configuration.

## Project boundaries

This is an independent, component-level recreation of the DeepSeek Harness website, built with Next.js and React. All page markup, controls, animation timelines and GPU renderers are maintained as readable source. Do not restore captured HTML, Flight adapters, screenshots standing in for interfaces, or compiled upstream runtime chunks. Temporary visual references belong outside the repository.

- `src/app/(chinese)` and `src/app/(localized)`: App Router pages and locale-aware root layouts.
- `src/components/landing-page.tsx`: page composition, preserving original sections and additive capability cards. Group components under `layout/`, `controls/`, `sections/`, `previews/`, `motion/`, `graphics/`, `shared/` and `styles/`; use direct module imports to preserve server/client and lazy-loading boundaries. Paths below are relative to this component directory unless fully qualified.
- `previews/*-preview.tsx`, `previews/previews.css`: complete desktop, plugin, file/diff, scheduled-workflow and trace illustrations; preserve reference geometry, timings and container queries.
- `src/hooks/use-demo-scene.ts`: user pause, viewport, foreground and reduced-motion gating. CSS timelines retain their progress while paused; workflow scenarios advance on the story's animation iteration.
- `graphics/fluid-scene.ts`, `graphics/fluid-shaders.ts`, `graphics/tile-scene.ts`, `graphics/tile-shape.ts`, `graphics/particle-field.tsx`: lazy Three.js WebGL backgrounds, authored GLSL, instanced geometry and lifecycle cleanup.
- `motion/scroll-entrances.tsx`, `motion/preview-surface.tsx`, `motion/cta-backdrop.tsx`: Framer Motion section reveals and scroll-linked perspective/blur, plus vector connections with CSS lights. Header springs also use Framer Motion; preserve native controls and the four CSS demonstration timelines.
- `src/i18n`: shared multilingual registry, dictionaries and additive content.
- `src/lib/website-metadata.ts`, docs metadata/cache helpers and SEO routes: standard Next.js metadata and documentation delivery.
- `public/brand`, `public/fonts`, `public/icons`, `public/images`: static brand, typography, file icons and Chinese QR inputs. `tests/fixtures/assets.json` verifies these inputs; framework hash files are generated outputs.
- `docs/.vitepress` and `docs/<locale>`: engineering documentation. Generated `public/docs` is ignored.

A component migration alone is not visual acceptance. Compare desktop/mobile geometry, fonts, spacing, controls, animation stages and scroll behavior with the reference before claiming pixel fidelity. Preserve the more visible language dropdown and its aligned SVG chevron. Keep it visible through the initial 80px of scroll; hide and close it when the header starts collapsing, with matching 32px desktop control heights and 44px mobile targets. Chinese footer uses the WeChat QR; every other language links to DeepSeek on X.

## Languages, documentation and SEO

- `src/i18n/locales.json` is the shared language registry. The site and docs support `en`, `zh`, `ja`, `fr`, `de`, `ko`, `ru`, `ar`, `es`, `pt`, `id`, `tr`, `pl`, `it`, `uk`, `vi`, `nl`, `cs`, `ro`, `he`, `fa`, `th`, `hi`, `bn`, `ur`, `zh-TW`.
- `/harness/` and `/` retain the Chinese entry; other languages use `/<locale>/harness/`. Documentation uses `/docs/<locale>/`.
- Localize visible copy, accessible labels, metadata, the new capability cards, navigation and Markdown. Retain code, commands and filenames as technical identifiers.
- Keep dictionary keys and rich-text placeholders consistent. Repeated text fragments must translate consistently between full and compact previews; unchanged off-page strings must not override localized visible messages.
- Arabic, Hebrew, Persian and Urdu use RTL; other locales use LTR. Prefer `margin-inline`, `padding-inline` and logical positioning. Keep code and commands LTR; avoid reversing the English brand name or isolating every Latin word independently.
- New sections must render the same HTML on server and client. Check dark backgrounds, readable card titles, mobile menus, focus, keyboard navigation, animation pause and no-JavaScript behavior when relevant.
- Maintain localized titles/descriptions, canonical URLs, hreflang, structured data and sitemap entries. `SITE_URL` determines the public origin; local previews use the request origin. Docs client navigation must update direction and canonical/hreflang links.
- Each docs locale has overview, architecture, highlights, requirements and learning pages. When changing shared documentation, update corresponding locales and `docs/navigation.json` as needed.
- Documentation is an engineering case study of this website: Next.js/React delivery, UI design, localization, accessibility, SEO, assets, caching and verification. Describe source ownership and tradeoffs accurately; do not replace it with a Harness runtime feature guide. English is the default at `/docs/`, including standalone VitePress development and preview; other locales supplement it.
- README files introduce the product: English is primary, with Chinese and Japanese counterparts. Put engineering instructions in `DEVELOPMENT.md` and the VitePress docs.

## Commands and verification

Use pnpm and the Node version in `.node-version`. Versions and scripts in `package.json` are authoritative. Use Oxlint (`.oxlintrc.json`) for linting and Oxfmt (`.oxfmtrc.json`) for formatting; format all maintained source. Do not reintroduce ESLint or Prettier configuration.

```sh
pnpm install
pnpm docs:build
pnpm dev --port 3100
pnpm docs:dev
pnpm lint
pnpm format:check
pnpm typecheck
pnpm build
E2E_PORT=3101 pnpm test:e2e
```

`pnpm build` builds the docs before Next.js. Keep generated docs in the production deployment's `public` directory. Browser tests need a production build. Use an unused test port; do not terminate an existing user-owned server. Editor tasks provide a build prerequisite for E2E tests and docs generation before website development.

Choose checks to match the change: config/docs-only edits usually need syntax, path/ignore checks and relevant builds; UI/i18n/runtime edits need browser regressions. Test locale switching after hydration, mobile RTL, original animations and no-JavaScript content when affected. Run visual checks for contrast, mixed-direction text and clipped menus. Do not add tests that merely duplicate implementation for low-impact changes. Report completed checks and any unverified editor/runtime behavior accurately.

## Agent and editor configuration

`AGENTS.md` is the canonical shared instruction file. `AGENT.md` is a human-readable compatibility entry; singular filenames are not assumed to be discovered automatically. `.cursor/rules/project.mdc` points to this file. Keep shared editor settings/tasks/debug configurations under `.vscode`, and project rules under `.cursor/rules`. Keep secrets, personal overrides, machine paths and runtime state out of committed configuration. Cursor ignore files control context/indexing; they do not replace filesystem permissions or protect against terminal/MCP access.

## Additional quality contracts

- Keep verification tools in `tests/tools/`, their required inputs in `tests/fixtures/`, and generated Lighthouse reports in ignored `test-results/performance/`. Do not recreate separate root `quality/` or `scripts/` directories.

- Prefer `pnpm verify` for the complete deterministic pipeline and `pnpm verify:full` for browser/performance verification. Install all three Playwright browsers before the latter. GitHub Actions uses the same commands; do not claim remote CI passed from a local run.
- `check:assets` is read-only: verify static input hashes and reject a return of captured HTML or runtime directories. Update the input inventory deliberately when fonts/icons change.
- Product URLs and feature-source IDs belong to `src/config/product.json`. Run `check:links --strict` when changing links; report network uncertainty separately from confirmed broken links.
- Update `docs/descriptions.json` with document frontmatter. Website/docs metadata must agree after navigation. Do not invent a regional Open Graph locale for generic Arabic.
- Documentation render cache keys include origin and locale/path. Preserve bounded capacity, failed-render eviction, development freshness and conditional ETags when changing routes.
- Preserve reduced-motion handling, keyboard focus, contrast and the normal-motion animation controls. Performance budgets protect payload growth; lab scores and timings are observations. Do not replace the baseline just to pass a regression.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Static publication and community

- GitHub Pages uses `pnpm build:pages` and `pnpm check:pages` with the same complete `SITE_URL`. Keep `.pages-build` temporary and `out` ignored; never alter the working source or a running server during export. Preserve the normal Node.js deployment and its document cache.
- Update website, all five localized docs, navigation, descriptions and SEO when adding languages. Use registry-derived counts in validation and tests.
- Keep agent rules centralized here; shared Claude/Cursor/Codex settings must not override personal models, providers, credentials or grant unrestricted tool access.
- Original code is MIT; consult `NOTICE.md` for third-party branding and assets. Keep contribution/reporting instructions and GitHub templates focused on this website.
