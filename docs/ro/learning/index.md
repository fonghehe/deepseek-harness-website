---
title: 'Traseu de învățare'
description: 'Ordinea de citire a codului și șase exerciții de modificare și verificare.'
---

# Traseu de învățare

Deschide site-ul și citește codul care creează pagina. Cele șase exerciții verifică carduri, limbi, cache, animații, metadatele articolelor și resurse.

1. Îmbunătățește un card în toate limbile, păstrează ID și linkuri și compară HTML-ul serverului cu DOM-ul hidratat.
2. Urmărește limba până la meniu, articol, `lang`, `dir` și sitemap; păstrează query și fragment la schimbare.
3. Folosește ETag real pentru `304` gol și izolarea cache-ului după limbă și origine.
4. Verifică pauza, vizibilitatea, fila în fundal și mișcarea redusă fără a schimba comportamentul normal.
5. Schimbă articolul și limba, apoi verifică canonical, partajarea și direcția.
6. Modifică o fază a scenei și verifică sursa, intrările și hash-urile. Build-ul nu trebuie să ceară `/harness-source/`.

Compară datele, interacțiunile și imaginile înainte de actualizarea referințelor. Păstrează rapoartele în afara surselor versionate. Explică problema vizitatorului, codul responsabil, rezultatul testului și limitele dovezii; imaginile locale nu dovedesc identitatea pixel cu pixel cu originalul.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Termen            | Înțeles                                                    |
| ----------------- | ---------------------------------------------------------- |
| SSR               | Randare pe server                                          |
| Hydration         | Hidratare: adăugarea interacțiunilor la HTML-ul serverului |
| Reduced motion    | Preferință pentru reducerea animațiilor                    |
| RTL               | Aspect de la dreapta la stânga                             |
| Visual regression | Teste de regresie vizuală                                  |
| Resource budget   | Buget de resurse                                           |

[Arhitectură](../architecture/) · [Practici frontend](../highlights/) · [Cerințele site-ului](../requirements/)

<WebsiteLink locale="ro">Site</WebsiteLink>
