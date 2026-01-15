import pygame
import numpy as np

pygame.init()

screen = pygame.display.set_mode([800, 600])

x = np.array([400]*10)
y = np.array([300]*10)
vx = np.linspace(-1, 1, 10)
vy = np.linspace(1, -1, 10)

@np.vectorize
def draw_circles(x, y):
    pygame.draw.circle(screen, [255, 0, 0], [x, y], 20)

@np.vectorize
def update_v(x, v, low, high):
    if x < low or x > high:
        return -v
    return v

@np.vectorize
def clamp(x, low, high):
    if x < low:
        return low
    if x > high:
        return high
    return x


while not pygame.event.peek(pygame.QUIT):

    pygame.draw.rect(screen, [0, 0, 0], pygame.Rect(0, 0, 800, 600))
    draw_circles(x, y)
    vy = vy + 0.01
    vy = update_v(y, vy, 10, 590)
    vx = update_v(x, vx, 10, 790)
    x = clamp(x, 10, 790)
    y = clamp(y, 10, 590)
    x = x + vx
    y = y + vy
    pygame.display.flip()


