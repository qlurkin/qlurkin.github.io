---
title: Cours 3
subtitle: Travailler avec des listes et des fonctions
type: deck
css: style.css
---

## Traitement de l'information

- **Informatique** = traitement de l'information
- L'information prend souvent la forme de **listes**

```python
profs = [
  ['LUR', 'Quentin Lurkin'],
  ['LRG', 'André Lorge'],
  ['FKY', 'Martin Fockedey'],
  ['FLE', 'Clémence Flémal'],
]
```

- les traitements que l'on peut faire sur des listes tombent souvent dans l'une
  de ces **4 catégories**:
  - transformation,
  - filtrage,
  - accumulation,
  - tri.

## Transformation

- _**Mapping**_ en anglais
- Il s'agit d'appliquer le **même traitement** à tous les éléments d'une liste
- On obtient la **liste des résultats**
- **Exemple**

:::row

::::span6

```python
# Transforme une liste de profs
profs = [
  ['LUR', 'Quentin Lurkin'],
  ['LRG', 'André Lorge'],
  ['FKY', 'Martin Fockedey'],
]
```

::::

::::span6

```python
# En une liste de trigrammes
trigrams = [
  'LUR'
  'LRG',
  'FKY',
]

```

::::

:::

## Mapping: diagramme

- Mapping des profs en trigrammes:

```plantuml {.build}
@startuml
partition "map_to_trigrams ( **profs** ) " {
  start
  :**results** ← liste vide;
  while (Pour chaque valeur **prof** de la liste **profs**) is (**prof**)
    :Ajouter **prof[0]** à la fin de **results**;
  endwhile (fini)
  :renvoyer **results**;
  stop
}
@enduml
```

```python {.build}
from script import code_step, slide, ref
title = "Mapping: code"
src = """
def map_to_trigrams(profs):
  results = []
  for prof in profs:
    results.append(prof[0])
  return results

profs = [
  ['LUR', 'Quentin Lurkin'],
  ['LRG', 'André Lorge'],
  ['FKY', 'Martin Fockedey'],
]

trigrams = map_to_trigrams(profs)
print(trigrams)
"""
ram = {}
__output__ = []
__output__ += slide(title, code_step(src, [], ram))
ram["map_to_trigrams"] = ref("function")
__output__ += slide(title, code_step(src, [1], ram))
ram["profs"] = ref("r1")
ram[ref("r1")] = [ref("r2"), ref("r3"), ref("r4")]
ram[ref("r2")] = ["'LUR'", "'Quentin Lurkin'"]
ram[ref("r3")] = ["'LRG'", "'André Lorge'"]
ram[ref("r4")] = ["'FKY'", "'Martin Fockedey'"]
__output__ += slide(title, code_step(src, [7, 8, 9, 10, 11], ram))
fun = {"profs": ref("r1")}
ram["map_to_trigrams function"] = fun
__output__ += slide(title, code_step(src, [13], ram))
fun["results"] = ref("r5")
ram[ref("r5")] = "[]"
__output__ += slide(title, code_step(src, [2], ram))
fun["prof"] = ref("r2")
__output__ += slide(title, code_step(src, [3], ram))
ram[ref("r5")] = ["'LUR'"]
__output__ += slide(title, code_step(src, [4], ram))
fun["prof"] = ref("r3")
__output__ += slide(title, code_step(src, [3], ram))
ram[ref("r5")].append("'LRG'")
__output__ += slide(title, code_step(src, [4], ram))
fun["prof"] = ref("r4")
__output__ += slide(title, code_step(src, [3], ram))
ram[ref("r5")].append("'FKY'")
__output__ += slide(title, code_step(src, [4], ram))
fun[ref("return")] = ref('r5')
__output__ += slide(title, code_step(src, [5], ram))
ram["trigrams"] = ref('r5')
del(ram['map_to_trigrams function'])
__output__ += slide(title, code_step(src, [13], ram))
out = "['LUR', 'LRG', 'FKY']"
__output__ += slide(title, code_step(src, [14], ram, out))
```

## Transformation structure

- Un _mapping_ suit toujours la **même structure**:
  - création de la **nouvelle liste** initialement vide
  - **parcours** des éléments de la liste d'entrée
  - **ajout** des résultats à la fin de la nouvelle liste
- Autre exemple:

