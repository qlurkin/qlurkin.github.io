---
title: PO3T - Cours 6
subtitle: Avalonia UI
type: deck
---

## Installation

```terminal
> dotnet new install Avalonia.Templates
```

- Cela installe des _templates_ de projet propre à Avalonia UI

- Vous pouvez aussi installer des
  [extensions d'éditeurs](https://avaloniaui.net/gettingstarted#installation)

## Premier projet

- Avec le template `Avalonia .NET App`

- 3 classes:
  - `Program` : contient le `Main` du projet qui démarre l'`Application`
  - `App` : hérite de `Application`. Définit les paramètres concernant toute
    l'application (comme de thème). Crée la `MainWindow`.
  - `MainWindow` : Là ou nous allons travailler

## `MainWindow`

```cs
using Avalonia.Controls;

namespace Hello;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }
}
```

- Hérite de `Window`

- Indiquée comme `partial`: permet de répartir la définition d'une classe sur
  plusieurs fichiers

- Contient juste un constructeur qui lance la méthode `InitializeComponent`:
  Cette méthode construit le contenu de la fenêtre et est définie dan l'autre
  "partie" de la classe.

- Il y a un fichier `XAML` portant le même nom: ce fichier est utilisé pendant
  la compilation pour générer l'autre partie de la classe.

## Sans XAML

- Commençons **sans** XAML
- Supprimez `MainWindow.xaml`
- Renommez `MainWindow.xaml.cs` en `MainWindow.cs`
- Enlevons le mot `partial`
- Supprimons l'appel à `InitializeComponent`

```cs
using Avalonia.Controls;

namespace Hello;

public class MainWindow : Window
{
    public MainWindow()
    {
    }
}
```

## `MainWindow.cs` {.code}

```cs
using Avalonia;
using Avalonia.Interactivity;
using Avalonia.Controls;

namespace Hello;

public class MainWindow : Window {
    private int counter = 0;
    private readonly TextBlock counterText;
    public MainWindow() {
        Title = "Mon compteur";
        Width = 350;
        Height = 200;

        // C# Shorthand syntax called "Object Initializer"
        counterText = new TextBlock {     // Call TextBlock()
            Text = "Compteur : 0",        // uses TextBlock properties
            FontSize = 24,
            HorizontalAlignment = Avalonia.Layout.HorizontalAlignment.Center
        };

        var button = new Button {
            Content = "Incrémenter",
            HorizontalAlignment = Avalonia.Layout.HorizontalAlignment.Center
        };

        button.Click += IncrementCounter;

        var panel = new StackPanel {
            Margin = new Thickness(20),
            Spacing = 15,
            HorizontalAlignment = Avalonia.Layout.HorizontalAlignment.Stretch,
            VerticalAlignment = Avalonia.Layout.VerticalAlignment.Center
        };

        panel.Children.Add(counterText);
        panel.Children.Add(button);

        Content = panel;
    }

    private void IncrementCounter(object? sender, RoutedEventArgs e) {
        counter++;
        counterText.Text = $"Compteur : {counter}";
    }
}
```

## Avec XAML

- Repartons d'un projet vierge
- Ajoutons l'attribut `counter` et la méthode `IncrementCounter`
- Le reste est fait par la partie de la classe générée à partir du XAML

```cs
using Avalonia.Controls;
using Avalonia.Interactivity;

namespace hello2;

public partial class MainWindow : Window
{
    private int counter = 0;

    public MainWindow()
    {
        // Instanciate the components described in the XAML
        InitializeComponent();
    }

    private void IncrementCounter(object? sender, RoutedEventArgs e)
    {
        counter++;
        CounterText.Text = $"Compteur : {counter}";
        // CounterText is declared in the generated part of the class
    }
}
```

## Le XAML

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="350" d:DesignHeight="200"
        x:Class="hello2.MainWindow"
        Title="Mon compteur"
        Width="350" Height="200">

    <StackPanel Margin="20" Spacing="15" HorizontalAlignment="Stretch" VerticalAlignment="Center">
        <TextBlock
            x:Name="CounterText"
            Text="Compteur : 0"
            FontSize="24"
            HorizontalAlignment="Center" />

        <Button
            x:Name="IncrementButton"
            Content="Incrémenter"
            Click="IncrementCounter"
            HorizontalAlignment="Center" />
    </StackPanel>

</Window>
```

## Application de Notes

- Créons une application de gestion de notes
- L'architecture OO de cette App **sera volontairement mauvaise**

```cs
using Avalonia.Controls;
using Avalonia.Interactivity;

namespace Notes;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    private void AddButton_Click(object? sender, RoutedEventArgs e)
    {
        string text = NoteTextBox.Text ?? "";

        if (string.IsNullOrWhiteSpace(text))
        {
            StatusText.Text = "Veuillez saisir une note.";
            return;
        }

        NotesList.Items.Add($"- {text}");

        NoteTextBox.Text = "";

        StatusText.Text =
            $"{NotesList.ItemCount} note(s) ajoutée(s).";
    }

    private void DeleteButton_Click(object? sender, RoutedEventArgs e)
    {
        if (NotesList.SelectedItem == null)
        {
            StatusText.Text =
                "Veuillez sélectionner une note.";
            return;
        }

        NotesList.Items.Remove(NotesList.SelectedItem);

        StatusText.Text =
            $"Il reste {NotesList.ItemCount} note(s).";
    }
}
```

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="Notes.MainWindow"
        Title="Mes notes"
        Width="400"
        Height="450">

    <StackPanel Margin="20" Spacing="12">

        <TextBlock Text="Mes notes"
                   FontSize="26"
                   FontWeight="Bold" />

        <TextBox x:Name="NoteTextBox"
                 PlaceholderText="Saisissez une note..."
                 AcceptsReturn="False" />

        <Button Content="Ajouter"
                HorizontalAlignment="Stretch"
                Click="AddButton_Click" />

        <TextBlock Text="Liste des notes"
                   FontSize="18"
                   FontWeight="SemiBold"
                   Margin="0,10,0,0" />

        <ListBox x:Name="NotesList"
                 Height="180" />

        <Button Content="Supprimer la note sélectionnée"
                HorizontalAlignment="Stretch"
                Click="DeleteButton_Click" />

        <TextBlock x:Name="StatusText"
                   Text="Prêt."
                   Opacity="0.7"
                   TextWrapping="Wrap" />

    </StackPanel>
</Window>
```

