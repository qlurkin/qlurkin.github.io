---
lang: en
title: Cours 2 - Relation d\'héritage
viewport: width=device-width, initial-scale=1.0
---

::: section
# PO3T - Cours 2[Relation d\'héritage]{.small}

Quentin Lurkin
:::

::: section
## Héritage

-   Définir une classe **à partir** d\'une autre [Sous-ensemble des
    membres communs entre les deux classes]{.small}
-   Possibilité d\'exploiter le **polymorphisme** [Un même objet peut
    prendre plusieurs formes selon le contexte]{.small}
-   Nouveau niveau de **visibilité** pour les membres d\'une classe
    [Membres privés à une classe, mais hérités auprès des
    sous-classes]{.small}
:::

::: {.section .code}
## Représentation d\'une paire

``` lang-csharp
         public class Pair
         {
            private readonly double x, y;

            public Pair(double x, double y)
            {
               this.x = x;
               this.y = y;
            }

            public bool IsOrdered ()
            {
               return x <= y;
            }

            public override string ToString ()
            {
               return string.Format("({0}, {1})", x, y);
            }
         }
      
```
:::

:::: section
## Représentation d\'une paire

-   Une paire est composée de deux nombres réels [On renseigne les deux
    nombres au moment de la construction]{.small}
-   La méthode `IsOrdered()` teste si la paire est **ordonnée**

``` lang-csharp
         Pair p1 = new Pair(12, 7);
         Pair p2 = new Pair(-2, 0);

         Console.WriteLine(string.Format("{0}: {1}", p1, p1.IsOrdered()));
         Console.WriteLine(string.Format("{0}: {1}", p2, p2.IsOrdered()));
      
```

::: terminal
(12, 7) : False (-2, 0) : True
:::
::::

::: section
## Paire ordonnée

-   La classe OrderedPair représente une **paire ordonnée** [Le premier
    élément de la paire doit être ≤ au second]{.small}
-   **Deux manières** de définir une telle classe
    -   Imposer la contrainte sur les paramètres du constructeur
    -   Laisser le constructeur réordonner les éléments de la paire
-   Faire confiance à l\'utilisateur ou avoir un **code robuste** [Code
    interne de confiance, mais code public doit être robuste]{.small}
:::

::: section
## Paire ordonnée

``` lang-csharp
         public class OrderedPair
         {
            private readonly double x, y;

            public Pair(double x, double y)
            {
               this.x = a <= b ? a : b;
               this.y = a <= b ? b : a;
            }

            public bool IsOrdered ()
            {
               return true;
            }

            public override string ToString ()
            {
               return string.Format("({0}, {1})", x, y);
            }
         }
      
```
:::

:::: section
## Paire ordonnée

