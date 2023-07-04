


function capitalize(s) {
    const first = s[0]
    const rest = s.slice(1)
    return `${first.toUpperCase()}${rest}`
}

export function setChapterNb(nb) {
    document.documentElement.style.setProperty('--chapter-nb', nb)
    document.body.classList.add('chapter')
    document.querySelectorAll('.chapter-nb').forEach(elem => {
        elem.innerHTML = `${nb}`
    })
}

export function renderRefs() {
    const types = {}
    const labels = {}
    document.querySelectorAll('[data-ref]').forEach(elem => {
        const type = elem.getAttribute('data-ref')
        const label = elem.getAttribute('id')
        if(types[type] === undefined)
            types[type] = 0
        types[type]++
        labels[label] = {
            number: `<span class="ref-nb">${types[type]}</span>`,
            type
        }
        if(elem.tagName === 'FIGURE') {
            const caption = elem.querySelector('figcaption')
            if(caption) {
                const content = caption.innerHTML
                if(content.trim().length > 0)
                    caption.innerHTML = `${capitalize(labels[label].type)} ${labels[label].number} - ${content}`
                else
                    caption.innerHTML = `${capitalize(labels[label].type)} ${labels[label].number}`
            }
        }
    })

    document.querySelectorAll('span[data-caption]').forEach(elem => {
        const ref = elem.getAttribute('data-caption')
        const content = elem.innerHTML
        if(content.trim().length > 0)
            elem.innerHTML = `${capitalize(labels[ref].type)} ${labels[ref].number} - ${content}`
        else
            elem.innerHTML = `${capitalize(labels[ref].type)} ${labels[ref].number}`
    })

    document.querySelectorAll('span[data-link]').forEach(elem => {
        const ref = elem.getAttribute('data-link')
        const content = elem.innerHTML
        elem.innerHTML = `<a href="#${ref}">${content} ${labels[ref].number}</a>`
    })
}