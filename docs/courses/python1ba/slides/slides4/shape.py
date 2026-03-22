from turtle import color, up, down, goto, done
from math import cos, sin, pi


def polygon(center, nb_sides, radius, col="black"):
    x, y = center  # déballage de séquence
    angle = 2 * pi / nb_sides
    up()
    goto(x + radius, y)
    down()
    color(col)
    for i in range(nb_sides):
        goto(
            x + radius * cos((i + 1) * angle),
            y + radius * sin((i + 1) * angle),
        )


def square(center, radius, col="black"):
    polygon(center, 4, radius, col)


polygon([150, 150], 5, 100, "red")
square([-50, -50], 50, "blue")
done()
