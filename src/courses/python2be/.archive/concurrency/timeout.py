import threading as th

def sayhello(name) :
	print('Hello', name)

t = th.Timer(5.5, sayhello, args = ('Bob',))
t.start()
print('Timer started')