:::row

::::span6

```python
# Transforme une liste de profs

profs = [
  ['LUR', 'Quentin Lurkin'],
  ['LRG', 'André Lorge'],
  ['FKY', 'Martin Fockedey'],
]
```

::::

::::span6

```python
# En une liste de descriptions
# prêtes à être affichées
trigrams = [
  'Quentin Lurkin (LUR)'
  'André Lorge (LRG)',
  'Martin Fockedey (FKY)',
]
```

::::

:::

## Mapping: diagramme

```plantuml {.build}
@startuml
partition "map_to_desc ( **profs** ) " {
  start
  :**results** ← liste vide;
  while (Pour chaque valeur **prof** de la liste **profs**) is (**prof**)
    :Ajouter **"{prof[1]} ({prof[0]})"** à la fin de **results**;
  endwhile (fini)
  :renvoyer **results**;
  stop
}

@enduml
```

```python {.build}
from script import code_step, slide, ref
title = "Mapping: code"
src = """
def map_to_desc(profs):
  results = []
  for prof in profs:
    desc = f"{prof[1]} ({prof[0]})"
    results.append(desc)
  return results

profs = [
  ['LUR', 'Quentin Lurkin'],
  ['LRG', 'André Lorge'],
  ['FKY', 'Martin Fockedey'],
]

desc = map_to_trigrams(profs)
print(desc)
"""
ram = {}
disclaimer = "Toutes les références ne sont pas représentées"
__output__ = []
__output__ += slide(title, code_step(src, [], ram, disclaimer=disclaimer))
ram["map_to_desc"] = ref("function")
__output__ += slide(title, code_step(src, [1], ram, disclaimer=disclaimer))
ram["profs"] = "[...]"
__output__ += slide(title, code_step(src, [8, 9, 10, 11, 12], ram, disclaimer=disclaimer))
fun = {"profs": ref("ref global profs")}
ram["map_to_trigrams function"] = fun
__output__ += slide(title, code_step(src, [14], ram, disclaimer=disclaimer))
fun["results"] = "[]"
__output__ += slide(title, code_step(src, [2], ram, disclaimer=disclaimer))
fun["prof"] = ["'LUR'", "'Quentin Lurkin'"]
__output__ += slide(title, code_step(src, [3], ram, disclaimer=disclaimer))
fun["desc"] = "'Quentin Lurkin (LUR)'"
__output__ += slide(title, code_step(src, [4], ram, disclaimer=disclaimer))
fun["results"] = [fun['desc']]
__output__ += slide(title, code_step(src, [5], ram, disclaimer=disclaimer))
fun["prof"] = ["'LRG'", "'André Lorge'"]
__output__ += slide(title, code_step(src, [3], ram, disclaimer=disclaimer))
fun["desc"] = "'André Lorge (LRG)'"
__output__ += slide(title, code_step(src, [4], ram, disclaimer=disclaimer))
fun["results"].append(fun['desc'])
__output__ += slide(title, code_step(src, [5], ram, disclaimer=disclaimer))
fun["prof"] = ["'FKY'", "'Martin Fockedey'"]
__output__ += slide(title, code_step(src, [3], ram, disclaimer=disclaimer))
fun["desc"] = "'Martin Fockedey (FKY)'"
__output__ += slide(title, code_step(src, [4], ram, disclaimer=disclaimer))
fun["results"].append(fun['desc'])
__output__ += slide(title, code_step(src, [5], ram, disclaimer=disclaimer))
fun[ref("return")] = ref("ref results")
__output__ += slide(title, code_step(src, [6], ram, disclaimer=disclaimer))
ram["desc"] = fun['results']
del(ram["map_to_trigrams function"])
__output__ += slide(title, code_step(src, [14], ram, disclaimer=disclaimer))
out = "['Quentin Lurkin (LUR)', 'André Lorge (LRG)', 'Martin Fockedey (FKY)']"
__output__ += slide(title, code_step(src, [15], ram, out, disclaimer=disclaimer, term_size=0.38))
```

## Mapping

- Ces deux derniers exemples ont la **même structure**
- Seul le **contenu** de la boucle est différent
- Ce sont des _**mappings**_
- Il est possible de créer une fonction qui ne contient que la structure d'un
  _mapping_.
- Il nous faudra juste un moyen de passer **le traitement à réaliser**.

