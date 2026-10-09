---
title: 'Přehled projektu'
description: 'Struktura, implementace a testy znovuvytvořeného webu DeepSeek Harness.'
---

# Přehled projektu

Tento repozitář znovu vytváří web DeepSeek Harness pomocí Next.js a React. Dokumentace popisuje stránky, komponenty, jazyky, animace a testy. Články sestavuje VitePress.

Návštěvník pozná produkt, prohlédne čtyři ukázky, rozbalí podrobnosti a zvolí další krok. Serverový obsah, skutečné odkazy a nativní prvky HTML zůstávají užitečné bez JavaScriptu.

`src/i18n/locales.json` sjednocuje jazyky, cesty, směr a metadata. `/harness/` zachovává čínský vstup; `/docs/` otevírá angličtinu. Každá verze dokumentace má stejných pět kapitol.

Čitelné komponenty pomáhají údržbě. Úspěšné sestavení neprokazuje vizuální věrnost, přirozenost překladu ani výkon na skutečných zařízeních. Tyto vlastnosti vyžadují další ověření.

[Architektura](./architecture/) · [Frontendové postupy](./highlights/) · [Požadavky webu](./requirements/) · [Studijní cesta](./learning/)

<WebsiteLink locale="cs">Web</WebsiteLink>
