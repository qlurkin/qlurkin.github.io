---
title: Cours 2
subtitle: Fonctions et séquences
type: deck
css: style.css
---

## Qu'est-ce qu'un ordinateur ?

Un ordinateur est un système composé de plusieurs éléments

- Processeur,
- Mémoire,
- Stockage,
- périphériques.

## Processeur

```python {.build}
from script import loadfile
__output__ = loadfile('cpu.svg.html')
```

## Processeur

- Central Processing Unit (CPU)
- Exécute des instructions
- Programme = suite d'instructions
- Un programme manipule des données

## Mémoire

```python {.build}
from script import loadfile
__output__ = loadfile('ram.svg.html')
```

## Mémoire

- Random Access Memory (RAM)
- Contient le programme et les données utilisée par le processeur
- Rapide
- Taille limitée
- Volatile

## Stockage

```python {.build}
from script import loadfile
__output__ = loadfile('storage.svg.html')
```

## Stockage

- Solid State Drive (SSD) ou Hard Disk Drive (HDD) "disque dur"
- Contient des programmes et des données
- Lent
- Taille importante
- Persistant
- Organisé en fichiers et répertoires

## Interpréteur

Le CPU exécute mes programmes Python ?

- **Non**, pas directement
- Python est un langage interprété.
- L'interpréteur Python (`python.exe`) exécute les programmes Python.
- `python.exe` est en **langage machine** et est exécuté par le CPU.
- **L'interpréteur Python est indispensable pour exécuter un programmes Python
  !**

## Installation

**Interpréteur:**

- Version actuelle: <span class="pyversion">3.X.X</span>
- Télécharger sur [python.org](https://www.python.org/downloads)
- Cocher la case **"Add Python <span class="pyshortversion">3.X</span> to
  PATH"**

**Éditeur:**

- Pour écrire les fichiers contenant le texte de nos programmes
- [Zed](https://zed.dev/)

## Terminal

- `pythion.exe` n'a pas d'interface graphique. Il faut l'utiliser depuis un
  terminal.
- `Powershell` sous Windows, `Terminal` sous MacOS

<pre class="terminal">
<b>> pwd</b>
C:\Users\lur

<b>> ls</b>
Desktop Documents

<b>> cd Documents</b>

<b>> pwd</b>
C:\Users\lur\Documents

<b>> python --version</b>
Python <span class="pyversion">3.X.X</span>
</pre>

## Python dans le terminal

- Mode interactif

<pre class="terminal">
<b>> python</b>
Python <span class="pyversion">3.X.X</span> ...
Type "help", "copyright", "credits" or "license" for more
information.

>>> 1 + 1
2

>>> exit()
</pre>

## Python dans le terminal

- Mode script

<p class="file-title"><em style>hello.py</em></p>
<pre><code class='lang-python'>print('Hello World')
</code></pre>

<pre class="terminal">
<b>> python hello.py</b>
Hello World
</pre>

```js {.script}
fetch('https://endoflife.date/api/python.json')
  .then((response) => response.json())
  .then((data) => {
    const version = data[0].latest
    const shortVersion = version.split('.').slice(0, 2).join('.')
    document.querySelectorAll('.pyversion').forEach((elem) => {
      elem.innerHTML = version
    })
    document.querySelectorAll('.pyshortversion').forEach((elem) => {
      elem.innerHTML = shortVersion
    })
  })
```