-   Une paire ordonnée ré-ordonne les nombres réels [Au moment
    d\'appeler le constructeur de la classe]{.small}
-   La méthode `IsOrdered()` renvoie toujours `True`

``` lang-csharp
         Pair o1 = new OrderedPair(12, 7);
         Pair o2 = new OrderedPair(-2, 0);

         Console.WriteLine(string.Format("{0}: {1}", o1, o1.IsOrdered()));
         Console.WriteLine(string.Format("{0}: {1}", o2, o2.IsOrdered()));
      
```

::: terminal
(7, 12) : True (-2, 0) : True
:::
::::

::: section
## Extension d\'une classe

-   Une **paire ordonnée** est en fait une paire
    -   Avec des spécificités juste pour les paires ordonnées
    -   `OrderedPair` vu comme une spécialisation de la classe `Pair`
-   On veut **hériter** une partie du comportement de la classe `Pair`
    [Éviter de la duplication de code, réutiliser l\'existant]{.small}
-   On veut **ajouter** des comportements spécifiques à `OrderedPair`
    [Pouvoir différencier la nouvelle classe]{.small}
:::

::: section
## Extension d\'une classe

-   Une sous-classe **étend** une super-classe
    -   La sous-classe hérite d\'une série d\'éléments de la
        super-classe
    -   Il peut y avoir du code spécifique à la sous-classe

<figure id="heritage">

</figure>
:::

::: section
## Extension d\'une classe

-   Une sous-classe (classe dérivée, classe enfant) **étend** une autre
    [la super-classe (classe étendue, classe parent)]{.small}
-   **Constructeur d\'une sous-classe** appelle celui de la classe
    parent [Construire la super-classe avant la sous-classe !]{.small}

``` lang-csharp
         public class OrderedPair : Pair
         {
            public OrderedPair(double a, double b) :
            base(a <= b ? a : b, a <= b ? b : a)
            {

            }
         }
      
```
:::

::: section
## Et en Java\...

-   Signaler l\'extension avec `extends`
-   Appel du **constructeur de la super-classe** avec `super` [Doit être
    la première instruction du constructeur]{.small}

``` lang-java
         public class OrderedPair extends Pair
         {
            public OrderedPair ( double a, double b)
            {
               super (a <= b ? a : b, a <= b ? b : a);
            }
         }
      
```
:::

::: section
## Et en C++

-   Signaler **l\'extension** en précisant la super-classe après le `:`
    [Mot réservé `public` nécessaire pour le polymorphisme]{.small}
-   Appel au **constructeur de la super-classe** via son nom

``` lang-cpp
         class OrderedPair : public Pair
         {
            public :
               OrderedPair(double a, double b);
         };

         OrderedPair::OrderedPair(double x, double y) :
         Pair (x <= y ? x : y, x <= y ? y : x)
         {

         }
      
```
:::

::: section
## Et en Python\...

-   Signaler la **classe étendue** entre parenthèses
-   Appel du **constructeur de la super-classe** avec `super()` [Appel
    explicite, il faut écrire `__init__()`]{.small}

``` lang-python
         class OrderedPair(Pair):
            def __init__(self, x, y):
               super().__init__ (x if x <= y else y, y if x <= y else x)
      
```
:::

::: section
## Représentation d\'une personne

-   Une personne a un nom et une date de naissance [Le prénom et le nom
    sont ici stockés ensemble]{.small}

``` lang-csharp
         public class Person
         {
            private String name;
            private DateTime birthday;

            public Person(string name, DateTime birthday)
            {
               this.name = name;
               this.birthday = birthday;
            }

            public override string ToString()
            {
               return string.Format("{0} ({1})", name, birthday);
            }
         }
      
```
:::

::: section
## Représentation d\'une personne

-   Création de **deux objets** dans le but de créer une personne
    [Est-ce une agrégation ou une composition ?]{.small}

``` lang-csharp
         DateTime birthday = new DateTime(1996, 2, 18);
         Person arno = new Person("Arno Feelters", birthday);
      
```
:::

::: section
## Représentation d\'un employé

-   Un **employé** est une personne avec un salaire [La classe
    `Employee` étend la classe `Person`]{.small}
-   Ajout d\'une **variable et méthode d\'instance** dans la sous-classe

``` lang-csharp
         public class Employee : Person
         {
            private double salary;

            public Employee(string name, DateTime birthday, double salary ) :
            base (name, birthday)
            {
               this.salary = salary;
            }

            public double GetSalary()
            {
               return this.salary;
            }
         }
      
```

``` lang-csharp
         Employee flemal = new Employee(
            "C. Flemal",
            new DateTime (1992, 4, 21),
            3200
         );
      
```
:::

::: section
## Constructeur d\'une sous-classe

-   Deux missions pour le constructeur d\'une sous-classe
    -   Initialisation de la super-classe
    -   Construction de la sous-classe
-   Utilisation du mot réservé `base` après l\'entête du constructeur
    [Invocation du constructeur de la super-classe]{.small}

``` lang-csharp
         public Employee (string name, DateTime birthday, double salary) :
         base (name , birthday)
         {
            this.salary = salary;
         }
      
```
:::

:::: section
## Accès à la super-classe

-   Accès restreint aux variables d\'instance de la super-classe
    [Variables privées pas accessibles dans la sous-classe]{.small}

``` lang-csharp
         public Employee (string name, DateTime birthday, double salary) :
         base (name , birthday)
         {
            this.name = name;
            this.salary = salary;
         }
      
```

::: terminal
Employees.cs (29 ,18) : error CS0122 : \'Cours2.Person.name\' is
inaccessible due to its protection level
:::
::::

::: section
## Masquage de variable

-   Masquage d\'une variable d\'instance de la super-classe [Si variable
    d\'instance de même nom dans la sous-classe]{.small}
-   L\'instance possède deux **variables d\'instance** de même nom
    [Elles ne sont pas toutes les deux accessibles]{.small}

``` lang-csharp
         public class Employee : Person
         {
            private String name;
            private double salary;

            public Employee(string name, DateTime birthday, double salary ) :
            base (name, birthday)
            {
               this.name = name;
               this.salary = salary;
            }

            // ...
         }
      
```
:::

::: section
## Masquage de variable

-   Chaque variable d\'instance est accessible depuis sa classe [Celle
    où la variable a été définie]{.small}
-   Quel `nom` est affiché ? \"C. Flemal\" ou \"Bullshit\"

``` lang-csharp
         public class Employee : Person
         {
            private String name;
            private double salary;

            public Employee(string name, DateTime birthday, double salary ) :
            base (name, birthday)
            {
               this.name = "Bullshit";
               this.salary = salary;
            }

            public double GetSalary()
            {
               return this.salary;
            }
         }

         // dans le Main
         Employee flemal = new Employee(
            "C. Flemal",
            new DateTime (1992, 4, 21),
            3200
         );
         Console.WriteLine(flemal);
      
```
:::

::: section
## Accès à la super-classe

-   Variable d\'instance publique accessible depuis la sous-classe [La
    sous-classe peut modifier une variable de la super-classe]{.small}
