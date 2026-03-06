from functools import reduce

numbers = [42, 165, 69, 18, 24]


def add(a, b):
    return a + b


def min(a, b):
    if a < b:
        return a
    return b


sum = reduce(add, numbers, 0)
print(sum)
