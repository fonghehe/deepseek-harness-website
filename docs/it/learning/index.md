---
title: 'Percorso di apprendimento'
description: 'Ordine di lettura del codice e sei esercizi per modificare e verificare il sito.'
---

# Percorso di apprendimento

Apri il sito e leggi il codice che genera la pagina. I sei esercizi riguardano schede, lingue, cache, animazioni, metadati degli articoli e risorse.

1. Migliora una scheda in tutte le lingue, conserva ID e link, confronta HTML del server e DOM idratato.
2. Segui una lingua dal registro a menu, articolo, `lang`, `dir` e sitemap; conserva query e frammento nel cambio lingua.
3. Usa un ETag reale per provare `304` senza corpo e separazione della cache per lingua e origine.
4. Verifica pausa, visibilità, scheda in background e movimento ridotto senza cambiare le animazioni normali.
5. Cambia articolo e lingua e verifica canonical, metadati di condivisione e direzione.
6. Modifica una fase della scena e rivedi sorgenti, risorse e hash. Il build non deve richiedere `/harness-source/`.

Confronta dimensioni, interazioni e immagini prima di aggiornare i riferimenti. Mantieni i rapporti fuori dai sorgenti versionati. Descrivi il problema del visitatore, il codice responsabile, il test e il limite della prova. Le immagini locali non dimostrano la coincidenza pixel per pixel con l’originale.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Termine           | Significato                                                   |
| ----------------- | ------------------------------------------------------------- |
| SSR               | Rendering sul server                                          |
| Hydration         | Idratazione: aggiungere interazioni al codice HTML del server |
| Reduced motion    | Preferenza per animazioni ridotte                             |
| RTL               | Layout da destra a sinistra                                   |
| Visual regression | Test di regressione visiva                                    |
| Resource budget   | Budget delle risorse                                          |

[Architettura](../architecture/) · [Scelte frontend](../highlights/) · [Requisiti del sito](../requirements/)

<WebsiteLink locale="it">Sito</WebsiteLink>
