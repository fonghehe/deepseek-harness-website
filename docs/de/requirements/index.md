---
title: 'Website-Anforderungen'
description: 'Prüfungen für Layout, Navigation, Barrierefreiheit, Veröffentlichung und Leistung.'
---

# Website-Anforderungen

Nutzen Sie diese Liste für Änderungen und Veröffentlichungen. Wählen Sie die Prüfungen passend zu den geänderten Dateien und Funktionen.

## Kriterien

| Bereich         | Erwartetes Ergebnis                                                    |
| --------------- | ---------------------------------------------------------------------- |
| Inhalt          | Thema und nächste Handlung ohne alle Animationen verständlich          |
| Schmale Ansicht | Lange Labels, Menüs und Befehle ohne Überlauf                          |
| Bedienung       | Links nach Hydration, Tastaturfokus, Details ohne JS                   |
| Sprachen        | Alle Sprachversionen mit passenden Routen, Richtungen und Metadaten    |
| SEO             | Canonical und Sharing zeigen nach Navigation auf den aktuellen Artikel |
| HTTP            | Origin und Sprache werden nicht vermischt; 304 ohne Body               |

Lesereihenfolge, gemischte Satzzeichen und Formulierungen benötigen zusätzliche Sichtprüfung.

## Eingaben und Ausgaben

Komponenten, Hooks, CSS, Markdown und statische Ressourcen werden versioniert. `pnpm build` erzeugt JavaScript und CSS; `.next` und `public/docs` bleiben außerhalb der Git-Versionsverwaltung. Die Prüfungen anhand von `tests/fixtures/assets.json` sichern die Ressourcenintegrität und verhindern die Rückkehr von erfasstem HTML oder fremdem Laufzeitcode.

`.next`, `public/docs`, Caches, Reports und installierte Pakete sind erzeugte Ausgaben. Geteilte Editorregeln bleiben portabel; persönliche Konfiguration und Geheimnisse bleiben lokal. Ignore-Regeln sind keine Zugriffsrechte.

## Änderung prüfen

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
```

Erst Produktion bauen, dann relevante Browserflüsse auf einem freien Port prüfen. Beschreibungen und Frontmatter aller Ausgaben müssen übereinstimmen. Hashfehler untersuchen, bevor Checksummen geändert werden.

## Veröffentlichung

Dokumente vor Next.js bauen, vollständiges `public` ausliefern, `SITE_URL` setzen. Englischen Einstieg, die unterstützten Sprachen, 404, Sitemap, Favicon, Demo-Steuerung und dynamische Chunks prüfen. Cacheheader je Ressourcenkategorie kontrollieren. Lokaler Build, Remote-CI und Prüfung auf der veröffentlichten Domain sind getrennte Nachweise.

## Leistung und Wartung

Payload mit LCP, CLS und Blocking messen. Servercache entfernt keine Client-Ausführung. Baseline nicht zur Fehlerumgehung ersetzen; Artikelwachstum explizit budgetieren. Bei Änderungen an Ressourcen und Animationen prüfen Sie die betroffenen Komponenten und CSS-Regeln, Herkunft, Prüfsummen und das bisherige Verhalten.

Weiter zum [Lernpfad](../learning/).

Nur Chinesisch zeigt WeChat-QR; die anderen Sprachen verlinken https://x.com/deepseek_ai.

## Manuelle Abnahme

Prüfen Sie Tastatur, Escape und Fokus-Rückkehr in Menüs sowie Kopiermeldungen mit einem Screenreader. Prüfen Sie Scrollen und Animationsphasen auf einem Telefon. Wiederholen Sie dies auf Arabisch mit langen Beschriftungen und gemischter Schreibrichtung. Dokumentieren Sie Gerät, Browser, Bewegungseinstellung und Belege. Muttersprachliche Prüfung bleibt erforderlich.

```sh
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
SITE_URL=https://example.github.io/repository/ pnpm perf:pages
```
