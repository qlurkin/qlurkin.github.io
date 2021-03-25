import {render, html} from 'https://cdn.jsdelivr.net/npm/lit-html@1.3.0/lit-html.min.js'
import {List, Map} from 'https://unpkg.com/immutable@4.0.0-rc.9/dist/immutable.es.js'
import Datastore from './datastore.js'
import getRelativeTime from './relative-time.js'

const store = Datastore(Map({
	messages: List(),
	input: List(),
	keyboard: false
}))

const codes = []

for(let i=400; i<440; i++) {
	codes.push(`u1f${i}`)
}

function getEmojiURL(code) {
	return `https://raw.githubusercontent.com/qlurkin/noto-emoji/main/svg/emoji_${code}.svg`
}

function emoji(code) {
	return html`<img src=${getEmojiURL(code)} class='emoji'>`
}

function key(code) {
	const clicked = () => {
		store.updateState(state => state.update('input', input => input.push(code)))
		setTimeout(() => {
			const input = document.getElementById('input')
			input.scrollTop = input.scrollHeight
		}, 100)
	}

	return html`<div class='key' @click=${clicked}>${emoji(code)}</div>`
}

function form(input) {
	return html`
		<div id="form">
			<div id="input">
				${input.size === 0 ? html`<p class='placeholder'>Taper Message</p>` : input.map(emoji)}
			</div>
			<button>Send</button>
		</div>
	`
}

function keyboard(open, codes) {
	return html`
		<div id="keyboard" class=${open ? '' : 'closed'}>
			${codes.map(key)}
		</div>
	`
}

function message(message) {
	const rtf1 = new Intl.RelativeTimeFormat('fr', { style: 'narrow' })

	return html`
		<div class="message mine">
			<p class="content">
				${message.get('content').map(emoji)}
			</p>
			<div class="time">
				${getRelativeTime(message.get('time'))}
			</div>
		</div>
	`
}

function app(state) {
	return html`
		<header>
			<h1>Emochat</h1>
		</header>
		<main>
			${state.get('messages').map(message)}
		</main>
		${form(state.get('input'))}
		${keyboard(state.get('keyboard'), codes)}
	`
}

store.subscribe(state => {
	render(app(state), document.body)
})

store.updateState(state => state)

document.getElementById('input').addEventListener('click', () => {
	store.updateState(state => {
		history.pushState(null, null, '#keyboard-open')
		return state.set('keyboard', true)
	})
})

window.onpopstate = event => {
	store.updateState(state => {
		return state.set('keyboard', false)
	})
}

document.querySelector('button').addEventListener('click', () => {
	store.updateState(state => {
		const time = new Date()
		const content = state.get('input')
		if(content.size === 0) return state
		console.log(content)
		return state.update('messages', messages => messages.push(Map({
			content,
			time
		}))).set('input', List())
	})

	setTimeout(() => {
		const main = document.querySelector('main')
		main.scrollTop = main.scrollHeight
	}, 100)
})

setInterval(() => {
	store.updateState(state => state)
}, 30000)

// const keyboard = document.getElementById('keyboard')
// emoji.forEach(code => {
// 	const key = document.createElement('div')
// 	key.classList.add('key')
// 	const img = document.createElement('img')
// 	img.src = getEmojiURL(code)
// 	img.classList.add('emoji')
// 	key.appendChild(img)
// 	keyboard.appendChild(key)
// })