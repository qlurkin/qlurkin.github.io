def sqrt(x, eps=1e-8):
    left = 1
    right = x
    mid = (1 + x) / 2

    while abs(left - right) > eps:
        left = mid
        right = x / left
        mid = (left + right) / 2

    return mid


if __name__ == "__main__":
    print(sqrt(2))
