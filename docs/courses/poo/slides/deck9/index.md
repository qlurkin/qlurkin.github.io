---
title: PO3T - Cours 9 & 10
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

## Exemple {.code}

```cs
using System.Collections.Immutable;

class Log {
    private static Log instance = new Log();
    private List<string> logs;

    private Log() {
        logs = new List<string>();
    }

    public static Log Instance {get {return instance;}}

    public void Add(string log) {
        logs.Add(log);
    }

    public ImmutableList<string> GetLogs() {
        return logs.ToImmutableList();
    }
}

class LogWidget : Widget
{
    public override void render(int left, int top, int width, int height)
    {
        var i = 0;
        var logs = Log.Instance.GetLogs();
        var count = logs.Count;
        foreach (var log in logs.GetRange(Math.Max(0, count - height), Math.Min(count, height)))
        {
            Console.SetCursorPosition(left, top + i);
            Console.Write(log.Substring(0, Math.Min(width, log.Length)));
            i++;
        }
    }
}
```

## Factory

- _Creational Pattern_

- Utiliser une fonction ou une méthode pour créer une instance

```plantuml {.build}
abstract class Product

abstract class Creator {
  AnOperation()
  {abstract} FactoryMethod(): Product
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
    private int itemHeight;

    public WidgetList(int itemHeight, IEnumerable values) : base(int.MaxValue) {
        this.itemHeight = itemHeight;
        foreach(object item in values) {
            AddItem(item);
        }
    }

    public abstract Widget CreateItem(object data);

    public void AddItem(object data) {
        AddChild(CreateItem(data));
    }

    public override void render(int left, int top, int width, int height)
    {
        var children = Children;
        for (int i = 0; i < children.Count; i++) {
            // Don't render items that goes outside the outer rect
            if (top+itemHeight > height) break;

            children[i].render(left, top, width, itemHeight);
            top = top + itemHeight;
        }
    }
}

class IntList : WidgetList {
    public IntList(List<int> values): base(3, values) {}

    public override Widget CreateItem(object data)
    {
        var border = new Border("", "");
        border.AddChild(new ValueWidget<int>((int) data));

        return border;
    }
}

class ValueWidget<T> : Widget {

    private T value;

    public ValueWidget(T value) {
        this.value = value;
    }
    public override void render(int left, int top, int width, int height)
    {
        Console.SetCursorPosition(left, top);
        Console.Write("{0}", value);
    }
}

class Program
{
    public static void Main(String[] args)
    {
        var ints = new List<int> {1, 2, 3, 4};

        IntList list = new IntList(ints);
        Runner runner = new Runner(list);

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

## Decorator

- _Structural Pattern_

- Emballer un objet dans un autre pour ajouter une fonctionalité

```plantuml {.build}
abstract class Component {
  Operation()
}

abstract class Decorator extends Component {
  component: Component
  Operation()
}

Component <--o Decorator

note left of Decorator::component
  component.Operation()
end note

class ConcreteComponent extends Component {
  Operation()
}

class ConcreteDecoratorA extends Decorator {
  addedState
  Operation()
}

class ConcreteDecoratorB extends Decorator {
  Operation()
  AddedBehavior()
}

note left of ConcreteDecoratorB::Operation
  base.Operation()
  AddedBehavior()
end note
```

- Utile pour ajouter un comportement de façon dynamique et plus flexible qu'avec un héritage

## Exemple {.code}

- Le `Border` _widget_ de l'exemple du [cours 4](../deck4/)

```cs
class Border : Widget
{
    private string title;
    private string footnote;

    public Border(string title, string footnote) : base(1) {
        this.title = title;
        this.footnote = footnote;
    }

    public Border() : this("", "") {}

    public string Title {
        get { return title; }
        set { title = value; }
    }

    public string Footnote {
        get { return footnote; }
        set { footnote = value; }
    }

    private void write_h_line(string txt, int width) {
        for (int i = 0; i < width/2 - txt.Length/2; i++)
        {
            Console.Write("━");
        }
        Console.Write(txt);
        for (int i = 0; i < width - width / 2 - (txt.Length - txt.Length/2); i++)
        {
            Console.Write("━");
        }
    }

