function student(s) {
	return `<li>${s.name}: ${s.grade}</li>`
}

function app(state) {
	return `
		<ul>
			${state.map(student).join('')}
		</ul>
	`
}

function render(content) {
	document.getElementById('root').innerHTML = content
}

function offline() {
	return '<p><em>Network Unavailable</em></p>'
}

function refresh() {
	fetch('/api/student.json')
	.then(response => response.json())
	.then(students => {
		render(app(students))
	})
	.catch(() => {
		render(offline())
	})
}

refresh()
setInterval(refresh, 1000)