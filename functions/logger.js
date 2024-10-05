const fs = require('fs')
const path = require('path')
const { getAbsPath, initParents } = require('./pathHandlers')

const logger = (...pathVars) => {
  const logsPath = getAbsPath(...pathVars)
  if (path.parse(logsPath).ext !== '.json') {
    throw new Error('Path must point to a json file.')
  }
  initParents(logsPath)

  const setLogs = (value) => {
    fs.writeFileSync(logsPath, JSON.stringify(value, null, 2))
  }

  const getLog = (name) => {
    if (!name) {
      return JSON.parse(fs.readFileSync(logsPath, 'utf-8'))
    } else {
      return JSON.parse(fs.readFileSync(logsPath, 'utf-8'))?.[name]
    }
  }

  const setLog = (name, value) => {
    let logs = getLog()
    logs[name] = value
    setLogs(logs)
  }

  const pushToLog = (name, value) => {
    let logs = getLog()
    logs[name] = logs[name] || []
    if (Array.isArray(value)) {
      logs[name].push(...value)
    } else {
      logs[name].push(value)
    }
    logs[name].push(value)
    setLogs(logs)
  }

  const setToLog = (name, key, value) => {
    let logs = getLog()
    logs[name] = logs[name] || {}
    logs[name][key] = value
    setLogs(logs)
  }

  const pushToLogItem = (name, key, value) => {
    let logs = getLog()
    logs[name] = logs[name] || {}
    logs[name][key] = logs[name][key] || []
    if (Array.isArray(value)) {
      logs[name][key].push(...value)
    } else {
      logs[name][key].push(value)
    }
    setLogs(logs)
  }

  const removeFromLog = (name, key) => {
    let log = getLog(name)
    delete log[key]
    setLog(name, log)
  }

  const initLogs = (...names) => {
    if (!fs.existsSync(logsPath)) {
      setLogs({})
    }
    if (names.length) {
      names.forEach((name) => {
        if (!getLog(name)) {
          setLog(name, {})
        }
      })
    }
  }

  const resetLogs = (...names) => {
    initLogs()
    if (!names.length) {
      let logs = getLog()
      logs.keys().forEach((name) => setLog(name, {}))
    } else {
      names.forEach((name) => {
        setLog(name, {})
      })
    }
  }

  const removeLogs = (...names) => {
    if (!names.length) {
      setLogs({})
    } else {
      let logs = getLog()
      names.forEach((name) => delete logs[name])
      setLogs(logs)
    }
  }

  initLogs()

  return {
    setLogs,
    initLogs,
    resetLogs,
    removeLogs,
    getLog,
    setLog,
    pushToLog,
    setToLog,
    pushToLogItem,
    removeFromLog,
  }
}

module.exports = logger