## Single Responsibility Principle

- Les classes et les méthodes ne doivent être **responsables** que d'**une**
  chose
- Cela permet d'avoir une **grande cohésion**
- Ici la classe `MainWindow` s'occupe :
  - De l'état de l'application,
  - De l'affichage,
  - Des contrôles (boutons, etc),
  - De la logique métier (ajout et suppression de notes),
  - De la manipulation des données.
- C'est **beaucoup trop** pour une seule classe

## Classe `Note`

- Données d'une note

```cs
namespace Notes;

public class Note
{
    public string Text { get; }

    public Note(string text)
    {
        Text = text;
    }

    public override string ToString()
    {
        return Text;
    }
}
```

## Classe `NoteManager`

- Logique Métier

```cs
using System.Collections.Generic;

namespace Notes;

public class NoteManager
{
    private readonly List<Note> notes = new();

    public void Add(string text)
    {
        notes.Add(new Note(text));
    }

    public void Remove(Note note) {
        notes.Remove(note);
    }

    public IReadOnlyList<Note> Notes
    {
        get {
            return notes;
        }
    }
}
```

## `MainWindow`

```cs
using Avalonia.Controls;
using Avalonia.Interactivity;

namespace Notes;

public partial class MainWindow : Window
{
    private readonly NoteManager manager = new();
    public MainWindow()
    {
        InitializeComponent();

        RefreshNotesList();
    }

    private void AddButton_Click(object? sender, RoutedEventArgs e)
    {
        string text = NoteTextBox.Text ?? "";

        if (string.IsNullOrWhiteSpace(text))
        {
            StatusText.Text = "Veuillez saisir une note.";
            return;
        }

        manager.Add(text);

        NoteTextBox.Text = "";

        RefreshNotesList();

        StatusText.Text =
            $"{NotesList.ItemCount} note(s) ajoutée(s).";
    }

    private void DeleteButton_Click(object? sender, RoutedEventArgs e)
    {
        // Check if SelectedItem is of type Note and assign
        // the Note to selectedNote
        if (NotesList.SelectedItem is not Note selectedNote)
        {
            StatusText.Text = "Veuillez sélectionner une note.";
            return;
        }

        manager.Remove(selectedNote);

        RefreshNotesList();

        StatusText.Text =
            $"Il reste {NotesList.ItemCount} note(s).";
    }

    private void RefreshNotesList()
    {
        NotesList.Items.Clear();

        foreach (Note note in manager.Notes)
        {
            NotesList.Items.Add(note);
        }
    }
}
```

## Constatations

- Nous devons penser à appeler `RefreshNotesList` à **chaque modification**
- Si `NoteManager.Add` ou `NoteManager.Remove` sont appelé depuis **un autre
  endroit**, l'interface ne se mettra pas à jour.
- C'est pour résoudre ce problème que Le **Design Pattern Observer** est
  beaucoup utilisé dans les interfaces graphiques

## Design Pattern: Observer

