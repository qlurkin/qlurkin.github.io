---
title: Exercices 2
typst: true
---

1. Écrire une fonction qui reçoit un angle en degré et renvoie sa valeur en
   radians.

1. Écrire une fonction qui calcule la distance orthodromique entre deux points
   sur une sphère.

   La distance orthodromique est la plus courte distance entre deux points
   situés à la surface d’une sphère, mesurée le long de la surface. Elle
   correspond à la longueur de l'arc du grand cercle reliant ces deux points.

   Elle se calcule par la formule suivante:

   $$
   D = R arccos(sin(phi_A) sin(phi_B) + cos(phi_A) cos(phi_B) cos(lambda_B -
   lambda_A))
   $$

   où les $phi$ représentent des latitudes et les $lambda$ représentent des
   longitudes

   _Remarques: Les fonction `sin()` et `cos()` de Python attendent des angles en
   radians. Alors que les coordonnées GPS sont traditionnellement exprimées en
   degrés._

1. Écrire une fonction qui reçoit une liste et qui renvoie la liste de ses
   valeurs converties en flottants. On suppose que toutes les valeurs de la
   liste d’entrée sont convertibles en flottants.

1. Écrire une fonction qui permettra de demander à l'utilisateur d’entrer une
   liste de `str`. La fonction prendra en paramètre le message à afficher à
   l'utilisateur _(comme le fait la fonction `input()`)_. Elle demandera ensuite
   d’entrer chaque valeur individuellement jusqu'à ce que l'utilisateur valide
   une chaîne vide _(de longueur `0`)_. La fonction renverra la liste produite.

   **Exemple d'utilisation:**

   ```python
   # exo1.py
   L = input_list("Entrez vos animaux préférés")
   print(L)
   ```

   ```terminal
   > python exo1.py
   Entrez vos animaux préférés:
   élément 1: Tigre
   élément 2: Gorille
   élément 3: Velociraptor
   élément 4:
   ['Tigre', 'Gorille', 'Velociraptor']
   ```

1. Écrire une fonction qui reçois une liste en paramètre et qui la divisera en
   deux listes. La première contiendra tous les éléments d'indices impairs et la
   seconde ceux d'indices pairs. Les deux listes seront renvoyées sous forme
   d'une liste de 2 listes.

