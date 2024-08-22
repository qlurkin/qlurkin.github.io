---
title: Cours 5
subtitle: Manipulation de documents
type: deck
author: Quentin Lurkin
typst: true
---

## JavaScript Object Notation (JSON)

- Permet de **représenter des objets** [Notation issue de la notation
  des objets Javascript]{.small}
- Ensemble de **paires** (étiquette, valeur) [Étiquette entre
  guillemets, deux-points et valeur]{.small}
- **Valeurs** sont soit une simple valeur, soit une liste de valeurs
  [Liste de valeurs délimitée par des crochets
  `[]`]{.small}

## JavaScript Object Notation (JSON)

```json
{
  "name": "Carnet d'adresses de Sébastien Combéfis",
  "contacts": [
    {
      "firstname": "Cédric",
      "lastname": "Marchand",
      "phone": 2837
    },
    {
      "firstname": "Jonathan",
      "lastname": "Verlant-Chenet",
      "phone": 4872
    },
    {
      "firstname": "Quentin",
      "lastname": "Lurkin",
      "phone": 8723
    }
  ]
}
```

## Sérialisation

- **Sérialisation** d\'un dictionnaire en document JSON [Dictionnaire
  Python (`dict`) → document JSON
  (`str`)]{.small}
- Fonction **`dumps`** du module `json`
  [Renvoie une chaine de caractères]{.small}

```python
import json

bb = {'seasons': 5, 'genre': ['crime drama', 'thriller']}
skins = {'seasons': 7, 'genre': ['teen drama', 'comedy drama']}
tvshows = {'Breaking Bad': bb, 'Skins': skins}

document = json.dumps(tvshows, indent=4)
```

## Désérialisation

- **Désérialisation** d\'un document JSON en dictionnaire [Document
  JSON (`str`) → dictionnaire Python
  (`dict`)]{.small}
- Fonction **`loads`** du module `json`
  [Renvoie un dictionnaire]{.small}

```python
import json

document = '{"Belgium":{"capital":"Brussels","languages":["french","dutch",'
           '"german"]},"China":{"capital":"Beijing","languages":'
           '["mandarin chinese"]}}'

countries = json.loads(document)
```
