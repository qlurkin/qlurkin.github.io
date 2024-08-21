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

## Trace d\'erreur

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

## Gestion d\'erreurs

- Prendre en compte **tous les cas** possibles d\'exécution [Prévoir une valeur de retour spéciale en cas d\'erreur]{.small}

```python
from typing import Optional

def percentage(score: float, total: int) -> Optional[float]:
    if total != 0:
        return score / total * 100
    return None
```

```terminal
Alexis a obtenu 90.0 %
Sébastien a obtenu None %
```

## Types d\'erreur

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
SyntaxError: invalid syntax
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

## Instruction `assert`

- Vérification de **conditions sensées être vraies** avec
  `assert`{.lang-python} [On vérifie notamment les conditionssur les
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

## Programmation défensive

- **Programmation défensive**
  - Utilisation de l\'instruction `assert`
  - On suppose les préconditions remplies
  - Peut être pratiquée au sein d\'un module [Se pratique sur du code dont vous avez le contrôle]{.small}
- **Gestion d\'erreur**
  - Utilisation de l\'instruction `if-else`
  - On vérifie les conditions nécessaires sur les données
  - Doit être pratiquée pour interface avec l\'extérieur [Vérification de toutes données hors contrôle]{.small}

## Mecanisme d'exceptions

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

```lang-plaintext
                    Année de naissance ? 1982
                    Tu as 36 ans

```

- Si l\'utilisateur n\'entre pas un nombre entier, **erreur capturée**

```lang-plaintext
                    Année de naissance ? BLA
                    Erreur

```

## Validité d\'une donnée

- Demande d\'une valeur à l\'utilisateur **en boucle** [Tant que la
  valeur demandée n\'est pas du bon type]{.small}

```lang-python
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

## Vérifier le type d\'erreur (1)

- Plusieurs **types d\'erreur** sont possibles [Division par zéro,
  erreur de conversion\...]{.small}
- Toutes les erreurs sont capturées par l\'**instruction
  `except`{.lang-python}** [Possibilité de capturer les erreurs de
  manière spécifique]{.small}

```lang-python
            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print(a, '/', b, '=', a / b)
            except:
                print('Erreur')

```

## Vérifier le type d\'erreur (2)

- Une **exception** est un objet qui représente une erreur [L\'objet
  est généralement de type `Exception`{.lang-python}]{.small}
- Types spécifiques pour différencier les **types d\'erreurs**
  [ZeroDivisionError, ValueError\...]{.small}

```lang-python
            import sys

            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print(a, '/', b, '=', a / b)
            except Exception as e:
                print(type(e))
                print(e)

```

## Vérifier le type d\'erreur (3)

- Division par zéro

```lang-plaintext
                    a ? deux
                    <class 'ValueError'>
                    invalid literal for int() with base 10: 'deux'

```

- Erreur de conversion

```lang-plaintext
                    a ? 2
                    b ? 0
                    <class 'ZeroDivisionError'>
                    division by zero

```

## Capturer une erreur spécifique (1)

- **Gestionnaire d\'erreurs** différent pour chaque type d\'erreur [Il
  suffit de déclarer un bloc `except`{.lang-python} par erreur à
  capturer]{.small}
- Attention à l\'**ordre de capture** (de haut en bas) [Il faut
  classer les erreurs de la plus à la moins spécificité]{.small}

```lang-python
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

## Capturer une erreur spécifique (2)

```lang-python
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

```lang-plaintext
            a ? 2
            b ? 0
            Autre erreur

```

## Information sur une erreur

- L\'**objet de l\'exception** peut contenir de l\'information [On
  peut accéder à des propriétés ou à des méthodes]{.small}

```lang-python
            try:
                import mymod
            except SyntaxError as e:
                print(e)
                print('File:', e.filename)
                print('Line:', e.lineno)
                print('Text:', e.text)

```

```lang-plaintext
            can't assign to literal (mymod.py, line 1)
            File: /Users/combefis/Desktop/mymod.py
            Line: 1
            Text: 2 = x

```

## Gestionnaire d\'erreurs partagé

- **Même gestionnaire d\'erreurs** pour différents types [Tuple
  d\'exception fourni à l\'instruction `except`{.lang-python}]{.small}

```lang-python
            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print(a / b)
            except (ZeroDivisionError, ValueError):
                print('Erreur de calcul')
            except:
                print('Erreur')

```

```lang-plaintext
            a ? 1
            b ? 0
            Erreur de calcul

```

## Propagation d\'erreur (1)

- Une **erreur non capturée** remonte les appels de fonction [Jusqu\'à
  être attrapée ou remonté jusqu\'au bout]{.small}
- La **trace d\'erreur** montre le trajet pris par l\'exception [En la
  lisant à l\'envers, on peut suivre la propagation]{.small}

## Propagation d\'erreur (2)

- **Passage** de `fun`{.lang-python} à `compute`{.lang-python} au
  programme principal

```lang-python
            def fun():
                print(1 / 0)

            def compute():
                fun()

            compute()

```

```lang-plaintext
            Traceback (most recent call last):
                File "program.py", line 7, in <module>
                    compute()
                File "program.py", line 5, in compute
                    fun()
                File "program.py", line 2, in fun
                    print(1 / 0)
            ZeroDivisionError: division by zero

```

## Propagation d\'erreur (3)

- Exception **interceptée** dans la fonction `compute`{.lang-python}

```lang-python
                def fun():
                    print(1 / 0)

                def compute():
                    try:
                        fun()
                    except:
                        print('Erreur.')

                compute()

```

```lang-plaintext
                Erreur.

```

## Bloc `finally` (1)

- Le bloc `finally`{.lang-python} s\'exécute **dans tous les cas**
  [Après le bloc `try`{.lang-python} ou l\'`except`{.lang-python} en
  cas d\'erreur]{.small}
- Notamment utilisé pour faire du **nettoyage** [Par exemple pour
  libérer des ressources qui ont été allouées]{.small}

## Bloc `finally` (2)

- Bloc `finally` **exécuté à tous les coups** avant la
  fin du calcul

```lang-python
            print('Début du calcul.')
            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print('Résultat :', a / b)
            except:
                print('Erreur.')
            finally:
                print('Nettoyage de la mémoire.')
                print('Fin du calcul.')

```

```lang-plaintext
            Début du calcul.
            a ? 2
            b ? 8
            Résultat : 0.25
            Nettoyage de la mémoire.
            Fin du calcul.

```

## Générer une erreur

- L\'**instruction `raise`{.lang-python}** permet de générer une
  erreur [Création d\'un objet du type de l\'exception]{.small}

```lang-python
            def fact(n):
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

```lang-plaintext
            Entrez un nombre : -12
            Veuillez entrer un nombre positif.

```

## Définir une erreur (1)

- **Définition d\'une erreur** en définissant une nouvelle classe [La
  classe est créée à partir de la classe
  `Exception`{.lang-python}]{.small}
