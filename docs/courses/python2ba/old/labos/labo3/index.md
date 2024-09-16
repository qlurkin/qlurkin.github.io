---
lang: en
title: Labo 3 - Classes et objets
viewport: width=device-width, initial-scale=1.0
---

# IN2L - Informatique appliquée [Classes et objets]{.small}

### Objectifs {#objectifs .nocount}

-   Savoir définir une nouvelle classe, son constructeur et des méthodes
-   Comprendre une classe, savoir l\'utiliser et en créer des instances
-   Savoir construire un programme de moyenne ampleur combinant des
    classes

## Application

1.  Définir une classe `Item`{.lang-python} qui représente un article de
    magasin. Un tel article est défini par un code-barres
    (`int`{.lang-python}), un nom de produit (`str`{.lang-python}) et un
    prix en cents (`int`{.lang-python}). On doit pouvoir créer une
    instance de cette classe comme suit :

    ``` lang-python
                    beer = Item (56273, "Zundert 33 cl", 250)
                    print(beer)
                
    ```

    ``` lang-plaintext
                        <__main__.Item object at 0x1010647b8>
                
    ```

2.  Améliorez la classe précédente en y ajoutant une méthode qui permet
    d\'obtenir le prix en euros pour un article et aussi pour une
    quantité d\'article qu\'on commanderait. On doit pouvoir écrire
    l\'exemple suivant:

    ``` {.lang-python .wrap}
                    print(beer.unitprice)
                    print(beer.price(10))
                
    ```

    ``` lang-plaintext
                    2.5
                    25.0
                
    ```

3.  Enfin, ajoutez la méthode `__str__`{.lang-python} à votre classe
    pour que l\'article soit joliment affiché lors d\'un
    `print()`{.lang-python} :

    ``` {.lang-python .wrap}
                    print(beer)
                
    ```

    ``` lang-plaintext
                    Zundert 33 cl (code: 56273, prix: 250)
                
    ```

4.  Définir une classe `Answer`{.lang-python} qui représente une réponse
    d\'une question de type QCM. Une telle réponse est composée de deux
    attributs:

    -   un identifiant (une chaine de caractères);
    -   l\'énoncé de la réponse.

    Prévoyez deux variables d\'instance privées, deux accesseurs
    `id`{.lang-python} et `text`{.lang-python} et aucun mutateur. On
    doit, par exemple, pouvoir écrire le code suivant tel qu\'il
    produise le résultat montré, lors de son exécution (il vous faudra
    définir la fonction `__str__`{.lang-python}) :

    ``` {.lang-python .wrap}
                    a1 = Answer ('A1', "Il est blanc.")
                    a2 = Answer ('A2', "Il n'en a pas.")
                    a3 = Answer ('A1', "Shuuut, je joue à Fortnite.")
                    a4 = Answer ('A3', "Il est rayé.")
                    print (a1, a2, a3, a4, sep='\n')
                
    ```

    ``` lang-plaintext
                    [A1] Il est blanc.
                    [A2] Il n'en a pas.
                    [A1] Shuuut, je joue à Fortnite.
                    [A3] Il est rayé.
                
    ```

5.  Définir une classe `Question`{.lang-python} qui représente une
    question d\'un QCM. Une telle question est composée de trois
    attributs:

    -   un identifiant (une chaine de caractères);
    -   l\'énoncé de la question;
    -   une liste de réponses (dont les identifiants sont uniques).

    La liste de réponses est initialement vide. Prévoyez trois variables
    d\'instance privées pour les attributs, deux accesseurs
    `id`{.lang-python} et `text`{.lang-python} et aucun mutateur. De
    plus, prévoyez une variable d\'instance privée de type dictionnaire
    pour retenir, pour chaque réponse, si elle est correcte ou non.
    Enfin, ajoutez une méthode `add`{.lang-python} qui ajoute une
    réponse à la question (s\'il n\'y en avait pas déjà une avec le même
    identifiant). On doit, par exemple, pouvoir écrire le code suivant
    tel qu\'il produise le résultat montré, lors de son exécution (il
    vous faudra définir la fonction `__str__`{.lang-python}):

    ``` lang-python
                    q1 = Question('Q1', 'Quelle est la couleur du chat de Marchand?')
                    q1.add(a1, True)
                    q1.add(a2, True)
                    q1.add(a3, False) # Ne sera pas ajoutée, car identifiant déjà existant
                    q1.add(a4, False)
                    print(q1)
                
    ```

    ``` lang-plaintext
                    [Q1] Quelle est la couleur du chat de Marchand?
                        [A1] Il est blanc. (True)
                        [A2] Il n'en a pas. (True)
                        [A3] Il est rayé. (False)
                
    ```

## Réflexion

On souhaiterait construire un programme permettant de faire passer un
quizz à un étudiant. Pour cela on va tout d\'abord enrichir la classe
`Question`{.lang-python}, puis on écrira le programme principal.

1.  Ajoutez une méthode `ask`{.lang-python} dans la classe
    `Question`{.lang-python}. Cette méthode permet de poser la question,
    en proposant deux choix de réponse et en s\'assurant qu\'une seule
    bonne réponse soit présentée. Dans un premier temps, parcourez
    simplement la liste des réponses et sélectionnez les successivement
    de sorte à en avoir une seule vraie.

    La méthode demande à l\'utilisateur de rentrer un chiffre qui
    correspond à la réponse qu\'il choisit (1 ou 2) et renvoie un
    booléen (`True`{.lang-python} ou `False`{.lang-python}) signalant si
    la réponse donnée est bonne ou non. Voici un exemple d\'appel de
    cette méthode `ask`{.lang-python} et le résultat produit:

    ``` lang-python
                    print(q1.ask())
                
    ```

    ``` lang-plaintext
                    Quelle est la couleur du chat de Marchand?
                        1/ Il est blanc.
                        2/ Il est rayé.
                    Votre réponse? 2
                    False
                
    ```

2.  On désire généraliser la méthode `ask`{.lang-python} et pouvoir
    choisir le nombre de réponses que l\'on souhaite voir afficher (par
    défaut, ça doit être deux). Modifiez donc la méthode
    `ask`{.lang-python} de sorte que sa signature soit:

    ``` lang-python
                    def ask(self, nb=2):
                
    ```

    S\'il n\'y a pas assez de réponses pour la question, la méthode doit
    directement renvoyer `False`{.lang-python} en affichant un message
    d\'erreur à l\'écran.

3.  Enfin, dernière chose que l\'on veut faire, c\'est un programme
    principal qui va poser plusieurs questions, retenir les réponses
    données et afficher le score à la fin de l\'exécution. Voici un
    exemple d\'exécution du programme:

    ``` lang-plaintext
                    === Bienvenue dans myQuizz 2.0 ===

                    Quelle est la couleur du chat de Marchand?
                        1/ Il est blanc.
                        2/ Il est rayé.
                    Votre réponse? 2

                    Pourquoi Mélotte a un PC de gamer ?
                        1/ N'importe quoi, il a un Mac.
                        2/ Parce qu'il joue pendant ses pauses.
                    Votre réponse? 1

                    Peut-on contrôler le cerveau de quelqu'un avec une Arduino?
                        1/ Évidemment, c'est pour cela que les bisseurs 1BA sont tous restés à l'ECAM.
                        2/ Non non, par contre il faut faire attention à la montre de Lurkin.
                    Votre réponse? 1

                    Quizz terminé.
                    Vous avez un score de 1/3.
                
    ```
