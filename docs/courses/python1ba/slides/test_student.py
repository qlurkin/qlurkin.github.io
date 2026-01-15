import pygame
import numpy as np


pygame.init()

screen = pygame.display.set_mode([800, 600])


while not pygame.event.peek(pygame.QUIT):
    pygame.display.flip()
