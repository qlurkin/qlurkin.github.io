---
title: Cours 4
subtitle: Mécanisme d'exceptions et lecture de fichiers
type: deck
author: Quentin Lurkin
---

## Trace d'erreur

- Une erreur d\'exécution imprime une **trace d\'erreur** [Chemin d\'exécution
  complet qui a provoqué l\'erreur]{.small}

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

- L\'erreur a comme **origine** l\'exécution de l\'instruction en ligne 5

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
  - **Erreur d\'exécution** [Exécution d\'une opération interdite]{.small}
  - **Erreur logique** [Programme ne calcule pas ce qu\'il faut]{.small}
- Le troisième type est le plus **difficile à déceler** [Il faut pouvoir
  vérifier que le programme fait ce qu\'il faut]{.small}

## Erreur de syntaxe

- Erreur détectée **lors de l\'exécution** de l\'instruction [Python est en
  effet un langage interprété]{.small}
- Code source du programme contient des **fautes de syntaxe** [Un peu comme
  l\'orthographe en français]{.small}

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

- Erreur produite **durant l\'exécution** d\'une opération interdite [Division
  par zéro, indice en dehors d\'une liste\...]{.small}

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

- Le programme ne **calcule pas ce qu\'il faut** [Aucune erreur de syntaxe ou
  d\'exécution ne se produit]{.small}

```python
def perimeter(length: float, width: float) -> float:
  return length + width * 2

print(perimeter(2, 1))
```

```terminal
4
```

- Il peut être utile de décrire clairement ce que la fonction devrait faire
  [Pour s\'assurer qu\'il y a bien une erreur]{.small}

## Documentation

- La **documentation** d\'une fonction décrit le résultat produit [Permet à un
  utilisateur d\'interpréter le résultat de l\'appel]{.small}
- Description de **conditions** sur les paramètres [Et de la valeur de retour si
  elles ne sont pas satisfaites]{.small}

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

- Conditions de la documentation **non-respectées** [Le programme continue de
  fonctionner avec une valeur illogique]{.small}

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

- Vérification de **conditions sensées être vraies** avec `assert` [On vérifie
  notamment les conditions sur les paramètres avec cette instruction]{.small}
- Un programme **doit fonctionner** si on supprime les assertions [Elles ne
  doivent pas faire partie du code fonctionnel]{.small}

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

- **Arrêt du programme** en cas d\'erreur d\'assertion [Avec affichage d\'un
  message d\'information]{.small}
- Empêche des erreurs qui **ne devraient pas** se produire [Le programme peut
  être modifié pour les éviter]{.small}
- **Augmente nos chances d'avoir une erreur d'exécution au lieu d'une erreur de
  logique** [Ce qui est trés désirable]{.small}

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

- Prendre en compte **tous les cas** possibles d\'exécution [Utilisation de
  `if-else`]{.small}

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
- Doit être pratiquée pour interface avec l\'extérieur [Vérification de toutes
  données hors contrôle]{.small}

## Mecanisme d'exceptions

- Gestion d'un code qui **pourrait planter**
- **Code risqué** placé dans un bloc `try` [N\'y placer que le code risqué et
  tout code qui en dépend]{.small}
- **Erreurs capturées** dans le bloc `except` [Y placer le code à exécuter en
  cas de capture d\'une erreur]{.small}

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

- Demande d\'une valeur à l\'utilisateur **en boucle** [Tant que la valeur
  demandée n\'est pas du bon type]{.small}

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

- Plusieurs **types d\'erreur** sont possibles [Division par zéro, erreur de
  conversion\...]{.small}
- Toutes les erreurs sont capturées par l\'**instruction `except`** [Possibilité
  de capturer les erreurs de manière spécifique]{.small}

```python
try:
  a = int(input('a ? '))
  b = int(input('b ? '))
  print(a, '/', b, '=', a / b)
except:
  print('Erreur')
```

## Vérifier le type d\'erreur

- Une **exception** est un objet qui représente une erreur [L\'objet est
  généralement de type `Exception`]{.small}
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

- **Gestionnaire d\'erreurs** différent pour chaque type d\'erreur [Il suffit de
  déclarer un bloc `except` par erreur à capturer]{.small}
- Attention à l\'**ordre de capture** (de haut en bas) [Il faut classer les
  erreurs de la plus à la moins spécificité]{.small}

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

- L\'**objet de l\'exception** peut contenir de l\'information [On peut accéder
  à des propriétés ou à des méthodes]{.small}

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

- **Même gestionnaire d\'erreurs** pour différents types [Tuple d\'exception
  fourni à l\'instruction `except`{.lang-python}]{.small}

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

