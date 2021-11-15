---
title: SA4L - Labo 4
---

# SA4L - Labo 4 <small>Simulation sur CPU</small>

Dans cette séance nous allons commencer à simuler quelques particules. Nous allons commencer par le faire sur le CPU pour bien comprendre comment ces simulations fonctionnent. Dans les séances à venir nous verrons comment les calculer sur GPU

## Animer une particule

Une particule est simplement un point qui possède une position $(x, y, z)$ et une vitesse $(v_x, v_y, v_z)$. Pour l'animer il suffit de mettre à jour sa position à chaque *frame*.

$$ \begin{array}{rcl} x & = & x + \Delta t \cdot v_x \\\\ y & = & y + \Delta t \cdot v_y \\\\ z & = & z + \Delta t \cdot v_z\end{array} $$

Dans `raylib`, Vous pouvez récupérer le temps écoulé depuis la dernière frame avec `GetFrameTime()`.

### Exercice

Créez une classe `Particule` qui représente une particule et faites un programme qui affiche une particule se déplaçant selon sa vitesse.

## Collision

Lorsqu'une collision est détectée, la particule est réfléchie par rapport à la normale à la surface de collision. C'est donc bien la direction du vecteur vitesse de la particule qui change. Dans `raymath.h`, vous avez une fonction

```cpp
Vector3 Vector3Reflect(Vector3 v, Vector3 normal);
```

qui permet de calculer le vecteur réfléchit.

La detection de la collision et le calcul de la normale dépendent de la surface de collision. Pour un plan d'équation $ ax + by + cz + d = 0 $ le normale est $(a, b, c)$. Un tel plan sépare l'espace en 2 régions: La région où l'expression $ ax + by + cz $ est positive et celle où elle est négative. On choisit généralement la région positive comme zone autorisée pour la particule et on détecte une collision dès qu'elle passe dans la région négative.

Une fois la collision détectée, la particule se trouve dans la "zone interdite". Il généralement nécessaire de la replacer dans la zone autorisée avant de laisser la simulation continuer.

Il est bien sûr possible de detecter des collisions avec d'autres primitives que des plans.

### Exercice

Placer votre particule dans une boite et laissez la rebondir sur les 6 faces. Une boite peut être implémentée par 6 plans ou par [une fonction SDF *(Signed Distance Field)* adaptée](https://www.iquilezles.org/www/articles/boxfunctions/boxfunctions.htm).

Essayez d'implémenter les collisions pour qu'il soit facile d'ajouter des surfaces de collisions *(évitez d'hardcoder la collision dans la classe Particule)*

## Système de particules

Un système de particules gère un ensemble de particules.

### Exercice

Ajouter une classe `ParticuleSystem` qui crée un certain nombre de particules avec des positions et des vitesses aléatoires et permet de les faire rebondir dans la boite.

## Gravité

La gravité est plus une accélération qu'une force. Elle modifie directement la vitesse des particules:

$$ \begin{array}{rcl} v_x & = & v_x + \Delta t \cdot g_x \\\\ v_y & = & v_y + \Delta t \cdot g_y \\\\ v_z & = & v_z + \Delta t \cdot g_z\end{array} $$

### Exercice

Modifiez vos classe `Particule` et `ParticuleSystem` pour que les particules subissent la gravité.


