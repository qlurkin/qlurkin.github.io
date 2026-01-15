import matplotlib.pyplot as plt
import numpy as np

x = [0, 1, 1]
y = [1, 1, 0]

plt.figure()
plt.grid()
plt.axhline(color="k")
plt.axvline(color="k")
plt.plot(x, y)
plt.margins(0.5)
plt.axis("equal")
plt.savefig("uniform.svg")
# plt.show()


plt.figure()
x = np.linspace(-3.0, 3.0, 100)


def gaussian(center, deviation, x):
    return (1 / (deviation * np.sqrt(2 * np.pi))) * np.exp(
        -0.5 * ((x - center) / deviation) ** 2
    )


y = gaussian(0.0, 1.0, x)

plt.grid()
plt.axhline(color="k")
plt.axvline(color="k")
# plt.margins(0.2)
plt.axis((-3.0, 3.0, -0.1, 0.5))
plt.plot(x, y)
plt.savefig("normal.svg")

plt.figure()
x = np.linspace(-5, 5, 100)
y = np.sin(x)
plt.plot(x, y)
plt.savefig("sin.svg")


x = np.linspace(-5, 5, 100)
y = np.sin(x)
plt.figure()
plt.title("Sinus")  # Donne un titre à la figure
plt.xlabel("x")  # Affiche un nom sur l'axe des x
plt.ylabel("sin(x)")  # Affiche un nom sur l'axe des y
plt.grid()  # Affiche une grille

# Configure les graduations de l'axe des x
plt.xticks(
    [-3 * np.pi / 2, -np.pi, -np.pi / 2, 0, np.pi / 2, np.pi, 3 * np.pi / 2],
    labels=["-3pi/2", "-pi", "-pi/2", "0", "pi/2", "pi", "3pi/2"],
)

plt.axhline(color="k")  # Affiche une ligne noire pour l'axe des x
plt.axvline(color="k")  # Affiche une ligne noire pour l'axe des y
plt.plot(x, y)
plt.savefig("sin_style.svg")


x = np.linspace(-5, 5, 100)
ysin = np.sin(x)
ycos = np.cos(x)
plt.figure()
plt.title("Trigono")
plt.xlabel("x")
plt.ylabel("y")
plt.grid()
plt.xticks(
    [-3 * np.pi / 2, -np.pi, -np.pi / 2, 0, np.pi / 2, np.pi, 3 * np.pi / 2],
    labels=["-3pi/2", "-pi", "-pi/2", "0", "pi/2", "pi", "3pi/2"],
)
plt.axhline(color="k")
plt.axvline(color="k")
plt.plot(x, ysin, label="sin(x)")  # on donne une étiquète à la courbe
plt.plot(x, ycos, label="cos(x)")  # on donne une étiquète à la courbe
plt.legend()
plt.savefig("sin_cos.svg")


def fun(x):
    return np.cos(x) + np.cos(3 * x + 1) / 2 + np.cos(5 * x - 1) / 3


x = np.linspace(-5, 5, 1000)
plt.figure()
plt.axhline(color="k")
plt.axvline(color="k")
plt.plot(x, fun(x))
plt.grid()
plt.savefig("fun_to_root.svg")

x = np.linspace(-2, 0, 1000)
plt.figure()
plt.axhline(color="k")
# plt.axvline(color="k")
plt.plot([-2, -2], [0, fun(-2)], "r--")
plt.plot([0, 0], [0, fun(0)], "r--")
plt.plot(x, fun(x))
plt.grid()
plt.savefig("fun_to_root_1.svg")

x = np.linspace(-2, 0, 1000)
plt.figure()
plt.axhline(color="k")
# plt.axvline(color="k")
plt.plot(x, fun(x))
plt.plot([-2, -2], [0, fun(-2)], "r--")
plt.plot([0, 0], [0, fun(0)], "k--")
plt.plot([-1, -1], [0, fun(-1)], "r--")
plt.grid()
plt.savefig("fun_to_root_2.svg")

x = np.linspace(-2, 0, 1000)
plt.figure()
plt.axhline(color="k")
# plt.axvline(color="k")
plt.plot(x, fun(x))
plt.plot([-2, -2], [0, fun(-2)], "k--")
plt.plot([0, 0], [0, fun(0)], "k--")
plt.plot([-1, -1], [0, fun(-1)], "k--")
plt.plot([-1.5, -1.5], [0, fun(-1.5)], "k--")
plt.plot([-1.25, -1.25], [0, fun(-1.25)], "r--")
plt.plot([-1.375, -1.375], [0, fun(-1.375)], "k--")
a = (-1.375 + -1.25) / 2
plt.plot([a, a], [0, fun(a)], "k--")
a = (a + -1.25) / 2
plt.plot([a, a], [0, fun(a)], "r--")
plt.grid()
plt.savefig("fun_to_root_3.svg")


def dichotomie(fun, min, max, err):
    mid = (min + max) / 2

    if max - mid < err:
        return mid

    if fun(min) * fun(mid) < 0:
        return dichotomie(fun, min, mid, err)
    else:
        return dichotomie(fun, mid, max, err)


print(dichotomie(fun, -2, 0, 0.00001))

from scipy import integrate, optimize

root = optimize.bisect(fun, -2, 0, xtol=0.00001)

print(root)

x = np.linspace(-5, 5, 1000)
plt.figure()
plt.plot(x, fun(x))
plt.plot(root, 0, "o")
plt.grid()
plt.savefig("bisect.svg")


def fun(x):
    return np.sqrt(1 - x**2)


result = integrate.quad(fun, -1, 1)
print(result)  # (pi/2, erreur)

x = np.linspace(-1, 1, 100)
y = fun(x)

plt.figure()
plt.fill_between(x, y, alpha=0.5)
plt.plot(x, y)
plt.grid()
plt.axis("equal")
plt.xlim(-1.5, 1.5)
plt.axhline(color="k")
plt.axvline(color="k")
plt.annotate(str(result[0]), xy=(0, 0.4), ha="center")
plt.savefig("integrate.svg")

print("graph generated")
