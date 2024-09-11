---
title: Exercices 4
---

1. Écrire un programme qui demande un nombre de côtés et qui affiche un polygone régulier avec le nombre de côtés demandé. La fonction [`pygame.draw.line()`](https://www.pygame.org/docs/ref/draw.html#pygame.draw.line) peut vous aider.
    
    *Indice: un polygone régulier est inscrit dans un cercle, vous devriez connaître les équations paramétriques d'un cercle*.

2. Écrire un programme qui dessine une spirale.

3. A partir du code suivant:
    
    ```python
    import pygame

    # initialisation de pygame
    pygame.init()

    # demande une fenêtre de 800x600 pixels
    screen = pygame.display.set_mode((800, 600))

    xCircle = 100

    # boucle jusqu'à ce qu'on quitte
    while not pygame.event.peek(pygame.QUIT):

        # dessine un rectangle noir pour effacer l'image
        pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))

        # dessine un cercle rouge centré en (xCircle, 300) de rayon 20
        pygame.draw.circle(screen, (255, 0, 0), (xCircle, 300), 20)
        
        # déplace le cercle
        xCircle += 1

        # affiche l'image qui vient d'être dessinée
        pygame.display.flip()
    ```

    faites bouger le cercle en x et en y et faites le rebondir sur les bords de la fenêtre.

4. Même exercice que le précédent, mais le programme demande un nombre de cercles à l'utilisateur et anime ensuite le nombre de cercles demandé.

5. Écrire un programme qui permet de cliquer dans une fenêtre et qui dessine des lignes entre chaque point cliqué.