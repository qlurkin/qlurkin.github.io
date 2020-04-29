import multiprocessing as mp

def compute(data):
	return data ** 2

if __name__ == '__main__':
	with mp.Pool(3) as pool:
		print(pool.map(compute, [1, 7, 8, -2]))