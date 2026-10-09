---
title: 'Architecture'
description: 'Composants React, routes Next.js, animations et diffusion avec VitePress.'
---

# Architecture

Le site est construit à partir des composants React, hooks et CSS maintenus dans ce dépôt. Next.js assure le rendu serveur (SSR) et l’hydratation. Le site ne charge ni HTML capturé ni application compilée provenant du site original. Les éléments de marque, polices, icônes de fichiers et QR WeChat sont utilisés comme ressources statiques.

## Répertoires des composants

Le point d’entrée reste `landing-page.tsx`. Les composants sont regroupés par responsabilité : mise en page, commandes, démonstrations et GPU. `previews/` réunit le JSX des illustrations, leurs requêtes de conteneur et leurs chronologies ; `graphics/` regroupe les moteurs de rendu, la géométrie et les shaders. Les aides textuelles restent dans `shared/` et le hook de lecture commun dans `src/hooks/use-demo-scene.ts`. Les imports désignent directement les modules, sans fichier central de réexport, pour rendre visibles les frontières serveur/client et le chargement différé du GPU.

```text
src/components/
├── landing-page.tsx    # Composition de la page
├── layout/             # En-tête, pied de page et marque
├── controls/           # Langue, téléchargement, copie et contact
├── sections/           # Sections de démonstration et cartes détaillées
├── previews/           # Cinq illustrations et leurs chronologies CSS
├── motion/             # Entrées, perspective et animation CTA
├── graphics/           # Scènes Three.js, shaders et géométrie
├── shared/             # Titres et texte enrichi
└── styles/             # Variables de style, responsive et RTL
```

## Composition des composants

```text
page.tsx → locale + dictionary → LandingPage → Next.js SSR
layout.tsx → html lang / dir
browser → generated chunks → client events / demo state
/docs/ → /docs/en/ → VitePress article
```

| Composant                               | Source                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| En-tête, langue et téléchargements      | `layout/header.tsx`, `controls/locale-menu.tsx`, `controls/download-menu.tsx`   |
| Aperçu de bureau du premier écran       | `previews/desktop-preview.tsx`                                                  |
| Quatre scènes interactives              | `sections/capability-demos.tsx`, `use-demo-scene.ts`                            |
| Cartes détaillées avec contrôles natifs | `sections/feature-section.tsx`                                                  |
| Presse-papiers, Canvas et contact       | `controls/copy-command.tsx`, `graphics/particle-field.tsx`, `layout/footer.tsx` |
| Styles et métadonnées                   | `styles/harness.css`, `website-metadata.ts`                                     |

## SSR et langues

La page valide la langue et compose LandingPage avec le dictionnaire en props. Serveur et client utilisent le même JSX. RichText interprète seulement les balises prévues et n’injecte pas de HTML libre. Les layouts racines des groupes de routes fixent lang et dir côté serveur.

## Horloge des démonstrations

`use-demo-scene` combine visibilité, premier plan, mouvement réduit et pause. CSS `animation-play-state` conserve la position sans rendu React par image ; workflow change de scénario à chaque cycle.

## Cycle du Canvas

`ParticleField` charge les scènes Three.js uniquement lorsqu’elles sont visibles et au premier plan. `RawShaderMaterial` conserve le GLSL fluide et les couleurs du projet ; `InstancedBufferGeometry` dessine les tuiles en une opération instanciée. `compileAsync` prépare les programmes en parallèle lorsque disponible. Le rendu est limité à 30fps et aux pixels CSS, arrêté hors écran ou en arrière-plan, et omis avec le mouvement réduit. Le nettoyage libère géométries, matériaux, textures et renderer.

Framer Motion gère les ressorts de navigation, les entrées et la perspective au défilement sans rendu React à chaque image. Les quatre démonstrations conservent leurs timelines CSS de 22s, 17,5s, 11s et 15s, leur mise à l’échelle et leur position de pause.

## Livraison documentaire

VitePress/Vue produit public/docs ; Next.js livre les articles sur la même origine. Développement et aperçu autonomes ouvrent aussi l’anglais. Le thème Vue actualise direction et SEO après navigation, supprime les anciens nœuds et annule les mises à jour périmées.

## SEO et cache des articles

`website-metadata.ts` utilise l’API Metadata de Next.js avec `SITE_URL` ou l’origine de la requête de prévisualisation. Aucune région n’est attribuée arbitrairement à l’arabe. Le cache des articles VitePress distingue les origines et les articles, conserve au plus 128 entrées pendant cinq minutes et retire les rendus en échec. Un ETag faible correspondant produit une réponse `304` sans corps.

## Entrées et génération

Versionnez les composants, hooks, CSS, Markdown et ressources statiques. `pnpm build` produit le JavaScript et le CSS ; `.next` et `public/docs` restent hors du suivi Git. Les contrôles fondés sur `tests/fixtures/assets.json` vérifient l’intégrité des ressources et empêchent la réintroduction de HTML ou de code d’exécution capturés.

Seul le chinois affiche le QR WeChat ; les autres langues pointent vers https://x.com/deepseek_ai.

Maintenir le code source des composants facilite sa lecture, mais ne prouve pas la fidélité visuelle, toutes les interactions ni les performances mobiles. Les rapports historiques décrivent l’ancien système. Traduction, focus et texte bidirectionnel nécessitent une revue humaine.

L’édition principale anglaise développe ces sujets. [English](../../en/architecture/)

## Publication du site

GitHub Pages publie le site et toute la documentation comme fichiers statiques. `pnpm build:pages` utilise l’URL réelle et le préfixe du dépôt ; `pnpm check:pages` vérifie les liens locaux et le SEO. Le serveur Next.js reste disponible. L’origine par requête, les en-têtes de cache applicatifs et les ETag conditionnels appartiennent au mode serveur ; Pages fixe les métadonnées à la compilation. Consultez `DEVELOPMENT.md` pour publier.

## Frontières de rendu et de déploiement

Les illustrations statiques des fichiers et des traces sont rendues sur le serveur. Les commandes de lecture et le workflow à scénarios restent côté client. Le grand arbre SVG des plugins conserve une frontière client pour limiter la sérialisation HTML/RSC. Comparez le HTML et les scripts avant de déplacer une frontière.

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
