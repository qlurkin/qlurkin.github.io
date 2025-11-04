---
title: Lab 1
subtitle: Dynamic Systems
---

## JupyterLab

Dans ce labo, nous allons utiliser JupyterLab. JupyterLab est un outil
permettant de créer des documents contenant du texte formaté et des parties
générées par du code Python. Ces documents sont aussi appelé "Jupyter Notebook"
et ont l'extension `.ipynb`. Ces documents sont idéaux pour présenter des
résultats de calculs effectués avec `numpy` et `matplotlib`.

Comme nous somme dans un labo sur les systèmes dynamiques, nous utiliserons
aussi les package `control` et `sympy`.

Pour finir, nous aurons besoin de `scipy` pour minimiser une fonction.

### Installation

Pour commencer il faut installer JupyterLab ainsi que les packages `numpy`,
`matplotlib`, `sympy`, `control` et `scipy`.

```terminal
> python -m pip install jupyterlab numpy matplotlib sympy control scipy
```

## lab 1

Une fois l'installation terminée, téléchargez [le zip du labo](./lab1.zip) et
décompressez le où bon vous semble sur votre ordinateur. Utilisez ensuite la
commande `cd` pour mettre votre terminal dans le dossier fraîchement décompressé
puis démarrez JupyterLab avec la commande:

```terminal
> jupyter-lab
```

Vous pouvez ensuite commencer le labo en ouvrant le fichier
`1_Dynamic Systems.ipynb`

Sachez qu'il est aussi possible d'ouvrir un Jupyter Notebook dans VSCode avec
l'extension Python installée.
