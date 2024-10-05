const stripHead = (html) => {
  return html
    ?.replace(/<style([\S\s]*?)>([\S\s]*?)<\/style>/gim, '')
    ?.replace(/<script([\S\s]*?)>([\S\s]*?)<\/script>/gim, '')
    ?.replace(/<link([\S\s]*?)\/>/gim, '')
    ?.replace(/\n(\s+)?\n/gim, '\n')
}

const stripHtml = (html) => {
  return html
    ?.replace(/<style([\S\s]*?)>([\S\s]*?)<\/style>/gim, '')
    ?.replace(/<script([\S\s]*?)>([\S\s]*?)<\/script>/gim, '')
    ?.replace(/<footer([\S\s]*?)>([\S\s]*?)<\/footer>/gim, '')
    ?.replace(/<head([\S\s]*?)>([\S\s]*?)<\/head>/gim, '')
    ?.replace(/<link([\S\s]*?)>/gim, '')
    ?.replace(/style=".+?"/gim, '')
    ?.replace(/<img([\S\s]*?)>/gim, '')
    ?.replace(/\n(\s+)?\n/gim, '\n')
    ?.replace(/\s{2,}/gim, ' ')
}

const stripHtmlRgx = ({
  afterStart = '',
  afterEnd = '',
  beforeStart = '',
  beforeEnd = '',
}) => {
  let rgxText = `[\w\W]+?${beforeStart}(${afterStart}[\w\W]+?${beforeEnd})${afterEnd}[\w\W]+`
  return new RegExp(rgxText)
}

module.exports = { stripHtml, stripHead, stripHtmlRgx }
