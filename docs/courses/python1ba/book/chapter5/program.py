from shape import *

up()
goto(-150, 50)

for i in range(10):
    down()
    square(25, "red")
    up()
    forward(30)

done()
