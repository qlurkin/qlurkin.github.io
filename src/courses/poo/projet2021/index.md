---
title: Écosystème
---

# PO3L - Projet <small>Écosystème</small>

## Description

On vous demande de réaliser un simulateur d'**écosystème simplifié**. Dans cet écosystème :

- Le monde est représenté par un plan 2D.
- Toute les formes de vie ont des **points de vie** et des **réserves d'énergie**.
- Les réserves d'énergie diminuent avec le temps
- Lorsqu'une forme de vie n'a plus d'énergie, elle convertit ses points de vie en énergie.
- Une forme de vie qui n'a plus de point de vie meurt. Les animaux deviennent de la viande. Les plantes deviennent des déchets organiques.
- Les animaux peuvent se déplacer. Les plantes ne le peuvent pas.
- La viande devient un déchet organique après un certain temps.
- Une forme de vie doit **se nourrir** pour remplir ses réserves d'énergie.
    - Les carnivores se nourrissent de viande. Ils doivent donc tuer d'autre animaux. Ils doivent attaquer pour faire perdre tous les points de vie de leurs proies. Pour attaquer, les carnivores doivent rentrer en contact avec leur cible.
    - Les herbivores mangent des plantes.
    - Les plantes se nourrissent de déchets organiques.
    - Les animaux laissent régulièrement des déchets organiques derrière eux.
- Une forme de vie doit **se reproduire**.
    - Pour les animaux, un mâle et une femelle doivent entrer en contact. Après une période de gestation, un petit naît près de la femelle.
    - Les plantes se répandent, de nouvelles plantes naissent dans les alentours d'une plante existante
- Autour d'une forme de vie, il y a plusieurs zones. Ces zones sont circulaires et sont caractérisées par leur rayon.
    - La **zone de vision** est la zone dans laquelle un animal peut voir (des proies, de la nourriture, des prédateurs).
    - la **zone de contact** est la zone dans laquelle on considère que le contact est possible. Un prédateur peut attaquer une proie. Un herbivore peut manger une plante. Un mâle et une femelle peuvent se reproduire...
    - Pour les plantes, la **zone de racines** est la zone dans laquelle elle peut consommer les déchets organiques.
    - Et toujours pour les plantes, la **zone de semis** est la zone dans laquelle de nouvelles plantes peuvent apparaître autour d'une plante existante.

## Délivrable

**Dans un dépôt Github** vous remettrez:

- **Un projet** correspondant à la description ci-dessus dans **un langage de votre choix** mais permettant de faire l'**héritage** et des **classes abstraites**.

    La description ne mentionne rien sur comment les différentes formes de vie s'organisent pour se déplacer, se nourrir, se reproduire. Il est bien entendu possible d'implémenter beaucoup d'espèces différentes qui auraient des comportements divers et variés. Votre projet devra implémenter, au minimum, une espèce de carnivore, une espèce d'herbivore et une espèce de plante. Il devra être conçu pour qu'il soit facile **d'ajouter des espèces**.

    Il n'est pas obligatoire que votre projet ai une interface graphique mais il faudra qu'on puisse voir que **la simulation fonctionne**.

- Un **Rapport** comprenant :
    - un diagramme de classes,
    - un diagramme de séquences,
    - Une description (avec justifications) d'au moins **deux principes SOLID** utilisés dans le projet.

    Le rapport sera inclus dans le dépôt Github au format **Markdown**.

Les liens de vos dépôts sont à remettre sur **claco** pour le **3 janvier à 18h**. Tous les commit ultérieurs seront ignorés.

Le projet est à faire en **binôme**.

## Grille d'évaluation

Bientôt disponible

