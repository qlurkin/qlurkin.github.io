---
title: Projet 2026
subtitle: Tower Defense
---

## Description

On vous demande de réaliser un jeu de type **Tower Defense** en C# avec
**Avalonia UI**. Le joueur doit empêcher des vagues d'ennemis d'atteindre la
**base** du joueur, située au bout du chemin, en construisant et en améliorant
des tours défensives.

Le jeu permettra:

- de charger et d'afficher une **carte** composée de cases (chemin des ennemis,
  emplacements constructibles, point d'apparition des ennemis et base à
  défendre),
- de **construire**, **améliorer** et **revendre** des **tours** avec une
  économie (or gagné en éliminant des ennemis),
- d'avoir **au moins trois types de tours** aux comportements différents (par
  exemple: tir simple, dégâts de zone, ralentissement),
- d'avoir **au moins trois types d'ennemis** (par exemple: rapide, résistant,
  volant) avec des déplacements et résistances distincts,
- de gérer des **vagues** d'ennemis successives, à difficulté croissante,
  définies de façon **configurable** (fichier, pas codées en dur),
- de gérer les **points de vie** de la base (chaque ennemi qui l'atteint
  disparaît et lui inflige des dégâts selon son type), la **victoire** (toutes
  les vagues éliminées) et la **défaite** (base détruite),
- de proposer plusieurs **stratégies de ciblage** des tours (le plus proche, le
  plus faible, le plus avancé, …) modifiables en cours de partie,
- de **sauvegarder** les **meilleurs scores** de façon **persistante**,
- d'utiliser une **fonctionnalité supplémentaire** que vous pouvez choisir (par
  exemple: sorts du joueur, boss, éditeur de cartes, mode sans fin, effets de
  statut, etc.).

Le jeu tourne en **temps réel** via une boucle de jeu (game loop) qui met à jour
l'état du modèle, que l'interface se contente d'afficher. Vous veillerez à
**séparer clairement la logique du jeu de l'interface** (par exemple avec le
pattern MVVM): la logique doit pouvoir être testée sans Avalonia.

Enfin, vous souhaitez pouvoir **ajouter facilement** de nouveaux types de tours,
d'ennemis, d'effets ou de cartes, **sans modifier le code existant**.

### Aide pour Avalonia

Aucune connaissance avancée n'est requise. Un affichage simple suffit (`Canvas`,
`Grid` ou `ItemsControl` avec des formes et images basiques) et une boucle de
jeu basée sur un `DispatcherTimer`. La qualité graphique n'est pas évaluée.

## Contraintes techniques

- Utilisation justifiée d'au moins **deux design patterns**.
- Respect des principes **SOLID**.

## Délivrable

**Dans un dépôt GitHub** vous remettrez:

- **Un projet C# Avalonia UI** correspondant à la description ci-dessus, avec un
  `README` expliquant comment lancer le jeu.

- Un **Rapport** comprenant :
  - une introduction avec une mise en contexte du projet,
  - une description de la fonctionnalité supplémentaire choisie,
  - un diagramme de classes,
  - un diagramme de séquences,
  - un diagramme d'activité,
  - une description (avec justifications) d'au moins **deux design patterns**
    utilisés et des problèmes qu'ils résolvent,
  - une description (avec justifications) d'au moins **deux principes SOLID**
    utilisés dans le projet,
  - une démonstration de l'extensibilité: comment ajouter un nouveau type de
    tour ou d'ennemi,
  - une conclusion.

  Le rapport sera inclus dans le dépôt GitHub au format **Markdown**.

Les liens de vos dépôts sont à remettre pour le **18 décembre 2026** dans un
fichier Excel partagé sur le groupe Teams du cours. Tous les commits ultérieurs
seront ignorés.

Le projet est à faire en **binôme**.

## Grille d'évaluation

- Carte, affichage et boucle de jeu: 2 points
- Tours (construction, amélioration, revente, types, ciblage): 3 points
- Ennemis et vagues configurables: 3 points
- victoire/défaite: 1 point
- Sauvegarde et meilleurs scores: 1 point
- Pertinence de l'historique Git: 2 points
- Extensibilité et usage des design patterns: 3 points
- Rapport: 5 points
