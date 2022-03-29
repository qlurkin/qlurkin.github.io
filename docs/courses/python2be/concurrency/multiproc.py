# import multiprocessing as mp

# def compute(data):
# 	return data ** 2

# if __name__ == '__main__':
# 	with mp.Pool(10) as pool:
# 		print(pool.map(compute, [1, 7, 8, -2, 1, 7, 8, -2, 1, 7, 8, -2, 1, 7, 8, -2]))

import concurrent.futures as cf

def compute(data):
	return data ** 2

if __name__ == '__main__':
	with cf.ProcessPoolExecutor(3) as executor :
		print(list(executor.map(compute, [1, 7, 8, -2])))