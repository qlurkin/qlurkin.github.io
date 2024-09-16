---
lang: en
title: Labo 4 - Interfaces graphiques
viewport: width=device-width, initial-scale=1.0
---

# IN2L - Informatique appliquée [Interfaces graphiques]{.small}

## Fahrenheit

Ecrire une application graphique permettant de convertir les degrés
Celsius en degrés Fahrenheit et inversement.

![image](images/converter.png)

La relation entre degrés Celsius et Fahrenheit est \\\[T_F =
\\frac{9}{5}T_C + 32\\\]

## Clavier

Ecrire une application graphique permettant d\'entrer des nombres à
l\'aide d\'un clavier numérique.

![image](images/clavier.png)

Attention, le bouton `"."`{.lang-plaintext} ne peut pas ajouter de
`"."`{.lang-plaintext} s\'il y en a déjà un. Le bouton
`"<<"`{.lang-plaintext} efface un caractère.

**Astuce:** N\'oubliez pas que l\'attribut `ui_element`{.lang-python} de
l\'événement contient le widget qui a généré l\'événement et que les
boutons ont un attribut `text` qui contient le texte du bouton.

## Réflexion: calculette

Ajoutez les boutons `"+"`{.lang-plaintext}, `"-"`{.lang-plaintext},
`"*"`{.lang-plaintext}, `"/"`{.lang-plaintext} et `"="`{.lang-plaintext}
à votre clavier pour créer une calculatrice.
