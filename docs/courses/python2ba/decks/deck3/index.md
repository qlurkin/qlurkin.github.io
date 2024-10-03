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

## Avec une classe {.code}

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
  vx: int
  vy: int

  def move(self, dx: int, dy: int):
    self.x += dx
    self.y += dy

  def update(self):
    self.move(self.vx, self.vy)

  def draw(self, screen: pygame.Surface):
    pygame.draw.circle(screen, (255, 0, 0), (self.x, self.y), 20)


class App:
  def __init__(self):
    pygame.init()
    self.screen = pygame.display.set_mode((800, 600))
    self.ball = Ball(100, 300, 1, 0)

  def draw(self):
    self.ball.draw(self.screen)

  def update(self):
    self.ball.update()

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
from dataclasses import dataclass


@dataclass
class Ball:
  x: int
  y: int
  vx: int
  vy: int

  def move(self, dx: int, dy: int):
    self.x += dx
    self.y += dy

  def update(self):
    self.move(self.vx, self.vy)

  def draw(self, screen: pygame.Surface):
    pygame.draw.circle(screen, (255, 0, 0), (self.x, self.y), 20)


class App:
  def __init__(self):
    pygame.init()
    self.screen = pygame.display.set_mode((800, 600))
    self.ball = Ball(100, 300, 1, 0)

  def draw(self):
    self.ball.draw(self.screen)

  def update(self):
    self.ball.update()

  def process_events(self, event: pygame.event.Event):
    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
      self.ball.vx = -self.ball.vx

  def run(self):
    clock = pygame.time.Clock()
    while True:
      clock.tick(60)
      for event in pygame.event.get():
        if event.type == pygame.QUIT:
          sys.exit()
        self.process_events(event)

      self.update()

      pygame.draw.rect(self.screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
      self.draw()

      pygame.display.flip()


App().run()
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
from dataclasses import dataclass


@dataclass
class Ball:
  x: int
  y: int
  vx: int
  vy: int

  def move(self, dx: int, dy: int):
    self.x += dx
    self.y += dy

  def update(self):
    self.move(self.vx, self.vy)

  def draw(self, screen: pygame.Surface):
    pygame.draw.circle(screen, (255, 0, 0), (self.x, self.y), 20)


class App:
  def __init__(self):
    pygame.init()
    self.screen = pygame.display.set_mode((800, 600))
    self.ball = Ball(100, 300, 1, 0)

  def draw(self):
    self.ball.draw(self.screen)

  def update(self):
    self.ball.update()

  def process_events(self, event: pygame.event.Event):
    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
        self.ball.vx = -self.ball.vx
    if event.type == pygame.MOUSEBUTTONDOWN:
        self.ball.x = event.pos[0]
        self.ball.y = event.pos[1]

  def run(self):
    clock = pygame.time.Clock()
    while True:
      clock.tick(60)
      for event in pygame.event.get():
        if event.type == pygame.QUIT:
          sys.exit()
        self.process_events(event)

      self.update()

      pygame.draw.rect(self.screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
      self.draw()

      pygame.display.flip()


App().run()
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
from dataclasses import dataclass


@dataclass
class Ball:
  x: int
  y: int
  vx: int
  vy: int

  def move(self, dx: int, dy: int):
    self.x += dx
    self.y += dy

  def update(self):
    self.move(self.vx, self.vy)

  def draw(self, screen: pygame.Surface):
    pygame.draw.circle(screen, (255, 0, 0), (self.x, self.y), 20)


class App:
  def __init__(self):
    pygame.init()
    self.size = (800, 600)
    self.screen = pygame.display.set_mode(self.size)
    self.manager = pygame_gui.UIManager(self.size)
    self.ball = Ball(100, 300, 1, 0)

  def draw(self):
    self.ball.draw(self.screen)

  def update(self):
    self.ball.update()

  def process_events(self, event: pygame.event.Event):
    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
      self.ball.vx = -self.ball.vx
    if event.type == pygame.MOUSEBUTTONDOWN:
      self.ball.x = event.pos[0]
      self.ball.y = event.pos[1]

  def run(self):
    clock = pygame.time.Clock()
    while True:
      # tick renvoie le temps écoulé depuis le dernier tick (en ms)
      time_delta = clock.tick(60)
      for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()

        # Manager.process_event() permet à pygame_gui de recevoir les
        # events. Cette méthode renvoi True si elle a utilisé l'événement
        if not self.manager.process_events(event):
          # Si le manager n'a pas utiliser l'événement, alors on le traite
          # nous même
          self.process_events(event)

      self.update()

      # Permet à pygame_gui de mettre à jour les animations (en s)
      self.manager.update(time_delta/1000)

      pygame.draw.rect(self.screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
      self.draw()

      # Affiche les widgets
      self.manager.draw_ui(self.screen)

      pygame.display.flip()


App().run()
```

## Ajout d\'un widget

- Ajout d\'un **bouton**

```python
import pygame
import pygame_gui
from pygame_gui.elements import UIButton
import sys
from dataclasses import dataclass


@dataclass
class Ball:
  x: int
  y: int
  vx: int
  vy: int

  def move(self, dx: int, dy: int):
    self.x += dx
    self.y += dy

  def update(self):
    self.move(self.vx, self.vy)

  def draw(self, screen: pygame.Surface):
    pygame.draw.circle(screen, (255, 0, 0), (self.x, self.y), 20)


class App:
  def __init__(self):
    pygame.init()
    self.size = (800, 600)
    self.screen = pygame.display.set_mode(self.size)
    self.manager = pygame_gui.UIManager(self.size)
    self.ball = Ball(100, 300, 1, 0)

    self.hello_button = UIButton(
      relative_rect=pygame.Rect(350, 275, 150, 50),
      text='Hello World',
      manager=self.manager
    )

  def draw(self):
    self.ball.draw(self.screen)

  def update(self):
    self.ball.update()

  def process_events(self, event: pygame.event.Event):
    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
      self.ball.vx = -self.ball.vx
    if event.type == pygame.MOUSEBUTTONDOWN:
      self.ball.x = event.pos[0]
      self.ball.y = event.pos[1]

  def run(self):
    clock = pygame.time.Clock()
    while True:
      time_delta = clock.tick(60)
      for event in pygame.event.get():
        if event.type == pygame.QUIT:
          sys.exit()
        if not self.manager.process_events(event):
          self.process_events(event)

      self.update()
      self.manager.update(time_delta/1000)

      pygame.draw.rect(self.screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
      self.draw()
      self.manager.draw_ui(self.screen)

      pygame.display.flip()


App().run()
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
from dataclasses import dataclass


@dataclass
class Ball:
  x: int
  y: int
  vx: int
  vy: int

  def move(self, dx: int, dy: int):
    self.x += dx
    self.y += dy

  def update(self):
    self.move(self.vx, self.vy)

  def draw(self, screen: pygame.Surface):
    pygame.draw.circle(screen, (255, 0, 0), (self.x, self.y), 20)


class App:
  def __init__(self):
    pygame.init()
    self.size = (800, 600)
    self.screen = pygame.display.set_mode(self.size)
    self.manager = pygame_gui.UIManager(self.size)
    self.ball = Ball(100, 300, 1, 0)

    self.hello_button = UIButton(
      relative_rect=pygame.Rect(350, 275, 150, 50),
      text='Hello World',
      manager=self.manager
    )

  def draw(self):
    self.ball.draw(self.screen)

  def update(self):
    self.ball.update()

  def process_events(self, event: pygame.event.Event):
    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
      self.ball.vx = -self.ball.vx
    if event.type == pygame.MOUSEBUTTONDOWN:
      self.ball.x = event.pos[0]
      self.ball.y = event.pos[1]
    if event.type == pygame_gui.UI_BUTTON_PRESSED:
      if event.ui_element is self.hello_button:
        # affiche 'Hello World!' dans le terminal
        print('Hello World!')

  def run(self):
      clock = pygame.time.Clock()
      while True:
        time_delta = clock.tick(60)
        for event in pygame.event.get():
          if event.type == pygame.QUIT:
            sys.exit()
          if not self.manager.process_events(event):
            self.process_events(event)

        self.update()
        self.manager.update(time_delta/1000)

        pygame.draw.rect(self.screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
        self.draw()
        self.manager.draw_ui(self.screen)

        pygame.display.flip()


App().run()
```

## Interaction entre Widget {.code}

```python
import pygame
import pygame_gui
from pygame_gui.elements import UIButton, UITextEntryLine, UILabel
import sys
from dataclasses import dataclass


@dataclass
class Ball:
  x: int
  y: int
  vx: int
  vy: int

  def move(self, dx: int, dy: int):
    self.x += dx
    self.y += dy

  def update(self):
    self.move(self.vx, self.vy)

  def draw(self, screen: pygame.Surface):
    pygame.draw.circle(screen, (255, 0, 0), (self.x, self.y), 20)


class App:
  def __init__(self):
    pygame.init()
    self.size = (800, 600)
    self.screen = pygame.display.set_mode(self.size)
    self.manager = pygame_gui.UIManager(self.size)
    self.ball = Ball(100, 300, 1, 0)

    self.hello_button = UIButton(
      relative_rect=pygame.Rect(350, 275, 150, 50),
      text='Hello',
      manager=self.manager
    )

    self.input = UITextEntryLine(
      relative_rect=pygame.Rect(350, 220, 150, 50),
      manager=self.manager
    )

    self.display = UILabel(
      relative_rect=pygame.Rect(350, 330, 150, 50),
      text='',
      manager=self.manager
    )

  def draw(self):
    self.ball.draw(self.screen)

  def update(self):
    self.ball.update()

  def process_events(self, event: pygame.event.Event):
    if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
      self.ball.vx = -self.ball.vx
    if event.type == pygame.MOUSEBUTTONDOWN:
      self.ball.x = event.pos[0]
      self.ball.y = event.pos[1]
    if event.type == pygame_gui.UI_BUTTON_PRESSED:
      if event.ui_element is self.hello_button:
        name = self.input.text
        self.display.set_text(f'Hello {name}')

  def run(self):
    clock = pygame.time.Clock()
    while True:
      time_delta = clock.tick(60)
      for event in pygame.event.get():
        if event.type == pygame.QUIT:
          sys.exit()
        if not self.manager.process_events(event):
          self.process_events(event)

      self.update()
      self.manager.update(time_delta/1000)

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
