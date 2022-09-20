export const fontReady = () => {
    return new Promise((resolve, reject) => {
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
}

export default fontReady