import re
from os.path import basename, join

def process(index, children, config, fs):
    fs.copy(index, config['buildDir'])

    content = fs.read(index)

    pattern = r'<title>(.*?)</title>'
    regex = re.compile(pattern)
    result = regex.search(content)

    title = basename(config['buildDir'])
    if result is not None:
        title = result.group(1).strip()
    else:
        pattern = r'<h1>(.*?)</h1>'
        regex = re.compile(pattern)
        result = regex.search(content)
        if result is not None:
            title = result.group(1).strip()

    return {
        'title': title,
        'path': join(config['buildDir'], basename(index))
    }