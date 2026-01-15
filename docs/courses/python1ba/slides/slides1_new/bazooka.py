from math import sqrt

# xx - 5x + 6 = 0
a = 1
b = -5
c = 6

delta = b * b - 4 * a * c

if delta >= 0:
    x1 = (-b - sqrt(delta)) / (2 * a)
    x2 = (-b + sqrt(delta)) / (2 * a)
    print("x1:", x1, "x2:", x2)
else:
    print("Pas de solution réeles")
