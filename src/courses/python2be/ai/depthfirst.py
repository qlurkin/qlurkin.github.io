class Stack:
	data = []

	def push(self, value):
		self.data.append(value)

	def pop(self):
		return self.data.pop()

def DFS(start, successors, goals):
	s = Stack()
	parent = {}
	parent[start] = None
	node = start
	while node not in goals:
		for successor in successors(node):
			if successor not in parent:
				parent[successor] = node
				s.push(successor)
		node = s.pop()

	res = []
	while node is not None:
		res.append(node)
		node = parent[node]

	return list(reversed(res))

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

print(DFS((8, 1), successors, [(1, 9)]))