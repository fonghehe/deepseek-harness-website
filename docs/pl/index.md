---
title: 'Przegląd projektu'
description: 'Budowa, implementacja i testy odtworzonej witryny DeepSeek Harness.'
---

# Przegląd projektu

To repozytorium odtwarza witrynę DeepSeek Harness za pomocą Next.js i React. Dokumentacja opisuje strony, komponenty, języki, animacje i testy. Artykuły buduje VitePress.

Odwiedzający poznaje produkt, ogląda cztery demonstracje, rozwija karty szczegółów i wybiera dalsze działanie. Treść serwerowa, zwykłe linki i rozwijane elementy HTML pozostają przydatne bez JavaScript.

`src/i18n/locales.json` łączy nazwy języków, trasy, kierunek tekstu i metadane. `/harness/` zachowuje wejście chińskie, a `/docs/` otwiera wersję angielską. Każde wydanie dokumentacji ma te same pięć rozdziałów.

Czytelne komponenty ułatwiają utrzymanie. Poprawna kompilacja nie potwierdza zgodności wizualnej, naturalności tłumaczeń ani wydajności na prawdziwych urządzeniach; wymagają one osobnych sprawdzeń.

[Architektura](./architecture/) · [Praktyki frontendowe](./highlights/) · [Wymagania witryny](./requirements/) · [Ścieżka nauki](./learning/)

<WebsiteLink locale="pl">Witryna</WebsiteLink>
