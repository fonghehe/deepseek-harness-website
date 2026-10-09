---
title: 'Studijní cesta'
description: 'Pořadí čtení kódu a šest cvičení pro změny a ověření webu.'
---

# Studijní cesta

Otevřete web a najděte kód, který vytváří stránku. Šest cvičení se věnuje kartám, jazykům, mezipaměti, animacím, metadatům článků a zdrojům.

1. Zlepšete kartu ve všech jazycích, zachovejte ID a odkazy a porovnejte serverové HTML s DOM po hydrataci.
2. Sledujte jazyk z registru do nabídky, článku, `lang`, `dir` a sitemap; při změně jazyka zachovejte query a fragment.
3. Skutečným ETag ověřte prázdnou `304` a oddělení cache podle jazyka a origin.
4. Otestujte pauzu, viditelnost, kartu na pozadí a omezené animace při zachování běžného chování.
5. Změňte článek a jazyk a zkontrolujte canonical, metadata sdílení a směr.
6. Změňte jednu fázi scény a ověřte zdroje, vstupy a hashe. Sestavení nesmí žádat `/harness-source/`.

Před výměnou referencí porovnejte data, interakce a snímky. Zprávy uchovávejte mimo verzované zdroje. Popište problém návštěvníka, odpovědný kód, výsledek testu a meze důkazu; místní snímky neprokazují shodu pixel po pixelu s originálem.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Pojem             | Význam                                          |
| ----------------- | ----------------------------------------------- |
| SSR               | Vykreslování na serveru                         |
| Hydration         | Hydratace: přidání interakcí do HTML ze serveru |
| Reduced motion    | Preference omezených animací                    |
| RTL               | Rozvržení zprava doleva                         |
| Visual regression | Testy vizuální regrese                          |
| Resource budget   | Rozpočet prostředků                             |

[Architektura](../architecture/) · [Frontendové postupy](../highlights/) · [Požadavky webu](../requirements/)

<WebsiteLink locale="cs">Web</WebsiteLink>
