async function load_file(url) {
    const response = await fetch(url)
    const data = await response.text()
    return data
}

export default load_file