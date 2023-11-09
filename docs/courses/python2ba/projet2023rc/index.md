---
title: Projet 2023
subtitle: Asteroïd
typst: true
---

## Introduction

<iframe width="560" height="315" style="margin: 1rem auto; display: block" src="https://www.youtube.com/embed/ODLJqtMrhAs?si=A5eqtGl-rXKdIqus" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Le jeu *Asteroïd* vous met au commande d'un vaisseau dans l'espace au milieu d'un champ d'astéroïdes. Vous devez détruire les astéroïdes avec votre canon. Le canon a une cadence de tir limitée.

Lorsqu'on touche un astéroïde avec un obus de canon, il se divise en 2 astéroïdes plus petits jusqu'à ce qu'ils soient trop petits pour se diviser d'avantage.

Vous pouvez tourner sur vous même et avancer en utilisant votre moteur. Votre moteur vous donne une poussée vers l'avant. Comme vous êtes dans l'espace, tous les objets restent en mouvement rectiligne uniforme. l'attraction gravitationnelle entre les objets est négligeable.

Vous êtes coincé dans une boucle spatiale. L'espace dans lequel vous vous trouvez boucle sur lui-même et lorsqu'un objet sort de l'écran il apparait de l'autre côté.

Les collisions entre astéroïdes ne sont pas simulées. Vous perdez si vous entrez en collision avec un astéroïde.

## Cahier des charges

Vous devez écrire un programme en utilisant **les bibliothèques pygame et pygame_gui** qui
implémente le jeu *Asteroïd*.

Votre programme devra:

- Afficher et commander le vaisseau. *(3 points)*
- Afficher les astéroïdes en mouvement et les placer aléatoirement. *(2 points)*
- Faire tirer le vaisseau en respectant une cadence maximale. *(3 points)*
- Diviser les astéroïdes qui sont touchés par un obus de canon. *(3 points)*
- Tenir compte du score. On gagne 50 points à chaque fois qu'on touche un astéroïde et on perd un point à chaque obus tiré. *(2 points)*
- Mettre fin à la partie quand le vaisseau heurte un astéroïde ou qu'il n'y a plus d'astéroïde. *(2 points)*
- Permettre de choisir un pseudo pour enregistrer son score à la fin de la partie. Les scores seront enregistrés dans un fichier JSON. *(3 points)*
- Gérer les bords de l'écran. Si un objet traverse un bord, il doit apparaître sur le bord opposé. *(2 points)*
- Ajouter des niveaux. A chaque fois qu'on finit de détruire les astéroïdes, on passe au niveau suivant avec un astéroïde de plus. *(3 points)*
- Utiliser au moins deux classes. *(2 points)*
- Avoir un visuel particulièrement soigné. *(1 point)*

Le tout est noté sur 20 points. Si vous obtenez plus que 20 points, votre note sera majorée à 20/20.

## Evaluation

Les projets sont à réaliser seul ou à deux pour la 8<sup>ème</sup> séance de labo. Durant cette séance, vous serez interrogés sur votre code. Le but de cette défense est d’identifier votre niveau de maîtrise de ce code. Le niveau de maîtrise est coté sur 1 et la note finale est calculée comme suit $$ n_"f" = n_"m" times min(n_"cdc", 20) $$ où $$n_"f"$$ est la note finale, $$n_"m"$$ est la note de maîtrise du code et $$n_"cdc"$$ est la note obtenue sur base du cahier des charges.

Pour les groupes de deux, chaque membre pourra avoir une note de maîtrise différente. De plus, chaque membre devra maîtriser **l'ensemble du code**.

Si un plagiat manifeste est constaté entre projets, tous les étudiants impliqués seront sanctionnés d’une note nulle.


