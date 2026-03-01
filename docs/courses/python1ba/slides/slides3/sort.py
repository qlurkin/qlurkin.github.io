import random
from time import perf_counter


def swap(L, i, j):
    tmp = L[i]
    L[i] = L[j]
    L[j] = tmp


def shuffle(L):
    n = len(L)
    for i in range(n - 1, 0, -1):
        j = random.randint(0, i)
        swap(L, i, j)


def is_sorted(L):
    for i in range(len(L) - 1):
        if L[i + 1] < L[i]:
            return False
    return True


def bogo_sort(L):
    while not is_sorted(L):
        shuffle(L)


def buble_sort(L):
    for end in range(len(L) - 1, 0, -1):
        for i in range(end):
            if L[i + 1] < L[i]:
                swap(L, i, i + 1)


def argmin(L, start=0):
    res = start
    for i in range(start, len(L)):
        if L[i] < L[res]:
            res = i
    return res


def select_sort(L):
    for i in range(len(L) - 1):
        j = argmin(L, start=i)
        swap(L, i, j)


def insert_sort(L):
    for i in range(1, len(L)):
        x = L[i]
        j = i
        while j > 0 and L[j - 1] > x:
            L[j] = L[j - 1]
            j -= 1
        L[j] = x


def naive_insert_sort(L):
    res = []
    for item in L:
        i = 0
        while i < len(res) and res[i] <= item:
            i += 1
        res.insert(i, item)
    return res


def search(L, x):
    for i in range(len(L)):
        if L[i] == x:
            return i
    return None


def dichotomic_search(L, x):
    left = 0
    right = len(L) - 1

    while left <= right:
        mid = (left + right) // 2

        if L[mid] == x:
            return mid

        if L[mid] < x:
            left = mid + 1
        else:
            right = mid - 1

    return None


def dichotomic_search_recursive(L, x, left=0, right=None):
    if right is None:
        right = len(L) - 1

    if left > right:
        return None

    mid = (left + right) // 2

    if L[mid] == x:
        return mid

    elif L[mid] < x:
        return dichotomic_search_recursive(L, x, mid + 1, right)
    else:
        return dichotomic_search_recursive(L, x, left, mid - 1)


if __name__ == "__main__":
    L = list(range(8))
    shuffle(L)
    print(L)

    def test_sort(fun):
        LL = list(L)
        fun(LL)
        print(LL)

    test_sort(bogo_sort)
    test_sort(buble_sort)
    test_sort(select_sort)
    test_sort(insert_sort)
    print(naive_insert_sort(L))

    L = list(range(1000000))
    search(L, 2222)
    search(L, 8888)
    search(L, 9999)
    start = perf_counter()
    print(search(L, 666666), perf_counter() - start)
    start = perf_counter()
    print(dichotomic_search(L, 666666), perf_counter() - start)
    start = perf_counter()
    print(dichotomic_search_recursive(L, 666666), perf_counter() - start)
    print(dichotomic_search_recursive(L, -666666))
    print(dichotomic_search_recursive(L, 666666666))
