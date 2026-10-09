---
title: 'Lernpfad'
description: 'Reihenfolge zum Lesen des Codes und sechs Übungen zum Ändern und Prüfen.'
---

# Lernpfad

Öffnen Sie die Website und lesen Sie den zugehörigen Code. Die sechs Übungen behandeln Karten, Sprachen, Cache, Animationen, Artikelmetadaten und Ressourcen.

## Lesereihenfolge

Öffnen Sie die englische und die arabische Website in einem schmalen Fenster. Prüfen Sie die Tastaturbedienung, die Einstellung für reduzierte Animationen und das Verhalten ohne JavaScript. Lesen Sie anschließend das Sprachregister, die CSS-Regeln und die sprachabhängigen Seiten. Verfolgen Sie Routing, Rendering, HTML-Ausgabe, SEO und Cache. Die VitePress-Konfiguration, das Vue-Theme und die Dokumentroute zeigen schließlich, welche Aufgaben beim Build, auf dem Server und im Browser ausgeführt werden.

## Übung 1: Gemeinsame Karten ändern

Verbessern Sie eine bestehende Karte in allen Sprachversionen und behalten Sie ihre ID und Links bei. Vergleichen Sie die Serverausgabe mit dem DOM nach der Hydration. Prüfen Sie die aufklappbaren HTML-Details, das RTL-Layout und die vier bestehenden Demonstrationen. Verwenden Sie für Server und Client weiterhin dieselbe Vorlage.

## Übung 2: Sprachvertrag verfolgen

Verfolgen Sie die japanische und die arabische Sprachversion vom Register bis zu Pfaden, `lang`, `dir`, Beschriftungen, Dokumenten und Sprachalternativen. Prüfen Sie, ob beim Sprachwechsel die Abfrageparameter, das URL-Fragment und der aktuelle Artikel erhalten bleiben. Beschreiben Sie anschließend, welche Änderungen eine weitere Sprache erfordern würde; für diese Übung müssen Sie sie nicht anlegen.

## Übung 3: Cacheisolierung belegen

```sh
curl -i http://localhost:3100/docs/en/architecture/
curl -i -H 'If-None-Match: W/"COPY_THE_RETURNED_HASH"' http://localhost:3100/docs/en/architecture/
```

Setzen Sie den tatsächlich empfangenen ETag ein. Nur für das passende Dokument darf der Server mit `304` ohne Antwortinhalt reagieren. Prüfen Sie außerdem, dass eine andere Sprache und ein anderer Vorschau-Host bei nicht gesetztem `SITE_URL` jeweils eigene Canonical-URLs und ETags erhalten.

## Übung 4: Bewegungsfehler finden

Prüfen Sie, ob der Einstiegsbereich auch bei reduzierten Animationen sichtbar bleibt, statt mit seiner anfänglichen Opazität stehen zu bleiben. Erklären Sie den Einfluss von Sichtbarkeit, aktivem Browser-Tab, der Begrenzung auf 30fps und DPR. Messen Sie unter gleichen Bedingungen und erhalten Sie die normale Bedienung, auch wenn ein anderer Ansatz einen höheren Messwert verspricht.

## Übung 5: Dokument-SEO nach Navigation

Stimmen Sie die Beschreibungen mit den Frontmatter-Angaben ab und wechseln Sie anschließend Artikel und Sprache. Kontrollieren Sie die Canonical-URL, die Metadaten für geteilte Links und die Schreibrichtung. Erklären Sie, wie alte Metadaten entfernt und überholte Aktualisierungen abgebrochen werden.

## Übung 6: Komponenten und Eingaben

Lesen Sie `capability-demos.tsx`, `use-demo-scene.ts` und `assets.json`. Ändern Sie eine Animationsphase, ohne die Pause oder die Sichtbarkeitssteuerung zu beeinträchtigen. Aktualisieren Sie einen Ressourcen-Hash nur, wenn sich die zugehörige Datei geändert hat. Prüfen Sie, dass erzeugte Chunks keine Dateien aus `/harness-source/` laden.

## Ergebnisse präsentieren

Beschreiben Sie das Problem der Besucher, den zuständigen Code, die durchgeführten Prüfungen und die verbleibenden Grenzen. Unterscheiden Sie Ihre Umsetzung von den Demonstrationen der Originalwebsite und nennen Sie den Aufwand auf Mobilgeräten sowie noch nötige manuelle Prüfungen. Führen Sie `pnpm verify` und die passenden Browser- und Leistungstests aus. Vergleichen Sie den Ablauf mit dem Kapitel [Architektur](../architecture/).

## Eine Verbesserung vollständig verfolgen

Verfolgen Sie eine lange Aufgabe anhand der folgenden Dateien, ändern Sie einen begrenzten Bereich und vergleichen Sie Datenmenge, Bedienung und Bilder. Berichte bleiben außerhalb versionierter Quellen. Prüfen Sie Unterschiede vor einer Baseline-Aktualisierung; lokale Bilder beweisen keine Pixelgleichheit mit dem Original.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Begriff           | Bedeutung                                          |
| ----------------- | -------------------------------------------------- |
| SSR               | Serverseitiges Rendering                           |
| Hydration         | Hydration: Server-HTML mit Interaktionen verbinden |
| Reduced motion    | Einstellung für reduzierte Animationen             |
| RTL               | Rechts-nach-links-Layout                           |
| Visual regression | Visuelle Regressionstests                          |
| Resource budget   | Ressourcenbudget                                   |
