from functools import reduce

numbers = []

def addNumber(n):
	numbers.append(n)

def add(a, b):
	return a + b

def somme():
	return reduce(add, numbers, 0)

def menu():
	print("MENU")
	print("  1. Enregistrer un nombre")
	print("  2. Calculer la somme")
	print("  3. Sortir du programme")
	choice = input("Faites votre choix: ")
	return choice

def addForm():
	addNumber(float(input("Votre nombre: ")))

def showSomme():
	print("Somme:", somme())

def mainloop():
	while True:
		choice = menu()
		if choice == "1":
			addForm()
		elif choice == "2":
			showSomme()
		elif choice == "3":
			print("Bye!")
			break
		else:
			print("Réponse invalide")

mainloop()
