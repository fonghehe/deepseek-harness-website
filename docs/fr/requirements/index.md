---
title: 'Exigences du site'
description: 'Vérifications de la mise en page, de la navigation, de l’accessibilité et du déploiement.'
---

# Exigences du site

Utilisez cette liste pour vérifier une modification ou préparer une publication. Choisissez les contrôles selon les fichiers et les comportements modifiés.

## Critères de revue

| Domaine      | Résultat attendu                                                   |
| ------------ | ------------------------------------------------------------------ |
| Contenu      | Sujet et action compris sans jouer toutes les animations           |
| Écran étroit | Longs labels, menus et commandes sans débordement                  |
| Interaction  | Liens après hydratation, focus clavier et détails sans JS          |
| Langues      | Toutes les éditions avec routes, direction et métadonnées alignées |
| SEO          | Article courant dans canonical et URL de partage après navigation  |
| HTTP         | Pas de mélange d'origine/langue ; réponse 304 sans corps           |

Vérifiez manuellement lecture, ponctuation mixte et traductions.

## Entrées à versionner

Versionnez les composants, hooks, CSS, Markdown et ressources statiques. `pnpm build` produit le JavaScript et le CSS ; `.next` et `public/docs` restent hors du suivi Git. Les contrôles fondés sur `tests/fixtures/assets.json` vérifient l’intégrité des ressources et empêchent la réintroduction de HTML ou de code d’exécution capturés.

`.next`, `public/docs`, caches, rapports et dépendances installées sont générés et ignorés. Les réglages partagés sont portables ; secrets et préférences personnelles restent locaux. Les règles d'indexation ne remplacent pas les permissions.

## Vérifier une modification

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
```

Construisez avant les tests navigateur et utilisez un port libre. Synchronisez descriptions et frontmatter des dix éditions. Un échec de hash demande une inspection, pas une mise à jour aveugle de checksum.

## Avant la livraison

Construisez les documents avant Next.js et incluez tout `public`. Réglez `SITE_URL`, inspectez l'entrée anglaise, les langues prises en charge, 404, sitemap, favicon, contrôles des démos et chunks dynamiques. Vérifiez les headers de cache adaptés à chaque catégorie. Distinguez résultats locaux, CI distante et validation sur le domaine publié.

## Budgets et entretien

Regardez payload, LCP, CLS et blocage ensemble. Le cache serveur n'élimine pas l'exécution cliente. Ne remplacez pas l'ancien baseline pour contourner un échec ; revoyez explicitement le budget de contenu d'un article agrandi. Lors d’une mise à jour des ressources ou des animations, vérifiez les composants et le CSS concernés, la provenance, les sommes de contrôle et les régressions fonctionnelles.

Suivez le [Parcours d’apprentissage](../learning/) pour mettre ces critères en pratique.

Seul le chinois affiche le QR WeChat ; les autres langues pointent vers https://x.com/deepseek_ai.

## Validation manuelle

Vérifiez le clavier, Escape et le retour du focus dans les menus, puis les annonces de copie avec un lecteur d’écran. Sur téléphone, examinez le défilement et les étapes animées. Répétez en arabe avec des libellés longs et du texte bidirectionnel. Notez appareil, navigateur, préférence de mouvement et preuves. La traduction nécessite une relecture par un locuteur natif.

```sh
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
SITE_URL=https://example.github.io/repository/ pnpm perf:pages
```