## Les fonctions sont des valeurs

- Une fonction peut être **assignée** à une variable

```python
from math import cos, pi

a = cos # Pas de parenthèse! On n'appelle pas la fonction.
        # On l'assigne à la variable `a`

a(pi/2) # `a` fait référence à la fonction `cos`. Si on
        # appelle `a`, on appelle `cos`
```

## Les fonctions sont des valeurs

- On peut passer une fonction **en paramètre** à une autre fonction

```python
# la structure d'un mapping. `processing` est la fonction
# qui sera appliquée aux éléments de `L`
def map(processing, L):
  results = []
  for elem in L:
    results.append(processing(elem))
  return results

# transforme 1 prof
def describe(prof):
  return f"{prof[1]} ({prof[0]})"

# on transforme tous les profs
descriptions = map(describe, profs)

def get_trigram(prof):
  return prof[0]

trigrams = map(get_trigram, profs)
```

## La fonction `map`

- La fonction `map` existe déjà en Python [Pas besoin de la créer]{.small}

## Le filtrage

- Il s'agit de créer une **nouvelle** liste ne contenant que les éléments de la
  liste d'entrée **respectant une certaine condition**.
- Exemple:

```python
# A partir de cette liste
numbers = [42, 165, 69, 18, 24]

# On veut obtenir celle-ci qui ne contient que les nombre pairs
even = [42, 18, 24]

# Ou ne garder que les nombres plus grands que 60
big = [165, 69]
```

## Filtrage: Diagramme

:::row

::::span6

```plantuml {.build}
@startuml
partition "keep_even ( **numbers** ) " {
  start
  :**results** ← liste vide;
  while (Pour chaque valeur **x** de la liste **numbers**) is (**x**)
    if (**x** est pair) then (oui)
      :Ajouter **x** à la fin de **results**;
    else (non)
    endif
  endwhile (fini)
  :renvoyer **results**;
  stop
}
@enduml
```

::::

::::span6

```plantuml {.build}
@startuml
partition "keep_big ( **numbers** ) " {
  start
  :**results** ← liste vide;
  while (Pour chaque valeur **x** de la liste **numbers**) is (**x**)
    if (**x** est plus grand que 60) then (oui)
      :Ajouter **x** à la fin de **results**;
    else (non)
    endif
  endwhile (fini)
  :renvoyer **results**;
  stop
}
@enduml
```

::::

:::

## La fonction `filter`

- La structure d'un **filtrage** est toujours la même
- Il est possible de créer une fonction qui ne contient que la structure du
  filtrage.
- On passera la **condition** sous forme d'une **fonction booléenne** renvoyant
  `True` pour les valeurs à garder.

## Code `filter` {.code}

```python
def filter(condition, L):
  res = []
  for item in L:
    if condition(item):
      res.append(item)
  return res

def is_even(x):
  return x % 2 == 0

def is_big(x):
  return x > 60

numbers = [42, 165, 69, 18, 24]

even = filter(is_even, L)
big = filter(is_big, L)
```

