---
title: Cours 7 — Exemple complémentaire
subtitle: Découper un problème avant de coder
type: deck
author: Quentin Lurkin
---

## Exemple — Résultat d'un étudiant

Écrire un programme qui lit trois notes, calcule leur moyenne et indique si l'étudiant a réussi.

- La réussite est définie par une moyenne **supérieure ou égale à 10**.
- On suppose que les trois entrées sont des nombres valides entre 0 et 20.
- Le programme affiche la moyenne et « Réussi » ou « À représenter ».

**Défi :** ne commencez pas par demander le code à l'IA. Commencez par décrire les étapes.

## Découper le problème

On peut séparer le travail en sous-problèmes :

1. **Obtenir les données** : lire les trois notes.
2. **Calculer** : additionner les notes et diviser par 3.
3. **Décider** : comparer la moyenne à 10.
4. **Afficher** : présenter la moyenne et le résultat.

Chaque étape est plus simple à comprendre et à vérifier que le problème complet.

## Dessiner le déroulement avant le code

```text
          ┌─────────┐
          │ Début   │
          └────┬────┘
               ↓
     ┌─────────────────────┐
     │ Lire note1, note2,   │
     │ note3                │
     └──────────┬──────────┘
                ↓
     ┌─────────────────────┐
     │ moyenne = somme des  │
     │ notes / 3           │
     └──────────┬──────────┘
                ↓
          ┌──────────────┐
          │ moyenne >= 10│
          └───┬──────┬───┘
            oui      non
             ↓        ↓
       ┌──────────┐ ┌───────────────┐
       │ Réussi   │ │ À représenter│
       └─────┬────┘ └──────┬────────┘
             └───────┬─────┘
                     ↓
          ┌───────────────────┐
          │ Afficher moyenne  │
          │ et résultat       │
          └─────────┬─────────┘
                    ↓
               ┌────────┐
               │  Fin   │
               └────────┘
```

## Faire vérifier le flowchart, pas le remplacer

Avant de demander du code, vous pouvez demander à l'IA de relire votre découpage :

```text
Je débute en Python. Je dois lire trois notes, calculer leur moyenne
et afficher si elle est au moins égale à 10.
Voici mon découpage : [coller vos étapes ou votre flowchart].
Vérifie si une étape manque ou si une décision est ambiguë.
Ne donne pas de code et pose-moi une question sur un cas limite.
```

Gardez la décision sur la solution : l'IA est une relectrice, pas l'autrice du flowchart.

## Passer du flowchart au pseudocode

Écrivez les étapes avec des mots simples avant de choisir la syntaxe Python :

```text
lire trois notes
calculer leur moyenne
si la moyenne est au moins 10 :
    résultat = « Réussi »
sinon :
    résultat = « À représenter »
afficher la moyenne et le résultat
```

Vérifiez que chaque bloc du flowchart se retrouve dans le pseudocode. Si une étape est difficile à exprimer, clarifiez-la avant de coder.

## Coder une seule partie à la fois

- Commencez par lire les trois entrées et les convertir en nombres.
- Ajoutez le calcul de la moyenne.
- Ajoutez ensuite la condition et l'affichage.
- Exécutez le programme après chaque ajout.

Prompt possible si vous êtes bloqué :

```text
Je suis à l'étape [décrire l'étape] de mon pseudocode.
En Python débutant, quelle notion du cours pourrait m'aider ?
Donne un indice et un mini-exemple différent, sans écrire mon programme.
```

## Tester chaque sous-problème

Prévoyez les résultats avant d'exécuter :

| Notes | Moyenne attendue | Résultat attendu |
|---|---:|---|
| 10, 10, 10 | 10 | Réussi |
| 9, 10, 10 | 9,67 environ | À représenter |
| 0, 0, 0 | 0 | À représenter |
| 20, 20, 20 | 20 | Réussi |

Le premier test vérifie particulièrement la frontière : la consigne dit **supérieure ou égale** à 10, pas seulement supérieure à 10.

## Faire relire ses tests et son code

Après avoir écrit et exécuté votre version, demandez une relecture ciblée :

```text
Voici mon code : [coller mon code] et voici mes tests : [les lister].
La règle est : moyenne >= 10 signifie « Réussi ».
Sans réécrire le programme, vérifie si chaque étape du flowchart
est présente et si mes tests couvrent la frontière de 10.
Explique les problèmes éventuels sous forme d'indices.
```

Vérifiez vous-même toute remarque en l'exécutant. Un code n'est maîtrisé que si vous pouvez expliquer les étapes, le flowchart, la condition et les résultats des tests.

## Bilan — du problème à une solution maîtrisée

```text
Énoncé → sous-problèmes → flowchart → pseudocode
       → code par étapes → tests → explication personnelle
```

- Le flowchart vous aide à voir les décisions et l'ordre des actions.
- Le découpage permet de traiter et tester une chose à la fois.
- L'IA peut poser des questions et relire chaque étape.
- Vous gardez la maîtrise : vous concevez, écrivez, testez et expliquez votre solution.
