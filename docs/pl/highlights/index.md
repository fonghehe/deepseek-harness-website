---
title: 'Praktyki frontendowe'
description: 'Uwagi o kontrolkach, językach, animacjach, SEO i zasobach.'
---

# Praktyki frontendowe

## Hierarchia informacji

Najpierw korzyść, potem przykład, szczegóły i działanie. Dodatkowe karty rozwijają strukturę i styl istniejących demonstracji.

## Dostępna obsługa

Używaj zwykłych linków i natywnych elementów HTML. Sprawdź fokus, Escape, powrót fokusu, wąskie menu i działanie bez JavaScript.

## Języki i kierunek

Słowniki, etykiety dostępności, metadane, nawigacja i artykuły muszą być spójne. RTL wymaga logicznych właściwości CSS; kod zachowuje LTR. Zgodność kluczy nie potwierdza jakości języka.

## SEO i zasoby

Canonical, hreflang, dane strukturalne i metadane udostępniania mają opisywać bieżącą stronę także po nawigacji klienta. Różne origin nie mogą współdzielić błędnych metadanych.

Komponenty, shadery, CSS, Markdown i zasoby wejściowe są utrzymywane w źródłach. `tests/fixtures/assets.json` sprawdza integralność. `.next`, `public/docs` i raporty są wynikami. Branding i licencje opisuje `NOTICE.md`.

## Dowody wydajności

Mierz rozmiar danych, LCP, CLS i czas blokowania. Powtarzaj pomiary i sprawdzaj prawdziwe urządzenia. Nie zmieniaj baseline, by ukryć regresję. Lokalne testy i zdalne CI są różnymi dowodami.

[Architektura](../architecture/) · [Wymagania witryny](../requirements/) · [Ścieżka nauki](../learning/)

<WebsiteLink locale="pl">Witryna</WebsiteLink>
