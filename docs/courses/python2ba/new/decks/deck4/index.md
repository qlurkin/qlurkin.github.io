---
lang: en
title: Chapitre 4 - Interface graphique
viewport: width=device-width, initial-scale=1.0
---

::: section
# IN2T - Informatique [Interface graphique]{.small}

Quentin Lurkin
:::

::: section
## Programmation graphique

-   Ouvre une **fenêtre** de l\'OS
-   Tourne **jusqu\'à ce qu\'on quitte** [boucle !]{.small}
-   Permet d\'afficher des formes, images, animation [Une animation est
    une succession rapide d\'images]{.small}
:::

::: section
## Pygame

-   Permet de créer un programme graphique
-   Non-inclus dans l\'installation de Python [Il faut installer le
    package]{.small}

### Installation

-   Python peut **télécharger et installer automatiquement des
    packages**
-   Pour installer Pygame :

``` terminal
            &> python -m pip install pygame
        
```
:::

::: {.section .code}
## Premier programme graphique

                
                    import pygame

                    # initialisation de pygame
                    pygame.init()

                    # demande une fenêtre de 800x600 pixels
                    screen = pygame.display.set_mode((800, 600))

                    # la clock sert à limiter le nombre d'images par seconde
                    clock = pygame.time.Clock()

                    # boucle jusqu'à ce qu'on quitte
                    while not pygame.event.peek(pygame.QUIT):

                        # attends qu'il se soit passé au moins 1/60
                        # de seconde depuis le dernier tick
                        clock.tick(60)

                        # dessine un cercle rouge centré en (100, 300) de rayon 20
                        pygame.draw.circle(screen, (255, 0, 0), (100, 300), 20)

                        # affiche l'image qui vient d'être dessinée
                        pygame.display.flip()
                
            
:::

::: section
## Animation

Pour animer le cercle, il suffit de le dessiner à une position un peu
différente à chaque image.

``` lang-python
            import pygame

            # initialisation de pygame
            pygame.init()

            # demande une fenêtre de 800x600 pixels
            screen = pygame.display.set_mode((800, 600))

            clock = pygame.time.Clock()

            xCircle = 100

            # boucle jusqu'à ce qu'on quitte
            while not pygame.event.peek(pygame.QUIT):
                clock.tick(60)

                # dessine un rectangle noir pour effacer l'image
                pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))

                # dessine un cercle rouge centré en (xCircle, 300) de rayon 20
                pygame.draw.circle(screen, (255, 0, 0), (xCircle, 300), 20)
                
                # déplace le cercle
                xCircle += 1

                # affiche l'image qui vient d'être dessinée
                pygame.display.flip()
        
```
:::

::: section
## Événements

-   Gestion des événements lié à la souris et au clavier [Et autres
    événements comme `pygame.QUIT`]{.small}

-   Fonctions dans le module `pygame.event`

-   Les événements captés par Pygame sont stocké dans une file

-   Le fonction `pygame.event.peek` vérifie si un certain type
    d\'événement attends dans la file

    ``` lang-python
                        # boucle jusqu'à ce qu'on quitte
                        while not pygame.event.peek(pygame.QUIT):
                            # ...
                    
    ```
:::

::: section
## Clavier

-   Pour traiter tous les événements

    ``` lang-python
                        # Boucler sur tous les events
                        for event in pygame.event.get():
                            # Faire quelque-chose avec l'event
                    
    ```

-   Tester le type de l\'événement avec l\'attribut `event.type` [Types
    des événements clavier: `pygame.KEYDOWN` et `pygame.KEYUP`]{.small}

-   Les événements clavier ont 4 attributs spécifiques :
    -   `key`: un code correspondant à la touche du clavier
    -   `mod`: un code représentant la combinaison de touches de
        modification enfoncées (SHIFT, ALT, \...)
    -   `unicode`: le caractère tapé
    -   `scancode`: un code indépendant du layout du clavier (AZERTY,
        QWERTY, \...)

