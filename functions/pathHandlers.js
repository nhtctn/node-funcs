const fs = require('fs')
const path = require('path')

const initParents = (targetPath) => {
  const parent = path.parse(targetPath).dir
  if (!fs.existsSync(parent)) {
    initParents(parent)
    fs.mkdirSync(parent)
  }
}

const getAbsPath = (...pathVars) => {
  // relative to file that call this
  if (pathVars[1]) {
    return path.resolve(pathVars[0], pathVars[1])
  }
  // relative to root dir
  else if (!path.isAbsolute(pathVars[0])) {
    return path.resolve(pathVars[0])
  }
  // absolute path
  else {
    return pathVars[0]
  }
}

module.exports = { initParents, getAbsPath }
