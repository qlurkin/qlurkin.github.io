---
title: Projet 2026
subtitle: Frogger
typst: true
---

## Introduction

<iframe width="560" height="315" style="margin: 1rem auto; display: block" src="https://www.youtube.com/embed/WNrz9_Fe-Us" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Frogger est un jeu vidéo d'arcade développé par Konami et sorti en 1981.

Le but du jeu est de diriger des grenouilles jusqu'à leurs maisons. Pour cela,
le grenouille doit d'abord traverser une route en évitant des voitures qui
roulent à différentes vitesses puis une rivière aux courants changeants en
passant d'objets en objets. La grenouille meurt si elle touche une voiture, si
elle tombe dans la rivière, si elle sort de l'écran, si elle atteint la dernière
ligne sans arriver dans une maison libre ou si le temps limite est atteint.

## Cahier des charges

Vous devez écrire un programme en utilisant **les bibliothèques `pygame` et
`pygame_gui`** qui implémente le jeu Frogger.

Votre programme devra:

- Afficher des véhicules et des radeaux à des positions et des vitesses
  aléatoires (module `random`) _(3 points)_
- Permettre de faire sauter (animation !) la grenouille dans les 4 directions
  _(3 point)_
- Permettre à la grenouille d'embarquer sur les radeaux _(3 points)_
- Faire perdre une vie lorsque la grenouille:
  - entre en collision avec une voiture _(1 points)_
  - tombe dans l'eau _(1 points)_
  - sort de l'écran _(1 points)_
  - atteint la dernière ligne sans arriver dans une maison libre _(1 points)_
  - dépasse la limite de temps _(1 points)_
- D'afficher un écran de _Game Over_ quand le joueur à perdu sa dernière vie _(1
  points)_
- Permettre de redémarrer une partie à la fin de la partie en cours _(2 points)_
- Permettre d'encoder son pseudo pour sauver son score en fin de partie. Les
  scores doivent être sauvés dans un fichier pour pouvoir afficher un tableau
  des meilleurs scores. Le score est calculé comme suit: 10 points par saut vers
  l'avant, 50 points par grenouille sauvée dans une maison, 1000 points si 5
  grenouilles sauvées 10 points par seconde non utilisée. _(2points)_
- Avoir un visuel particulièrement soigné _(1 point)_

## Évaluation

Les projets sont à réaliser seul ou à deux pour la 8<sup>ème</sup> séance de
labo. Durant cette séance, vous serez interrogés sur votre code. Le but de cette
défense est d’identifier votre niveau de maîtrise de ce code. Le niveau de
maîtrise est coté sur 1 et la note finale est calculée comme suit
$$n_"f" = n_"m" dot n_"cdc"$$ où $n_"f"$ est la note finale, $n_"m"$ est la note
de maîtrise du code et $n_"cdc"$ est la note obtenue sur base du cahier des
charges.

Pour les groupes de deux, chaque membre pourra avoir une note de maîtrise
différente. De plus, chaque membre devra maîtriser **l'ensemble du code**.

Il est conseillé de **ne pas** faire appel à ChatGPT ou à un de ses concurrents.

Si un plagiat manifeste est constaté entre projets, tous les étudiants impliqués
seront sanctionnés d'une note nulle.

## Remarques

- Un code avec des commentaires à chaque ligne n'est **pas** un code valable.
  Les commentaires servent à décrire l'**intention** d'une portions de code, pas
  à réécrire le programme en français.

- Vous devez être capable d'expliquer ce que font les fonctions de `pygame` et
  `pygame_gui` que vous utilisez, même (et surtout) celles qui n'ont pas été
  vues au cours.
