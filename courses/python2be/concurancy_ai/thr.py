import threading as th

def sayhello(name):
	print('Hello', name)

thread = th.Thread(target = sayhello, args = ('Tom',))
thread.start()

thread.join() # Attendre la fin du thread
print('Thread', thread.name, 'terminé')