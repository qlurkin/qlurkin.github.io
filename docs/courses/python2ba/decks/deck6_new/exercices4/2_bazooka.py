# Écrire une fonction nommée bazooka qui renvoie les solutions
# complexes d'une equation du second degré. La fonction recevra
# les trois coefficients a, b et c de l'équation et renverra un
# tuple avec les deux nombres complexes.
# Pour obtenir les racines complexes, il suffit d'appliquer les
# formules habituelle sans tenir compte de la valuer du
# discriminant (delta). En effet, cela ne posera pas de problème
# de calculer la racine de delta en complexe si delta est négatif.

def bazooka(a, b, c):
    # Votre code ici


if __name__ == "__main__":
    print(bazooka(1, 1, 1)) # affiche ((-0.5-0.8660254037844386j), (-0.5+0.8660254037844386j))