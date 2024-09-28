const fs = require('fs')
const path = require('path')
const fileNameHandler = require('./fileNameHandler')

const fileMenager = outputFolder => {
  const initFolder = () => {
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder)
    }
  }
  initFolder() // initially needed

  const resetFolder = () => {
    if (fs.existsSync(outputFolder)) {
      fs.rmSync(outputFolder, { recursive: true, force: true })
      fs.mkdirSync(outputFolder)
    }
  }

  const createFile = (fileName, value) => {
    let filePath = `${outputFolder}/${fileName}`
    filePath = fileNameHandler(filePath)

    let file = value
    const ext = path.parse(filePath).ext
    if (ext == '.json' && typeof value == 'object') {
      file = JSON.stringify(value, null, 2)
    }
    fs.writeFileSync(filePath, file)
  }

  return { createFile, resetFolder }
}

module.exports = fileMenager
