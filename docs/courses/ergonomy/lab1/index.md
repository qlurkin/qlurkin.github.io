---
title: 'ER4C - Labo 1'
subtitle: 'Responsive Design'
css: './style.css'
---

<script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js"></script>

## _Mobile First_

De nos jours, la plupart des contacts entre une société et ses clients se font via un téléphone portable. Il est donc très important de soigner l'expérience utilisateur sur les écrans de petites tailles.

Il est cependant toujours nécessaire de supporter les utilisateurs sur ordinateurs de bureau. Et comme il est plus facile d'utiliser plus d'espace que d'en utiliser moins, il est généralement recommandé de commencer la conception d'une interface par sa version mobile. C'est dans un second temps que l'on adapte l'interface pour les écrans plus grands.

## Le _Responsive Web Design_

Lorsqu'on souhaite supporter une large gamme d'écrans, plusieurs approches sont possibles :

- créer des versions complètement différentes du site pour chaque type d'appareil,
- créer une seule interface capable de s'adapter à toutes les tailles d'écrans.

Avoir plusieurs versions d'un site pose généralement plus de problèmes qu'autre chose : Cela multiplie le temps de développement et les différentes versions finissent souvent par diverger dans les fonctionnalités accessibles aux utilisateurs.

La conception d'interfaces s'adaptant à l'écran de l'utilisateur et généralement appelée _Responsive Design_ mais ce terme a évolué avec le temps et englobe aujourd'hui le respect de certaines préférences utilisateur.

En pratique, on a un seul site (un _markup_ HTML) et on utilise le CSS pour rendre le site _Responsive_.

## Viewport

Le première chose à faire pour avoir un site qui s'affiche correctement sur téléphones portables est de définir le _viewport_ dans le `<head>` de l'HTML. En effet les sites qui ne le font pas sont considérés comme des sites datant d'avant l'apparition des navigateurs mobiles et son redimensionnés pour s'afficher comme s'ils étaient sur un écran d'ordinateur plus grand. Cela conduit souvent à du texte très petit et des éléments cliquables très difficiles à viser avec le doigt.

Essayez d'accéder [à la page suivante](./no_viewport.html) avec votre téléphone mobile.

la définition du _viewport_ se fait comme ceci :

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Vous pouvez voir l'effet sur [cette version de la page précédente](./viewport.html) où le _viewport_ a été ajouté.

## Le CSS

A l'origine, l'HTML servait essentiellement à mettre en forme une page web. De nos jours, l'HTML sert plutôt à structurer le document en y ajoutant des informations sémantiques. Le rôle de l'HTML n'est donc plus du tout graphique. C'est maintenant le CSS qui a pour objectif de spécifier comment les éléments doivent s'afficher.

Une règles CSS prend la forme suivante :

```css
selector {
 property: value;
 ...
}
```

Le sélecteur sert a spécifier quelles balises seront affectées par la règle. La propriété sert à définir quel attribut de la balise est modifié.

Il existe une large gamme de sélecteurs. Imaginons la balise générique suivante :

```html
<element id="identifiant" class="classe1 classe2"></element>
```

Voici quelques exemples de sélecteurs :

- `element`: sélectionne les balises `element`
- `.classe`: sélectionne les balises ayant la classe `classe`
- `#identifiant`: sélectionne les balises ayant l'identificateur `identifiant`
- `selecteur1, selecteur2`: les `selecteur1` et les `selecteur2`
- `selecteur1 selecteur2`: les `selecteur2` descendant d'un `selecteur1`
- `selecteur1 > selecteur2`: les `selecteur2` descendant direct d'un `selecteur1`

Vous trouverez plus d'informations sur les sélecteurs sur [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)

<!-- ## Exercice -->

<!--Dans <a href="./title_strong_red.html" download>cette page</a>, ajoutez une règle CSS pour que toutes les balises `<strong>` se trouvant dans des balises `<h1>` ou `<h2>` aient leur texte en rouge.-->

## La propriété `display`

