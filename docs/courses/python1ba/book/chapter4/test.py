import pygame
import sys

pygame.init()

screen = pygame.display.set_mode((800, 600))

clock = pygame.time.Clock()

xCircle = 100

while True:
    clock.tick(60)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        # Changer la position de la balle quand la souris se déplace
        if event.type == pygame.MOUSEMOTION:
            xCircle = event.pos[0]
        
    pygame.draw.rect(screen, (0, 0, 0), pygame.Rect(0, 0, 800, 600))

    pygame.draw.circle(screen, (255, 0, 0), (xCircle, 300), 20)

    pygame.display.flip()
