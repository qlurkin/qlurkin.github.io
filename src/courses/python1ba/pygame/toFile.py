import pygame

pygame.init()

canvas = pygame.display.set_mode((800, 600))

pygame.draw.circle(canvas, (255, 0, 0), (400, 300), 20)

pygame.image.save(canvas, 'image.jpg')