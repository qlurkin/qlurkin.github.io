# A partir du code du slide "Animation", faites bouger le cercle
# en x et en y et faites le rebondir sur les bords de la fenêtre
# Ce défi ne compte pas pour la note

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
