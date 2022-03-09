import template as tpl
from os.path import join, basename
import os

def process(index, children, config, fs):
    template = tpl.load('list')

    items = []
    for child in children:
        items.append({
            'title': child['title'],
            'path': '/' + '/'.join(child['path'].split(os.sep)[1:])
        })
    
    title = basename(config['buildDir'])
    if 'title' in config:
        title = config['title']

    items.sort(key=lambda item: item['title'])

    content = template.render(title=title, items=items)

    outputPath = join(config['buildDir'], 'index.html')

    fs.write(outputPath, content)

    return {
        'title': title,
        'path': outputPath
    }