---
title: "Labo 4 : Réseau"
---

## Introduction

Dans ce labo, nous allons nous familiariser avec la programmation réseau en créant une petite messagerie en ligne de commande.

## Premier `socket`

En programmation réseau, le concept de base est le `socket`. Pour utiliser des `socket` en Python, il faut importer le module `socket`. Pas besoin de l'installer, il est déjà inclus par défaut.

```python
import socket
```

On peut ensuite créer un `socket`

```python
s = socket.socket()
```

Un `socket` peut être vu comme l'extrémité d'un câble réseau. A l'autre bout du câble, il y aura un autre `socket`, celui de l'application avec laquelle on communique.

Dans une communication utilisant les sockets, les participants sont identifiés sur le réseau par leurs adresses IP. L'**adresse IP** identifie un **ordinateur** mais il peut y avoir plusieurs applications sur cet ordinateur qui utilisent le réseau en même temps. Pour identifier une **application** précise sur l'ordinateur, on utilise un **numéro de port**. Lorsqu'on parle d'adresse, on fait généralement référence à la combinaison de l'adresse IP et du port. Il est également possible d'utiliser un nom DNS à la place de l'adresse IP.

Les serveurs web sont des applications qui écoute généralement sur le **port 80**. Nous pouvons utiliser un `socket` pour nous y connecter.

```python
address = ('www.perdu.com', 80)
s.connect(address)
```

Une fois connecté, notre `socket` est relié à un autre `socket` sur le serveur de *perdu.com*. Nous pouvons utiliser ce lien pour envoyer une requête au serveur.

Les serveurs web utilise le protocol HTTP pour communiquer. Cela signifie que la requête que l'on va envoyer doit se conformer à ce protocol.

```python
request = 'GET / HTTP/1.0\r\n\r\n'.encode()
```

La méthode `encode()` des chaines de caractères. Elle encode le texte en utilisant une table d'encodage des caractères. Chaque caractère sera converti en son code binaire.

Nous n'avons jamais à nous soucier de l'encodage des chaines de caractères quand on reste dans une même application Python. Mais quand les chaînes de caractères partent vers l'extérieur, cela devient important.

Par défaut, `encode()` utilise l'**UTF-8**.

Envoyons la requête maintenant.

```python
s.send(request)
```

Une fois la requête reçue, le serveur va nous répondre. Le système d'exploitation de note ordinateur va enregistrer cette réponse dans une file jusqu'à ce que nous venions la récupérer avec la méthode `recv()`. Le `recv()` doit spécifier le nombre maximum d'octets que l'on veut lire dans la file. Cette chaîne d'octets doit ensuite être décodée en chaîne de caractères.

```python
response = s.recv(2048).decode()
```

Si vous affichez la réponse, vous verrez les *headers* HTTP et le HTML de la réponse.

Pour finir, il faut fermer le `socket`

```python
s.close()
```

Il est possible d'écrire ce code avec la notation `with` pour que la fermeture soit automatique.

```python
address = ('www.perdu.com', 80)
request = 'GET / HTTP/1.0\r\n\r\n'.encode()

with socket.socket() as s:
    s.connect(address)
    s.send(request)
    response = s.recv(2048).decode()

print(response)
```

## Côté serveur

Dans l'exemple précédent, nous nous sommes connecté à un serveur qui **écoutait** le réseau pour **accepter** de nouvelles connexions. Comment implémente-t-on le côté serveur en Python ?

Il faut commencer par spécifier l'adresse sur laquelle on écoute. L'adresse IP de notre ordinateur est décidée au moment où il se connecte au réseau. Ce n'est pas le rôle des `socket` de décider de l'adresse de l'ordinateur. De ce fait, l'adresse que nous allons spécifier agit comme un filtre. Si l'ordinateur reçoit des messages qui ne correspondent pas à l'adresse que l'on a indiquée dans notre code, ils seront ignorés.

Ce serait particulièrement embêtant de devoir changer l'adresse dans notre code à chaque fois que notre ordinateur change d'adresse. Heureusement, il est possible d'utiliser l'adresse `'0.0.0.0'` qui correspond à n'importe quelle adresse IP et qui permet ne filtrer aucun message.

On spécifie l'adresse avec la méthode `bind()`

```python
s = socket.socket()
serverAddress = ('0.0.0.0', 3000)
s.bind(serverAddress)
```

