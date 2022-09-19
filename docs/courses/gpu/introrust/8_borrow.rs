fn display(msg: &String) {
    println!("{}", msg);
}

fn main() {
    let a: String = String::from("Hello");
    
    display(&a);

    println!("{}", a);
}