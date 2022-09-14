# Ecrire une fonction nommée compose() qui prend une liste de fonctions
# et une valeur en paramètres. Les fonctions de la liste devront prendre
# un paramètre. La fonction compose() appellera la 1ère fonction de la
# liste avec la valeur reçue, puis la seconde fonction avec la valeur de
# retour de la 1ère, etc... Compose() renverra la valeur de retour de la
# dernière fonction.

def compose(FL, value):
    # Votre code ici

def square(x):
    return x*x

def twice(x):
    return 2*x

if __name__ == '__main__':
    print(compose([square, twice], 3)) # 18