-   Quel `nom` est affiché ? \"C. Flemal\" ou \"Bullshit\"

``` lang-csharp
         public class Person
         {
            public String name;
            private DateTime birthday;

            public Person(string name, DateTime birthday)
            {
               this.name = name;
               this.birthday = birthday;
            }

            public override string ToString()
            {
               return string.Format("{0} ({1})", name, birthday);
            }
         }

         public class Employee : Person
         {
            private String name;
            private double salary;

            public Employee(string name, DateTime birthday, double salary ) :
            base (name, birthday)
            {
               this.name = "Bullshit";
               this.salary = salary;
            }

            public double GetSalary()
            {
               return this.salary;
            }
         }

         // dans le Main
         Employee flemal = new Employee(
            "C. Flemal",
            new DateTime (1992, 4, 21),
            3200
         );
         Console.WriteLine(flemal);
      
```
:::

::: section
## Masquage et accès à la super-classe

-   Accès direct et explicite à la super-classe avec `base` [La
    sous-classe peut modifier une variable de la super-classe]{.small}
-   Quel `nom` est affiché ? \"C. Flemal\", \"Bullshit\" ou \"Shitbull\"

``` lang-csharp
         public class Person
         {
            public String name;
            private DateTime birthday;

            public Person(string name, DateTime birthday)
            {
               this.name = name;
               this.birthday = birthday;
            }

            public override string ToString()
            {
               return string.Format("{0} ({1})", name, birthday);
            }
         }

         public class Employee : Person
         {
            private String name;
            private double salary;

            public Employee(string name, DateTime birthday, double salary ) :
            base (name, birthday)
            {
               this.name = "Bullshit";
               base.name = "Shitbull";
               this.salary = salary;
            }

            public double GetSalary()
            {
               return this.salary;
            }
         }

         // dans le Main
         Employee flemal = new Employee(
            "C. Flemal",
            new DateTime (1992, 4, 21),
            3200
         );
         Console.WriteLine(flemal);
      
```
:::

::: section
## Résolution de variable

-   Pas d\'obligation d\'utiliser this ou base [Pour autant qu\'il n\'y
    a pas d\'ambiguïté possible]{.small}
