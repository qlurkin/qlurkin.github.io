---
lang: en
title: Cours 3 - Polymorphisme, interface et classe abstraite
viewport: width=device-width, initial-scale=1.0
---

::: section
# PO3T - Cours 3 [Polymorphisme, interface et classe abstraite]{.small}

Quentin Lurkin
:::

::: section
## Point dans le plan

-   **Point** dans le plan en coordonnées entières [Accesseurs pour les
    coordonnées `x` et `y` et méthode `ToString`]{.small}

``` lang-csharp
            public class Point
            {
                private readonly int x, y;

                public Point (int x, int y)
                {
                    this.x = x;
                    this.y = y;
                }

                public int X { get { return x; } }
                public int Y { get { return y; } }

                // [...]

                public override string ToString()
                {
                    return String.Format ("({0}, {1})", x, y);
                }
            }
        
```
:::

::: section
## Point coloré

-   **Extension** de la classe `Point` [Ajout d'une variable d'instance
    pour stocker la couleur]{.small}
-   **Réutilisation** du code de la classe mère avec `base`

``` lang-csharp
            public class ColouredPoint : Point
            {
                private readonly Color colour;

                public Color Colour { get { return colour; } }

                public ColouredPoint(int x, int y, Color colour) :
                base(x, y)
                {
                    this.colour = colour;
                }

                // [...]

                public override string ToString ()
                {
                    return String.Format("{0} [color={1}]",
                        base.ToString(), colour.Name
                    );
                }
            }
        
```
:::

::: section
## Hiérarchie de classe

-   Établissement d'une **hiérarchie de classe** [Plusieurs classes
    liées par des relations d'héritage]{.small}
-   Une classe peut avoir des **ancêtres et/ou des enfants**

<figure id="point">

</figure>
:::

::: section
## Méthode héritée

-   Méthodes publiques de la super-classe sont **héritées** [Comme si
    elles avaient été définies dans la sous-classe]{.small}
-   Ajout d'une méthode **Translate** dans la classe `Point` [Création
    et renvoi d'un nouvel objet `Point`]{.small}

``` lang-csharp
            public class Point
            {
                // [...]

                public Point Translate(int dx, int dy)
                {
                    return new Point(x + dx, y + dy);
                }

                // [...]
            }
        
```
:::

:::: section
## Méthode héritée

-   On peut **translater** un point coloré [Mais le résultat produit
    sera un simple point\...]{.small}

``` lang-csharp
            public class Program
            {
                public static void Main(string[] args)
                {
                    ColouredPoint cp = new ColouredPoint(1, 2, Color.Red);
                    Console.WriteLine(cp);
                    Console.WriteLine(cp.Translate(1, 0));
                }
            }
        
```

::: terminal
(1, 2) \[color=Red\] (2, 2)
:::
::::

::: section
## Redéfinition de méthode

-   **Redéfinition** d'une méthode [Remplacement de la version de la
    super-classe]{.small}
-   **Maintien de la couleur** lors d'une translation [Création d'un
    nouvel objet `ColouredPoint`]{.small}

``` lang-csharp
            public class ColouredPoint : Point
            {
                // [...]

                public override Point Translate(int dx, int dy)
                {
                    return new ColouredPoint(X + dx, Y + dy, colour);
                }

                // [...]
            }
        
```
:::

::: section
## Autorisation de redéfinition

-   La super-classe doit **autoriser la redéfinition** de ses méthodes
    [Avec visibilité ou modificateurs (`virtual` en C#, `final` en
    Java\...)]{.small}
-   La méthode redéfinie doit garder (quasi) la **même signature** [La
    visibilité peut être éventuellement modifiée]{.small}

``` lang-csharp
            public class Point
            {
                // [...]

                public virtual Point Translate(int dx, int dy)
                {
                    return new Point(x + dx, y + dy);
                }

                // [...]
            }
        
```
:::

::: section
# Polymorphisme
:::

::: section
## Représentation en mémoire

-   Création de deux objets distincts de **différents types**
    [Références stockées dans des variables de différents types]{.small}
-   **Deux instances distinctes** sont créées en mémoire [Un objet de
    type Point et un de type ColouredPoint]{.small}

``` lang-csharp
            public class Program
            {
                public static void Main(string[] args)
                {
                    Point p = new Point(3, 5);

                    ColouredPoint cp = new ColouredPoint(1, 2, Color.Red);
                }
            }
        
```
:::

::: section
## Représentation en mémoire

<figure id="point_instance">

</figure>
:::

::: section
## Type d'une variable

