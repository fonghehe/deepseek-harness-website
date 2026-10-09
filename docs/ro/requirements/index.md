---
title: 'Cerințele site-ului'
description: 'Verificări pentru aspect, navigare, accesibilitate, publicare și performanță.'
---

# Cerințele site-ului

Verifică dacă poți citi conținutul fără animații. Numele lungi, meniurile și comenzile trebuie să încapă pe un ecran îngust. După hidratare, testează tastatura, pauza, copierea și linkurile.

Fiecare limbă are nevoie de dicționar, carduri, etichete accesibile, metadate, navigare, descrieri și cinci articole. Păstrează variabilele și etichetele rich text. Frontmatter trebuie să corespundă cu `docs/descriptions.json`.

Construiește producția înainte de testele în browser și folosește un port liber. Investighează erorile de checksum înainte de actualizarea inventarului. Serverul trebuie să primească întregul `public`; verifică `SITE_URL`, intrarea engleză, 404, sitemap, favicon, chunk-uri și cache. Pentru Pages verifică și prefixul căilor.

Inspectează ecranele înguste, RTL, textul mixt, focalizarea, cititorul de ecran și mișcarea redusă. Înregistrează dispozitivul și browserul. Traducerile necesită în continuare revizie de către vorbitori nativi.

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[Arhitectură](../architecture/) · [Practici frontend](../highlights/) · [Traseu de învățare](../learning/)

<WebsiteLink locale="ro">Site</WebsiteLink>
