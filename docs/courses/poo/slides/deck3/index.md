---
title: PO3T - Cours 3
subtitle: Héritage et polymorphisme
type: deck
---

## Héritage

- Définir une classe **à partir** d\'une autre [Sous-ensemble des
  membres communs entre les deux classes]{.small}
- Possibilité d\'exploiter le **polymorphisme** [Un même objet peut
  prendre plusieurs formes selon le contexte]{.small}
- Nouveau niveau de **visibilité** pour les membres d\'une classe
  [Membres privés à une classe, mais hérités auprès des
  sous-classes]{.small}

## Représentation d\'une paire{.code}

```cs
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

## Représentation d\'une paire

- Une paire est composée de deux nombres réels [On renseigne les deux
  nombres au moment de la construction]{.small}
- La méthode `IsOrdered()` teste si la paire est **ordonnée**

```cs
Pair p1 = new Pair(12, 7);
Pair p2 = new Pair(-2, 0);

Console.WriteLine(string.Format("{0}: {1}", p1, p1.IsOrdered()));
Console.WriteLine(string.Format("{0}: {1}", p2, p2.IsOrdered()));

```

```terminal
(12, 7) : False
(-2, 0) : True
```

## Paire ordonnée

- La classe `OrderedPair` représente une **paire ordonnée** [Le premier
  élément de la paire doit être ≤ au second]{.small}
- **Deux manières** de définir une telle classe
  - Imposer la contrainte sur les paramètres du constructeur
  - Laisser le constructeur réordonner les éléments de la paire
- Faire confiance à l\'utilisateur ou avoir un **code robuste** [Code
  interne de confiance, mais code public doit être robuste]{.small}

## Paire ordonnée{.code}

```cs
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

## Paire ordonnée

- Une paire ordonnée ré-ordonne les nombres réels [Au moment
  d\'appeler le constructeur de la classe]{.small}
- La méthode `IsOrdered()` renvoie toujours `True`

```cs
Pair o1 = new OrderedPair(12, 7);
Pair o2 = new OrderedPair(-2, 0);

Console.WriteLine(string.Format("{0}: {1}", o1, o1.IsOrdered()));
Console.WriteLine(string.Format("{0}: {1}", o2, o2.IsOrdered()));
```

```terminal
(7, 12) : True
(-2, 0) : True
```

## Extension d\'une classe

- Une **paire ordonnée** est en fait une paire
  - Avec des spécificités pour les paires ordonnées
  - `OrderedPair` vu comme une spécialisation de la classe `Pair`
- On veut **hériter** une partie du comportement de la classe `Pair`
  [Éviter de la duplication de code, réutiliser l\'existant]{.small}
- On veut **ajouter** des comportements spécifiques à `OrderedPair`
  [Pouvoir différencier la nouvelle classe]{.small}

## Extension d\'une classe

- Une sous-classe **étend** une super-classe
  - La sous-classe **hérite** d\'une série d\'éléments de la
    super-classe
  - Il peut y avoir du code **spécifique** à la sous-classe

## Extension d\'une classe

- Une sous-classe (classe dérivée, classe enfant) **étend** une autre
  [la super-classe (classe étendue, classe parent)]{.small}
- **Constructeur d\'une sous-classe** appelle celui de la classe
  parent [Construire la super-classe **avant** la sous-classe !]{.small}

```cs
public class OrderedPair : Pair
{
  public OrderedPair(double a, double b) :
  base(a <= b ? a : b, a <= b ? b : a)
  {

  }
}
```

## Extension d\'une classe

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Pair {
  - x: double
  - y: double
  + IsOrdered(): bool
  + ToString(): string
}

class OrderedPair

Pair <|-- OrderedPair
```

## Et en Python\...

- Signaler la **classe étendue** entre parenthèses
- Appel du **constructeur de la super-classe** avec `super()` [Appel
  explicite, il faut écrire `__init__()`]{.small}

```python
class OrderedPair(Pair):
  def __init__(self, x, y):
    super().__init__ (x if x <= y else y, y if x <= y else x)
```

## Représentation d\'une personne

- Une personne a un nom et une date de naissance [Le prénom et le nom
  sont ici stockés ensemble]{.small}

```cs
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

## Représentation d\'une personne

- Création de **deux objets** dans le but de créer une personne
  [Est-ce une agrégation ou une composition ?]{.small}

```cs
DateTime birthday = new DateTime(1982, 8, 24);
Person lur = new Person("Q. Lurkin", birthday);
```

## Représentation d\'un employé

- Un **employé** est une personne avec un salaire [La classe
  `Employee` étend la classe `Person`]{.small}
- Ajout d\'une **variable et méthode d\'instance** dans la sous-classe

```cs
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

```cs
Employee lur = new Employee(
  "Q. Lurkin",
  new DateTime (1982, 8, 24),
  6000
);
```

## Représentation d\'un employé

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Person {
  - name: string
  - birthday: datetime
  + ToString(): string
}

class Employee {
  - salary: double
  + GetSalary(): double
}

Person <|-- Employee
```

## Constructeur d\'une sous-classe

- Deux missions pour le **constructeur** d\'une sous-classe
  - **Construction** de la super-classe
  - **Initialisation** de la sous-classe
- Utilisation du mot réservé `base` après l\'entête du constructeur
  [Invocation du constructeur de la super-classe]{.small}

```cs
public Employee (string name, DateTime birthday, double salary) :
base (name , birthday)
{
  this.salary = salary;
}
```

## Accès à la super-classe

- Accès **restreint** aux variables d\'instance de la super-classe
  [Variables privées pas accessibles dans la sous-classe]{.small}

```cs
public Employee (string name, DateTime birthday, double salary) :
base (name , birthday)
{
  this.name = name;
  this.salary = salary;
}
```

```terminal
Employees.cs (29 ,18) : error CS0122 : 'Cours3.Person.name' is
inaccessible due to its protection level
```

## Visibilité protégée

- Membre protégé public **pour les sous-classes**, privé ailleurs [Privé
  mais avec autorisation particulière pour les sous-classes]{.small}

```cs
Bar bar = new Bar();
Console.WriteLine (bar.x); // Accès pas OK

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
```

## Visibilité protégée

- Membre protégé hérité accessible **uniquement** par `this` [Hérité dans la
  sous-classe, mais reste privé à la super-classe]{.small}

```cs
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

## Encapsulation et héritage

- La visibilité `protected` est un **défaut d\'encapsulation** [`private`
  est préferable à `protected`]{.small}

## Redéfinition de méthode

- Une sous-classe peut **redéfinir** une méthode héritée
- Quel `nom` est affiché ? \"Q. Lurkin\" ou \"Son Goku\"

```cs
Employee lur = new Employee(
  "Q. Lurkin",
  new DateTime (1982, 8, 24),
  6000
);
Console.WriteLine(lur);

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
      return "Son Goku";
  }
}
```

## Redéfinition de méthode

- Permet de faire une spécialisation dans la sous-classe [Peut
  repartir du comportement de la super-classe avec `base`]{.small}
- Le mot réservé `override` indique une redéfinition
- La méthode de la super-classe doit être redéfinissable (`virtual`)
  [Les redéfinitions sont `virtual` par défaut]{.small}

```cs
public class Employee : Person
{
  public override string ToString()
  {
      return base.ToString() + String.Format("\nSalaire : {0}", salary);
  }
}

