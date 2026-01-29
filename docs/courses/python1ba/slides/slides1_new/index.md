---
title: Cours 1
subtitle: Introduction
type: deck
css: style.css
---

## Informations générales

- 7h30 de **théorie**, 7h30 d'**exercices**
- Les documents utilisés sont sur

  **<https://quentin.lurkin.xyz/courses/python1ba/>**

- Évaluation :
  - Examen écrit de type **QCM (100%)**

## Qu'est ce qu'un programme ?

- Une suite d'opérations pour obtenir un résultat
- comme une recette de cuisine
- les opérations sont exécutées
  - une à la fois,
  - l'une après l'autre.

## Recette de cuisine

1. Épluchez les pommes de terre.
2. Coupez les en tranches.
3. Mettez les à cuire dans de l'eau bouillante légèrement salée pour 10 à 15
   min.
4. Détaillez l'oignon en fines rondelles.
5. Coupez le reblochon en tranches.
6. Faites chauffer l'huile dans une poêle.
7. Mettez l'oignon et les lardons à cuire pour 5 min.
8. Intégrez les pommes de terre, le fromage, la crème et le vin blanc.
9. Poursuivez la cuisson ± 5 min à feu modéré
10. Assaisonnez de sel et de poivre.
11. Servez avec une salade.

## Représentation graphique (Recette)

## Représentation graphique (équation second degré)

## Scratch (second degré) ?

## Variable

## if

## while

```python {.build}
# Ce script génère plusieurs slides
from script import code_step, loadfile, slide
title = "Second degré en Python"
src = loadfile("./bazooka.py")
ram = {"a": 1}
__output__ = []
__output__ += slide(title, code_step(src, [4], ram))
ram["b"] = -5
__output__ += slide(title, code_step(src, [5], ram))
ram["c"] = 6
__output__ += slide(title, code_step(src, [6], ram))
ram["delta"] = 1
__output__ += slide(title, code_step(src, [8], ram))
ram["&lt;tmp&gt;"] = True
__output__ += slide(title, code_step(src, [10], ram))
del(ram["&lt;tmp&gt;"])
ram["x1"] = 2
__output__ += slide(title, code_step(src, [11], ram))
ram["x2"] = 3
__output__ += slide(title, code_step(src, [12], ram))
__output__ += slide(title, code_step(src, [13], ram, "x1: 2 x2: 3"))
```

## Essaie - Erreur

- Debuggage

## IA

## Recap
