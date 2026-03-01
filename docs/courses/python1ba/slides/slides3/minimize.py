from dichotomy import dichotomy


def diff(fun, x, h=1e-8):
    return (fun(x + h) - fun(x - h)) / (2 * h)


def minimize(fun, x0, step=1e-2, eps=1e-8):
    x = x0
    d = diff(fun, x)
    while abs(d) > eps:
        x = x - step * d
        d = diff(fun, x)
    return x


def minimize_adapt(fun, x0, step0=1.0, eps=1e-8, growth=1.1, shrink=0.5):
    step = step0
    x = x0
    d = diff(fun, x)
    while abs(d) > eps:
        x_new = x - step * d

        if fun(x_new) < fun(x):
            x = x_new
            step = growth * step
            d = diff(fun, x)
        else:
            step = shrink * step
    return x


def minimize_dichotom(fun, min, max, eps=1e-8):
    def df(x):
        return diff(fun, x)

    return dichotomy(df, min, max, eps)


if __name__ == "__main__":
    from math import cos, pi

    print("res =", minimize(cos, 2))
    print("res =", minimize_adapt(cos, 2))
    print("res =", minimize_dichotom(cos, 2, 4))
    print(" pi =", pi)
