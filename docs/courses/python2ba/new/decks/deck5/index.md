---
title: Cours 5
subtitle: Manipulation de documents
type: deck
author:
  - Quentin Lurkin
  - Sébastien Combéfis
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

## Module `os.path`

- Fonctions pour manipuler des chemins de fichier/répertoire [Opérations spécifiques au système (posixpath, ntpath, macpath)]{.small}
- Construction d’un chemin **spécifique**
  - `os.path.join(paths, ...)` : construit un chemin avec plusieurs
  - `os.path.split(path)` : découpe un chemin en deux

```python
import os.path

p = os.path.join('/tmp/test', 'data', 'main.cmd')
print(p)
print(os.path.split(p))
```

```terminal
/tmp/test/data/main.cmd
('/tmp/test/data', 'main.cmd')
```

## Chemin relatif et absolu

- **Deux façons** de décrire le chemin d’un fichier/répertoire

  - Chemin décrit à partir de la racine (absolu)
  - Chemin décrit à partir du répertoire courant (relatif)

- **Conversion** de description de chemin
  - `os.path.abspath(path)` : obtient le chemin absolu
  - `os.path.relpath(path)` : obtient le chemin relatif

```python
import os.path

print(os.path.relpath('/tmp/test/data/main.cmd'))
print(os.path.abspath('data.txt'))
```

```terminal
../../../tmp/test/data/main.cmd
/Users/lur/Desktop/data.txt
```

## Chemin relatif et absolu

- Deux **dossiers spéciaux** en mode relatif
  - `.` représente le répertoire courant
  - `..` représente répertoire parent

```python
import os.path

print(os.path.abspath('.'))
print(os.path.abspath('..'))
print(os.path.abspath('./../.././././lur'))
```

```terminal
/Users/lur/Desktop
/Users/lur
/Users/lur
```

## Parties d’un chemin

- **Décomposition** d'un chemin

  - `os.path.basename(path)` : partie de base du chemin
  - `os.path.dirname(path)` : répertoire du chemin

- Extraction du **nom et de l'extension** d'un fichier
  - `os.path.splitext(path)` : renvoie le nom et l'extension

```python
import os.path

p = '/tmp/test/log.txt'
print(os.path.basename(p))
print(os.path.dirname(p))
print(os.path.splitext(p))
```

```terminal
log.txt
/tmp/test
(’/tmp/test/log’, ’.txt’)
```

## Existence et type

- Tester le **type** d’un chemin

  - `os.path.isfile(path)` : teste si le chemin est un fichier
  - `os.path.isdir(path)` : teste si le chemin est un dossier

- Tester l'**existence** d’un chemin
  - `os.path.exists(path)` : teste si le chemin existe

```python
import os.path

p = '/tmp/test/log.txt'
if os.path.exists(p):
  print(os.path.isfile(p))
```

```terminal
True
```

## Module `shutil`

- Opérations de **haut-niveau** sur les fichiers et répertoires
  - `shutil.copyfile(src, dst)` : copie un fichier
  - `shutil.copy(src, dst)` : copie un fichier dans un répertoire
  - `shutil.copytree(src, dst)` : copie un répertoire
  - `shutil.rmtree(src, dst)` : supprime un répertoire
  - `shutil.move(src, dst)` : déplace un fichier/répertoire [Sera aussi utilisé pour renommer]{.small}

## Manipulation de documents CSV

- Un **enregistrement** par ligne, valeurs séparées par des virgules [Entête sur la première ligne]{.small}
- **Séparateur décimal** est par défaut le point [Convention anglaise de notation des nombres]{.small}

```csv
Nom,Prix,Code
Banane,5.99,77
Pomme,2.99,99
Poire,7.99,170
```

## Module `csv`

- Lecture avec un `csv.reader`

```python
import csv

src = "cart.csv"
with open(src) as file:
  csvreader = csv.reader(file)
  next(csvreader)  # Ignore header line
  totalprice = 0
  for line in csvreader:
    totalprice += float(line[1])
  print(f"Prix total : {totalprice} €")
```

```terminal
Prix total : 16.97 €
```