On va ensuite demander à notre `socket` d'écouter le réseau.

```python
s.listen()
```

Une fois que nous écoutons le réseau, il ne reste plus qu'à accepter une connexion. La méthode `accept()` est une méthode bloquante (comme `input()`), l'exécution du code ne continuera pas tant qu'aucune connexion ne sera reçue. Cette méthode renvoie un `socket` relié à celui de l'application qui a fait la demande de connexion. Elle renvoie aussi son adresse.

```python
client, address = s.accept()
```

On peut ensuite utiliser ce `socket` client pour recevoir son message.

```python
message = client.recv(2048).decode()
```

Et on peut éventuellement lui répondre avec un `send()`ou fermer la connexion avec un `close()`.

On peut aussi utiliser le `with`.

```python
serverAddress = ('0.0.0.0', 3000)

with socket.socket() as s:
    s.bind(serverAddress)
    s.listen()
    client, address = s.accept()
    with client:
        message = client.recv(2048).decode()
    print(message)
```

Vous pouvez utiliser la communication réseau entre deux programme qui tournent sur le même ordinateur. Il vous suffit d'utiliser `'127.0.0.1'` ou `'localhost'` comme adresse dans le `connect()`

Ce server s'arrête dès qu'il reçoit un message mais on peut bien sûr mettre le `accept()` et la gestion du client dans une boucle.

```python
while True:
    client, address = s.accept()
    with client:
        message = client.recv(2048).decode()
```

On crée ici, délibérément, une boucle infinie car il est généralement souhaitable qu'un serveur tourne sans s'arrêter. On forcera l'arrêt en tapant **Ctrl-C** dans le terminal.

## Let's Chat

Nous savons maintenant envoyer et recevoir des messages. Le problème maintenant est de faire les deux en même temps pour faire notre application de messagerie. En effet, la boucle infinie et le `accept()` bloquant ne laissent pas tourner le code permettant d'aussi envoyer des messages.

De plus si nous permettons à l'utilisateur d'entrer ses messages avec la fonction `input()` qui est, elle aussi, bloquante, cela ne permet pas de recevoir des messages en même temps. Et nous voudront certainement permettre à l'utilisateur d'envoyer plusieurs messages, ce qui veut dire qu'il y aura aussi une boucle au niveau de l'envoi.

Il nous faut donc un moyen de faire tourner les deux parties indépendamment l'une de l'autre.

Pour cela, nous allons utiliser les **Threads**. Tous les programmes que nous avons réalisés jusqu'à présent s'exécutaient toujours dans le *thread* principal. Il est possible de créer d'autres *thread* pour exécuter différentes parties du code en "parallèle".

Définissons une fonction que l'on souhaite exécuter sur un autre *thread*.

```python
import time

def hello():
    while True:
        time.sleep(1)
        print('hello')
```

Pour créer un *thread*, on a besoin du module `threading`.

```python
import threading
```

On peut alors utiliser la classe `Thread` pour créer le *thread*.

```python
thread = threading.Thread(target=hello, daemon=True)
```

Le paramètre `daemon=True` fait que ce thread n'empêchera pas le programme de s'arrêter. Avec cette option, le programme s'arrêtera dès que le *thread* principal sera terminé.

Pour démarrer le *thread*, on utilise la méthode `start()`. Cette méthode n'est pas bloquante, l'execution du programme n'attend pas la fin de la fonction *target* pour continuer.

```python
thread.start()
while True:
    time.sleep(1)
    print('bye')
```

Si vous lancé cet exemple vous verrez que les deux boucles infinie tournent en même temps.

## A vous !

Utilisez ce que l'on vient de voir pour créer une petite application de messagerie en ligne de commande.

En plus des messages, on pourra utiliser des commandes tel que `/join` et `/quit` pour changer de destinataire et quitter le programme.

<pre>
#> python chat.py
Welcome to Messenger !
> /join 192.168.1.42 3000
192.168.1.42:3000 JOINED
> Hello, ça farte ?
192.168.1.42 said: Top, et toi ?
> Ouais, je suis un pro du réseau now xD
192.168.1.42 said: A fond (y)
> /quit
BEY
</pre>

## Défis

Ajoutez un server central qui garde la liste des clients connectés avec leurs pseudos et adresses pour permettre de contacter les autres clients par leurs pseudos.









