---
title: "Chapitre 2"
---

<script type="module" defer>
Doc.setChapterNb(2)
</script>

## Équations du second degré

Souvenez vous, nous avions vu un exemple de programme pour résoudre les équations du second degré&nbsp;:

<figure id='python_2deg' data-ref='code'>

```python
D = b*b-4*a*c
if D < 0:
    print("Pas de solution réelle")
else:
    if D == 0:
        print("La racine double est", -b/(2*a))
    else:
        print("La 1re racine est", (-b-sqrt(D))/(2*a))
        print("La 2e racine est", (-b+sqrt(D))/(2*a))
```
<figcaption>Python, second degré</figcaption>
</figure>

Il est maintenant temps d'essayer de l'exécuter. Sauvez ce programme dans un fichier, `2nd_order.py` et essayez de le lancer&nbsp;:

<pre class="terminal" style="font-size: 85%">
<b>> python 2nd_order.py</b>
Traceback (most recent call last):
  File "C:\Users\lur\Programmation\2nd_order.py", line 1, in &lt;module&gt;
    D = b*b-4*a*c
        ^
NameError: name 'b' is not defined
</pre>

Il semblerait que quelque chose se soit mal passé. Ce que nous avons là est un message d'erreur. C'est un des grands avantages de la programmation. Lorsqu'on fait une erreur, il y a généralement un message d'erreur pour nous aider à la corriger. Il est important d'apprendre à lire ces messages car toute l'information dont on a besoin pour corriger l'erreur se trouve généralement dans le message.

Ici le message d'erreur nous indique que le problème se trouve dans le fichier `2nd_order.py` à la ligne 1. Le caractère `^` indique à quel endroit de la ligne se trouve l'erreur. Et la dernière ligne du message est une description de l'erreur. Ici, on nous dit que le nom `b` n'est pas définit.

En effet, nous n'avons, dans ce programme, pas définit les valeurs de `a`, `b` et `c`. Python ne peut donc pas effectuer le calcul `b*b-4*a*c`. Le message d'erreur nous parle de `b` car c'est la première variable non définie qu'il rencontre.

Ajoutons des définitions pour ces 3 variables&nbsp;:

<figure id='python_2deg_corrected' data-ref='code'>

```python
a = 1
b = 0
c = -4
D = b*b-4*a*c
if D < 0:
    print("Pas de solution réelle")
else:
    if D == 0:
        print("La racine double est", -b/(2*a))
    else:
        print("La 1re racine est", (-b-sqrt(D))/(2*a))
        print("La 2e racine est", (-b+sqrt(D))/(2*a))
```
<figcaption>définitions des valeurs <code>a</code>, <code>b</code> et <code>c</code></figcaption>
</figure>

Relançons le programme&nbsp;:

<pre class="terminal" style="font-size: 85%">
<b>> python 2nd_order.py</b>
Traceback (most recent call last):
  File "C:\Users\lur\Programmation\2nd_order.py", line 11, in &lt;module&gt;
    print("La 1re racine est", (-b-sqrt(D))/(2*a))
                                   ^^^^
NameError: name 'sqrt' is not defined
</pre>

Encore une erreur, la fonction `sqrt()` qui permet de calculer les racines carrées n'est pas chargée par défaut en Python. Comme nous ne l'avons pas chargée, le nom `sqrt` n'est pas définit. Ajoutons le chargement de la fonction `sqrt`&nbsp;:

<figure id='python_2deg_corrected_2' data-ref='code'>

```python
from math import sqrt

a = 1
b = 0
c = -4
D = b*b-4*a*c
if D < 0:
    print("Pas de solution réelle")
else:
    if D == 0:
        print("La racine double est", -b/(2*a))
    else:
        print("La 1re racine est", (-b-sqrt(D))/(2*a))
        print("La 2e racine est", (-b+sqrt(D))/(2*a))
```
<figcaption>Chargement de la fonction <code>sqrt</code></figcaption>
</figure>

Relançons le programme&nbsp;:

<pre class="terminal">
<b>> python 2nd_order.py</b>
La 1re racine est -2.0
La 2e racine est 2.0
</pre>

Et voilà ! Ça marche.

