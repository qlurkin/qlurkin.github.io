# WARNING: this file can't be called queue.py
import multiprocessing as mp

def compute(q):
	q.put('Hey !')

if __name__ == '__main__':
	q = mp.Queue()
	proc = mp.Process(target = compute, args =(q,))
	proc.start()
	print(q.get())

	proc.join() # Attendre la fin du processus
	print('Terminé avec code', proc.exitcode)