#include <iostream>

int main() {
    int *x = new int(2);

    std::cout << *x << std::endl;
    
    delete x;
}