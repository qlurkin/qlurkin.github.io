---
lang: en
title: Cours 1 - Rappels et relations
viewport: width=device-width, initial-scale=1.0
---

::: section
# PO3T - programmation Orientée Objets [Cours 1 - Rappels et relations]{.small}

Quentin Lurkin
:::

::: section
# Rappels
:::

::: section
## Vie d\'un objet

Trois étapes principales dans la **vie d\'un objet**

-   Création de l\'objet (*initialisation*)
-   Appel de méthode et changement d\'état (*utilisation*)
-   Destruction de l\'objet (*finalisation*)

``` lang-python
         words = []

         words.append('Hello')  # Appel de la méthode append
         words.append('World!') # de l'objet words (list)

         print (' '.join(words))
      
```
:::

::: section
## Et en Java\...

Langage compilé et typé statiquement, proche du C#

-   Déclaration du type des éléments de la liste
-   Délimitation des corps (classe, méthode) avec accolades
-   Méthode main comme point d\'entrée

``` lang-java
         import java.util.ArrayList;

         public class Rappels
         {
            public static void main(String[] args)
            {
               ArrayList<String> words = new ArrayList<String>();

               words.add("Hello");  // Appel de la méthode add
               words.add("World!"); // de l'objet words (ArrayList)

               System.out.println(String.join(" ", words));
            }
         }
      
```
:::

::: section
## Et en C++\...

Langage compilé orienté objet comme \"extension\" du C

-   Également typé statiquement (variable et contenu des listes)

``` lang-cpp
         #include <iostream>
         #include <vector>
         
         using namespace std;
         
         int main(int argc, char *argv[])
         {
            vector<string> words;
         
            words.push_back("Hello");  // Appel de la méthode push_back
            words.push_back("World!"); // de l'objet words (vector)
         
            string s;
            join (words, ' ', s);
            cout << s << endl ;
            return 0;
         }
      
```
:::

::: section
## Et en C#\...

Langage compilé et typé statiquement, proche du Java

-   Déclaration d\'un espace de noms pour la classe

``` lang-csharp
         using System;
         using System.Collections.Generic;

         namespace Cours1
         {
            public class Rappels
            {
               public static void Main(string[] args)
               {
                  List<string> words = new List<string>();

                  words.Add("Hello");  // Appel de la méthode Add
                  words.Add("World!"); // de l'objet words (List)

                  Console.WriteLine(String.Join (" ", words));
               }
            }
         }
      
```
:::

::: section
## Objets

-   Un **objet** possède deux types de membres
    -   des attributs (caractéristiques)
    -   des méthodes (fonctionnalités)
