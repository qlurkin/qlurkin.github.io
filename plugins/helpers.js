const path = require('path')

exports.removeTrailingSlash = function (aPath) {
    if(path.sep === '\\') {
        if(aPath[aPath.length-1] === path.sep && !aPath.endsWith(':\\'))
            return aPath.slice(0, aPath.length-1)
    }
    else {
        if(aPath[aPath.length-1] === path.sep && aPath !== '/')
            return aPath.slice(0, aPath.length-1)
    }
    return aPath
}

exports.isDescendant = function (descendant, ancestor) {
    ancestor = exports.removeTrailingSlash(ancestor)
    if(descendant.length < ancestor.length) return false
    if(descendant === ancestor) return true
    return exports.isDescendant(path.dirname(descendant), ancestor)
}

exports.getAncestors = function (folderPath) {
    folderPath = exports.removeTrailingSlash(folderPath)
    const dir = path.dirname(folderPath)
    let ancestors = null
    if(dir === folderPath) {
        ancestors = [dir]
    }
    else {
        ancestors = exports.getAncestors(dir)
        ancestors.push(folderPath)
    }

    return ancestors
}

