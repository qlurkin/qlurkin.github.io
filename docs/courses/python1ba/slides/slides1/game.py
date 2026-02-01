from random import randint

secret = randint(1, 100)

attempt = int(input("Entrez un entier entre 1 et 100: "))

while secret != attempt:
    print("Valeur Incorrecte")

    if secret < attempt:
        print("La valeur correcte est plus petite")
    else:
        print("La valeur correcte est plus grande")

    attempt = int(input("Entrez un entier entre 1 et 100: "))

print("Félicitations !")