- Une **erreur non capturée** remonte les appels de fonction [Jusqu\'à être
  attrapée ou remonté jusqu\'au bout]{.small}
- La **trace d\'erreur** montre le trajet pris par l\'exception [En la lisant à
  l\'envers, on peut suivre la propagation]{.small}

## Propagation d\'erreur

- **Passage** de `fun`{.lang-python} à `compute`{.lang-python} au programme
  principal

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

- L\'**instruction `raise`{.lang-python}** permet de générer une erreur
  [Création d\'un objet du type de l\'exception]{.small}

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

- **Définition d\'une erreur** en définissant une nouvelle classe [La classe est
  créée à partir de la classe `Exception`]{.small}
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

- **Capture de la nouvelle erreur** avec l\'instruction `except`{.lang-python}
  [Le nouveau type d\'erreur est maintenant connu par Python]{.small}

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

## Fichier

- Un **fichier** stocke des informations sur le disque dur [Il est créé,
  modifié, supprimé]{.small}
- Manipulation des fichiers grâce au **système d\'exploitation**
  [L\'interpréteur fait le relais avec Linux, Windows, Mac OS X\...]{.small}
- Des **informations** sont associées à un fichier [Nom, taille, date de
  création, dernière date de modification\...]{.small}

## Type de fichier

- Au plus bas niveau, un fichier est une **séquence de bits**
  (`0`{.lang-plaintext} et `1`{.lang-plaintext}) [La séquence doit être
  interprétée pour en obtenir le sens]{.small}
- **Deux types** de fichiers manipulés à des niveaux différents
  - Fichier texte est une séquence de caractères
  - Fichier binaire est une séquence d\'octets (8 bits)

## Chemin

- Fichier identifié sur une machine à l\'aide de son **chemin** [Identifie
  l\'endroit où se situe le fichier]{.small}
- **Deux façons** de spécifier un chemin
  - Chemin absolu à partir de la racine [`C:\`{.lang-plaintext} (Windows),
    `/`{.lang-plaintext} (OSX et Linux)]{.small}
  - Chemin relatif à partir du répertoire courant

| Chemin relatif             | Chemin absolu                            |
| -------------------------- | ---------------------------------------- |
| data.txt                   | C:\\Users\\lur\\Desktop\\data.txt        |
| src\\program.py            | C:\\Users\\lur\\Desktop\\src\\program.py |
| ..\\image.png              | C:\\Users\\lur\\image.png                |
| ..\\movies\\hamburgers.mp4 | C:\\Users\\lur\\movies\\hamburgers.mp4   |

## Navigation en ligne de commande

Pour passer d\'un répertoire à l\'autre dans une console de commandes

- `pwd`{.lang-plaintext}: Affiche le chemin du répertoire courant [Base des
  chemins relatifs]{.small}
- `cd`{.lang-plaintext} _(suivi d\'un chemin)_: Change de répertoire courant
  [`..`{.lang-plaintext} pour le répertoire parent]{.small}
- `dir`{.lang-plaintext} _(Windows)_ ou `ls`{.lang-plaintext} _(OSX et Linux)_:
  Liste le contenu du répertoire

## Ouverture d\'un fichier

- Pour manipuler un fichier, il faut d\'abord l\'**ouvrir** [On utilise la
  fonction `open`{.lang-python}, qui renvoie un identifiant de fichier]{.small}
- **Erreurs** possibles lors de l\'ouverture [Fichier introuvable, ...]{.small}

```python
try:
  file = open('data.txt')
except FileNotFoundError:
  print('Le fichier est introuvable')
except IOError:
  print("Erreur d'ouverture")
```

## Mode d\'ouverture

- Par défaut, fichier ouvert en **lecture seule** [Tout ce qu\'on peut faire
  c\'est donc lire le contenu du fichier]{.small}
- On peut spécifier le **mode d\'ouverture** désiré [Avec le deuxième paramètre
  de la fonction `open()`]{.small}

```python
try:
  file = open('data.txt', 'w')         # Ouverture en écriture
except IOError:
  print("Erreur d'ouverture")
```

## Mode d\'ouverture

- Mode d\'ouverture définit avec des **caractères**

| Caractère | Description                                          |
| --------- | ---------------------------------------------------- |
| `r`       | Lecture (par défaut)                                 |
| `w`       | Écriture (avec remise à zéro)                        |
| `x`       | Création exclusive (erreur si fichier déjà existant) |
| `a`       | Écriture (avec ajout à la fin)                       |
| `b`       | Mode binaire                                         |
| `t`       | Mode texte (par défaut)                              |

```python
try:
  file = open('data.txt', 'rt')         # Mode par défaut
except FileNotFoundError:
  print('Le fichier est introuvable')
except IOError:
  print("Erreur d'ouverture")
```

## Fermeture d\'un fichier

- Une fois les opérations finies, il faut **fermer** le fichier [On utilise la
  méthode `close` avec l\'identifiant de fichier]{.small}
- **Libération des ressources** et sauvegarde sur disque [Le système
  d\'exploitation limite le nombre de fichiers ouverts]{.small}

```python
try:
  file = open('data.txt')
  file.close()                          # Fermeture du fichier
except FileNotFoundError:
  print('Le fichier est introuvable')
except IOError:
  print("Erreur d'ouverture")
```

## Lecture

- **Lecture** intégrale du fichier comme une chaîne de caractères [On utilise la
  méthode `read` avec l\'identifiant de fichier]{.small}
- La lecture peut échouer et provoquer une **exception `IOError`** [Par exemple
  si le disque est déconnecté pendant la lecture]{.small}

```python
try:
  file = open('data.txt')
  print(file.read())
  file.close()
except FileNotFoundError:
  print('Le fichier est introuvable')
except IOError:
  print("Erreur d'entrée/sortie")
```

## Instruction `finally`

- En cas d\'erreur, le fichier pourrait **ne pas être fermé** [Car l\'exécution
  du code saute directement dans l\'`except`]{.small}
- **Instruction `finally`** exécutée dans tous les cas [Après la fin du bloc
  `try` ou après un `except` éventuel]{.small}

```python
try:
  file = open('data.txt')
  print(file.read())
except FileNotFoundError:
  print('Le fichier est introuvable')
except IOError:
  print("Erreur d'ouverture")
finally:
  file.close()
```

## Instruction `finally`

- **Bug** dans le code précédent si le fichier n\'a pas su être ouvert [La
  variable `file` ne sera pas initialisée et `close` pas disponible]{.small}
- On utilise une instruction **`try/finally`** additionnelle

```python
try:
  file = open('data.txt')
  try:
    print(file.read())
  finally:
    file.close()
except FileNotFoundError:
  print('Le fichier est introuvable')
except IOError:
  print("Erreur d'entrée/sortie")
```

## Instruction `with`

- **Instruction `with`** pour fermeture propre des ressources [L\'appel à
  `close` sera fait automatiquement]{.small}
- Il faut garder le **`try/except`** pour les `IOError`

```python
try:
  with open('data.txt') as file:
    print(file.read())
except FileNotFoundError:
  print('Le fichier est introuvable')
except IOError:
  print("Erreur d'entrée/sortie")
```

## Écriture

- **Écriture** en ajoutant des chaines de caractères au fichier [On utilise la
  fonction `write` avec l\'identifiant de fichier]{.small}
- L\'écriture peut échouer et provoquer une **exception `IOError`** [Par exemple
  si l\'espace disque devient plein pendant l\'écriture]{.small}

```python
with open('out.txt', 'w') as file:
  file.write('Table de 10\n')
  for i in range(10):
    file.write(f'{i} x 10 = {i*10}\n')
```

## Copie d\'un fichier

- **Copie** en faisant une lecture puis écriture du contenu lu [Deux instruction
  `with` imbriquées]{.small}
- Si le fichier destination existe déjà, il est **effacé** [Il faut utiliser le
  mode `x` au lieu de `w` pour empêcher cela]{.small}

```python
with open('data.txt', 'r') as src, open('copy.txt', 'w') as dest:
  dest.write(src.read())
```

## Lecture ligne par ligne

- Utilisation d\'un **itérateur** sur le fichier ouvert, avec `for` [Parcours
  ligne par ligne, avec le retour de ligne inclus]{.small}
- Fonction `rstrip` pour retirer les caractères blancs de droite [right
  strip]{.small}

:::{.file-title} data.txt :::

```plain
Facebook:lur@ecam.be:lurk:8dj,Sj0m1
Skype:mar@ecam.be:cedou:arduino
Facebook:fle@ecam.be:fingerfood:b8ur,g2er
```

```python
with open('data.txt') as file:
  for line in file:
    cleaned = line.rstrip()
    tokens = cleaned.split(':')
    print(f'Compte {tokens[0]} de {tokens[2]} (mode de passe : {tokens[3]})')
```

```terminal
Compte Facebook de lurk (mode de passe : 8dj,Sj0m1)
Compte Skype de cedou (mode de passe : arduino)
Compte Facebook de fingerfood (mode de passe : b8ur,g2er)
```

## Lecture ligne par ligne

- L\'**itérateur** est un raccourci d\'appel de `readline` [Lis une ligne s\'il
  en reste à lire dans le fichier]{.small}
- Renvoie une **chaine de caractères vide** lorsqu\'au bout du fichier [Pratique
  lorsqu\'on sait combien de lignes lire]{.small}

```python
with open('data.txt') as file:
  line = file.readline()
  while line != '':
    cleaned = line.rstrip()
    tokens = cleaned.split(':')
    print(f'Compte {tokens[0]} de {tokens[2]} (mode de passe : {tokens[3]})')
    line = file.readline()
```

## Lecture ligne par ligne

- La fonction `readlines` lis l\'**intégralité des lignes** en une traite [La
  fonction renvoie une liste de chaines de caractères]{.small}
- On peut **supprimer la variable** `cleaned` inutile [En enchainant directement
  les appels à `rstrip` et `split`{.lang-python}]{.small}

```python
with open('data.txt') as file:
  content = file.readlines()

for line in content:
  tokens = line.rstrip().split(':')
  print(f'Compte {tokens[0]} de {tokens[2]} (mode de passe : {tokens[3]})')
```

## Lecture ligne par ligne

- **Amélioration du code** avec une fonction de formatage [On définit une
  fonction qui formate une ligne]{.small}
- On définit une liste par compréhension et on joint ses éléments [Jointure des
  éléments d\'une liste réalisée avec fonction `join`]{.small}

```python
def format(line: str) -> str:
  tokens = line.rstrip().split(':')
  return f'Compte {tokens[0]} de {tokens[2]} (mode de passe : {tokens[3]})'

with open('data.txt') as file:
  content = file.readlines()

print('\n'.join([format(line) for line in content]))
```

## Exception

- L\'erreur principale d\'**entrée/sortie** est `IOError` [On peut se limiter à
  capturer cette unique erreur]{.small}
- Erreur **spécialisée** selon le type précis
  - `FileNotFoundError`, si le fichier n\'est pas trouvé
  - `FileExistsError`, si le fichier existe déjà
  - `PermissionError`, si l\'utilisateur n\'a pas les droits d\'accès
  - `IsADirectoryError`, si le fichier est en fait un dossier

## Encodage

- Les caractères sont **stockés au format binaire** dans l\'ordinateur [Table de
  correspondance associant un entier à chaque caractère]{.small}
- La **table de caractères** ASCII (iso-646) contient 128 caractères [Table
  suffisante pour des textes en anglais]{.small}

<div style="font-size: 50%; margin: 0 auto;">

|     | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | A   | B   | C   | D   | E   | F   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0   | NUL | SOH | STH | ETH | EOT | ENQ | ACK | BEL | BS  | HT  | LF  | VT  | FF  | CR  | SO  | SI  |
| 1   | DLE | DC1 | CD2 | DC3 | DC4 | NAK | SYN | ETB | CAN | EM  | SUB | ESC | FS  | GS  | RS  | US  |
| 2   | spc | !   | \"  | \#  | \$  | \%  | &   | \'  | (   | )   | \*  | \+  | ,   | \-  | .   | /   |
| 3   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | :   | ;   | \<  | =   | \>  | ?   |
| 4   | @   | A   | B   | C   | D   | E   | F   | G   | H   | I   | J   | K   | L   | M   | N   | O   |
| 5   | P   | Q   | R   | S   | T   | U   | V   | W   | X   | Y   | Z   | \[  | \\  | \]  | \^  | \_  |
| 6   | \`  | a   | b   | c   | d   | e   | f   | g   | h   | i   | j   | k   | l   | m   | n   | o   |
| 7   | p   | q   | r   | s   | t   | u   | v   | w   | x   | y   | z   | {   | \|  | }   | \~  | DEL |

</div>

## Encodage

- La fonction `ord` donne le **code** d\'un caractère [Sous forme d\'un nombre
  entier]{.small}
- La fonction `chr` donne le **caractère** correspondant à un code [Sous forme
  d\'une chaine de caractères]{.small}

```python
print(chr(65))           # Affiche A
print(ord('z'))          # Affiche 90
```

## Unicode et UTF-8

- **Unicode** (ISO 10646) est un standard d\'échange de texte [Associe à tout
  caractère un nom et un identifiant numérique]{.small}
- **UTF-8** est un encodage pour les caractères Unicode [Python travaille par
  défaut avec l\'encodage UTF-8]{.small}

![Parcourir les caractères Unicode en ligne :
<http://unicode-table.com>](images/unicode-characters.png)

## Choisir l\'encodage

- On spécifie l\'**encodage des fichiers** avec le paramètre `encoding`

```python
with open('contains_unicode.txt', 'w', encoding='utf8') as file:
  file.write('😆')

with open('contains_unicode.txt', 'r', encoding='ascii') as file:
  print(file.read())
```

```terminal
Traceback (most recent call last):
    File "program.py", line 5, in
        print(file.read())
    File "/Library/Frameworks/Python.framework/Versions/3.4/lib/python3.4/encodings/ascii.py", line 26, in decode
        return codecs.ascii_decode(input, self.errors)[0]
UnicodeDecodeError: 'ascii' codec can't decode byte 0xf0 in position 11: ordinal not in range(128)
```
