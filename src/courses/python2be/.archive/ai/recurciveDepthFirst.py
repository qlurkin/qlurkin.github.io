def RDFS(start, successors, goals, res=[]):
	res.append(start)
	
	if start in goals:
		return True
	
	for successor in successors(start):
		if successor not in res:
			if RDFS(successor, successors, goals, res):
				return True
	
	res.pop()
	return False

def successors(node):
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

	directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
	res = []
	l, c = node
	for dl, dc in directions:
		nl = l + dl
		nc = c + dc
		try:
			if laby[nl][nc] in [' ', 'E']:
				res.append((nl, nc))
		except IndexError:
			pass
	return res

res = []
print(RDFS((8, 1), successors, [(1, 9)], res))
print(res)