- L\'**instruction `pass`{.lang-python}** ne fait rien

```lang-python
            from math import sqrt

            class NoRootException(Exception):
                pass

            def trinomialroots(a, b, c):
                delta = b ** 2 - 4 * a * c
                if delta < 0:
                    raise NoRootException()
                if delta == 0:
                    return (-b / (2 * a),)
                x1 = (-b + sqrt(delta)) / (2 * a)
                x2 = (-b - sqrt(delta)) / (2 * a)
                return (x1, x2)

```

## Définir une erreur (2)

- **Capture de la nouvelle erreur** avec l\'instruction
  `except`{.lang-python} [Le nouveau type d\'erreur est maintenant
  connu par Python]{.small}

```lang-python
            try:
                print(trinomialroots(1, 0, 2))
            except NoRootException:
                print('Pas de racine réelle.')
            except:
                print('Erreur')

```

```lang-plaintext
            Pas de racine réelle.

```

## Exception paramétrée

- Stockage d\'un **paramètre** dans l\'exception

```lang-python
            class NoRootException(Exception):
                def __init__(self, delta):
                    self.__delta = delta

                @property
                def delta(self):
                    return self.__delta

            def trinomialroots(a, b, c):
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
                print('Pas de racine réelle (delta = {})'.format(e.delta))
            except:
                print('Erreur')


```

```lang-plaintext
            Pas de racine réelle (delta = -8)

```

## Quand utiliser les erreurs ?

- **Toujours** vérifier les données provenant de l\'**extérieur**
  [Lecture avec `input`{.lang-python}, lecture d\'un
  fichier\...]{.small}
- Lors d\'un **appel à une fonction** d\'un module [Lire la
  documentation de la fonction, pour les erreurs potentielles]{.small}
- Quand on définit une **librairie** [Pour les fonctions publiques
  offertes à l\'extérieur]{.small}
