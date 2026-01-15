import scipy.integrate as itg
from scipy.optimize import minimize
from sympy import diff, integrate, limit, symbols, sin, pi
import numpy as np
import numdifftools as nd # usefull for curl(rotationnel), etc...

x = np.linspace(1, 10, 100)
y = 1/x**2 + np.sin(x)
dydx = np.gradient(y, x)
y_int = np.cumsum(y) * (x[1] - x[0])

def f(x):
    return -x + 1

r = itg.quad(f, 0, 1)
print(r)   # (0.5, 5.551115123125783e-15) value and error

def obj(x):
    return x ** 2 - x + 1

r = minimize(obj, 0, method='nelder-mead', options={'disp': True})
print(r.x)  # [0.5]

x, y = symbols('x y')
expr = sin (x + 2*y)
print(diff(expr, x))                   # cos(x + 2*y)
print(integrate(expr, y))              # -cos(x + 2*y)/2
print(integrate(expr, (y, 0, pi/2)))   # cos(x)
print(limit(expr, x, 0))               # sin(2*y)

