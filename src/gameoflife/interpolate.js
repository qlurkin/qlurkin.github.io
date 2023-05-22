function interpolate(str, params) {
    const names = Object.keys(params)
    const vals = Object.values(params)
    return new Function(...names, `return \`${str}\``)(...vals)
}

export default interpolate