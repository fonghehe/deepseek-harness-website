---
title: 'Website-eisen'
description: 'Controles voor indeling, navigatie, toegankelijkheid, publicatie en prestaties.'
---

# Website-eisen

Controleer of de inhoud zonder animatie leesbaar is. Lange namen, menu’s en opdrachten moeten op een smal scherm passen. Test na hydratatie het toetsenbord, pauzeren, kopiëren en links.

Elke taal vereist woordenboek, kaarten, toegankelijke labels, metadata, navigatie, beschrijvingen en vijf artikelen. Bewaar placeholders en rich-texttags. Stem frontmatter af op `docs/descriptions.json`.

Maak een productiebuild voor browsertests en gebruik een vrije poort. Onderzoek checksumfouten voordat je de invoerinventaris bijwerkt. Lever op de server het volledige `public`; controleer `SITE_URL`, Engelse docs-ingang, 404, sitemap, favicon, chunks en cache. Controleer bij Pages ook het padprefix.

Inspecteer smalle schermen, RTL, gemengde tekstrichting, focus, schermlezer en minder animatie. Leg apparaat en browser vast. Moedertaalsprekers moeten de formuleringen nog beoordelen.

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[Architectuur](../architecture/) · [Frontendkeuzes](../highlights/) · [Leerpad](../learning/)

<WebsiteLink locale="nl">Website</WebsiteLink>
