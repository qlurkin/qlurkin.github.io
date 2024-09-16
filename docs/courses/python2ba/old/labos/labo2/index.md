---
lang: en
title: Labo 2 - Imbrications de données
viewport: width=device-width, initial-scale=1.0
---

# IN2L - Informatique appliquée [Imbrications de données]{.small}

### Objectifs {#objectifs .nocount}

-   Savoir manipuler les tuples
-   Savoir manipuler les structures de données imbriquées
-   Savoir manipuler les chaines de caractères et appeler des méthodes
    sur des objets `str`

## Application

1.  Représentons des points dans l\'espace avec des tuples à trois
    éléments. Définissez une fonction
    `def distance(p1, p2)`{.lang-python} qui calcule la distance entre
    les deux points passés en paramètres. Voici un exemple d\'appel de
    la fonction, et le résultat attendu:

    ``` lang-python
                        d = distance((1, 2, -1), (0, 2, 1))
                        print(d)
                    
    ```

    ``` lang-plaintext
                        2.23606797749979
                    
    ```

    Pour rappel, la distance entre les points \\(P1(x_1, y_1, z_1)\\) et
    \\(P2(x_2, y_2, z_2)\\) est donnée par: \$\$ d(P_1,
    P_2)=\\sqrt{(x_2 - x_1)\^2 + (y_2 - y_1)\^2 + (z_2 - z_1)\^2} \$\$

2.  Définissez une fonction `def buildsentence(words)`{.lang-python} qui
    reçoit en paramètre un tuple de mots, et qui construit une phrase
    composée de la succession de ces mots, séparés par des espaces.
    Voici un exemple d\'appel de la fonction, et le résultat attendu:

    ``` {.lang-python .wrap}
                        words = ("Bonjour", "monsieur", "Lurkin,", "ça", "va", "bien", "?")
                        sentence = buildsentence(words)
                        print(sentence)
                    
    ```

    ``` lang-plaintext
                        Bonjour monsieur Lurkin, ça va bien ?
                    
    ```

3.  Définissez une fonction `findAll(list, element)`{.lang-python} qui
    est une variante de la fonction `find`{.lang-python} vue au cours,
    mais qui renvoie la liste de tous les indices où l\'élément cherché
    se trouve dans la liste donnée. Voici un exemple d\'appel de la
    fonction, et le résultat attendu:

    ``` {.lang-python .wrap}
                        a = [1, 9, -3, 15, 1, 8]
                        print(findall(a, 1))
                        print(findall(a, 2))
                    
    ```

    ``` lang-plaintext
                        (True, [0, 4])
                        (False, [])
                    
    ```

4.  Définir une fonction `def buildContacts(name, phone)`{.lang-python}
    qui reçoit deux listes de même taille en paramètre, contenant le nom
    et le numéro de téléphone de vos contacts, et construit un
    dictionnaire représentant votre carnet de contacts. Le dictionnaire
    construit possède une clé `"contacts"` dont la valeur est une liste
    de dictionnaires représentant chacun un contact. Chaque dictionnaire
    de contact aura deux clés, `"name"` et `"phone"` dont les valeurs
    sont le nom et le numéro de téléphone du contact.

5.  Soit un dictionnaire qui permet de gérer les stocks d\'un magasin.
    Chaque article possède un nom qui est la clé, et la quantité restant
    en stock ainsi que le prix en valeur. Par exemple :

    ``` lang-python
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

    Définir une fonction `def totalValue(stock)`{.lang-python} qui
    calcule la valeur totale d\'un stock (somme des quantité × prix,
    pour chaque article).

6.  Définir une fonction `def merge(S, T)`{.lang-python} qui fusionne
    deux dictionnaires représentant les stocks S et T de deux magasins
    (un stock est défini comme à la question précédente). La fonction
    construit donc un nouveau dictionnaire représentant le stock
    conjoint des deux magasins (on supposera que les prix des articles
    communs sont les mêmes).

## Réflexion

On va réaliser un programme dont le but est de justifier un texte étant
donné une largeur spécifiée. Vous devez définir une fonction
`def justify(text, width)`{.lang-python} qui va produire une version
justifiée du texte, de telle sorte qu\'il occupe la largeur spécifiée.

Pour vous aider, vous pouvez utiliser les méthodes suivantes,
applicables aux objets de type `str`{.lang-python}:

-   La méthode `split(char)`{.lang-python} découpe une chaine de
    caractères en une liste, en coupant selon le caractère spécifié.
-   La méthode `join(list)`{.lang-python} permet de construire une
    chaine de caractères en joignant les éléments de la liste spécifiée
    en les séparant par la chaine représentée par l\'objet cible.

a.  Pour commencer, écrivez une fonction
    `def extract(words, width)`{.lang-python} qui reçoit une liste de
    mots `words`{.lang-python} et retire de cette liste la sous-liste
    contenant ses `n`{.lang-python} premiers mots, et la renvoie, de
    telle sorte que le nombre de caractères qu\'il faut pour écrire ces
    `n`{.lang-python} premiers mots en les séparant par des espaces soit
    inférieur ou égal à `width`{.lang-python}. Voici un exemple d\'un
    appel à cettefonction:

    ``` {.lang-python .wrap}
                        list = ["La", "programmation", "en", "Python", "est", "très", "importante"]
                        result = extract(list, 25)
                        print(result)
                        print(list)
                    
    ```

    ``` lang-plaintext
                        ['La', 'programmation', 'en']
                        ['Python', 'est', 'très', 'importante']
                    
    ```

b.  Définissez ensuite la fonction `justify`{.lang-python} de sorte à
    découper la chaine de caractères `text`{.lang-python} en mots, pour
    ensuite appeler la fonction `extract`{.lang-python} afin de traiter
    tout le texte. Voici un exemple d\'appel à cette fonction:

    ``` {.lang-python .wrap}
                        text = "La programmation en Python est très importante et devrait être maitrisée par tout ingénieur au sortir
                        de ses études"
                        print(justify(text , 25))
                    
    ```

    ``` lang-plaintext
                        La programmation en
                        Python est très
                        importante et devrait
                        être maitrisée par tout
                        ingénieur au sortir de
                        ses études
                    
    ```

c.  Enfin, adaptez la fonction `justify`{.lang-python} pour faire en
    sorte d\'ajouter des espaces entre les mots, de manière équilibrée,
    de sorte que chaque ligne fasse le même nombre de caractères (celui
    spécifié). Pour l\'exemple précédent, vous devriez avoir le résultat
    suivant:

    ``` lang-plaintext
                        La    programmation    en
                        Python      est      très
                        importante   et   devrait
                        être  maitrisée  par tout
                        ingénieur  au  sortir  de
                        ses                études
                    
    ```
