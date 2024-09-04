---
title: 'Chapitre 6'
subtitle: 'Calcul numérique'
typst: true
---

Vous l'avez sûrement déjà remarqué, les mathématiques sont essentielles aux sciences de l'ingénieur. Durant toutes vos études et votre carrière, vous serez souvent amené à effectuer des calculs. C'est d'ailleurs quelque chose que vous faites régulièrement aux séances d'exercices de math. Cependant, les exercices auxquels vous êtes habituellement confrontés sont soigneusement conçus pour pouvoir se résoudre par les méthodes analytiques que l'on vous enseigne. Malheureusement, dans la pratique, il existe beaucoup de problèmes pour lesquels il n'existe pas de description analytique ou pour lesquels on ne peut pas trouver de solution analytique. Il est donc souvent nécessaire de faire appel à des méthodes numériques.

Pour bien comprendre la différence entre une expression analytique et une expression numérique, nous allons donner un petit exemple. Pour décrire un cercle de rayon $1$ centré en $(0, 0)$ analytiquement, on pourrait utiliser l'équation suivante : $$ x^2 + y^2 = 1 $$

Cette équation décrit parfaitement l'infinité des points du cercle et ce avec une précision infinie.

Une description numérique du même cercle pourrait être la suivante :

<pre><code class="lang_python" style="font-size: 90%">points = [
  (1.0, 0.0), (0.9800665778412416, 0.19866933079506122),
  (0.9210609940028851, 0.3894183423086505), (0.8253356149096782, 0.5646424733950355),
  (0.6967067093471654, 0.7173560908995228), (0.5403023058681398, 0.8414709848078965),
  (0.3623577544766736, 0.9320390859672263), (0.16996714290024104, 0.9854497299884601),
  (-0.029199522301288593, 0.9995736030415052), (-0.2272020946930869, 0.9738476308781953),
  (-0.4161468365471422, 0.9092974268256818), (-0.5885011172553455, 0.8084964038195903),
  (-0.7373937155412454, 0.6754631805511511), (-0.8568887533689473, 0.5155013718214642),
  (-0.9422223406686583, 0.33498815015590466), (-0.9899924966004455, 0.14112000805986677),
  (-0.998294775794753, -0.05837414342758053), (-0.9667981925794608, -0.2555411020268321),
  (-0.8967584163341465, -0.44252044329485324), (-0.790967711914416, -0.61185789094272),
  (-0.6536436208636113, -0.7568024953079289), (-0.49026082134069865, -0.8715757724135886),
  (-0.3073328699784185, -0.9516020738895163), (-0.1121525269350531, -0.9936910036334646),
  (0.08749898343944816, -0.9961646088358406), (0.28366218546322797, -0.958924274663138),
  (0.46851667130037866, -0.8834546557201524), (0.634692875942636, -0.772764487555986),
  (0.7755658785102513, -0.6312666378723195), (0.8855195169413201, -0.46460217941375503),
  (0.9601702866503667, -0.2794154981989233), (0.9965420970232177, -0.08308940281749375)
]</code></pre>

Cette description n'est qu'une liste finie de points ayant une précision finie. Bien que la description analytique soit meilleure à tous points de vue, la description numérique suffit dans la plupart des cas.

<figure>
  <img src="./circle.png" alt="">
  <figcaption>Dessin des <code>points</code> avec <code>turtle</code></figcaption>
</figure>

De plus, il est généralement possible de rendre la description numérique aussi précise que l'on souhaite. On pourrait ici augmenter le nombre de points pour améliorer la description du cercle.

Un autre avantage de la description numérique est qu'elle est bien plus pratique pour un ordinateur. En effet, un ordinateur peut gérer très facilement un grand nombre de valeurs numériques d'une précision finie. Il lui est beaucoup moins simple de manipuler des concepts mathématiques abstraits.

Un ordinateur n'est au final qu'une grosse calculatrice avec plusieurs avantages :

- Meilleur clavier
- Meilleur écran
- Plus de puissance

Il est extrêmement commun pour un ingénieur d'utiliser un **ordinateur** pour effectuer des **calculs**. L'utilisation de Python dans ce domaine est très **répandue** dans le monde professionnel.

