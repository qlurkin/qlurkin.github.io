import {html, render} from 'https://cdn.jsdelivr.net/npm/lit-html@1.3.0/lit-html.min.js'

function student(s) {
	return html`<li>${s.name}: ${s.grade}</li>`
}

function app(state) {
	return html`
		<ul>
			${state.map(student)}
		</ul>
	`
}

function offline() {
	return html`<p><em>Network Unavailable</em></p>`
}

function refresh() {
	fetch('/students')
	.then(response => response.json())
	.then(students => {
		render(app(students), document.getElementById('root'))
	})
	.catch(() => {
		render(offline(), document.getElementById('root'))
	})
}

refresh()
setInterval(refresh, 1000)