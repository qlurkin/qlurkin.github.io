---
title: Cours 3
subtitle: Interface graphique
type: deck
author: Quentin Lurkin
typst: true
---

## Rappel: programmation graphique

- Ouvre une **fenêtre** de l\'OS
- Tourne **jusqu\'à ce qu\'on quitte** [boucle !]{.small}
- Permet d\'afficher des formes, images, animation [Une animation est
  une succession rapide d\'images]{.small}

## Pygame

- Permet de créer un programme graphique
- Non-inclus dans l\'installation de Python [Il faut installer le
  package]{.small}

### Installation

- Python peut **télécharger et installer automatiquement des
  packages**
- Pour installer Pygame :

```terminal
&> python -m pip install pygame
```

## Premier programme graphique {.code}

```python
import pygame
import sys

# initialisation de pygame
pygame.init()

# demande une fenêtre de 800x600 pixels
screen = pygame.display.set_mode((800, 600))

# la clock sert à limiter le nombre d'images par seconde
clock = pygame.time.Clock()

# boucle infinie
while True:
  # attends qu'il se soit passé au moins 1/60
  # de seconde depuis le dernier tick
  clock.tick(60)
  # Boucler sur tous les events
  for event in pygame.event.get():
    # Quitter si l'event est un QUIT
    if event.type == pygame.QUIT:
      sys.exit()

  # dessine un cercle rouge centré en (100, 300) de rayon 20
  pygame.draw.circle(screen, (255, 0, 0), (100, 300), 20)

  # affiche l'image qui vient d'être dessinée
  pygame.display.flip()
```

## Avec des classe {.code}

```python
import pygame
import sys


class App:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((800, 600))

    def draw(self):
        pygame.draw.circle(self.screen, (255, 0, 0), (100, 300), 20)

    def run(self):
        clock = pygame.time.Clock()
        while True:
            clock.tick(60)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    sys.exit()

            self.draw()
            pygame.display.flip()


App().run()
```

## Animation

- Pour animer le cercle, il suffit de le dessiner à une **position un peu
  différente** à chaque image.

```python
import pygame
import sys
from dataclasses import dataclass


@dataclass
class Ball:
    x: int
    y: int

    def move(self, dx, dy):
        self.x += dx
        self.y += dy

    def draw(self, screen):
        pygame.draw.circle(screen, (255, 0, 0), (self.x, self.y), 20)


class App:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((800, 600))
        self.ball = Ball(100, 300)

    def draw(self):
        self.ball.draw(self.screen)

    def update(self):
        self.ball.move(1, 0)

    def run(self):
        clock = pygame.time.Clock()
        while True:
            clock.tick(60)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    sys.exit()

            self.update()

            # dessine un rectangle noir pour effacer l'image
            pygame.draw.rect(self.screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
            self.draw()

            pygame.display.flip()


App().run()
```

## Événements

- Gestion des événements lié à la souris et au clavier [Et autres
  événements comme `pygame.QUIT`]{.small}

- Fonctions dans le module `pygame.event`

- Les événements captés par Pygame sont stocké dans une file

```python
# Boucler sur tous les events
for event in pygame.event.get():
  # Faire quelque chose avec l'event
```

## Clavier

- Tester le type de l\'événement avec l\'attribut `event.type` [Types
  des événements clavier: `pygame.KEYDOWN` et `pygame.KEYUP`]{.small}

- Les événements clavier ont 4 attributs spécifiques :

  - `key`: un code correspondant à la touche du clavier
  - `mod`: un code représentant la combinaison de touches de
    modification enfoncées (SHIFT, ALT, \...)
  - `unicode`: le caractère tapé
  - `scancode`: un code indépendant du layout du clavier (AZERTY,
    QWERTY, \...)

