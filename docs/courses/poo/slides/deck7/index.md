---
title: PO3T - Cours 7
subtitle: Avalonia UI - MVVM
type: deck
---

## Le Problème

```cs
// Ce gestionnaire d'événements de MainWindow
private void AddButton_Click(object? sender, RoutedEventArgs e)
{
    string text = NoteTextBox.Text ?? "";

    if (string.IsNullOrWhiteSpace(text))
    {
        StatusText.Text = "Veuillez saisir une note.";
        return;
    }

    _noteManager.Add(text);
    NoteTextBox.Text = "";

    StatusText.Text = "Note ajoutée.";
}
```

- La classe `MainWindow` mélange toujours **plusieurs responsabilités**:
  - elle récupère le texte depuis un contrôle graphique.
  - elle vérifie si la saisie est valide.
  - elle demande au gestionnaire d'ajouter une note.
  - elle vide le champ de saisie.
  - elle modifie le message affiché à l'utilisateur.

- Certaines opérations concernent les **données** et les **règles de gestion**;
  d'autres concernent l'**interface**.

## Le _ViewModel_

- le _ViewModel_ permet de séparer ce que l'interface doit **afficher et faire**
  de la manière dont cette interface **est construite**.

- Le _ViewModel_ s'occupe de l'état propre à l'écran
  - Quel texte est actuellement saisi ?
  - Quelle tâche est sélectionnée ?
  - Quel message faut-il afficher ?
  - Que doit-il se passer lorsque l'utilisateur demande l'ajout d'une tâche ?

- Ces informations ne sont pas vraiment des règles métier. Elles concernent la
  **manière dont l'utilisateur interagit avec l'application**.

- Le _ViewModel_ expose à l'interface les **données** et les **actions** dont
  elle a besoin.

## Le ViewModel - Concrètement

- Il est utilisé comment `DataContext` de la vue
- Il offre des propriété que la vue peut observer (_Binding_) et modifier (_Two
  Way Binding_)
- Le _ViewModel_ ne connait pas la vue. Il ne peut pas accéder aux contrôles
  (_widgets_)

  Le code suivant de notre gestionnaire de click:

  ```cs
  string text = NoteTextBox.Text ?? "";
  ```

  deviendra une propriété dans le _ViewModel_:

  ```cs
  public string NewNoteText { get; set; } = "";
  ```

  Et la vue l'utilisera:

  ```xml
  <TextBox Text="{Binding NewNoteText, Mode=TwoWay}"
         PlaceholderText="Saisissez une note..." />
  ```

## Le _ViewModel_ - Action

- Le _ViewModel_ peut ensuite proposer une action :

```cs
public void AddNote()
{
    if (string.IsNullOrWhiteSpace(NewNoteText))
    {
        StatusMessage = "Veuillez saisir une note.";
        return;
    }

    manager.Add(NewNoteText);

    NewNoteText = "";
    StatusMessage = "Note ajoutée.";
}
```

- Sans aucune référence à la vue

## Le _ViewModel_ - Tests

- Sans _ViewModel_, pour tester l'ajout d'une tâche, on pourrait être obligé de
  lancer la fenêtre et de simuler des clics.

- Avec un _ViewModel_, on peut tester directement :

```cs
var viewModel = new MainWindowViewModel();

viewModel.NewNoteText = "Préparer le cours";
viewModel.AddNote();

Console.WriteLine(viewModel.manager.NoteCount);
Console.WriteLine(viewModel.StatusMessage);
```

- la logique de présentation peut être testée **indépendamment de l'interface
  graphique**.

## _ViewModel_ pour la `MainWindow` {.code}

