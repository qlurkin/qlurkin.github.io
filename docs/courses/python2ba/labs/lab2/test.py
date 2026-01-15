from dataclasses import dataclass


@dataclass
class Item:
    code: int
    name: str
    cents: int


beer = Item(56273, "Zundert 33 cl", 250)
print(beer)
