import { outerHeight, outerWidth } from "./canvas.js"

const menu = document.getElementById('menu')

export function closeMenu() {
    menu.style.left = '-1000px'
}

export function showMenu(x, y, items) {
    menu.innerHTML = ''
    const ul = document.createElement('ul')
    menu.appendChild(ul)
    for(const item of items) {
        const li = document.createElement('li')
        li.innerText = item.label
        li.addEventListener('click', event => {
            item.action()
            closeMenu()
            event.stopPropagation()
        })
        ul.appendChild(li)
    }
    if(x>outerWidth()/2) {
        x = x - 100
    }
    if(y>outerHeight()/2) {
        y = y - document.getElementById('menu').offsetHeight
    }
    menu.style.left = `${x}px`
    menu.style.top = `${y}px`
}

window.addEventListener('keydown', event => {
    if(event.code === 'Escape') {
        closeMenu()
    }
})