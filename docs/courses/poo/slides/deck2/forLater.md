## Visibilité protégée

- Membre protégé public pour les sous-classes, privé ailleurs [Privé
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

- Membre protégé hérité accessible uniquement par this [Hérité dans la
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

## Quels sont les accès autorisés et ceux interdits ?{.code}

```cs
B b = new B (42);
b.a.Method();

public class A
{
    protected int x;
    public void Method () {}
}

public class B
{
    public A a = new A();
    public B (int x)
    {
        Console.WriteLine (a.x);
    }
}
```

## Restriction de visibilité

- Sous-classe pas plus accessible que super-classe [Même règle pour
  implémentation d'interfaces]{.small}
- Variable d'instance pas plus accessible que son type [Pareil pour
  propriété, type retour/paramètre méthode]{.small}

## Quels sont les accès autorisés et ceux interdits ? {.code}

```cs
public class Program
{
    private class A
    {
        protected int x;
        internal string y;
    }

    internal class B : A
    {
        public A a = new A();
        public B (int x)
        {
            Console.WriteLine (this.x);
            Console.WriteLine (a.y);
        }

        public A Method()
        {
            return new A();
        }
    }
}
```

## Encapsulation et héritage

- La visibilité `protected` est un défaut d\'encapsulation [`private`
  est préferable à `protected`]{.small}
