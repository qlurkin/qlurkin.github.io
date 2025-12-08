---
title: Navigation Avalonia
---

## Introduction

Ce tutoriel vous guidera à travers les étapes de création d'une application de
bureau moderne avec [Avalonia UI](https://avaloniaui.net/) en utilisant le
pattern d'architecture **MVVM (Model-View-ViewModel)**.

Nous allons créer une application simple avec deux écrans ("Accueil" et
"Paramètres") et mettre en place un système de navigation complet :

1. Un menu principal pour changer d'écran.
2. Un bouton dans un écran pour naviguer vers un autre.

## Initialisation du Projet

### Prérequis{.nocount}

Assurez-vous d'avoir le SDK .NET installé.

1. **Installer les templates Avalonia :**

   ```terminal
   dotnet new install Avalonia.Templates
   ```

2. **Créer un nouveau projet Avalonia :**

   ```terminal
   dotnet new avalonia.app -o ChessDB
   cd ChessDB
   ```

3. **Ajouter le MVVM Toolkit :** Cette bibliothèque simplifie grandement
   l'implémentation de MVVM.

   ```terminal
   dotnet add package CommunityToolkit.Mvvm
   ```

## L'Architecture de Base (`Views` & `ViewModels`)

L'idée de MVVM est de séparer la logique (`ViewModel`) de l'interface
utilisateur (`View`).

### Créer la structure des dossiers

Pour garder notre projet organisé, créons deux dossiers :

- `Views/` : pour nos écrans (`UserControl`).
- `ViewModels/` : pour la logique de nos écrans.

```terminal
mkdir -p Views ViewModels
```

### Créer le `ViewModelBase`

Tous nos ViewModels hériteront d'une classe de base qui implémente
`INotifyPropertyChanged`. `ObservableObject` du MVVM Toolkit s'en charge pour
nous.

Créez `ViewModels/ViewModelBase.cs` :

```csharp
// ViewModels/ViewModelBase.cs
using CommunityToolkit.Mvvm.ComponentModel;

namespace ChessDB.ViewModels;

public class ViewModelBase : ObservableObject
{
}
```

### Créer les ViewModels des écrans

Créez `ViewModels/HomeViewModel.cs` et `ViewModels/SettingsViewModel.cs`.

```csharp
// ViewModels/HomeViewModel.cs
namespace ChessDB.ViewModels;

public class HomeViewModel : ViewModelBase
{
    public string Greeting => "Bienvenue sur l'écran d'accueil !";
}
```

```csharp
// ViewModels/SettingsViewModel.cs
namespace ChessDB.ViewModels;

public class SettingsViewModel : ViewModelBase
{
    public string InfoText => "Ceci est la page des paramètres.";
}
```

### Créer les Vues

Maintenant, créons les `UserControl` qui seront l'interface de nos ViewModels.

Créez `Views/HomeView.axaml` et son code-behind `Views/HomeView.axaml.cs`.

```xml
<!-- Views/HomeView.axaml -->
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:ChessDB.ViewModels"
             x:Class="ChessDB.Views.HomeView"
             x:DataType="vm:HomeViewModel">
  <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center">
    <TextBlock Text="{Binding Greeting}" FontSize="24" FontWeight="Bold"/>
  </StackPanel>
</UserControl>
```

```csharp
// Views/HomeView.axaml.cs
using Avalonia.Controls;

namespace ChessDB.Views;

public partial class HomeView : UserControl
{
    public HomeView()
    {
        InitializeComponent();
    }
}
```

Faites de même pour `Views/SettingsView.axaml`.

```xml
<!-- Views/SettingsView.axaml -->
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:ChessDB.ViewModels"
             x:Class="ChessDB.Views.SettingsView"
             x:DataType="vm:SettingsViewModel">
  <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center" Spacing="10">
    <TextBlock Text="{Binding InfoText}" FontSize="20"/>
    <CheckBox Content="Activer une option"/>
  </StackPanel>
</UserControl>
```

```csharp
// Views/SettingsView.axaml.cs
using Avalonia.Controls;

namespace ChessDB.Views;

public partial class SettingsView : UserControl
{
    public SettingsView()
    {
        InitializeComponent();
    }
}
```

## Mettre en Place la Navigation Principale

### Le "Chef d'Orchestre" : `MainWindowViewModel`

Ce ViewModel principal contiendra une référence à l'écran actuellement affiché.

Créez `ViewModels/MainWindowViewModel.cs` :

```csharp
// ViewModels/MainWindowViewModel.cs
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace ChessDB.ViewModels;

public partial class MainWindowViewModel : ViewModelBase
{
    [ObservableProperty]
    private ViewModelBase _currentViewModel;

    private readonly HomeViewModel _homeViewModel;
    private readonly SettingsViewModel _settingsViewModel;

    public MainWindowViewModel()
    {
        _homeViewModel = new HomeViewModel();
        _settingsViewModel = new SettingsViewModel();
        _currentViewModel = _homeViewModel; // Écran par défaut
    }

    [RelayCommand]
    private void NavigateToHome()
    {
        CurrentViewModel = _homeViewModel;
    }

    [RelayCommand]
    private void NavigateToSettings()
    {
        CurrentViewModel = _settingsViewModel;
    }
}
```

### La Fenêtre Principale (`MainWindow`)

Nous allons modifier `MainWindow.axaml` pour qu'elle contienne le menu et une
zone (`ContentControl`) qui affichera la vue active.

Modifiez `Views/MainWindow.axaml` :

```xml
<!-- Views/MainWindow.axaml -->
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ChessDB.ViewModels"
        x:Class="ChessDB.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Title="ChessDB">

    <DockPanel>
      <!-- Menu de Navigation -->
      <StackPanel DockPanel.Dock="Left" Width="150" Spacing="5">
        <Button Content="Accueil" Command="{Binding NavigateToHomeCommand}" Margin="5"/>
        <Button Content="Paramètres" Command="{Binding NavigateToSettingsCommand}" Margin="5"/>
      </StackPanel>

      <!-- Zone de contenu principale -->
      <ContentControl Content="{Binding CurrentViewModel}" Margin="10"/>
    </DockPanel>
</Window>
```

Et son code-behind `Views/MainWindow.axaml.cs` pour lier le `DataContext`.

```csharp
// Views/MainWindow.axaml.cs
using Avalonia.Controls;
using ChessDB.ViewModels;

namespace ChessDB.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        DataContext = new MainWindowViewModel();
    }
}
```

_Note : Nous déplacerons plus tard l'instanciation du ViewModel pour la gestion
du Messenger._

### Le `ViewLocator` : La Colle Magique

Comment `ContentControl` sait-il quelle Vue afficher pour un ViewModel donné ?
Grâce au `ViewLocator`.

Créez `ViewLocator.cs` à la racine du projet :

```csharp
// ViewLocator.cs
using System;
using Avalonia.Controls;
using Avalonia.Controls.Templates;
using ChessDB.ViewModels;

namespace ChessDB;

public class ViewLocator : IDataTemplate
{
    public Control Build(object? data)
    {
        if (data is null)
            return new TextBlock { Text = "data was null" };

        var name = data.GetType().FullName!.Replace("ViewModel", "View");
        var type = Type.GetType(name);

        if (type != null)
        {
            return (Control)Activator.CreateInstance(type)!;
        }

        return new TextBlock { Text = "Not Found: " + name };
    }

    public bool Match(object? data)
    {
        return data is ViewModelBase;
    }
}
```

### Enregistrer le `ViewLocator`

Enfin, déclarez le `ViewLocator` dans `App.axaml`.

```xml
<!-- App.axaml -->
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="using:ChessDB"
             x:Class="ChessDB.App"
             RequestedThemeVariant="Default">

    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>

    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

À ce stade, l'application est fonctionnelle avec une navigation par menu !

## Navigation depuis une Vue Enfant

Pour déclencher une navigation depuis un bouton situé dans `HomeView`, nous ne
pouvons pas appeler directement une méthode de `MainWindowViewModel`. Nous
utiliserons un **Messenger** pour une communication découplée.

### Créer un dossier et un message de navigation

Créez le dossier `Messages`.

```terminal
mkdir -p Messages
```

Créez `Messages/NavigationMessage.cs`. Ce message transportera la "cible" de
notre navigation.

```csharp
// Messages/NavigationMessage.cs
using CommunityToolkit.Mvvm.Messaging.Messages;
using ChessDB.ViewModels;

namespace ChessDB.Messages;

public class NavigationMessage : ValueChangedMessage<ViewModelBase>
{
    public NavigationMessage(ViewModelBase viewModel) : base(viewModel)
    {
    }
}
```

### Mettre à jour le `MainWindowViewModel` (le Receveur)

Il doit maintenant écouter les `NavigationMessage`. Pour que le système soit
cohérent, ses propres boutons de menu utiliseront aussi le messenger.

Modifiez `ViewModels/MainWindowViewModel.cs` :

```csharp
// ViewModels/MainWindowViewModel.cs
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using ChessDB.Messages;

namespace ChessDB.ViewModels;

public partial class MainWindowViewModel : ViewModelBase, IRecipient<NavigationMessage>
{
    [ObservableProperty]
    private ViewModelBase _currentViewModel;

    private readonly HomeViewModel _homeViewModel;
    private readonly SettingsViewModel _settingsViewModel;
    private readonly IMessenger _messenger;

    public MainWindowViewModel(IMessenger messenger)
    {
        _messenger = messenger;
        _messenger.Register<NavigationMessage>(this); // S'abonner aux messages

        // Passer le messenger aux ViewModels qui en ont besoin
        _homeViewModel = new HomeViewModel(_messenger);
        _settingsViewModel = new SettingsViewModel();

        _currentViewModel = _homeViewModel;
    }

    // Méthode appelée quand un NavigationMessage est reçu
    public void Receive(NavigationMessage message)
    {
        CurrentViewModel = message.Value;
    }

    [RelayCommand]
    private void NavigateToHome()
    {
        _messenger.Send(new NavigationMessage(_homeViewModel));
    }

    [RelayCommand]
    private void NavigateToSettings()
    {
        _messenger.Send(new NavigationMessage(_settingsViewModel));
    }
}
```

### Mettre à jour l'instanciation du `MainWindowViewModel`

Nous devons maintenant fournir une instance du messenger. Mettons à jour
`Views/MainWindow.axaml.cs` pour utiliser l'instance par défaut.

```csharp
// Views/MainWindow.axaml.cs
using Avalonia.Controls;
using ChessDB.ViewModels;
using CommunityToolkit.Mvvm.Messaging; // N'oubliez pas ce using

namespace ChessDB.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        // On passe l'instance par défaut du messenger au ViewModel principal
        DataContext = new MainWindowViewModel(WeakReferenceMessenger.Default);
    }
}
```

### Mettre à jour le `HomeViewModel` (l'Envoyeur)

Il doit maintenant pouvoir envoyer un message.

Modifiez `ViewModels/HomeViewModel.cs` :

```csharp
// ViewModels/HomeViewModel.cs
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using ChessDB.Messages;