Nous avons eu ici un exemple classique de rédaction de programme. On écrit du code, on teste, on lit les messages d'erreur, on corrige et on recommence.
      
## Variables, valeurs et types

Dans le programme précédents, nous avons utilisé plusieurs variables, `a`, `b`, `c` et `D`.

Une variable est une sorte de boite possédant un nom et pouvant contenir une valeur. Pour mettre une valeur dans la variable, on utilise le signe `=`. Une fois la valeur de la variable définie son contenu peut être utiliser dans le code en utilisant sont nom.

```python
a = 42
print(a) # affiche 42
```
*Remarque: le caractère `#` permet d'indiquer que le reste de la ligne est un commentaire. Les commentaires sont ignorés par l'interpréteur Python.*

<figure id="variable" data-ref="figure">
<svg width="50%" viewBox="0 0 1780 941" version="1.1">
  <g>
    <rect
      x="718.473"
      y="186.234"
      width="511.1"
      height="511.1"
      style="fill: none; stroke: #000; stroke-width: 15.66px"
    />
    <text
      x="435.195px"
      y="507.148px"
      style="
        font-family: 'Consolas', monospace;
        font-size: 266.667px;
        fill: #008802;
      "
    >
      a
    </text>
    <text
      x="832.291px"
      y="528.046px"
      style="
        font-family: 'Consolas', monospace;
        font-size: 266.667px;
        fill: #0053d8;
      "
    >
      42
    </text>
    <ellipse
      cx="916.27"
      cy="448.593"
      rx="556.47"
      ry="374.94"
      style="fill: none; stroke: #de0000; stroke-width: 15.66px"
    />
    <text
      x="1207.1px"
      y="72.482px"
      style="font-size: 100px; fill: #de0000"
    >
      La variable
    </text>
    <text
      x="1366.77px"
      y="895.116px"
      style="font-size: 100px; fill: #0053d8"
    >
      La valeur
    </text>
    <text
      x="-6.862px"
      y="728.803px"
      style="font-size: 100px; fill: #008802"
    >
      Le nom
    </text>
    <path
      d="M483.334,598.628l23.199,-35.414l23.767,35.035"
      style="
        fill: none;
        stroke: #008802;
        stroke-width: 15.66px;
        stroke-linejoin: miter;
        stroke-miterlimit: 10;
      "
    />
    <path
      d="M359.8,693.598c138.621,-3.775 147.112,-42.337 146.733,-130.384"
      style="fill: none; stroke: #008802; stroke-width: 15.66px"
    />
    <path
      d="M950.341,624.014l24.803,-34.31l22.13,36.091"
      style="
        fill: none;
        stroke: #0053d8;
        stroke-width: 15.66px;
        stroke-linejoin: miter;
        stroke-miterlimit: 10;
      "
    />
    <path
      d="M1333.51,859.91c-199.807,-4.867 -365.219,-12.486 -358.367,-270.206"
      style="fill: none; stroke: #0053d8; stroke-width: 15.66px"
    />
  </g>
</svg>
<figcaption>Variable et valeur</figcaption>
</figure>

Il est important ici de constater que le signe `=` a une signification très différente de ce que l'on retrouve en mathématique. En programmation, le `=` prend la valeur qui est à sa droite pour la mettre dans la variable qui est à sa gauche. Cela signifie que `42 = a` n'a aucun sens en Python.

La valeur de la variable peut être modifiée en lui assignant une autre valeur.

```python
a = 42
print(a) # affiche 42
a = 0
print(a) # affiche 0
```

Il y d'autres moyens de mettre la valeur `42` dans la variable `a`&nbsp;:

```python
a = 21 + 21
a = 2 * 21
# ...
```

La valeur qui est à droite du signe `=` peut être écrite directement; on parle alors d'un **littéral**. Ou elle peut être le résultat d'un calcul. Plus généralement, on appelle **expressions** tous ce qui a une valeur. Un littéral est donc une expression mais toutes les expressions ne sont pas des littéraux.

## Types de valeurs

Les valeurs peuvent être de différents types :

- Les entiers (`int`)

```python
a = 42 # littéral
a = 2 * 21 # expression
```

- Les nombre à virgule flottante (`float`)

