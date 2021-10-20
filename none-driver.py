import template as tpl
from os.path import join, basename
import os

def process(index, children, config, fs):
    listTemplate = tpl.load('list')
    itemTemplate = tpl.load('list-item')

    items = []
    for child in children:
        path = '/' + '/'.join(child['path'].split(os.sep)[1:])
        items.append(itemTemplate.substitute(title=child['title'], path=path))
    
    title = basename(config['buildDir'])
    if 'title' in config:
        title = config['title']

    content = listTemplate.substitute(items=''.join(items), title=title)

    outputPath = join(config['buildDir'], 'index.html')

    fs.write(outputPath, content)

    return {
        'title': title,
        'path': outputPath
    }