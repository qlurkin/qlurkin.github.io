---
title: "Chapitre 4"
subtitle: "Programmation graphique"
---

<script type="module" defer>
Doc.setChapterNb(4)
</script>

Jusqu'à présent, nous toujours présenté nos résultats à l'utilisateur en affichant des chaines de caractères avec le fonction `print()`. Il est maintenant temps d'aller plus loin et de commencer à créer des applications graphiques. On entend par applications graphiques, des applications qui s'ouvriront dans une fenêtre et qui pourront recevoir les événements (clavier, souris, ...). Les fenêtres et les événements sont gérés par le système d'exploitation. Il faudra donc interagir avec l'OS pour réaliser ce genre d'application.

## Bibliothèque

Comme vous le savez peut-être python est un langage extrêmement populaire. Cela est du en partie au fait que Python est assez facile à apprendre mais aussi au fait qu'il existe énormément de bibliothèque pour Python.

Une bibliothèque est un ensemble de fonctionnalité que l'on peut installer en plus de l'installation de base de Python. Ces bibliothèques peuvent être créée par n'importe qui. Il existe plusieurs moyen de les rendre disponible au monde entier mais le plus courant est dépôt de paquets [PyPI](https://pypi.org).

Nous n'allons pas apprendre ici à créer et publier des paquets mais nous allons devoir en installer un. En effet, nous allons créer nos application graphique grâce à la bibliothèque [Pygame](https://www.pygame.org). Pygame à l'avantage d'être facile à utiliser. De plus, c'est une librairie de bas niveau qui permet de bien comprendre ce qu'il se passe dans une application graphique.

### Installation

Pour installer une bibliothèque provenant de PyPI, on utilise le module `pip` *(Pip Install Package)* de Python. Cela veut dire que nous allons utiliser l'interpréteur Python pour installer la bibliothèque. Comme toujours, l'interpréteur s'utilise en ligne de commande et nous allons donc taper la commande suivante pour installer Pygame&nbsp;:

<div class="terminal">
> python -m pip install pygame
</div>

Une fois que vous validerez la commande, vous verrez que le téléchargement de Pygame commence.

Lorsque Pygame est installer il est possible de l'importer dans vos programme&nbsp;:

```python
import pygame
```

## Premier programme graphique

Voici le code d'un programme simple utilisant Pygame&nbsp;:

```python
import pygame

# initialisation de pygame
pygame.init()

# demande une fenêtre de 800x600 pixels
screen = pygame.display.set_mode([800, 600])

# boucle jusqu'à ce qu'on quitte
while not pygame.event.peek(pygame.QUIT):

    # dessine un cercle rouge centré en (100, 300) de
    # rayon 20 dans le tampon caché
    pygame.draw.circle(screen, [255, 0, 0], [100, 300], 20)

    # échange les tampons
    pygame.display.flip()
```

Nous pouvons voir dans ce programme que toutes les fonctionnalités de Pygame sont accessibles en tapant "`pygame.`". On dit que `pygame` est un **espace de noms**. Les espaces de nom permettent aux différentes bibliothèques d'utiliser les mêmes noms de fonctions sans qu'il y ait de conflits entre elles.

Un autre élément important dans le programme ci-dessus est qu'il se compose essentiellement d'une boucle `while`. Les programmes en ligne de commande que nous avons réalisés jusqu'à présent, quittaient immédiatement après avoir afficher leurs résultats. Les applications graphiques ne se comportent généralement pas comme ça. Elle **continue de tourner** tant qu'on ne ferme pas la fenêtre. Le `while` qui est ici tourne tant que l'application ne reçoit pas **l'événement `QUIT`**. Cette boucle garde donc le programme en exécution. L'événement `QUIT` peut être déclencher de plusieurs façons. L'une d'entre elles est de fermer la fenêtre de l'application. 

Avant de démarrer la boucle, on peut voir qu'il est nécessaire d'initialiser Pygame et de demander **au système d'exploitation** d'ouvrir une fenêtre.

