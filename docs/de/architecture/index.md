---
title: 'Architektur'
description: 'React-Komponenten, Next.js-Routen, Animationen und VitePress-Auslieferung.'
---

# Architektur

Die Website besteht aus den React-Komponenten, Hooks und CSS-Dateien dieses Repositorys. Next.js übernimmt serverseitiges Rendering (SSR) und Hydration. Erfasstes HTML und kompilierter Anwendungscode der Originalwebsite werden nicht geladen. Markenbilder, Schriftarten, Datei-Icons und der WeChat-QR-Code sind statische Ressourcen.

## Komponentenverzeichnisse

Der Seiteneinstieg bleibt `landing-page.tsx`. Die Komponenten sind nach Verantwortung geordnet: Layout, Bedienelemente, Demonstrationen und GPU. `previews/` hält JSX, Container Queries und Zeitleisten zusammen; `graphics/` bündelt Renderer, Geometrie und Shader. Texthilfen liegen in `shared/`, der gemeinsame Wiedergabe-Hook bleibt in `src/hooks/use-demo-scene.ts`. Direkte Modulimporte ohne zentrale Reexport-Datei machen Server-/Client-Grenzen und das verzögerte Laden der GPU-Module sichtbar.

```text
src/components/
├── landing-page.tsx    # Seitenaufbau
├── layout/             # Kopfzeile, Fußzeile und Marke
├── controls/           # Sprache, Download, Kopieren und Kontakt
├── sections/           # Demonstrationsbereiche und Detailkarten
├── previews/           # Fünf Illustrationen und CSS-Zeitleisten
├── motion/             # Einblendungen, Perspektive und CTA-Bewegung
├── graphics/           # Three.js-Szenen, Shader und Geometrie
├── shared/             # Überschriften und Rich Text
└── styles/             # Designvariablen, responsive Layouts und RTL
```

## Komponentenkomposition

```text
page.tsx → locale + dictionary → LandingPage → Next.js SSR
layout.tsx → html lang / dir
browser → generated chunks → client events / demo state
/docs/ → /docs/en/ → VitePress article
```

| Komponente                           | Quelldatei                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| Kopfzeile, Sprache und Downloads     | `layout/header.tsx`, `controls/locale-menu.tsx`, `controls/download-menu.tsx`   |
| Desktop-Vorschau im Einstiegsbereich | `previews/desktop-preview.tsx`                                                  |
| Vier interaktive Szenen              | `sections/capability-demos.tsx`, `use-demo-scene.ts`                            |
| Native Detailkarten                  | `sections/feature-section.tsx`                                                  |
| Zwischenablage, Canvas und Kontakt   | `controls/copy-command.tsx`, `graphics/particle-field.tsx`, `layout/footer.tsx` |
| Stile und Metadaten                  | `styles/harness.css`, `website-metadata.ts`                                     |

## SSR und Sprachen

Die Seite prüft den Sprachcode und übergibt die Texte als Props an LandingPage. Server und Client verwenden dasselbe JSX. RichText verarbeitet ausschließlich die vereinbarten Tags. Die Root-Layouts der Routengruppen setzen `lang` und `dir` bereits auf dem Server.

## Wiedergabesteuerung der Demonstrationen

`use-demo-scene` verbindet Sichtbarkeit, Vordergrund, reduzierte Bewegung und Benutzerpause. CSS `animation-play-state` erhält die Position ohne React-Rendering pro Frame; workflow wechselt das Szenario nach jedem Zyklus.

## Canvas-Lebenszyklus

`ParticleField` lädt Three.js-Szenen nur sichtbar im Vordergrund. `RawShaderMaterial` erhält eigenes Fluid-GLSL und Farbwerte; `InstancedBufferGeometry` zeichnet die Kacheln gemeinsam. `compileAsync` bereitet Programme bei unterstützter Parallelkompilierung vor. Höchstens 30fps und CSS-Pixel-Auflösung begrenzen die Arbeit. Außerhalb der Ansicht und im Hintergrund stoppt das Rendering; reduzierte Bewegung vermeidet GPU-Allokationen. Cleanup gibt Geometrien, Materialien, Texturen und Renderer frei.

Framer Motion übernimmt Navigationsfedern, Einblendungen und Scroll-Perspektive ohne React-Rendering pro Frame. Die vier Demos behalten CSS-Zeitachsen von 22s, 17,5s, 11s und 15s, Containerskalierung und ihre Pausenposition.

## Auslieferung der Dokumentation

VitePress und Vue erzeugen die Dokumentation in `public/docs`. Next.js liefert sie unter derselben Origin wie die Website aus. Auch der eigenständige Entwicklungs- und Vorschauserver öffnet standardmäßig die englische Ausgabe. Das Vue-Theme aktualisiert nach der Navigation die Schreibrichtung und SEO-Metadaten, entfernt vorherige Metadaten und verwirft überholte Aktualisierungen.

## SEO und Artikelcache

`website-metadata.ts` nutzt die Metadata-API von Next.js mit `SITE_URL` oder dem Ursprung der Vorschauanfrage. Für Arabisch wird keine Region angenommen. Der Cache für VitePress-Artikel trennt Ursprung und Artikel, hält höchstens 128 Einträge für fünf Minuten und entfernt fehlgeschlagene Renderings. Bei passendem schwachem ETag wird eine leere `304`-Antwort zurückgegeben.

## Eingaben und Build

Komponenten, Hooks, CSS, Markdown und statische Ressourcen werden versioniert. `pnpm build` erzeugt JavaScript und CSS; `.next` und `public/docs` bleiben außerhalb der Git-Versionsverwaltung. Die Prüfungen anhand von `tests/fixtures/assets.json` sichern die Ressourcenintegrität und verhindern die Rückkehr von erfasstem HTML oder fremdem Laufzeitcode.

Nur Chinesisch zeigt WeChat-QR; die anderen Sprachen verlinken https://x.com/deepseek_ai.

Eigene, lesbare Komponentenquellen erleichtern die Wartung, belegen aber keine exakte Grafik, jeden Ablauf oder mobile Laufzeit. Historische Reports zeigen die frühere Implementierung. Übersetzung, Fokus und gemischte Richtung bleiben manuell zu prüfen.

Die englische Hauptausgabe beschreibt weitere Einzelheiten. [English](../../en/architecture/)

## Website veröffentlichen

GitHub Pages veröffentlicht die Website und sämtliche Dokumentation als statische Dateien. `pnpm build:pages` verwendet die tatsächliche URL und den Repository-Pfad; `pnpm check:pages` prüft lokale Ziele und SEO. Der normale Next.js-Server bleibt verfügbar. Anfrageabhängige Herkunft, Anwendungs-Cacheheader und bedingte Dokument-ETags gehören zum Serverbetrieb; Pages legt Metadaten beim Build fest. Die Anleitung steht in `DEVELOPMENT.md`.

## Rendering- und Deployment-Grenzen

Statische Datei- und Trace-Grafiken werden auf dem Server gerendert. Wiedergabesteuerung und wechselnde Workflow-Szenarien bleiben Client-Komponenten. Der große Plugin-SVG-Baum behält eine Client-Grenze, um die HTML/RSC-Serialisierung zu begrenzen. Vergleichen Sie HTML und Skripte vor einer Grenzverschiebung.

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
