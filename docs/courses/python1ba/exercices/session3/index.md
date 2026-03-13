---
title: Exercices 3
typst: true
---

1. Écrire une fonction nommée `product()` qui reçoit une liste de nombres et qui
   retourne le produit des éléments de la liste.

2. Écrire une fonction nommée `longest()` qui reçoit une liste de chaînes de
   caractères et qui retourne la chaîne la plus longue de la liste.

3. Écrire une fonction nommée `find_all()` qui reçoit une liste et une valeur à
   chercher et qui retourne la liste des indices où la valeur se trouve dans la
   liste d'entrée. Si la valeur ne se trouve pas dans la liste d'entrée, la
   fonction renverra une liste vide.

4. Écrire une fonction nommée `join()` qui reçoit une liste de chaînes de
   caractères et qui retourne une chaîne contenant tous les mots séparés par un
   espace. Vous ne pouvez pas utiliser la méthode `join()` des chaînes de
   caractères.

5. Écrire une fonction nommée `slit()` qui reçoit une chaîne de caractères en
   paramètre et qui retourne la liste des mots de la chaîne d'entrée. On définit
   que les mots sont séparés par un espace. Vous ne pouvez pas utiliser la
   méthode `split()` des chaînes de caractères.

6. Écrire une fonction nommée `clean()` qui reçoit une chaîne de caractères et
   une liste de mots à supprimer. La fonction renverra une copie de la chaîne
   d'entrée où tous les mots de la liste ont été supprimés.

7. Écrire une fonction nommée `bubble_sort()` qui implémente l'algorithme du tri
   à bulles dont voici le schéma:

   ```plantuml {.build}
   @startuml
   partition "bubble_sort (**L**)" {
   start
   while (Pour chaque indice **i** allant de **len(L)** à **2**) is (**i**)
     while (Pour chaque indice **j** allant de **1** à **i-1**) is (**j**)
       if (**L[j-1]** > **L[j]**) then (oui)
         :Échanger les valeurs de **L[j-1]** et **L[j]**;
       else (non)
       endif
     endwhile (fini)
   endwhile (fini)
   stop
   }
   @enduml
   ```
