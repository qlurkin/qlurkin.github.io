import time
import math
import numpy as np
import random

def timeit(fun, data):
    start = time.time()
    res = fun(data)
    print('{} executed in {}s'.format(
        fun.__name__,
        time.time() - start)
    )
    return res

def sqrtFor(data):
    res = []
    for elem in data:
        res.append(math.sqrt(elem))
    return res

def sqrtComp(data):
    return [math.sqrt(i) for i in data]

def sqrtMap(data):
    return list(map(math.sqrt, data))

def sqrtNumpy(data):
    return np.sqrt(data)

data = random.choices(range(100), k=10000000)

timeit(sqrtFor, data) # 1.24s
timeit(sqrtComp, data) # 0.95s
timeit(sqrtMap, data) # 0.49s
timeit(sqrtNumpy, np.array(data)) # 0.03s