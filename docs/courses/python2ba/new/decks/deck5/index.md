---
lang: en
title: Chapitre 5 - Gestion d'erreurs et mécanisme d'exceptions
viewport: width=device-width, initial-scale=1.0
---

::: section
# IN2T - Informatique [Gestion d'erreurs et mécanisme d'exceptions]{.small}

Quentin Lurkin
:::

::: section
## Rappels

-   Création d\'**interface graphique**
    -   Création de la fenêtre principale et de widgets
    -   Gestionnaire de mise en page et placement des widgets
-   Programmation **évènementielle**
    -   Application graphique
    -   Gestionnaire d\'évènements et binding de fonctions
:::

::: section
## Objectifs

-   Gestion d\'**erreurs**
    -   Programmation défensive
    -   Spécification
    -   Instruction `assert`{.lang-python}
-   Mécanisme d\'**exception**
    -   Instruction `try-except-finally`{.lang-python}
    -   instruction `raise`{.lang-python}
    -   Définition d\'une nouvelle exception
:::

::: {.section .full}
## Gestion d'erreurs

![](images/1401175133_e76fbb87d5_o.jpg)
:::

::: section
## Trace d\'erreur (1)

-   Une erreur d\'exécution imprime une **trace d\'erreur** [Chemin
    d\'exécution complet qui a provoqué l\'erreur]{.small}

``` lang-python
            def percentage(score, total):
                return score / total * 100
            
            print('Alexis a obtenu', percentage(18, 20), '%')
            print('Sébastien a obtenu', percentage(6, 0), '%')
        
```

``` lang-plaintext
            Alexis a obtenu 90.0 %
            Traceback (most recent call last):
                File "program.py", line 5, in <module>
                    print('Sébastien a obtenu', percentage(6, 0), '%')
                File "program.py", line 2, in percentage
                    return score / total * 100
            ZeroDivisionError: division by zero
        
```
:::

::: section
## Trace d\'erreur (2)

-   L\'erreur a comme **origine** l\'exécution de l\'instruction en
    ligne 5

    ``` lang-plaintext
                        File "program.py", line 5, in <module>
                            print('Sébastien a obtenu', percentage(6, 0), '%')
                    
    ```

-   L\'erreur est dans la **fonction `percentage()`**

    ``` lang-plaintext
                        File "program.py", line 2, in percentage
                            return score / total * 100
                    
    ```

-   L\'erreur est de type **division par zéro**

    ``` lang-plaintext
                        ZeroDivisionError: division by zero
                    
    ```
:::

::: section
## Gestion d\'erreurs

-   Prendre en compte **tous les cas** possibles d\'exécution [Prévoir
    une valeur de retour spéciale en cas d\'erreur]{.small}

``` lang-python
            def percentage(score, total):
                if total != 0:
                    return score / total * 100
                return None
        
```

``` lang-plaintext
            Alexis a obtenu 90.0 %
            Sébastien a obtenu None %
        
```
:::

::: section
## Types d\'erreur

-   On peut considérer **trois types d\'erreur** possibles
    -   **Erreur de syntaxe** [Code source mal formé]{.small}
    -   **Erreur d\'exécution** [Exécution d\'une opération
        interdite]{.small}
    -   **Erreur logique** [Programme ne calcule pas ce qu\'il
        faut]{.small}
-   Le troisième type est le plus **difficile à déceler** [Il faut
    pouvoir vérifier que le programme fait ce qu\'il faut]{.small}
:::

::: section
## Erreur de syntaxe

-   Erreur détectée **lors de l\'exécution** de l\'instruction [Python
    est en effet un langage interprété]{.small}
