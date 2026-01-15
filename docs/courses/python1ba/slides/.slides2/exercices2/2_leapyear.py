# Ecrire une fonction nommée leapYear() qui prend une
# année en paramètre et qui renvoie True si elle est
# bissextile et False sinon. Une année est bissextile si:
#  - elle est divisible par 4 et non divisible par 100, ou
#  - si elle est divisible par 400.

def leapYear(year):
	# Votre code ici

if __name__ == '__main__':
	print(leapYear(2000)) # True
	print(leapYear(1900)) # False
	print(leapYear(2020)) # True
