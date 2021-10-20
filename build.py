import fs
from os.path import basename, join, splitext
import json
import copy
import importlib

class BuildSiteError(Exception):
    pass

importedDriver = {}

def getIndex(path, files):
    indices = list(filter(lambda name: basename(name).startswith('index'), files))
    if len(indices) > 1:
        raise BuildSiteError('Multiple Index in Folder {}'.format(path))
    if len(indices) > 0:
        return indices[0]
    return None

def updateConfig(path, config, fs):
    config = copy.deepcopy(config)
    if 'buildDir' not in config:
        print('yop')
        config['buildDir'] = 'build'
    config['buildDir'] = join(config['buildDir'], basename(path))
    configPath = join(path, '.config.json')
    try:
        update = json.loads(fs.read(configPath))
        config.update(update)
    except FileNotFoundError:
        pass
    return config

def processIndex(index, children, config, fs):
    if index is None:
        extension = 'none'
    else:
        _, extension = splitext(index)
        extension = extension[1:]

    if extension not in importedDriver:
        importedDriver[extension] = importlib.import_module(extension+'-driver')
    
    return importedDriver[extension].process(index, children, config, fs)

def copyFiles(files, dst, fs):
    for file in files:
        fs.copy(file, dst)

def buildFolder(path, config, fs):
    files, directories = fs.listdir(path)
    index = getIndex(path, files)
    config = updateConfig(path, config, fs)
    print(config)
    if not fs.exists(config['buildDir']):
        fs.mkdir(config['buildDir'])
    else:
        fs.clean(config['buildDir'])
    
    print(directories)
    children = []
    for directory in directories:
        children.append(buildFolder(directory, config, fs))

    print(config)
    print(index)
    fileToCopy = list(filter(lambda file: file != index, files))
    print('toCopy =', fileToCopy)
    copyFiles(fileToCopy, config['buildDir'], fs)
    data = processIndex(index, children, config, fs)
    data['children'] = children
    return data


if __name__ == '__main__':
    print(buildFolder('courses', {}, fs))