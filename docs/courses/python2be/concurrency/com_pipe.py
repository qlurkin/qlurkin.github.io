import multiprocessing as mp

def compute(child):
	child.send('Hey !')
	child.close()

if __name__ == '__main__':
	parent, child = mp.Pipe()
	proc = mp.Process(target = compute, args =(child,))
	proc.start()
	print(parent.recv())

	proc.join() # Attendre la fin du processus
	print('Terminé avec code', proc.exitcode)