- Mécanisme d'inscription d'un objet (l'observateur) aux événements d'un autre
  objet (l'observé)

```plantuml {.build}
hide circle
skinparam classAttributeIconSize 0
skinparam defaultFontSize 20


class Publisher {
  -subscribers: List<Subscriber>
  +Subscribe(Subscriber)
  +UnSubscribe(Subscriber)
  +Notify()
}

interface Subscriber <<interface>> {
  +update(context)
}

class ConcreteSubscriber implements Subscriber {
  +update(context)
}

Publisher o-> Subscriber

note left of Publisher::Notify
  <b>forEach</b>(s <b>in</b> subscribers)
    s.update(context)
end note
```

## Design Pattern: Observer {.code}

```cs
interface ISubscriber {
    public void Update(float new_value);
}

class TempSensor {
  private float temperature;
  private List<ISubscriber> subscribers= new List<ISubscriber>();

  public TempSensor(float temperature) {
    this.temperature = temperature;
  }

  public void Subscribe(ISubscriber subscriber) {
    subscribers.Add(subscriber);
  }

  public void Notify() {
    foreach(ISubscriber subscriber in subscribers) {
      subscriber.Update(temperature);
    }
  }

  public float Temperature {
    get { return temperature; }
    set {
      temperature = value;
      Notify();
    }
  }
}

class TempPrinter : ISubscriber {
  public void Update(float new_value) {
    Console.Write("Temperature: {0}", new_value);
  }
}

class Program {
  public static void Main(String[] args) {
    TempSensor sensor = new TempSensor(25);
    sensor.Subscribe(new TempPrinter());
    sensor.Temperature = 14;
  }
}

```

```terminal
Temperature: 14
```

## INotifyPropertyChanged {.code}

- .NET a un mécanisme d'Observable standardisé via l'interface
  `INotifyPropertyChanged`

```cs
using System.ComponentModel;

namespace Observer;

public class TempSensor: INotifyPropertyChanged
{
    private double temperature = 0;
    public double Temperature {
        get
        {
            return temperature;
        }

        set
        {
            temperature = value;
            PropertyChanged?.Invoke(
                this,
                new PropertyChangedEventArgs(nameof(Temperature)));
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;
}

public class TempPrinter
{
    public void SubscribeTo(TempSensor sensor)
    {
        sensor.PropertyChanged += OnTemperaturePropertyChanged;
    }

    public void OnTemperaturePropertyChanged(object? sender, PropertyChangedEventArgs e)
    {
        TempSensor? sensor = sender as TempSensor;
        Console.WriteLine(
        $"Temperature: {sensor?.Temperature}");
    }
}

class Program {
    public static void Main(String[] args) {
        var sensor = new TempSensor();
        var printer = new TempPrinter();

        printer.SubscribeTo(sensor);
        sensor.Temperature = 14;
    }
}
```

```terminal
Temperature: 14
```

## ObservableCollection

- Dans notre App de notes, la propriété à observer est une collection
- On va donc utiliser une `ObservableCollection` qui implémente déjà toute la
  mécanique des `INotifyPropertyChanged`

```cs
using System.Collections.ObjectModel;

namespace Notes;

public class NoteManager
{
    public ObservableCollection<Note> Notes { get; } = new();

    public void Add(string text)
    {
        Notes.Add(new Note(text));
    }

    public void Remove(Note note) {
        Notes.Remove(note);
    }
}
```

## Simplifions la `MainWindown`

- Les `ListBox` (`NotesList`) gère directement les `ObservableCollection` via
  leur propriété `ItemsSource`
- Plus besoin de `RefreshNotesList`

```cs
using Avalonia.Controls;
using Avalonia.Interactivity;

namespace Notes;

public partial class MainWindow : Window
{
    private readonly NoteManager manager = new();
    public MainWindow()
    {
        InitializeComponent();

        NotesList.ItemsSource = manager.Notes;
    }

    private void AddButton_Click(object? sender, RoutedEventArgs e)
    {
        string text = NoteTextBox.Text ?? "";

        if (string.IsNullOrWhiteSpace(text))
        {
            StatusText.Text = "Veuillez saisir une note.";
            return;
        }

        manager.Add(text);

        NoteTextBox.Text = "";

        StatusText.Text =
            $"{NotesList.ItemCount} note(s) ajoutée(s).";
    }

    private void DeleteButton_Click(object? sender, RoutedEventArgs e)
    {
        if (NotesList.SelectedItem is not Note selectedNote)
        {
            StatusText.Text = "Veuillez sélectionner une note.";
            return;
        }

        manager.Remove(selectedNote);

        StatusText.Text =
            $"Il reste {NotesList.ItemCount} note(s).";
    }
}
```

## `NoteCount`

- Pour bien comprendre les `INotifyPropertyChanged`, ajoutons une propriété
  `NoteCount` à la classe `NoteManager`
- La valeur de cette propriété dépend du nombre de notes. Elle n'a donc **pas**
  de `set` pour déclencher le `Invoke`.
- Il faudra donc **écouter** les changements de l'`ObservableCollection` pour
  déclencher les `Invoke`.

```cs
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace Notes;

public class NoteManager : INotifyPropertyChanged
{
    public ObservableCollection<Note> Notes { get; } = new();

    public int NoteCount => Notes.Count;

    public event PropertyChangedEventHandler? PropertyChanged;

    public NoteManager()
    {
        // Subscription to the change of the collection
        Notes.CollectionChanged += (_, _) =>
        {
            PropertyChanged?.Invoke(
                this,
                new PropertyChangedEventArgs(nameof(NoteCount)));
        };
    }

    public void Add(string text)
    {
        Notes.Add(new Note(text));
    }

    public void Remove(Note note) {
        Notes.Remove(note);
    }
}
```

## And in the XAML ?

- L'intérêt d'une propriété observable c'est qu'elle peut déclencher les mises à
  jour de l'interface.
- Ajoutons un `TextBlock` lié à la propriété `NoteCount`

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="using:Notes"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="Notes.MainWindow"
        x:DataType="local:NoteManager"
        Title="Mes notes"
        Width="400"
        Height="450">

    <StackPanel Margin="20" Spacing="12">

        <TextBlock Text="Mes notes"
                   FontSize="26"
                   FontWeight="Bold" />

        <TextBox x:Name="NoteTextBox"
                 PlaceholderText="Saisissez une note..."
                 AcceptsReturn="False" />

        <Button Content="Ajouter"
                HorizontalAlignment="Stretch"
                Click="AddButton_Click" />

        <TextBlock Text="Liste des notes"
                   FontSize="18"
                   FontWeight="SemiBold"
                   Margin="0,10,0,0" />

        <ListBox x:Name="NotesList"
                 Height="180" />

        <Button Content="Supprimer la note sélectionnée"
                HorizontalAlignment="Stretch"
                Click="DeleteButton_Click" />

        <TextBlock x:Name="StatusText"
                   Text="Prêt."
                   Opacity="0.7"
                   TextWrapping="Wrap" />

        <TextBlock Text="{Binding NoteCount,
                   StringFormat='Nombre de notes : {0}'}" />

    </StackPanel>
</Window>
```

- Pour savoir à quel objet la propriété `NoteCount` appartient, il faut définir
  le `DataContext` de `MainWindow`
- Remarquez que nous avons aussi dû spécifier le `DataType` dans le XAML pour
  que le type du _Binding_ puisse être vérifié à la compilation

```cs
// Contructor
public MainWindow()
{
    InitializeComponent();

    DataContext = manager;
    NotesList.ItemsSource = manager.Notes;
}
```

<!-- ## Le pattern MVVM -->
<!---->
<!-- - Model View ViewModel -->
<!-- - Pattern d'architecture software -->
<!-- - 3 parties: -->
<!--   - **Model**: stocke et gère les données, ne connait rien de la _View_ ou du -->
<!--     _ViewModel_ -->
<!--   - **View**: représente l'interface utilisateur, interagit avec le _ViewModel_ -->
<!--   - **ViewModel**: est entre le _Model_ et la _View_, ne connait rien de la -->
<!--     _View_, interagit avec le _Model_ -->
<!---->
<!-- ```plantuml {.build} -->
<!-- skinparam defaultFontSize 20 -->
<!-- actor User -->
<!-- participant View -->
<!-- participant ViewModel -->
<!-- participant Model -->
<!---->
<!-- User -> View: édite une valeur -->
<!-- activate View -->
<!-- View -> ViewModel: envoie une commande -->
<!-- activate ViewModel -->
<!-- ViewModel -> Model: met à jour -->
<!-- deactivate View -->
<!-- activate Model -->
<!-- ViewModel -> View: notifie -->
<!-- deactivate ViewModel -->
<!-- deactivate Model -->
<!-- activate View -->
<!-- View -> User: affiche données à jour -->
<!-- deactivate View -->
<!-- ``` -->
<!---->
<!-- ## Tutorial -->
<!---->
<!-- - [Todo App](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CompleteApps/SimpleToDoList) -->
<!---->
<!--   Ce tutoriel nécessite le package `CommunityToolkit.Mvvm` -->
<!---->
<!--   ```terminal -->
<!--   > dotnet add package CommunityToolkit.Mvvm -->
<!--   ``` -->
<!---->
<!-- - [Documentation](https://docs.avaloniaui.net/docs/welcome) -->