```python {.build}
from script import code_step, slide, ref
title = "Filter: code"
src = """
def filter(condition, L):
  res = []
  for item in L:
    if condition(item):
      res.append(item)
  return res

def is_big(x):
  return x > 60

numbers = [42, 165, 69, 18, 24]

big = filter(is_big, numbers)
print(big)
"""
numbers = [42, 165, 69, 18, 24]
ram = {}
disclaimer = "Toutes les références ne sont pas représentées"
__output__ = []
__output__ += slide(title, code_step(src, [], ram, disclaimer=disclaimer))
ram['filter'] = ref("function1")
__output__ += slide(title, code_step(src, [1], ram, disclaimer=disclaimer))
ram['is_big'] = ref("function2")
__output__ += slide(title, code_step(src, [8], ram, disclaimer=disclaimer))
ram['numbers'] = [42, 165, 69, 18, 24]
__output__ += slide(title, code_step(src, [11], ram, disclaimer=disclaimer))
fun = {}
fun['condition'] = ram['is_big']
fun['L'] = ref('numbers')
ram['function filter'] = fun
__output__ += slide(title, code_step(src, [13], ram, disclaimer=disclaimer))
fun['res'] = "[]"
__output__ += slide(title, code_step(src, [2], ram, disclaimer=disclaimer))

for item in numbers:
  fun['item'] = item
  __output__ += slide(title, code_step(src, [3], ram, disclaimer=disclaimer))
  cond = {}
  cond['x'] = fun['item']
  fun['function condition'] = cond
  __output__ += slide(title, code_step(src, [4], ram, disclaimer=disclaimer))
  cond[ref('return')] = item > 60
  __output__ += slide(title, code_step(src, [9], ram, disclaimer=disclaimer))
  fun[ref('tmp')] = cond[ref('return')]
  del(fun['function condition'])
  __output__ += slide(title, code_step(src, [4], ram, disclaimer=disclaimer))
  cond_res = fun[ref('tmp')]
  del(fun[ref('tmp')])
  if cond_res:
    if fun['res'] == "[]":
      fun['res'] = []
    fun['res'].append(fun['item'])
    __output__ += slide(title, code_step(src, [5], ram, disclaimer=disclaimer))

fun[ref('return')] = ref('res')
__output__ += slide(title, code_step(src, [6], ram, disclaimer=disclaimer))
ram['big'] = fun['res']
del(ram['function filter'])
__output__ += slide(title, code_step(src, [13], ram, disclaimer=disclaimer))
__output__ += slide(title, code_step(src, [14], ram, str(ram['big']), disclaimer=disclaimer))
```

## La fonction `filter`

- La fonction `filter` existe déjà en Python

## L'accumulation

- Il s'agit de calculer **une** valeur à partir de toutes les valeur d'une liste
- Exemple

```python
# A partir de cette liste
numbers = [42, 165, 69, 18, 24]

# Obtenir la valeur minimale
minimum = 18

# Ou obtenir la somme des éléments
total = 318
```

## Accumulation: Diagramme

:::row

::::span6

```plantuml {.build}
@startuml
partition "find_min ( **numbers** ) " {
  start
  :**result** ← premier éléments de *numbers*;
  while (Pour chaque valeur **x** de la liste **numbers**) is (**x**)
    if (**x** est plus petit que **result**) then (oui)
      :**result** ← *x*;
    else (non)
    endif
  endwhile (fini)
  :renvoyer **result**;
  stop
}
@enduml
```

::::

::::span6

```plantuml {.build}
@startuml
partition "sum ( **numbers** ) " {
  start
  :**result** ← 0;
  while (Pour chaque valeur **x** de la liste **numbers**) is (**x**)
    **result** ← **result + x**
  endwhile (fini)
  :renvoyer **result**;
  stop
}
@enduml
```

::::

:::

## Accumulation

- La structure commune est que:
  - Le résultat est initialisé avec **une valeur** _(et non une liste)_
  - Le contenu de la boucle **met à jour le résultat** sur base d'**une valeur**
    de la liste d'entrée
- L'accumulation est aussi appelé **réduction**
- La **variable** qui contient le résultat et qui est mise à jour à chaque tour
  de boucle est souvent appelée l'**accumulateur**
- La fonction qui factorise la structure d'une réduction est souvent appelée
  `reduce()`
- Elle reçoit la valeur initiale de l'accumulateur et une fonction de mise à
  jour

## La fonction `reduce()` {.code}

```python
# la fonction `update` reçoit la valeur de l'accumulateur et un élément de la liste
def reduce(update, L, initial):
  acc = initiale
  for item in L:
    acc = update(acc, item)
  return acc

numbers = [42, 165, 69, 18, 24]

def add(a, b):
  return a + b

def min(a, b):
  if a < b:
    return a
  return b

total = reduce(add, numbers, 0)
minimum = reduce(min, numbers, numbers[0])
```

## La fonction `reduce()`

- La fonction `reduce` existe déjà dans le package `functools`
- Si on ne lui passe pas de valeur initiale, elle utilise la première valeur de
  la liste et commence la boucle au deuxième élément.

```python
from functools import reduce

numbers = [42, 165, 69, 18, 24]

def add(a, b):
  return a + b

def min(a, b):
  if a < b:
    return a
  return b

# Les appels deviennent plus simples avec le `reduce` de `functools`
total = reduce(add, numbers)
minimum = reduce(min, numbers)
```

## Exemple plus complexe

- On veut l'age moyen des étudiants de 1BA

