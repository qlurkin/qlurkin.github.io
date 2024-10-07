---
lang: en
title: Cours 3 - Polymorphisme, interface et classe abstraite
viewport: width=device-width, initial-scale=1.0
---

## Point dans le plan

- **Point** dans le plan en coordonnées entières [Accesseurs pour les
  coordonnées `x` et `y` et méthode `ToString`]{.small}

```cs
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

## Point coloré

- **Extension** de la classe `Point` [Ajout d'une variable d'instance
  pour stocker la couleur]{.small}
- **Réutilisation** du code de la classe mère avec `base`

```cs
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

## Hiérarchie de classe

- Établissement d'une **hiérarchie de classe** [Plusieurs classes
  liées par des relations d'héritage]{.small}
- Une classe peut avoir des **ancêtres et/ou des enfants**

## Méthode héritée

- Méthodes publiques de la super-classe sont **héritées** [Comme si
  elles avaient été définies dans la sous-classe]{.small}
- Ajout d'une méthode **Translate** dans la classe `Point` [Création
  et renvoi d'un nouvel objet `Point`]{.small}

```cs
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

## Méthode héritée

- On peut **translater** un point coloré [Mais le résultat produit
  sera un simple point\...]{.small}

```cs
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

```terminal
(1, 2) [color=Red]
(2, 2)
```

## Redéfinition de méthode

- **Redéfinition** d'une méthode [Remplacement de la version de la
  super-classe]{.small}
- **Maintien de la couleur** lors d'une translation [Création d'un
  nouvel objet `ColouredPoint`]{.small}

```cs
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

## Autorisation de redéfinition

- La super-classe doit **autoriser la redéfinition** de ses méthodes
  [Avec visibilité ou modificateurs (`virtual` en C#, `final` en
  Java\...)]{.small}
- La méthode redéfinie doit garder (quasi) la **même signature** [La
  visibilité peut être éventuellement modifiée]{.small}

```cs
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

# Polymorphisme

## Représentation en mémoire

- Création de deux objets distincts de **différents types**
  [Références stockées dans des variables de différents types]{.small}
- **Deux instances distinctes** sont créées en mémoire [Un objet de
  type Point et un de type ColouredPoint]{.small}

```cs
public class Program
{
    public static void Main(string[] args)
    {
        Point p = new Point(3, 5);

        ColouredPoint cp = new ColouredPoint(1, 2, Color.Red);
    }
}
```

## Représentation en mémoire

<figure id="point_instance">

</figure>

## Type d'une variable

- Une variable peut avoir **plusieurs types** [Une instance d'une
  sous-classe est aussi une de la super-classe]{.small}
- Principale distinction entre **deux types**
  - Type de la variable (lors de sa déclaration)
  - Type de l'objet référencé par la variable

```cs
ColouredPoint cp = new ColouredPoint(1, 2, Color.Red);
```

## Type d'une variable

- Une variable d'un type peut contenir un **objet d'un autre type**
  [Pour autant que les types soient compatibles]{.small}
- **Stockage** d'un objet `ColouredPoint` dans une variable `Point`
  [Car `ColouredPoint` est une sous-classe de `Point`]{.small}

```cs
Point p = new ColouredPoint(1, 2, Color.Red);
```

## Polymorphisme

- Un objet peut être **vu avec différents types** [En fonction du type
  de la variable utilisée pour le référencer]{.small}
- Le type de la variable définit les **méthodes utilisables** [Des
  méthodes existantes peuvent donc être indisponibles]{.small}
- Un même objet peut **\"changer de type\"** durant l'exécution [Le
  type de l'objet ne changera jamais, seulement celui perçu]{.small}

## Polymorphisme

- Tester le type de l'**objet référencé** à partir d'une variable
  [Test de la relation *is-a*]{.small}