-   **L\'état de l\'objet** peut varier tout au long de l\'exécution
    [Défini par l\'ensemble des valeurs des attributs]{.small}
:::

:::: section
## Attributs

-   Un attribut possède une **valeur** [Cette valeur fait partie de
    l\'état de l\'objet]{.small}
-   Deux niveaux d\'**accessibilité** pour les attributs [En lecture
    seule ou en lecture et écriture]{.small}

``` lang-csharp
         // attribut en lecture seule
         Console.WriteLine("Taille de la liste : " + words.Count);
      
```

::: terminal
Taille de la liste : 2
:::
::::

:::: section
## Fonctionnalités

-   Une fonctionnalité est appliquée sur un **objet cible** [Elle agit
    sur l\'état de l\'objet, en le lisant et/ou le modifiant]{.small}

``` lang-csharp
         Console.WriteLine(words.Contains("Hello"));
         Console.WriteLine("Liste : " + String.Join(", ", words));
         words.Clear();
         Console.WriteLine("Liste : " + String.Join(", ", words));
      
```

::: terminal
True Liste : Hello, World! Liste :
:::
::::

::: section
## Classes

-   Une classe permet de **construire** des objets [Il s\'agit d\'un
    modèle qui décrit les attributs et fonctionnalités]{.small}
-   Un objet est une **instance** d\'une classe [On crée un nouvel objet
    à partir d\'une classe]{.small}
:::

::: section
## Instances

**Trois éléments** distincts sont à identifier

1.  Une **classe** est un modèle
2.  Un objet est une **instance** d\'une classe
3.  Une variable stocke une **référence** vers l\'objet

<figure id="schema">

</figure>
:::

::: section
## Alias

-   Une variable est une **référence** vers un objet [La variable permet
    d\'accéder à l\'objet et ainsi le manipuler]{.small}
-   Un **alias** réfère le même objet qu\'une autre variable

<figure id="alias">

</figure>
:::

::: section
## Définir une classe

-   Définition d\'une classe Contact représentant un **contact**
    [Caractérisé par un prénom, un nom et un numéro de
    téléphone]{.small}
:::

::: section
## Constructeur et variable d\'instance

-   Le **constructeur** initialise l\'état de l\'objet [L\'instantiation
    invoque implicitement le constructeur]{.small}
-   Initialisation des **variables d\'instance** [On affecte une valeur
    à chaque variable d\'instance]{.small}

``` lang-python
         class Contact :
            def __init__ (self, firstname, lastname):
               self.firstname = firstname
               self.lastname = lastname
               self.phonenumber = 0

            # [...]
      
```
:::

::: section
## Et en Java\...

-   Constructeur porte le même nom que la classe
-   Mot réservé `this` représente l\'objet cible

``` lang-java
         class Contact
         {
            private String firstname, lastname;
            private int phonenumber;
            
            public Contact (String firstname, String lastname)
            {
               this.firstname = firstname;
               this.lastname = lastname;
               this.phonenumber = 0;
            }
            
            // [...]
         }
      
```
:::

::: section
## Et en Java\... (2)

-   Définition d\'une classe `Program`
    -   Ne sera pas instanciée
    -   Uniquement pour héberger méthode `main`

``` lang-java
         public class Program
         {
            public static void main(String[] args)
            {
               Contact marchand = new Contact("Cédric", "Marchand");
               System.out.println(marchand);

               // [...]
            }
         }
      
```
:::

::: {.section .code}
## Et en C++\...

``` lang-cpp
         #include <iostream>
         #include <string>
         
         using namespace std;
         
         class Contact
         {
            private:
               string firstname, lastname;
               int phonenumber;
            public:
               Contact(string, string);
            
            // [...]
         };
         
         Contact::Contact(string firstname, string lastname)
         {
            this->firstname = firstname;
            this->lastname = lastname;
            this->phonenumber = 0;
         }

         int main()
         {
            Contact marchand("Cédric", "Marchand");
            cout << marchand << endl;

            // [...]
         }
      
```
:::

::: {.section .code}
## Et en C#\...

``` lang-csharp
         namespace Application {
            class Contact
            {
               private string firstname, lastname;
               private int phonenumber;

               public Contact(string firstname, string lastname)
               {
                  this.firstname = firstname;
                  this.lastname = lastname;
                  this.phonenumber = 0;
               }

               // [...]
            }

            public class Program
            {
               public static void Main(string[] args)
               {
                  Contact marchand = new Contact("Cédric", "Marchand");
                  Console.WriteLine(marchand) ;

                  // [...]
               }
            }
         }
      
```
:::

::: section
## Variable d\'instance

-   Une **variable d\'instance** est liée à l\'objet [Sa valeur fait
    partie de l\'état de l\'objet]{.small}
-   Peuvent avoir une certaine **visibilité** [Uniquement accessible
    dans la classe ou visible de l\'extérieur]{.small}

``` lang-csharp
         class Contact
         {
            private string firstname, lastname;
            private int phonenumber;

            // [...]
         }
      
```
:::

::: section
## Instanciation

-   On peut créer plusieurs instances d\'une classe [Chaque instance a
    son identité propre]{.small}

<figure id="instanciation">

</figure>
:::

::: section
## Méthode

-   Une **méthode** (d\'instance) représente une fonctionnalité [Elle
    agit sur une instance spécifique, l\'objet cible]{.small}
-   Mot réservé spécifique pour accéder à l\'**objet cible** [Référence
    vers l\'objet cible (this, self,\...)]{.small}
-   Peuvent avoir une certaine **visibilité** [Uniquement accessible
    dans la classe ou visible de l\'extérieur]{.small}

``` lang-python
         class Contact
            # [...]

            def setPhoneNumber(self, number):
               self.phonenumber = number

            # [...]

         marchand.setPhoneNumber(8172)
         print(marchand)
      
```
:::

::: {.section .code}
## Et en Java\...

``` lang-java
         class Contact
         {
            private String firstname, lastname;
            private int phonenumber;
            
            public Contact (String firstname, String lastname)
            {
               this.firstname = firstname;
               this.lastname = lastname;
               this.phonenumber = 0;
            }

            public void setPhoneNumber(int number)
            {
               this.phonenumber = number;
            }

            @Override
            public String toString()
            {
               return String.format("%s %s (%d)", firstname, lastname, phonenumber);
            }
            
            // [...]
         }

         public class Program
         {
            public static void main(String[] args)
            {
               Contact marchand = new Contact("Cédric", "Marchand");
               marchand.setPhoneNumber(8172);
               System.out.println(marchand);
            }
         }
      
```
:::

::: {.section .code}
## Et en C#\...

``` lang-csharp
         namespace Application {
            class Contact
            {
               private string firstname, lastname;
               private int phonenumber;

               public Contact(string firstname, string lastname)
               {
                  this.firstname = firstname;
                  this.lastname = lastname;
                  this.phonenumber = 0;
               }

               public void SetPhoneNumber ( int number )
               {
                  phonenumber = number;
               }

               public override string ToString()
               {
                  return String.Format("{0} {1} ({2})",
                     this.firstname,
                     this.lastname,
                     this.phonenumber
                  );
               }
            }

            public class Program
            {
               public static void Main(string[] args)
               {
                  Contact marchand = new Contact("Cédric", "Marchand");
                  marchand.SetPhoneNumber(8172);
                  Console.WriteLine(marchand);
               }
            }
         }
      
```
:::

::: section
# Relations entre classes
:::

::: section
## Relation entre classes

-   Une classe définit un nouveau type de donnée [On peut l\'utiliser
    pour définir des objets de ce type]{.small}
-   Plusieurs classes peuvent être liées entre elle [Plusieurs types de
    relation sont possibles entre classes]{.small}
-   Création de dépendances entre classes [Et donc entre les instances
    de ces classes]{.small}
:::

::: {.section .code}
## Représentation d\'un dé

``` lang-csharp
         public class Die
         {
            public readonly int nbFaces; // Constante
            private int visibleFace;
            private static Random generator = new Random();

            public int VisibleFace{
               get { return visibleFace; }
            }

            public Die() : this(6){} // Appel de l' autre constructeur

            public Die(int faces)
            {
               nbFaces = faces;
               Roll();
            }

            public void Roll()
            {
               visibleFace = generator.Next(nbFaces) + 1;
            }
         }
      
```
:::

::: section
## Création de dés

``` lang-csharp
         public static void Main(string[] args)
         {
            Die d1 = new Die(); // Dé à 6 faces
            Die d2 = new Die(12); // Dé à 12 faces

            Console.WriteLine(d1.VisibleFace);
            Console.WriteLine(d2.VisibleFace);
         }
      
```

<figure id="dices">

</figure>
:::

::: {.section .code}
## Représentation d'une paire de dés

``` lang-csharp
         public class PairOfDice
         {
            private readonly int nbFaces;
            private int visibleFace1, visibleFace2;
            private static Random generator = new Random();

            public PairOfDice(int faces)
            {
               nbFaces = faces;
               visibleFace1 = generator.Next(nbFaces) + 1;
               visibleFace2 = generator.Next(nbFaces) + 1;
            }

            public void PrintFaces()
            {
               Console.WriteLine(String.Format("{0}, {1}", visibleFace1, visibleFace2));
            }
         }
      
```
:::

::: section
## Composition de classe

-   Définir une nouvelle classe à partir d'autres [En déclarant des
    variables d'instance des types utilisés]{.small}
-   Éviter la répétition de code inutile [Facilite les corrections et
    les évolutions]{.small}
-   Construire des objets à partir de blocs simples [Comme on le fait
    dans la vraie vie\...]{.small}
:::

::: {.section .code}
## Représentation d'une paire de dés (2)

``` lang-csharp
         public class PairOfDice
         {
            private int nbFaces;
            private Die die1, die2;        // Composition à partir
                                           // de deux objets Die
            public PairOfDice(int faces)
            {
               nbFaces = faces;
               die1 = new Die(faces);
               die2 = new Die(faces);
            }

            public void PrintFaces()
            {
               Console.WriteLine(String.Format("{0}, {1}", die1.VisibleFace , die2.VisibleFace));
            }
         }
      
```
:::

::: section
## Relation de composition

-   Une classe A est composée à partir d'une classe B [Une instance de A
    a des variables d'instance de type B]{.small}
-   Également appelée relation has-a (ou is-made-up-of ) [Une instance
    de A has-a une(des) instance(s) de B]{.small}

<figure id="composition">

</figure>
:::

::: section
## Lien fort entre les instances composées

-   Objets contenus **fortement liés** à l'objet contenant [Ils
    disparaissent de la mémoire avec l'objet contenant]{.small}
-   Instances contenues **créées en même temps** que la contenante [Lors
    de l'initialisation de l'instance contenante]{.small}
-   **Avantages** et inconvénients
    -   On construit sur l'existant, plus grande modularité
    -   Redondance et duplication de données (nombre de faces)
    -   Souplesse et évolutivité (différents nombres de faces possible)
:::

::: section
## Agrégation

-   Généralisation de la composition, sans l'appartenance [Deux objets
    indépendamment créés vont pouvoir être agrégés]{.small}
-   Suppression de l'objet contenant sans toucher aux contenus

<figure id="aggregation">

</figure>
:::

::: section
## Composition et agrégation

-   Relation de contenance entre objets
-   Existence indépendante de l'objet contenu ou non
    -   Oui dans le cas d'une agrégation (owns-a)
    -   Non dans le cas d'une composition (is-made-up-of)
:::

::: section
## Relation d\'association

-   Relation d'utilisation entre deux classes (use) [Beaucoup plus
    générale que composition et agrégation]{.small}
-   Plusieurs situations possibles d'utilisation
    -   Recevoir un objet en paramètre
    -   Renvoyer un objet
    -   Utiliser un objet dans le corps d'une méthode

<figure id="association">

</figure>
:::

::: section
## Comparaison des relations

-   Classement des relations en fonction de leur force [Association \<
    Agrégation \< Composition]{.small}

                cycles de vie indépendants   appartenance
  ------------- ---------------------------- --------------
  association   oui                          **non**
  agrégation    oui                          oui
  composition   **non**                      oui
:::

::: section
## Couplage et cohésion

-   Classes **couplées** si l'une dépend de l'implémentation de l'autre
    [Une classe accède aux variables d'instance de l'autre\...]{.small}
-   **Cohésion** d'une classe mesure son niveau d'indépendance [Classe
    cohérente facilement maintenable et réutilisable]{.small}
-   Il faut minimiser ↓ le couplage et maximiser ↑ la cohésion [Règle de
    bonne pratique en programmation orientée objet]{.small}
:::