-   Une variable peut avoir **plusieurs types** [Une instance d'une
    sous-classe est aussi une de la super-classe]{.small}
-   Principale distinction entre **deux types**
    -   Type de la variable (lors de sa déclaration)
    -   Type de l'objet référencé par la variable

``` lang-csharp
            ColouredPoint cp = new ColouredPoint(1, 2, Color.Red);
        
```
:::

::: section
## Type d'une variable

-   Une variable d'un type peut contenir un **objet d'un autre type**
    [Pour autant que les types soient compatibles]{.small}
-   **Stockage** d'un objet `ColouredPoint` dans une variable `Point`
    [Car `ColouredPoint` est une sous-classe de `Point`]{.small}

``` lang-csharp
            Point p = new ColouredPoint(1, 2, Color.Red);
        
```
:::

::: section
## Polymorphisme

-   Un objet peut être **vu avec différents types** [En fonction du type
    de la variable utilisée pour le référencer]{.small}
-   Le type de la variable définit les **méthodes utilisables** [Des
    méthodes existantes peuvent donc être indisponibles]{.small}
-   Un même objet peut **\"changer de type\"** durant l'exécution [Le
    type de l'objet ne changera jamais, seulement celui perçu]{.small}
:::

:::: section
## Polymorphisme

-   Tester le type de l'**objet référencé** à partir d'une variable
    [Test de la relation *is-a*]{.small}