```

## Masquage de méthode

- Méthode de même entête **masque** version de super-classe [Si elle
  n\'est pas marquée comme une redéfinition]{.small}
- Quel `nom` est affiché ? \"Q. Lurkin\" ou \"Son Goku\"

```cs
Employee lur = new Employee(
  "Q. Lurkin",
  new DateTime (1982, 8, 24),
  6000
);
Console.WriteLine(lur);

public class Employee : Person
{
  // ...

  public string ToString()   // pas de override ⇨ masquage implicite
  {
      return "Son Goku";
  }
}
```

## Masquage de méthode

- Le mot réservé `new` indique **explicitement** un masquage [Pas obligé
  d\'utiliser, mais warning à la compilation]{.small}

```cs
public class Employee : Person
{
  // ...

  public new string ToString()  // new ⇨ masquage explicite
  {
      return "Son Goku";
  }
}

```

## Masquage de méthode

- Comportement étrange... là c'est Lurkin...

```cs
Employee lur = new Employee(
  "Q. Lurkin",
  new DateTime (1982, 8, 24),
  6000
);
Console.WriteLine(lur);
```

```terminal
Q. Lurkin
```

- ...et ici c\'est Goku

```cs
Employee lur = new Employee(
  "Q. Lurkin",
  new DateTime (1982, 8, 24),
  6000
);
Console.WriteLine(lur.ToString());
```

```terminal
Son Goku
```

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
True / True
False
True
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
- **Type dynamique** de l'**objet référencé par la variable**
  - Déterminé lors de l'exécution
  - Peut changer en cours d'exécution

## Type compatible

- Deux types **compatibles** sont liés par une relation de filiation
- Attention, la compatibilité est **unidirectionnelle**
- Conversions si **type dynamique de `b` compatible avec `A`**
  - Implicite : A a = b;
  - Explicite : A a = (A) b;

## Résolution des appels de méthode

- Le type statique détermine les **méthodes accessibles** [Les seules
  méthodes accessibles sont celles du type statique]{.small}
- La **méthode effectivement appelée** dépend du type dynamique [En
  cas de redéfinition, la méthode de la sous-classe est
  appelée]{.small}
- Résolution en **deux étapes**
  - Méthodes accessibles vérifiées à la compilation
  - Méthode appelée décidée à l'exécution

## Résolution des appels de méthode

- Méthode de la sous-classe **non accessible** [Car le type statique
  est celui de la super-classe]{.small}

```cs
Point p = new ColouredPoint (7, 5, Color.Red);

