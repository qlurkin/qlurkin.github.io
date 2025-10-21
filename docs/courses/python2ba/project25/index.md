---
title: Projet 2025
subtitle: Gorilla
typst: true
---

## Introduction

<iframe width="560" height="315" style="margin: 1rem auto; display: block" src="https://www.youtube.com/embed/1l7QpcxiXZw?si=VQZ5ydaRoVXjyrbI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

QBasic Gorilla (ou Gorillas.bas) est un petit jeu vidéo créé en 1991 par
Microsoft pour démontrer les capacités du langage de programmation QBasic, livré
avec MS-DOS 5.0.

Dans ce jeu en 2D, deux gorilles se tiennent sur les toits d’immeubles dans une
ville. Le but est de lancer des bananes explosives pour toucher le gorille
adverse. Le joueur doit choisir l'angle et la vitesse du lancer, tout en tenant
compte de la gravité et du vent, qui influencent la trajectoire du projectile.

## Cahier des charges

Vous devez écrire un programme en utilisant **les bibliothèques `pygame` et
`pygame_gui`** qui implémente le jeu Gorilla.

Votre programme devra:

- Afficher des immeubles de hauteurs aléatoires (module `random`) _(2 points)_
- Permettre d'entrer un angle et une vitesse initiale pour un projectile _(2
  point)_
- Simuler la trajectoire du projectile sous l'influence de la gravité _(3
  points)_
- Simuler l'effet du vent sur les projectiles _(2 points)_
- Détecter les collisions entre le projectile et les immeubles / gorilles _(3
  points)_
- Répercuter les dégâts des explosions sur les immeubles _(3 points)_
- Permettre d'enchainer plusieurs rounds et d'attribuer la victoire après 2
  rounds gagnants _(3 points)_
- Permettre aux joueurs de choisir un pseudo pour enregistrer leurs scores à la
  fin de la partie. Les scores seront enregistrés dans un fichier JSON _(3
  points)_
- Avoir un visuel particulièrement soigné _(1 point)_

## Évaluation

Les projets sont à réaliser seul ou à deux pour la 8<sup>ème</sup> séance de
labo. Durant cette séance, vous serez interrogés sur votre code. Le but de cette
défense est d’identifier votre niveau de maîtrise de ce code. Le niveau de
maîtrise est coté sur 1 et la note finale est calculée comme suit
$$n_"f" = n_"m" dot min(n_"cdc", 20)$$ où $n_"f"$ est la note finale, $n_"m"$
est la note de maîtrise du code et $n_"cdc"$ est la note obtenue sur base du
cahier des charges.

Pour les groupes de deux, chaque membre pourra avoir une note de maîtrise
différente. De plus, chaque membre devra maîtriser **l'ensemble du code**.

Il est conseillé de **ne pas** faire appel à ChatGPT ou à un de ses concurrents.

Si un plagiat manifeste est constaté entre projets, tous les étudiants impliqués
seront sanctionnés d'une note nulle.

## Simulation

Nous avons déjà vu ensemble que pour animer un objet, il suffit de changer sa
position d'une image à l'autre.
$$accent(x, arrow) arrow.l accent(x, arrow) + Delta t dot.op accent(v, arrow)_"proj"$$

Ici on $accent(x, arrow)$ est une position $(x, y)$ en pixels et
$accent(v, arrow)_"proj"$ et la vitesse $(v_x, v_y)$ du projectile en
pixels/seconde. $Delta t$ est le temps écoulé depuis le dernier affichage. En
`pygame`, on obtient $Delta t$ par la `pygame.Clock`.

La gravité est une accélération. C'est-à-dire une variation de la vitesse d'une
image à l'autre
$$accent(v, arrow)_"proj" arrow.l accent(v, arrow)_"proj" + Delta t dot.op accent(g, arrow)$$
où $accent(g, arrow)$ est l'accélération de la gravité en
pixels/seconde<sup>2</sup>.

Pour simuler le vent, il faut simuler les frottements de l'air. Dynamiquement,
les frottements se manifestent sous forme d'une accélération opposée à la
vitesse du projectile par rapport à l'air. Dans les cas simples (vitesses pas
trop élevées) cette est linéairement proportionnelle à la vitesse.
$$accent(a, arrow)_"frot" arrow.l -k dot.op accent(v, arrow)_"air"$$ où
$accent(v, arrow)_"air"$ est la vitesse du mobile par rapport à l'air. Quand il
n'y a pas de vent, cette vitesse est simplement égale à la vitesse du
projectile. Mais en présence de vent
$$accent(v, arrow)_"air" arrow.l accent(v, arrow)_"proj" -  accent(v, arrow)_"vent"$$

l'accélération totale que subit le projectile est la somme de l'accélération de
la gravité et de l'accélération des frottements de l'air.

## Remarque

En `pygame` nous avons l'habitude de dessiner sur la surface de l'écran que nous
obtenons avec

```python
screen = pygame.display.set_mode((800, 600))
```

où `screen` est de type `pygame.Surface`.

Dans ce projet, il pourrait vous être utile de créer d'autres surfaces pour y
faire des dessins intermédiaires (les buildings par exemple).

```python
# création d'une surface de taille (w, h)
surface = pygame.Surface((w, h))
```

Il est ensuite possible de dessiner sur cette surface de la même façon que l'on
dessine sur le `screen`.

Pour dessiner une `surface1` sur une `surface2` on utilise la méthode `blit()`:

```python
surface2.blit(surface1, (x, y))
```

où `(x, y)` sera la position du coin supérieur gauche de la `surface1` dans la
`surface2`.

Sachez aussi qu'il est possible de récupérer la couleur d'un pixel d'une surface
avec la méthode `get_at()`:

```python
color = surface.get_at((x, y))
```

où `(x, y)` sont les coordonnées du pixel. Cette méthode pourrait être utilisée
pour détecter les collisions entre vos projectile et les buildings qui seraient
dessinés dans la surface.

La documentation propre aux `pygame.Surface` se trouve sur:

- <https://pyga.me/docs/ref/surface.html>
