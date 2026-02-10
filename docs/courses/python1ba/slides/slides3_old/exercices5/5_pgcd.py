# Ecrire une fonction nommée pgcd() qui prend deux entiers en paramètres et
# renvoie le "Plus Grand Commun Diviseur". Le PGCD peut être calculé en
# utilisant les relations suivante:
#                pgcd(a, b) = a              si b = 0
#                pgcd(a, b) = pgcd(b, a%b)   sinon

def pgcd(a, b):
	# Votre code ici

if __name__ == '__main__':
	print(pgcd(45, 81))    # affiche 9
	print(pgcd(134, 201))  # affiche 67
