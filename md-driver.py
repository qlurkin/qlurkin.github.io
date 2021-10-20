import markdown
from os.path import join, basename
import template as tpl

def process(index, children, config, fs):
    pageTemplate = tpl.load('page')
    
    content = fs.read(index)
    md = markdown.Markdown(extensions=['extra', 'meta', 'codehilite'])
    html = md.convert(content)
    meta = md.Meta
    
    title = basename(config['buildDir'])
    if 'title' in meta:
        title = meta['title'][0]
    else:
        for line in content.split('\n'):
            if line.startswith('# '):
                title = line[2:].strip()
                break

    outputPath = join(config['buildDir'], 'index.html')
    fs.write(outputPath, pageTemplate.substitute(content=html, title=title))
    
    return {
        'title': title,
        'path': outputPath
    }