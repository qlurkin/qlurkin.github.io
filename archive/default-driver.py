from os.path import basename, join

def process(index, children, config, fs):
    fs.copy(index, config['buildDir'])

    title = basename(config['buildDir'])
    if 'title' in config:
        title = config['title']

    return {
        'title': title,
        'path': join(config['buildDir'], basename(index))
    }