Cette propriété CSS contrôle la position d'un élément par rapport aux autres. Nous allons voir quelques-unes de ses valeurs possibles.

### `display: inline`

Les éléments `inline` s'affichent comme des caractères dans une phrase. Il se place les uns à côté des autres et leur taille est essentiellement déterminée par leur contenu.

Les balises `<strong>`, `<em>` et `<span>` sont `inline` par défaut. l'HTML :

```html
<strong>hello</strong> <em>ça va</em> <span class="punctuation">?</span>
```

s'affiche :

<div style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
<strong>hello</strong> <em>ça va</em>
<span class="punctuation">?</span>
</div>

### `display: block`

Les éléments `block` s'affichent les uns en dessous des autres comme des paragraphes dans un texte. Par défaut, ils prennent généralement toute la largeur disponible et leur hauteur est déterminée par le contenu.

Les balises `<p>` et `<div>` sont des `block` par défaut. L'HTML :

```html
<p>hello world !!</p>
<div class="salutation">Hi !</div>
```

s'affiche :

<div style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
<p>hello world !!</p><div class="salutation">Hi !</div>
</div>

<!-- ### Exercice -->
<!---->
<!-- Par défaut la balise image `<img>` s'affiche en mode `inline`. Dans <a href="./pokemon.html" download>cette page</a> les images s'affichent les unes à côté des autres. Modifiez le CSS pour qu'elle s'affichent les unes en dessous des autres. -->

### `display: flex`

Les éléments `flex` organisent leur contenu horizontalement ou verticalement. Il y a beaucoup de propriétés associées au mode d'affichage `flex`. Pour plus de détails vous pouvez consulter [ce site](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

A titre d'exemple, voici comment réaliser une présentation en trois colonnes en utilisant `display: flex`. Les colonnes droite et gauche ont une largeur fixe et la colonne centrale s'adapte à l'espace restant :

```html
<div class="row">
  <nav class="left"></nav>
  <main></main>
  <nav class="right"></nav>
</div>
```

```css
.row {
  display: flex;
  justify-content: space-between;
}

.left,
.right {
  flex-grow: 0;
  flex-shrink: 0;
  width: 100px;
  background-color: green;
}

main {
  flex-grow: 1;
  flex-shrink: 0;
  background-color: red;
}
```

résultat :

<div style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 1rem;">
<div class="row" style="display: flex; justify-content: space-between; column-gap: 0">
 <nav class="left" style="flex-grow: 0; flex-shrink: 0; width: 100px; background-color: green; height: 100px; "></nav>
 <div style="flex-grow: 1; flex-shrink: 0; background-color: red;"></div>
 <nav class="right" style="flex-grow: 0; flex-shrink: 0; width: 100px; background-color: green;"></nav>
</div>
</div>

Voici un autre exemple permettant de centrer un bloc verticalement et horizontalement :

```html
<html>
  <body>
    <main></main>
  </body>
</html>
```

```css
html,
body {
  height: 100%;
}

body {
  background-color: green;
  display: flex;
  justify-content: center;
  align-items: center;
}

main {
  background-color: red;
}
```

<div style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 1rem;">
<div style="height: 200px; background-color: green; display: flex; justify-content: center; align-items: center;">
  <div style="background-color: red; width: 100px; height: 50px;"></div>
</div>
</div>

Le mode d'affichage `flex` est supporté par la plupart des navigateurs modernes :

<p class="ciu_embed" data-feature="flexbox" data-periods="future_1,current,past_1,past_2" data-accessible-colours="false">
  <a href="http://caniuse.com/#feat=flexbox">
  <picture>
    <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/flexbox.webp">
    <img src="https://caniuse.bitsofco.de/image/flexbox.png" alt="Data on support for the flexbox feature across the major browsers from caniuse.com">
  </picture>
  </a>
</p>

<!-- ### Exercice -->
<!---->
<!-- Cette <a href="./flex.html" download>page</a> contient 2 paragraphes qui s'affichent par défaut l'un en dessous de l'autre. Utilisez l'affichage `flex` pour les afficher l'un à côté de l'autre. -->

### `display: grid`

