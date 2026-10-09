---
title: 'Points forts frontend'
description: 'Notes sur les contrôles, les langues, les animations, le SEO et les ressources.'
---

# Points forts frontend

Ces notes décrivent la mise en page, les contrôles, les langues et le rendu, avec les fichiers et vérifications correspondants.

## 1. Hiérarchie de l'information

Sujet, exemples, détails et action suivent le besoin du visiteur. Concevez d'abord ce parcours avant de choisir l'animation.

## 2. Extension progressive

Les démonstrations restent présentes ; le contenu JSON partagé est rendu par des composants React pour ajouter une section cohérente. La frontière évite de dupliquer toute la page.

## 3. Marque et ressources

Favicon noir, polices, icônes et illustrations sont réutilisés et livrés localement. Inspectez provenance et poids, sans attribuer les créations amont au dépôt.

## 4. Un modèle commun pour les langues

Un registre relie routes, labels, direction et SEO. Les contrôles de clés et variables complètent une relecture humaine de la formulation et des retours à la ligne.

## 5. RTL fonctionnel

Propriétés CSS logiques, menus et blocs LTR sont vérifiés ensemble. Le scénario arabe à 390px montre pourquoi inverser un conteneur ne suffit pas.

## 6. Amélioration progressive

Les éléments de divulgation natifs et liens réels restent disponibles sans JavaScript. Escape, fermeture extérieure, focus et conservation de l'URL améliorent cette base native.

## 7. Accord entre SSR et hydratation

La page valide la langue et compose LandingPage avec le dictionnaire en props. Serveur et client utilisent le même JSX. RichText interprète seulement les balises prévues et n’injecte pas de HTML libre. Les layouts racines des groupes de routes fixent lang et dir côté serveur.

## 8. Cycle de vie des animations

`use-demo-scene.ts` combine visibilité, état de l’onglet, préférence de mouvement réduit et pause. Les animations CSS conservent leur position. Three.js s’arrête hors écran et libère les ressources GPU au démontage ; voir [Architecture](../architecture/).

## 9. SEO lié à la livraison

Canonical, alternates et partage sont rendus puis actualisés après navigation documentaire. L'arabe générique ne reçoit pas une région Open Graph inventée.

## 10. Cache correct

`website-metadata.ts` utilise l’API Metadata de Next.js avec `SITE_URL` ou l’origine de la requête de prévisualisation. Aucune région n’est attribuée arbitrairement à l’arabe. Le cache des articles VitePress distingue les origines et les articles, conserve au plus 128 entrées pendant cinq minutes et retire les rendus en échec. Un ETag faible correspondant produit une réponse `304` sans corps.

## 11. Intégrité des ressources

Versionnez les composants, hooks, CSS, Markdown et ressources statiques. `pnpm build` produit le JavaScript et le CSS ; `.next` et `public/docs` restent hors du suivi Git. Les contrôles fondés sur `tests/fixtures/assets.json` vérifient l’intégrité des ressources et empêchent la réintroduction de HTML ou de code d’exécution capturés.

## 12. Vérifications adaptées aux risques

Oxlint/Oxfmt, contrôles de langues et ressources, Playwright, axe et Lighthouse vérifient des propriétés différentes. Leur intérêt vient du défaut couvert, pas du nombre d'outils.

## Limites observables

Maintenir le code source des composants facilite sa lecture, mais ne prouve pas la fidélité visuelle, toutes les interactions ni les performances mobiles. Les rapports historiques décrivent l’ancien système. Traduction, focus et texte bidirectionnel nécessitent une revue humaine.

## Mesurer les performances

Les décorations attendent les polices et l’entrée du premier écran, puis un rafraîchissement de l’affichage et une tâche exécutée pendant un temps libre du navigateur. La branche flow-map à influence toujours nulle est supprimée sans modifier le résultat. Le compteur de trames est réservé au profilage explicite. Pause hors écran et en arrière-plan, 30fps, réduction des mouvements et libération GPU sont conservées. Mesurez Node et Pages séparément, avec plusieurs essais et de vrais appareils.

- `src/components/graphics/schedule-scene.ts`, `fluid-shaders.ts`
- `src/components/graphics/particle-field.tsx`, `tile-scene.ts`
- `tests/tools/audit-performance.mjs`, `tests/fixtures/performance-budgets.json`
