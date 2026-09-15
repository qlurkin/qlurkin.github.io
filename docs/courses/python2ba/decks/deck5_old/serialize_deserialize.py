from dataclasses import dataclass, asdict
from typing import Self, Any
import json

@dataclass
class Vector:
  x: float
  y: float

  def encode_json(self):
     return {
        "__class__": "Vector",
        "x": self.x,
        "y": self.y,
     }
  
  @classmethod
  def from_json(cls, dct):
     return cls(dct["x"], dct["y"])

v = Vector(2, 1)
  

@dataclass
class Rectangle:
  top_left: Vector
  bottom_right: Vector

  def encode_json(self):
     return {
        '__class__': 'Rectangle',
        'top_left': self.top_left.encode_json(),
        'bottom_right': self.bottom_right.encode_json()
     }
  
  @classmethod
  def from_json(cls, dct):
     return cls(dct['top_left'], dct['bottom_right'])

def encoder(obj):
  try:
     return obj.encode_json()
  except:
     pass

  # On laisse passer les autres types sans les changer
  return obj

def decoder(dct):
    if '__class__' in dct:
        return globals()[dct['__class__']].from_json(dct)

    # Si on ne reconnait rien, on ne change rien
    return dct

r = Rectangle(Vector(0, 0), Vector(1, 1))
print(r)
r_json = json.dumps(r, default=encoder)
print(r_json)
print(json.loads(r_json, object_hook=decoder))