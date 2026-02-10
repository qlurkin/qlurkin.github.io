
import cmath

# racine carrée de nombres négatifs
print(cmath.sqrt(-1))

# définir un nombre complex
x = 1+2j
x = complex(1, 2)

# parties réelles et imaginaires
print(x.real)
print(x.imag)

# modules et arguments
print(cmath.phase(x))           # argument
print(abs(x))                   # module
print(cmath.polar(x))           # module et argument

# définition d'1 nb complex à partir du module et argument
print(cmath.rect(1, cmath.pi))  

# opérations
print(x+x)
print(x*x)
print(cmath.exp(x))             # exponentielle

print("NUMPY")

import numpy as np

v = np.array([1, 0, 0])
print(v)

print(2*v)
print(v+v)
print(v.dot(v))
print(v @ v)
print(np.cross(v, np.array([0, 1, 0])))
print(np.linalg.norm(v))
print()

from matplotlib import pyplot as plt
import numpy as np

x = np.linspace(-5, 5, 100)
y = np.sin(x)
plt.title("Sinus")
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.grid()
plt.xticks([-3*np.pi/2, -np.pi, -np.pi/2, 0, np.pi/2, np.pi, 3*np.pi/2],
  labels=["-3pi/2", "-pi", "-pi/2", "0", "pi/2", "pi", "3pi/2"])
plt.plot(x, y)
plt.show()

from matplotlib import pyplot as plt
import numpy as np

x = np.linspace(-5, 5, 100)
ysin = np.sin(x)
ycos = np.cos(x)
plt.title("Trigono")
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.grid()
plt.xticks([-3*np.pi/2, -np.pi, -np.pi/2, 0, np.pi/2, np.pi, 3*np.pi/2],
  labels=["-3pi/2", "-pi", "-pi/2", "0", "pi/2", "pi", "3pi/2"])
plt.plot(x, ysin, label="sin(x)")
plt.plot(x, ycos, label="cos(x)")
plt.legend()
plt.show()

from scipy import integrate

def fun(x):
  return np.sqrt(1 - x**2)

result = integrate.quad(fun, -1, 1)
print(result)   # (pi/2, erreur)

x = np.linspace(-1, 1, 100)
y = fun(x)

plt.fill_between(x, y, alpha=0.5)
plt.plot(x, y)
plt.grid()
plt.xlim(-1.5, 1.5)
plt.annotate(str(result[0]), xy=(0, 0.4), ha="center")
plt.show()

from scipy import optimize

def fun(x):
  return np.cos(x)+np.cos(3*x+1)/2+np.cos(5*x-1)/3

root = optimize.newton(fun, -1)
print(root)

x = np.linspace(-5, 5, 1000)

plt.plot(x, fun(x))
plt.plot(root, 0, "o")
plt.grid()
plt.show()