```python
a = 0.42 # littéral
a = 42e-2 # littéral en notation scientifique
a = 1 / 2 # expression
```

- Les chaînes de caractères (`str`: *string*). Les *strings* sont un cas particulier d'une famille de types plus générale qu'on appelle **les séquences**.

```python
a = "hello" # littéral
b = 'coucou' # littéral
c = 2 * a + "!!" # expression
```

- Les booléens (`bool`)

```python
a = True # littéral
b = a or 5 < 0 # expression
```

- **Et bien d'autres...**

Physiquement, le contenu des variables est sauvé dans la RAM de l'ordinateur. Dans la RAM, toutes les valeurs sont sauvegardées avec des `1` et des `0`. C'est le type de la valeur qui indique à Python comment interpréter ces `1` et ces `0`.

Il est important de garder à l'esprit les types des valeurs que l'on manipule car les opérations que l'on peut effectuer avec chaque type ne sont pas les mêmes et ne font pas toujours la même chose&nbsp;:

<figure id='operations_type' data-ref='code'>

```python
i = 21
print(i + i) # affiche 42
s = "21"
print(s + s) # affiche 2121
print(i + s) # interdit
```
<figcaption>Somme entre <code>int</code> et <code>float</code></figcaption>
</figure>

Pour illustrer cela, apportons une petite modification au programme de résolution d'équations du second degré. Bien que le programme fonctionne, il est nécessaire de modifier les définitions de `a`, `b` et `c` pour résoudre une autre équations. Ce n'est pas idéal. Nous allons donc faire en sorte que le programme demande à l'utilisateur d'entrer les valeurs des coefficients de l'équation. Pour cela, on utilise la fonction `input()`. Cette dernière interrompt l'exécution du programme pour permettre à l'utilisateur d'entrer quelque chose au clavier. Elle laisse ensuite le programme reprendre et renvoie la valeur tapée&nbsp;:

<figure id='python_2deg_corrected_2' data-ref='code'>

```python
from math import sqrt

a = input('entrez la valeur de a : ')
b = input('entrez la valeur de b : ')
c = input('entrez la valeur de c : ')
D = b*b-4*a*c
if D < 0:
    print("Pas de solution réelle")
else:
    if D == 0:
        print("La racine double est", -b/(2*a))
    else:
        print("La 1re racine est", (-b-sqrt(D))/(2*a))
        print("La 2e racine est", (-b+sqrt(D))/(2*a))
```
<figcaption>Utilisation de <code>input</code></figcaption>
</figure>

Relançons le programme et entrons les valeurs demandées&nbsp;:

<pre class="terminal" style="font-size: 85%">
<b>> python 2nd_order.py</b>
entrez la valeur de a : 1
entrez la valeur de b : 0
entrez la valeur de c : -4
Traceback (most recent call last):
  File "C:\Users\lur\Programmation\2nd_order.py", line 5, in &lt;module&gt;
    D = b*b-4*a*c
        ~^~
TypeError: can't multiply sequence by non-int of type 'str'
</pre>

Voilà un nouveau message d'erreur ! Celui-ci nous indique que lors du calcul de `b*b`, on ne peut pas multiplier une séquence par une valeur de type `str`. On se rend compte ici que lorsqu'on a tapé `0` pour indiquer la valeur de `b`, la fonction `input()` a renvoyé une valeur de type `str`. Et cela pose problème pour la suite des calculs.

En fait, il s'agit du comportement normal de la fonction `input()`. comme cette fonction demande à l'utilisateur d'entrer quelque chose au clavier, elle ne fait que renvoyer la suite de caractères qui a été tapée. `input()` renvoie donc toujours une valeur de type `str`.

Pour pouvoir continuer les calculs, il faut convertir la chaîne de caractères en nombre. Comme l'utilisateur pourrait taper des nombres à virgule, nous allons les convertir en `float`. Pour cela, il existe une fonction `float()` qui convertit ce qu'on lui passe en paramètre en valeur de type `float`.

Ajoutons donc la fonction `float()` à notre programme. Notez que l'on peut directement utiliser la valeur renvoyée par `input()` comme paramètre de `float()`&nbsp;:

<figure id='python_2deg_corrected_3' data-ref='code'>

