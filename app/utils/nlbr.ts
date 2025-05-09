const nl2br = (text: string) => {
  if (!text) return ''
  return String(text).replace(/(?:\r\n|\r|\n)/g, '<br>')
}

export default nl2br
