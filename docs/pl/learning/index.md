---
title: 'Ścieżka nauki'
description: 'Kolejność czytania kodu i sześć ćwiczeń ze zmiany i sprawdzania witryny.'
---

# Ścieżka nauki

Otwórz witrynę i znajdź kod tworzący stronę. Sześć ćwiczeń dotyczy kart, języków, pamięci podręcznej, animacji, metadanych artykułów i zasobów.

1. Popraw kartę we wszystkich językach, zachowaj ID i linki, porównaj HTML serwera z DOM po hydratacji.
2. Prześledź język od rejestru przez menu, artykuł, `lang`, `dir` i sitemap; parametry zapytania i fragment mają pozostać przy zmianie języka.
3. Użyj prawdziwego ETag do sprawdzenia pustego `304` i rozdzielenia pamięci między językami i origin.
4. Sprawdź pauzę, widoczność, kartę w tle i ograniczenie animacji bez zmiany normalnego przebiegu.
5. Zmień artykuł i język; potwierdź aktualizację canonical, metadanych udostępniania i kierunku.
6. Zmień jedną fazę sceny, sprawdź źródła, zasoby i hashe. Wynik nie może żądać `/harness-source/`.

Przed zmianą wzorców porównaj rozmiar danych, interakcje i obrazy. Raporty trzymaj poza wersjonowanymi źródłami. Opisz problem odwiedzającego, odpowiedzialność kodu, wynik testu i granice dowodu. Lokalne obrazy nie potwierdzają zgodności piksel po pikselu z oryginałem.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Termin            | Znaczenie                                                |
| ----------------- | -------------------------------------------------------- |
| SSR               | Renderowanie po stronie serwera                          |
| Hydration         | Hydratacja: dodawanie interakcji klienta do HTML serwera |
| Reduced motion    | Preferencja ograniczenia animacji                        |
| RTL               | Układ od prawej do lewej                                 |
| Visual regression | Testy regresji wizualnej                                 |
| Resource budget   | Budżet zasobów                                           |

[Architektura](../architecture/) · [Praktyki frontendowe](../highlights/) · [Wymagania witryny](../requirements/)

<WebsiteLink locale="pl">Witryna</WebsiteLink>
