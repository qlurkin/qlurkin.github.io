import pygame

pygame.init()

screen = pygame.display.set_mode((800, 600))

#ball = [400, 300]
#speed = 5

#clock = pygame.time.Clock()
while not pygame.event.peek(pygame.QUIT):
    #clock.tick(30)

    #pygame.draw.rect(screen, (0, 0, 0), screen.get_rect())
    #ball[0] += speed
    #if ball[0] >= 800 or ball[0] < 0:
    #    speed = -speed
    #pygame.draw.circle(screen, (255, 0, 0), ball, 20)

    pygame.display.flip()