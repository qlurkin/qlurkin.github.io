s = "Le Python, c'est bon !"
print(s[3:9]) # affiche 'Python'
print(s[17:-2]) # affiche 'bon'
print(s[17:]) # affiche 'bon !'
print(s[:9]) # affiche 'Le Python'
print(len(s))

s = "Le Python, c'est bon !"
# s[17] = "c"                  # provoque une erreur !
s = s[:17] + "cool" + s[20:] # crée un nouveau string adapté
print(s)
