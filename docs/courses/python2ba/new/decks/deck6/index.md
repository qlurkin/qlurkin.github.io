---
title: Cours 6
subtitle: Calculs numériques
type: deck
author: Quentin Lurkin
typst: true
---

## Rappels

- Nous avons déjà aborder le [calcul numériques en 1BA](../../../python1ba/book/chapter6/)

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
plt.plot(x, ysin, label="sin(x)")
plt.plot(x, ycos, label="cos(x)")
plt.legend()
plt.show()
```

## Remarque `matplotlib` deux API

- Tous les exemples de l'année passée ont été donné dans l'**API implicite** de
  matplotlib [Qui ressemble plus à Matlab]{.small}
- Voici un exemple dans l'**API explicite**:

```python
from matplotlib import pyplot as plt
import numpy as np

x = np.linspace(-5, 5, 100)
ysin = np.sin(x)
ycos = np.cos(x)

fig, ax = plt.subplots()

ax.set_title("Trigono")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.grid()
ax.set_xticks([-3*np.pi/2, -np.pi, -np.pi/2, 0, np.pi/2, np.pi, 3*np.pi/2],
  labels=["-3pi/2", "-pi", "-pi/2", "0", "pi/2", "pi", "3pi/2"])
ax.axhline(color="k")
ax.axvline(color="k")
ax.plot(x, ysin, label="sin(x)")
ax.plot(x, ycos, label="cos(x)")
ax.legend()

plt.show()
```

![Sinus et Cosinus](./sin_cos.svg)

## Deux API

::::: row
::: span6

### API implicite

```python
plt.subplot(1, 2, 1)
plt.plot([1, 2, 3], [0, 0.5, 0.2])

plt.subplot(1, 2, 2)
plt.plot([3, 2, 1], [0, 0.5, 0.2])

plt.suptitle('Implicit Interface')

for i in range(1, 3):
  plt.subplot(1, 2, i)
  plt.xlabel('Boo')

plt.show()
```

:::

::: span6

### API explicite

```python
fig, axs = plt.subplots(1, 2)

axs[0].plot([1, 2, 3], [0, 0.5, 0.2])
axs[1].plot([3, 2, 1], [0, 0.5, 0.2])

fig.suptitle('Explicit Interface')

for i in range(2):
  axs[i].set_xlabel('Boo')

plt.show()
```

:::
:::::

![Subplot](./subplot.svg)

## `numpy`: Calcul Matriciel

- `numpy` permet aussi de travailler avec des matrices

```python
A = np.array([[1, 2],
              [3, 4]])
```

## Même opérations que le vecteurs

- Opérations avec scalaires

  ```python
  A = np.array([[1, 2],
                [3, 4]])
  2*A         #[[2, 4],
              # [6, 8]]
  ```

- Opérations avec tableaux de même taille et produit matriciel

  ```python
  B = np.array([[5, 6], [7, 8]])
  A * B       # produit élément par élément
  A @ B       # produit matriciel
  ```

- Fonctions sur les tableaux

  ```python
  np.sin(A)   # [[ 0.84147098  0.90929743]
              #  [ 0.14112001 -0.7568025 ]]
  ```

## Attributs

```python
x = np.array([[1, 2],
              [3, 4],
              [5, 6]])

x.ndim   # Dimension => 2
x.shape  # Forme => (3, 2)
x.size   # Nombre total d’éléments => 6
x.dtype  # Type de données stockées => dtype('int32')
```

## Indexation

```python
x = np.array([[1, 2],
              [3, 4],
              [5, 6]])

x[0, 1]                 # x[0][1] => 2

# Slice
x[:2, 1]                # [2, 4]
x[[0, 2], :]            # [[1, 2], [5, 6]]

# Indexation booléenne
x[[[True , False],
   [False, True ],
   [True , True ]]]     # [1, 4, 5, 6]
x[x < 4]                # [1, 2, 3]

# Edition conditionnelle
x[x < 4] = 0            # [[0, 0],
                        #  [0, 4],
                        #  [5, 6]]
