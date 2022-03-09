function enforceList(obj) {
    if(!Array.isArray(obj))
        return [obj]
    return obj
}

module.exports = enforceList