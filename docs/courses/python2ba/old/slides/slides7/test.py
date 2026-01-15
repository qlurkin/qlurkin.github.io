from matplotlib import pyplot as plt
from scipy.integrate import solve_ivp
import numpy as np

def fun(t, y):
  return t-y

sol = solve_ivp(
  fun=fun,
  t_span=[0, 15],
  y0=[2],
  rtol = 1e-5
)

t, y = np.meshgrid(np.linspace(0, 15, 10), np.linspace(0, 13, 10))

u = 1
v = fun(t, y)

print(v)

plt.quiver(t,y,u,v)
plt.plot(sol.t, sol.y[0], '--s')
plt.show()









# plt.title("Trigono")
# plt.xlabel("x")
# plt.ylabel("sin(x)")
# plt.grid()
# plt.xticks([-3*np.pi/2, -np.pi, -np.pi/2, 0, np.pi/2, np.pi, 3*np.pi/2],
#   labels=["-3pi/2", "-pi", "-pi/2", "0", "pi/2", "pi", "3pi/2"])
# plt.plot(x, ysin, label="sin(x)")
# plt.plot(x, ycos, label="cos(x)")
# plt.legend()
# plt.show()