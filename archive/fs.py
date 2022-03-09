import os
import shutil

def read(path):
    with open(path, encoding='utf8') as file:
        content = file.read()
    return content

def write(path, content):
    with open(path, 'w', encoding='utf8') as file:
        file.write(content)

def mkdir(path):
    os.mkdir(path)

def clean(path):
    shutil.rmtree(path)
    mkdir(path)

def listdir(path):
    files = []
    directories = []
    for item in map(lambda name: os.path.join(path, name), os.listdir(path)):
        if os.path.isdir(item):
            directories.append(item)
        else:
            files.append(item)
    return files, directories

def copy(src, dst):
    shutil.copy(src, dst)

def exists(path):
    return os.path.exists(path)
