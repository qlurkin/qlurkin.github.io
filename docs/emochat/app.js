import {render, html} from 'https://cdn.jsdelivr.net/npm/lit-html@1.3.0/lit-html.min.js'
import {List, Map, fromJS} from 'https://unpkg.com/immutable@4.0.0-rc.9/dist/immutable.es.js'
import Datastore from './datastore.js'
import getRelativeTime from './relative-time.js'

function loadMessages() {
	const messages = JSON.parse(localStorage.getItem('messages')) || []
	for(let msg of messages) {
		msg.time = new Date(msg.time)
	}
	return fromJS(messages)
}

function loadInput() {
	return List(JSON.parse(localStorage.getItem('input'))) || List()
}

const store = Datastore(Map({
	messages: loadMessages(),
	input: loadInput(),
	keyboard: window.location.hash === '#keyboard-open' ? true : false
}))

function saveState(state) {
	localStorage.setItem('messages', JSON.stringify(state.get('messages').toJS()))
	localStorage.setItem('input', JSON.stringify(state.get('input').toJS()))
}

store.subscribe(saveState)

const codes = []

function addEmoji(start, end) {
	if(end === undefined) {
		end = start
	}

	for(let i=parseInt(start, 16); i<=parseInt(end, 16); i++) {
		codes.push(`u1f${i.toString(16)}`)
	}
}
// animaux
addEmoji('400', '439')
addEmoji('54a')
addEmoji('980', '9ad')

//emoji
addEmoji('479', '480')
addEmoji('4a9')
addEmoji('600', '644')
addEmoji('648', '64a')
addEmoji('910', '917')
addEmoji('920', '925')
addEmoji('927', '92f')
addEmoji('970', '976')
addEmoji('978')
addEmoji('97a')
addEmoji('9d0')

// bouffe
addEmoji('32d', '37f')
addEmoji('615')
addEmoji('950', '96f')
addEmoji('9c0', '9cb')
addEmoji('ad0', 'ad6')


// sport
addEmoji('94a', '94f')

// soleil/lune
addEmoji('308')
addEmoji('311', '31e')

// autre

addEmoji('30a', '30b')
addEmoji('389', '38a')

addEmoji('680')
addEmoji('9e0')
addEmoji('ac0', 'ac1')

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
			<button id="send"><span class="material-icons">send</span></button>
		</div>
	`
}

function keyboard(open, codes) {
	return html`
		<div id="keyboard" class=${open ? '' : 'closed'}>
			${codes.map(key)}
			<div id="toolbar">
				<button id="backspace"><span class="material-icons">backspace</span></button>
			</div>
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
setTimeout(() => {
	const main = document.querySelector('main')
	main.scrollTop = main.scrollHeight
}, 100)

document.getElementById('input').addEventListener('click', () => {
	store.updateState(state => {
		if(!state.get('keyboard')) {
			history.pushState(null, null, '#keyboard-open')
			return state.set('keyboard', true)
		}
		return state
	})
})

window.onpopstate = event => {
	store.updateState(state => {
		return state.set('keyboard', false)
	})
}

document.getElementById('send').addEventListener('click', () => {
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

document.getElementById('backspace').addEventListener('click', () => {
	store.updateState(state => state.update('input', input => input.pop()))
	setTimeout(() => {
		const input = document.getElementById('input')
		input.scrollTop = input.scrollHeight
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