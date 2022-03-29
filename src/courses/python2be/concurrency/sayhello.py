import multiprocessing as mp

def sayhello (name):
	print ('Hello', name)

if __name__ == '__main__':
	proc = mp.Process(target = sayhello, args =('Dan',))
	proc.start()

	proc.join() # Attendre la fin du processus
	print('Terminé avec code', proc.exitcode)