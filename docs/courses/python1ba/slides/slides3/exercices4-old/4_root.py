# Ecrire une fonction nommée root() qui prend une fonction fn en paramètre ainsi
# que deux bornes, inf et sup. La fonction reçue, fn, sera une fonction prenant
# un float en paramètre en renvoyant un float. Le but est de chercher une racine
# de la fonction fn entre les deux bornes. Pour cela on utilise la recherche
# dichotomique dont voici le principe:
#
#  - Si fn(inf) et fn(sup) sont de signes différents, il existe une racine entre
#    inf et sup (sinon on renvoie None).
#  - On divise l’interval en deux et on applique la même procedure sur le
#    demi-interval qui satisfait à la condition du point 1.
#  - On s’arrête quand l’écart entre inf et sup devient plus petit que la
#    précision recherchée.

def root(fn, inf, sup):
	# Votre code ici

from math import sin
print(root(sin, 2, 4))  # affiche à peu près 3.141592