# Écrire une fonction qui renvoie l'amplitude de l'angle
# formé par 3 points reçu en paramètres. Les trois points
# seront des tuples à deux composantes.
# Pour rappel, l'angle entre deux vecteurs peut-être 
# calculer avec la formule suivante :
#     θ = arccos( (x̄ · ȳ) / (‖x̄‖ * ‖ȳ‖) )
# où x̄ est le vecteur allant du point1 au point2 et ȳ le
# vecteur allant du point2 au point3

def threePointsAngle(p1, p2, p3):
    # Votre code ici

if __name__ == '__main__':
    print(threePointsAngle((-1, 0), (0, 0), (0, 1))) # ≈ π/2