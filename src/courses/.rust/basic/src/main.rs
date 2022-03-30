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
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
        return a + b
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
}
