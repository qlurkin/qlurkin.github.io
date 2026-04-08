x = [
    6.5114,
    7.244,
    5.7117,
    1.5392,
    6.1776,
    0.0031,
    9.1037,
    3.8121,
    4.9725,
    2.3354,
    1.8208,
    8.1167,
    7.9584,
    2.741,
    3.4728,
    4.7317,
    5.6237,
    2.6557,
    7.7711,
    9.1899,
]
y = [
    11.1892,
    12.5194,
    9.7893,
    2.9398,
    10.3582,
    0.8437,
    15.2448,
    6.8719,
    8.5677,
    4.6341,
    3.7831,
    13.9252,
    13.2268,
    4.8576,
    6.0295,
    8.429,
    9.7783,
    4.7825,
    13.2674,
    15.6054,
]


# Modèle paramétrique
def F(m, p, x):
    return m * x + p


# Moyenne des carrés des distances
def cost(m, p):
    res = 0
    for i in range(len(x)):
        prediction = F(m, p, x[i])
        res += (prediction - y[i]) ** 2
    return res / len(x)


def diff(fun, x1, x2, h=1e-8):
    return (
        (fun(x1 + h, x2) - fun(x1 - h, x2)) / (2 * h),
        (fun(x1, x2 + h) - fun(x1, x2 - h)) / (2 * h),
    )


def norm(a, b):
    return (a**2 + b**2) ** (0.5)


def minimize(fun, x1_0, x2_0, step=1e-2, eps=1e-8):
    x1 = x1_0
    x2 = x2_0
    d1, d2 = diff(fun, x1, x2)
    while norm(d1, d2) > eps:
        x1 = x1 - step * d1
        x2 = x2 - step * d2
        d1, d2 = diff(fun, x1, x2)
    return x1, x2


m, p = minimize(cost, 0, 0)
print(m, p)
