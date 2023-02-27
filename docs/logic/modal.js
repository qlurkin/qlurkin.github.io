import { parseMd } from './markdown.js'

export function modal(element) {
  element.classList.add('show')

  function close() {
    element.classList.remove('show')
    element.querySelector('.cancel').removeEventListener('click', close)
  }

  element.querySelector('.cancel').addEventListener('click', close)
}

export function alert(msg) {
  const element = document.getElementById('alert-modal')
  element.querySelector('#alert-content').innerHTML = parseMd(msg)
  modal(element)
}

export function form_modal(element, init, callback) {
  element.classList.add('show')

  const form = element.querySelector('form')
  
  for(const name in init) {
    const value = init[name]
    form.querySelector(`[name="${name}"]`).value = value
  }

  function submit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    callback(data)
    close()
  }

  function close() {
    element.classList.remove('show')
    form.removeEventListener('submit', submit)
    element.querySelector('.cancel').removeEventListener('click', close)
  }

  form.addEventListener('submit', submit)
  element.querySelector('.cancel').addEventListener('click', close)
  form.querySelector('input, textarea').focus()
}

export function prompt(msg, value, callback) {
  const element = document.getElementById('prompt-modal')
  element.querySelector('#prompt-msg').innerText = msg

  function cb(obj) {
    callback(obj.value)
  }

  form_modal(element, { value }, cb)
}
