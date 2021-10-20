from string import Template
import fs
from os.path import join

def load(name):
    content = fs.read(join('templates', name+'.html'))
    return Template(content)