---
title: Labo 5
subtitle: Manipulations de documents
typst: true
css: style.css
---

1.  Créez un fichier texte contenant un document JSON, comme l'exemple
    minimal ci-dessous. Chargez ensuite le fichier et récupérez son
    contenu comme un dictionnaire Python. Pour chaque pays, ajoutez une
    entrée `nblang` qui contient le nombre de langues
    officielles. Sauvegardez ensuite le dictionnaire mis à jour dans le
    même fichier.

    ```json
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

2.  Créez une fonction qui reçoit un chemin vers un [fichier Excel](./circles.xlsx). Le fichier
    aura la structure suivante:

    |     | A   | B   | C      | D   | E     | F    |
    | --- | --- | --- | ------ | --- | ----- | ---- |
    | 1   | X   | Y   | Radius | Red | Green | Blue |
    | 2   | 20  | 20  | 15     | 255 | 0     | 0    |
    | 3   | 100 | 120 | 30     | 0   | 255   | 255  |
    | 4   | 300 | 40  | 40     | 255 | 0     | 255  |

    La fonction recevra aussi les dimensions d'une image qu'elle devra créer et
    dans laquelle elle devra [dessiner les cercles](https://pillow.readthedocs.io/en/stable/reference/ImageDraw.html#PIL.ImageDraw.ImageDraw.circle) décrits dans le fichier Excel.
    L'image devra être sauvée dans un fichier ayant le même nom que le fichier Excel
    (mais avec l'extension `.jpg`) et dans le même dossier que celui-ci.