Pour bien comprendre ce qu'il se passe dans la boucle, il faut savoir que chaque fenêtre contient au moins **deux tampons de dessin**. L'un d'eux est utiliser par la carte graphique de l'ordinateur pour afficher le contenu de la fenêtre à l'écran. Si on dessine sur ce tampon, le résultat est directement visible à l'écran. Cela peut poser problème car le dessin de l'interface d'un programme ne se fait pas instantanément et les étapes intermédiaires du dessin peuvent être visibles. C'est pour palier à ce problème qu'il existe un deuxième tampon de dessin qui est caché. L'idée est de faire le dessin de l'application sur le tampon caché et l'**échanger** avec l'autre que au moment où le dessin est terminé. Dans la boucle, nous faisons donc deux choses&nbsp;: nous dessinons un cercle rouge dans le tampon caché de la fenêtre puis nous échangeons les tampons.

## Animations

Le programme que venons de réaliser redessine le cercle rouge à chaque tour de boucle exactement au même endroit. On a donc l'impression que rien ne se passe dans notre application. Nous pourrions essayer de changer la position du cercle à chaque fois qu'on le dessine. Cela permettrait de donner l'impression que le cercle bouge.


```python
import pygame

# initialisation de pygame
pygame.init()

# demande une fenêtre de 800x600 pixels
screen = pygame.display.set_mode([800, 600])

xCircle = 100

# boucle jusqu'à ce qu'on quitte
while not pygame.event.peek(pygame.QUIT):

    # dessine un rectangle noir pour effacer l'image
    pygame.draw.rect(screen, [0, 0, 0], pygame.Rect(0, 0, 800, 600))

    # dessine un cercle rouge centré en (xCircle, 300) de rayon 20
    pygame.draw.circle(screen, [255, 0, 0], [xCircle, 300], 20)
    
    # déplace le cercle
    xCircle += 1

    # affiche l'image qui vient d'être dessinée
    pygame.display.flip()
```

Dans ce code nous avons créer une variable `xCircle` qui servira pour l'abscisse du centre du cercle et nous modifions sa valeur à chaque tour de boucle. Vous pouvez aussi voir qu'avant de dessiner le cercle, nous effaçons le tampon. Si nous ne le faisions pas, nous verrions toujours les cercles dessinés aux tours de boucle précédents.

En fonction de votre ordinateur, il est possible que l'animation du cercle soie trop rapide. En effet dans son état actuel, la boucle `while` peut faire plusieurs centaines de tours par seconde. Sachant que la plupart des écrans ne se rafraichissent que 60 fois par seconde, c'est complètement inutile. Nous allons donc utiliser une `Clock` de Pygame pour temporiser notre boucle `while`.

```python
import pygame

# initialisation de pygame
pygame.init()

# demande une fenêtre de 800x600 pixels
screen = pygame.display.set_mode([800, 600])

xCircle = 100

# la clock sert à limiter le nombre d'images par seconde
clock = pygame.time.Clock()

# boucle jusqu'à ce qu'on quitte
while not pygame.event.peek(pygame.QUIT):

    # attends qu'il se soit passé au moins 1/60
	# de seconde depuis le dernier tick
	clock.tick(60)

    # dessine un rectangle noir pour effacer l'image
    pygame.draw.rect(screen, [0, 0, 0], pygame.Rect(0, 0, 800, 600))

    # dessine un cercle rouge centré en (xCircle, 300) de rayon 20
    pygame.draw.circle(screen, [255, 0, 0], [xCircle, 300], 20)
    
    # déplace le cercle
    xCircle += 1

    # affiche l'image qui vient d'être dessinée
    pygame.display.flip()
```

L'instruction `pygame.time.Clock()` crée une valeur de type `Clock`. Si type de valeur a été créé par la bibliothèque Pygame. Remarquez que la valeur de type `Clock` est sauvegardée dans une variable nommée `clock` *(avec un c minuscule)*. Il s'agit là d'une pratique assez courante en programmation. Une fois crée, la `clock` nous fourni la fonctionnalité `tick` qui nous permet de temporiser le programme.

La vitesse du cercle devrait maintenant être raisonnable et identique d'un ordinateur à l'autre.

## Événements