## Math en Python

Avant d'entrer dans les détails des méthodes numériques de résolution de problèmes mathématiques, voyons ce que Python a à offrir. En effet, Python est déjà capable d'évaluer beaucoup d'expressions mathématiques.

### Trigonométrie

Le module `math` de Python contient toutes les fonctions trigonométriques usuelles :

```python
import math

print(math.cos(math.pi))
print(math.sin(math.pi/2))
print(math.tan(math.pi/4))
print(math.acos(0))         # arc cosinus
print(math.asin(1))         # arc sinus
print(math.atan(1))         # arc tangente
```

Le module math contient bien d'autres fonctions mathématiques

### Nombre complexes

Le type `complex` existe par défaut en Python et il n'y a besoin d'importer aucun module pour créer des valeurs complexes :

```python
# définir un nombre complex
x = 1+2j
x = complex(1, 2)
print(x)

# parties réelles et imaginaires
print(x.real)
print(x.imag)

print(x+x)
print(x*x)
```

Les fonctions mathématiques supportant les nombres complexes se trouvent dans le module `cmath`.

```python
import cmath

# racine carrée de nombres négatifs
print(cmath.sqrt(-1))

# modules et arguments
print(cmath.phase(x))           # argument
print(abs(x))                   # module
print(cmath.polar(x))           # module et argument

# définition d'1 nb complex à partir du module et argument
print(cmath.rect(1, cmath.pi))

# fonction
print(cmath.exp(x))             # exponentielle
```

## Calculs vectoriels

Manipuler des nombres scalaires est déjà bien mais il arrive souvent en mathématiques qu'il faille travailler avec des vecteurs. Il est bien évidemment possible de représenter les vecteurs avec des listes ou des tuples :

```python
v1 = (1, 2)
v2 = (3, 4)
```

Le problème est que les opérations de base ne sont pas disponibles nativement en Python. Il est bien sûr possible de les créer avec des fonctions :

```python
def add(a, b):
  return (a[0]+b[0], a[1]+b[1])

print(add(v1, v2))  # affiche (4, 6)
```

Ce serait par contre très long de créer toutes les fonctions permettant de faire toutes les opérations sur les vecteurs. De plus, la notation `add(v1, v2)` est quand même moins pratique que `v1 + v2`.

### Numpy

Pour pouvoir faire des calculs vectoriels plus facilement, nous allons utiliser le module `numpy`.

Ce module permet de faire bien d'autres choses que du simple calcul vectoriel. Il est extrêmement utile pour les calculs scientifiques et le traitement de grandes quantités de données. Il est très couramment utilisé par les ingénieurs et vous le rencontrerez en beaucoup d'occasions durant vos études.

### Installation

On installe le module `numpy` en tapant la commande suivante dans le terminal :

<pre class="terminal">
> python -m pip install numpy
</pre>

### Importation

Une fois installé, il est maintenant possible d'importer `numpy` dans nos programmes pour utiliser ses fonctions :

```python
import numpy
```

Une fois importé, nous pouvons appeler les fonctions de `numpy`. Nous pouvons par exemple créer un vecteur avec la fonction `numpy.array()` :

```python
v = numpy.array([1, 2])
```

Comme on doit souvent écrire le nom du module lorsqu'on utilise `numpy`, il est courant de lui donner un alias plus court comme ceci :

```python
import numpy as np
```

Ce qui nous permet d'utiliser ses fonction de la manière suivante :

```python
v = np.array([1, 2])
```

### Vecteurs

Il y a plusieurs manières de créer des vecteurs de valeurs. On peut convertir une liste ou un tuple Python :

```python
np.array([1, 2, 3])
np.array((1, 2, 3))
```

Ou utiliser des fonctions de `numpy` pour créer des vecteurs particuliers :

```python
np.zeros(5)            # vecteur de 5 zéros
np.ones(10)            # vecteur de 10 uns
np.linspace(0, 10, 5)  # vecteur de 5 valeurs allant uniformément de 0 à 10.
np.arange(0, 10, 0.2)  # correspond à np.array(range(0, 10, 0.2))
```

