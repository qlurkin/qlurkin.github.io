---
title: Cours 2
subtitle: Imbrication de types, classes et objets
type: deck
author: Quentin Lurkin
typst: true
---

## Imbrication de données

- **Imbriquer** des données <small>Insertion d'une structure de données comme élément d'une autre</small>
- **Contraintes** selon la structure principale [Éléments d'un ensemble et clés d'un dictionnaire non modifiables]{.small}
- Représentation de **données complexes** [Bien organiser et définir la structure de données]{.small}

## Liste à deux dimensions

- On peut construire une liste dont les **éléments sont des listes**
- **Accès multiples** à faire pour accéder aux éléments imbriqués

```python
A = [1, 2]
B = [3, 4, 5]
L = [A, B]                # Équivalent à L = [[1, 2], [3, 4, 5]]

print(L[0][1])            # 2
print(L[1][2])            # 5
```

![Liste 2D](./imbrication.svg){width=50%}

## Parcours d'une liste à deux dimensions

- Parcours à l'aide d'une **double boucle** [Imbrication d'une boucle dans une autre, `while` ou `for`]{.small}
- La première boucle passe en revue les **listes imbriquées** [La seconde boucle parcourt les éléments de chaque liste imbriquée]{.small}

```python
L = [[1, 2], [3, 4, 5]]

for elem in L:            # elem est une liste
  for data in elem:       # data est un nombre entier
    print(data, end=' ')
  print('| ', end='')
```

```terminal
1 2 | 3 4 5 |
```

## Représentation d'une matrice

- **Matrice** représentée par une liste à deux dimensions [Toutes les listes imbriquées ont le même nombre d'éléments]{.small}
- Stockage d'une **liste des lignes** de la matrice
  - La première dimension représente les lignes
  - Colonnes représentées par la deuxième dimension

```python
M = [[1, 2, 3], [4, 5, 6]]
```

$$ M = mat(1, 2, 3; 4, 5, 6) "Par exemple, M[1][0] vaut 4" $$

## Parcours d'une matrice

- Dimension de la matrice obtenue avec la fonction `len` [La matrice a `len(M)` lignes et `len(M[0])` colonnes]{.small}
- Parcours avec boucle `while` et indices ou avec boucle `for`

```python
# Avec une boucle while
i = 0
while i < len(M):
	j = 0
	while j < len(M[0]):
		print(M[i][j])
		j += 1
	i += 1

# Avec une boucle for
for line in M:
	for elem in line:
		print(elem)
```

## Structures imbriquées

- Imbrication d'autres structures **dans des listes** [Liste de tuples, ensembles et dictionnaires]{.small}

```python
# Liste de tuples
coords = [(0,0), (7,-2), (4,5), (-3,-9)]

# Liste d'ensembles
lunches = [
  {'apple', 'banana', 'grape'},
  {'yogurt', 'cereals'},
  {'bread', 'cheese', 'ham'},
  {'sausage'}
]

# Liste de dictionnaires
contacts = [
  {'firstname': 'Alexis', 'lastname': 'King'},
  {'firstname': 'Brice', 'lastname': 'Monster'},
  {'firstname': 'Sébastien', 'lastname': 'Adams'}
]
```

## Structures imbriquées

- Structures imbriquées en **clés et valeurs** de dictionnaires [Les clés d'un dictionnaire doivent être non modifiables]{.small}

```python
# Tuples en clés d'un dictionnaire
config = {
  (0, 0): 'Arnaud',
  (2, 1): 'Louis',
  (-1, 3): 'Marie',
  (3, -1): 'Dan'
}

# Listes en valeurs d'un dictionnaire
config = {
  (0, 0): ['Arnaud', 'Pierre'],
  (2, 1): ['Louis'],
  (-1, 3): ['Marie', 'Éric', 'Tom'],
  (3, -1): ['Dan']
}
```

## Imbrication complexes

- On peut imbriquer des structures à plusieurs niveaux [Des séquences, ensembles et dictionnaires]{.small}

```python
address = {'street': "Promenade de l'Alma", 'number': 50,
  'zip': 1200, 'city': "Woluwé-Saint-Lambert"}
marchand = {'firstname': "Cédric", 'lastname': "Marchand",
  'address': address}

# Équivalent à
# marchand = {'firstname': "Cédric", 'lastname': "Marchand",
# 'address': {'street': "Promenade de l'Alma", 'number': 50,
# 'zip': 1200, 'city': "Woluwé-Saint-Lambert"}}

print(marchand['firstname'])          # Cédric
print(marchand['address']['city'])    # Woluwé-Saint-Lambert
```

## Copie

- Affecter une même liste à deux variables crée un **alias** [Même
  chose pour les séquences, les ensembles et les
  dictionnaires]{.small}
- On crée une **véritable copie** de liste avec la fonction `list` [Ou
  avec les fonctions `set`, `dict`\...]{.small}

```python
L = [1, 2, 3, 4, 5]
A = L                                   # A est un alias de L
A[0] = 42
print(L)                                # [42, 2, 3, 4, 5]

L = [1, 2, 3, 4, 5]
B = list(L)                             # B est une copie de L
B[0] = 42
print(L)                                # [1, 2, 3, 4, 5]
```

## Copie

![l'assignation ne crée pas de copie](alias.svg){style="width: 25em"}

::: section

## Copie de structures imbriquées

- Pas de soucis de copies pour les **collections non modifiables**
- La copie ne se fait **pas en profondeur** [Seuls les éléments de
  \"premier niveau\" sont copiés]{.small}

```lang-python
            L = [[1, 2], [3, 4, 5]]
            A = list(L)

            A[1][0] = 42
            print(L)                           # [[1, 2], [42, 4, 5]]

```

![image](images/shallow.svg){style="width: 20em"}
:::

::: section

## Module `copy`

- Deux fonctions proposées par le **module `copy`**
  - `copy` pour une copie \"_shallow_\"
  - `deepcopy` pour une copie \"_deep_\"
- Une **copie en profondeur** peut prendre du temps [Et aussi
  consommer beaucoup d\'espace mémoire]{.small}

```lang-python
            import copy

            L = [[1], [2, 3], [4, 5, 6]]
            A = copy.copy(L)                   # A est une copie shallow de L
            B = copy.deepcopy(L)               # A est une copie deep de L

```

:::

::: {.section .full}

## Objets

![](images/2828893154_94b10b0822_o.jpg)
:::

::: section

## Objet (1)

- Un **objet** combine des données et des fonctions [Les fonctions ont
  accès complet aux données de l\'objet]{.small}
- Permet de définir des **types de données** complexes [On a déjà
  renconté les listes, chaines de caractères, ensembles\...]{.small}

```lang-python
            dice = {1, 2, 3, 4, 5, 6}            # Initialisation des données
            face = dice.pop()                    # Appel d'une fonction

            print("La face visible du dé est :", face)

```

```lang-plaintext
            La face visible du dé est : 1

```

:::

::: section

## Objet (2)

- **Trois éléments** existent lorsqu\'on crée un objet
  - L\'**objet**, avec ses attributs, se trouve en mémoire
  - Une **variable** du même type que l\'objet est déclarée
  - Une **référence** vers l\'objet est stockée dans la variable

```lang-python
            dice = {1, 2, 3, 4, 5, 6}

```

![image](images/dice.svg){.third}
:::

::: section

## Création

- Création d\'un objet en exécutant un **constructeur** [Permet
  d\'initialiser les attributs de l\'objet]{.small}

```lang-python
            from datetime import time

            start = time(14, 45, 21)
            end = time(16, 15, 56)

```

![image](images/time.svg){.third2}
:::

::: section

## Accès aux attributs

- **Accès aux attributs** d\'un objet avec l\'opérateur d\'accès (`.`)
- L\'accès peut se faire en **lecture et/ou écriture** [Certains
  attributs sont protégés et en lecture seule]{.small}

```lang-python
            startseconds = 3600 * start.hour + 60 * start.minute + start.second
            endseconds = 3600 * end.hour + 60 * end.minute + end.second

            difference = endseconds - startseconds
            print("Le cours va durer :", difference, "secondes")

```

:::

::: section

## Attribut en lecture seule

- Erreur d\'exécution si **modification attribut lecture seule**
  [Modification d\'un attribut faite par affectation]{.small}

```lang-python
        from datetime import time

        start = time(14, 45, 21)
        start.minute = 15

```

```lang-plaintext
        Traceback (most recent call last):
            File "program.py", line 4, in
                start.minute = 15
        AttributeError: attribute 'minute' of 'datetime.time' objects is
        not writable

```

:::

::: section

## Paramètre de type objet

- Une fonction peut recevoir des **paramètres de type objet** [Le
  paramètre reçoit une copie de la référence vers l\'objet]{.small}

```lang-python
            from datetime import time

            def toseconds(t):
                return 3600 * t.hour + 60 * t.minute + t.second


            start = time(14, 45, 21)
            end = time(16, 15, 56)

            difference = toseconds(end) - toseconds(start)
            print("Le cours va durer :", difference, "secondes")

```

```lang-plaintext
            Le cours va durer : 5435 secondes

```

:::

::: section

## Valeur de retour de type objet

- Une fonction peut **renvoyer un objet** [La fonction crée l\'objet
  et renvoie une référence vers ce dernier]{.small}

```lang-python
            from datetime import time

            def theoreticalend(start, duration):
                minute = start.minute + (duration % 60)
                hour = start.hour + (duration // 60) + (minute // 60)
                return time(hour, minute % 60, start.second)


            start = time(14, 45, 21)
            print("Le cours devrait finir à :", theoreticalend(start, 90))

```

```lang-plaintext
            Le cours devrait finir à : 16:15:21

```

:::

::: section

## Appel de méthode (1)

- Une fonction associée à un objet est appelée une **méthode** [Une
  méthode est appelée sur un objet cible]{.small}

```lang-python
            from calendar import TextCalendar

            cal = TextCalendar()
            cal.prmonth(2015, 9)      # Affiche le calendrier de septembre 2015

```

```lang-plaintext
            September 2015
            Mo Tu We Th Fr Sa Su
                1  2  3  4  5  6
             7  8  9 10 11 12 13
            14 15 16 17 18 19 20
            21 22 23 24 25 26 27
            28 29 30

```

:::

::: section

## Appel de méthode (2)

- Méthode appelée avec l\'**opérateur d\'appel de méthode** (`.`)
  [L\'objet cible est précisé avant le point]{.small}

```lang-python
            from calendar import TextCalendar

            cal = TextCalendar()
            cal.setfirstweekday(6)    # Change le premier jour de la semaine
            cal.prmonth(2015, 9)

```

```lang-plaintext
            September 2015
            Su Mo Tu We Th Fr Sa
                   1  2  3  4  5
             6  7  8  9 10 11 12
            13 14 15 16 17 18 19
            20 21 22 23 24 25 26
            27 28 29 30

```

:::

::: section

## Programmation orientée objet

- La **programmation orientée objet** manipule des objets [Concepts et
  entités représentés par des objets]{.small}
- Représenter des objets **concrets ou conceptuels** du monde réel
  [Une personne, un moyen de transport, une date, une
  liste\...]{.small}
- Création de **nouveaux types de données** [Permet une programmation
  de plus haut niveau]{.small}
  :::

::: section

## État d\'un objet

- Chaque objet est unique et possède son propre **état** [Identité
  propre à chaque objet, avec ses propres attributs]{.small}
- L\'état d\'un objet est **modifiable ou non** - Objet immuable aura toujours le même état - État d\'un objet non modifiable ne peut être changé
  :::

::: section

## Identité d\'un objet

- **Identité** d\'un objet propre à chaque objet créé [Caractérisée
  par son emplacement en mémoire]{.small}
- Fonction prédéfinie **`id`** renvoie l\'identité

```lang-python
            numbers = {8, 3, 1, -2, 0}
            letters = {'A', 'P', 'Q'}

            print(id(numbers))
            print(id(letters))

```

```lang-plaintext
            4302577224
            4329799752

```

:::

::: section

## Tout est objet (1)

- En Python, toute donnée est un **objet** [Même tout ce qu\'on a déjà
  vu comme les nombres, booléens\...]{.small}
- Fonction prédéfinie **`dir`** donne la liste des méthodes

```lang-python
            temperature = 19
            print(dir(temperature))

```

```lang-plaintext
            ['__abs__', '__add__', '__and__', '__bool__', '__ceil__',
            '__class__', '__delattr__', '__dir__', '__divmod__', '__doc__',
            '__eq__', '__float__', '__floor__', '__floordiv__', '__format__',
            '__ge__', '__getattribute__', '__getnewargs__', '__gt__',
            '__hash__', '__index__', '__init__', '__int__', '__invert__',
            '__le__', '__lshift__', '__lt__', '__mod__', '__mul__', '__ne__',
            '__neg__', '__new__', '__or__', '__pos__', '__pow__', '__radd__',
            '__rand__', '__rdivmod__', '__reduce__', '__reduce_ex__',
            '__repr__', '__rfloordiv__', '__rlshift__', '__rmod__',
            '__rmul__', '__ror__', '__round__', '__rpow__', '__rrshift__',
            '__rshift__', '__rsub__', '__rtruediv__', '__rxor__',
            '__setattr__', '__sizeof__', '__str__', '__sub__',
            '__subclasshook__', '__truediv__', '__trunc__', '__xor__',
            'bit_length', 'conjugate', 'denominator', 'from_bytes', 'imag',
            'numerator', 'real', 'to_bytes']

```

:::

::: section

## Tout est objet (2)

- Les nombres entiers ont une **méthode `__add__`** [Permet de faire
  la somme de deux entiers]{.small}
- Appel à la méthode `__add__` simplifié par l\'**opérateur `+`**
  [Redéfinition d\'un opérateur rend le code plus lisible]{.small}

```lang-python
            print(temperature + 11)
            print(temperature.__add__(11))

```

```lang-plaintext
            30
            30

```

:::

::: section

## Exemple : les complexes

- **Nombre complexe** représenté par des objets de type `complex`
  [Deux façons de les créer puis on peut utiliser plusieurs
  méthodes]{.small}

```lang-python
            a = 2 + 3j
            b = complex(-1, 4)

            print(type(a))
            print(a.imag)
            print(b.conjugate())

```

```lang-plaintext
            <class 'complex'>
            3.0
            (-1-4j)

```

:::

::: section

## Exemple : les chaines de caractères

- **Chaine de caractères** représenté par des objets de type `str`
  [Myriade de méthodes permettant de les manipuler]{.small}

```lang-python
                s = "heLLo"

                print(s.upper())
                print(s.capitalize())
                print(s.startswith("H"))

```

```lang-plaintext
                HELLO
                Hello
                False

```

:::

::: section

## Exemple : le navigateur web

- Module `webbrowser` permet de manipuler le **navigateur web**
  [Récupération du navigateur puis ouverture de pages avec
  `open`]{.small}

```lang-python
                import webbrowser

                chrome = webbrowser.get()
                chrome.open("http://www.perdu.com")

```

:::

::: section

## Crédits

- https://www.flickr.com/photos/madalena_pestana/2828893154
- https://www.flickr.com/photos/ken-ichi/4577032677
  :::
