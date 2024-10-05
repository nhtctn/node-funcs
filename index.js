const ajaxCall = require('./functions/ajaxCall')
const fetchData = require('./functions/fetchData')
const fileMenager = require('./functions/fileMenager')
const fileNameHandler = require('./functions/fileNameHandler')
const logger = require('./functions/logger')
const parseEditors = require('./functions/parse-editors')
const pathHandlers = require('./functions/pathHandlers')
const sleep = require('./functions/sleep')

module.exports = {
  ajaxCall,
  fetchData,
  fileMenager,
  fileNameHandler,
  logger,
  parseEditors,
  pathHandlers,
  sleep,
}