-   [Les constantes contenant les `key`
    code](https://www.pygame.org/docs/ref/key.html#key-constants-label)

-   [Les constantes contenant les codes des touches de
    modification](https://www.pygame.org/docs/ref/key.html#key-modifiers-label)
:::

::: {.section .code}
## Clavier

``` lang-python
            import pygame
            import sys

            pygame.init()

            screen = pygame.display.set_mode((800, 600))

            clock = pygame.time.Clock()

            xCircle = 100
            vxCircle = 1

            # boucle infinie !
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
:::

::: section
## Touche de modification

-   Pour tester si une touche de modification sont appuyée :

    ``` lang-python
                    if event.mod & pygame.KMOD_SHIFT:
                        # SHIFT était appuyé lors de cet event
                
    ```

-   Ou plusieurs :

    ``` lang-python
                        if event.mod & (pygame.KMOD_SHIFT | pygame.KMOD_ALT):
                            # SHIFT et ALT étaient appuyés lors de cet event
                    
    ```
:::

::: section
## Souris

-   Types des événements souris: `pygame.MOUSEBUTTONDOWN`,
    `pygame.MOUSEBUTTONUP`, `pygame.MOUSEMOTION`, `pygame.MOUSEWHEEL`
-   Les attributs intéressants des événements `pygame.MOUSEMOTION` sont
    :
    -   `pos`: les coordonnées de la souris
    -   `rel`: la vitesse de la souris
-   Les attributs intéressants des événements `pygame.MOUSEBUTTONDOWN`
    et `pygame.MOUSEBUTTONUP` sont :
    -   `button`: 1, 2 ou 3 en fonction du bouton pressé (gauche, milieu
        ou droit)
    -   `pos`: les coordonnées de la souris
:::

::: {.section .code}
## Souris

``` lang-python
            import pygame
            import sys

            pygame.init()

            screen = pygame.display.set_mode((800, 600))

            clock = pygame.time.Clock()

            posCircle = (100, 100)

            # boucle infinie !
            while True:
                clock.tick(60)
                for event in pygame.event.get():
                    # Quitter si l'event est un QUIT
                    if event.type == pygame.QUIT:
                        sys.exit()
                    # Changer la vitesse de la balle si on appuie sur espace

                    if event.type == pygame.MOUSEMOTION:
                        # Place le cercle là où se trouve la souris
                        posCircle = event.pos
                    
                pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))

                pygame.draw.circle(screen, (255, 0, 0), posCircle, 20)

                pygame.display.flip()
        
```
:::

::: section
## Widget

-   Bouton, Label, Champ texte, \...
-   Pas inclus dans Pygame
-   Utilisation de la bibliothèque `pygame_gui`

### Installation

``` terminal
            &> python -m pip install pygame_gui
        
```
:::

::: section
## Pygame_gui

-   Configuration du manager de widgets

``` lang-python
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
:::

::: section
## Ajout d\'un widget

-   Ajout d\'un bouton

``` lang-python
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
:::

::: section
## Pygame_gui events

-   Lorsqu\'on appuie sur le bouton cela déclenche un nouveau type
    d\'événement. [`pygame_gui.UI_BUTTON_PRESSED`]{.small}
-   Les événements pygame_gui ont un attribut `ui_element` qui contient
    une référence vers le widget qui a créé l\'événement.
:::

::: {.section .code}
## Pygame_gui events

``` lang-python
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
:::

::: {.section .code}
## Interaction entre Widget

``` lang-python
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
:::

::: {.section .code}
## Exemple avec des classes

``` lang-python
            import pygame
            import pygame_gui
            from pygame_gui.elements import UIButton, UITextEntryLine
            import sys


            class Ball:
                def __init__(self, pos, radius):
                    self.__pos = pos
                    self.__radius = radius

                def set_pos(self, pos):
                    self.__pos = pos

                def set_radius(self, radius):
                    self.__radius = radius

                def draw(self, screen):
                    pygame.draw.circle(screen, (255, 0, 0), self.__pos, self.__radius)


            class App:
                def __init__(self):
                    pygame.init()
                    self.__screen = pygame.display.set_mode((800, 600))
                    self.__manager = pygame_gui.UIManager((800, 600))

                    self.__input = UITextEntryLine(
                        relative_rect=pygame.Rect(10, 10, 100, 50),
                        manager=self.__manager
                    )
                    self.__input.set_text("20")

                    self.__ok = UIButton(
                        relative_rect=pygame.Rect(120, 10, 100, 50),
                        text='OK',
                        manager=self.__manager
                    )

                    self.__ball = Ball((100, 100), 20)

                def process_events(self, event):
                    if event.type == pygame_gui.UI_BUTTON_PRESSED:
                        if event.ui_element == self.__ok:
                            self.__ball.set_radius(float(self.__input.get_text()))
                    if event.type == pygame.MOUSEMOTION:
                        self.__ball.set_pos(event.pos)

                def draw(self):
                    self.__ball.draw(self.__screen)

                def run(self):
                    clock = pygame.time.Clock()
                    while True:
                        time_delta = clock.tick(60)/1000
                        for event in pygame.event.get():
                            if event.type == pygame.QUIT:
                                sys.exit()
                            self.process_events(event)
                            self.__manager.process_events(event)
                        self.__manager.update(time_delta)
                        pygame.draw.rect(self.__screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))
                        self.draw()
                        self.__manager.draw_ui(self.__screen)
                        pygame.display.flip()

            App().run()
        
```
:::

::: section
## Documentation

### Pygame

[www.pygame.org/docs/](https://www.pygame.org/docs/)

### Pygame_gui

[pygame-gui.readthedocs.io/en/latest/](https://pygame-gui.readthedocs.io/en/latest/)
:::
