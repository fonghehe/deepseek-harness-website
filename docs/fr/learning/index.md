---
title: 'Parcours d’apprentissage'
description: 'Ordre de lecture du code et six exercices de modification et de vérification.'
---

# Parcours d’apprentissage

Ouvrez le site, puis suivez le code qui produit la page. Les six exercices portent sur les cartes, les langues, le cache, les animations, les métadonnées des articles et les ressources.

## Ordre de lecture

Ouvrez les versions anglaise et arabe sur un écran étroit, puis vérifiez le clavier, la réduction des animations et l’usage sans JavaScript. Lisez ensuite le registre des langues, le CSS et les pages localisées ; suivez les routes, le rendu, le SEO et le cache. Terminez par VitePress, le thème Vue et la route documentaire pour distinguer la génération statique des traitements serveur et client.

## Exercice 1 : une carte et un rendu commun

Améliorez le texte d’une carte dans toutes les langues prises en charge, en conservant son identifiant et ses liens. Comparez le HTML du serveur au DOM après hydratation. Vérifiez les éléments HTML dépliables sans JavaScript, la disposition en arabe et les quatre démonstrations existantes. Le serveur et le client doivent continuer à utiliser le même modèle.

## Exercice 2 : le contrat des langues

Suivez les versions japonaise et arabe depuis le registre jusqu’aux chemins, aux attributs `lang` et `dir`, aux libellés, aux documents et aux liens vers les autres langues. Vérifiez que le changement de langue conserve les paramètres de requête, le fragment d’URL et l’article courant. Décrivez ensuite les modifications nécessaires pour une langue supplémentaire, sans l’ajouter pour les seuls besoins de l’exercice.

## Exercice 3 : cache et conditions

```sh
curl -i http://localhost:3100/docs/en/architecture/
curl -i -H 'If-None-Match: W/"COPY_THE_RETURNED_HASH"' http://localhost:3100/docs/en/architecture/
```

Refaites la requête avec l’ETag reçu et vérifiez que le serveur répond par `304` sans corps. Une autre langue ou un autre hôte de prévisualisation, lorsque `SITE_URL` n’est pas défini, doit disposer de sa propre URL canonical et de son propre ETag.

## Exercice 4 : motion et contenu visible

Vérifiez que le mouvement réduit ne laisse pas le premier écran à l'opacité initiale. Expliquez visibilité, premier plan, 30fps et DPR. Mesurez sous conditions identiques, sans sacrifier l'expérience normale pour un score.

## Exercice 5 : SEO après navigation

Synchronisez description et frontmatter, puis changez d'article et de langue. Inspectez canonical, partage, alternates et direction. Expliquez nettoyage des anciens nœuds et annulation d'une mise à jour obsolète.

## Exercice 6 : composants et entrées

Lisez `capability-demos.tsx`, `use-demo-scene.ts` et `assets.json`. Modifiez une transition en conservant la pause et le contrôle de visibilité. Ne mettez à jour l’empreinte d’une ressource que si son fichier a changé. Vérifiez que les chunks générés ne demandent aucun fichier sous `/harness-source/`.

## Présenter le résultat

Présentez le problème rencontré par le visiteur, le code qui y répond, les vérifications effectuées et leurs limites. Distinguez votre implémentation du design des démonstrations originales, et indiquez le coût sur mobile ainsi que les vérifications manuelles restantes. Exécutez `pnpm verify`, les scénarios navigateur concernés et les mesures pertinentes, puis comparez le résultat au chapitre [Architecture](../architecture/).

## Suivre une amélioration complète

Utilisez les fichiers ci-dessous pour identifier une tâche longue, effectuez une modification limitée puis comparez poids, interactions et captures. Gardez les rapports hors des sources versionnées. Examinez les différences avant toute mise à jour des références ; les images locales ne prouvent pas la fidélité au pixel près du site original.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Terme             | Sens                                               |
| ----------------- | -------------------------------------------------- |
| SSR               | Rendu côté serveur                                 |
| Hydration         | Hydratation : rendre interactif le HTML du serveur |
| Reduced motion    | Préférence de réduction des animations             |
| RTL               | Disposition de droite à gauche                     |
| Visual regression | Tests de régression visuelle                       |
| Resource budget   | Budget de ressources                               |