- Opérateur de test de la **compatibilité de type** [Variable contient
  une référence vers un objet d'un type donné]{.small}

```cs
Console.WriteLine(( p is Point)+" / "+( p is ColouredPoint));
Console.WriteLine((cp is Point)+" / "+(cp is ColouredPoint));
```

```terminal
True / False
True / True
```

## Conversion implicite

- Une référence peut être **convertie implicitement** [D'un objet qui
  est d'un sous-type de celui de la variable]{.small}
- Conversion par **affectation** directe ou par appel de méthode

```cs
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

## Conversion explicite

- Une référence peut être **convertie explicitement** [Pour autant que
  le type de l'objet soit compatible]{.small}
- Conversion à l'aide de l'**opérateur de conversion**

```cs
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

## Compatibilité versus type

- Test du **type réel** d'un objet [L'objet est une instance de quelle
  classe ?]{.small}
- Test de **compatibilité du type** d'un objet [Peut-on convertir
  implicitement l'objet vers un type ?]{.small}

```cs
Console.WriteLine((cp is Point)+" / "+(cp is ColouredPoint));

Console.WriteLine(cp.GetType() == typeof(Point));
Console.WriteLine(cp.GetType() == typeof(ColouredPoint));
```

```terminal
True / True False True
```

## Conversion explicite

- **Vérification de la compatibilité** avant conversion explicite
  [Sans quoi il y a risque d'une erreur de conversion]{.small}

```cs
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

## Type statique versus dynamique

- **Type statique** lors de la **déclaration de la variable**
  - Déterminé une fois pour toute à la déclaration
  - Limite les références qui pourront être stockées
  - Uniquement pour les langages typés statiquement
- **Type dynamique** de l'**objet référencé par la variable** - Déterminé lors de l'exécution - Peut changer en cours d'exécution

## Type compatible

- Deux types **compatibles** sont liés par une relation de filiation
- Attention, la compatibilité est **unidirectionnelle**
- Conversions si **type dynamique de `b` compatible avec `A`** - Implicite : A a = b; - Explicite : A a = (A) b;

## Résolution des appels de méthode

- Le type statique détermine les **méthodes accessibles** [Les seules
  méthodes accessibles sont celles du type statique]{.small}
- La **méthode effectivement appelée** dépend du type dynamique [En
  cas de redéfinition, la méthode de la sous-classe est
  appelée]{.small}
- Résolution en **deux étapes** - Méthodes accessibles vérifiées à la compilation - Méthode appelée décidée à l'exécution

## Résolution des appels de méthode

- Méthode de la sous-classe **non accessible** [Car le type statique
  est celui de la super-classe]{.small}

```cs
Point p = new ColouredPoint (7, 5, Color.Red);

Console.WriteLine(p.Colour);
```

```terminal
Program.cs (32, 25) : error CS1061 : Type 'Cours4.Point' does not
contain a definition for 'Colour' and no extension method 'Colour'
of type 'Cours4.Point' could be found. Are you missing an assembly
reference ?
```

## Résolution des appels de méthode

- Méthode redéfinie dans sous-classe **appelée** [Même si type
  statique de la variable est de la super-classe]{.small}

```cs
Point p = new ColouredPoint(7, 5, Color.Red);

Console.WriteLine(p.ToString());
```

```terminal
(7, 5) [color=Red]
```

## Classe `Object`

- La classe `Object` est la super-classe de tout le monde [Racine de
  toutes les hiérarchies de classe]{.small}
- Contient plusieurs **méthodes redéfinissables** communes à tous

  - Représentation d'un objet sous forme de chaine de caractères

    ```cs
    public virtual string ToString()
    ```

  - Test de l'égalité de deux objets

    ```cs
    public virtual bool Equals (object obj)
    ```

  - Obtention d'un code de hachage pour l'objet

    ```cs
    public virtual int GetHashCode()
    ```

## Classe `Object`

- Classe permettant de représenter des paires d'entiers [Redéfinition
  des méthodes Equals et ToString]{.small}

```cs
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

## Surcharge de méthode

- Plusieurs méthodes peuvent avoir le **même nom** [Pour autant que
  les types de la liste de paramètres différent]{.small}
- Simule les **paramètres optionnels** (de Python, par exemple)

```cs
public static void Kill(string target, Weapon weapon)
{
    // ...
}

public static void Kill(string target)
{
    Kill(target, new CrossBow());
}
```

## Résolution de la surcharge

- Étapes de la résolution de la **surcharge de méthodes**
  1.  Construction liste des types des paramètres réels
  2.  Identification des méthodes accessibles avec le type statique
  3.  Recherche d'une méthode avec la même liste de types
  4.  Recherche des méthodes avec paramètres compatibles
  5.  Choix de la méthode la plus spécifique
- Avec la signature candidate, il faut choisir la **version à
  exécuter** [On reprend la règle de résolution liée à la
  redéfinition]{.small}

# Interface et classe abstraite

## Interface

- Une **interface** ne contient que des entêtes de méthode [Visibilité
  publique forcée des méthodes]{.small}
- Permet de définir un **contrat** avec un utilisateur [Définition
  d'un ensemble de méthodes qui devront être présentes]{.small}

```cs
public interface Complex
{
    double Real();
    double Imag();
    double Abs();
    double Arg();
}
```

## Relation d'implémentation

- Une classe peut **implémenter** une interface [Doit fournir un corps
  pour toutes les méthodes de l'interface]{.small}

```cs
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

## Polymorphisme avec interface

- Plusieurs classes peuvent implémenter la même interface [Permet du
  polymorphisme comme avec l'héritage]{.small}

```cs
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

## Polymorphisme avec interface

- **Somme de nombres complexes** facilitée par polymorphisme [Il
  suffit de passer par les méthodes de l'interface]{.small}

```cs
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

```terminal
1 + 2i
```

## Implémentation multiple

- Une classe peut **implémenter plusieurs interfaces** [Ce qui lève la
  limitation des langages sans héritage multiple]{.small}
- La **relation implements** est également une relation _is-a_

## Classe abstraite

- **Intermédiaire** entre l'interface et la classe concrète [Certaines
  méthodes communes peuvent être implémentées]{.small}
- Une classe abstraite n'est **pas instanciable**

```cs
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

## Classe abstraite

- Deux **modificateurs** de méthode
  - Méthode sans corps à redéfinir dans les sous-classes
    (`abstract`)
  - Méthode avec corps mais redéfinissable (`virtual`)

```cs
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

## Classe abstraite

- Une classe abstraite est **étendue** en classe concrète [Il faut
  définir le corps des méthodes abstraites]{.small}

```cs
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

## Classe abstraite

- On peut redéfinir une méthode définie dans la classe abstraite [Il
  s'agit d'une simple redéfinition de méthode]{.small}

```cs
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

## Hiérarchie de classe

- Une interface est une **classe abstraite pure** [Et ne contenant pas
  de constructeur, ni de variables d'instance]{.small}
- Une sous-classe d'une classe abstraite peut être **abstraite** [Si
  elle ne fournit pas de corps à toutes les méthodes
  abstraites]{.small}
- Permet d'**éviter** de la duplication de code [En rassemblant les
  membres communs dans la super-classe]{.small}
