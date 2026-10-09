---
title: 'Architecture'
description: 'React components, Next.js routes, animation playback and VitePress delivery.'
---

# Architecture

The website is implemented in this repository's React components, hooks and CSS. Next.js owns routing, SSR, metadata and hydration. Static fonts, brand marks, file icons and the Chinese QR image are reused inputs; captured HTML, compiled upstream chunks and string/Flight adaptation are removed.

## Component directories

The page entry stays in `landing-page.tsx`. Organize components by responsibility so a layout change, control fix, illustration update or GPU change has a clear starting point. `previews/` keeps illustration markup beside its container queries and timelines; `graphics/` keeps renderers, geometry and shaders together. Shared text helpers stay in `shared/`, while the shared playback hook remains in `src/hooks/use-demo-scene.ts`. Imports name the actual module rather than a re-export barrel, making server/client boundaries and lazy GPU imports visible.

```text
src/components/
├── landing-page.tsx    # Page composition
├── layout/             # Header, footer and brand
├── controls/           # Language, download, clipboard and contact controls
├── sections/           # Capability demos and detail cards
├── previews/           # Five illustrations and their CSS timelines
├── motion/             # Entrance, perspective and CTA motion
├── graphics/           # Three.js scenes, shaders and geometry
├── shared/             # Heading and rich text helpers
└── styles/             # Tokens, responsive layout and RTL
```

## Routing and localized root layouts

```text
src/app/(chinese)/layout.tsx             → html lang=zh-CN, dir=ltr
src/app/(chinese)/page.tsx               → /harness/
src/app/(chinese)/harness/page.tsx       → Chinese website
src/app/(localized)/[locale]/layout.tsx  → locale-specific html lang/dir
src/app/(localized)/[locale]/harness/page.tsx → other localized editions
src/app/docs/[[...slug]]/route.ts        → VitePress documents
```

Route groups separate the Chinese entry and parameterized language layouts without adding URL segments. Each root layout renders the correct document language and direction on the server. Unknown locales return 404, and the duplicate Chinese language path redirects to `/harness/`. Native anchors provide complete document navigation and preserve browser modifier-key behavior.

## Request flow

```text
request → locale page → validate language → shared LandingPage
        → server content + component props → Next.js SSR
        → localized Metadata / JSON-LD → complete document
browser → framework-generated chunks → hydrate client controls
        → visibility / motion preference → demo and Canvas clocks
```

The page uses a shared composition, not independently copied layouts. Selected dictionary values are passed into components, so the initial markup and hydrated control labels describe the same language. React escapes normal strings. `RichText` interprets only the dictionary's explicit formatting tags; it does not inject arbitrary translation HTML. JSON-LD uses an escaping helper appropriate for script content.

## Component responsibility map

| Component or module                                       | Responsibility                                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `landing-page.tsx`                                        | Compose the full visitor journey from maintained components                     |
| `layout/header.tsx`, `controls/locale-menu.tsx`           | Brand link, responsive menu, multilingual disclosure and navigation             |
| `controls/download-menu.tsx`, `controls/copy-command.tsx` | Real download destinations and clipboard actions                                |
| `previews/desktop-preview.tsx`                            | Source-rendered desktop window, sidebar, conversation and composer illustration |
| `sections/capability-demos.tsx`                           | Plugin, file, scheduled-work and trace scenes with distinct layouts             |
| `use-demo-scene.ts`                                       | Visibility, foreground, reduced motion and user pause gating                    |
| `sections/feature-section.tsx`                            | Server-rendered native detail cards from shared translated content              |
| `graphics/particle-field.tsx`                             | Lazy Three.js scenes and lifecycle cleanup                                      |
| `layout/footer.tsx`                                       | Chinese WeChat QR; other locales link to DeepSeek on X                          |
| `styles/harness.css`                                      | Authored design tokens, responsive layouts, RTL rules and scene animation       |

Server components handle composition and static content. Client components own browser state and events. Client props contain the text their interface needs; the original compiled application is not shipped as a hidden dependency. This boundary is directly inspectable and can evolve one component at a time.

## The demonstration lifecycle

Each card observes visibility and document foreground state. The hook combines these with reduced motion and user pause. A single running condition controls CSS animation-play-state; the browser preserves the timeline position without a React interval or repeated phase rendering. Workflow changes its scenario on the story's animation iteration. Cleanup removes observers and media listeners.

