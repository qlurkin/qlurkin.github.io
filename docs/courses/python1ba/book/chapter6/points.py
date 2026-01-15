from math import cos, pi, sin
from turtle import done, down, goto, up

a = 0
points = []

while a < 2 * pi:
    x = cos(a)
    y = sin(a)
    points.append((x, y))
    a += 0.2

print(points)

up()
for x, y in points:
    goto(x * 200, y * 200)
    down()

done()
