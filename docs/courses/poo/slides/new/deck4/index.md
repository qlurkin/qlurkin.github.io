---
lang: en
title: Cours 4 - Types génériques, Visibilité, Encapsulation et
  Immuabilité
viewport: width=device-width, initial-scale=1.0
---

::: section
# PO3T - Cours 4 [Types génériques, Visibilité, Encapsulation et Immuabilité]{.small}

Quentin Lurkin
:::

::: section
## Type générique

-   Définition d'un type non spécifié lors de l'implémentation
    [Classe/méthode générique utilisable avec plusieurs types]{.small}
-   Classe/méthode paramétrée avec un ou plusieurs types [Spécification
    du type désiré lors de l'instanciation/appel]{.small}
-   Possibilité de spécifier un ensemble de types acceptables [En
    utilisant notamment la relation is-a]{.small}
:::

::: section
## Type générique

-   Spécification des types génériques de la classe entre chevrons

``` lang-csharp
            public class Pair <S,T>
            {
                private readonly S first;
                private readonly T second;
                
                public Pair (S first, T second)
                {
                    this.first = first;
                    this.second = second;
                }

                public S First { get { return first; } }
                public T Second { get { return second; } }

                public override string ToString()
                {
                    return String.Format ("({0}, {1})", first, second);
                }
            }
        
```
:::

:::: section
## Type générique

-   Spécification des types effectifs lors de l'instanciation [Doit
    aussi être précisé pour le type de la variable]{.small}

``` lang-csharp
            Pair<string,int> p = new Pair<string,int> ("Tom", 21);
            Console.WriteLine (p);

            Pair<string,Pair<int,int>> q = new Pair<string,Pair<int,int>> (
                "Tom",
                new Pair<int,int> (187, 98)
            );
            Console.WriteLine (q);
        
```

::: terminal
(Tom, 21) (Tom, (187, 98))
:::
::::

::: section
## Contraintes

-   Possibilité d'ajouter des contraintes sur les types génériques [La
    méthode CompareTo provient de IComparable]{.small}

``` lang-csharp
            public class OrderedPair<T> where T : IComparable 
            {
                private readonly T min, max;
                
                public OrderedPair (T a, T b)
                {
                    bool comp = a.CompareTo (b) > 0;
                    min = comp ? b : a;
                    max = comp ? a : b;
                }
                public override string ToString ()
                {
                    return String.Format ("({0}, {1})", min, max);
                }
            }
        
```
:::

::: section
## Méthode générique

-   Possibilité de définir une méthode générique [Déclaration des types
    génériques dans la signature]{.small}

``` lang-csharp
            public static void Main (string[] args)
            {
                Console.WriteLine (max (12, 7));
                Console.WriteLine (max ("sept", "douze"));
            }
            
            public static T max<T> (T a, T b) where T : IComparable
            {
                return a.CompareTo(b) > 0 ? a : b;
            }
        
```
:::

:::: section
## Valeur par défaut

-   Obtention de la valeur par défaut d'un type avec default

``` lang-csharp
            public class Container <T>
            {
                public readonly T data;
                public Container()
                {
                    data = default(T);
                }
            }

            public class Program
            {
                public static void Main (string[] args)
                {
                    Console.WriteLine (new Container <int>().data);
                    Console.WriteLine (new Container <bool>().data);
                }
            }
        
```

::: terminal
0 False
:::
::::

::: section
# Visibilité
:::

::: section
## Visibilité publique

