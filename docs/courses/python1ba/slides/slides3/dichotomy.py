def dichotomy(fun, min, max, eps=1e-8):
    if fun(min) * fun(max) > 0:
        return None

    mid = (min + max) / 2

    if max - min < eps:
        return mid

    res = dichotomy(fun, min, mid, eps)

    if res is not None:
        return res

    return dichotomy(fun, mid, max, eps)


if __name__ == "__main__":
    from math import cos, pi

    print(dichotomy(cos, 1, 4))
    print(pi / 2)
