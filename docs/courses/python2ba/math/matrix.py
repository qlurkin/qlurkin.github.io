import numpy as np
from scipy import linalg

x = np.array([[1, 2],
              [5, 6]])

print(x)

print(x.diagonal())
print(x.trace())

print(x.transpose())
print(x.T)

print(linalg.det(x))
print(linalg.inv(x))
print(x @ x)
print(x.dot(x))

A = np.array([[1 , 2] , [3 , 4]])
b = np.array([[5] , [6]])
print(linalg.inv(A).dot(b))
print(linalg.solve(A, b))

print(linalg.eigvals(A))
print(linalg.eig(A))