Le mode d'affichage `grid` permet d'organiser le contenu d'un élément selon une grille à deux dimensions. C'est l'outil ultime de l'organisation des éléments d'une page web. Vous trouverez les détails sur les propriétés associées sur [cette page](https://css-tricks.com/snippets/css/complete-guide-grid/).

Comme exemple, voici l'organisation d'une page avec un entête, un pied de page et deux colonnes (une à largeur fixe et l'autre variable) :

```html
<body>
  <header></header>
  <main></main>
  <nav></nav>
  <footer></footer>
</body>
```

```css
header {
  grid-area: header;
  background-color: red;
}
main {
  grid-area: main;
  background-color: green;
}
nav {
  grid-area: sidebar;
  background-color: blue;
}
footer {
  grid-area: footer;
  background-color: yellow;
}

body {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 100px;
  grid-template-rows: auto;
  grid-template-areas:
    'header header header header'
    'main main main sidebar'
    'footer footer footer footer';
}
```

Résultat :

<div style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 1rem;">
<div style='display: grid; grid-template-columns: 1fr 1fr 1fr 100px; grid-template-rows: auto; grid-template-areas: "header header header header" "main main main sidebar" "footer footer footer footer";'>
  <div style="grid-area: header; background-color: red; height: 50px;"></div>
  <div style="grid-area: main; background-color: green; height: 50px;"></div>
  <div style="grid-area: sidebar; background-color: blue; height: 50px;"></div>
  <div style="grid-area: footer; background-color: yellow; height: 50px;"></div>
</div>
</div>

Le mode d'affichage `grid` est supporté par la plupart des navigateurs modernes :

<p class="ciu_embed" data-feature="css-grid" data-periods="future_1,current,past_1,past_2" data-accessible-colours="false">
  <a href="http://caniuse.com/#feat=css-grid">
    <picture>
      <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/css-grid.webp">
      <img src="https://caniuse.bitsofco.de/image/css-grid.png" alt="Data on support for the css-grid feature across the major browsers from caniuse.com">
    </picture>
  </a>
</p>

<!-- ### Exercice -->
<!---->
<!-- <a href="./tictactoe.html" download>Cette page</a> contient un `<div class="board">` contenant 9 `<div class="cell">` qui représentent les cases d'une grille de OXO. Utilisez l'affichage `grid` pour afficher la grille correctement. -->

## Les règles _Media_

Les règles média permettent de spécifier des règles CSS qui ne doivent s'appliquer que pour certaines tailles d'écran. C'est l'outil indispensable du _Responsive Design_ !

Les règles CSS contenue dans la règle média suivante ne s'appliqueront que si la largeur de la page est inférieure à 800 pixels :

```css
@media (max-width: 800px) {
}
```

Les règles média permettent aussi de réagir à certaines préférences de l'utilisateur :

### La préférence pour un affichage sombre

La plupart des systèmes d'exploitation permettent de choisir entre un thème clair ou sombre. Il est possible d'adapter la page à cette préférence. Exemple : le site de [GitHub](https://github.com)

```css
@media (prefers-color-scheme: dark) {
}

@media (prefers-color-scheme: light) {
}
```

### Le préférences pour une réduction des animations

Certains utilisateurs sont dérangés par le présence d'un trop grand nombre d'animations. Il est possible dans le plupart des systèmes d'exploitation de demander de diminuer les animations.

<figure>
  <img src="./reduce_motion.png" alt="">
    <figcaption>Paramètre dans MacOS</figcaption>
</figure>

```css
@media (prefers-reduced-motion: reduce) {
}
```

Si vous avez cette préférence activée sur votre OS, la boîte ci-dessous ne bougera pas :

<div style="margin-bottom: 1rem;"><div class="animation">boîte animée</div></div>

[Un autre exemple de page](../../gpu/lab3/index.html) qui suit ce paramètre.

<!-- ## Exercice -->
<!---->
<!-- Transformez <a href="./no_responsive.html" download>cette page</a> pour la rendre *Responsive*. -->

<script>

</script>
