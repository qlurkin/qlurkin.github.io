# Ecrire une fonction nommée combine() qui prends deux listes et une fonction
# en paramètres. Les deux listes seront de la même taille et la fonction reçue
# devra prendre deux paramètres.
# La fonction combine() appeler la fonction reçue avec une valeur de chaque
# liste dans l'ordre. Elle renverra la liste contenant les valeurs de retour.

def combine(L1, L2, fct):
    # Votre code ici

def add(a, b):
    return a + b

if __name__ == '__main__':
    print(combine([1, 2, 3], [3, 2, 1], add)) # [4, 4, 4]
