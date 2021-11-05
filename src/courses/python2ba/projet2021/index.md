---
title: Conway's Game of Life
---

# Projet 2021 <small>Conway's Game of Life</small>

## introduction

Le jeu de la vie de John Horton Conway est une simulation de vie simplifiée. Elle se déroule sur une grille à deux dimensions. Les cases de la grille sont appelées des cellules. Chaque cellule peut soit être vivante soit être morte. Chaque cellule a 8 voisines (horizontalement, verticalement et diagonalement).

La simulation évolue dans le temps par étapes. A chaque étape, Le changement d'état d'une cellule dépend de l'état de ses cellules voisines à l'étape précédente. Les règles sont les suivantes:

- une cellule morte possédant exactement trois voisines vivantes devient vivante,
- une cellule vivante possédant deux ou trois voisines vivantes le reste, sinon elle meurt.

## Cahier des charges

Vous devez écrire un programme en utilisant **la bibliothèque Kivy** qui implémente le jeu de la vie de Conway.

En particulier votre programme devra (obligatoire):

- afficher une grille de cellules de 40 de large et de 30 de haut, *(3 points)*
- produire une étape à partir de la précédente, *(4 points)*
- permettre de démarrer la simulation et de la mettre en pause ([`kivy.clock`](https://kivy.org/doc/stable/api-kivy.clock.html)), *(3 points)*
- permettre de changer l'état d'une cellule en cliquant dessus, *(3 points)*
- permettre de charger une configuration de cellules à partir d'un fichier JSON, *(3 points)*
- permettre de générer une configuration de cellules aléatoirement ([module `random`](https://docs.python.org/3.9/library/random.html)). *(2 points)*

De plus, votre programme pourra (optionnel):

- permettre de choisir la taille de la grille, *(3 points)*
- permettre de sauver une configuration de cellules dans un fichier JSON, *(1 point)*
- avoir un visuel particulièrement soigné. *(1 point)*

Le tout est noté sur 20 points. Vous constatez que si vous vous limitez aux points obligatoires vous ne pouvez obtenir que 18 points. Si vous obtenez plus que 20 points, votre note sera majorée à 20/20.

## Evaluation

Les projets sont à réaliser seul ou à deux pour la 8e séance de labo. Durant cette séance, vous serez interrogés sur votre code. Le but de cette défense est d’identifier votre niveau de maîtrise de ce code. Le niveau de maîtrise est coté sur 1 et la note finale est calculée comme suit $$ n_f = n_m \times min(n_{cdc}, 20) $$ où $n_f$ est la note finale, $n_m$ est la note de maîtrise du code et $n_{cdc}$ est la note obtenue sur base du cahier des charges.

Pour les groupes de deux, chaque membre pourra avoir une note de maîtrise différente. De plus, chaque membre devra maîtriser l’ensemble du code.

Si un plagiat manifeste est constaté entre projets, tous les étudiants impliqués seront sanctionnés d’une note nulle.

## Ressources

Bien qu’il soit possible de réaliser un très bon projet avec uniquement les concepts vus au cours, il est fort possible que vous vouliez aller plus loin. Le meilleur endroit pour trouver des réponses par rapport à `kivy` est le [site de documentation officiel](https://kivy.org/doc/stable)



<script>
    function init() {
        document.body.style.backgroundSize = "100%"
        document.body.style.imageRendering = "pixelated"
        const width = 40
        const height = 80
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height

        let context = undefined
        if (canvas.getContext) {
            context = canvas.getContext('2d')
        }

        return {
            canvas,
            width,
            height,
            context
        }
    }

    function setPixel(x, y, state, ctx) {
        if(state)
        {
            ctx.context.fillStyle = "rgba(128, 128, 128, 0.15)"
            ctx.context.fillRect( x, y, 1, 1 )
        }
    }

    function drawWorld(world, ctx) {
        ctx.canvas.width = ctx.canvas.width
        for(let x=0; x<ctx.width; x++) {
            for(let y=0; y<ctx.height; y++) {
                setPixel(x, y, world[x][y], ctx)
            }
        }
    }

    function countNeighbor(world, x, y, ctx) {
        function mod(n, d) {
            return ((n % d) + d) % d
        }

        function get(x, y) {
            return world[mod(x, ctx.width)][mod(y, ctx.height)]
        }

        let count = 0
        for(let X=x-1; X<=x+1; X++)
            for(let Y=y-1; Y<=y+1; Y++)
                if(X != x || Y != y)
                    if(get(X, Y))
                        count++
        return count
    }

    function createGrid(ctx) {
        grid = []
        for(let x=0; x<ctx.width; x++) {
            grid.push([])
            for(let y=0; y<ctx.height; y++) {
                grid[x].push(Math.random()>0.5 ? true : false)
            }
        }
        return grid
    }

    function next(cur, prev, ctx) {
        for(let x=0; x<ctx.width; x++) {
            for(let y=0; y<ctx.height; y++) {
                const neighbor = countNeighbor(prev, x, y, ctx)
                const alive = prev[x][y]
                if(alive) {
                    if(neighbor == 2 || neighbor == 3) cur[x][y] = true
                    else cur[x][y] = false
                }
                else {
                    if(neighbor == 3) cur[x][y] = true
                    else cur[x][y] = false
                }
            }
        }
        drawWorld(cur, ctx)
        document.body.style.backgroundImage = `url('${ctx.canvas.toDataURL()}')`;
        setTimeout(() => { next(prev, cur, ctx) }, 500)
    }

    function main() {
        const ctx = init()
        next(createGrid(ctx), createGrid(ctx), ctx)
    }

    main()
</script>