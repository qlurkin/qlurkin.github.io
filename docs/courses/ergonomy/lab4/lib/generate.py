import random
import string

nb = 100
for i in range(nb):
    with open(f'{i}.js', 'w') as file:
        file.write(f'//{''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(20000))}\n')
        if i == nb-1:
            file.write(f'export default "hello"\n')
        else:
            file.write(f'export {{ default }} from \'./{i+1}.js\'\n')
        