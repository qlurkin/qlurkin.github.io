import subprocess

p = subprocess.run(['powershell.exe', 'pwd'])
print('Valeur de retour :', p.returncode)