```python
students = [
  ['Pierre', '1BA', 17],
  ['Mohamed', '2BA', 18],
  ['Paul', '1BA', 18],
  ['Jacques', '1BA', 17],
  ['Claudine', '2BA', 19],
  ['Charlotte', '1BA', 18],
  ['John', '1BA', 20],
  ['Pauline', '1BA', 17],
  ['Tom', '2BA', 24],
]
```

## Fonctions utiles

- Définissons ces fonctions utiles et très simples

```python
NAME = 0
BLOCK = 1
AGE = 2

def is_1BA(student):
  return student[BLOCK] == '1BA'

def get_age(student):
  return student[AGE]
```

## En décomposant

:::row

::::span7

```python
from functools import reduce

students_1ba = filter(is_1BA, students)
ages = map(get_age, students_1ba)
mean_age = reduce(add, ages) / len(ages)
```

::::

::::span5

```plantuml {.build}
@startuml
start
:**students_1ba** ← Filtrer pour ne garder que les étudiants de 1BA;
:**ages** ← Transformer **students_1ba** pour ne garder que leurs **ages**;
:**mean_age** ← Réduire les **ages** à leur somme et diviser par le nombre d'éléments de **ages**;
stop
@enduml
```

::::

:::

## Sans décomposer

:::row

::::span7

```python
acc = 0
count = 0
for student in students:
  if is_1BA(student):
    count += 1
    acc += get_age(student)
mean_age = acc/count
```

- Cette version n'est pas mauvaise
- Mais dans la version précédente, les fonctions `map`, `filter` et `reduce`
  nous ont permis d'aborder le problème avec un modèle mental beaucoup plus
  simple

::::

::::span5

```plantuml {.build}
@startuml
start
:acc ← 0;
:count ← 0;
while (Pour **student** de la liste **students**) is (**student**)
  if (**student** est en 1BA) then (oui)
    :**count** ← **count + 1**;
    :**acc** ← **acc** + l'age de **student**;
  else (non)
  endif
endwhile (fini)
:**mean_age** ← **acc/count**;
stop
@enduml
```

::::

:::

## Trier une liste

- Pourquoi est-il intéressant de trier une liste ?
- Est-ce qu'un dictionnaire **non trié** par ordre alphabétique serait facile à
  utiliser ?
- La recherche dans un liste triée est beaucoup plus efficace.

## Recherche dans une liste non triée

:::row

::::span6

```python
def search(L, target):
    for i in range(len(L)):
        if L[i] == target:
            return i
    return None
```

- On est obligé de tester tous les éléments un par un

::::

::::span6

```plantuml {.build}
@startuml
partition "search (**L**, **target**)" {
start
while (Pour chaque indice de **L**) is (**i**)
  if (**L[i]** égal à **target**) then (oui)
    :renvoyer **i**;
    stop
  else (non)
  endif
endwhile (fini)
:renvoyer **None**;
stop
}
@enduml
```

::::

:::

## Recherche dans une liste triée

```plantuml {.build .smaller}
@startuml
partition "dichotomic_search (**L**, **target**)" {
start
:**left** ← **0**;
:**right** ← dernier indice de **L**;
while (left <= right) is (oui)
  :**mid** ← indice au milieu de **left** et **right**;
  if (**L[mid]** égal à **target**) then (oui)
    :renvoyer **i**;
    stop
  (non) elseif (L[mid] < target) then (oui)
    :**left** ← **mid** + 1;
  else (non)
    :**right** ← **mid** - 1;
  endif
endwhile (non)
:renvoyer **None**;
stop
}
@enduml
```

## Recherche dans une liste triée

```python
def dichotomic_search(L, x):
    left = 0
    right = len(L) - 1

    while left <= right:
        mid = (left + right) // 2

        if L[mid] == x:
            return mid

        if L[mid] < x:
            left = mid + 1
        else:
            right = mid - 1

    return None
```

## Speed Test

```python
from time import perf_counter
from random import shuffle

# créer une grande liste triée
L = list(range(100000))

start = perf_counter()
print(search(L, 90000))
print("Time:", perf_counter() - start) # Time: 0.002944834006484598

start = perf_counter()
print(dichotomic_search(L, 90000))
print("Time:", perf_counter() - start) # Time: 6.416026735678315e-06
```

## Speed Test

