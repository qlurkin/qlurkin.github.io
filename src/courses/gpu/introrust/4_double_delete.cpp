#include <iostream>


void display(int *a) {
    std::cout << *a << std::endl;
    delete a;
}

int main() {
    int *x = new int(2);

    display(x);
    
    delete x;
}