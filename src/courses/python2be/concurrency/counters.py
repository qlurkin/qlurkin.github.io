import threading
import time

def inc():
    with open('counter.txt') as file:
        counter = int(file.readlines()[-1])

    counter += 1
    
    with open('counter.txt', 'a') as file:
        file.write('\n' + str(counter))

def display():
    
    for i in range(200):
        inc()
    

def main():
    with open('counter.txt', 'a') as file:
        file.write('\n0')
    
    t1 = threading.Thread(target=display)
    t2 = threading.Thread(target=display)

    t1.start()
    t2.start()

    t1.join()
    t2.join()

for i in range(5):
    main()
    with open('counter.txt') as file:
        counter = int(file.readlines()[-1])
        print(counter)



