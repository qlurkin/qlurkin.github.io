laby = [
	"##########",
	"#        E",
	"# # ######",
	"# #      #",
	"# # # ####",
	"#####    #",
	"#   # ####",
	"# # # #  #",
	"# #      #",
	"##########",
]

def set(laby, l, c, char):
	laby[l] = laby[l][:c] + char + laby[l][c+1:]

def printLaby(laby):
	for line in laby:
		print(line)

directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

# (l, c) is the starting point
# return True if an exit is found
def find(laby, l, c):
	# Did we find the exit?
	if laby[l][c] == 'E':
		return True

	# Are we in a wall or in our way?
	if laby[l][c] in '#*':
		return False

	# Trace our way
	set(laby, l, c, '*')

	# Search all directions
	for direction in directions:
		if find(laby, l+direction[0], c+direction[1]):
			return True

	# No exit found, backtrack
	set(laby, l, c, ' ')
	return False

find(laby, 8, 1)
printLaby(laby)