namespace ChessDB.ViewModels;

public partial class HomeViewModel : ViewModelBase
{
    private readonly IMessenger _messenger;

    public string Greeting => "Bienvenue sur l'écran d'accueil !";

    public HomeViewModel(IMessenger messenger)
    {
        _messenger = messenger;
    }

    [RelayCommand]
    private void NavigateToSettings()
    {
        // Envoi d'un message demandant la navigation
        _messenger.Send(new NavigationMessage(new SettingsViewModel()));
    }
}
```

### Ajouter le bouton dans la `HomeView`

Enfin, ajoutons le bouton dans `Views/HomeView.axaml`.

```xml
<!-- Views/HomeView.axaml -->
<UserControl ...>
  <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center" Spacing="20">
    <TextBlock Text="{Binding Greeting}" FontSize="24" FontWeight="Bold"/>
    <Button Content="Aller aux Paramètres" Command="{Binding NavigateToSettingsCommand}"/>
  </StackPanel>
</UserControl>
```

## Conclusion et Exécution

Vous avez maintenant une application Avalonia structurée en MVVM avec deux types
de navigation découplée !

Pour lancer l'application, exécutez simplement :

```terminal
dotnet run
```

Vous pouvez maintenant naviguer en utilisant le menu principal, ou le bouton sur
la page d'accueil.

## Crédits

- **LUR** & **Gemini CLI 0.19.1**
