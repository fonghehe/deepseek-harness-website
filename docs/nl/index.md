---
title: 'Projectoverzicht'
description: 'Opbouw, implementatie en tests van de nagebouwde DeepSeek Harness-website.'
---

# Projectoverzicht

Deze repository bouwt de DeepSeek Harness-website na met Next.js en React. De documentatie beschrijft pagina’s, componenten, talen, animaties en tests. VitePress bouwt de artikelen.

De bezoeker ziet eerst het product, vervolgens vier demonstraties, uitklapbare details en een volgende stap. Serverinhoud, echte links en HTML-details blijven bruikbaar zonder JavaScript.

`src/i18n/locales.json` verbindt talen, paden, leesrichting en metadata. `/harness/` behoudt de Chinese ingang; `/docs/` opent Engels. Elke documentatieversie heeft dezelfde vijf hoofdstukken.

Leesbare componenten helpen bij onderhoud. Een geslaagde build bewijst geen visuele trouw, natuurlijke vertaling of prestaties op echte apparaten. Daarvoor zijn gerichte controles nodig.

[Architectuur](./architecture/) · [Frontendkeuzes](./highlights/) · [Website-eisen](./requirements/) · [Leerpad](./learning/)

<WebsiteLink locale="nl">Website</WebsiteLink>
