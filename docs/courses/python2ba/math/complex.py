import cmath

j = 0 # Not a problem
print(cmath.sqrt(-1))

a = 1+2j
a = complex(1, 2)
print(a)
print(type(a))
print(a.imag)
print(a.real)
print(a.conjugate())

print(cmath.phase(a)) # argument
print(abs(a)) # module
print(cmath.polar(a))
print(cmath.rect(*cmath.polar(a)))

print(a*a)
print(a+a)
print(cmath.exp(a))