```cs
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Notes;

public class MainWindowViewModel : INotifyPropertyChanged
{
    public NoteManager Manager { get; } = new();

    private string newNoteText = "";

    public string NewNoteText
    {
        get => newNoteText;
        set
        {
            if (newNoteText == value)
                return;

            newNoteText = value;
            OnPropertyChanged();
        }
    }

    private Note? selectedNote;

    public Note? SelectedNote
    {
        get => selectedNote;
        set
        {
            if (selectedNote == value)
                return;

            selectedNote = value;
            OnPropertyChanged();
        }
    }

    private string statusMessage = "Prêt.";

    public string StatusMessage
    {
        get => statusMessage;
        set
        {
            if (statusMessage == value)
                return;

            statusMessage = value;
            OnPropertyChanged();
        }
    }

    public void AddNote()
    {
        if (string.IsNullOrWhiteSpace(NewNoteText))
        {
            StatusMessage = "Veuillez saisir une note.";
            return;
        }

        Manager.Add(NewNoteText);

        NewNoteText = "";
        StatusMessage = "Note ajoutée.";
    }

    public void DeleteSelectedNote()
    {
        if (SelectedNote == null)
        {
            StatusMessage = "Veuillez sélectionner une note.";
            return;
        }

        Manager.Remove(SelectedNote);
        SelectedNote = null;
        StatusMessage = "Tâche supprimée.";
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    // Permet de recevoir le nom de la propriété appelante automatiquement
    protected void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

## Et la `MainWindow`

- Le C\#

```cs
using Avalonia.Controls;
using Avalonia.Interactivity;

namespace demo;

public partial class MainWindow : Window
{
    private readonly MainWindowViewModel viewModel = new();
    public MainWindow()
    {
        InitializeComponent();

        DataContext = viewModel;
    }

    private void AddButton_Click(object? sender, RoutedEventArgs e)
    {
        viewModel.AddNote();
    }

    private void DeleteButton_Click(object? sender, RoutedEventArgs e)
    {
        viewModel.DeleteSelectedNote();
    }
}
```

- Le XAML

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="using:Notes"
        mc:Ignorable="d" d:DesignWidth="350" d:DesignHeight="200"
        x:Class="Notes.MainWindow"
        x:DataType="local:MainWindowViewModel"
        Title="Mes notes"
        Width="400"
        Height="450">

        <StackPanel Margin="20" Spacing="12">

        <TextBlock Text="Mes notes"
                   FontSize="26"
                   FontWeight="Bold" />

        <TextBox x:Name="NoteTextBox"
                 Text="{Binding NewNoteText, Mode=TwoWay}"
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
                 ItemsSource="{Binding Manager.Notes}"
                 SelectedItem="{Binding SelectedNote, Mode=TwoWay}"
                 Height="180" />

        <Button Content="Supprimer la note sélectionnée"
                HorizontalAlignment="Stretch"
                Click="DeleteButton_Click" />

        <TextBlock x:Name="StatusText"
                   Text="{Binding StatusMessage, Mode=TwoWay}"
                   Opacity="0.7"
                   TextWrapping="Wrap" />
        <TextBlock
                   Text="{Binding Manager.NoteCount}"
                   Opacity="0.7"
                   TextWrapping="Wrap" />

    </StackPanel>

</Window>
```

## Les Commandes

- Dommage qu'on ne puisse pas directement relier les méthodes du _ViewModel_ aux
  contrôles du XAML...

- Utilisons les `ICommand` de .NET !

- `ICommand` est une interface qui correspond à ceci:

```cs
public interface ICommand
{
    event EventHandler? CanExecuteChanged;

    bool CanExecute(object? parameter);

    void Execute(object? parameter);
}
```

- On peut les lier dans le XAML:

```xml
<Button Content="Ajouter"
        Command="{Binding AddNoteCommand}" />
```

## `RelayCommand` {.code}

```cs
using System;
using System.Windows.Input;

namespace Notes;

// ICommand est une interface, il nous faut une implémentation
public class RelayCommand : ICommand
{
    private readonly Action execute;
    private readonly Func<bool>? canExecute;

    public RelayCommand(
        Action execute,
        Func<bool>? canExecute = null)
    {
        this.execute = execute;
        this.canExecute = canExecute;
    }

    public bool CanExecute(object? parameter)
    {
        return canExecute == null || canExecute();
    }

    public void Execute(object? parameter)
    {
        execute();
    }

    public event EventHandler? CanExecuteChanged;

    public void RaiseCanExecuteChanged()
    {
        CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }
}
```

