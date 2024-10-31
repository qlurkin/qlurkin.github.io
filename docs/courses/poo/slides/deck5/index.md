---
title: PO3T - Cours 5
subtitle: Membres de classe et Types génériques
type: deck
---

## Membres d'instance

- Une classe peut contenir différents types de **membres**
  - Variable et constante (readonly)
  - Constructeur et méthode
- Un membre lié à un objet est appelé **membre d'instance**
  - Valeurs/comportements différents selon l'instance
  - Est accédé/appelé à partir d’un objet cible
- Seuls les membres d’instance y ont accès [une méthode d’instance a accès aux variables d'instance]{.small}

## Membres de classe

- **Membres de classe** liés à la classe [Membre partagé entre toutes les instances de la classe]{.small}
- Un membre de classe n’est **pas associé à une instance**
  - Pas d’accès aux membres d’instance
  - Accès aux autres membres de classe
- **Interdiction** de faire référence à l'objet cible

## Membres de classe

- Membre de classe également appelé **membre statique** [Déclaration avec `static`]{.small}
- Définition d’une classe avec des **méthodes utilitaires**

```cs
public class Utils {
  private static readonly int TAX_RATE = 21;

  public static double GetTaxIncPrice(double price) {
    return price * (1 + TAX_RATE / 100);
  }
}
```

## Membres de classe

- Accès aux membres de classe à partir du **nom de la classe** [Pas besoin de créer une instance de la classe]{.small}
- Même **règles de visibilité** que pour les membres d’instance

```cs
Item beer = new Item("42X", "Leffe des vignes", 14.50);
Console.WriteLine(Utils.GetTaxIncPrice(beer.GetPrice(1)));
```

```terminal
17.545
```

## Empêcher l'instanciation

- On peut **empêcher la création d’une instance** de la classe [En définissant le constructeur par défaut privé]{.small}
- Éviter la création d’**instances inutiles** [Marque que c’est une classe avec que des méthodes de classe]{.small}

```cs
public class Utils {
  private static readonly int TAX_RATE = 21;

  private Utils() {}

  public static double GetTaxIncPrice(double price) {
    return price * (1 + TAX_RATE / 100);
  }
}
```

## Variable de classe

- Une variable de classe est **partagée** entre toutes les instances [Une seule copie de la variable par classe]{.small}
- Un membre d’instance peut **accéder aux membres de classe** [Sans préfixer avec le nom de la classe s’il n’y a pas ambigüité]{.small}

```cs
new InstanceCounter();
Console.WriteLine(InstanceCounter.Counter);

new InstanceCounter();
Console.WriteLine(InstanceCounter.Counter);

public class InstanceCounter {
  private static int counter = 0;

  public static int Counter {
    get {
      return counter;
    }
  }

  public InstanceCounter() {
    counter++;
  }
}
```

```terminal
1
2
```

## Design Pattern: Singleton

- Classe dont **une seule instance** peut exister [Récupération de l’unique instance grâce à une méthode de classe]{.small}

```cs
public class Singleton {
  private static readonly Singleton instance = new Singleton();

  public static Singleton GetInstance() {
    return instance;
  }

  private Singleton() {}
}
```

## Point d'entrée du programme

- En C#, peut-être:
  - instructions de **premier niveau** dans un seul fichier et en début de fichier, ou
  - une **méthode statique** `Main` prenant un vecteur de `String` en paramètre.

```cs
class Program
{
  public static void Main(String[] args)
  {
    // ...
  }
}
```

## Classe Imbriquée

- Une classe imbriquée est **encapsulée** dans une autre [Une telle classe est un membre d’une autre classe]{.small}
- Plusieurs **avantages** à une telle encapsulation
  - Modularité et simplification du code
  - Partage d’une référence vers l'objet cible
  - Partage de membres privés avec une autre classe
  - Meilleure encapsulation pour la composition

## Classe Imbriquée

- En C#, les classes imbriquées sont des membres de classe de la classe englobante [Il ne faut pas mentionner `static`]{.small}
- En Java, Elles peuvent être membre de classe ou d'instance [Suivant que `static` est mentionné ou non]{.small}

## Classe Imbriquée

```cs
Outer.Inner obj = new Outer.Inner();
Console.WriteLine(obj);

class Outer {
    private static string name = "Outer";
    public class Inner {
        private static string name = "Inner";

        public override string ToString() {
            return String.Format("{0}-{1}", Outer.name, name);
        }
    }
}
```

```terminal
Outer-Inner
```

## Cohérence de visibilité

- Attention à la cohérence de visibilité [Par exemple, une méthode ne peut pas renvoyer un type moins visible qu'elle même]{.small}

```cs
class Outer {
    private static string name = "Outer";
    private class Inner {
        private static string name = "Inner";

        public override string ToString() {
            return String.Format("{0}-{1}", Outer.name, name);
        }
    }

    public Inner get_a_inner() {
      return new Inner();
    }
}
```

```terminal
Outer.cs(11,18): error CS0050: Accessibilité incohérente : le
type de retour 'Outer.Inner' est moins accessible que la
méthode 'Outer.get_a_inner()'
```

## Type générique

- Définition d'un **type non spécifié** lors de l'implémentation
  [Classe/méthode générique utilisable avec plusieurs types]{.small}
- Classe/méthode **paramétrée** avec un ou plusieurs types [Spécification
  du type désiré lors de l'instanciation/appel]{.small}
- Possibilité de spécifier un ensemble de types **acceptables** [En
  utilisant notamment la relation is-a]{.small}

## Type générique

- Spécification des types génériques de la classe **entre chevrons**

```cs
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

## Type générique

- Spécification des types effectifs **lors de l'instanciation** [Doit
  aussi être précisé pour le type de la variable]{.small}

```cs
Pair<string,int> p = new Pair<string,int> ("Tom", 21);
Console.WriteLine (p);

Pair<string,Pair<int,int>> q = new Pair<string,Pair<int,int>> (
  "Tom",
  new Pair<int,int> (187, 98)
);
Console.WriteLine (q);
```

```terminal
(Tom, 21) (Tom, (187, 98))
```

## Contraintes

- Possibilité d'ajouter des **contraintes** sur les types génériques [La
  méthode CompareTo provient de IComparable]{.small}

```cs
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

## Méthode générique

- Possibilité de définir une **méthode générique** [Déclaration des types
  génériques dans la signature]{.small}

```cs
class Program {
  public static void Main (string[] args)
  {
    Console.WriteLine (max (12, 7));
    Console.WriteLine (max ("sept", "douze"));
  }

  public static T max<T> (T a, T b) where T : IComparable
  {
    return a.CompareTo(b) > 0 ? a : b;
  }
}
```

## Valeur par défaut

- Obtention de la valeur par défaut d'un type avec `default`

```cs
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

```terminal
0 False
```

## Listes Liées {.code}

```cs
class LinkedList<T> {
  private class Node {
    public T data;
    public Node? next;

    public Node(T data, Node? next) {
      this.data = data;
      this.next = next;
    }
  }

  private Node? first;
  private int length;

  public LinkedList() {
    first = null;
    length = 0;
  }

  public int Length {
    get { return length; }
  }

  public bool IsEmpty() { return Length == 0;}

  public void AddFirst(T data) {
    first = new Node(data, first);
    length++;
  }

  public void AddLast(T data) {
    Node node= new Node(data, null);
    if(first == null) {
      first = node;
    }
    else {
      Node current = first;
      while(current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  }

  public override string ToString() {
    if(first == null) {
      return "[]";
    }

    Node current = first;
    string res = "[" + current.data;
    while(current.next != null) {
      current = current.next;
      res += ", " + current.data;
    }
    return res + "]";
  }
}
```
