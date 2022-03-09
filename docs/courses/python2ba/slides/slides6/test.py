try:
	file = open('data.txt')
	print(file.read())
except FileNotFoundError:
	print('Le fichier est introuvable')
except IOError:
	print("Erreur d'ouverture")
finally:
	file.close()