-   Code source du programme contient des **fautes de syntaxe** [Un peu
    comme l\'orthographe en français]{.small}

``` lang-python
            score = 12
            if score > 10
                print('Vous avez réussi !')
        
```

``` lang-plaintext
            File "program.py", line 2
                if score > 10
                            ^
            SyntaxError: invalid syntax
        
```
:::

::: section
## Erreur d\'exécution

-   Erreur produite **durant l\'exécution** d\'une opération interdite
    [Division par zéro, indice en dehors d\'une liste\...]{.small}

``` lang-python
            data = [1, 2, 3]
            
            i = 0
            while i <= len(data):
                print(data[i])
                i += 1
        
```

``` lang-plaintext
            1
            2
            3
            Traceback (most recent call last):
                File "program.py", line 5, in <module>
                    print(data[i])
            IndexError: list index out of range
        
```
:::

::: section
## Erreur logique

-   Le programme ne **calcule pas ce qu\'il faut** [Aucune erreur de
    syntaxe ou d\'exécution ne se produit]{.small}

``` lang-python
            def perimeter(length, width):
                return length + width * 2
            
            print(perimeter(2, 1))
        
```

``` lang-plaintext
            4
        
```

-   Il peut être utile de décrire clairement ce que la fonction devrait
    faire [Pour s\'assurer qu\'il y a bien une erreur]{.small}
:::

::: section
## Documentation

-   La **documentation** d\'une fonction décrit le résultat produit
    [Permet à un utilisateur d\'interpréter le résultat de
    l\'appel]{.small}
-   Description de **conditions** sur les paramètres [Et de la valeur de
    retour si elles ne sont pas satisfaites]{.small}

``` lang-python
            # Renvoie le pourcentage d'une note étant donné :
            # - "score" contient la note obtenue (flottant)
            # - "total" est la note maximale atteignable (flottant)
            #
            # Si total <= 0, score < 0 ou score > total, alors renvoie None
            def percentage(score, total):
                if total > 0 and (0 <= score <= total):
                    return score / total * 100
                return None
        
```
:::

::: section
## Instruction `assert`{.lang-python} (1)

-   Vérification de **conditions sensées être vraies** avec
    `assert`{.lang-python} [On vérifie notamment les conditionssur les
    paramètres avec cette instruction]{.small}
-   Un programme **doit fonctionner** si on supprime les assertions
    [Elles ne doivent pas faire partie du code fonctionnel]{.small}

``` lang-python
            def percentage(score, total):
                assert total > 0, 'total doit être strictement positif'
                assert 0 <= score, 'score doit être positif'
                assert score <= total, 'score doit être inférieur à total'
                return score / total * 100
        
```
:::

::: section
## Instruction `assert`{.lang-python} (2)

-   **Arrêt du programme** en cas d\'erreur d\'assertion [Avec affichage
    d\'un message d\'information]{.small}
-   Empêche des erreurs qui **ne devraient pas** se produire [Le
    programme peut être modifié pour les éviter]{.small}

``` lang-python
            print(percentage(15, 20), '%')
            print(percentage(22, 20), '%')
        
```

``` lang-plaintext
            75.0 %
            Traceback (most recent call last):
                File "program.py", line 8, in <module>
                    print(percentage(22, 20), '%')
                File "program.py", line 4, in percentage
                    assert score <= total, 'score doit être inférieur à total'
            AssertionError: score doit être inférieur à total
        
```
:::

:::: {.section .full .deck-only}
![](images/4241208915_832187dfcb_b.jpg)

::: {style="position: absolute; bottom: 2em; right: 2em; background-color: rgba(255, 255, 255, 0.7); width: 60%; padding: 1em; font-style: italic;"}
"Always code as if the guy who ends up maintaining your code will be a
violent psychopath who knows where you live."\
--- Martin Golding
:::
::::

::: section
## Programmation défensive

-   **Programmation défensive**
    -   Utilisation de l\'instruction `assert`{.lang-python}
    -   On suppose les préconditions remplies
    -   Peut être pratiquée au sein d\'un module [Se pratique sur du
        code dont vous avez le contrôle]{.small}
-   **Gestion d\'erreur**
    -   Utilisation de l\'instruction `if-else`{.lang-python}
    -   On vérifie les conditions nécessaires sur les données
    -   Doit être pratiquée pour interface avec l\'extérieur
        [Vérification de toutes données hors contrôle]{.small}
:::

::: section
## Nombres premiers (1)

-   Afficher les `n`{.lang-python} premier **nombres premiers**
-   Fonction auxiliaire en programmation défensive [Vérification des
    préconditions avec l\'instruction `assert`{.lang-python}]{.small}

``` lang-python
            def _isPrime(x):
                assert type(x) == int, "must be an int"
                assert x > 1, "must be greater than 1"
                
                for d in range(2, x):
                    if x % d == 0:
                        return False
                return True
        
```
:::

::: section
## Nombres premiers (2)

-   La fonction principale **vérifie les paramètres** [Renvoi de
    `False`{.lang-python} en cas de souci]{.small}

``` lang-python
            def printPrimes(n):
                if type(n) != int or n < 0:
                    return False
                
                count = 0
                i = 2
                while count < n:
                    if _isPrime(i):
                        print(i)
                        count += 1
                    i+=1
                return True
        
```
:::

::: {.section .full}
## Mécanisme d'exception

![](images/510673513_a0dd2626a3_o.jpg)
:::

::: section
## Instruction `try-except`{.lang-python} (1)

-   **Code risqué** placé dans un bloc `try`{.lang-python} [N\'y placer
    que le code risqué et tout code qui en dépend]{.small}
-   **Erreurs capturées** dans le bloc `except`{.lang-python} [Y placer
    le code à exécuter en cas de capture d\'une erreur]{.small}

``` lang-python
            from datetime import *
            
            birthyear = input('Année de naissance ? ')
            
            try:
                now = datetime.now()
                age = now.year - int(birthyear)
                print('Tu as', age, 'ans')
            except:
                print('Erreur')
        
```
:::

::: section
## Instruction `try-except`{.lang-python} (2)

-   Si l\'utilisateur entre un nombre entier, **pas d\'erreurs**

    ``` lang-plaintext
                        Année de naissance ? 1982
                        Tu as 36 ans
                    
    ```

-   Si l\'utilisateur n\'entre pas un nombre entier, **erreur capturée**

    ``` lang-plaintext
                        Année de naissance ? BLA
                        Erreur
                    
    ```
:::

::: section
## Validité d\'une donnée

-   Demande d\'une valeur à l\'utilisateur **en boucle** [Tant que la
    valeur demandée n\'est pas du bon type]{.small}

``` lang-python
            from datetime import *
            
            valid = False
            while not valid:
                birthyear = input('Année de naissance ? ')
                try:
                    birthyear = int(birthyear)
                    valid = True
                except:
                    print('Veuillez entrer un nombre entier')
            
            now = datetime.now()
            age = now.year - birthyear
            print('Tu as', age, 'ans')
        
```
:::

::: section
## Vérifier le type d\'erreur (1)

-   Plusieurs **types d\'erreur** sont possibles [Division par zéro,
    erreur de conversion\...]{.small}
-   Toutes les erreurs sont capturées par l\'**instruction
    `except`{.lang-python}** [Possibilité de capturer les erreurs de
    manière spécifique]{.small}

``` lang-python
            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print(a, '/', b, '=', a / b)
            except:
                print('Erreur')
        
```
:::

::: section
## Vérifier le type d\'erreur (2)

-   Une **exception** est un objet qui représente une erreur [L\'objet
    est généralement de type `Exception`{.lang-python}]{.small}
-   Types spécifiques pour différencier les **types d\'erreurs**
    [ZeroDivisionError, ValueError\...]{.small}

``` lang-python
            import sys
            
            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print(a, '/', b, '=', a / b)
            except Exception as e:
                print(type(e))
                print(e)
        
```
:::

::: section
## Vérifier le type d\'erreur (3)

-   Division par zéro

    ``` lang-plaintext
                        a ? deux
                        <class 'ValueError'>
                        invalid literal for int() with base 10: 'deux'
                    
    ```

-   Erreur de conversion

    ``` lang-plaintext
                        a ? 2 
                        b ? 0
                        <class 'ZeroDivisionError'>
                        division by zero
                    
    ```
:::

::: section
## Capturer une erreur spécifique (1)

-   **Gestionnaire d\'erreurs** différent pour chaque type d\'erreur [Il
    suffit de déclarer un bloc `except`{.lang-python} par erreur à
    capturer]{.small}
-   Attention à l\'**ordre de capture** (de haut en bas) [Il faut
    classer les erreurs de la plus à la moins spécificité]{.small}

``` lang-python
            import sys
            
            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print(a, '/', b, '=', a / b)
            except ValueError:
                print('Erreur de conversion')
            except ZeroDivisionError:
                print('Division par zéro')
            except:
                print('Autre erreur')
        
```
:::

::: section
## Capturer une erreur spécifique (2)

``` lang-python
            import sys
            
            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print(a, '/', b, '=', a / b)
            except Exception:
                print('Erreur')
            except ValueError:
                print('Erreur de conversion')
            except ZeroDivisionError:
                print('Division par zéro')
        
```

``` lang-plaintext
            a ? 2
            b ? 0
            Autre erreur
        
```
:::

::: section
## Information sur une erreur

-   L\'**objet de l\'exception** peut contenir de l\'information [On
    peut accéder à des propriétés ou à des méthodes]{.small}

``` lang-python
            try:
                import mymod
            except SyntaxError as e:
                print(e)
                print('File:', e.filename)
                print('Line:', e.lineno)
                print('Text:', e.text)
        
```

``` lang-plaintext
            can't assign to literal (mymod.py, line 1)
            File: /Users/combefis/Desktop/mymod.py
            Line: 1
            Text: 2 = x
        
```
:::

::: section
## Gestionnaire d\'erreurs partagé

-   **Même gestionnaire d\'erreurs** pour différents types [Tuple
    d\'exception fourni à l\'instruction `except`{.lang-python}]{.small}

``` lang-python
            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print(a / b)
            except (ZeroDivisionError, ValueError):
                print('Erreur de calcul')
            except:
                print('Erreur')
        
```

``` lang-plaintext
            a ? 1
            b ? 0
            Erreur de calcul
        
```
:::

::: section
## Propagation d\'erreur (1)

-   Une **erreur non capturée** remonte les appels de fonction [Jusqu\'à
    être attrapée ou remonté jusqu\'au bout]{.small}
-   La **trace d\'erreur** montre le trajet pris par l\'exception [En la
    lisant à l\'envers, on peut suivre la propagation]{.small}
:::

::: section
## Propagation d\'erreur (2)

-   **Passage** de `fun`{.lang-python} à `compute`{.lang-python} au
    programme principal

``` lang-python
            def fun():
                print(1 / 0)
            
            def compute():
                fun()
            
            compute()
        
```

``` lang-plaintext
            Traceback (most recent call last):
                File "program.py", line 7, in <module>
                    compute()
                File "program.py", line 5, in compute
                    fun()
                File "program.py", line 2, in fun
                    print(1 / 0)
            ZeroDivisionError: division by zero
        
```
:::

::: section
## Propagation d\'erreur (3)

-   Exception **interceptée** dans la fonction `compute`{.lang-python}

``` lang-python
                def fun():
                    print(1 / 0)
                
                def compute():
                    try:
                        fun()
                    except:
                        print('Erreur.')
                
                compute()
            
```

``` lang-plaintext
                Erreur.
            
```
:::

::: section
## Bloc `finally`{.lang-python} (1)

-   Le bloc `finally`{.lang-python} s\'exécute **dans tous les cas**
    [Après le bloc `try`{.lang-python} ou l\'`except`{.lang-python} en
    cas d\'erreur]{.small}
-   Notamment utilisé pour faire du **nettoyage** [Par exemple pour
    libérer des ressources qui ont été allouées]{.small}
:::

::: section
## Bloc `finally`{.lang-python} (2)

-   Bloc `finally`{.lang-python} **exécuté à tous les coups** avant la
    fin du calcul

``` lang-python
            print('Début du calcul.')
            try:
                a = int(input('a ? '))
                b = int(input('b ? '))
                print('Résultat :', a / b)
            except:
                print('Erreur.')
            finally:
                print('Nettoyage de la mémoire.')
                print('Fin du calcul.')
        
```

``` lang-plaintext
            Début du calcul.
            a ? 2
            b ? 8
            Résultat : 0.25
            Nettoyage de la mémoire.
            Fin du calcul.
        
```
:::

::: section
## Générer une erreur

-   L\'**instruction `raise`{.lang-python}** permet de générer une
    erreur [Création d\'un objet du type de l\'exception]{.small}

``` lang-python
            def fact(n):
                if n < 0:
                    raise ArithmeticError()
                if n == 0:
                    return 1
                return n * fact(n - 1)
            
            try:
                n = int(input('Entrez un nombre : '))
                print(fact(n))
            except ArithmeticError:
                print('Veuillez entrer un nombre positif.')
            except:
                print('Veuillez entrer un nombre.')
        
```

``` lang-plaintext
            Entrez un nombre : -12
            Veuillez entrer un nombre positif.
        
```
:::

::: section
## Définir une erreur (1)

-   **Définition d\'une erreur** en définissant une nouvelle classe [La
    classe est créée à partir de la classe
    `Exception`{.lang-python}]{.small}
-   L\'**instruction `pass`{.lang-python}** ne fait rien

``` lang-python
            from math import sqrt
            
            class NoRootException(Exception):
                pass
            
            def trinomialroots(a, b, c):
                delta = b ** 2 - 4 * a * c
                if delta < 0:
                    raise NoRootException()
                if delta == 0:
                    return (-b / (2 * a),)
                x1 = (-b + sqrt(delta)) / (2 * a)
                x2 = (-b - sqrt(delta)) / (2 * a)
                return (x1, x2)
        
```
:::

::: section
## Définir une erreur (2)

-   **Capture de la nouvelle erreur** avec l\'instruction
    `except`{.lang-python} [Le nouveau type d\'erreur est maintenant
    connu par Python]{.small}

``` lang-python
            try:
                print(trinomialroots(1, 0, 2))
            except NoRootException:
                print('Pas de racine réelle.')
            except:
                print('Erreur')
        
```

``` lang-plaintext
            Pas de racine réelle.
        
```
:::

::: section
## Exception paramétrée

-   Stockage d\'un **paramètre** dans l\'exception

``` lang-python
            class NoRootException(Exception):
                def __init__(self, delta):
                    self.__delta = delta
            
                @property
                def delta(self):
                    return self.__delta
            
            def trinomialroots(a, b, c):
                delta = b ** 2 - 4 * a * c
                if delta < 0:
                    raise NoRootException(delta)
                if delta == 0:
                    return (-b / (2 * a),)
                x1 = (-b + sqrt(delta)) / (2 * a)
                x2 = (-b - sqrt(delta)) / (2 * a)
                return (x1, x2)
            
            try:
                print(trinomialroots(1, 0, 2))
            except NoRootException as e:
                print('Pas de racine réelle (delta = {})'.format(e.delta))
            except:
                print('Erreur')
            
        
```

``` lang-plaintext
            Pas de racine réelle (delta = -8)
        
```
:::

::: section
## Quand utiliser les erreurs ?

-   **Toujours** vérifier les données provenant de l\'**extérieur**
    [Lecture avec `input`{.lang-python}, lecture d\'un
    fichier\...]{.small}
-   Lors d\'un **appel à une fonction** d\'un module [Lire la
    documentation de la fonction, pour les erreurs potentielles]{.small}
-   Quand on définit une **librairie** [Pour les fonctions publiques
    offertes à l\'extérieur]{.small}
:::

::: section
## Crédits

-   https://www.flickr.com/photos/mstibbetts/1401175133
-   http://www.flickr.com/photos/tetezinharomana/7152072635/
-   https://www.flickr.com/photos/mbiskoping/510673513
:::