```

## Méthodes

```python
x = np.array([[1, 2],
              [3, 4],
              [5, 6]])
x.reshape((2, 3))  # [[1, 2, 3],
                   #  [4, 5, 6]]

x.flatten()        # [1, 2, 3, 4, 5, 6]
x.diagonal()       # [1, 4]
x.trace()          # 5
x.sum(axis=1)      # [3, 7, 11]
y = x.transpose()  # [[1, 3, 5],
                   #  [2, 4, 6]]
```

## Scipy

- **Algorithmes** et **fonctions utilitaires** construits sur numpy

- De **nombreuses fonctionnalités**

  - Intégration numérique
  - Optimisation
  - Distributions statistiques
  - ...

- Installation

```terminal
$> python -m pip install scipy
```

## Algèbre Linéaire

```python
import numpy as np
from scipy import linalg

A = np.array([[1 , 2] , [3 , 4]])
b = np.array([[5] , [6]])
A.T            # transpose
linalg.det(A)  # déterminant
linalg.inv(A)  # inverse
A @ b          # produit matriciel
```

## Algèbre Linéaire

- Résolution de système d\'équations linéaires

$$ cases(1x+2y=5, 3x+4y=6) $$
$$ mat(1, 2; 3, 4) mat(x; y) = mat(5; 6)$$
$$ mat(x; y) = mat(1, 2; 3, 4)^(-1) mat(5; 6)$$

```python
import numpy as np
from scipy import linalg

A = np.array([[1 , 2] , [3 , 4]])
b = np.array([[5] , [6]])

linalg.inv(A).dot(b)
linalg.solve(A, b)

```

## Équations différentielles

- Équation différentielle avec conditions initiales $$ (dif y(t))/(dif t) = t - y(t) $$

- Avec `scipy`

  ```python
  from matplotlib import pyplot as plt
  from scipy.integrate import solve_ivp
  import numpy as np

  def fun(t: float, y: float) -> float:
    return t-y

  sol = solve_ivp(
    fun=fun,
    t_span=[0, 15],
    y0=[2],
    rtol = 1e-5
  )

  plt.plot(sol.t, sol.y[0], '--s')
  plt.show()
  ```

- Résultat:

  ![Équation différentielle](./first_order.svg)

## Équations différentielles d'ordres supérieurs

$$ (dif^2 y(t))/(dif t^2) + (dif y(t))/(dif t) + 2 y(t) = 0 $$

- `solve_ivp` ne supporte que le **premier ordre** mais il supporte les **systèmes d'équations** différentielles

- Nous pouvons poser que $g(t) = (dif y(t))/(dif t)$ et réécrire l'équation sous forme d'un **système du premier ordre**

$$ cases((dif y(t))/(dif t) = g(t), (dif g(t))/(dif t) = -2 y(t) - g(t))$$

```python
from matplotlib import pyplot as plt
from scipy.integrate import solve_ivp
import numpy as np


def fun(t: float, Y: list[float]) -> list[float]:
  """
  Args:
    - `Y`: `Y[0]` is the value of `y(t)`
           `Y[1]` is the value of `g(t)`
    - `t`: is just the value of `t`

  Returns:
  A list with the value `y'(t)` and `g'(t)`
  """
  return [Y[1], -2*Y[0]-Y[1]]

sol = solve_ivp(
  fun=fun,
  t_span=[0, 15],
  y0=[1, 0],           # Conditions initiales pour y(t) et g(t)
  rtol = 1e-5
)


plt.plot(sol.t, sol.y[0], '--s')
plt.show()
```

![Solution](./second_order.svg)

## Opérations sur des tableaux de données avec `pandas`

## Documentations

- `numpy` : <https://numpy.org/doc/stable/>
- `matplotlib` : <https://matplotlib.org/stable/index.html>
- `scipy` : <https://docs.scipy.org/doc/scipy/>
- `pandas` : <https://pandas.pydata.org/docs/>