- [Les constantes contenant les `key`
  code](https://www.pygame.org/docs/ref/key.html#key-constants-label)

- [Les constantes contenant les codes des touches de
  modification](https://www.pygame.org/docs/ref/key.html#key-modifiers-label)

## Clavier{.code}

```python
import pygame
import sys

pygame.init()

screen = pygame.display.set_mode((800, 600))

clock = pygame.time.Clock()

xCircle = 100
vxCircle = 1

while True:
  clock.tick(60)
  for event in pygame.event.get():
    # Quitter si l'event est un QUIT
    if event.type == pygame.QUIT:
      sys.exit()
    # Changer la vitesse de la balle si on appuie sur espace
    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
      vxCircle = -vxCircle

  pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))

  pygame.draw.circle(screen, (255, 0, 0), (xCircle, 300), 20)

  # déplace le cercle
  xCircle += vxCircle

  pygame.display.flip()
```

## Touche de modification

- Pour tester si une touche de modification sont appuyée :

```python
if event.mod & pygame.KMOD_SHIFT:
  # SHIFT était appuyé lors de cet event
```

- Ou plusieurs :

```python
if event.mod & (pygame.KMOD_SHIFT | pygame.KMOD_ALT):
  # SHIFT et ALT étaient appuyés lors de cet event
```

## Souris

- Types des événements souris: `pygame.MOUSEBUTTONDOWN`, `pygame.MOUSEBUTTONUP`, `pygame.MOUSEMOTION`, `pygame.MOUSEWHEEL`
- Les attributs intéressants des événements `pygame.MOUSEMOTION` sont:
  - `pos`: les coordonnées de la souris
  - `rel`: la vitesse de la souris
- Les attributs intéressants des événements `pygame.MOUSEBUTTONDOWN` et `pygame.MOUSEBUTTONUP` sont:
  - `button`: 1, 2 ou 3 en fonction du bouton pressé (gauche, milieu ou droit)
  - `pos`: les coordonnées de la souris

## Souris{.code}

```python
import pygame
import sys

pygame.init()

screen = pygame.display.set_mode((800, 600))

clock = pygame.time.Clock()

posCircle = (100, 100)

while True:
  clock.tick(60)
  for event in pygame.event.get():
    # Quitter si l'event est un QUIT
    if event.type == pygame.QUIT:
      sys.exit()

    # Place le cercle là où se trouve la souris
    if event.type == pygame.MOUSEMOTION:
      posCircle = event.pos

  pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))

  pygame.draw.circle(screen, (255, 0, 0), posCircle, 20)

  pygame.display.flip()
```

## Widget

- Bouton, Label, Champ texte, \...
- Pas inclus dans Pygame
- Utilisation de la bibliothèque `pygame_gui`

### Installation

```terminal
&> python -m pip install pygame_gui
```

## Pygame_gui

- Configuration du **manager** de widgets

```python
import pygame
import pygame_gui
import sys

pygame.init()

screen = pygame.display.set_mode((800, 600))

clock = pygame.time.Clock()

manager = pygame_gui.UIManager((800, 600))

while True:
  # tick renvoie le temps écoulé depuis le dernier tick (en ms)
  time_delta = clock.tick(60)
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      sys.exit()

    # permet à pygame_gui de recevoir les events
    manager.process_events(event)

  # permet à pygame_gui de mettre à jour les animations (en s)
  manager.update(time_delta/1000)

  pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))

  # affiche les widgets
  manager.draw_ui(screen)

  pygame.display.flip()
```

## Ajout d\'un widget

- Ajout d\'un **bouton**

```python
import pygame
import pygame_gui
from pygame_gui.elements import UIButton
import sys

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()
manager = pygame_gui.UIManager((800, 600))

hello_button = UIButton(
  relative_rect=pygame.Rect(350, 275, 100, 50),
  text='Hello World',
  manager=manager
)

while True:
  time_delta = clock.tick(60)
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      sys.exit()
    manager.process_events(event)
  manager.update(time_delta/1000)
  pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
  manager.draw_ui(screen)
  pygame.display.flip()
```

## Pygame_gui events

- Lorsqu\'on appuie sur le bouton cela déclenche un **nouveau type
  d\'événement**. [`pygame_gui.UI_BUTTON_PRESSED`]{.small}
- Les événements `pygame_gui` ont un attribut `ui_element` qui contient
  une référence vers **le widget qui a créé l\'événement**.

## Pygame_gui events {.code}

```python
import pygame
import pygame_gui
from pygame_gui.elements import UIButton
import sys

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()
manager = pygame_gui.UIManager((800, 600))

hello_button = UIButton(
  relative_rect=pygame.Rect(350, 275, 100, 50),
  text='Hello World',
  manager=manager
)

while True:
  time_delta = clock.tick(60)
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      sys.exit()

    if event.type == pygame_gui.UI_BUTTON_PRESSED:
      if event.ui_element == hello_button:
        print('Hello World!')

    manager.process_events(event)
  manager.update(time_delta/1000)
  pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
  manager.draw_ui(screen)
  pygame.display.flip()
```

## Interaction entre Widget {.code}

```python
import pygame
import pygame_gui
from pygame_gui.elements import UIButton, UILabel, UITextEntryLine
import sys

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()
manager = pygame_gui.UIManager((800, 600))

hello_button = UIButton(
  relative_rect=pygame.Rect(350, 275, 100, 50),
  text='Hello',
  manager=manager
)

input = UITextEntryLine(
  relative_rect=pygame.Rect(350, 220, 100, 50),
  manager=manager
)

display = UILabel(
  relative_rect=pygame.Rect(350, 330, 100, 50),
  text='',
  manager=manager
)

while True:
  time_delta = clock.tick(60)
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      sys.exit()

    if event.type == pygame_gui.UI_BUTTON_PRESSED:
      if event.ui_element == hello_button:
        display.set_text('Hello {}'.format(input.get_text()))

    manager.process_events(event)
  manager.update(time_delta/1000)
  pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
  manager.draw_ui(screen)
  pygame.display.flip()
```

## Exemple avec des classes {.code}

```python
from dataclasses import dataclass
import pygame
from pygame.event import Event
import pygame_gui
from pygame_gui.elements import UIButton, UITextEntryLine
import sys


@dataclass
class Ball:
  pos: tuple[float, float]
  radius: float

  def draw(self, screen: pygame.Surface):
    pygame.draw.circle(screen, (255, 0, 0), self.pos, self.radius)

class App:
  def __init__(self):
    pygame.init()

    self.screen = pygame.display.set_mode((800, 600))
    self.manager = pygame_gui.UIManager((800, 600))

    self.input = UITextEntryLine(
      relative_rect=pygame.Rect(10, 10, 100, 50), manager=self.manager
    )
    self.input.set_text("20")

    self.ok = UIButton(
      relative_rect=pygame.Rect(120, 10, 100, 50),
      text="OK",
      manager=self.manager,
    )

    self.ball = Ball((100, 100), 20)

  def process_events(self, event: Event):
    if event.type == pygame_gui.UI_BUTTON_PRESSED:
      if event.ui_element == self.ok:
        self.ball.radius = float(self.input.get_text())
    if event.type == pygame.MOUSEMOTION:
      self.ball.pos = event.pos

  def draw(self):
    self.ball.draw(self.screen)

  def run(self):
    clock = pygame.time.Clock()
    while True:
      time_delta = clock.tick(60) / 1000
      for event in pygame.event.get():
        if event.type == pygame.QUIT:
          sys.exit()
        self.process_events(event)
        self.manager.process_events(event)
      self.manager.update(time_delta)
      pygame.draw.rect(self.screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
      self.draw()
      self.manager.draw_ui(self.screen)
      pygame.display.flip()

App().run()
```

## Documentation

### Pygame

[www.pygame.org/docs/](https://www.pygame.org/docs/)

### Pygame_gui

[pygame-gui.readthedocs.io/en/latest/](https://pygame-gui.readthedocs.io/en/latest/)
