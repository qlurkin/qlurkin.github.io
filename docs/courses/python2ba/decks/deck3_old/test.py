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
