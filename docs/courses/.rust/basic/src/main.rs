use std::io;

fn main() {
    println!("Hello, world!");

    // let mut for mutable variable
    // type is inferred
    let mut a = 5;
    a = 6;

    // let for final variable
    let b = 5;
    // b = 6

    //type can be explicit
    let c: u32 = 5;

    // Integers
    // Length  Signed  Unsigned
    // 8-bit   i8      u8
    // 16-bit  i16     u16
    // 32-bit  i32     u32
    // 64-bit  i64     u64
    // 128-bit i128    u128
    // arch    isize   usize

    // Floats
    // f32
    // f64

    // Others
    // bool
    // char

    // Tuples
    let tup: (i32, f64, u8) = (500, 6.4, 1);

    // destructuring
    let (x, y, z) = tup;

    // print formatting
    println!("The value of y is: {}", y);

    // access by index
    let five_hundred = tup.0;
    let six_point_four = tup.1;
    let one = tup.2;

    // array
    let ar = [1, 2, 3, 4, 5];
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let arr: [i32; 5] = [1, 2, 3, 4, 5];

    // equivalent to => let arra = [3, 3, 3, 3, 3];
    let arra = [3; 5];

    // access by index
    let first = ar[0];
    let second = ar[1];

    // lot of function will return a Result type which can be successful or error
    // there are multiple way to deal with Result
    // One is the expect method that return the value if the Result is Successful and crash the program with a message if there is an error
    let mut index = String::new();

    println!("Enter a number:");

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    // functions

    // types must be declared
    fn add(a: i32, b: i32) -> i32 {
        return a + b;
    }

    println!("3 + 4 = {}", add(3, 4));

    // with no return type, the return type is Unit and is an empty tuple ()
    fn hello() {
        println!("hello")
    }

    hello();

    // Block are Expression and evaluate to their last line if it has no semicolon
    let y = {
        let x = 3;
        x + 1
    };

    // function can omit the return
    fn five() -> i32 {
        5
    }

    // This is an error. The semicolon prevent the auto-return
    // fn five() -> i32 {
    //     5;
    // }

    // if
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }

    // if are expression. warning: each path must return the same type
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {}", number);

    // this is an error
    // let number = if condition { 5 } else { "six" };

    // Loops

    // infinite loop
    // loop {
    //     println!("again!");
    // }

    // you can break
    let mut i = 0;
    loop {
        println!("i = {}", i);
        if i > 4 {
            break;
        }
        i += 1;
    }

    // you can break nested loop with 'loop label'
    let mut count = 0;
    'counting_up: loop {
        println!("count = {}", count);
        let mut remaining = 10;

        loop {
            println!("remaining = {}", remaining);
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {}", count);

    // the continue keyword also exists and work the same

    // loop can return value
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {}", result);

    // while loop
    let mut number = 3;

    while number != 0 {
        println!("{}!", number);

        number -= 1;
    }

    println!("LIFTOFF!!!");

    // for loop
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {}", element);
    }

    // for with Range
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");

    // String

    // string litteral are immutable
    let s = "hello";

    // String type is mutable
    let mut s = String::from("hello");
    s.push_str(", world!");
    println!("{}", s);

    // Ownership

    // this create a copy of 5. Because integers that have a known size at compile time are stored entirely on the stack. If a type implements the Copy trait, a variable is still valid after assignment to another variable. Rust won’t let us annotate a type with Copy if the type, or any of its parts, has implemented the Drop trait. The Drop trait impose the implementation of the drop method that free memory when variable goes out of scope.
    let x = 5;
    let y = x;

    // this "move" the String
    let s1 = String::from("hello");
    let s2 = s1;

    // s1 is no longer valid
    //println!("{}, world!", s1); // error

    // we can create a copy with clone
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}, s2 = {}", s1, s2);

    // Ownership with functions

    fn takes_ownership(some_string: String) {
        // some_string comes into scope
        println!("{}", some_string);
    } // Here, some_string goes out of scope and `drop` is called. The backing
      // memory is freed.

    fn makes_copy(some_integer: i32) {
        // some_integer comes into scope
        println!("{}", some_integer);
    } // Here, some_integer goes out of scope. Nothing special happens.

    let s = String::from("hello"); // s comes into scope

    takes_ownership(s); // s's value moves into the function...
                        // ... and so is no longer valid here

    let x = 5; // x comes into scope

    makes_copy(x); // x would move into the function,
                   // but i32 is Copy, so it's okay to still
                   // use x afterward

    // function can give back the ownership
    fn takes_and_give_back_ownership(some_string: String) -> String {
        // some_string comes into scope
        println!("{}", some_string);
        some_string
    }
    let mut s = String::from("hello");
    s = takes_and_give_back_ownership(s);

    // Borrowing
    fn calculate_length(s: &String) -> usize {
        // s is a reference. it borrow ownership
        s.len()
    } // Here, s goes out of scope. But because it does not have ownership of what
      // it refers to, nothing happens.

    let s1 = String::from("hello");
    let len = calculate_length(&s1);

    // reference are immutable by default
    // we can create mutable reference
    fn change(some_string: &mut String) {
        some_string.push_str(", world");
    }
    let mut s = String::from("hello");
    change(&mut s);

    // you can have only one mutable reference to a particular piece of data at a time
    let mut s = String::from("hello");
    let r1 = &mut s;
    let r2 = &mut s;
    //println!("{}, {}", r1, r2); // error. here two mutable ref should exists

    // We also cannot have a mutable reference while we have an immutable one to the same value
    let mut s = String::from("hello");
    let r1 = &s; // no problem
    let r2 = &s; // no problem
    let r3 = &mut s; // will cause problem
                     //println!("{}, {}, and {}", r1, r2, r3); // error: mutable and immutable ref at the same time

    // no problem here
    let mut s = String::from("hello");
    let r1 = &s; // no problem
    let r2 = &s; // no problem
    println!("{} and {}", r1, r2);
    // variables r1 and r2 will not be used after this point
    let r3 = &mut s; // no problem
    println!("{}", r3);

    // Rust protect against dangling reference (that point to nothing valid)
    // fn dangle() -> &String { // dangle returns a reference to a String

    //     let s = String::from("hello"); // s is a new String

    //     &s // we return a reference to the String, s
    // } // Here, s goes out of scope, and is dropped. Its memory goes away.
    //   // Danger!

    // here no dangle
    fn no_dangle() -> String {
        let s = String::from("hello");

        s
    }

    // Recap:
    // - At any given time, you can have either one mutable reference or any number of immutable references.
    // - References must always be valid.

    // Slices
    let s = String::from("hello world");
    let hello = &s[0..5];
    let world = &s[6..11];
    let len = s.len();
    let slice = &s[3..len];
    let slice = &s[3..];
    let slice = &s[0..len];
    let slice = &s[..];

    // return a slice
    fn first_word(s: &String) -> &str {
        let bytes = s.as_bytes();

        for (i, &item) in bytes.iter().enumerate() {
            if item == b' ' {
                return &s[0..i];
            }
        }

        &s[..]
    }

    let mut s = String::from("hello world");

    let word = first_word(&s);

    //s.clear(); // error! it use a mutable ref but the immutable ref 'word' already exists

    println!("the first word is: {}", word); // 'word' used here

    // We should use string slice as input type. It accept slice and String as input
    fn better_first_word(s: &str) -> &str {
        let bytes = s.as_bytes();

        for (i, &item) in bytes.iter().enumerate() {
            if item == b' ' {
                return &s[0..i];
            }
        }

        &s[..]
    }

    //other slice
    let a = [1, 2, 3, 4, 5]; //type is &[i32]

    let slice = &a[1..3];

    assert_eq!(slice, &[2, 3]);

    // Structs

    struct User {
        active: bool,
        username: String,
        email: String,
        sign_in_count: u64,
    }

    let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");

    fn build_user(email: String, username: String) -> User {
        User {
            email: email,
            username: username,
            active: true,
            sign_in_count: 1,
        }
    }

    fn build_user_shorthand(email: String, username: String) -> User {
        User {
            email,
            username,
            active: true,
            sign_in_count: 1,
        }
    }

    // let user2 = User {
    //     active: user1.active,
    //     username: user1.username,
    //     email: String::from("another@example.com"),
    //     sign_in_count: user1.sign_in_count,
    // };

    // Same as above
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1 // the rest come from user1
    };

    // Struct Tuple
    struct Color(i32, i32, i32);
    struct Point(i32, i32, i32);

    // Unit Like Struct
    struct AlwaysEqual;

    // Add the Debug Trait to get debug print
    #[derive(Debug)]
    struct Rectangle {
        width: u32,
        height: u32,
    }

    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {:?}", rect1); // can use {:#?} to pretty print on multiple lines

    // dbg! macro to print debug information

    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale), //print and then return ownership to let the program continue
        height: 50,
    };

    dbg!(&rect1);

    // Method Syntax
    impl Rectangle {
        fn area(&self) -> u32 {
            self.width * self.height
        }
    }

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );

    // We can choose to give a method the same name as one of the struct’s fields. For example, we can define a method on Rectangle also named width
    impl Rectangle {
        fn width(&self) -> bool {
            self.width > 0
        }
    }
    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }

    // method with more parametres
    impl Rectangle {
        fn can_hold(&self, other: &Rectangle) -> bool {
            self.width > other.width && self.height > other.height
        }
    }

    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));

    // Associated Functions
    impl Rectangle {
        fn square(size: u32) -> Rectangle {
            // without self
            Rectangle {
                width: size,
                height: size,
            }
        }
    }

    let sq = Rectangle::square(3);

    // No problem to have multiple impl block for the same type

    // Enum
    // Enum have multiple Variants
    enum IpAddrKind {
        V4,
        V6,
    }

    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;

    // Variant can hold values
    enum IpAddr {
        V4(String),
        V6(String),
    }

    let home = IpAddr::V4(String::from("127.0.0.1"));
    let loopback = IpAddr::V6(String::from("::1"));

    // Variant's values can differ in type
    enum IpAddr2 {
        V4(u8, u8, u8, u8),
        V6(String),
    }

    let home = IpAddr2::V4(127, 0, 0, 1);
    let loopback = IpAddr2::V6(String::from("::1"));

    // Many possibilities
    enum Message {
        Quit,
        Move { x: i32, y: i32 }, // named field like a struct
        Write(String),
        ChangeColor(i32, i32, i32),
    }

    // we can add methods to Enum
    impl Message {
        fn call(&self) {
            // method body would be defined here
        }
    }

    let m = Message::Write(String::from("hello"));
    m.call();

    // Option Enum
    enum Option<T> {
        None,
        Some(T),
    }

    // So used that we don't have to import it. We can also use None and Some without mentioning Option<T>::
    let some_number = Some(5);
    let some_string = Some("a string");
    let absent_number: Option<i32> = None; // Here type must be mentioned because it can't be inferred.

    // Match
    enum UsState {
        Alabama,
        Alaska,
        // --snip--
    }
    
    enum Coin {
        Penny,
        Nickel,
        Dime,
        Quarter(UsState),
    }

    fn value_in_cents(coin: Coin) -> u8 {
        match coin {
            Coin::Penny => 1,
            Coin::Nickel => 5,
            Coin::Dime => 10,
            Coin::Quarter(state) => {
                println!("State quarter from {:?}!", state);
                25
            }
        }
    }

    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            None => None,
            Some(i) => Some(i + 1),
        }
    }

    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);

    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        other => move_player(other),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn move_player(num_spaces: u8) {}

    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => reroll(),
    }

    fn reroll() {}

    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => (),
    }

    let config_max = Some(3u8);
    match config_max {
        Some(max) => println!("The maximum is configured to be {}", max),
        _ => (),
    }

    let config_max = Some(3u8);
    if let Some(max) = config_max {
        println!("The maximum is configured to be {}", max);
    }

    let mut count = 0;
    match coin {
        Coin::Quarter(state) => println!("State quarter from {:?}!", state),
        _ => count += 1,
    }

    let mut count = 0;
    if let Coin::Quarter(state) = coin {
        println!("State quarter from {:?}!", state);
    } else {
        count += 1;
    }
}