- Temps d'exécution de `search()` proportionnel à $n$ le nombre d'élément de la
  liste, [$O(n)$]{.small}

- Temps d'exécution de `dichotomic_search()` proportionnel à $log_2(n)$,
  [$O(log(n))$]{.small}

![Logarithmique vs linéaire](./log_time.svg)

```python {.build}
from matplotlib import pyplot as plt
import numpy as np

n = np.linspace(1, 20, 100)

lg = np.log2(n)

plt.figure()
plt.plot(n, n - 1, label="time ~ $n$")
plt.plot(n, lg, label="time ~ $log_2(n)$")
plt.xlabel("$n$")
plt.ylabel("time")
plt.yticks([])
plt.xticks([])
plt.legend()
plt.savefig("log_time.svg")
```

```python {.build}
from script import slide, list_repr
title = "Tri par insertion"
name = "Entrée"
name2 = "Sortie"
L = [3, 6, 2, 8, 1, 9, 4, 0, 7, 5]
res = []
__output__ = []
msg = ""

for i in range(len(L)):
  msg = f"<p>On veut placer {L[i]}.</p>"
  __output__ += slide(title, msg+list_repr(L, name=name, arrows={i: "i"}) + list_repr(res, name=name2, arrows={}))
  j = 0
  msg = "<p>On cherche le bon emplacement <code>j</code> dans la sortie.</p>"
  __output__ += slide(title, msg+list_repr(L, name=name, arrows={i: "i"}) + list_repr(res, name=name2, arrows={j: "j"}))
  while j < len(res) and res[j] <= L[i]:
    j += 1
    __output__ += slide(title, msg+list_repr(L, name=name, arrows={i: "i"}) + list_repr(res, name=name2, arrows={j: "j"}))
  msg = f"<p>On insere {L[i]} au bon endroit.</p>"
  res.insert(j, L[i])
  __output__ += slide(title, msg+list_repr(L, name=name, arrows={i: "i"}) + list_repr(res, name=name2, arrows={j: "j"}))
msg = "<p>Terminé !</p>"
__output__ += slide(title, msg+list_repr(L, name=name, arrows={}) + list_repr(res, name=name2, arrows={}))
```

## Tri par insertion: Diagramme

```plantuml {.build .smaller}
@startuml
partition "insert_sort (**L**)" {
start
:**res** ← liste vide;
while (Pour chaque **elem** de **L**) is (**elem**)
  :**j** ← 0;
  while (Tant que **j** est plus petit que **len(res)** et que **res[j] ≤ elem**) is (oui)
    :**j** ← **j** + 1;
  endwhile (non)
  :Insèrer **elem** dans **res** à l'indice **j**;
endwhile (fini)
:renvoyer **res**;
stop
}
@enduml
```

## Tri par insertion: Code {.code}

```python
def insert_sort(L):
    res = []
    for item in L:
        j = 0
        while j < len(res) and res[j] <= item:
            j += 1
        res.insert(j, item)
    return res
```

## Tri en place

- Quand on trie de grandes listes, il n'est pas toujours judicieux de créer une
  nouvelle liste
- Il faut donc pouvoir trier en restant dans la liste [On appelle cela un tri
  "en place"]{.small}
- La liste ne change pas de taille pendant le tri [On ne peut pas utiliser
  `insert`]{.small}

