---
lang: en
title: Cours 7 - Principes SOLID (2)
viewport: width=device-width, initial-scale=1.0
---

::: section
# PO3T - programmation Orientée Objets [Cours 7 - Principes SOLID (2)]{.small}

Quentin Lurkin
:::

::: section
## SOLID

-   **Cinq principes** en design d'applications avec l'orienté objet
-   Permet une application plus facilement **maintenable**
-   Les cinq principes à retenir avec l'acronyme SOLID
    -   [S]{.letter}ingle Responsibility Principle (SRP)
    -   [O]{.letter}pen/closed principle (OCP)
    -   [L]{.letter}iskov Substitution Principle (LSP)
    -   [I]{.letter}nterface Segregation Principle (ISP)
    -   [D]{.letter}ependency Inversion Principle (DIP)
:::

::: section
# Interface Segregation Principle
:::

::: section
## Application Exemple

-   Ajout: authentification à 2 facteurs

-   Ajout de la méthode nécessaire à `PaymentProcessor`

    ``` lang-csharp
                        namespace solid {
                            interface PaymentProcessor {
                                void Auth_sms(string code);   // Nouvelle méthode
                                void Pay(Order order);
                            }
                        }
                    
    ```

-   Besoin de modifier les sous-classes
:::

::: {.section .code}
## PaypalPaymentProcessor

``` lang-csharp
            namespace solid {
                class PaypalPaymentProcessor : PaymentProcessor {
                    private String email;
                    private bool verified;
            
                    public PaypalPaymentProcessor(String email) {
                        this.email = email;
                        verified = false;
                    }
            
                    public void Auth_sms(string code) {
                        Console.WriteLine("Verifying SMS code: {0}", code);
                        verified = true;
                    }
            
                    public void Pay(Order order) {
                        if(!verified) {
                            throw new System.Exception("Not authorized");
                        }
                        Console.WriteLine("Processing Paypal Payment");
                        Console.WriteLine("Verifying Email Address: {0}", email);
                        order.Status = Order.OrderStatus.Paid;
                    }
                }
            }
        
```
:::

::: {.section .code}
## DebitPaymentProcessor

``` lang-csharp
            namespace solid {
                class DebitPaymentProcessor : PaymentProcessor {
                    private String security_code;
                    private bool verified;
            
                    public DebitPaymentProcessor(string security_code) {
                        this.security_code = security_code;
                        verified = false;
                    }
            
                    public void Auth_sms(string code) {
                        Console.WriteLine("Verifying SMS code: {0}", code);
                        verified = true;
                    }
                    
                    public void Pay(Order order) {
                        if(!verified) {
                            throw new System.Exception("Not authorized");
                        }
                        Console.WriteLine("Processing Debit Payment");
                        Console.WriteLine("Verifying Security Code: {0}", security_code);
                        order.Status = Order.OrderStatus.Paid;
                    }
                }
            }
        
```
:::

::: {.section .code}
## CreditPaymentProcessor

``` lang-csharp
            namespace solid {
                class CreditPaymentProcessor : PaymentProcessor {
                    private String security_code;
            
                    public CreditPaymentProcessor(string security_code) {
                        this.security_code = security_code;
                    }
            
                    // Ce type de paiements ne supporte pas l'autorisation par SMS 
                    public void Auth_sms(string code) {
                        throw new System.Exception("Credit card payments don't support SMS code authorization");
                    }
            
                    public void Pay(Order order) {
                        Console.WriteLine("Processing Credit Payment");
                        Console.WriteLine("Verifying Security Code: {0}", security_code);
                        order.Status = Order.OrderStatus.Paid;
                    }
                }
            }
        
```
:::

::: section
## Le problème

-   L\'interface `PaymentProcessor` nous oblige à implémenter une
    méthode `Auth_sms` dans `CreditPaymentProcessor.`
-   Cette méthode n\'a pas de raison d\'exister. Il faut donc inventer
    quelque chose.
-   Il y a ici une violation du LSP.
:::

::: section
## Interface Segregation Principle

-   Éviter les grosses interfaces généralistes
-   Ne pas forcer à implémenter des méthode inutile.
-   On evite comme ça d\'introduire du couplage inutile.
-   Le respect du SCP aide à naturellement à valider l\'ISP
:::

::: section
## Solution

-   Creation d\'une classe `SMSAuthorizer`
-   Ajout d\'un `SMSAuthorizer` aux classes **qui en ont besoin**
:::

::: {.section .code}
## SMSAuthorizer

``` lang-csharp
            namespace solid {
                class SMSAuthorizer {
                    private bool authorized;
            
                    public SMSAuthorizer() {
                        authorized = false;
                    }
            
                    public void Verify(string code) {
                        Console.WriteLine("Verifying SMS code: {0}", code);
                        authorized = true;
                    }
            
                    public bool Authorized {
                        get { return authorized; }
                    }
                }
            }
        
```
:::

