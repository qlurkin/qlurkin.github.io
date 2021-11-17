from subprocess import Popen, PIPE

def tex2html(formula, displayMode = False):
    command = ['./node_modules/katex/cli.js']
    if displayMode:
        command.append('-d')
    proc = Popen(command, stdin=PIPE, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    out, err = proc.communicate(formula)
    if len(err) > 0:
        return '<pre>{}</pre>'.format(err.strip())
    return out

if __name__ == '__main__':
    print(tex2html('\pi^{42}', True))