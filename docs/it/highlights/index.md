---
title: 'Scelte frontend'
description: 'Note su controlli, lingue, animazioni, SEO e risorse.'
---

# Scelte frontend

## Gerarchia delle informazioni

Parti dal beneficio, poi mostra esempi, dettagli e azioni. Le schede aggiuntive rispettano struttura e stile delle dimostrazioni esistenti.

## Controlli accessibili

Usa collegamenti reali ed elementi HTML nativi. Verifica focus, Escape, ritorno del focus, menu stretti e uso senza JavaScript.

## Lingue e direzione

Dizionari, etichette accessibili, metadati, navigazione e articoli devono essere coerenti. RTL richiede proprietà CSS logiche; il codice resta LTR. La corrispondenza delle chiavi non dimostra la qualità della traduzione.

## SEO e risorse

Canonical, hreflang, dati strutturati e metadati di condivisione devono riferirsi alla pagina corrente anche dopo la navigazione client. Origini diverse non devono condividere metadati errati.

Componenti, shader, CSS, Markdown e risorse statiche sono mantenuti nei sorgenti. `tests/fixtures/assets.json` ne controlla l’integrità. `.next`, `public/docs` e rapporti sono risultati generati. Marchi e licenze sono descritti in `NOTICE.md`.

## Evidenza sulle prestazioni

Misura dati trasferiti, LCP, CLS e tempo di blocco. Ripeti le prove e controlla dispositivi reali. Non cambiare la baseline per nascondere una regressione. Prove locali e CI remoto sono evidenze distinte.

[Architettura](../architecture/) · [Requisiti del sito](../requirements/) · [Percorso di apprendimento](../learning/)

<WebsiteLink locale="it">Sito</WebsiteLink>
