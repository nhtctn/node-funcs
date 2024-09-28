const fs = require('fs')
var path = require('path')

const fileNameHandler = (filePath) => {
  if (fs.existsSync(filePath)) {
    const dir = path.parse(filePath).dir
    const ext = path.parse(filePath).ext
    const name = path.parse(filePath).name

    const regex = /(.+?)( \((\d+)\))?$/
    let originName = regex.exec(name)[1]
    let count = Number(regex.exec(name)[3]) || 0
    count++

    const newName = `${originName} (${count})`
    const newPath = path.join(dir, newName + ext)

    return fileNameHandler(newPath)
  } else {
    return filePath
  }
}

module.exports = fileNameHandler
