from random import randint
import threading as th
from time import sleep

counter = 0
results = {}

def compute(name):
	global counter
	counter += 1
	sleep(randint(0, 1))
	results[name] = counter

threads = [th.Thread(target = compute, args = (name,)) for name in ['Dan', 'Tom']]
for thread in threads:
	thread.start()
for thread in threads:
	thread.join()
print(results)