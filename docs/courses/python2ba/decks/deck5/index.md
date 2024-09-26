---
title: Cours 5
subtitle: Manipulation de documents
type: deck
author:
  - Quentin Lurkin
  - Sébastien Combéfis
typst: true
---

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

## Avec des `dict` et des `list`

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

## Avec des `dict` et des `list`

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

## Sérialisation

- Comment fait on avec des `dataclass` ?

```python
@dataclass
class Vector:
  x: float
  y: float

v = Vector(2, 1)

def encoder(obj: Any) -> Any:
    if isinstance(obj, Vector):
        return {"x": obj.x, "y": obj.y}

    # On laisse passer les autres types sans les changer
    return obj

document = json.dumps(v, default=encoder)
print(document)
```

```terminal
{"x": 2, "y": 1}
```

## Sérialisation

- Cela marche sur des structures imbriquée
- fonction `default` est appelée sur tous ce qui ne se converti pas tout seul.

```python
data = [Vector(1, 1), {"point": Vector(2, 2)}]
document = json.dumps(data, default=encoder)
print(document)
```

```terminal
[{"x": 1, "y": 1}, {"point": {"x": 2, "y": 2}}]
```

## Désérialisation

- Pour la conversion inverse, il faut:
  - **"deviner"** la classe
  - appeler le **constructeur**
- fonction `object_hook` est appelée sur tous les "objets JSON" _(aka `dict` Python)_

```python
def decoder(dct: dict) -> Any:
    if 'x' in dct and 'y' in dct:
       return Vector(dct['x'], dct['y'])

    # Si on ne reconnait rien, on ne change rien
    return dct

data = json.loads(document, object_hook=decoder)
```

## Désérialisation

- Cela fonctionne aussi avec les structures imbriquées.

```python
document = '[{"x": 1, "y": 1}, {"point": {"x": 2, "y": 2}}]'
data = json.loads(document, object_hook=decoder)
```

```terminal
[Vector(x=1, y=1), {'point': Vector(x=2, y=2)}]
```

## Attention avec classes imbriquées{.code}

```python
import json
from dataclasses import dataclass
from typing import Any

@dataclass
class Vector:
  x: float
  y: float

@dataclass
class Rectangle:
  top_left: Vector
  bottom_right: Vector

def encoder(obj: Any) -> Any:
  if isinstance(obj, Vector):
    return {"x": obj.x, "y": obj.y}

  if isinstance(obj, Rectangle):
    # Attention, il faut faire l'encodage profond
    return {
      "top_left": encoder(obj.top_left),         # appel récursif à encoder
      "bottom_right": encoder(obj.bottom_right)  # appel récursif à encoder
    }

  # On laisse passer les autres types sans les changer
  return obj

# Le décodage se fait du fond vers la surface
def decoder(dct: dict) -> Any:
    if 'x' in dct and 'y' in dct:
       return Vector(dct['x'], dct['y'])

    if 'top_left' in dct and 'bottom_right' in dct:
      # À ce stade dct['top_left'] et dct['bottom_right'] sont déjà décodés
      return Rectangle(dct['top_left'], dct['bottom_right'])

    # Si on ne reconnait rien, on ne change rien
    return dct

r = Rectangle(Vector(0, 0), Vector(1, 1))
r_json = json.dumps(r, default=encoder)
print(r_json)
print(json.loads(r_json, object_hook=decoder))
```

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

- `pip install openpyxl`
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

## Manipulation de document DOCX

- `pip install python-docx`
- **Document Word** (DOCX) représente des documents texte [Contient principalement du texte avec du style et des images]{.small}
- **Structure** d’un document DOCX
  - Un document est constitué de `paragraph`
  - Un paragraphe est composé de `runs`

## Créer un document DOCX {.code}

```python
from docx import Document
from docx.shared import Cm

document = Document()

document.add_heading('Document Title', 0)

p = document.add_paragraph('A plain paragraph having some ')
p.add_run('bold').bold = True
p.add_run(' and some ')
p.add_run('italic.').italic = True

document.add_heading('Heading, level 1', level=1)
document.add_paragraph('Intense quote', style='Intense Quote')

document.add_paragraph(
  'first item in unordered list', style='List Bullet'
)
document.add_paragraph(
  'first item in ordered list', style='List Number'
)

document.add_picture('cute-cat.jpg', width=Cm(4))

records = (
  (3, '101', 'Spam'),
  (7, '422', 'Eggs'),
  (4, '631', 'Spam, spam, eggs, and spam')
)

table = document.add_table(rows=1, cols=3)
hdr_cells = table.rows[0].cells
hdr_cells[0].text = 'Qty'
hdr_cells[1].text = 'Id'
hdr_cells[2].text = 'Desc'
for qty, id, desc in records:
  row_cells = table.add_row().cells
  row_cells[0].text = str(qty)
  row_cells[1].text = id
  row_cells[2].text = desc

document.add_page_break()

document.save('demo.docx')
```

