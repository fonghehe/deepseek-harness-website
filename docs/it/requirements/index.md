---
title: 'Requisiti del sito'
description: 'Controlli per layout, navigazione, accessibilità, pubblicazione e prestazioni.'
---

# Requisiti del sito

Verifica che i contenuti siano leggibili senza animazioni. Nomi lunghi, menu e comandi devono stare in uno schermo stretto. Dopo l’idratazione, controlla tastiera, pausa, copia e collegamenti.

Ogni lingua richiede dizionario, schede, etichette accessibili, metadati, navigazione, descrizioni e cinque articoli. Conserva segnaposto e tag rich text. Il frontmatter deve corrispondere a `docs/descriptions.json`.

Crea un build di produzione prima dei test browser e usa una porta libera. Scegli le prove in base alla modifica. Indaga gli errori di checksum prima di aggiornare l’inventario delle risorse.

La distribuzione server deve includere tutto `public`. Controlla `SITE_URL`, ingresso inglese dei documenti, 404, sitemap, favicon, moduli dinamici e cache. L’esportazione Pages deve superare la verifica del prefisso dei percorsi.

Controlla schermo stretto, RTL, testo con direzioni miste, focus, lettore di schermo e movimento ridotto. Registra dispositivo e browser. Le traduzioni richiedono ancora una revisione madrelingua.

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[Architettura](../architecture/) · [Scelte frontend](../highlights/) · [Percorso di apprendimento](../learning/)

<WebsiteLink locale="it">Sito</WebsiteLink>
