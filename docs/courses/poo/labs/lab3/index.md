---
title: Labo 3 - Multi-platform App User Interface (MAUI)
---

## Installation

Pour effectuer le labo, vous aurez besoin du **Workload .Net MAUI**.

Si vous utilisez Visual Studio 2022 Preview et que vous n'avez pas déjà installé ce Workload, vous pouvez l'ajouter en relançant l'installateur de Visual Studio.

Si vous utilisez la commande `dotnet`, vous pouvez ajouter le Workload avec la commande :

<pre class="terminal">
> sudo dotnet workload install maui
</pre>

Essayez de créer un nouveau projet MAUI. Dans Visual Studio 2022 Preview, il y a un template **"Application .NET MAUI"**. Avec la ligne de commande, vous pouvez utiliser la commande :

<pre class="terminal">
> dotnet new maui -n "Labo2"
</pre>

L'application par défaut ressemble à ceci:

<figure>
    <img src="./MAUI_default.png">
</figure>

## Enoncé

Suivez le tutoriel suivant pour créer une application de notes :

[https://learn.microsoft.com/fr-be/dotnet/maui/tutorials/notes-app/](https://learn.microsoft.com/fr-be/dotnet/maui/tutorials/notes-app/)

Pas besoin de compiler pour Android ni de lancer sur l'émulateur Android.

**N'hésitez surtout pas à poser vos questions !**

<!-- ## Les fichiers

```plaintext
 📦 Labo2
 ┣ 📂 Platforms
 ┣ 📂 Properties
 ┣ 📂 Resources
 ┣ 📂 bin
 ┣ 📂 obj 
 ┣ 📜 App.xaml
 ┣ 📜 App.xaml.cs
 ┣ 📜 AppShell.xaml
 ┣ 📜 AppShell.xaml.cs
 ┣ 📜 Labo2.csproj
 ┣ 📜 MainPage.xaml
 ┣ 📜 MainPage.xaml.cs
 ┗ 📜 MauiProgram.cs
 ```

- `MauiProgram.cs` : C'est le point d'entrée de l'application

- `App.xaml` et `App.xaml.cs` : Un projet MAUI contient plusieurs fichiers XAML. A chaque fichier XAML est associé un fichier C# (`.xaml.cs`).

    Le fichier XAML contient du XML et le fichier C# contient du code pour interagir avec le XAML.

    Le XML est un langage de balisage ressemblant à de l'HTML et permettant de créer des fichiers textes structurés. Le XAML est une application particulière de l'XML qui définit les balises autorisées ainsi que leur usages.
    
    Le fichier `App.xaml` contient des ressources globale à l'application comme des couleurs, des styles et des *templates*.
    
    Le fichier `App.xaml.cs` contient le code qui instancie l'`AppShell`.

- `AppShell.xaml` and `AppShell.xaml.cs` : Ces fichiers définissent la hiérarchie visuelle de l'application.

- `MainPage.xaml` and `MainPage.xaml.cs` : Ces fichiers définissent la page d'accueil de l'application. L'interface utilisateur est définie dans le fichier XAML et le code des widgets est dans le fichier C#.

## Ajout d'une page

Ajoutons une page "A propos" à l'application.

Dans l'explorateur de solution de Visual Studio, faites un click droit sur le projet et sélectionnez **Ajouter > Nouveau Fichier**, Sélectionnez **.NET MAUI** puis **.NET MAUI ContentPage (XAML)**. Indiquez le nom du fichier en bas (AboutPage) et cliquez sur **Créer**.

Avec l'invite de commande, vous pouvez utiliser la commande suivante dans le dossier du projet :

<pre class="terminal">
> dotnet new maui-page-xaml -n "AboutPage"
</pre>

Remplacez le contenu du fichier `AboutPage.xaml` par : 

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="Labo2.AboutPage">
    <VerticalStackLayout Spacing="10" Margin="10">
        <HorizontalStackLayout Spacing="10">
            <Image Source="dotnet_bot.png"
                   SemanticProperties.Description="The dot net bot waving hello!"
                   HeightRequest="64" />
            <Label FontSize="22" FontAttributes="Bold" Text="Labo" VerticalOptions="End" />
            <Label FontSize="22" Text="2" VerticalOptions="End" />
        </HorizontalStackLayout>

        <Label Text="Cette application est écrite en XAML et C# avec .NET MAUI." />
        <Button Text="plus d'informations..." Clicked="moreInfo_Clicked" />
    </VerticalStackLayout>
</ContentPage>
```

Détaillons les différentes balises :

- `<ContentPage>`: C'est l'élément racine du document XAML.

- `<VerticalStackLayout>` : Est le fils unique de `<ContentPage>`. `<ContentPage>` ne peut avoir qu'un seul enfant. `<VerticalStackLayout>` peut avoir plusieurs enfants. Il les arrange verticalement.

- `<HorizontalStackLayout>` : La même chose que `<VerticalStackLayout>` mais horizontalement.

- `<Image>` : Affiche une image.

- `<Label>` : Affiche un texte.

- `<Button>` : Affiche un bouton. L'attribut `Clicked="moreInfo_Clicked"` indique la méthode à appeler lors du clique. Nous ne l'avons pas encore créée.

## Le gestionnaire d'événement

Ajoutez la méthode suivante au fichier `AboutPage.xaml.cs` :

```cs
private void moreInfo_Clicked(System.Object sender, System.EventArgs e)
{

}
```

Nous allons faire en sorte que le bouton ouvre une page spécifique dans le navigateur par défaut.

```cs
private async void moreInfo_Clicked(System.Object sender, System.EventArgs e)
{
    // Navigate to the specified URL in the system browser.
    await Launcher.Default.OpenAsync("https://quentin.lurkin.xyz/courses/poo/labs/lab2/index.html");
}
```

Remarquez que nous avons dû qualifier la méthode comme `async` pour pouvoir utiliser `await` à l'intérieur.

## Modification de l'`AppShell`

Nous allons ajouter des onglets à notre `AppShell`pour pouvoir naviguer d'une page à l'autre. Modifier le fichier `AppShell.xaml` comme suit :

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Shell
    x:Class="Labo2.AppShell"
    xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    xmlns:local="clr-namespace:Labo2"
    Shell.FlyoutBehavior="Disabled">

    <TabBar>
        <ShellContent
            Title="Labo 2"
            ContentTemplate="{DataTemplate local:MainPage}" />

        <ShellContent
            Title="About"
            ContentTemplate="{DataTemplate local:AboutPage}" />
    </TabBar>

</Shell>
```

## Enoncé

Coming Soon

## Crédits

- [https://learn.microsoft.com/en-us/dotnet/maui/tutorials/notes-app](https://learn.microsoft.com/en-us/dotnet/maui/tutorials/notes-app) -->

