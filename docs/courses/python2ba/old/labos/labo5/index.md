---
lang: en
title: Labo 5 - Manipulations de fichiers textes
viewport: width=device-width, initial-scale=1.0
---

# IN2L - Informatique appliquée [Manipulations de fichiers textes]{.small}

### Objectifs {#objectifs .nocount}

-   Savoir ouvrir un fichier texte et lire son contenu
-   Savoir créer un fichier texte et y écrire du contenu
-   Savoir importer un dictionnaire Python depuis un document JSON
    stocké dans un fichier

## Application

1.  Écrire un programme pygame qui permet de charger un fichier JSON de
    la forme suivante:

    ``` lang-json
                    {
                        "firstname": "Quentin",
                        "lastname": "Lurkin",
                        "birthdate": "24/08/1982",
                        "address": {
                            "street": "Promenade de l'Alma",
                            "number": "50",
                            "CP": 1200,
                            "City": "Brussels",
                            "Country": "Belgium"
                        }
                    }
                
    ```

    et d\'afficher ses informations de façon lisible.

    L\'utilisateur pourra introduire le nom du fichier dans une boite de
    texte et il recevra un message d\'erreur si le fichier n\'existe pas
    ou s\'il ne respecte pas le format.

2.  Définir une fonction `computesum(path)`{.lang-python} qui reçoit un
    paramètre:

    -   `path`{.lang-python} contient le chemin vers un fichier sur
        l'ordinateur,

    qui est sensé contenir un nombre par ligne, et qui affiche à l'écran
    la somme de tous ces nombres. Attention, le fichier peut ne pas
    exister auquel cas un message d'erreur est affiché. Le fichier peut
    également être vide, dans ce cas la somme est nulle. De plus, des
    lignes peuvent être erronées (ne contiennent pas un nombre); ces
    dernières doivent simplement être ignorées. Voici un exemple d'appel
    avec le contenu du fichier `data.txt`{.lang-plaintext} et le
    résultat produit:

    ``` lang-plaintext
                    13
                    7.5
                    2.1
                    DEUX
                    4.4
                    100
                
    ```

    ``` lang-python
                    computesum('data.txt')
                
    ```

    ``` lang-plaintext
                    La somme est 127.0
                
    ```

3.  Crééz un fichier texte contenant un document JSON, comme l'exemple
    minimal ci-dessous. Chargez ensuite le fichier et récupérez son
    contenu comme un dictionnaire Python. Pour chaque pays, ajoutez une
    entrée `nblang`{.lang-python} qui contient le nombre de langues
    officielles. Sauvegardez ensuite le dictionnaire mis à jour dans le
    même fichier.

    ``` lang-json
                    {
                        "Belgium": {
                            "capital": "Brussels",
                            "languages": ["french", "dutch", "german"]
                        },
                        "China": {
                            "capital": "Beijing",
                            "languages": ["mandarin chinese"]
                        }
                    }
                
    ```
