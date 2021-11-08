def fusion(L1, L2):
    if len(L1) == 0 or len(L2) == 0:
        return L1 + L2
    if L1[0] < L2[0]:
        return [L1[0]] + fusion(L1[1:], L2)
    return [L2[0]] + fusion(L1, L2[1:])

def fusionSort(L):
    if len(L) < 2:
        return L
    return fusion(fusionSort(L[:len(L)//2]), fusionSort(L[len(L)//2:]))


def bubbleSort(L):
    for n in range(len(L)):
        for i in range(1, len(L)-n):
            if L[i-1] > L[i]:
                tmp = L[i-1]
                L[i-1] = L[i]
                L[i] = tmp

L = [4, 7, 2, 9, 3, 0, -3]

A = [1, 3, 6, 9]
B = [2, 4, 7, 10]

print(fusion(A, B))

L = fusionSort(L)

print(L)