-   Membre public accessible depuis partout [Aucune limitation à la
    visibilité d'un membre public]{.small}
-   Visibilité par défaut dans les interfaces [Ne contient que des
    méthodes publiques]{.small}

``` lang-csharp
            public class Foo
            {
                public int x = 12;
            }

            public class Program
            {
                public static void Main (string[] args)
                {
                    Foo foo = new Foo();
                    Console.WriteLine (foo.x); // Accès OK
                }
            }
        
```
:::

::: {.section .code}
## Quels sont les accès autorisés et ceux interdits ?

``` lang-csharp
            public class A
            {
                public int x;
                public void Method () {}
            }

            public class B
            {
                public A a = new A();
                public B (int x)
                {
                    Console.WriteLine (a.x);
                }
            }

            public class C
            {
                public static void Main (string[] args)
                {
                    B b = new B (42);
                    b.a.Method();
                }
            }
        
```
:::

::: section
## Visibilité privée

-   Membre privé accessible que depuis le corps de la classe [Peu
    importe l'instance, tant qu'on est dans le corps de la
    classe]{.small}
-   Erreur de compilation si tentative d'accès à un membre privé

``` lang-csharp
            public class Foo
            {
                private int x = 12;

                public void Method (Foo f)
                {
                    Console.WriteLine (f.x); // Accès OK
                }
            }

            public class Program
            {
                public static void Main (string[] args)
                {
                    Foo foo = new Foo();
                    Console.WriteLine (foo.x); // Accès pas OK
                }
            } 
        
```
:::

::: {.section .code}
## Quels sont les accès autorisés et ceux interdits ?

``` lang-csharp
            public class A
            {
                public int x;
                private void Method () {}
            }

            public class B
            {
                private A a = new A();
                public B (int x)
                {
                    Console.WriteLine (a.x);
                }
            }

            public class C
            {
                public static void Main (string[] args)
                {
                    B b = new B (42);
                    b.a.Method();
                }
            }
        
```
:::

::: section
## Visibilité protégée

-   Membre protégé public pour les sous-classes, privé ailleurs [Privé
    mais avec autorisation particulière pour les sous-classes]{.small}

``` lang-csharp
            public class Foo
            {
                protected int x = 12;
            }

            public class Bar : Foo
            {
                public Bar()
                {
                    x = 42; // Accès OK
                }
            }

            public class Program
            {
                public static void Main (string[] args)
                {
                    Bar bar = new Bar();
                    Console.WriteLine (bar.x); // Accès pas OK
                }
            }
        
```
:::

::: section
## Visibilité protégée

-   Membre protégé hérité accessible uniquement par this [Hérité dans la
    sous-classe, mais reste privé à la super-classe]{.small}

``` lang-csharp
            public class Foo
            {
                protected int x = 12;
            }

            public class Bar : Foo
            {
                public Bar()
                {
                    x = 42; // Accès OK (équivalent à this.x)
                }

                public void Method (Foo f)
                {
                    Console.WriteLine (f.x); // Accès pas OK
                }
            }
        
```
:::

::: {.section .code}
## Quels sont les accès autorisés et ceux interdits ?

``` lang-csharp
            public class A
            {
                protected int x;
                public void Method () {}
            }

            public class B
            {
                public A a = new A();
                public B (int x)
                {
                    Console.WriteLine (a.x);
                }
            }

            public class C
            {
                public static void Main (string[] args)
                {
                    B b = new B (42);
                    b.a.Method();
                }
            }
        
```
:::

::: section
## Visibilité interne

-   Membre accessible partout dans le même assembly [Moins large que
    visibilité publique]{.small}
-   Peut être combiné avec protected

``` lang-csharp
            namespace A
            {
                public class Foo
                {
                    internal int x = 12;
                }

                public class Program
                {
                    public static void Main (string[] args)
                    {
                        Foo foo = new Foo();
                        Console.WriteLine (foo.x); // Accès OK
                    }
                }
            }
        
```
:::

::: section
## Visibilité par défaut

-   Chaque type de membre possède une **visibilité par défaut** [Qui
    s'applique si on ne mentionne aucun modificateur]{.small}
-   Visibilité internal par défaut des **membres de premier niveau** [Ne
    peuvent d'ailleurs être que `public` ou `internal`]{.small}
-   Visibilité de **membres imbriqués** depend du contenant
    -   Membres d'une classe `private` par défaut
    -   Membres d'une interface `public` par défaut
:::

::: section
## Restriction de visibilité

-   Sous-classe pas plus accessible que super-classe [Même règle pour
    implémentation d'interfaces]{.small}
-   Variable d'instance pas plus accessible que son type [Pareil pour
    propriété, type retour/paramètre méthode]{.small}
:::

::: {.section .code}
## Quels sont les accès autorisés et ceux interdits ?

``` lang-csharp
            public class Program
            {
                private class A
                {
                    protected int x;
                    internal string y;
                }
                
                internal class B : A
                {
                    public A a = new A();
                    public B (int x)
                    {
                        Console.WriteLine (this.x);
                        Console.WriteLine (a.y);
                    }

                    public A Method()
                    {
                        return new A();
                    }
                }
            }
        
```
:::

::: section
## Bonnes pratiques

-   Toujours partir de la visibilité la moins grande
-   Quelques règles par défaut de visibilité
    -   Variable d'instance devrait être privée
    -   Constructeur devrait être public
    -   Méthode devrait être publique
-   Quelques cas particuliers envisageable
    -   Variable d'instance protégée en cas d'héritage
    -   Méthode privée pour la découpe en sous-problèmes
:::

::: section
## Portée

-   Attention à ne pas confondre visibilité et portée d'une variable
    -   Visibilité définit à partir d'où on peut accéder à une variable
    -   Portée définit où un nom de variable existe et peut être utilisé
-   Variable d'instance versus locale
    -   Variable d'instance définie dans tout le corps de la classe
    -   Variable locale dans tout le corps méthode à partir définition
:::

::: section
# Encapsulation
:::

::: section
## Encapsulation

-   L'encapsulation consiste à cacher les détails d'implémentation
    [Contrôle de l'accès à certains membres d'une classe]{.small}
-   Représentation interne cachée de l'extérieur [Un changement
    d'implémentation interne n'affecte pas les autres]{.small}
-   Manipulation de l'objet à travers des méthodes publiques
:::

::: {.section .code}
## Sans encapsulation

``` lang-csharp
            public class Vector
            {
                public double x, y;

                public Vector (double x, double y)
                {
                    this.x = x;
                    this.y = y;
                }
            }
            
            public class Program
            {
                public static void Main (string[] args)
                {
                    Vector u = new Vector (1, -1);
                    Console.WriteLine(
                        string.Format("({0}, {1})", u.x, u.y)
                    );
                }
            }
        
```
:::

::: {.section .code}
## Sans encapsulation - après changement

``` lang-csharp
            public class Vector
            {
                public double[] coords; // changement de représentation interne

                public Vector (double x, double y)
                {
                    coords = new double[] {x, y};
                }
            }
            
            public class Program
            {
                public static void Main (string[] args)
                {
                    Vector u = new Vector (1, -1);
                    Console.WriteLine(
                        string.Format("({0}, {1})", u.x, u.y) // code client cassé !
                    ); 
                }
            }
        
```
:::

::: {.section .code}
## Avec encapsulation

``` lang-csharp
            public class Vector
            {
                private double x, y;

                public Vector (double x, double y)
                {
                    this.x = x;
                    this.y = y;
                }

                public double X { get { return x; } }
                public double Y { get { return y; } }
            }
            
            public class Program
            {
                public static void Main (string[] args)
                {
                    Vector u = new Vector (1, -1);
                    Console.WriteLine(
                        string.Format("({0}, {1})", u.X, u.Y)
                    );
                }
            }
        
```
:::

::: {.section .code}
## Avec encapsulation - après changement

``` lang-csharp
            public class Vector
            {
                public double[] coords; // changement de représentation interne

                public Vector (double x, double y)
                {
                    coords = new double[] {x, y};
                }

                public double X { get { return coords[0]; } }
                public double Y { get { return coords[1]; } }
            }
            
            public class Program
            {
                public static void Main (string[] args)
                {
                    Vector u = new Vector (1, -1);
                    Console.WriteLine(
                        string.Format("({0}, {1})", u.X, u.Y) // code client préservé !
                    );
                }
            }
        
```
:::

::: section
## Bénéfice de l'encapsulation

-   Contrôle de l'accès aux variables d'instance d'une classe [Peuvent
    être accessibles en lecture et/ou écriture]{.small}
-   Contrôle des valeurs stockées dans les variables d'instance [La
    classe est la seule à avoir accès à sa structure interne]{.small}