## Commandes dans le _ViewModel_ {.code}

```cs
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Notes;

public class MainWindowViewModel : INotifyPropertyChanged
{
    public NoteManager Manager { get; } = new();

    // Propriétés des commandes
    public RelayCommand AddNoteCommand { get; }
    public RelayCommand DeleteSelectedNoteCommand { get; }

    private string newNoteText = "";

    public string NewNoteText
    {
        get => newNoteText;
        set
        {
            if (newNoteText == value)
                return;

            newNoteText = value;
            OnPropertyChanged();
        }
    }

    private Note? selectedNote;

    public Note? SelectedNote
    {
        get => selectedNote;
        set
        {
            if (selectedNote == value)
                return;

            selectedNote = value;
            OnPropertyChanged();
            // Le CanExecute de la commande DeleteSelectedNoteCommand
            // doit être réévalué
            DeleteSelectedNoteCommand.RaiseCanExecuteChanged();
        }
    }

    private string statusMessage = "Prêt.";

    public string StatusMessage
    {
        get => statusMessage;
        set
        {
            if (statusMessage == value)
                return;

            statusMessage = value;
            OnPropertyChanged();
        }
    }

    public MainWindowViewModel()
    {
        // Initialisation des commandes
        AddNoteCommand = new RelayCommand(AddNote);

        DeleteSelectedNoteCommand = new RelayCommand(
            DeleteSelectedNote,
            () => SelectedNote != null);
    }

    public void AddNote()
    {
        if (string.IsNullOrWhiteSpace(NewNoteText))
        {
            StatusMessage = "Veuillez saisir une note.";
            return;
        }

        Manager.Add(NewNoteText);

        NewNoteText = "";
        StatusMessage = "Note ajoutée.";
    }

    public void DeleteSelectedNote()
    {
        if (SelectedNote == null)
        {
            StatusMessage = "Veuillez sélectionner une note.";
            return;
        }

        Manager.Remove(SelectedNote);
        SelectedNote = null;
        StatusMessage = "Tâche supprimée.";
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected void OnPropertyChanged(
        [CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(
            this,
            new PropertyChangedEventArgs(propertyName));
    }
}
```

## Distinction importante

- `AddNote()` est une méthode qui exécute une opération.
- `AddNoteCommand` est un objet qui représente cette action pour l'interface,
  avec la possibilité de déterminer si elle est autorisée.

## Commandes dans la `MainWindow`

- Le XAML

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="using:Notes"
        mc:Ignorable="d" d:DesignWidth="350" d:DesignHeight="200"
        x:Class="Notes.MainWindow"
        x:DataType="local:MainWindowViewModel"
        Title="Mes notes"
        Width="400"
        Height="450">

        <StackPanel Margin="20" Spacing="12">

        <TextBlock Text="Mes notes"
                   FontSize="26"
                   FontWeight="Bold" />

        <TextBox x:Name="NoteTextBox"
                 Text="{Binding NewNoteText, Mode=TwoWay}"
                 PlaceholderText="Saisissez une note..."
                 AcceptsReturn="False" />

        <Button Content="Ajouter"
                HorizontalAlignment="Stretch"
                Command="{Binding AddNoteCommand}" />

        <TextBlock Text="Liste des notes"
                   FontSize="18"
                   FontWeight="SemiBold"
                   Margin="0,10,0,0" />

        <ListBox x:Name="NotesList"
                 ItemsSource="{Binding Manager.Notes}"
                 SelectedItem="{Binding SelectedNote, Mode=TwoWay}"
                 Height="180" />

        <Button Content="Supprimer la note sélectionnée"
                HorizontalAlignment="Stretch"
                Command="{Binding DeleteSelectedNoteCommand}" />

        <TextBlock x:Name="StatusText"
                   Text="{Binding StatusMessage, Mode=TwoWay}"
                   Opacity="0.7"
                   TextWrapping="Wrap" />
        <TextBlock
                   Text="{Binding Manager.NoteCount}"
                   Opacity="0.7"
                   TextWrapping="Wrap" />

    </StackPanel>

