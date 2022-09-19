#include <iostream>


int add(int a, int b) {
    return a+b;
}

int main() {
    int x = 2;
    int y = 3;

    std::cout << add(x, y) << std::endl;
}