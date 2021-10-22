import fs
from os.path import basename, join, splitext
import json
import copy
import importlib

class BuildSiteError(Exception):
    pass

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

    
    try:
        driver = importlib.import_module(extension+'-driver')
    except ImportError:
        driver = importlib.import_module('default-driver')
    
    return driver.process(index, children, config, fs)

def copyFiles(files, dst, fs):
    for file in files:
        fs.copy(file, dst)

def removeConfig(toRemove, config):
    config = copy.deepcopy(config)
    for item in toRemove:
        if item in config:
            del(config[item])
    return config

def buildFolder(path, config, fs):
    files, directories = fs.listdir(path)
    index = getIndex(path, files)
    config = updateConfig(path, config, fs)
    if not fs.exists(config['buildDir']):
        fs.mkdir(config['buildDir'])
    else:
        fs.clean(config['buildDir'])
    
    children = []
    cleanedConfig = removeConfig(['title'], config)
    directories.sort()
    for directory in directories:
        children.append(buildFolder(directory, cleanedConfig, fs))

    fileToCopy = list(filter(lambda file: file != index, files))
    copyFiles(fileToCopy, config['buildDir'], fs)
    data = processIndex(index, children, config, fs)
    data['children'] = children
    return data


if __name__ == '__main__':
    buildFolder('src', {}, fs)