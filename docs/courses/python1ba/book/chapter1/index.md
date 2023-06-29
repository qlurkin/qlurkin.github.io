---
title: Chapitre 1
subtitle: La programmation
---

## Qu'est-ce qu'un programme?

De manière générale, un programme est une suite d'actions à entreprendre visant à atteindre un but. On peut par exemple dire d'une recette de cuisine que c'est un programme pour réaliser un plat (cf <span data-link='oeuf'>figure</span>). On parle également de programme pour un lave-linge où, suivant le type de linge, la suite d'actions (rotations du tambour) est différente.

<figure>
    <div id='oeuf' data-ref='figure'></div>
    <figcaption><span data-caption='oeuf'>Cuire un œuf</span></figcaption>
</figure>
<script type="module" defer>
    const draw = await Doc.Draw('#oeuf', 350, 500)
    const start = draw.start().move(1, 2)
    const hot = draw.round('faire chauffer la poêle').belowOf(start)
    const oil = draw.round('mettre de l\'huile dans la poêle').belowOf(hot)
    const egg = draw.round('casser l\'œuf dans la poêle').belowOf(oil)
    const salt = draw.round('ajouter du sel et du poivre').belowOf(egg)
    const dummyTop = draw.dummy().belowOf(salt)
    const cooked = draw.round('Est-ce que c\'est cuit ?').belowOf(dummyTop)
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

Dans le domaine de l'informatique, un programme est une suite d'instructions visant à la résolution d'un problème. La résolution d'une équation du deuxième degré que vous avez apprise en secondaire ressemble déjà beaucoup à un programme informatique (cf <span data-link='d2deg'>figure</span>).

<figure>
    <div id='d2deg' data-ref='figure'></div>
    <figcaption><span data-caption='d2deg'>Second degré</span></figcaption>
</figure>
<script type="module" defer>
    const draw = await Doc.Draw('#d2deg', 600, 600)
    const start = draw.start()
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

### Code et langage de programmation

Les figures <span data-link='oeuf'></span> et <span data-link='d2deg'></span> sont des représentations graphiques de programmes. On les appelle organigrammes ou encore diagrammes d'activité. Un vrai programme se fait dans un langage de programmation. Un programme écrit dans un langage de programmation se présente donc comme du texte. Ce texte est appelé le code du programme.

Une façon d'écrire en texte le programme de résolution d'une équation du second degré pourrait être la suivante :

<figure id="code_2deg" data-ref='code'>

<pre>
b*b-4*a*c <strong>&#8594;</strong> D
<strong>si</strong> D &lt; 0 <strong>alors:</strong>
    <strong>affiche</strong> <span class='hljs-string'>"Pas de solution réelle"</span>
<strong>sinon:</strong>
    <strong>si</strong> D = 0 <strong>alors:</strong>
        <strong>affiche</strong> <span class='hljs-string'>"La racine double est"</span> -b/(2*a)
    <strong>sinon:</strong>
        <strong>affiche</strong> <span class='hljs-string'>"La 1<sup>re</sup> racine est"</span> (-b-sqrt(D))/(2*a)
        <strong>affiche</strong> <span class='hljs-string'>"La 2<sup>e</sup> racine est"</span> (-b+sqrt(D))/(2*a)
</pre>

<figcaption><span data-caption='code_2deg'>Pseudo code, second degré</span></figcaption>
</figure>

Le texte ci-dessus est souvent appelé "pseudo-code" car il a une structure très proche d'un vrai code de programme mais il n'est écrit dans aucun langage de programmation particulier.

Pour écrire un vrai programme, il faut choisir un langage de programmation et respecter sa syntaxe. Le langage que nous allons utiliser dans ce cours est le **Python**. Voici la version Python du précédent pseudo-code:

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
        print("La 2e racine est", (-b-sqrt(D))/(2*a))
```
<figcaption><span data-caption='python_2deg'>Python, second degré</span></figcaption>
<figure>

Dans un programme, chaque ligne du code est une instruction. Les instructions sont exécutées dans l'ordre où elles apparaissent dans le code du programme.

Comme le code d'un programme est un simple texte, la seule chose dont on a besoin pour écrire un programme est un éditeur de texte (bloc-note, ...). Il est cependant plus pratique d'utiliser un éditeur spécialisé pour écrire le code. Ces éditeurs facilitent fortement l'écriture et la lisibilité du code (Notepad++, Sublime Text, ...)

Pour pouvoir exécuter le code d'un programme, il est par contre indispensable d'avoir une application capable de comprendre le langage utilisé dans le code. Dans le cas de Python, on appelle cette application "l'interpréteur Python".

Il existe également des éditeurs qui facilitent à la fois l'écriture, l'exécution et le débogage. On parle alors d'IDE pour Integrated Development Environment (pyCharm, Spyder, ...)


