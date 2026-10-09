---
title: 'Wymagania witryny'
description: 'Sprawdzanie układu, nawigacji, dostępności, publikacji i wydajności.'
---

# Wymagania witryny

Sprawdź, czy treść jest czytelna bez animacji. Długie nazwy, menu i polecenia muszą mieścić się na wąskim ekranie. Po hydratacji sprawdź klawiaturę, pauzę, kopiowanie i linki.

Każdy język wymaga słownika, kart, etykiet dostępności, metadanych, nawigacji, opisów i pięciu artykułów. Zachowaj parametry i znaczniki rich text. Frontmatter musi odpowiadać `docs/descriptions.json`.

Zbuduj wersję produkcyjną przed testami przeglądarki i użyj wolnego portu. Dobierz sprawdzenia do zmiany. Zbadaj niezgodność sum kontrolnych przed aktualizacją zasobów.

Publikacja serwerowa musi zawierać całe `public`. Sprawdź `SITE_URL`, angielskie wejście dokumentacji, 404, sitemap, favicon, dynamiczne moduły i pamięć podręczną. Eksport Pages wymaga sprawdzenia prefiksu ścieżek.

Ręcznie sprawdź wąski ekran, RTL, mieszane kierunki tekstu, fokus, czytnik ekranu i ograniczenie animacji. Zapisz urządzenie i przeglądarkę. Tłumaczenia nadal wymagają przeglądu przez rodzimych użytkowników języka.

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[Architektura](../architecture/) · [Praktyki frontendowe](../highlights/) · [Ścieżka nauki](../learning/)

<WebsiteLink locale="pl">Witryna</WebsiteLink>
