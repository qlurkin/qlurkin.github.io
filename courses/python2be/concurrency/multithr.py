import concurrent.futures as cf
import os

def compute(data):
	return data ** 2

with cf.ThreadPoolExecutor(os.cpu_count()) as executor :
	print(list(executor.map(compute, [1, 7, 8, -2])))