## Module `csv`

- Lecture avec un `csv.DictReader` [Les entêtes sont utilisés pour créer des dictionnaires]{.small}

```python
import csv

src = "cart.csv"
with open(src) as file:
  csvreader = csv.DictReader(file)
  totalprice = 0
  for line in csvreader:
    totalprice += float(line['Prix'])
  print(f"Prix total : {totalprice} €")
```

```terminal
Prix total : 16.97 €
```

## Autre format CSV

- En Belgique, comme nous utilisons la `,` comme **séparateur décimal**, le `;` est souvent utilisé comme **délimiteur de CSV**.
- Voici un fichier CSV créé avec **Excel** [CSV UTF-8 (délimité par des virgules) (.csv)]{.small}

```csv
Titre;Auteur;Editeur;Prix
NoSQL;Rudi;Eyrolles;17,99
SQL;"Ronald; Ryan; Arie";Pearson;21,99
"Sabina, ""la juive"" de Jung";Alain;PGdR Editions;10,5
Un défilé de robots;Asimov;J'ai Lu;7,4
```

## Autre format CSV

- Pour lire ce fichier avec le module `csv`

```python
import csv

src = "books.csv"
with open(src, encoding="utf-8-sig") as file:
  csvreader = csv.DictReader(file, delimiter=";")
  totalprice = 0
  for line in csvreader:
    print(line)
    totalprice += float(line["Prix"].replace(",", "."))
  print(f"Prix total : {totalprice} €")
```

- `encoding="utf-8-sig"` : Excel utilise une variante de l'UTF-8 [UTF-8 avec BOM (Byte Order Mark)]{.small}
- `delimiter=";"` : Le délimiteur est le `;`
- `.replace(",", ".")` : On remplace les séparateurs décimaux

## Écrire un fichier CSV

- Écriture avec un `csv.writer` comme **Excel**

```python
import csv

with open('result.csv', 'w', encoding='utf-8-sig') as file:
  csvwriter = csv.writer(file)
  csvwriter.writerow(['Nom', 'Prix', 'Code'])
  csvwriter.writerow(['Banane', str(5.99).replace('.', ','), 77])
  csvwriter.writerow(['Pomme', str(2.99).replace('.', ','), 99])
  csvwriter.writerow(['Poire', str(7.99).replace('.', ','), 170])
```

- Les champs non-string sont convertis avec `str()` par défaut [Il faut quand même faire attention au séparateur décimal]{.small}

## Manipulation de documents XLSX

- **Document Excel** (XLSX) représente des tableurs [Contient principalement des données et des formules]{.small}
- **Structure** d’un document XLSX
  - Un document Excel est appelé un `workbook`
  - Possède plusieurs `worksheets` (feuille)
  - Chaque feuille est découpée en lignes et colonnes

## Créer un document XLSX

- Création d'un **Workbook vide** puis remplissage

```python
import openpyxl

wb = openpyxl.Workbook()
sheet = wb.active
sheet.title = 'June 2025'

sheet['B1'] = 'Labo'
sheet['C1'] = 'Examen'
sheet['D1'] = 'Moyenne'

sheet['A2'] = 'Tom'
sheet['B2'] = '18'
sheet['C2'] = '11'
sheet['D2'] = '=0.3*B2+0.7*C2'

print(sheet['D2'].value)

wb.save('results.xlsx')
```

## Lire un document XLSX

- Ouverture d’un **Workbook** en mode brut ou données [L'option `data_only=True` permet de récupérer les résultats des formules **calculés et sauvés** par Excel]{.small}

```python
import openpyxl

wb = openpyxl.load_workbook('results.xlsx', data_only=True)
sheet = wb.active
for i in range(1, 5):
  cell = sheet.cell(row=1, column=i)
  print(cell.value , end=' ')

cell = sheet['D2']
print(f'\nCell {cell.column_letter}{cell.row} : {cell.value}')
```

```terminal
None Labo Examen Moyenne
Cell D2 : None
```

- La valeur de `D2` est `None` car le fichier n'a pas encore été ouvert et sauvé par Excel
