---
title: Chapitre 1
subtitle: La programmation
---

## Qu'est-ce qu'un programme?

De manière générale, un programme est une suite d'actions à entreprendre visant à atteindre un but. On peut par exemple dire d'une recette de cuisine que c'est un programme pour réaliser un plat [(cf figure "cuire un œuf")](#oeuf). On parle également de programme pour un lave-linge où, suivant le type de linge, la suite d'actions (rotations du tambour) est différente.

<figure>
    <a id='oeuf'></a>
    <div id='diagram_oeuf'></div>
    <figcaption>Cuire un œuf</figcaption>
</figure>
<script type="module" defer>
    const draw = await Doc.Draw('#diagram_oeuf', 350, 500)
    const start = draw.start().move(1, 2)
    const hot = draw.round('faire chauffer la poêle').belowOf(start)
    const oil = draw.round('mettre de l’huile dans la poêle').belowOf(hot)
    const egg = draw.round('casser l’œuf dans la poêle').belowOf(oil)
    const salt = draw.round('ajouter du sel et du poivre').belowOf(egg)
    const dummyTop = draw.dummy().belowOf(salt)
    const cooked = draw.round('Est-ce que c’est cuit ?').belowOf(dummyTop)
    const if1 = draw.diamond().belowOf(cooked)
    const non = draw.node('non').belowOf(if1)
    const wait = draw.round('On attend 10 secondes').belowOf(non)
    const oui = draw.node('oui').absolute(if1, 50, 0)
    const dummyRight = draw.dummy().rightOf(wait)
    const dummyLeft = draw.dummy().leftOf(if1)
    const end = draw.end().belowOf(wait)
    draw.polyline([start, '-->', hot, '-->', oil, '-->', egg, '-->', salt, '--', dummyTop, '-->', cooked, '-->', if1])
    draw.polyline([if1, '', non, '-->', wait, '-|', dummyLeft, '|->', dummyTop])
    draw.polyline([if1, '', oui, '-|', dummyRight, '|->', end])
    draw.done()
</script>

Un programme est donc constitué d'une suite d'instructions à exécuter dans un certain ordre.

Dans le domaine de l'informatique, un programme est une suite d'instructions visant à la résolution d'un problème. La résolution d'une équation du deuxième degré que vous avez apprise en secondaire ressemble déjà beaucoup à un programme informatique [(cf figure "Second degré")](#2deg).

<figure>
    <a id='2deg'></a>
    <div id='diagram_2deg'></div>
    <figcaption>Second degré</figcaption>
</figure>
<script type="module" defer>
    const draw = await Doc.Draw('#diagram_2deg', 600, 600)
    const start = draw.start()
    //const ghost = draw.dummy().rightOf(start, 2)
    const delta = draw.round('calculer <code>b*b-4*a*c</code> et appeler le résultat D').belowOf(start)
    const test_delta = draw.round('Est-ce que D est négatif ?').belowOf(delta)
    const if1 = draw.diamond().belowOf(test_delta)
    const oui1 = draw.node('oui').absolute(if1, 50, 0)
    const non1 = draw.node('non').belowOf(if1)
    const test_null = draw.round('Est-ce que D est nul ?').belowOf(non1)
    const if2 = draw.diamond().belowOf(test_null)
    const oui2 = draw.node('oui').absolute(if2, 50, 0)
    const non2 = draw.node('non').belowOf(if2)
    const root1 = draw.round('La 1<sup>re</sup> racine est <code>(-b+sqrt(D))/(2*a)</code>').belowOf(non2)
    const root2 = draw.round('La 2<sup>e</sup> racine est <code>(-b-sqrt(D))/(2*a)</code>').belowOf(root1)
    const dummy = draw.dummy().belowOf(root2)
    const end = draw.end().belowOf(dummy)
    const noroot = draw.round('Pas de racine réelle').width(150).absolute(test_null, 270, -30)
    const droot = draw.round('La racine double est <code>-b/(2*a)</code>').width(150).absolute(if2, 170, 0)
    draw.polyline([start, '-->', delta, '--', test_delta, '-->', if1, '--', non1, '--', test_null, '-->', if2, '--', non2, '--', root1, '--', root2, '--', dummy, '-->', end])
    draw.polyline([if2, '--', oui2, '-->', droot, '|->', dummy])
    draw.polyline([if1, '--', oui1, '-|>', noroot, '|-', dummy])
    draw.done()
</script>

