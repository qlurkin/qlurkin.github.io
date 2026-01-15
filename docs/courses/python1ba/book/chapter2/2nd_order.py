from math import sqrt
a = float(input('entrez la valeur de a : '))
b = float(input('entrez la valeur de b : '))
c = float(input('entrez la valeur de c : '))
D = b*b-4*a*c
if D < 0:
    print("Pas de solution réelle")
else:
    if D == 0:
        print("La racine double est", -b/(2*a))
    else:
        print("La 1re racine est", (-b-sqrt(D))/(2*a))
        print("La 2e racine est", (-b+sqrt(D))/(2*a))