::: {.section .code}
## PaymentProcessor

``` lang-csharp
            namespace solid {
                // Disparition de la méthode d’autorisation
                interface PaymentProcessor {
                    void Pay(Order order);
                }
            }
        
```
:::

::: {.section .code}
## PaypalPaymentProcessor

``` lang-csharp
            namespace solid {
                class PaypalPaymentProcessor : PaymentProcessor {
                    private String email;
                    private SMSAuthorizer authorizer;
            
                    public PaypalPaymentProcessor(String email, SMSAuthorizer authorizer) {
                        this.authorizer = authorizer;
                        this.email = email;
                    }
            
                    public void Pay(Order order) {
                        if(!authorizer.Authorized) {
                            throw new System.Exception("Not authorized");
                        }
                        Console.WriteLine("Processing Paypal Payment");
                        Console.WriteLine("Verifying Email Address: {0}", email);
                        order.Status = Order.OrderStatus.Paid;
                    }
                }
            }
        
```
:::

::: {.section .code}
## DebitPaymentProcessor

``` lang-csharp
            namespace solid {
                class DebitPaymentProcessor : PaymentProcessor {
                    private String security_code;
                    private SMSAuthorizer authorizer;
            
                    public DebitPaymentProcessor(string security_code, SMSAuthorizer authorizer) {
                        this.authorizer = authorizer;
                        this.security_code = security_code;
                    }
                    
                    public void Pay(Order order) {
                        if(!authorizer.Authorized) {
                            throw new System.Exception("Not authorized");
                        }
                        Console.WriteLine("Processing Debit Payment");
                        Console.WriteLine("Verifying Security Code: {0}", security_code);
                        order.Status = Order.OrderStatus.Paid;
                    }
                }
            }
        
```
:::

::: {.section .code}
## CreditPaymentProcessor

``` lang-csharp
            namespace solid {
                // Pas d'authorizer ici :-)
                class CreditPaymentProcessor : PaymentProcessor {
                    private String security_code;
            
                    public CreditPaymentProcessor(string security_code) {
                        this.security_code = security_code;
                    }
            
                    public void Pay(Order order) {
                        Console.WriteLine("Processing Credit Payment");
                        Console.WriteLine("Verifying Security Code: {0}", security_code);
                        order.Status = Order.OrderStatus.Paid;
                    }
                }
            }
        
```
:::

::: section
## Utilisation

``` lang-csharp
            namespace solid {
                class Program {
                    public static void Main() {
                        Order order = new Order();
            
                        order.Add_item(new Item("Keyboard", 50), 1);
                        order.Add_item(new Item("SSD", 150), 1);
                        order.Add_item(new Item("USB Cable", 2), 5);
            
                        Console.WriteLine(order.Total_price());
            
                        SMSAuthorizer authorizer = new SMSAuthorizer();
                        PaymentProcessor processor =  new PaypalPaymentProcessor("lur@ecam.be", authorizer);
                        authorizer.Verify("4269");
                        processor.Pay(order);
                        Console.WriteLine(order.Status);
                    }
                }
            }
        
```

``` terminal
            $> dotnet run
            210
            Verifying SMS code: 4269
            Processing Paypal Payment
            Verifying Email Address: lur@ecam.be
            Paid
        
```
:::

::: section
# Dependency Inversion Principle
:::

::: section
## Dependency Inversion Principle

-   On en devrait dépendre que de classe abstraite

-   Cela aide à maintenir l\'OCP

-   Problème dans l\'application exemple: `DebitPaymentProcessor` et
    `PaypalPaymentProcessor` dépendent de la classe concrète
    `SMSAuthorizer`

-   Solution: création d\'une interface `Authorizer`

    ``` lang-csharp
                        namespace solid {
                            interface Authorizer {
                                bool Authorized { get; }
                            }
                        }
                    
    ```
:::

::: {.section .code}
## SMSAuthorizer

``` lang-csharp
            namespace solid {
                class SMSAuthorizer : Authorizer {
                    private bool authorized;
            
                    public SMSAuthorizer() {
                        authorized = false;
                    }
            
                    public void Verify(string code) {
                        Console.WriteLine("Verifying SMS code: {0}", code);
                        authorized = true;
                    }
            
                    public bool Authorized {
                        get { return authorized; }
                    }
                }
            }
        
```
:::

::: {.section .code}
## PaypalPaymentProcessor

``` lang-csharp
            namespace solid {
                class PaypalPaymentProcessor : PaymentProcessor {
                    private String email;
                    private Authorizer authorizer;
            
                    public PaypalPaymentProcessor(String email, Authorizer authorizer) {
                        this.authorizer = authorizer;
                        this.email = email;
                    }
            
                    public void Pay(Order order) {
                        if(!authorizer.Authorized) {
                            throw new System.Exception("Not authorized");
                        }
                        Console.WriteLine("Processing Paypal Payment");
                        Console.WriteLine("Verifying Email Address: {0}", email);
                        order.Status = Order.OrderStatus.Paid;
                    }
                }
            }
        
```
:::