    public override void render(int left, int top, int width, int height)
    {
        Console.SetCursorPosition(left, top);
        Console.Write("┏");
        write_h_line(Title, width-2);
        Console.Write("┓");

        for (int i = 1; i < height - 1; i++)
        {
            Console.SetCursorPosition(left, top + i);
            Console.Write("┃");
            Console.SetCursorPosition(left + width - 1, top + i);
            Console.Write("┃");
        }

        Console.SetCursorPosition(left, top + height - 1);
        Console.Write("┗");
        write_h_line(Footnote, width-2);
        Console.Write("┛");

        if (HasChildren) {
            Child.render(left+1, top+1, width-2, height-2);
        }
    }
}
```

## Proxy

- _Structural Pattern_
- Emballer un objet dans un autre pour en contrôler les accès.

```plantuml {.build}
abstract class Subject {
  {abstract} Request()
}

class RealSubject extends Subject {
  Request()
}

class Proxy extends Subject {
  realSubject: RealSubject
  Request()
}

RealSubject <-left-* Proxy

note left of Proxy::Request
  realSubject.Request()
end note
```

## Exemple {.code}

```cs
using System.Collections;

interface ITextFile
{
    string GetName();
    string GetContent();
}

class TextFile : ITextFile
{
    private string name;
    private string content;

    public TextFile(string name)
    {
        this.name = name;
        try
        {
            using (StreamReader sr = new StreamReader(name))
            {
                content = sr.ReadToEnd();
            }
            Log.Instance.Add(name + " LOADED");
        }
        catch (Exception e)
        {
            content = "The file could not be read";
            Log.Instance.Add(e.Message);
        }
    }

    public string GetContent()
    {
        return content;
    }

    public string GetName()
    {
        return name;
    }
}

class TextFileProxy : ITextFile
{
    private TextFile? textFile = null;
    private string name;

    public TextFileProxy(string name)
    {
        this.name = name;
    }

    public string GetContent()
    {
        if (textFile == null)
        {
            textFile = new TextFile(name);
        }
        return textFile.GetContent();
    }

    public string GetName()
    {
        return name;
    }
}

class TextFileWidget : Widget
{
    private ITextFile textFile;

    public TextFileWidget(ITextFile textFile)
    {
        this.textFile = textFile;
    }

    public override void render(int left, int top, int width, int height)
    {
        Console.SetCursorPosition(left, top);
        var content = textFile.GetContent().Replace("\n", "").Replace("\r", "");
        if (content.Length > width)
        {
            content = content.Substring(0, width);
        }
        Console.Write(content);
    }
}

class TextFileList : WidgetList
{
    public TextFileList(IEnumerable values) : base(3, values)
    {
    }

    public override Widget CreateItem(object obj)
    {
        ITextFile textFile = (ITextFile)obj;
        var widget = new Border(" " + textFile.GetName() + " ", "");
        widget.AddChild(new TextFileWidget(textFile));

        return widget;
    }
}

class Program
{
    public static void Main(String[] args)
    {
        var content = new Split();

        string[] names = Directory.GetFiles(".");
        List<ITextFile> files = new List<ITextFile>();

        foreach (string name in names)
        {
            files.Add(new TextFileProxy(name));
        }

        content.AddChild(new TextFileList(files));

        var console = new Border(" Console ", "");
        console.AddChild(new LogWidget());
        content.AddChild(console);

        var runner = new Runner(content);
        runner.run(30);
    }
}
```

## Observer

- _Behavioral Pattern_
- Permet de notifier plusieurs _Observers_ d'un évènement sur un _Observable_.
- Déjà abordé dans le [cours 6](../deck6/)

## Exemple {.code}

```cs
using System.Collections;

interface IKeyObserver
{
    void OnKey(ConsoleKeyInfo key);
}

abstract class KeyObservable
{
    private List<IKeyObserver> observers = new List<IKeyObserver>();

    public void Subscribe(IKeyObserver observer)
    {
        observers.Add(observer);
    }

    public void UnSubscribe(IKeyObserver observer)
    {
        observers.Remove(observer);
    }

    public void Notify(ConsoleKeyInfo key)
    {
        foreach (IKeyObserver observer in observers)
        {
            observer.OnKey(key);
        }
    }
}

class Runner : KeyObservable
{
    private Widget root;
    private bool running = false;

    public Runner(Widget root)
    {
        this.root = root;
    }

    public virtual void ProcessKey(ConsoleKeyInfo key)
    {
        if (key.Key == ConsoleKey.Q)
        {
            running = false;
        }
    }

    public void run(int fps)
    {
        Console.CursorVisible = false;
        int frame_time = 1000 / fps;
        running = true;
        while (running)
        {
            int height = Console.BufferHeight;
            int width = Console.BufferWidth;
            while (Console.KeyAvailable)
            {
                ConsoleKeyInfo key = Console.ReadKey(true);
                ProcessKey(key);
                Notify(key);
            }
            Console.Clear();
            root.render(0, 0, width, height);
            Thread.Sleep(frame_time);
        }
        Console.Clear();
    }
}

