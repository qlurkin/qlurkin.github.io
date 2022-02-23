class Queue:
	data = []

	def enqueue(self, value):
		self.data.append(value)

	def dequeue(self):
		return self.data.pop(0)

def BFS(start, successors, goals):
	q = Queue()
	parent = {}
	parent[start] = None
	node = start
	while node not in goals:
		for successor in successors(node):
			if successor not in parent:
				parent[successor] = node
				q.enqueue(successor)
		node = q.dequeue()

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

print(BFS((8, 1), successors, [(1, 9)]))