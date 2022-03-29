import threading as th
import time
import random

counter = 0

def inc():
    global counter

    for _ in range(10000):
        #time.sleep(random.random()/10)
        counter+=1


threads = [th.Thread(target=inc) for _ in range(2000)]

[t.start() for t in threads]
[t.join() for t in threads]
print(counter)
