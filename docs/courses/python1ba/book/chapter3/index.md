---
title: "Chapitre 3"
subtitle: "Séquences"
---

<script type="module" defer>
Doc.setChapterNb(3)
</script>

Les séquences sont des structures de données ordonnées, c'est-à-dire, des suites de données individuelles rangées dans un ordre bien déterminé. Pour prendre un exemple, les chaînes de caractères sont des séquences. En effet, une chaine de caractères est une suite de caractères (les données) rangés dans un ordre déterminé (la chaine `"python"` n'est pas équivalente à `"yphtno"`).

En Python, les chaines de caractères ne sont pas les seules séquences. Dans ce chapitre, nous allons voir les listes, les tuples et les intervalles et nous verrons qu'elles partagent beaucoup de fonctionnalités avec les chaînes de caractères.

## Les listes

Les valeurs de type liste sont des valeurs qui peuvent contenir une liste de valeurs&nbsp;:

```python
nombres = [1, 2, 3, 4, 5, 6, 7]
```

Dans l'exemple ci-dessus, nous avons une variable nombres qui contient 7 entiers. Les listes peuvent aussi contenir des valeurs de différents types&nbsp;:

```python
mix = ['truc', 3.141592, 1234, ['hello', 'world']
```

On peut voir dans l'exemple ci-dessus qu'une même liste peut contenir des chaines de caractères, des entiers, des nombres à virgule flottante et même d'autres listes.

### Accès aux éléments

Il est possible d'accéder aux éléments individuels en utilisant les `[]`&nbsp;:

```python
print(nombres[1])      # affichera 2
nombres[6] = 'sept'    # modifie l'élément d'indice 6
```

Les éléments sont numérotés à partir de zéro. On peut également utiliser des indices négatifs pour accéder aux éléments d'une séquence en partant de la fin. Ainsi, l'élément d'indice `-1` est le dernier élément, l'élément d'indice `-2` est l'avant-dernier élément, et ainsi de suite.

### Fonctions `len()` et `del()`

Comme pour les chaines de caractères, il est possible d'obtenir la taille d'une liste en
utilisant la fonction `len()`.

Pour supprimer un élément d'une liste, on utilise la fonction `del()`&nbsp;:

```python
del(nombres[3])
print(nombres) # affichera [1, 2, 3, 5, 6, 'sept']
             # 4 a été supprimé
```

### Les tranches

Il est possible d'extraire une partie d'une séquence de la manière suivante&nbsp;:

```python
j = nombres[2:5]
```

Dans le code ci-dessus, `j` contiendra `[3, 5, 6]`. La tranche `[m,n]` est une **nouvelle liste** contenant les éléments de l'indice `m` inclus à l'indice `n` exclu.

Si on omet la première des deux bornes (`nombres[:5]`), la tranche commencera au début de la liste originale. Si c'est la fin qui est omise (`nombres[2:]`), la tranche ira jusqu'à la fin de la liste originale.

On peut également remplacer une portion de liste par une autre&nbsp;:

```python
nombres[2:5] = ['toto', 'tata', 'tutu', 'titi']
```

Après l’instruction ci-dessus, la liste `nombres` contiendra [1, 2, ’toto’, ’tata’, ’tutu’, ’titi’, ’sept’].

Il est également possible d’ajouter des éléments de cette manière&nbsp;:

```python
L = [1, 2, 5, 6]

L[2:2] = [3, 4]

# L vaut maintenant [1, 2, 3, 4, 5, 6]
```

Donc, pour ajouter un élément en début de liste, on procèderait comme suit&nbsp;:

```python
L = [2, 3, 4]

L[:0] = [1]

# L vaut maintenant [1, 2, 3, 4]
```

Et, pour ajouter un élément en fin de liste, on procèderait comme suit&nbsp;:

```python
L = [1, 2, 3, 4]

L[len(L):] = [5]

# L vaut maintenant [1, 2, 3, 4, 5]
```
### Méthodes

Nous avons vu plus haut comment ajouter des éléments dans une liste en utilisant des assignations à des tranches. Bien que cette façon de modifier une liste soit très puissante, elle n'est pas très pratique à utiliser pour des opérations simples et courantes comme l'ajout en fin de liste.

En réalité il existe tout un tas de fonctionnalités associées au type `list`. l'une d'entre elle permet d'ajouter un élément en fin de liste et s'appelle `append`. Voici comment on l'utilise&nbsp;:

```python
L = [1, 2, 3, 4]
L.append(5)
# L vaut maintenant [1, 2, 3, 4, 5]
```
Vous pouvez voir que pour utiliser la fonctionnalités `append` des liste, on doit appeler la fonction `append()` attachée *(avec un `.`)* à la valeur de type `list` sur laquelle on souhaite appliquer la fonctionnalités.

On appelle ce genre de fonctionnalités des **méthodes**

Nous n'allons pas voir ici toutes les méthodes du type `list` mais nous allons quand même mentionner les méthodes `insert()` et `pop()`&nbsp;:

```python
L = [1, 2, 4, 5]
L.insert(2, 3) # insère l'élément 3 à l'indice 2
# L vaut maintenant [1, 2, 3, 4, 5]

v = L.pop(2) # enlève et renvoie l'élément d'indice 2
# L vaut de nouveau [1, 2, 4, 5] et v contient 3
```

### Opérations

#### Concaténation

Il est possible de créer une nouvelle séquence correspondant à la concaténation de deux séquences, c’est-à-dire, de la mise bout à bout de ces deux séquences. Pour cela, on utilise l’opération +.

```python
L1 = [1, 2, 3]
L2 = [4, 5, 6]
L3 = L1 + L2   # L3 sera égal à [1, 2, 3, 4, 5, 6]

s1 = 'hello '
s2 = 'world'
s3 = s1 + s2   # s3 sera égal à 'hello world'
```