-   Règle d\'évaluation dans la recherche d\'une variable
    -   Variable locale
    -   Variable d\'instance définie dans la même classe
    -   Variable d\'instance héritée d\'un ancêtre
:::

::: section
## Redéfinition de méthode

-   Une sous-classe peut redéfinir une méthode héritée [La version de la
    super-classe est masquée]{.small}
-   Quel `nom` est affiché ? \"C. Flemal\" ou \"C. Marchand\"

``` lang-csharp
         public class Person
         {
            public String name;
            private DateTime birthday;

            public Person(string name, DateTime birthday)
            {
               this.name = name;
               this.birthday = birthday;
            }

            public override string ToString()
            {
               return string.Format("{0} ({1})", name, birthday);
            }
         }

         public class Employee : Person
         {
            private String name;
            private double salary;

            public Employee(string name, DateTime birthday, double salary ) :
            base (name, birthday)
            {
               this.name = "Bullshit";
               base.name = "Shitbull";
               this.salary = salary;
            }

            public double GetSalary()
            {
               return this.salary;
            }

            public override string ToString()
            {
               return "C. Marchand";
            }

         }

         // dans le Main
         Employee flemal = new Employee(
            "C. Flemal",
            new DateTime (1992, 4, 21),
            3200
         );
         Console.WriteLine(flemal);
      
```
:::

::: section
## Redéfinition de méthode

-   Permet de faire une spécialisation dans la sous-classe [Peut
    repartir du comportement de la super-classe avec `base`]{.small}
-   Le mot réservé `override` indique une redéfinition []{.small}
-   La méthode de la super-classe doit être redéfinissable (`virtual`)
    [Les redéfinitions sont `virtual` par défaut]{.small}

``` lang-csharp
         public class Employee : Person
         {
            public override string ToString()
            {
               return base.ToString() + String.Format("\nSalaire : {0}", salary);
            }
         }
      
```
:::

:::: section
## Et en Python\...

``` lang-python
         class Mammal:
            def yell(self):
               print('Bwaaah')

         class Cat(Mammal):
            def yell(self):
               print('Meow')

         class DuckBilledPlatypus(Mammal):
            pass

         a = Mammal()
         b = Cat()
         c = DuckBilledPlatypus()
         
         a.yell()
         b.yell()
         c.yell()
      
```

::: terminal
Bwaaah Meow Bwaaah
:::
::::

::: section
## Masquage de méthode

-   Méthode de même entête masque version de super-classe [Si elle
    n\'est pas marquée comme une redéfinition]{.small}
-   Quel `nom` est affiché ? \"C. Flemal\" ou \"C. Marchand\"

``` lang-csharp
         public class Employee : Person
         {
            // ...

            public string ToString()
            {
               return "C. Marchand";
            }
         }

         // dans le Main
         Employee flemal = new Employee(
            "C. Flemal",
            new DateTime (1992, 4, 21),
            3200
         );
         Console.WriteLine(flemal);
      
```
:::

::: section
## Masquage de méthode

-   Le mot réservé `new` indique explicitement un masquage [Pas obligé
    d\'utiliser, mais warning à la compilation]{.small}

``` lang-csharp
         public class Employee : Person
         {
            // ...

            public new string ToString()
            {
               return "C. Marchand";
            }
         }
      
```
:::

::::: section
## Masquage de méthode

-   Comportement étrange\... là c\'est Flemal\...

``` lang-csharp
         Employee flemal = new Employee(
            "C. Flemal",
            new DateTime (1992, 4, 21),
            3200
         );
         Console.WriteLine(flemal);
      
```

::: terminal
C. Flemal
:::

-   \...et ici c\'est Marchand

``` lang-csharp
         Employee flemal = new Employee(
            "C. Flemal",
            new DateTime (1992, 4, 21),
            3200
         );
         Console.WriteLine(flemal.ToString());
      
```

::: terminal
C. Marchand
:::
:::::