-   Indépendance par rapport à l'utilisateur [La classe est libre de
    modifier son implémentation]{.small}
:::

::: section
## Interface publique

-   Définition de l'interface publique d'un objet [Seule façon
    d'interagir avec l'objet de l'extérieur]{.small}
-   L'utilisateur fait abstraction de l'implémentation pour l'utiliser
-   Garantie du résultat de l'exécution des méthodes publiques [Ne doit
    pas être affecté par des changements d'implémentation]{.small}
-   L'interface publique doit être la plus stable possible
:::

::: section
## Encapsulation et héritage

-   La visibilité `protected` est un défaut d\'encapsulation [`private`
    est préferable à `protected`]{.small}
:::

::: section
## Soyez discrets !

\"What you hide, you can change\"

Do not break encapsulation!
:::

::: section
# Immuabilité
:::

::: {.section .code}
## Problème avec les objets mutables

``` lang-csharp
            class Program
            {
                static int sum(List<int> L)
                {
                    for(int i = L.Count - 1; i > 0; i--)
                    {
                        L[i - 1] = L[i - 1] + L[i];
                    }
                    return L[0];
                }

                static void Main(string[] args)
                {
                    List<int> list = new List<int>() {1, 2, 3};
                    Console.WriteLine("Sum = {0}", sum(list)); // 6 Ok
                    Console.WriteLine(
                        "List = [{0}]",
                        String.Join(", ", list)  // [6, 5, 3] WTF!!
                    );
                }
            }
        
```
:::

