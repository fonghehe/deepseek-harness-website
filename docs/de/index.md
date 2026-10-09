---
title: 'Überblick'
description: 'Aufbau, Umsetzung und Tests der nachgebildeten DeepSeek-Harness-Website.'
---

# Überblick

Dieses Repository bildet die DeepSeek-Harness-Website mit Next.js und React nach. Die Dokumentation beschreibt Seitenaufbau, Komponenten, Sprachen, Animationen und Tests. VitePress erstellt die Artikel.

Englisch ist die Hauptausgabe; `/docs/` führt direkt dorthin. Die Übersetzungen ergänzen dieselben fünf Kapitel. Die chinesische Website bleibt unter ihrer bisherigen Adresse `/harness/` erreichbar.

## Ein nachvollziehbarer Besuchsablauf

Der Hero nennt Thema und Handlung. Vier interaktive Demonstrationen vertiefen das Verständnis; zusätzliche Karten öffnen Details; der Entwicklerbereich führt zur nächsten Aktion. Die Erweiterung erhält die vorhandene visuelle Sprache. Ohne JavaScript bleiben Überschriften, Links und neue Details sinnvoll lesbar.

## Zuständigkeiten

| Ebene                | Aufgabe                                 | Einstieg                 |
| -------------------- | --------------------------------------- | ------------------------ |
| Next.js              | HTTP, HTML, Weiterleitungen und SEO     | `src/app/`               |
| React                | JSX / SSR / hydration                   | `src/components/`        |
| Gepflegter Quellcode | Übersetzung, Erweiterung und Cache      | `src/lib/`, `src/i18n/`  |
| VitePress / Vue      | Artikel, Suche und Dokumentnavigation   | `docs/.vitepress/`       |
| Prüfungen            | Typen, Sprachen, Ressourcen und Browser | `tests/tools/`, `tests/` |

Die Website besteht aus den React-Komponenten, Hooks und CSS-Dateien dieses Repositorys. Next.js übernimmt serverseitiges Rendering (SSR) und Hydration. Erfasstes HTML und kompilierter Anwendungscode der Originalwebsite werden nicht geladen. Markenbilder, Schriftarten, Datei-Icons und der WeChat-QR-Code sind statische Ressourcen.

## Stärken und Grenzen

Dunkle Flächen, Typografie, Abstände und bestehende Markenressourcen schaffen Kontinuität. Das Favicon ist schwarz. Eine Sprachregistrierung verbindet Pfade, Richtung und Metadaten. Der Rendering-Aufwand auf Mobilgeräten und die Wartung der Animationen erfordern weitere Messungen und Prüfungen; automatische Tests ersetzen weder die sprachliche Prüfung noch Tests mit assistiven Technologien.

Lesen Sie [Architektur](./architecture/), [Frontend-Stärken](./highlights/), [Website-Anforderungen](./requirements/) und [Lernpfad](./learning/), und vergleichen Sie die <WebsiteLink locale="de">Website</WebsiteLink>.
