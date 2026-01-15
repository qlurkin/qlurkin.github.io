from typing import Self, Hashable, Any
from dataclasses import dataclass


class Address:
    def __init__(self, street: str, number: int, zip: int, city: str):
        self.street = street
        self.number = number
        self.zip = zip
        self.city = city

    def display(self):
        return f"{self.street}, {self.number}\n{self.zip} {self.city}"


address = Address("Promenade de l'Alma", 50, 1200, "Woluwé-Saint-Lambert")
print(address.display())

F: float

F = 1


class Vector:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __add__(self, other: Self):
        return Vector(self.x + other.x, self.y + other.y)


class Rectangle:
    def __init__(
        self, lowerleft: Vector, width: float, height: float, angle: float = 0
    ):
        self.lowerleft = lowerleft
        self.width = width
        self.height = height
        self.angle = angle

    def __str__(self):
        return (
            f"Rectangle en {self.lowerleft} + de longueur {self.width}"
            f"et de hauteur {self.height} incliné de {self.angle} degrés"
        )


@dataclass
class Address:
    street: str
    number: int
    zip: int
    city: str


address = Address("Promenade de l'Alma", 50, 1200, "Woluwé-Saint-Lambert")
print(address.zip)
print(address)

address2 = Address("Promenade de l'Alma", 50, 1200, "Woluwé-Saint-Lambert")
print(address == address2)


@dataclass
class Address:
    street: str
    number: int
    zip: int
    city: str

    def display(self):
        return f"{self.street}, {self.number}\n{self.zip} {self.city}"

    def __str__(self):
        return self.display()


address = Address("Promenade de l'Alma", 50, 1200, "Woluwé-Saint-Lambert")
print(address)

x: Any