-   Opérateur de test de la **compatibilité de type** [Variable contient
    une référence vers un objet d'un type donné]{.small}

``` lang-csharp
            Console.WriteLine(( p is Point)+" / "+( p is ColouredPoint));
            Console.WriteLine((cp is Point)+" / "+(cp is ColouredPoint));
        
```

::: terminal
True / False True / True
:::
::::

::: section
## Conversion implicite

-   Une référence peut être **convertie implicitement** [D'un objet qui
    est d'un sous-type de celui de la variable]{.small}
-   Conversion par **affectation** directe ou par appel de méthode

``` lang-csharp
            public class Program
            {
                public static void Main(string[] args)
                {
                    // [...]

                    Console.WriteLine(sum(p, cp));
                }

                private static Point sum(Point a, Point b)
                {
                    return new Point(a.X + b.X, a.Y + b.Y);
                }
            }
        
```
:::

::: section
## Conversion explicite

-   Une référence peut être **convertie explicitement** [Pour autant que
    le type de l'objet soit compatible]{.small}
-   Conversion à l'aide de l'**opérateur de conversion**

``` lang-csharp
            public class Program
            {
                public static void Main(string[] args)
                {
                    // [...]

                    Point q = new ColouredPoint(1, 2, Color.Red);
                    Console.WriteLine(IsRed((ColouredPoint) q));
                }

                private static bool IsRed(ColouredPoint p)
                {
                    return p.Colour.Equals(Color.Red);
                }
            }
        
```
:::

:::: section
## Compatibilité versus type

-   Test du **type réel** d'un objet [L'objet est une instance de quelle
    classe ?]{.small}
-   Test de **compatibilité du type** d'un objet [Peut-on convertir
    implicitement l'objet vers un type ?]{.small}

``` lang-csharp
            Console.WriteLine((cp is Point)+" / "+(cp is ColouredPoint));

            Console.WriteLine(cp.GetType() == typeof(Point));
            Console.WriteLine(cp.GetType() == typeof(ColouredPoint));
        
```

::: terminal
True / True False True
:::
::::

::: section
## Conversion explicite

-   **Vérification de la compatibilité** avant conversion explicite
    [Sans quoi il y a risque d'une erreur de conversion]{.small}

``` lang-csharp
            public class Program
            {
                public static void Main(string[] args)
                {
                    // [...]

                    Point q = new ColouredPoint(1, 2, Color.Red);
                    if(q is ColouredPoint)
                    {
                        ColouredPoint cp = (ColouredPoint) q;
                        Console.WriteLine(IsRed(cp));
                    }
                }

                // [...]
            }
        
```
:::

::: section
## Type statique versus dynamique

-   **Type statique** lors de la **déclaration de la variable**
    -   Déterminé une fois pour toute à la déclaration
    -   Limite les références qui pourront être stockées
    -   Uniquement pour les langages typés statiquement
-   **Type dynamique** de l'**objet référencé par la variable**
    -   Déterminé lors de l'exécution
    -   Peut changer en cours d'exécution
:::

::: section
## Type compatible

-   Deux types **compatibles** sont liés par une relation de filiation
-   Attention, la compatibilité est **unidirectionnelle**
-   Conversions si **type dynamique de `b` compatible avec `A`**
    -   Implicite : A a = b;
    -   Explicite : A a = (A) b;
:::

::: section
## Résolution des appels de méthode

-   Le type statique détermine les **méthodes accessibles** [Les seules
    méthodes accessibles sont celles du type statique]{.small}
-   La **méthode effectivement appelée** dépend du type dynamique [En
    cas de redéfinition, la méthode de la sous-classe est
    appelée]{.small}
-   Résolution en **deux étapes**
    -   Méthodes accessibles vérifiées à la compilation
    -   Méthode appelée décidée à l'exécution
:::

:::: section
## Résolution des appels de méthode

-   Méthode de la sous-classe **non accessible** [Car le type statique
    est celui de la super-classe]{.small}

``` lang-csharp
            Point p = new ColouredPoint (7, 5, Color.Red);

            Console.WriteLine(p.Colour);
        
```

::: terminal
Program.cs (32, 25) : error CS1061 : Type \'Cours4 .Point\' does not
contain a definition for \'Colour\' and no extension method \'Colour\'
of type \'Cours4.Point\' could be found. Are you missing an assembly
reference ?
:::
::::

:::: section
## Résolution des appels de méthode

-   Méthode redéfinie dans sous-classe **appelée** [Même si type
    statique de la variable est de la super-classe]{.small}

``` lang-csharp
            Point p = new ColouredPoint(7, 5, Color.Red);

            Console.WriteLine(p.ToString());
        
```

::: terminal
(7, 5) \[color=Red\]
:::
::::

::: section
## Classe Object

-   La classe `Object` est la super-classe de tout le monde [Racine de
    toutes les hiérarchies de classe]{.small}
-   Contient plusieurs **méthodes redéfinissables** communes à tous
    -   Représentation d'un objet sous forme de chaine de caractères

        ``` lang-csharp
                                    public virtual string ToString()
                                
        ```

    -   Test de l'égalité de deux objets

        ``` lang-csharp
                                    public virtual bool Equals (object obj)
                                
        ```

    -   Obtention d'un code de hachage pour l'objet

        ``` lang-csharp
                                    public virtual int GetHashCode()
                                
        ```
:::

::: section
## Classe Object

-   Classe permettant de représenter des paires d'entiers [Redéfinition
    des méthodes Equals et ToString]{.small}

``` lang-csharp
            public class IntPair
            {
                private readonly int x, y;

                // [...]

                public override bool Equals(object obj)
                {
                    if(obj == null || GetType () != obj.GetType ())
                    {
                        return false;
                    }

                    IntPair p = (IntPair) obj;
                    return x == p.x && y == p.y;
                }

                public override string ToString()
                {
                    return String.Format("({0}, {1})", x, y);
                }
            }
        
```
:::

::: section
## Surcharge de méthode

-   Plusieurs méthodes peuvent avoir le **même nom** [Pour autant que
    les types de la liste de paramètres différent]{.small}
-   Simule les **paramètres optionnels** (de Python, par exemple)

``` lang-csharp
            public static void Kill(string target, Weapon weapon)
            {
                // ...
            }

            public static void Kill(string target)
            {
                Kill(target, new CrossBow());
            }
        
```
:::

::: section
## Résolution de la surcharge

-   Étapes de la résolution de la **surcharge de méthodes**
    1.  Construction liste des types des paramètres réels
    2.  Identification des méthodes accessibles avec le type statique
    3.  Recherche d'une méthode avec la même liste de types
    4.  Recherche des méthodes avec paramètres compatibles
    5.  Choix de la méthode la plus spécifique
-   Avec la signature candidate, il faut choisir la **version à
    exécuter** [On reprend la règle de résolution liée à la
    redéfinition]{.small}
:::

::: section
# Interface et classe abstraite
:::

::: section
## Interface

-   Une **interface** ne contient que des entêtes de méthode [Visibilité
    publique forcée des méthodes]{.small}
-   Permet de définir un **contrat** avec un utilisateur [Définition
    d'un ensemble de méthodes qui devront être présentes]{.small}

``` lang-csharp
            public interface Complex
            {
                double Real();
                double Imag();
                double Abs();
                double Arg();
            }
        
```
:::

::: section
## Relation d'implémentation

-   Une classe peut **implémenter** une interface [Doit fournir un corps
    pour toutes les méthodes de l'interface]{.small}

``` lang-csharp
            public class CartesianComplex : Complex
            {
                private readonly double a, b;

                public CartesianComplex(double a, double b)
                {
                    this.a = a;
                    this.b = b;
                }

                public double Real() { return a; }
                public double Imag() { return b; }
                public double Abs() { return Math.Sqrt (a*a + b*b); }
                public double Arg() { return Math.Acos (a / Abs()); }
            }
        
```
:::

::: section
## Polymorphisme avec interface

-   Plusieurs classes peuvent implémenter la même interface [Permet du
    polymorphisme comme avec l'héritage]{.small}

``` lang-csharp
            public class PolarComplex : Complex
            {
                private readonly double r, theta;

                public PolarComplex(double r, double theta)
                {
                    this.r = r;
                    this.theta = theta;
                }

                public double Real() { return r * Math.Cos(theta); }
                public double Imag() { return r * Math.Sin(theta); }
                public double Abs() { return r; }
                public double Arg() { return theta; }
            }
        
```
:::

:::: section
## Polymorphisme avec interface

-   **Somme de nombres complexes** facilitée par polymorphisme [Il
    suffit de passer par les méthodes de l'interface]{.small}

``` lang-csharp
            List<Complex> list = new List<Complex>();
            list.Add(new CartesianComplex(2, -1));
            list.Add(new PolarComplex(2, Math.PI / 2));
            list.Add(new CartesianComplex(-1, 1));

            double a = 0;
            double b = 0;
            foreach(Complex c in list)
            {
                a += c.Real();
                b += c.Imag();
            }

            Complex sum = new CartesianComplex(a, b);
            Console.WriteLine(sum);
        
```

::: terminal
1 + 2i
:::
::::

::: section
## Implémentation multiple

-   Une classe peut **implémenter plusieurs interfaces** [Ce qui lève la
    limitation des langages sans héritage multiple]{.small}
-   La **relation implements** est également une relation *is-a*
:::

::: section
## Classe abstraite

-   **Intermédiaire** entre l'interface et la classe concrète [Certaines
    méthodes communes peuvent être implémentées]{.small}
-   Une classe abstraite n'est **pas instanciable**

``` lang-csharp
            public abstract class Complex
            {
                public abstract double Real();
                public abstract double Imag();

                public virtual double Abs()
                {
                    double a = Real();
                    double b = Imag();
                    return Math.Sqrt(a*a + b*b);
                }

                public virtual double Arg()
                {
                    return Math.Acos(Real()/Abs());
                }
            }
        
```
:::

::: section
## Classe abstraite

-   Deux **modificateurs** de méthode
    -   Méthode sans corps à redéfinir dans les sous-classes
        (`abstract`)
    -   Méthode avec corps mais redéfinissable (`virtual`)

``` lang-csharp
            public abstract class Complex
            {
                public abstract double Real();
                public abstract double Imag();

                public virtual double Abs()
                {
                    double a = Real();
                    double b = Imag();
                    return Math.Sqrt(a*a + b*b);
                }

                public virtual double Arg()
                {
                    return Math.Acos(Real()/Abs());
                }
            }
        
```
:::

::: section
## Classe abstraite

-   Une classe abstraite est **étendue** en classe concrète [Il faut
    définir le corps des méthodes abstraites]{.small}

``` lang-csharp
            public class CartesianComplex : Complex
            {
                private readonly double a, b;

                // a + bi
                public CartesianComplex(double a, double b)
                {
                    this.a = a;
                    this.b = b;
                }

                public override double Real() { return a; }
                public override double Imag() { return b; }

                public override string ToString()
                {
                    return String.Format("{0} + {1}i", a, b);
                }
            }
        
```
:::

::: section
## Classe abstraite

-   On peut redéfinir une méthode définie dans la classe abstraite [Il
    s'agit d'une simple redéfinition de méthode]{.small}

``` lang-csharp
            public class PolarComplex : Complex
            {
                private readonly double r, theta;

                public PolarComplex(double r, double theta)
                {
                    this.r = r;
                    this.theta = theta;
                }

                public override double Real() { return r * Math.Cos(theta); }
                public override double Imag() { return r * Math.Sin(theta); }

                public override double Abs() { return r; }
                public override double Arg() { return theta ; }
            }
        
```
:::

::: section
## Hiérarchie de classe

-   Une interface est une **classe abstraite pure** [Et ne contenant pas
    de constructeur, ni de variables d'instance]{.small}
-   Une sous-classe d'une classe abstraite peut être **abstraite** [Si
    elle ne fournit pas de corps à toutes les méthodes
    abstraites]{.small}
-   Permet d'**éviter** de la duplication de code [En rassemblant les
    membres communs dans la super-classe]{.small}
:::