```python {.build}
from script import slide, list_repr
title = "Tri par insertion <em>en place</em>"
name = "Liste"
name2 = "Tmp"
L = [3, 6, 2, 8, 1, 9, 4, 0, 7, 5]
res = ["&nbsp;"]
__output__ = []
expl = "<p><code>i</code> indique l'élement en cours de placement. Les éléments avant <code>i</code> sont triés. Ceux après reste à trier.</p>"
msg = ""

for i in range(1, len(L)):
  msg = f"<p>On veut placer {L[i]}.</p>"
  __output__ += slide(title, expl+msg+list_repr(L, name=name, arrows={i: "i"}) + list_repr(res, name=name2, arrows={}))
  msg = f"<p>On sauve {L[i]} dans <code>Tmp</code>.</p>"
  res[0] = L[i]
  __output__ += slide(title, expl+msg+list_repr(L, name=name, arrows={i: "i"}) + list_repr(res, name=name2, arrows={}))
  j = i
  msg = f"<p>On cherche le bon emplacement <code>j</code> en partant de la fin.</p>"
  __output__ += slide(title, expl+msg+list_repr(L, name=name, arrows={i: "j=i"}) + list_repr(res, name=name2, arrows={}))
  msg=f"<p>On cherche en décalant les valeurs pour faire une place à {res[0]}.</p>"
  __output__ += slide(title, expl+msg+list_repr(L, name=name, arrows={i: "i", j: "j", j-1: "j-1"}) + list_repr(res, name=name2, arrows={}))
  while j > 0 and L[j-1] > res[0]:
    L[j] = L[j-1]
    msg=f"<p>On décale {L[j]}</p>"
    __output__ += slide(title, expl+msg+list_repr(L, name=name, arrows={i: "i", j: "j", j-1: "j-1"}) + list_repr(res, name=name2, arrows={}))
    j -= 1
    msg="<p>On continue de chercher</p>"
    __output__ += slide(title, expl+msg+list_repr(L, name=name, arrows={i: "i", j: "j", j-1: "j-1"}) + list_repr(res, name=name2, arrows={}))
  msg = f"<p><code>j</code> est au bon endroit.</p>"
  __output__ += slide(title, expl+msg+list_repr(L, name=name, arrows={i: "i", j: "j"}) + list_repr(res, name=name2, arrows={}))
  msg = f"<p>On met {res[0]} au bon endroit.</p>"
  L[j] = res[0]
  __output__ += slide(title, expl+msg+list_repr(L, name=name, arrows={i: "i", j: "j"}) + list_repr(res, name=name2, arrows={}))
msg = "<p>Terminé !</p>"
__output__ += slide(title, expl+msg+list_repr(L, name=name, arrows={}) + list_repr(res, name=name2, arrows={}))
```

## Tri par insertion _en place_: Diagramme

```plantuml {.build .smaller}
@startuml
partition "insert_sort_in_place (**L**)" {
start
while (Pour chaque indice **i** de **L** en partant de 1) is (**i**)
  :**tmp** ← **L[i]**;
  :**j** ← **i**;
  while (Tant que **j** est plus grand que **0** et que **L[j-1] > tmp**) is (oui)
    :**L[j]** ← **L[j-1]**;
    :**j** ← **j** - 1;
  endwhile (non)
  :**L[j]** ← **tmp**;
endwhile (fini)
stop
}
@enduml
```

## Tri par insertion _en place_: Code {.code}

```python
def insert_sort_in_place(L):
    for i in range(1, len(L)):
        tmp = L[i]
        j = i
        while j > 0 and L[j - 1] > tmp:
            L[j] = L[j - 1]
            j -= 1
        L[j] = tmp
```

## `sort()` et `sorted()`

- Il y a déjà des fonctions de tri en Python
- La méthode `sort()` du type `list` fait un tri _en place_

```python
L = [3, 6, 2, 8, 1, 9, 4, 0, 7, 5]
L.sort()
print(L)
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

- la fonction `sorted()` fait un tri dans une nouvelle list

```python
L = [3, 6, 2, 8, 1, 9, 4, 0, 7, 5]
L2 = sorted(L)
print(L2)
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# `L` est inchangé
```

## `sort()` et `sorted()`

- Utilisent des algorithmes plus efficaces que le tri par insertion.
- Exécutés directement par le processeur sans interprétation.
- Beaucoup plus rapides
- Pour faire un tri décroissant

```python
L = [3, 6, 2, 8, 1, 9, 4, 0, 7, 5]
L.sort(reverse=True)
print(L)
# [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
```

## `sort()` et `sorted()`

- Pour trier des valeurs plus complexes, on passe une fonction qui doit renvoyer
  la clé de tri pour chaque élément

```python
profs = [
  ['LUR', 'Quentin Lurkin'],
  ['LRG', 'André Lorge'],
  ['FKY', 'Martin Fockedey'],
  ['FLE', 'Clémence Flémal'],
]

def get_trigram(prof):
  return prof[0]

# trigramme comme clé de tri
L.sort(key=get_trigram)
print(L)
# profs = [
#   ['FKY', 'Martin Fockedey'],
#   ['FLE', 'Clémence Flémal'],
#   ['LRG', 'André Lorge'],
#   ['LUR', 'Quentin Lurkin'],
# ]
```
