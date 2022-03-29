import threading as th

def hello(name):
    while True:
        print('Hello {}'.format(name))

def main():
    th.Thread(target=hello, args=('Alice',)).start()
    th.Thread(target=hello, args=('Bob',)).start()

main()