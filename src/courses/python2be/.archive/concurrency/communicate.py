import subprocess

proc = subprocess.Popen(['python.exe'], stdin = subprocess.PIPE, stdout = subprocess.PIPE , universal_newlines = True)

out, err = proc.communicate('print(1 + 2)\nimport os\nprint(os.getcwd())\nexit()')
print(out)