Il y a aussi plusieurs façons de créer des vecteurs des vecteurs de valeurs aléatoires :

```python
np.random.random(10)  # valeurs choisies entre 0 et 1 avec une
                      # distribution uniforme

np.random.randn(10)   # valeurs choisies avec une distribution normale
                      # de moyenne 0 et d'écart type 1.
```

<figure>
  <img src="./uniform.svg" alt="">
  <figcaption>Distribution uniforme entre 0 et 1</figcaption>
</figure>

<figure>
  <img src="./normal.svg" alt="">
  <figcaption>Distribution normale de moyenne 0 et d'écart type 1</figcaption>
</figure>

### Opérations avec scalaire

Les opérations effectuées entre un vecteur `numpy` et un scalaire sont effectuées sur toutes les composantes du vecteur :

```python
a = np.array([1, 2, 3, 4])
a + 1       # [2, 3, 4, 5]
2 * a       # [2, 4, 6, 8]
a ** 2      # [1, 4, 9, 16]
1 / a       # [1.0, 0.5, 0.3333, 0.25]
a < 3       # [True, True, False, False]
```

### Opérations entre vecteurs

Les opérations de base sont définies entre vecteurs de mêmes tailles. Elles s'effectuent alors entre composantes de même position :

```python
a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])
a + b    # [6, 8, 10, 12]
a * b    # [5, 12, 21, 32]
```

Une autre opération courante est le calcul de la norme d'un vecteur :

```python
print(np.linalg.norm(v))     # Norme
```

Les opérations mathématiques entre vecteurs sont aussi disponibles :

```python
print(v.dot(v))              # Produit scalaire
print(v @ v)                 # Produit scalaire
v2 = np.array([2, -1, 2]
print(np.cross(v, v2)))      # Produit vectoriel
```

### Fonctions vectorisées

Les fonctions vectorisées s'appliquent sur tous les éléments d'un vecteur. Le résultat est le vecteur des valeurs de retour. Si on les utilise sur un scalaire, elles se comportent normalement. Et si on les appelle sur une liste ou un tuple, il sera automatiquement converti en vecteur `numpy`.

```python
x = np.array([1, 2, 3])

# Fonction standard ne marche pas
y = math.sin(x) # Error

# Fonction vectorisée existe dans numpy
y = np.sin(x)
```

La plupart des opérations de base sont déjà supportées par numpy.

Il est aussi possible de créer une fonction vectorisée facilement avec le décorateur `@np.vectorize`. Il s'utilise sur une fonction prenant des valeurs scalaires en paramètres. Ce décorateur transforme la fonction pour qu'elle puisse recevoir des scalaires, des vecteurs ou une combinaison des deux en paramètres :

```python
@np.vectorize
def fun(a, b):
  if a > b:
    return 1
  return -1

x = np.array([1, 2, 3])
y = np.array([3, 2, 1])

print(fun(x, y))  # affiche [-1 -1 1]
print(fun(x, 1))  # affiche [-1 1 1]
print(fun(0, y))  # affiche [1 1 1]
```

### Documentation

La documentation de `numpy` se trouve sur :