::: section
## Objet immuable

-   Un objet est immuable si son état ne peut être changé [Après avoir
    été initialisé par le constructeur]{.small}
-   Pouvoir partager une référence vers un objet de manière sure [Sans
    risquer de voir l'état de l'objet modifié]{.small}
-   Copies de l'objet pas nécessaires [Économie de la quantité de
    mémoire utilisée]{.small}
:::

::: {.section .code}
## Les instances de la classe suivante sont-elles immuables?

``` lang-csharp
            public class Mysterious
            {
                public readonly int secret;
                public Mysterious (int data)
                {
                    secret = data;
                }
            }
        
```
:::

::: {.section .code}
## Les instances de la classe suivante sont-elles immuables?

``` lang-csharp
            public class Mysterious
            {
                public readonly int secret;
                public Mysterious (int data)
                {
                    secret = data;
                }
            }
        
```

-   Variable d'instance publique, mais constante [Sa valeur ne pourra
    donc pas être changée, état préservé]{.small}
:::

::: {.section .code}
## Les instances de la classe suivante sont-elles immuables?

``` lang-csharp
            public class SuperMysterious
            {
                public readonly int[] secrets;
                public SuperMysterious (int x, int y)
                {
                    secrets = new int[] {x, y};
                }
            }
        
```
:::

::: {.section .code}
## Les instances de la classe suivante sont-elles immuables?

``` lang-csharp
            public class SuperMysterious
            {
                public readonly int[] secrets;
                public SuperMysterious (int x, int y)
                {
                    secrets = new int[] {x, y};
                }
            }
        
```

-   Variable d'instance publique, mais constante [La référence est
    constante mais l\'état de l\'objet référencé peut changer !]{.small}
-   Attention lorsque les variables d'instance sont des objets
:::

::: {.section .code}
## Les instances de la classe suivante sont-elles immuables?

``` lang-csharp
            public class MysteriousCeption
            {
                ppublic readonly Mysterious secret;
                public MysteriousCeption (int x)
                {
                    secret = new Mysterious (x);
                }
            }
        
```
:::

::: {.section .code}
## Les instances de la classe suivante sont-elles immuables?

``` lang-csharp
            public class MysteriousCeption
            {
                ppublic readonly Mysterious secret;
                public MysteriousCeption (int x)
                {
                    secret = new Mysterious (x);
                }
            }
        
```

-   Variable d'instance publique, mais constante et immuable [Sa valeur
    ne pourra donc pas être changée, ni son état !]{.small}
:::

::: section
## Critères à vérifier

-   Variable d'instance privée
-   Variable d'instance publique et constante [Pour autant que le type
    soit un primitif ou d'objet immuable]{.small}
:::

:::: section
## Référence passée au constructeur

-   Modification d'un objet passé en paramètre au constructeur
    [Altération de l'état si l'objet reçu par le constructeur en fait
    partie]{.small}

