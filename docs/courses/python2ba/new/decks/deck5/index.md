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
  "name": "Carnet d'adresses de Quentin Lurkin",
  "contacts": [
    {
      "firstname": "Cédric",
      "lastname": "Marchand",
      "phone": 2837
    },
    {
      "firstname": "André",
      "lastname": "Lorge",
      "phone": 4872
    },
    {
      "firstname": "Clémence",
      "lastname": "Flémal",
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

## Manipuler le système de fichiers

- **Trois modules** pour manipuler le système de fichiers
  - `os` : fonctions d’interface avec le système d’exploitation
  - `os.path` : manipulation de chemins dans le système de fichiers
  - `shutil` : opérations sur des fichiers et répertoires

```python
import os
print('Votre OS :', os.name)
print('Répertoire courant :', os.getcwd())
```

```terminal
Votre OS : posix
Répertoire courant : /Users/lur/Desktop
```

## Répertoire courant

- `os.getcwd()` : renvoie le répertoire courant
- `os.chdir(path)` : change le répertoire courant

```python
import os

print(os.getcwd())
os.chdir('/Users')
print(os.getcwd())
```

```terminal
/Users/lur/Desktop
/Users
```

## Répertoires

- Fonctions de manipulation de **répertoires**
  - `os.mkdir(path)` : crée un nouveau répertoire
  - `os.makedirs(path)` : crée un nouveau répertoire. [Crée tous les répertoires de niveau intermédiaire nécessaires pour contenir le répertoire "feuille"]{.small}
  - `os.rmdir(path)` : supprime un répertoire (doit être vide)
  - `os.listdir(path)` : renvoie la liste du contenu d’un répertoire

```python
import os

os.chdir('/tmp')
os.mkdir('test')
os.mkdir('test/data')
print(os.listdir('/tmp/test'))
```

```terminal
['data']
```

## Fichiers

- Fonctions de manipulation de **fichiers**
  - `remove(path)` : supprime un fichier

```python
import os

with open('hello.txt', 'w') as file:
  file.write('Hello World !')

with open('hello.txt') as file:
  print(file.read())

os.remove('hello.txt')

with open('hello.txt') as file:
  print(file.read())
```

```terminal
Hello World !
Traceback (most recent call last):
  File "/Users/lur/program.py", line 12, in <module>
    with open("hello.txt") as file:
         ^^^^^^^^^^^^^^^^^
FileNotFoundError: [Errno 2] No such file or directory: 'hello.txt'
```

