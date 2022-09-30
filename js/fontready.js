export const fontReady = new Promise((resolve) => {
    document.fonts.ready
    .then(() => {
        console.log('Fonts Loaded')
        resolve()
    })
    .catch((err) => {
        console.log(err)
        resolve()
    })
})

export default fontReady