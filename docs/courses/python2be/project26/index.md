---
title: Projet 2026 - Kamisado
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/r5DPHxj5j_Q?si=U-Oha1n2620RNY7L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Énoncé

Vous devez réaliser une intelligence artificielle pour le jeu Kamisado. Votre IA
devra interagir avec une
[application gérant les parties](https://github.com/qlurkin/PI2CChampionshipRunner)
pour participer à un championnat organisé entre toutes les IA du labo.
[Les informations spécifiques au jeu Kamisado se trouvent ici](https://github.com/qlurkin/PI2CChampionshipRunner/tree/main/games/kamisado).
Les parties se feront en une manche mais utiliseront la mise en place avec les
36 jetons de dispositions initiales _(cf. les règles)_.

## Modalités de remise

Le projet est à réaliser par binôme.

Votre projet doit être remis via GitHub. Créez une repository séparée de celle
du gestionnaire de partie. Elle devra contenir au minimum:

- Le script python de votre client IA
- Un `README.md` expliquant la stratégie et les bibliothèques utilisées (Et les
  matricules des deux étudiants)

**Vous devez avoir remis votre lien Github et _pusher_ pour le 7 mai 12h45.**

## Grille de notation

- L'IA démarre: **1**
- L'IA s'inscrit auprès du serveur de parties: **2**
- Si l'IA parvient à s'inscrire:
  - Vos commits sont corrects: **2**
  - Vos tests couvrent plus de 50% de votre code: **1**
  - Vos tests couvrent plus de 80% de votre code: **1**
  - L'IA répond à la requête `move`: **1**
  - La stratégie est intéressante: **1**
  - Le code est convenable (noms des variables et fonctions, commentaires,...):
    **2**
  - Le fichier `README.md` explique la stratégie et les bibliothèques utilisées:
    **2**
  - Durant le championnat:
    - L'IA est mieux classée que `Random` : **2**

      Une IA jouant aléatoirement mais correctement (sans `Bad Move`)
      participera à la compétition.

    - L'IA génère moins de 3 `Bad Move` par partie (en moyenne sur l'ensemble du
      tournoi): **0.5**
    - L'IA génère moins de 2 `Bad Move` par partie (en moyenne sur l'ensemble du
      tournoi): **0.5**
    - L'IA génère moins de 1 `Bad Move` par partie (en moyenne sur l'ensemble du
      tournoi): **0.5**
    - L'IA n'a généré aucun `Bad Move`: **1**
    - Bonus classement (1<sup>er</sup>: **2.5**, 2<sup>e</sup>: **2**,
      3<sup>e</sup>: **1.5**, 4<sup>e</sup>: **1**, 5<sup>e</sup>: **0.5**)

**En cas de plagiat entre groupe, tout les étudiants impliqués auront 0** **En
cas d'utilisation abusive d'outils de génération de code, des pénalités pourront
être appliquées**
