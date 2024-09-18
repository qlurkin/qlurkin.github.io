---
title: PO3T - Cours 2
subtitle: Visibilité, Encapsulation et Immuabilité
type: deck
---

## Visibilité publique

- Membre **public** accessible depuis partout [Aucune limitation à la
  visibilité d'un membre public]{.small}

```cs
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

## Quels sont les accès autorisés et ceux interdits ? {.code}

```cs
B b = new B (42);
b.a.Method();

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
```

## Visibilité privée

- Membre **privé** accessible que depuis le **corps de la classe** [Peu
  importe l'instance, tant qu'on est dans le corps de la
  classe]{.small}
- **Erreur de compilation** si tentative d'accès à un membre privé

```cs
Foo foo = new Foo();
Console.WriteLine (foo.x); // Accès pas OK

public class Foo
{
    private int x = 12;

    public void Method (Foo f)
    {
        Console.WriteLine (f.x); // Accès OK
    }
}
```

## Quels sont les accès autorisés et ceux interdits ?{.code}

```cs
B b = new B (42);
b.a.Method();

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
```

## Visibilité interne

- Membre **interne** accessible partout dans le même assembly [Moins large que
  visibilité publique]{.small}

## Visibilité par défaut

- Chaque type de membre possède une **visibilité par défaut** [Qui
  s'applique si on ne mentionne aucun modificateur]{.small}
- Visibilité internal par défaut des **membres de premier niveau** [Ne
  peuvent d'ailleurs être que `public` ou `internal`]{.small}
- Visibilité de **membres imbriqués** dépend du contenant
  - Membres d'une classe `private` par défaut
  - Membres d'une interface `public` par défaut _(voir cours 4)_

## Bonnes pratiques

- Toujours partir de la visibilité la **moins grande**
- Quelques règles par défaut de visibilité
  - **Variable** d'instance devrait être **privée**
  - **Constructeur** devrait être **publique**
  - **Méthode** devrait être **publique**
- Cas particulier envisageable
  - Méthode privée pour la découpe en **sous-problèmes**

## Portée

- Attention à ne pas confondre **visibilité** et **portée** d'une variable
  - **Visibilité** définit à partir d'où on peut **accéder** à une variable
  - **Portée** définit où un nom de variable **existe** et peut être utilisé
- Variable d'instance versus locale
  - **Variable d'instance** définie dans tout le corps de la **classe**
  - **Variable locale** dans tout le corps de la **méthode** à partir de sa définition

## Encapsulation

- L'encapsulation consiste à cacher les **détails d'implémentation**
  [Contrôle de l'accès à certains membres d'une classe]{.small}
- Représentation **interne cachée** de l'extérieur [Un changement
  d'implémentation interne n'affecte pas les autres]{.small}
- Manipulation de l'objet à travers des **méthodes publiques**

## Sans encapsulation {.code}

```cs
Vector u = new Vector (1, -1);
Console.WriteLine(string.Format("({0}, {1})", u.x, u.y));

public class Vector
{
    public double x, y;

    public Vector (double x, double y)
    {
        this.x = x;
        this.y = y;
    }
}
```

## Sans encapsulation - après changement {.code}

```cs
Vector u = new Vector (1, -1);
Console.WriteLine(string.Format("({0}, {1})", u.x, u.y)); // code client cassé !

public class Vector
{
    public double[] coords; // changement de représentation interne

    public Vector (double x, double y)
    {
        coords = new double[] {x, y};
    }
}
```

## Avec encapsulation {.code}

```cs
Vector u = new Vector (1, -1);
Console.WriteLine(string.Format("({0}, {1})", u.X, u.Y));

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
```

## Avec encapsulation - après changement {.code}

```cs
Vector u = new Vector (1, -1);
Console.WriteLine(string.Format("({0}, {1})", u.X, u.Y)); // code client préservé !

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
```

## Bénéfice de l'encapsulation

- Contrôle de l'**accès** aux variables d'instance d'une classe [Peuvent
  être accessibles en lecture et/ou écriture]{.small}
- Contrôle des **valeurs stockées** dans les variables d'instance [La
  classe est la seule à avoir accès à sa structure interne]{.small}
- **Indépendance** par rapport à l'utilisateur [La classe est libre de
  modifier son implémentation]{.small}

## Interface publique

- Définition de l'**interface publique** d'un objet [Seule façon
  d'interagir avec l'objet de l'extérieur]{.small}
- L'utilisateur fait **abstraction** de l'implémentation pour l'utiliser
- Garantie du **résultat** de l'exécution des méthodes publiques [Ne doit
  pas être affecté par des changements d'implémentation]{.small}
- L'interface publique doit être la plus **stable** possible

## Soyez discrets !

\"What you hide, you can change\"

Do not break encapsulation!

## Problème avec les objets mutables {.code}

```cs
int sum(List<int> L)
{
    for(int i = L.Count - 1; i > 0; i--)
    {
        L[i - 1] = L[i - 1] + L[i];
    }
    return L[0];
}


List<int> list = new List<int>() {1, 2, 3};
Console.WriteLine("Sum = {0}", sum(list)); // 6 Ok
Console.WriteLine("List = [{0}]", String.Join(", ", list));
```

## Objet immuable

- Un objet est immuable si son **état** ne peut être changé [Après avoir
  été initialisé par le constructeur]{.small}
- Pouvoir partager une référence vers un objet de manière **sure** [Sans
  risquer de voir l'état de l'objet modifié]{.small}
- **Copies** de l'objet pas nécessaires [Économie de la quantité de
  mémoire utilisée]{.small}

## Les instances de la classe suivante sont-elles immuables?{.code}

```cs
public class Mysterious
{
    public readonly int secret;
    public Mysterious (int data)
    {
        secret = data;
    }
}
```

## Les instances de la classe suivante sont-elles immuables?{.code}

```cs
public class Mysterious
{
    public readonly int secret;
    public Mysterious (int data)
    {
        secret = data;
    }
}
```

- Variable d'instance publique, mais constante [Sa valeur ne pourra
  donc pas être changée, état préservé]{.small}

## Les instances de la classe suivante sont-elles immuables?

```cs
public class SuperMysterious
{
    public readonly int[] secrets;
    public SuperMysterious (int x, int y)
    {
        secrets = new int[] {x, y};
    }
}
```

## Les instances de la classe suivante sont-elles immuables?{.code}

```cs
public class SuperMysterious
{
    public readonly int[] secrets;
    public SuperMysterious (int x, int y)
    {
        secrets = new int[] {x, y};
    }
}
```

- Variable d'instance publique, mais constante [La référence est
  constante mais l\'état de l\'objet référencé peut changer !]{.small}
- Attention lorsque les variables d'instance sont des objets

## Les instances de la classe suivante sont-elles immuables?{.code}

```cs
public class MysteriousCeption
{
    ppublic readonly Mysterious secret;
    public MysteriousCeption (int x)
    {
        secret = new Mysterious (x);
    }
}
```

## Les instances de la classe suivante sont-elles immuables?{.code}

```cs
public class MysteriousCeption
{
    ppublic readonly Mysterious secret;
    public MysteriousCeption (int x)
    {
        secret = new Mysterious (x);
    }
}
```

- Variable d'instance publique, mais constante et immuable [Sa valeur
  ne pourra donc pas être changée, ni son état !]{.small}

## Critères à vérifier

- Variable d'instance privée
- Variable d'instance publique et constante [Pour autant que le type
  soit un primitif ou d'objet immuable]{.small}

## Référence passée au constructeur

- Modification d'un objet passé en paramètre au constructeur
  [Altération de l'état si l'objet reçu par le constructeur en fait
  partie]{.small}

```cs
double[] data = {1, -1};
Vector u = new Vector (data);
Console.WriteLine (u);

data[0] = 0;
Console.WriteLine (u);

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
```

## Référence passée au constructeur

- Le constructeur doit faire une copie de l'objet reçu [Pas nécessaire
  si l'objet est immuable]{.small}

```cs
double[] data = {1, -1};
Vector u = new Vector (data);
Console.WriteLine (u);

data[0] = 0;
Console.WriteLine (u);

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
```

```terminal
(1, -1) (1, -1)
```

## Renvoi d'une référence

- Modification d'un objet renvoyé par une méthode [Altération de
  l'état si l'objet renvoyé en fait partie]{.small}

```cs
Vector u = new Vector (new double[] {1, -1});
Console.WriteLine (u);

double[] data = u.Coords;
data [0] = 0;
Console.WriteLine (u);

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
```

```terminal
(1, -1) (0, -1)
```

## Renvoi d'une référence

- La méthode doit renvoyer une copie de l'objet à renvoyer [Pas
  nécessaire si l'objet est immuable]{.small}

```cs
Vector u = new Vector (new double[] {1, -1});
Console.WriteLine (u);

double[] data = u.Coords;
data [0] = 0;
Console.WriteLine (u);

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
```

```terminal
(1, -1) (1, -1)
```

## Critères à vérifier

- **Copie** de tous les objets **mutables** reçus en paramètres [Seulement
  pour ceux qui font partie de l'état de l'objet]{.small}
- **Copie** des objets **mutables** dont une référence est renvoyée [Seulement
  s'ils font partie de l'état de l'objet]{.small}
- **Aucune copie** nécessaire pour les objets **immuables** [Leur état ne
  pourra jamais être modifié]{.small}

## Intérêts des objets immuables

- Partage de références **sans aucun risque** [Puisque personne ne pourra
  altérer l'état de l'objet]{.small}
- Utilisation d'un même **objet partagé** entre plusieurs threads [Aucun
  souci de cohérence de l'état de l'objet, vu par les threads]{.small}
- **Pas besoin d'en faire des copies** [Utilisation efficace de la
  mémoire]{.small}
