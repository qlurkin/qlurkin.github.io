import numpy as np
from matplotlib import pyplot as plt
x = np.linspace(0, 25, 100)
y = np.sin(x) / x
plt.plot(x, y)
plt.show()

x = np.array([[1, 2],
              [3, 4],
              [5, 6]])

print(x[:2, 1])

a = 2 * np.random.randn(10000) + 10
np.mean(a)   # moyenne
np.std(a)    # écart type
plt.hist(a)  # histogramme
plt.show()

x = np.linspace(1, 10, 100)
y = 1/x**2 * np.sin(x)
dydx = np.gradient(y, x)
y_int = np.cumsum(y) * (x[1] - x[0])

plt.plot(x, y)
plt.plot(x, dydx)
plt.plot(x, y_int)
plt.show()

x = np.linspace(-2*np.pi, 2*np.pi, 100)

plt.plot(x, np.cos(x), linewidth=2.5 , label='cos(x)')
plt.plot(x, np.sin(x), color='red', label='sin(x)')

plt.xlabel('x')
plt.ylabel('y')

plt.ylim(-2, 2)
plt.xticks(
    [-2*np.pi, -np.pi, 0, np.pi, 2*np.pi],
    [r'$-2\pi$', r'$\pi$', '0', r'$\pi$', r'$2\pi$']
)
plt.legend(loc='upper right')
plt.show()