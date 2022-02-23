class PriorityQueue:
	data = []

	def enqueue(self, value, priority):
		# Could be better
		self.data.append({'value': value, 'priority': priority})
		self.data.sort(key=lambda elem: elem['priority'])

	def dequeue(self):
		return self.data.pop(0)['value']

def BestFS(start, successors, goals, heuristic):
	q = PriorityQueue()
	parent = {}
	parent[start] = None
	node = start
	while node not in goals:
		for successor in successors(node):
			if successor not in parent:
				parent[successor] = node
				q.enqueue(successor, heuristic(successor))
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

def heuristic(node):
	l, c = node
	return (l - 1)**2 + (c - 9)**2

print(BestFS((8, 1), successors, [(1, 9)], heuristic))