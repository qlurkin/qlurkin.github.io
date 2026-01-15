a = 20


def fct():
    print("avant la définition de a:", a)
    a = 30


fct()
print("hors fct:", a)
