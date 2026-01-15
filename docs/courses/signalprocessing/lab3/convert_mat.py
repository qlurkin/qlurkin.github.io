from scipy.io import loadmat
import numpy as np
import os

filename = 'Signal.mat'
dest = os.path.splitext(filename)[0]+'.npz'

content = loadmat(filename)
data = {}
for key in content:
    if key.startswith('__'):
        continue
    data[key] = content[key].flatten()


np.savez(dest, **data)