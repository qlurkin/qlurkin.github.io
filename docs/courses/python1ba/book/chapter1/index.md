---
title: Chapitre 1
subtitle: La programmation
---

## Qu'est-ce qu'un programme?

De manière générale, un programme est une suite d'actions à entreprendre visant à atteindre un but. On peut par exemple dire d'une recette de cuisine que c'est un programme pour réaliser un plat [(cf figure "cuire un oeuf")](#oeuf). On parle également de programme pour un lave-linge où, suivant le type de linge, la suite d'actions (rotations du tambour) est différente.

Un programme est donc constitué d'une suite d'instructions à exécuter dans un certain ordre.

<figure>
<a id="oeuf"></a>
<pre class="mermaid">
flowchart TD
    BEGIN((début)) --> A(faire chauffer la poêle)
    A --> B(mettre de l'huile dans la poêle)
    B --> C(casser l'œuf dans la poêle)
    C --> D(ajouter du sel et du poivre)
    D --> E{Est-ce que\nc'est cuit ?}
    E --> |non| F(On attend 10 secondes)
    F --> E
    E ---> |oui| G((fin))
</pre>
<figcaption>Cuire un oeuf</figcaption>
</figure>

Dans le domaine de l'informatique, un programme est une suite d'instructions visant à la résolution d'un problème. La résolution d'une équation du deuxième degré que vous avez apprise en secondaire ressemble déjà beaucoup à un programme informatique (cf figure \ref{diag-2edeg}).

<figure>
<pre class='mermaid'>
flowchart TD
    BEGIN((début)) --> A(yop)
</pre>
</figure>