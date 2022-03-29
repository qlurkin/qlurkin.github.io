import random
import time
import threading as th

def write():
    while True:
        with open('number.txt', 'w') as file:
            file.write(str(random.randrange(100)))

def main():
    th.Thread(target=write).start()
    while True:
        time.sleep(1)
        with open("number.txt") as file:
            try:
                print(int(file.read()))
            except ValueError:
                print("Not a Number")

main()

