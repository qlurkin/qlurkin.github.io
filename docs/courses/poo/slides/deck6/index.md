---
title: PO3T - Cours 6
subtitle: Avalonia UI
type: deck
---

## Installation

```terminal
> dotnet new install Avalonia.Templates
```

[Extensions Éditeurs](https://avaloniaui.net/gettingstarted#installation)

## Design Pattern: Observer

- Mécanisme d'inscription d'un objet (l'observateur) aux événements d'un autre objet (l'observé)

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

## Le pattern MVVM

- Model View ViewModel
- Pattern d'architecture software
- 3 parties:
  - **Model**: stocke et gère les données, ne connait rien de la _View_ ou du _ViewModel_
  - **View**: représente l'interface utilisateur, interagit avec le _ViewModel_
  - **ViewModel**: est entre le _Model_ et la _View_, ne connait rien de la _View_, interagit avec le _Model_

```plantuml {.build}
skinparam defaultFontSize 20
actor User
participant View
participant ViewModel
participant Model

User -> View: édite une valeur
activate View
View -> ViewModel: `set` une propriété
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

## Tutorial

- [Todo App](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CompleteApps/SimpleToDoList)