::: {.section .code}
## DebitPaymentProcessor

``` lang-csharp
            namespace solid {
                class DebitPaymentProcessor : PaymentProcessor {
                    private String security_code;
                    private Authorizer authorizer;
            
                    public DebitPaymentProcessor(string security_code, Authorizer authorizer) {
                        this.authorizer = authorizer;
                        this.security_code = security_code;
                    }
                    
                    public void Pay(Order order) {
                        if(!authorizer.Authorized) {
                            throw new System.Exception("Not authorized");
                        }
                        Console.WriteLine("Processing Debit Payment");
                        Console.WriteLine("Verifying Security Code: {0}", security_code);
                        order.Status = Order.OrderStatus.Paid;
                    }
                }
            }
        
```
:::

::: {.section .code}
## NotRobotAuthorizer

-   On peut créer d\'autres `Authorizer`

``` lang-csharp
            namespace solid {
                class NotRobotAuthorizer : Authorizer {
                    private bool authorized;
            
                    public NotRobotAuthorizer() {
                        authorized = false;
                    }
            
                    public void Turing_test() {
                        Console.WriteLine("Are you a Robot ? Naaaa...");
                        authorized = true;
                    }
            
                    public bool Authorized {
                        get { return authorized; }
                    }
                }
            }
        
```
:::

::: section
## Utilisation

``` lang-csharp
            namespace solid {
                class Program {
                    public static void Main() {
                        Order order = new Order();
            
                        order.Add_item(new Item("Keyboard", 50), 1);
                        order.Add_item(new Item("SSD", 150), 1);
                        order.Add_item(new Item("USB Cable", 2), 5);
            
                        Console.WriteLine(order.Total_price());
            
                        NotRobotAuthorizer authorizer = new NotRobotAuthorizer();
                        PaymentProcessor processor =  new PaypalPaymentProcessor("lur@ecam.be", authorizer);
                        authorizer.Turing_test();
                        processor.Pay(order);
                        Console.WriteLine(order.Status);
                    }
                }
            }
        
```

``` terminal
            $> dotnet run
            210
            Are you a Robot ? Naaaa...
            Processing Paypal Payment
            Verifying Email Address: lur@ecam.be
            Paid
        
```
:::

::: section
# Principes STUPID
:::

::: section
## STUPID

-   Les six principes à retenir avec l'acronyme **STUPID**
    -   [S]{.letter}ingleton
    -   [T]{.letter}ight Coupling
    -   [U]{.letter}ntestability
    -   [P]{.letter}remature Optimization
    -   [I]{.letter}ndescriptive Naming
    -   [D]{.letter}uplication
:::

::: section
# Singleton
:::

::: section
## Singleton

-   Singleton parfois considéré comme un anti-pattern [Pas un problème
    en soi, mais symptôme d'éventuels problèmes]{.small}
-   Deux majeures difficultés avec le singleton
    -   Difficulté à tester un programme avec un état global
    -   Dépendances cachées
:::

::: section
# Tight Coupling
:::

::: section
## Tight Coupling

-   Le couplage fort est à éviter
-   On le dit depuis le premier cours
-   Très difficile à réutiliser, et aussi à tester
-   Changer un module ne doit pas nécessiter d'en changer d'autres
:::

::: section
# Untestability
:::

::: section
## Untestability

-   Tester un programme ne doit pas être difficile
-   Code fortement couplé très difficile à tester
:::

::: section
# Premature Optimization
:::

::: section
## Premature Optimization

« Premature optimization is the root of all evil. » --- Sir Tony Hoare

-   Optimiser à l'avance n'aura que des coûts, aucun bénéfice
    -   Plus complexe
    -   Plus lent à développer
    -   Plus de chance de faire des erreurs
    -   Keep It Simple, Stupid (KISS)
-   Deux règles de l'optimisation d'un programme :
    1.  Don't do it
    2.  (for experts only !) Don't do it yet.
:::

::: section
# Indescriptive Naming
:::

::: section
## Indescriptive Naming

-   Noms appropriés pour classes, méthodes, attributs, variables\... [Et
    ne pas faire d'abréviations !]{.small}
-   Les langages de programmation sont pour les humains [On ne code pas
    pour l'ordinateur, il ne comprend que les 0 et 1\...]{.small}
:::

::: section
# Duplication
:::

::: section
## Duplication

-   Be lazy the right way - write code only once ! [Don't Repeat
    Yourself (DRY)]{.small}
-   Attention à tous les types de duplications [De code, de données, de
    logique, de design\...]{.small}
:::

::: section
## Crédit

-   <https://www.youtube.com/watch?v=pTB30aXS77U>
:::