---
title: 'Leerpad'
description: 'Volgorde voor het lezen van de code en zes oefeningen voor wijzigen en controleren.'
---

# Leerpad

Open de website en zoek de code die de pagina opbouwt. De zes oefeningen behandelen kaarten, talen, cache, animaties, artikelmetadata en bronnen.

1. Verbeter een kaart in alle talen, behoud ID en links en vergelijk server-HTML met de gehydrateerde DOM.
2. Volg een taal tot menu, artikel, `lang`, `dir` en sitemap; behoud query en fragment bij wisselen.
3. Test met de echte ETag een lege `304` en cache-isolatie per taal en origin.
4. Controleer pauze, zichtbaarheid, achtergrondtab en minder animatie met behoud van normaal gedrag.
5. Wissel artikel en taal en controleer canonical, deelmetadata en richting.
6. Wijzig één scènefase en bekijk bron, invoer en hashes. De build mag geen `/harness-source/` opvragen.

Vergelijk bytes, interactie en beelden voordat je referenties vervangt. Houd rapporten buiten versiebeheer. Beschrijf bezoekersprobleem, verantwoordelijke code, testresultaat en bewijsgrens; lokale beelden bewijzen geen pixelgelijkheid met de oorspronkelijke site.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Term              | Betekenis                                               |
| ----------------- | ------------------------------------------------------- |
| SSR               | Rendering op de server                                  |
| Hydration         | Hydratatie: interactie toevoegen aan HTML van de server |
| Reduced motion    | Voorkeur voor minder animatie                           |
| RTL               | Indeling van rechts naar links                          |
| Visual regression | Visuele regressietests                                  |
| Resource budget   | Resourcebudget                                          |

[Architectuur](../architecture/) · [Frontendkeuzes](../highlights/) · [Website-eisen](../requirements/)

<WebsiteLink locale="nl">Website</WebsiteLink>
