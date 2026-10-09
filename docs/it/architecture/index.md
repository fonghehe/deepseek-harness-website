---
title: 'Architettura'
description: 'Componenti React, route Next.js, animazioni e distribuzione degli articoli VitePress.'
---

# Architettura

`landing-page.tsx` compone la pagina. `layout/` gestisce la struttura, `controls/` le azioni, `sections/` le sezioni e `previews/` le illustrazioni con il loro CSS. `motion/` contiene Framer Motion; `graphics/` scene Three.js, geometrie e shader.

La pagina valida la lingua e passa il dizionario ai componenti. Server e client usano lo stesso JSX; il layout imposta `lang` e `dir`. RichText elabora solo i tag previsti. Il sito non carica HTML catturato né l’applicazione compilata del sito originale.

`use-demo-scene.ts` combina pausa dell’utente, visibilità, scheda attiva e movimento ridotto. Il CSS conserva il progresso durante la pausa; il workflow cambia scenario a fine ciclo. Le quattro storie mantengono durate di 22, 17,5, 11 e 15 secondi.

Three.js si carica quando serve. Il rendering è limitato a 30fps e alla risoluzione dei pixel CSS, si ferma fuori schermo e in background e viene evitato con movimento ridotto. Geometrie, materiali, texture e renderer vengono liberati. Framer Motion gestisce molle dell’intestazione, ingressi delle sezioni e prospettiva durante lo scorrimento.

`pnpm build` genera prima VitePress in `public/docs`, poi Next.js. La navigazione dei documenti aggiorna direzione e SEO. La cache del server separa origine e lingua/percorso dell’articolo, conserva al massimo 128 voci per cinque minuti ed elimina i rendering falliti. Un ETag corrispondente restituisce `304` senza corpo.

GitHub Pages usa `build:pages` e `check:pages` con il `SITE_URL` completo. I metadati statici si fissano durante il build; cache ed ETag dell’applicazione appartengono alla modalità server. L’esportazione non modifica i sorgenti di lavoro. Le istruzioni sono in `DEVELOPMENT.md`.

```text
src/components/
├── landing-page.tsx
├── layout/
├── controls/
├── sections/
├── previews/
├── motion/
├── graphics/
├── shared/
└── styles/

page.tsx → locale + dictionary → LandingPage → Next.js SSR
/docs/ → /docs/en/ → VitePress article
```

[Scelte frontend](../highlights/) · [Requisiti del sito](../requirements/) · [Percorso di apprendimento](../learning/)

<WebsiteLink locale="it">Sito</WebsiteLink>
