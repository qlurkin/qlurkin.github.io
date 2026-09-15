from math import sqrt
from dataclasses import dataclass


@dataclass
class NoRootException(Exception):
    delta: float


def trinomialroots(a: float, b: float, c: float) -> tuple[float, ...]:
    """Compute the real roots of a second-degree equation

    Args:
        `a`, `b` and `c`: The coefficients of the second-degree equation

    Returns:
        A tuple with one or two real roots

    Raises:
        NoRootException: if the equation has no real roots
    """
    delta = b**2 - 4 * a * c
    if delta < 0:
        raise NoRootException(delta)
    if delta == 0:
        return (-b / (2 * a),)
    x1 = (-b + sqrt(delta)) / (2 * a)
    x2 = (-b - sqrt(delta)) / (2 * a)
    return (x1, x2)


try:
    print(trinomialroots(1, 0, 2))
except NoRootException as e:
    print(f"Pas de racine réelle (delta = {e.delta})")
except:
    print("Erreur")