[https://numpy.org/doc/stable/](https://numpy.org/doc/stable/)

## Graphiques de fonctions

Pour étudier un problème, il peut être très utile d'afficher des graphiques de fonctions. Pour cela, on peut utiliser `matplotlib`. Cette bibliothèque doit d'abord être installée :

<pre class="terminal">
> python -m pip install matplotlib
</pre>

Elle généralement utilisée en conjonction avec `numpy`

### Créer un graphique

Le module de `matplotlib` qui nous intéresse s'appelle `pyplot`. Il est généralement importé avec l'alias `plt` :

```python
from matplotlib import pyplot as plt
```

Pour afficher une courbe, il faut fournir une liste de points de la courbe. Pour nous aider à la générer, nous allons utiliser `numpy` :

```python
import numpy as np
```

Commençons par créer les abscisses des points :

```python
# 100 valeurs entre -2 et 2
x = np.linspace(-5, 5, 100)
```

Calculons ensuite leurs ordonnées :

```python
# np.sin est la version vectorisée de sin
y = np.sin(x)
```

Pour afficher la courbe, il suffit d'utiliser les fonctions `figure`, `plot` et `show` :

```python
plt.figure()    # commence une nouvelle figure
plt.plot(x, y)  # dessine la courbe
plt.show()      # affiche la figure
```

<figure>
<img src="./sin.svg" alt="">
</figure>

Il est aussi possible de sauver le graphique dans un fichier image en utilisant le fonction `savefig()` :

```python
plt.figure()
plt.plot(x, y)
plt.savefig("sin.png")
```

### Configurer la figure

Tous les aspect de la mise en page de la figure peuvent être configuré :

```python
from matplotlib import pyplot as plt
import numpy as np

x = np.linspace(-5, 5, 100)
y = np.sin(x)
plt.figure()
plt.title("Sinus")              # Donne un titre à la figure
plt.xlabel("x")                 # Affiche un nom sur l'axe des x
plt.ylabel("sin(x)")            # Affiche un nom sur l'axe des y
plt.grid()                      # Affiche une grille

# Configure les graduations de l'axe des x
plt.xticks(
  [-3*np.pi/2, -np.pi, -np.pi/2, 0, np.pi/2, np.pi, 3*np.pi/2], # positions
  labels=["-3pi/2", "-pi", "-pi/2", "0", "pi/2", "pi", "3pi/2"] # étiquettes
)

plt.axhline(color="k")          # Affiche une ligne noire pour l'axe des x
plt.axvline(color="k")          # Affiche une ligne noire pour l'axe des y
plt.plot(x, y)
plt.show()
```

<figure>
<img src="./sin_style.svg" alt="">
</figure>

### Plusieurs courbes

On peut évidemment dessiner plusieurs courbes sur la même figure :

```python
from matplotlib import pyplot as plt
import numpy as np

x = np.linspace(-5, 5, 100)
ysin = np.sin(x)
ycos = np.cos(x)
plt.figure()
plt.title("Trigono")
plt.xlabel("x")
plt.ylabel("y")
plt.grid()
plt.xticks(
  [-3*np.pi/2, -np.pi, -np.pi/2, 0, np.pi/2, np.pi, 3*np.pi/2],
  labels=["-3pi/2", "-pi", "-pi/2", "0", "pi/2", "pi", "3pi/2"]
)
plt.axhline(color="k")
plt.axvline(color="k")
plt.plot(x, ysin, label="sin(x)")     # on donne une étiquette à la courbe
plt.plot(x, ycos, label="cos(x)")     # on donne une étiquette à la courbe
plt.legend()                          # on demande d'afficher la légende
plt.show()
```

<figure>
<img src="./sin_cos.svg" alt="">
</figure>

### Documentation

La documentation de `matplotlib` se trouve sur :

[matplotlib.org/stable](https://matplotlib.org/stable/index.html)

## Analyse de fonction

C'est ici que nous allons commencer à entrer dans le vif du sujet des méthodes numériques de résolution de problème.

Pour bien comprendre comment ces méthodes fonctionnent, nous allons essayer de résoudre un problème simple : trouver une racine de la fonction $$ cos(x) + cos(3x+1)/2 + cos(5x-1)/3 $$

Commençons par afficher le graphique de cette fonction pour voir à quoi elle ressemble :

```python
def fun(x):
    return np.cos(x) + np.cos(3 * x + 1) / 2 + np.cos(5 * x - 1) / 3

x = np.linspace(-5, 5, 1000)

plt.figure()
plt.axhline(color="k")
plt.axvline(color="k")
plt.plot(x, fun(x))
plt.grid()
plt.show()
```

<figure>
<img src="./fun_to_root.svg" alt="">
</figure>

Nous allons essayer de trouver précisément la racine qui se trouve entre $$x=-2$$ et $$x=0$$. Pour cela, nous n'allons pas utiliser de méthodes analytiques. Nous allons plutôt utiliser la puissance de l'ordinateur.

Nous pouvons constater que le signe de la fonction est opposé en $$x=-2$$ et en $$x=0$$. Cela nous garantit qu'il y a au moins une racine dans cet intervalle puisque notre fonction est continue :

<figure>
<img src="./fun_to_root_1.svg" alt="">
<figcaption>L'intervalle $$[-2, 0]$$</figcaption>
</figure>

Nous allons diviser notre intervalle en deux :

<figure>
<img src="./fun_to_root_2.svg" alt="">
<figcaption>Divisons l'intervalle en deux</figcaption>
</figure>

Et nous allons continuer avec le demi-intervalle pour lequel la fonction a des signes opposés aux deux extrémités. De cette façon, on garde un intervalle qui contient une racine.

Il suffit maintenant de répéter cette procédure jusqu'à ce que l'intervalle soit si fin qu'on pourra considérer qu'on a trouvé la solution.

<figure>
<img src="./fun_to_root_3.svg" alt="">
</figure>

Bien sûr, nous n'allons pas faire ces calculs à la main. Nous allons écrire un programme pour les faire :

```python
def dichotomie(f, min, max, err):
    mid = (min + max) / 2

    if max - mid < err:
        return mid

    if f(min) * f(mid) < 0:
        return dichotomie(f, min, mid, err)
    else:
        return dichotomie(f, mid, max, err)


print(dichotomie(fun, -2, 0, 0.00001)) # affiche -1.2646560668945312
```

Comme dans notre exemple, les méthodes numériques sont souvent itératives. Si elles se rapprochent de la solution à chaque itération, on dit qu'elles convergent. Elles ont généralement besoin d'un critère d'arrêt qui est souvent lié à la précision souhaitée.

Bien entendu, il existe des modules qui implémentent déjà des méthodes numériques pour la plupart des problèmes courants. Nous allons utiliser `scipy`. Il faut bien entendu l'installer :

<pre class="terminal">
> python -m pip install scipy
</pre>

### Recherche de racine

`scipy` implémente la méthode que nous avons vue plus haut :

```python
from scipy import optimize

def fun(x):
  return np.cos(x)+np.cos(3*x+1)/2+np.cos(5*x-1)/3

root = optimize.bisect(fun, -2, 0, xtol=0.00001)  # xtol = 2e-12 par défaut

print(root)   # affiche -1.2646560668945312

x = np.linspace(-5, 5, 1000)
plt.figure()
plt.plot(x, fun(x))
plt.plot(root, 0, "o")  # affiche un point sur la figure
plt.grid()
plt.show()
```

<figure>
<img src="./bisect.svg" alt="">
</figure>

Une autre méthode de recherche de racine couramment utilisée est la méthode de Newton. Cette méthode n'a besoin que d'une valeur de départ et converge plus vite. Elle a aussi plus de chance de ne pas converger du tout :

```python
from scipy import optimize

def fun(x):
  return np.cos(x)+np.cos(3*x+1)/2+np.cos(5*x-1)/3

root = optimize.newton(fun, -1)
print(root)  # -1.2646564339411952
```

### Intégrale définie

Un autre problème que l'on peut résoudre avec des méthodes numériques est le calcul d'intégrales définies $$ integral\_(-1)^1 sqrt(1 - x^2) dif x $$

```python
from scipy import integrate

def fun(x):
    return np.sqrt(1 - x**2)

result = integrate.quad(fun, -1, 1)
print(result)  # (pi/2, erreur)

x = np.linspace(-1, 1, 100)
y = fun(x)

plt.figure()
plt.fill_between(x, y, alpha=0.5) # colorie l'aire sous la courbe
plt.plot(x, y)
plt.grid()
plt.axis("equal")                 # même échelle sur les 2 axes
plt.xlim(-1.5, 1.5)               # limites de l'axe x
plt.axhline(color="k")
plt.axvline(color="k")
plt.annotate(str(result[0]), xy=(0, 0.4), ha="center") # ajoute un texte
plt.show()
```

<figure>
<img src="./integrate.svg" alt="">
</figure>

### Documentation

La documentation de `scipy` se trouve sur :

[https://docs.scipy.org/doc/scipy/index.html](https://docs.scipy.org/doc/scipy/index.html)
