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