const fetchData = async (url, dataType, options) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.statusText)
  }

  if (options) {
    if (dataType === 'text' && options.decode) {
      const buffer = await response.arrayBuffer()
      const text = new TextDecoder(options.decode).decode(buffer)
      return text
    }
  }

  return dataType === 'json'
    ? await response.json()
    : await response.text()
}

module.exports = fetchData
