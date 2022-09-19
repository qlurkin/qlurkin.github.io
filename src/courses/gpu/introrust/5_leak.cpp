#include <iostream>

int main() {
    int *x;

    while(true) {
        x = new int(2);
        std::cout << *x << std::endl;
    }
    
    delete x;
}