``` lang-csharp
            public class Vector
            {
                public double[] coords;

                public Vector (double[] coords)
                {
                    this.coords = coords;
                }

                public double[] Coords { get { return coords; } }

                public override string ToString() {
                    return String.Format ("({0}, {1})", coords[0], coords[1]);
                }
            }

            public class Program
            {
                static void Main(string[] args)
                {
                    double[] data = {1, -1};
                    Vector u = new Vector (data);
                    Console.WriteLine (u);

                    data[0] = 0;
                    Console.WriteLine (u);
                } 
            }
        
```

::: terminal
(1, -1) (0, -1)
:::
::::

:::: section
## Référence passée au constructeur

-   Le constructeur doit faire une copie de l'objet reçu [Pas nécessaire
    si l'objet est immuable]{.small}

``` lang-csharp
            public class Vector
            {
                public double[] coords;

                public Vector (double[] coords)
                {
                    this.coords = new double[coords.Length];
                    Array.Copy(coords, this.coords, coords.Length);
                }

                public double[] Coords { get { return coords; } }

                public override string ToString() {
                    return String.Format ("({0}, {1})", coords[0], coords[1]);
                }
            }

            public class Program
            {
                static void Main(string[] args)
                {
                    double[] data = {1, -1};
                    Vector u = new Vector (data);
                    Console.WriteLine (u);

                    data[0] = 0;
                    Console.WriteLine (u);
                } 
            }
        
```

::: terminal
(1, -1) (1, -1)
:::
::::

:::: section
## Renvoi d'une référence

-   Modification d'un objet renvoyé par une méthode [Altération de
    l'état si l'objet renvoyé en fait partie]{.small}

``` lang-csharp
            public class Vector
            {
                public double[] coords;

                public Vector (double[] coords)
                {
                    this.coords = new double[coords.Length];
                    Array.Copy(coords, this.coords, coords.Length);
                }

                public double[] Coords { get { return coords; } }

                public override string ToString() {
                    return String.Format ("({0}, {1})", coords[0], coords[1]);
                }
            }

            public class Program
            {
                static void Main(string[] args)
                {
                    Vector u = new Vector (new double[] {1, -1});
                    Console.WriteLine (u);

                    double[] data = u.Coords;
                    data [0] = 0;
                    Console.WriteLine (u);
                } 
            }
        
```

::: terminal
(1, -1) (0, -1)
:::
::::

:::: section
## Renvoi d'une référence

-   La méthode doit renvoyer une copie de l'objet à renvoyer [Pas
    nécessaire si l'objet est immuable]{.small}

``` lang-csharp
            public class Vector
            {
                public double[] coords;

                public Vector (double[] coords)
                {
                    this.coords = new double[coords.Length];
                    Array.Copy(coords, this.coords, coords.Length);
                }

                public double[] Coords
                { 
                    get
                    { 
                        double[] coords = new double[this.coords.Length];
                        Array.Copy (this.coords, coords, this.coords.Length);
                        return coords;
                    }
                }

                public override string ToString() {
                    return String.Format ("({0}, {1})", coords[0], coords[1]);
                }
            }

            public class Program
            {
                static void Main(string[] args)
                {
                    Vector u = new Vector (new double[] {1, -1});
                    Console.WriteLine (u);

                    double[] data = u.Coords;
                    data [0] = 0;
                    Console.WriteLine (u);
                } 
            }
        
```

::: terminal
(1, -1) (1, -1)
:::
::::

::: section
## Critères à vérifier

-   Copie de tous les objets mutables reçus en paramètres [Seulement
    pour ceux qui font partie de l'état de l'objet]{.small}
-   Copie des objets mutables dont une référence est renvoyée [Seulement
    s'ils font partie de l'état de l'objet]{.small}
-   Aucune copie nécessaire pour les objets immuables [Leur état ne
    pourra jamais être modifié]{.small}
:::

::: section
## Intérêts des objets immuables

-   Partage de références sans aucun risque [Puisque personne ne pourra
    altérer l'état de l'objet]{.small}
-   Utilisation d'un même objet partagé entre plusieurs threads [Aucun
    souci de cohérence de l'état de l'objet, vu par les threads]{.small}
-   Pas besoin d'en faire des copies [Utilisation efficace de la
    mémoire]{.small}
:::
