---
title: 'Vue d’ensemble'
description: 'Structure, réalisation et tests du site reproduisant DeepSeek Harness.'
---

# Vue d’ensemble

Ce dépôt reproduit le site DeepSeek Harness avec Next.js et React. La documentation décrit les pages, les composants, les langues, les animations et les tests. Elle est construite avec VitePress.

L'anglais est l'édition principale : `/docs/` y conduit directement. Les autres éditions reprennent la même structure en cinq chapitres. La version chinoise du site reste accessible à son adresse habituelle, `/harness/`.

## Un parcours progressif

Le premier écran situe le sujet et propose une action. Quatre démonstrations expliquent ensuite une expérience ; les cartes supplémentaires dévoilent les détails ; la zone développeur propose une suite concrète. On peut parcourir rapidement ou approfondir. Les ajouts prolongent les démonstrations existantes et leur langage visuel. Sans JavaScript, titres, liens, détails ajoutés et accès aux documents restent utiles.

## Responsabilités techniques

| Couche            | Responsabilité                           | Source                   |
| ----------------- | ---------------------------------------- | ------------------------ |
| Next.js           | HTTP, redirections, HTML et SEO          | `src/app/`               |
| React             | JSX / SSR / hydration                    | `src/components/`        |
| Modules maintenus | Traductions, extension, cache            | `src/lib/`, `src/i18n/`  |
| VitePress / Vue   | Articles, recherche et navigation        | `docs/.vitepress/`       |
| Vérification      | Types, ressources, langues et navigateur | `tests/tools/`, `tests/` |

Le site est construit à partir des composants React, hooks et CSS maintenus dans ce dépôt. Next.js assure le rendu serveur (SSR) et l’hydratation. Le site ne charge ni HTML capturé ni application compilée provenant du site original. Les éléments de marque, polices, icônes de fichiers et QR WeChat sont utilisés comme ressources statiques.

## Forces et compromis

Surfaces sombres, hiérarchie typographique, espaces et ressources existantes rendent les ajouts cohérents. Le favicon noir reprend la marque originale. Le registre des langues unifie chemins, direction et métadonnées. La charge de rendu sur mobile et la maintenance des animations demandent encore des mesures et des vérifications régulières. Les contrôles automatiques ne remplacent ni la relecture linguistique ni les essais avec les technologies d’assistance.

Lisez [Architecture](./architecture/), [Points forts frontend](./highlights/), [Exigences du site](./requirements/) et [Parcours d’apprentissage](./learning/), puis comparez avec le <WebsiteLink locale="fr">site</WebsiteLink>.
