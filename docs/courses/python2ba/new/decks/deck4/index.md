---
title: Cours 4
subtitle: Mécanisme d'exceptions et lecture de fichiers
type: deck
author: Quentin Lurkin
typst: true
---

## Trace d'erreur

- Une erreur d\'exécution imprime une **trace d\'erreur** [Chemin d\'exécution complet qui a provoqué l\'erreur]{.small}

```python
def percentage(score: float, total:int) -> float:
  return score / total * 100

print('Alexis a obtenu', percentage(18, 20), '%')
print('Sébastien a obtenu', percentage(6, 0), '%')
```

```terminal
Alexis a obtenu 90.0 %
Traceback (most recent call last):
    File "program.py", line 5, in <module>
        print('Sébastien a obtenu', percentage(6, 0), '%')
    File "program.py", line 2, in percentage
        return score / total * 100
ZeroDivisionError: division by zero
```

## Trace d'erreur

- L\'erreur a comme **origine** l\'exécution de l\'instruction en
  ligne 5

```terminal
File "program.py", line 5, in <module>
    print('Sébastien a obtenu', percentage(6, 0), '%')
```

- L\'erreur est dans la **fonction `percentage()`**

```terminal
File "program.py", line 2, in percentage
    return score / total * 100
```

- L\'erreur est de type **division par zéro**

```lang-plaintext
ZeroDivisionError: division by zero
```

## Types d'erreur

- On peut considérer **trois types d\'erreur** possibles
  - **Erreur de syntaxe** [Code source mal formé]{.small}
  - **Erreur d\'exécution** [Exécution d\'une opération
    interdite]{.small}
  - **Erreur logique** [Programme ne calcule pas ce qu\'il
    faut]{.small}
- Le troisième type est le plus **difficile à déceler** [Il faut
  pouvoir vérifier que le programme fait ce qu\'il faut]{.small}

## Erreur de syntaxe

- Erreur détectée **lors de l\'exécution** de l\'instruction [Python
  est en effet un langage interprété]{.small}
