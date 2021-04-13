import os
import re
from collections import namedtuple

Tree = namedtuple('Tree', ['title', 'children', 'link'])
Index = {}

def cleanTree(tree:Tree):
	toRemove = []
	for child in tree.children:
		
		cleanTree(child)

		if len(child.children) == 0 and child.link is None:
			toRemove.append(child)

	for child in toRemove:
		tree.children.remove(child)

def printTree(tree:Tree):
	
	def _show(T:Tree, level):
		print('{}- {}'.format('   '*level, T.title))
		for child in T.children:
			_show(child, level+1)
	
	_show(tree, 0)

def renderTree(tree:Tree):
	res = tree.title
	if tree.link is not None:
		res = '<a href="{}">{}</a>'.format(tree.link, res)
	if len(tree.children) > 0:
		res += '<ul>{}</ul>'.format(''.join(('<li>{}</li>'.format(renderTree(child)) for child in tree.children)))
	return res

ignore = [
	'__pycache__',
	'node_modules',
	'.vscode',
	'.git'
]

pattern = r'<title>([^<]+)</title>'
regex = re.compile(pattern)

with open('template.html', encoding='utf8') as file:
	template = file.read()

for root, dirs, files in os.walk(os.path.join('.', 'courses')):
	if os.path.basename(root) in ignore:
		continue
	parent = os.path.dirname(root)
	if 'index.html' in files:
		with open(os.path.join(root, 'index.html'), encoding='utf8') as file:
			content = file.read()
			title = regex.search(content)
			if title is None:
				title = os.path.basename(root)
			else:
				title = title.group(1).strip()
			tree = Tree(title, [], os.path.join(root, 'index.html'))
	else:
		title = os.path.basename(root)
		tree = Tree(title, [], None)

	Index[root] = tree
	if parent in Index:
		Index[parent].children.append(tree)

theTree = Index[os.path.join('.', 'courses')]
cleanTree(theTree)
printTree(theTree)

with open('index.html', 'w', encoding='utf8') as file:
	file.write(template.format(renderTree(theTree)))

