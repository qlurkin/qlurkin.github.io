---
title: Projet 2022 - Python is a Big Snake !
---

## Introduction

<iframe style="margin: 2em auto; display: block;" width="560" height="315" src="https://www.youtube.com/embed/728XABNRcb8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Le jeu Snake se déroule sur une grille en deux dimensions. La tête du serpent avance
en permanence et le joueur peut changer sa direction en utilisant les flèches du clavier.
Le corps du serpent suit sa tête et s'allonge à chaque fois qu'il mange quelque chose.

Durant le jeu, de la nourriture fraîche apparaît sur la grille et le serpent gagne 1 point
à chaque fois qu'il en mange. Si la nourriture reste trop longtemps elle devient pourrie. Si
le serpent mange une nourriture pourrie, son corps grandit mais il ne gagne pas de point.
Comme son corps grandit à chaque fois qu'il avale quelque chose, il a de moins en moins de place
pour se déplacer. Le jeu s'arrête quand le serpent mange son propre corps.


## Cahier des charges

Vous devez écrire un programme en utilisant **les bibliothèques pygame et pygame_gui** qui
implémente le jeu du serpent.

Votre programme devra:

- Afficher le serpent qui avance. *(3 points)*
- Faire apparaître de la nourriture aléatoirement. *(2 points)*
- Faire grandir le serpent quand il mange. *(2 points)*
- Faire pourrir la nourriture après un certain temps. *(2 points)*
- Incrémenter le score quand le serpent mange une nourriture fraîche. *(2 points)*
- Mettre fin à la partie si le serpent mange son propre corps. *(2 points)*
- Permettre de choisir un pseudo pour enregistrer son score à la fin de la partie. Les scores seront enregistrés dans un fichier JSON. *(3 points)*
- Gérer les bords de la grille. Si le serpent traverse un bord, il doit apparaître sur le bord opposé. *(2 points)*
- Utiliser au moins deux classes. *(2 points)*
- Permettre de choisir la taille de la grille. *(1 point)*
- Avoir un visuel particulièrement soigné. *(1 point)*

Le tout est noté sur 20 points. Si vous obtenez plus que 20 points, votre note sera majorée à 20/20.

## Evaluation

Les projets sont à réaliser seul ou à deux pour la 8e séance de labo. Durant cette séance, vous serez interrogés sur votre code. Le but de cette défense est d’identifier votre niveau de maîtrise de ce code. Le niveau de maîtrise est coté sur 1 et la note finale est calculée comme suit $$ n_f = n_m \times min(n_{cdc}, 20) $$ où $n_f$ est la note finale, $n_m$ est la note de maîtrise du code et $n_{cdc}$ est la note obtenue sur base du cahier des charges.

Pour les groupes de deux, chaque membre pourra avoir une note de maîtrise différente. De plus, chaque membre devra maîtriser l’ensemble du code.

Si un plagiat manifeste est constaté entre projets, tous les étudiants impliqués seront sanctionnés d’une note nulle.


