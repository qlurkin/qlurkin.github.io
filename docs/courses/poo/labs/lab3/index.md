---
title: PO3L - Labo 3
subtitle: Avalonia UI, XAML et Bindings
css: style.css
---

## Application de gestion de tâches

Vous devez développer une application de bureau permettant à un utilisateur de
gérer une liste de tâches à réaliser.

L'utilisateur doit pouvoir ajouter une tâche, consulter les tâches existantes,
marquer une tâche comme terminée et supprimer une tâche.

L'interface sera développée avec **Avalonia UI** et **XAML**. Les données et les
règles métier devront être **séparées de l'interface graphique**. Les
modifications des données devront être **répercutées automatiquement** dans
l'interface grâce aux mécanismes de **binding d'Avalonia**.

## Fonctionnalités attendues

L'application doit proposer les fonctionnalités suivantes :

- **Ajouter une tâche** : l'utilisateur saisit son intitulé et clique sur un
  bouton "Ajouter".
- **Afficher les tâches** : les tâches sont présentées dans une liste.
- **Terminer une tâche** : l'utilisateur peut indiquer qu'une tâche est
  terminée.
- **Supprimer une tâche** : l'utilisateur sélectionne une tâche et clique sur un
  bouton "Supprimer".
- **Afficher le nombre de tâches** : l'interface indique le nombre total de
  tâches enregistrées.
- **Actualiser automatiquement l'interface** : lorsqu'une donnée change,
  l'interface doit refléter ce changement sans devoir reconstruire manuellement
  la liste.

## Remarques

- Démarrer votre projet avec le template `Avalonia .NET App`
- Les `ListBox` peuvent définir un
  [`DataTemplate` dans leur `ItemTemplate`](https://docs.avaloniaui.net/docs/data-templates/introduction-to-data-templates)
  pour définir comment un _Item_ doit être affiché
- Une `CheckBox` peut utiliser un _Binding_ en mode `TwoWay` pour que la
  synchronisation avec le DataContext se fasse dans les deux sens:

  ```xml
  <CheckBox IsChecked="{Binding IsCompleted, Mode=TwoWay}" />
  ```

## Extensions facultatives

- Ajouter un compteur distinct pour les tâches terminées.
- Permettre de modifier l'intitulé d'une tâche.
- Ajouter un filtre permettant d'afficher toutes les tâches, uniquement les
  tâches en cours ou uniquement les tâches terminées.
