---
title: PO3T - Cours 9
subtitle: Design Patterns
type: deck
---

## Source

:::row
::::span6

![Le livre](./book.jpg){.third2}

::::
::::span6

- 1994

- **_Gang of Four_**

  - Erich Gamma
  - Richard Helm
  - Ralph Johnson
  - John Vlissides

- 23 _patterns_

- Ce n'est pas une Bible !

::::
:::

## Types

- _**Creational** Patterns_

  - A propos de la création d'instances

- _**Structural** Patterns_

  - A propos des relations entre objets

- _**Behavioral** Patterns_
  - A propos de la communication entre objets

## Singleton

- _Creational Pattern_

- Déjà abordé au [cours 5](../deck5/)

- Moyen de créer un état global [Ce qui est controversé]{.small}

- Inutile dans les langages qui permettent d'avoir des objets globaux

## Factory

- _Creational Pattern_

- Utiliser une fonction ou une méthode pour créer une instance

```plantuml {.build}
abstract class Product

abstract class Creator {
  {abstract} FactoryMethod(): Product
  AnOperation()
}

class ConcreteProductA extends Product
class ConcreteProductB extends Product

class ConcreteCreator extends Creator {
  FactoryMethod(): Product
}

note right of Creator::AnOperation
  product = FactoryMethod()
end note

note right of ConcreteCreator::FactoryMethod
  return new ConcreteProductA()
  or
  return new ConcreteProductB()
end note

ConcreteCreator .left.> ConcreteProductA
ConcreteCreator .left.> ConcreteProductB
```

- Utile quand:
  - Une classe abstraite veut déléguer la construction d'une instance à ses concrétions.
  - Le type concret à créer ne peut être déterminé que durant l'exécution.

## Exemple {.code}

- Basé sur l'exemple de [cours 4](../deck4/)

```cs
abstract class WidgetList : Widget {

    private List<Widget> items = new List<Widget>();
    private int itemHeight;

    public WidgetList(int itemHeight) {
        this.itemHeight = itemHeight;
    }

    public abstract Widget CreateItem(object? data);

    public void AddItem(object? data) {
        items.Add(CreateItem(data));
    }

    public override void render(int left, int top, int width, int height)
    {
        for (int i = 0; i < items.Count; i++) {
            // Don't render items that goes outside the outer rect
            if (top+itemHeight > height) break;

            items[i].render(left, top, width, itemHeight);
            top = top + itemHeight;
        }
    }
}

class FillerList : WidgetList {
    public FillerList(): base(3) {}

    public override Widget CreateItem(object? data)
    {
        var border = new Border("", "");
        border.AddChild(new Filler());

        return border;
    }
}

class Program
{
    public static void Main(String[] args)
    {
        FillerList list = new FillerList();
        Runner runner = new Runner(list);

        list.AddItem(null);
        list.AddItem(null);
        list.AddItem(null);
        list.AddItem(null);

        runner.run(30);
    }
}
```

## Builder

- _Creational Pattern_
- Création d'un objet par l'utilisation d'un autre objet

```plantuml {.build}
class Director {
  builder: Builder
  Construct()
}

abstract class Builder {
  {abstract} BuildPartA(): Builder
  {abstract} BuildPartB(): Builder
}

class ConcreteBuilder extends Builder {
  BuildPartA(): Builder
  BuildPartB(): Builder
  GetResult(): Product
}

class Product

Product <.left. ConcreteBuilder
Director o-right-> Builder


note left of Director::Construct
  builder
    .BuildPartA()
    .BuildPartB()
end note
```

- Utile quand:
  - La construction de l'objet implique plusieurs étapes dont le nombre et l'ordre peuvent varier
  - Le constructeur peut être passer à une autre fonction/méthode/instance.

## Exemple {.code}

```cs
interface DocumentBuilder
{
    DocumentBuilder add_title(String title);
    DocumentBuilder add_par(String par);
    DocumentBuilder start_list();
    DocumentBuilder add_bullet(String Bullet);
    DocumentBuilder end_list();
}

class Facture
{
    public string Client { get; set; }
    public double Price { get; set; }

    public Facture(string client, double price)
    {
        Client = client;
        Price = price;
    }

    public void Export(DocumentBuilder builder)
    {
        builder
            .add_title("Facture")
            .add_par("Instructions:")
            .start_list()
            .add_bullet("IBAN: BEXX XXXX XXXXXXXX")
            .add_bullet("à payer dans 10 jours")
            .end_list()
            .add_par(String.Format("{0} €", Price));
    }
}

class MDBuilder : DocumentBuilder
{
    private String content = "";

    public DocumentBuilder add_title(String title)
    {
        content += "# " + title + "\n\n";
        return this;
    }
    public DocumentBuilder add_par(String par)
    {
        content += par + "\n\n";
        return this;
    }
    public DocumentBuilder start_list()
    {
        return this;
    }
    public DocumentBuilder add_bullet(String Bullet)
    {
        content += "- " + Bullet + "\n";
        return this;
    }
    public DocumentBuilder end_list()
    {
        content += "\n";
        return this;
    }
    public String build()
    {
        return content;
    }
}

class HTMLBuilder : DocumentBuilder
{
    private String content = "<html>";

    public DocumentBuilder add_title(String title)
    {
        content += "<h1>" + title + "</h1>";
        return this;
    }
    public DocumentBuilder add_par(String par)
    {
        content += "<p>" + par + "</p>";
        return this;
    }
    public DocumentBuilder start_list()
    {
        content += "<ul>";
        return this;
    }
    public DocumentBuilder add_bullet(String Bullet)
    {
        content += "<li>" + Bullet + "</li>";
        return this;
    }
    public DocumentBuilder end_list()
    {
        content += "</li>";
        return this;
    }
    public String build()
    {
        content += "</html>";
        return content;
    }
}

class Program
{
    public static void Main(String[] args)
    {
        var facture = new Facture("Quentin Lurkin", 42.0);

        var builder1 = new MDBuilder();
        facture.Export(builder1);
        Console.WriteLine(builder1.build());

        var builder2 = new HTMLBuilder();
        facture.Export(builder2);
        Console.WriteLine(builder2.build());
    }
}
```