abstract class WidgetList : Widget, IKeyObserver
{
    private int itemHeight;
    private int offset = 0;

    public WidgetList(int itemHeight, IEnumerable values) : base(int.MaxValue)
    {
        this.itemHeight = itemHeight;
        foreach (object item in values)
        {
            AddItem(item);
        }
    }

    public abstract Widget CreateItem(object data);

    public void AddItem(object data)
    {
        AddChild(CreateItem(data));
    }

    public override void render(int left, int top, int width, int height)
    {
        var children = Children;
        for (int i = offset; i < children.Count; i++)
        {
            // Don't render items that goes outside the outer rect
            if (top + itemHeight > height) break;

            children[i].render(left, top, width, itemHeight);
            top = top + itemHeight;
        }
    }

    public void OnKey(ConsoleKeyInfo key)
    {
        if (key.Key == ConsoleKey.DownArrow)
        {
            offset += 1;
            if (offset > Children.Count)
            {
                offset -= 1;
            }
        }

        if (key.Key == ConsoleKey.UpArrow)
        {
            offset -= 1;
            if (offset < 0)
            {
                offset = 0;
            }
        }
    }
}

class Program
{
    public static void Main(String[] args)
    {
        var content = new Split();
        var runner = new Runner(content);

        string[] names = Directory.GetFiles(".");
        List<ITextFile> files = new List<ITextFile>();

        foreach (string name in names)
        {
            files.Add(new TextFileProxy(name));
        }

        var list = new TextFileList(files);
        runner.Subscribe(list);

        content.AddChild(list);

        var console = new Border(" Console ", "");
        console.AddChild(new LogWidget());
        content.AddChild(console);


        runner.run(30);
    }
}
```

## Iterator

- _Behavioral Pattern_
- Fournit un moyen d'accéder aux élément d'une collection sans exposer sa représentation interne.

```plantuml {.build}
abstract class AbstractList {
  CreateIterator()
  Count()
  Append(item)
  Remove(item)
}

abstract class Iterator {
  First()
  Next()
  IsDone()
  CurrentItem(): item
}

class Client

Client -right-> Iterator
Client -left-> AbstractList

note bottom of Client
  it = list.CreateIterator();
  while(not it.IsDone()) {
    item = it.CurrentItem();
    it.Next();
  }
end note

class List extends AbstractList

class ListIterator extends Iterator
```

- Mécanisme déjà implémenté dans la plupart des langages orienté objets

## Exemple {.code}

```cs
class Program
{
    public static void Main(String[] args)
    {
        var list = new List<int> { 1, 2, 3, 4, 5, 6 };

        foreach (var item in list)
        {
            Console.WriteLine(item);
        }

        // Translates to

        var it = list.GetEnumerator();
        while (it.MoveNext())
        {
            var item = it.Current;
            Console.WriteLine(item);
        }
    }
}
```

## Strategy

- _Behavioral Pattern_
- Définit une famille d'algorithme pour les encapsuler et les rendre interchangeable.

## Exemple {.code}

```cs
interface FilterStrategy<T>
{
    bool RemoveValue(T value);
}

class RemoveNegativeStrategy : FilterStrategy<int>
{
    public bool RemoveValue(int value)
    {
        return value < 0;
    }
}

class RemoveOddStrategy : FilterStrategy<int>
{
    public bool RemoveValue(int value)
    {
        return Math.Abs(value) % 2 != 0;
    }
}

class Values<T>
{
    private List<T> values;

    public Values(List<T> values)
    {
        this.values = values.GetRange(0, values.Count);
    }

    public Values<T> Filter(FilterStrategy<T> strategy)
    {
        List<T> res = new List<T>();
        foreach (T item in values)
        {
            if (!strategy.RemoveValue(item))
            {
                res.Add(item);
            }
        }
        return new Values<T>(res);
    }

    public override string ToString()
    {
        return "[" + String.Join(", ", values) + "]";
    }
}

class Program
{
    public static void Main(String[] args)
    {
        var values = new Values<int>(new List<int> { -1, 2, -3, -4, 5, 6 });

        var even = values.Filter(new RemoveOddStrategy());
        var positive = values.Filter(new RemoveNegativeStrategy());

        Console.WriteLine(even);
        Console.WriteLine(positive);

    }
}
```
