---
title: Projet 2024
subtitle: Démineur
typst: true
---

## Introduction

<iframe width="560" height="315" style="margin: 1rem auto; display: block" src="https://www.youtube.com/embed/2kxM87neXRw?si=ZLcSAhBGnQgjEdUv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Le Démineur est un jeu de logique classique qui met à l’épreuve votre capacité à résoudre des énigmes sous pression. L'objectif est de découvrir toutes les cases d’une grille sans déclencher les mines cachées. Chaque case que vous révélez vous indique le nombre de mines présentes dans les cases adjacentes, vous aidant ainsi à déduire où elles se trouvent. C'est un jeu qui allie réflexion et stratégie, où chaque choix peut être décisif. Que vous soyez un novice ou un expert, Démineur offre une expérience captivante à chaque partie, idéale pour tester vos talents d'observation et de déduction.

## Cahier des charges

Vous devez écrire un programme en utilisant **les bibliothèques `pygame` et `pygame_gui`** qui
implémente le jeu du démineur.

Votre programme devra:

- Afficher une grille _(1 point)_
- Placer des bombes aléatoirement (module `random`) _(2 points)_
- Détecter les cases cliquées _(2 points)_
- Afficher correctement le nombre de bombes voisines _(2 points)_
- Dévoiler automatiquement les zones de `0` _(2 points)_
- Permettre de placer et d'enlever des drapeaux _(2 points)_
- Afficher un chronomètre qui mesure la durée de la partie _(2 points)_
- Mettre fin à la partie quand toutes les cases sont dévoilées ou que vous avez fait exploser une bombe _(2 points)_
- Permettre de choisir un pseudo pour enregistrer son temps à la fin de la partie. Les temps seront enregistrés dans un fichier JSON _(3 points)_
- Afficher le meilleur temps enregistré _(2 points)_
- Permettre de choisir entre plusieurs tailles de grilles et plusieurs densités de bombes _(2 points)_
- Avoir un visuel particulièrement soigné _(1 point)_

Le tout est noté sur 20 points. Si vous obtenez plus que 20 points, votre note sera majorée à 20/20.

## Évaluation

Les projets sont à réaliser seul ou à deux pour la 8<sup>ème</sup> séance de labo. Durant cette séance, vous serez interrogés sur votre code. Le but de cette défense est d’identifier votre niveau de maîtrise de ce code. Le niveau de maîtrise est coté sur 1 et la note finale est calculée comme suit $$n_"f" = n_"m" dot min(n_"cdc", 20)$$ où $n_"f"$ est la note finale, $n_"m"$ est la note de maîtrise du code et $n_"cdc"$ est la note obtenue sur base du cahier des charges.

Pour les groupes de deux, chaque membre pourra avoir une note de maîtrise différente. De plus, chaque membre devra maîtriser **l'ensemble du code**.

Il est conseillé de **ne pas** faire appel à ChatGPT ou à un de ses concurrents.

Si un plagiat manifeste est constaté entre projets, tous les étudiants impliqués seront sanctionnés d’une note nulle.

## Remarque

- Les boutons `pygame_gui` ne réagissent pas aux clique droit par défaut. Pour activer le clique droit il faut les créer comme suit:

  ```python
  button = UIButton(
    relative_rect=pygame.Rect(
        button_x,
        button_y,
        button_width,
        button_height,
    ),
    text="Button Text",
    manager=manager,
    generate_click_events_from={
        pygame.BUTTON_LEFT,
        pygame.BUTTON_RIGHT,
    }
  )
  ```
