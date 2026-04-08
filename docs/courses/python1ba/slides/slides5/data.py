from matplotlib import pyplot as plt
import random


def F(x):
    m = 1.6
    p = 0.7
    return m * x + p


x = []
for _ in range(20):
    x.append(random.random() * 10)

print(x)

y = list(map(F, x))


def noise(x):
    return x + (random.random() - 0.5) * 0.5


y = list(map(noise, y))

print(y)

with open("data.csv", "w") as f:
    for xv, yv in zip(x, y):
        f.write(f"{xv:.4f};{yv:.4f}\n")

plt.scatter(x, y)
plt.show()
