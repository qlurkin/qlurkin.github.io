import time
from functools import wraps
import math
import numpy as np
import random

# A decorator to mesure time
def timeit(fun):
    @wraps(fun)
    def wrapper(*args, **kwargs):
        start = time.time()
        res = fun(*args, **kwargs)
        print('{} executed in {:.3f}s'.format(
            fun.__name__,
            time.time() - start)
        )
        return res
    return wrapper

@timeit
def sqrtMap(data):
    return list(map(math.sqrt, data))

@timeit
def sqrtNumpy(data):
    return np.sqrt(data)

# generate 10e7 numbers
data = random.choices(range(100), k=10_000_000)

sqrtMap(data)
sqrtNumpy(np.array(data)) # 20 times faster !!!

# How numpy is so fast ?