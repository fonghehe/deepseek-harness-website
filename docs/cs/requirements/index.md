---
title: 'Požadavky webu'
description: 'Kontroly rozvržení, navigace, přístupnosti, publikace a výkonu.'
---

# Požadavky webu

Ověřte čitelnost obsahu bez animací. Dlouhé názvy, nabídky a příkazy se musí vejít na úzkou obrazovku. Po hydrataci vyzkoušejte klávesnici, pauzu, kopírování a odkazy.

Každý jazyk potřebuje slovník, karty, přístupné popisky, metadata, navigaci, popisy a pět článků. Zachovejte zástupné proměnné a značky rich text. Frontmatter musí odpovídat `docs/descriptions.json`.

Před testy prohlížeče sestavte produkční verzi a použijte volný port. Před aktualizací vstupů zjistěte příčinu chyby kontrolního součtu. Server musí dostat celé `public`; zkontrolujte `SITE_URL`, anglický vstup dokumentů, 404, sitemap, favicon, dynamické moduly a cache. Pro Pages ověřte také prefix cest.

Ručně zkontrolujte úzkou obrazovku, RTL, smíšený směr textu, fokus, čtečku obrazovky a omezení animací. Zaznamenejte zařízení a prohlížeč. Překlady nadále potřebují revizi rodilými mluvčími.

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[Architektura](../architecture/) · [Frontendové postupy](../highlights/) · [Studijní cesta](../learning/)

<WebsiteLink locale="cs">Web</WebsiteLink>
