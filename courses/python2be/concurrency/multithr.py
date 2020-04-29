import concurrent.futures as cf

def compute(data):
	return data ** 2

with cf.ThreadPoolExecutor(3) as executor :
	print(list(executor.map(compute, [1, 7, 8, -2])))