---
title: Labo 2
subtitle: Imbrications de données, classes et objets
typst: true
---

## Structures imbriquées

1.  Définir une fonction `def buildContacts(name, phone)`
    qui reçoit deux listes de même taille en paramètre, contenant le nom
    et le numéro de téléphone de vos contacts, et construit un
    dictionnaire représentant votre carnet de contacts. Le dictionnaire
    construit possède une clé `"contacts"` dont la valeur est une liste
    de dictionnaires représentant chacun un contact. Chaque dictionnaire
    de contact aura deux clés, `"name"` et `"phone"` dont les valeurs
    sont le nom et le numéro de téléphone du contact.

2.  Soit un dictionnaire qui permet de gérer les stocks d\'un magasin.
    Chaque article possède un nom qui est la clé, et la quantité restant
    en stock ainsi que le prix en valeur. Par exemple :

    ```python
    stock = {
        'Coca 33cl': {
            'quantity': 5,
            'price': 1.0
        },
        'Nokia 3310': {
            'quantity': 7,
            'price': 35.99
        }
    }
    ```

    Définir une fonction `def totalValue(stock)` qui
    calcule la valeur totale d\'un stock (somme des quantité × prix,
    pour chaque article).

3.  Définir une fonction `def merge(S, T)` qui fusionne
    deux dictionnaires représentant les stocks S et T de deux magasins
    (un stock est défini comme à la question précédente). La fonction
    construit donc un nouveau dictionnaire représentant le stock
    conjoint des deux magasins (on supposera que les prix des articles
    communs sont les mêmes).

## Classes et objets

1.  Définir une `dataclass` `Item` qui représente un article de
    magasin. Un tel article est défini par un code-barres
    (`int`), un nom de produit (`str`) et un
    prix en cents (`int`). On doit pouvoir créer une
    instance de cette classe comme suit :

    ```python
    beer = Item (56273, "Zundert 33 cl", 250)
    print(beer)
    ```

    ```terminal
    Item(code=56273, name='Zundert 33 cl', cents=250)
    ```

2.  Améliorez la classe précédente en y ajoutant une méthode qui permet
    d\'obtenir le prix en euros pour un article et aussi pour une
    quantité d\'article qu\'on commanderait. On doit pouvoir écrire
    l\'exemple suivant:

    ```python
    print(beer.unitprice())
    print(beer.price(10))
    ```

    ```terminal
    2.5
    25.0
    ```

3.  Enfin, ajoutez la méthode `__str__` à votre classe
    pour que l\'article soit joliment affiché lors d\'un
    `print()` :

    ```python
    print(beer)
    ```

    ```terminal
    Zundert 33 cl (code: 56273, prix: 2.5€)
    ```

4.  Définir une classe `Answer` qui représente une réponse
    d\'une question de type QCM. Une telle réponse est composée de deux
    attributs:

    - un identifiant (une chaine de caractères);
    - l\'énoncé de la réponse.

    On doit, par exemple, pouvoir écrire le code suivant tel qu\'il
    produise le résultat montré, lors de son exécution (il vous faudra
    définir la fonction `__str__`) :

    ```python
    a1 = Answer ('A1', "Il est blanc.")
    a2 = Answer ('A2', "Il n'en a pas.")
    a3 = Answer ('A1', "Shuuut, je joue à Fortnite.")
    a4 = Answer ('A3', "Il est rayé.")
    print (a1, a2, a3, a4, sep='\n')
    ```

    ```terminal
    [A1] Il est blanc.
    [A2] Il n'en a pas.
    [A1] Shuuut, je joue à Fortnite.
    [A3] Il est rayé.
    ```

5.  Définir une classe `Question` qui représente une
    question d\'un QCM. Une telle question est composée de quatres
    attributs:

    - un identifiant (une chaine de caractères);
    - l\'énoncé de la question;
    - une liste de réponses (dont les identifiants sont uniques).
    - un dictionnaire associant les identifiants des réponses avec le fait qu'elles soient vraies ou fausses.

    La liste de réponses est initialement vide.
    Enfin, ajoutez une méthode `add` qui ajoute une
    réponse à la question (s\'il n\'y en avait pas déjà une avec le même
    identifiant). On doit, par exemple, pouvoir écrire le code suivant
    tel qu\'il produise le résultat montré, lors de son exécution (il
    vous faudra définir la fonction `__str__`):

    ```python
    q1 = Question('Q1', 'Quelle est la couleur du chat de Marchand?')
    q1.add(a1, True)
    q1.add(a2, True)
    q1.add(a3, False) # Ne sera pas ajoutée, car identifiant déjà existant
    q1.add(a4, False)
    print(q1)
    ```

    ```terminal
    [Q1] Quelle est la couleur du chat de Marchand?
        [A1] Il est blanc. (True)
        [A2] Il n'en a pas. (True)
        [A3] Il est rayé. (False)
    ```

## Réflexion

On souhaiterait construire un programme permettant de faire passer un
quizz à un étudiant. Pour cela on va tout d\'abord enrichir la classe
`Question`, puis on écrira le programme principal.

1.  Ajoutez une méthode `ask` dans la classe
    `Question`. Cette méthode permet de poser la question,
    en proposant deux choix de réponse et en s\'assurant qu\'une seule
    bonne réponse soit présentée. Dans un premier temps, parcourez
    simplement la liste des réponses et sélectionnez les successivement
    de sorte à en avoir une seule vraie.

    La méthode demande à l\'utilisateur de rentrer un chiffre qui
    correspond à la réponse qu\'il choisit (1 ou 2) et renvoie un
    booléen (`True` ou `False`) signalant si
    la réponse donnée est bonne ou non. Voici un exemple d\'appel de
    cette méthode `ask` et le résultat produit:

    ```python
    print(q1.ask())
    ```

    ```terminal
    Quelle est la couleur du chat de Marchand?
        1/ Il est blanc.
        2/ Il est rayé.
    Votre réponse? 2
    False
    ```

2.  On désire généraliser la méthode `ask` et pouvoir
    choisir le nombre de réponses que l\'on souhaite voir afficher (par
    défaut, ça doit être deux). Modifiez donc la méthode
    `ask` de sorte que sa signature soit:

    ```python
    def ask(self, nb: int = 2) -> bool:
    ```

    S\'il n\'y a pas assez de réponses pour la question, la méthode doit
    directement renvoyer `False` en affichant un message
    d\'erreur à l\'écran.

3.  Enfin, dernière chose que l\'on veut faire, c\'est un programme
    principal qui va poser plusieurs questions, retenir les réponses
    données et afficher le score à la fin de l\'exécution. Voici un
    exemple d\'exécution du programme:

    ```terminal
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