Console.WriteLine(p.Colour);
```

```terminal
Program.cs (32, 25) : error CS1061 : Type 'Cours4.Point' does
not contain a definition for 'Colour' and no extension method
'Colour' of type 'Cours4.Point' could be found. Are you
missing an assembly reference ?
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

- Ne pas confondre **redéfinition** et **surcharge** de méthodes.

## L'héritage c'est mal ?

- **Couplage très fort** entre classes mère et fille. [Encore plus si membres `protected`]{.small}
- Les hiérarchies de classes sont **rigides**

## Les hiérarchies de classes sont rigides

- Imaginons que nous créons une application contenant des **chiens**

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Dog {
  + bark()
}
```

## Les hiérarchies de classes sont rigides

- Plus tard, nous décidons d'ajouter des **chats**

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Dog {
  + bark()
}

class Cat {
  + meow()
}
```

## Les hiérarchies de classes sont rigides

- Nous décidons d'ajouter du **réalisme**

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Dog {
  + poop()
  + bark()
}

class Cat {
  + poop()
  + meow()
}
```

## Les hiérarchies de classes sont rigides

- Il faut éliminer la **duplication** de code

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Animal {
  + poop()
}

class Dog {
  + bark()
}

class Cat {
  + meow()
}

Animal <|-- Dog
Animal <|-- Cat
```

## Les hiérarchies de classes sont rigides

- Avec toute cette m\*\*\*\*, Il faut un système de **nettoyage**

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Animal {
  + poop()
}

class Dog {
  + bark()
}

class Cat {
  + meow()
}

class CleaningRobot {
  + drive()
  + clean()
}

Animal <|-- Dog
Animal <|-- Cat
```

## Les hiérarchies de classes sont rigides

- Il faut aussi un système pour éviter la **surpopulation**

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Animal {
  + poop()
}

class Dog {
  + bark()
}

class Cat {
  + meow()
}

class CleaningRobot {
  + drive()
  + clean()
}

class MurderRobot {
  + drive()
  + kill()
}

Animal <|-- Dog
Animal <|-- Cat
```

## Les hiérarchies de classes sont rigides

- Il faut encore éviter la **duplication** de code

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Animal {
  + poop()
}

class Dog {
  + bark()
}

class Cat {
  + meow()
}

class Robot{
  + drive()
}

class CleaningRobot {
  + clean()
}

class MurderRobot {
  + kill()
}

Animal <|-- Dog
Animal <|-- Cat

Robot <|-- CleaningRobot
Robot <|-- MurderRobot
```

## Les hiérarchies de classes sont rigides

- C'est a ce moment du projet que le client demande un `MurderRobotDog` [Il doit `drive()`, `kill()` et `bark()`]{.small}

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Animal {
  + poop()
}

class Dog {
  + bark()
}

class Cat {
  + meow()
}

class Robot{
  + drive()
}

class CleaningRobot {
  + clean()
}

class MurderRobot {
  + kill()
}

Animal <|-- Dog
Animal <|-- Cat

Robot <|-- CleaningRobot
Robot <|-- MurderRobot
```

- **Ce n'est pas possible sans complètement modifier toute l'application**

## Sauvé par la composition

- Si nous avions basé notre design sur des **compositions**, nous aurions plus de **flexibilité**

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 24

class Pooper {
  + poop()
}

class Barker {
  + bark()
}

class Meower {
  + meow()
}

class Driver {
  + drive()
}

class Cleaner {
  + clean()
}

class Killer {
  + kill()
}

class Dog
class Cat
class CleaningRobot
class MurderRobot
class MurderRobotDog

Pooper --* Dog
Barker --* Dog

Pooper --* Cat
Meower --* Cat

Cleaner --* CleaningRobot
Driver --* CleaningRobot

Killer --* MurderRobot
Driver --* MurderRobot

Killer --* MurderRobotDog
Driver --* MurderRobotDog
Barker --* MurderRobotDog
```

## Composition > héritage

- Design orienté **héritage**: conception des classes par rapport à ce qu'elles **sont**
- Design orienté **composition**: conception des classes par rapport à ce qu'elles **font**
- Composition plus **flexible** que l'héritage