## Manipulation de PDF

- **Portable Document Format** (PDF) représente des textes [Fichier au format binaire, pas manipulable directement
  ]{.small}

- Contient **plusieurs éléments**
  - Du texte
  - Des polices de caractères
  - Des images

## Module `pypdf`

- `pip install pypdf`
- **Extraction** du texte d’un document PDF [Aussi bien que possible, extraction pas parfaite]{.small}
- **Création** d’un nouveau PDF à partir d’un existant [Récupération de page, rotation, recouvrement]{.small}

```python
import pypdf

with open("apprendre_python3_5.pdf", "rb") as file:
  pdfreader = pypdf.PdfReader(file)
  pdfwriter = pypdf.PdfWriter()
  for i in range(min(10, pdfreader.get_num_pages())):
    pdfwriter.add_page(pdfreader.get_page(i))
  with open("summary.pdf", "wb") as output:
    pdfwriter.write(output)
```

## Ajout d’un filigrane _Top Secret_ {.code}

```python
import os.path
import pypdf

src = "summary.pdf"
# Adds a 'Top Secret' watermark to all the pages
with open(src, "rb") as file1, open("topsecret.pdf", "rb") as file2:
  pdfreader = pypdf.PdfReader(file1)
  pdfwriter = pypdf.PdfWriter()
  for i in range(pdfreader.get_num_pages()):
    watermark = pypdf.PdfReader(file2).get_page(0)
    page = pdfreader.get_page(i)
    watermark.merge_page(page)
    pdfwriter.add_page(watermark)
  # Writes the result file
  name, ext = os.path.splitext(src)
  dst = os.path.join(os.path.dirname(src), f"{name}_secret.{ext}")
  with open(dst, "wb") as output:
    pdfwriter.write(output)
```

## Module `fpdf2`

- `pip install fpdf2`
- Possibilité de **créer un document** PDF [Similaire à une librairie de dessin des éléments à insérer]{.small}
- **Trois étapes** à suivre
  - Ajout d’une page dans le document
  - Définition du style à appliquer
  - Ajout des éléments dans la page (texte, image...)

```python
from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font('helvetica', size=12)
pdf.cell(text="hello world")
pdf.output("hello_world.pdf")
```

## Manipulation d’images

- `pip install pillow`
- Utilisation de la librairie `pillow` [Chargement, obtention d’information et modification d’images]{.small}
- **Découpe sous-image** avec `crop(left, upper, right, lower)`

```python
from PIL import Image

image = Image.open("cute-cat.jpg")
cropped = image.crop((100, 50, 200, 150))
cropped.save("cropped-cat.jpg")
```

:::row
::::span6
![cute-cat.jpg](./images/cute-cat.jpg)
::::
::::{.span6}
![cropped-cat.jpg](./images/cropped-cat.jpg)
::::
:::

## Création d’une mosaïque

- **Coller** des images sur une autre avec `paste` [Découpe d’une sous-image pour création d’une mosaique]{.small}

```python
from PIL import Image

image = Image.open("cute-cat.jpg")
cropped = image.crop((100, 50, 200, 150))
mosaic = Image.new("RGB", (200, 200))
for i in range(2):
    for j in range(2):
        mosaic.paste(cropped, (i * 100, j * 100))
        mosaic.save("mosaic-cat.jpg")
```

![mosaic-cat.jpg](./images/mosaic-cat.jpg)

## Documentations

- `os` : <https://docs.python.org/3/library/os.html>
- `shutil` : <https://docs.python.org/3/library/shutil.html>
- `json` : <https://docs.python.org/3/library/json.html>
- `csv` : <https://docs.python.org/3/library/csv.html>
- `openpyxl` : <https://openpyxl.readthedocs.io/en/stable/>
- `python-docx` : <https://python-docx.readthedocs.io/en/latest/>
- `pypdf` : <https://pypdf.readthedocs.io/en/stable/index.html>
- `fpdf2` : <https://py-pdf.github.io/fpdf2/>
- `pillow` : <https://pillow.readthedocs.io/en/stable/>