```python
from math import sqrt

a = float(input('entrez la valeur de a : '))
b = float(input('entrez la valeur de b : '))
c = float(input('entrez la valeur de c : '))
D = b*b-4*a*c
if D < 0:
    print("Pas de solution réelle")
else:
    if D == 0:
        print("La racine double est", -b/(2*a))
    else:
        print("La 1re racine est", (-b-sqrt(D))/(2*a))
        print("La 2e racine est", (-b+sqrt(D))/(2*a))
```
<figcaption>Utilisation de <code>float</code></figcaption>
</figure>

Relançons le programme&nbsp;:

<pre class="terminal">
<b>> python 2nd_order.py</b>
entrez la valeur de a : 1
entrez la valeur de b : 0
entrez la valeur de c : -4
La 1re racine est -2.0
La 2e racine est 2.0
</pre>

Parfait !

**Dans un premier temps les fonctions `input()` et `print()` seront nos seuls moyens de communication avec l'utilisateur. On utilise `input()` pour recevoir des données de l'utilisateur. Et on utilise `print()` pour afficher les résultats.**

## Expressions

En programmation, une expression est tous ce qui a une valeur. On dit aussi qu'une expression **renvoie** une valeur. Une expression peut donc être&nbsp;:

- **un littéral**, c'est à dire, une valeur écrite littéralement,

```python
42            # Littéral entier
3.141592      # Littéral flottant
'Hello World' # Littéral chaîne de caractères
True          # Littéral booléen
```

- **un nom de variable définie**, dans ce cas la valeur de l'expression est la valeur de la variable,

```python
a = 42        # Définition de la variable a
a             # expression valant 42
```

- **un appel de fonction**, comme par exemple la fonction `sqrt`,

```python
from math import sqrt
sqrt(4)       # Expression valant 2.0
```

- **une combinaison d'expressions**, grâce à des opérateurs. 

### Opérateurs

Comme nous l'avons vu dans le <span data-link="operations_type">code</span>, les opérateurs disponibles et la façon de combiner les valeurs dépend de leurs types.

Les opérateurs suivants sont définis pour **les valeurs numériques**&nbsp;:

<figure id='number_operators' data-ref='code'>

```python
1 + 2 # somme de deux nombres
1 - 2 # différence de deux nombres
2 * 2 # produit de deux nombres
4 ** 2 # puissance de deux nombres (ici 4²)
4 / 2 # quotient de deux nombre
5 // 2 # division entière
5 % 2 # modulo, reste de la division entière
```
<figcaption>Opérations sur les nombres</figcaption>
</figure>

Les deux dernières opérations nécessitent probablement un peu d'explications. Lorsqu'on parle de la division entière de `5` par `2` on veut savoir combien de fois `2` entre entièrement dans `5`. `2` entre deux fois dans `5`, en effet, `2 x 2 = 4`. `2` n'entre pas trois fois dans `5` car `3 x 2 = 6` ce qui est plus grand que `5`.

Le reste de la division entière de `5` par `2` est la partie de `5` qui n'a pas pu être divisée lors de la division entière. Comme on ne peut mettre que deux fois `2` dans `5` et que `2 x 2 = 4`, il reste `1` qui n'a pas pu être divisé. On dit donc que le reste de la division entière de `5` par `2` est égale à `1`.

Souvenez vous des divisions écrites que vous avez apprises en primaire. Si vous vous arrêtez avant de calculer les décimales, vous obtenez la division entière et le reste.

<figure id="division" data-ref="figure">
<img src="./division_ecrite.svg" class="third">
<figcaption>Division écrite</figcaption>
</figure>

Il y a plein de moment où la division entière et le modulo peuvent être utiles. Par exemple, si vous voulez convertir un nombre quelconque de minutes (disons 200) en heures/minutes. Pour obtenir le nombre d'heure, il suffit de faire une division entière par 60: `200 // 60 = 3`. Nous avons donc 3 heures. Et pour obtenir le nombre de minutes restantes, on utilise le modulo 60: `200 % 60 = 20`. Il reste donc 20 minutes. 200 minutes correspond à 3 heures et 20 minutes.

### Opérateurs de comparaison

### Opérateurs booléens


