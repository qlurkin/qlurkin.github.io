from matplotlib import projections, pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 100)
y = np.sin(x)

fig, ax = plt.subplots()
ax.plot(x, y, label='sin')
ax.plot(x, np.cos(x), label='cos')
ax.legend() # show labels

fig3, axs = plt.subplots(2, 2, layout="constrained")
fig3.set_label('Multiple')
axs[0,0].plot(x, np.sin(x))
axs[0,0].set_title("sin")
axs[0,0].set_xlabel("x")
axs[0,0].set_ylabel("sin(x)")
axs[0,1].plot(x, np.cos(x))
axs[0,1].set_title("cos")
axs[0,1].set_xticks([-np.pi, -np.pi/2, 0, np.pi/2, np.pi], ['$-\pi$', '$-\pi/2$', 0, '$\pi/2$', '$\pi$'])
axs[1,0].plot(x, np.tan(x))
axs[1,0].set_title("tan")
axs[1,1].plot(x, x**2, color='blue', linewidth=3, linestyle='--')
axs[1,1].set_title("x**2")
axs[1,1].text(-2, 7, "$x^2$") # support basic latex

fig = plt.figure("3D")
ax = fig.add_subplot(projection='3d')

# Make data.
X = np.arange(-5, 5, 0.25)
Y = np.arange(-5, 5, 0.25)
X, Y = np.meshgrid(X, Y)
print(X)
R = np.sqrt(X**2 + Y**2)
Z = np.sin(R)

ax.plot_surface(X, Y, Z)

plt.show()
