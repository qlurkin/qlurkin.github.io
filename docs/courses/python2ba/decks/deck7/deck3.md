---
title: Cours 7 — Exemple complémentaire
subtitle: Écrire et exécuter des tests avec `assert`
type: deck
author: Quentin Lurkin
---

## Pourquoi écrire des tests ?

Un test compare :

- un **résultat attendu**, décidé à partir de la consigne ;
- le **résultat obtenu** en exécutant le programme.

Les tests aident à détecter une erreur et à éviter qu'une modification en introduise une nouvelle.

> Un test réussi est une preuve pour un cas testé, pas une preuve que le programme est toujours correct.

## Exemple — compter les nombres positifs

Consigne : écrire `compter_positifs(valeurs)`, qui renvoie le nombre de valeurs strictement positives.

Décidons précisément que :

- `0` n'est pas positif ;
- une liste vide contient zéro nombre positif.

Exemples attendus :

- `[2, -1, 4]` donne `2` ;
- `[0, -3]` donne `0` ;
- `[]` donne `0`.

Les tests viennent du comportement demandé, pas de ce que le code semble faire.

## Un premier `assert`

```python
assert 2 + 2 == 4
```

`assert` vérifie que l'expression est vraie :

- si elle est vraie, l'exécution continue sans afficher de message ;
- si elle est fausse, Python signale une `AssertionError`.

On utilise un `assert` pour exprimer une attente sur une fonction :

```python
assert compter_positifs([2, -1, 4]) == 2
```

## Séparer le code et les tests

Dans `calculs.py`, écrivez la fonction à tester :

```python
def compter_positifs(valeurs):
    compteur = 0
    for valeur in valeurs:
        if valeur > 0:
            compteur += 1
    return compteur
```

Dans un autre fichier, `test_calculs.py`, importez votre module :

```python
import calculs

assert calculs.compter_positifs([2, -1, 4]) == 2
```

Placez ces fichiers dans le même dossier pour cet exemple.

## Ajouter plusieurs cas de test

Dans `test_calculs.py`, vérifiez plusieurs comportements :

```python
import calculs

assert calculs.compter_positifs([2, -1, 4]) == 2
assert calculs.compter_positifs([0, -3]) == 0
assert calculs.compter_positifs([]) == 0
assert calculs.compter_positifs([5]) == 1
```

Chaque ligne vérifie un cas différent : liste mélangée, valeurs non positives, liste vide et valeur positive unique.

## Exécuter les tests

Dans un terminal, depuis le dossier contenant les deux fichiers :

```terminal
> python test_calculs.py
```

- Si tous les `assert` réussissent, Python termine sans message : les tests ont passé.
- Si un `assert` échoue, Python affiche une `AssertionError` et indique la ligne concernée.
- Corrigez la fonction ou le test selon l'erreur ; ne changez pas un résultat attendu uniquement pour faire disparaître l'échec.

## Un test qui échoue

Supposons que le code contienne cette erreur :

```python
if valeur > 0:
    compteur = 1
```

Le test suivant échoue :

```python
assert calculs.compter_positifs([2, -1, 4]) == 2
```

**Pourquoi ?** Le compteur est remis à `1` à chaque valeur positive au lieu d'augmenter.

- L'échec révèle un écart entre le comportement attendu et le résultat.
- Lisez la ligne signalée et suivez le code avec les valeurs du test.
- Corrigez le code, puis relancez tous les tests.

## Choisir de bons cas de test

Pour chaque fonction, demandez-vous :

- Quel est le cas ordinaire ?
- Quelle est la plus petite entrée possible ?
- Que se passe-t-il avec `0`, une liste vide ou une valeur répétée ?
- Quelles entrées distinguent une bonne solution d'une erreur fréquente ?

Pour notre exemple, `[2, -1, 4]` distingue bien une vraie accumulation d'un compteur qui reste toujours à `1`.

## Un test doit vérifier une attente claire

Un test utile exprime le résultat attendu sans recopier l'algorithme de la fonction.

```python
# Attente lisible : deux valeurs sont strictement positives
assert calculs.compter_positifs([2, -1, 4]) == 2
```

Évitez de calculer le résultat attendu en appelant une autre version de la même fonction : une même erreur pourrait se retrouver dans le code et dans le test.

## Tester une deuxième fonction

Ajoutons `est_pair(nombre)` dans `calculs.py` : elle renvoie `True` si le nombre est pair et `False` sinon.

Dans `test_calculs.py` :

```python
assert calculs.est_pair(4) is True
assert calculs.est_pair(7) is False
assert calculs.est_pair(0) is True
assert calculs.est_pair(-2) is True
```

Ces tests couvrent un nombre pair, un impair, zéro et un entier négatif. `is True` rend l'attente explicite ; on peut aussi écrire `assert calculs.est_pair(4)`.

## Organiser les tests dans des fonctions

On peut regrouper les vérifications par fonction, sans utiliser de framework :

```python
import calculs

def tester_compter_positifs():
    assert calculs.compter_positifs([2, -1, 4]) == 2
    assert calculs.compter_positifs([0, -3]) == 0
    assert calculs.compter_positifs([]) == 0

def tester_est_pair():
    assert calculs.est_pair(4) is True
    assert calculs.est_pair(7) is False
```

Définir une fonction de test ne l'exécute pas encore : il faut l'appeler.

## Lancer les fonctions de test

À la fin de `test_calculs.py`, ajoutez les appels :

```python
tester_compter_positifs()
tester_est_pair()
print("Tous les tests ont réussi")
```

Exécutez le fichier comme précédemment :

```terminal
> python test_calculs.py
Tous les tests ont réussi
```

Le message s'affiche seulement si l'exécution arrive jusqu'à lui, donc si aucun `assert` précédent n'a échoué.

## Demander de l'aide à l'IA sans lui déléguer les tests

Commencez par écrire vos propres attentes. Puis vous pouvez demander :

```text
Voici la consigne de ma fonction : [consigne], et voici mes tests :
[coller les tests]. Sans écrire de code, indique quel comportement
important pourrait manquer et explique pourquoi il vaut la peine
d'être testé. Ne modifie pas mes résultats attendus.
```

L'IA peut proposer des cas, mais c'est à vous de vérifier qu'ils correspondent à la consigne.

## Faire relire un échec

```text
Mon test échoue : [copier le message]. Voici la fonction et le test
concernés : [coller le code]. Explique ce que le test compare et aide-moi
à suivre les valeurs pas à pas. Donne un indice, pas la correction complète.
```

Lisez ensuite le code, formez votre hypothèse, modifiez-le et relancez **tous** les tests.

## À retenir

- Un test est une vérification d'un comportement attendu.
- `assert condition` signale une erreur si la condition est fausse.
- Importez votre module dans un fichier de test séparé et lancez-le avec Python.
- Choisissez les cas à partir de la consigne : cas ordinaire, limites et erreurs fréquentes.
- Gardez la maîtrise des résultats attendus : ne faites pas simplement valider votre code par l'IA.
