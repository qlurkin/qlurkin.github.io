import subprocess

proc = subprocess.Popen(['powershell.exe', 'pwd'])
proc.wait()
print('Fini avec code de retour :', proc.returncode)