CSS animations follow `data-running`: paused or offscreen scenes keep their animation position instead of restarting on every scroll. Plugin creation, file circulation, scheduling and trace inspection are authored illustrations; they do not create real agent tasks. Trace details change at the original timeline stages. The demo control is a real button with a localized accessible name.

Reduced motion also disables entrance effects while leaving final content visible. It is important to test visibility, not merely that no animation is running: freezing an initial opacity of zero would hide the hero.

## The particle background

`ParticleField` loads scene modules while visible and in the foreground. The hero uses `RawShaderMaterial` with the fluid GLSL; the ecosystem tiles use `InstancedBufferGeometry`. Where supported, `compileAsync` prepares shaders asynchronously.

Rendering is capped at 30fps using CSS-pixel resolution. Offscreen or background scenes stop. Reduced motion skips GPU allocation; unmount disposes geometry, materials, textures and renderers. The CTA canvas is disabled on mobile. CSS backgrounds remain when WebGL is unavailable.

Framer Motion handles header springs, entrances and scroll perspective. The four demos keep CSS timelines and their pause position:

| Demo     | Cycle |
| -------- | ----- |
| Plugins  | 22s   |
| Files    | 17.5s |
| Workflow | 11s   |
| Trace    | 15s   |

## Configuration and localized navigation

`src/i18n/locales.json` defines native labels, language tags, direction, website paths, docs paths and sharing locale. Website controls, VitePress, hreflang and sitemap consume it. `src/config/product.json` owns download, repository and social destinations. Translation dictionaries and `site-content.json` supply text.

Arabic sets RTL on the server-rendered document. Logical CSS properties position menus and card controls correctly; code stays isolated LTR. Website language switches retain query and fragment. Documentation switches retain the current article. The locale disclosure adds Escape/outside-click closing and focus recovery while retaining native links without JavaScript.

## Website metadata and documentation cache

`website-metadata.ts` uses the Next.js Metadata API for localized title, description, canonical, alternate links, Open Graph, Twitter and the black favicon. The public origin comes from `SITE_URL` or preview request headers. Website pages use Next.js rendering; a separate manual cache does not sit in front of the component tree.

The bounded cache in `document-cache.ts` remains for built VitePress articles: at most 128 entries, five-minute TTL, concurrent render coalescing and failed-entry eviction. Keys include origin and article path. Weak ETags support empty conditional `304` responses. Different origins or article languages cannot reuse another document's canonical data.

## Documentation generation and deployment

```sh
pnpm docs:dev
pnpm docs:build
pnpm build
```

VitePress/Vue generates ignored `public/docs`; Next.js builds after that and serves its articles from the same origin. `/docs/` opens English in production, standalone development and preview. The Vue theme updates direction and tagged SEO nodes after navigation and cancels stale updates. Frontmatter descriptions match `docs/descriptions.json`.

Commit React/CSS source, localized Markdown, configuration and static input assets. Ignore `.next`, generated docs, caches and reports. `tests/fixtures/assets.json` and read-only checks protect the remaining static inputs and reject a return of the removed captured runtime. Deploy the complete required public files and Next.js build output.

## Manual checks

Component ownership makes interaction logic readable and removes the compiled capture dependency. It does not by itself prove exact visual fidelity, every browser flow or better mobile timings. Review the desktop and 390px layouts, all four scene sequences, keyboard navigation, reduced motion, no-JavaScript reading and social contacts. Historical performance reports describe the previous implementation until fresh measurements replace the current observations.

Continue with [Frontend highlights](../highlights/) and [Learning path](../learning/) to connect these boundaries to practical exercises.

## Public website deployment

GitHub Pages publishes this website and all documentation as static files. `pnpm build:pages` uses the actual deployment URL and repository prefix; `pnpm check:pages` verifies local destinations and SEO. The normal Next.js server remains available. Request-origin metadata, application-defined cache headers and conditional document ETags belong to server delivery; Pages fixes metadata at build time. Publication instructions are in `DEVELOPMENT.md`.

## Server and client components

The static file and trace illustrations are server-rendered. Playback controls and the scenario-changing workflow are client components. The large plugin SVG tree keeps a client boundary to avoid excessive HTML/RSC serialization. Compare both HTML and browser JavaScript before moving a boundary.

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