</Window>
```

- Le C\#

```cs
using Avalonia.Controls;

namespace Notes;

public partial class MainWindow : Window
{
    private readonly MainWindowViewModel viewModel = new();
    public MainWindow()
    {
        InitializeComponent();

        DataContext = viewModel;
    }

    // C'est devenu super vide
}
```

## Le pattern MVVM

- Model View ViewModel
- Pattern d'architecture software
- 3 parties:
  - **Model**: stocke et gère les données, ne connait rien de la _View_ ou du
    _ViewModel_
  - **View**: représente l'interface utilisateur, interagit avec le _ViewModel_
  - **ViewModel**: est entre le _Model_ et la _View_, ne connait rien de la
    _View_, interagit avec le _Model_

```plantuml {.build}
skinparam defaultFontSize 20
actor User
participant View
participant ViewModel
participant Model

User -> View: édite une valeur
activate View
View -> ViewModel: envoie une commande
activate ViewModel
ViewModel -> Model: met à jour
deactivate View
activate Model
ViewModel -> View: notifie
deactivate ViewModel
deactivate Model
activate View
View -> User: affiche données à jour
deactivate View
```

## `CommunityToolkit.Mvvm`

- Les `INotifyPropertyChanged` et les `ICommand`, c'est un peu lourd quand
  même...
- Il existe des packages pour nous simplifier la vies

```terminal
dotnet add package CommunityToolkit.Mvvm
```

## `MainWindowViewModel` avec `CommunityToolkit.Mvvm` {.code}

```cs
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace Notes;

// La classe doit être partial
public partial class MainWindowViewModel : ObservableObject
{
    public NoteManager Manager { get; } = new();

    // La propriété publique observable sera générée automatiquement
    [ObservableProperty]
    private string newNoteText = "";

    // Cette propriété doit notifier que le CanExecute
    // de DeleteSelectedNoteCommand doit être réévalué
    [ObservableProperty]
    [NotifyCanExecuteChangedFor(nameof(DeleteSelectedNoteCommand))]
    private Note? selectedNote;

    [ObservableProperty]
    private string statusMessage = "Prêt.";

    // On peut supprimer notre implémentation de RelayCommand
    // car il existe déjà dans CommunityToolkit.Mvvm
    // La création de la commande sera faite automatiquement
    [RelayCommand]
    public void AddNote()
    {
        if (string.IsNullOrWhiteSpace(NewNoteText))
        {
            StatusMessage = "Veuillez saisir une note.";
            return;
        }

        Manager.Add(NewNoteText);

        NewNoteText = "";
        StatusMessage = "Note ajoutée.";
    }

    private bool CanDeleteNote() => SelectedNote != null;

    // Ici avec un CanExecute
    [RelayCommand (CanExecute = nameof(CanDeleteNote))]
    public void DeleteSelectedNote()
    {
        if (SelectedNote == null)
        {
            StatusMessage = "Veuillez sélectionner une note.";
            return;
        }

        Manager.Remove(SelectedNote);
        SelectedNote = null;
        StatusMessage = "Tâche supprimée.";
    }
}

```

## `NoteManager` avec `CommunityToolkit.Mvvm` {.code}

```cs
using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;

namespace demo;

public partial class NoteManager  : ObservableObject
{
    private ObservableCollection<Note> notes { get; } = new();

    public ReadOnlyObservableCollection<Note> Notes { get; }

    public int NoteCount
    {
        get
        {
            return Notes.Count;
        }
    }

    public NoteManager()
    {
        Notes = new ReadOnlyObservableCollection<Note>(notes);

        // Subscription to the change of the collection
        notes.CollectionChanged += (_, _) =>
        {
            OnPropertyChanged(nameof(NoteCount));
        };
    }

    public void Add(string text)
    {
        notes.Add(new Note(text));
    }

    public void Remove(Note note) {
        notes.Remove(note);
    }
}
```
