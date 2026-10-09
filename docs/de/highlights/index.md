---
title: 'Frontend-Stärken'
description: 'Hinweise zu Bedienelementen, Sprachen, Animationen, SEO und Ressourcen.'
---

# Frontend-Stärken

Diese Notizen beschreiben Layout, Bedienung, Sprachen und Rendering sowie die zugehörigen Dateien und Prüfungen.

## 1. Informationshierarchie

Thema, Beispiel, Detail und Handlung folgen dem Verständnis der Besucher. Planen Sie diesen Weg vor den Animationen.

## 2. Kleine Erweiterungsgrenze

Bestehende Demonstrationen bleiben erhalten. Gemeinsames JSON und HTML ergänzen den Inhalt, ohne eine zweite Seitenkopie zu schaffen.

## 3. Wiederverwendete Gestaltung

Schwarzes Favicon, Schriften, Icons und Bilder werden lokal verwendet. Herkunft und Gewicht sind prüfbar; vorhandene Gestaltung wird nicht als eigene Erfindung ausgegeben.

## 4. Sprachen gemeinsam modelliert

Eine Registrierung verbindet Routen, Labels, Richtung und SEO. Schlüsselprüfungen ergänzen menschliche Prüfung von Ausdruck und Umbruch.

## 5. Funktionales RTL

Logisches CSS, Menüpositionen und LTR-Code werden zusammen geprüft. Arabisch bei 390px verdeutlicht, warum Container-Spiegelung nicht genügt.

## 6. Progressive Verbesserung

Native Aufklappelemente und echte Links funktionieren ohne JavaScript. Escape, Außenklick, Fokus und URL-Erhaltung verbessern diese Basis.

## 7. Konsistente Hydration

Die Seite validiert die Sprache und komponiert LandingPage mit Wörterbuch-Props. Server und Client verwenden dasselbe JSX. RichText verarbeitet nur vereinbarte Tags statt freien HTML-Inhalt zu injizieren. Root-Layouts der Routengruppen setzen lang und dir serverseitig.

## 8. Begrenzter Animationsbetrieb

`use-demo-scene.ts` berücksichtigt Sichtbarkeit, aktiven Tab, reduzierte Bewegung und Pause. CSS hält die Wiedergabeposition. Three.js stoppt außerhalb der Ansicht und gibt beim Abbau GPU-Ressourcen frei; siehe [Architektur](../architecture/).

## 9. SEO im Auslieferungsvertrag

Canonical, Alternates und Sharing werden erstellt und nach Dokumentnavigation aktualisiert. Generisches Arabisch bekommt keine erfundene regionale OG-Angabe.

## 10. Korrektes Caching

`website-metadata.ts` nutzt die Metadata-API von Next.js mit `SITE_URL` oder dem Ursprung der Vorschauanfrage. Für Arabisch wird keine Region angenommen. Der Cache für VitePress-Artikel trennt Ursprung und Artikel, hält höchstens 128 Einträge für fünf Minuten und entfernt fehlgeschlagene Renderings. Bei passendem schwachem ETag wird eine leere `304`-Antwort zurückgegeben.

## 11. Ressourcenintegrität

Komponenten, Hooks, CSS, Markdown und statische Ressourcen werden versioniert. `pnpm build` erzeugt JavaScript und CSS; `.next` und `public/docs` bleiben außerhalb der Git-Versionsverwaltung. Die Prüfungen anhand von `tests/fixtures/assets.json` sichern die Ressourcenintegrität und verhindern die Rückkehr von erfasstem HTML oder fremdem Laufzeitcode.

## 12. Prüfungen für reale Fehler

Oxlint, Oxfmt, Sprach-/Assetchecks, Playwright, axe und Lighthouse prüfen verschiedene Ebenen. Die Zuordnung zum Fehler ist wichtiger als die Werkzeuganzahl.

## Verbleibende Grenzen

Eigene, lesbare Komponentenquellen erleichtern die Wartung, belegen aber keine exakte Grafik, jeden Ablauf oder mobile Laufzeit. Historische Reports zeigen die frühere Implementierung. Übersetzung, Fokus und gemischte Richtung bleiben manuell zu prüfen.

## Leistung anhand von Messungen

Dekoration startet nach Schriftbereitschaft und Hero-Eintritt, anschließend nach Paint und einer Idle-Aufgabe. Der Flow-Map-Zweig mit konstant null Einfluss entfällt bei gleicher Ausgabe. Frame-Zähler sind nur bei expliziter Analyse aktiv. Pause außerhalb des Sichtbereichs und im Hintergrund, 30fps, reduzierte Bewegung und GPU-Freigabe bleiben erhalten. Messen Sie Node und Pages getrennt und prüfen Sie mehrere Durchläufe sowie echte Geräte.

- `src/components/graphics/schedule-scene.ts`, `fluid-shaders.ts`
- `src/components/graphics/particle-field.tsx`, `tile-scene.ts`
- `tests/tools/audit-performance.mjs`, `tests/fixtures/performance-budgets.json`
