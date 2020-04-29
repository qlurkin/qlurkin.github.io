import subprocess

with open('result.txt', 'w') as file:
	p = subprocess.run(['powershell.exe', 'pwd'], stdout = file, stderr = subprocess.DEVNULL)
	print ('Valeur de retour :', p.returncode)