- Code source du programme contient des **fautes de syntaxe** [Un peu
  comme l\'orthographe en français]{.small}

```python
score = 12
if score > 10
  print('Vous avez réussi !')
```

```terminal
File "program.py", line 2
    if score > 10
                ^
SyntaxError: expected ':'
```

## Erreur d\'exécution

- Erreur produite **durant l\'exécution** d\'une opération interdite
  [Division par zéro, indice en dehors d\'une liste\...]{.small}

```python
data = [1, 2, 3]

i = 0
while i <= len(data):
  print(data[i])
  i += 1
```

```terminal
1
2
3
Traceback (most recent call last):
    File "program.py", line 5, in <module>
        print(data[i])
IndexError: list index out of range
```

## Erreur logique

- Le programme ne **calcule pas ce qu\'il faut** [Aucune erreur de
  syntaxe ou d\'exécution ne se produit]{.small}

```python
def perimeter(length: float, width: float) -> float:
  return length + width * 2

print(perimeter(2, 1))
```

```terminal
4
```

- Il peut être utile de décrire clairement ce que la fonction devrait
  faire [Pour s\'assurer qu\'il y a bien une erreur]{.small}

## Documentation

- La **documentation** d\'une fonction décrit le résultat produit
  [Permet à un utilisateur d\'interpréter le résultat de
  l\'appel]{.small}
- Description de **conditions** sur les paramètres [Et de la valeur de
  retour si elles ne sont pas satisfaites]{.small}

```python
def percentage(score: float, total: int) -> Optional[float]:
  """Returns a grade as a percentage

  Args:
    `score`: the obtained grade. Must be positive and `<= total`
    `total`: the maximum grade obtainable. Must be positive

  Returns:
    the computed percentage
  """
  return score / total * 100
```

## Documentation

- Conditions de la documentation **non-respectées** [Le programme continue de fonctionner avec une valeur illogique]{.small}

```python
print(percentage(15, 20), '%')
print(percentage(22, 20), '%')
```

```terminal
75%
110%
```

- Erreur **de logique**

## Programmation défensive

- Vérification de **conditions sensées être vraies** avec
  `assert` [On vérifie notamment les conditions sur les
  paramètres avec cette instruction]{.small}
- Un programme **doit fonctionner** si on supprime les assertions
  [Elles ne doivent pas faire partie du code fonctionnel]{.small}

```python
def percentage(score: float, total: int) -> float:
  """Returns a grade as a percentage

  Args:
    `score`: the obtained grade. Must be positive and `<= total`
    `total`: the maximum grade obtainable. Must be positive

  Returns:
    the computed percentage
  """
  assert total > 0, 'total must be positive'
  assert 0 <= score, 'score must be positive'
  assert score <= total, 'score must be <= total'

  return score / total * 100
```

## Instruction `assert`

- **Arrêt du programme** en cas d\'erreur d\'assertion [Avec affichage
  d\'un message d\'information]{.small}
- Empêche des erreurs qui **ne devraient pas** se produire [Le
  programme peut être modifié pour les éviter]{.small}
- **Augmente nos chances d'avoir une erreur d'exécution au lieu d'une erreur de logique** [Ce qui est trés désirable]{.small}

```python
print(percentage(15, 20), '%')
print(percentage(22, 20), '%')
```

```terminal
75.0 %
Traceback (most recent call last):
    File "program.py", line 17, in <module>
        print(percentage(22, 20), '%')
    File "program.py", line 13, in percentage
        assert score <= total, 'score must be <= total'
AssertionError: score must be <= total
```

- Se pratique sur du code dont vous avez **le contrôle**

## Gestion d'erreurs

- Prendre en compte **tous les cas** possibles d\'exécution [Utilisation de `if-else`]{.small}

```python
from typing import Optional

def percentage(score: float, total: int) -> Optional[float]:
  """Returns a grade as a percentage

  Args:
    `score`: the obtained grade
    `total`: the maximum grade obtainable

  Returns:
    the computed percentage
    if `total <= 0`, `score < 0` or `score > total`, then returns `None`
  """
  if total > 0 and (0 <= score <= total):
    return score / total * 100
  return None
```

```terminal
Alexis a obtenu 90.0 %
Sébastien a obtenu None %
```

- Impact sur l'**annotation du type de retour** de la fonction
- Doit être pratiquée pour interface avec l\'extérieur [Vérification de toutes données hors contrôle]{.small}

## Mecanisme d'exceptions

- Gestion d'un code qui **pourrait planter**
- **Code risqué** placé dans un bloc `try` [N\'y placer
  que le code risqué et tout code qui en dépend]{.small}
- **Erreurs capturées** dans le bloc `except` [Y placer
  le code à exécuter en cas de capture d\'une erreur]{.small}

```python
from datetime import *

birthyear = input('Année de naissance ? ')

try:
  now = datetime.now()
  age = now.year - int(birthyear)
  print('Tu as', age, 'ans')
except:
  print('Erreur')
```

## Instruction `try-except`

- Si l\'utilisateur entre un nombre entier, **pas d\'erreurs**

```terminal
Année de naissance ? 1982
Tu as 36 ans
```

- Si l\'utilisateur n\'entre pas un nombre entier, **erreur capturée**

```terminal
Année de naissance ? BLA
Erreur
```

## Validité d\'une donnée

- Demande d\'une valeur à l\'utilisateur **en boucle** [Tant que la
  valeur demandée n\'est pas du bon type]{.small}

```python
from datetime import *

valid = False
while not valid:
  birthyear = input('Année de naissance ? ')
  try:
    birthyear = int(birthyear)
    valid = True
  except:
    print('Veuillez entrer un nombre entier')

now = datetime.now()
age = now.year - birthyear
print('Tu as', age, 'ans')
```

## Vérifier le type d\'erreur

- Plusieurs **types d\'erreur** sont possibles [Division par zéro,
  erreur de conversion\...]{.small}
- Toutes les erreurs sont capturées par l\'**instruction
  `except`** [Possibilité de capturer les erreurs de
  manière spécifique]{.small}

```python
try:
  a = int(input('a ? '))
  b = int(input('b ? '))
  print(a, '/', b, '=', a / b)
except:
  print('Erreur')
```

## Vérifier le type d\'erreur

- Une **exception** est un objet qui représente une erreur [L\'objet
  est généralement de type `Exception`]{.small}
- Types spécifiques pour différencier les **types d\'erreurs**
  [ZeroDivisionError, ValueError\...]{.small}

```python
import sys

try:
  a = int(input('a ? '))
  b = int(input('b ? '))
  print(a, '/', b, '=', a / b)
except Exception as e:
  print(type(e))
  print(e)
```

## Vérifier le type d\'erreur

- Division par zéro

```terminal
a ? deux
<class 'ValueError'>
invalid literal for int() with base 10: 'deux'
```

- Erreur de conversion

```terminal
a ? 2
b ? 0
<class 'ZeroDivisionError'>
division by zero
```

## Capturer une erreur spécifique

- **Gestionnaire d\'erreurs** différent pour chaque type d\'erreur [Il
  suffit de déclarer un bloc `except` par erreur à
  capturer]{.small}
- Attention à l\'**ordre de capture** (de haut en bas) [Il faut
  classer les erreurs de la plus à la moins spécificité]{.small}

```python
import sys

try:
  a = int(input('a ? '))
  b = int(input('b ? '))
  print(a, '/', b, '=', a / b)
except ValueError:
  print('Erreur de conversion')
except ZeroDivisionError:
  print('Division par zéro')
except:
  print('Autre erreur')
```

## Capturer une erreur spécifique

```python
import sys

try:
  a = int(input('a ? '))
  b = int(input('b ? '))
  print(a, '/', b, '=', a / b)
except Exception:
  print('Erreur')
except ValueError:
  print('Erreur de conversion')
except ZeroDivisionError:
  print('Division par zéro')
```

```terminal
a ? 2
b ? 0
Autre erreur
```

## Information sur une erreur

- L\'**objet de l\'exception** peut contenir de l\'information [On
  peut accéder à des propriétés ou à des méthodes]{.small}

```python
try:
  import mymod
except SyntaxError as e:
  print(e)
  print('File:', e.filename)
  print('Line:', e.lineno)
  print('Text:', e.text)
```

```terminal
can't assign to literal (mymod.py, line 1)
File: /Users/combefis/Desktop/mymod.py
Line: 1
Text: 2 = x
```

## Gestionnaire d\'erreurs partagé

- **Même gestionnaire d\'erreurs** pour différents types [Tuple
  d\'exception fourni à l\'instruction `except`{.lang-python}]{.small}

```python
try:
  a = int(input('a ? '))
  b = int(input('b ? '))
  print(a / b)
except (ZeroDivisionError, ValueError):
  print('Erreur de calcul')
except:
  print('Erreur')
```

```terminal
a ? 1
b ? 0
Erreur de calcul
```

## Propagation d\'erreur

- Une **erreur non capturée** remonte les appels de fonction [Jusqu\'à
  être attrapée ou remonté jusqu\'au bout]{.small}
- La **trace d\'erreur** montre le trajet pris par l\'exception [En la
  lisant à l\'envers, on peut suivre la propagation]{.small}

## Propagation d\'erreur

- **Passage** de `fun`{.lang-python} à `compute`{.lang-python} au
  programme principal

```python
def fun():
  print(1 / 0)

def compute():
  fun()

compute()
```

```terminal
Traceback (most recent call last):
    File "program.py", line 7, in <module>
        compute()
    File "program.py", line 5, in compute
        fun()
    File "program.py", line 2, in fun
        print(1 / 0)
ZeroDivisionError: division by zero
```

## Propagation d\'erreur

- Exception **interceptée** dans la fonction `compute`{.lang-python}

```python
def fun():
  print(1 / 0)

def compute():
  try:
    fun()
  except:
    print('Erreur.')

compute()
```

```terminal
Erreur.
```

<!--## Bloc `finally`-->
<!---->
<!--- Le bloc `finally`{.lang-python} s\'exécute **dans tous les cas**-->
<!--  [Après le bloc `try`{.lang-python} ou l\'`except`{.lang-python} en-->
<!--  cas d\'erreur]{.small}-->
<!--- Notamment utilisé pour faire du **nettoyage** [Par exemple pour-->
<!--  libérer des ressources qui ont été allouées]{.small}-->
<!---->
<!--## Bloc `finally`-->
<!---->
<!--- Bloc `finally` **exécuté à tous les coups** avant la-->
<!--  fin du calcul-->
<!---->
<!--```python-->
<!--print('Début du calcul.')-->
<!--try:-->
<!--  a = int(input('a ? '))-->
<!--  b = int(input('b ? '))-->
<!--  print('Résultat :', a / b)-->
<!--except:-->
<!--  print('Erreur.')-->
<!--finally:-->
<!--  print('Nettoyage de la mémoire.')-->
<!--  print('Fin du calcul.')-->
<!--```-->
<!---->
<!--```terminal-->
<!--Début du calcul.-->
<!--a ? 2-->
<!--b ? 8-->
<!--Résultat : 0.25-->
<!--Nettoyage de la mémoire.-->
<!--Fin du calcul.-->
<!--```-->

## Générer une erreur

- L\'**instruction `raise`{.lang-python}** permet de générer une
  erreur [Création d\'un objet du type de l\'exception]{.small}

```python
def fact(n: int) -> int:
  """Compute the factorial of `n`

  Args:
      `n`: a positive integer

  Returns:
      The factorial of `n`

  Raises:
      ArithmeticError: if `n` is negative
  """
  if n < 0:
    raise ArithmeticError()
  if n == 0:
    return 1
  return n * fact(n - 1)

try:
  n = int(input('Entrez un nombre : '))
  print(fact(n))
except ArithmeticError:
  print('Veuillez entrer un nombre positif.')
except:
  print('Veuillez entrer un nombre.')
```

```terminal
Entrez un nombre : -12
Veuillez entrer un nombre positif.
```

## Définir une erreur

- **Définition d\'une erreur** en définissant une nouvelle classe [La
  classe est créée à partir de la classe
  `Exception`]{.small}
- L\'**instruction `pass`** ne fait rien

```python
from math import sqrt

class NoRootException(Exception):
  pass

def trinomialroots(a: float, b: float, c: float) -> tuple[float, ...]:
  """Compute the real roots of a second-degree equation

  Args:
      `a`, `b` and `c`: The coefficients of the second-degree equation

  Returns:
      A tuple with one or two real roots

  Raises:
      NoRootException: if the equation has no real roots
  """
  delta = b ** 2 - 4 * a * c
  if delta < 0:
    raise NoRootException()
  if delta == 0:
    return (-b / (2 * a),)
  x1 = (-b + sqrt(delta)) / (2 * a)
  x2 = (-b - sqrt(delta)) / (2 * a)
  return (x1, x2)
```

## Définir une erreur

- **Capture de la nouvelle erreur** avec l\'instruction
  `except`{.lang-python} [Le nouveau type d\'erreur est maintenant
  connu par Python]{.small}

```python
try:
  print(trinomialroots(1, 0, 2))
except NoRootException:
  print('Pas de racine réelle.')
except:
  print('Erreur')
```

```terminal
Pas de racine réelle.
```

## Exception paramétrée

- Stockage d\'un **paramètre** dans l\'exception

```python
from math import sqrt

class NoRootException(Exception):
  def __init__(self, delta):
      self.delta = delta

def trinomialroots(a: float, b: float, c: float) -> tuple[float, ...]:
  """Compute the real roots of a second-degree equation

  Args:
      `a`, `b` and `c`: The coefficients of the second-degree equation

  Returns:
      A tuple with one or two real roots

  Raises:
      NoRootException: if the equation has no real roots
  """
  delta = b ** 2 - 4 * a * c
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
  print(f'Pas de racine réelle (delta = {e.delta})')
except:
  print('Erreur')
```

```terminal
Pas de racine réelle (delta = -8)
```

## Exception avec `dataclass`

```python
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

```
