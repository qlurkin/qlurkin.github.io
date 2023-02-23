export function modal(element, init, callback) {
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
}
