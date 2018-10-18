'use strict'

function escape (input, keepQuotes = false) {
  if (Array.isArray(input)) {
    input = input.join(', ')
  }
  const escaped = JSON.stringify(input)
  return keepQuotes ? escaped : escaped.slice(1, -1)
}

module.exports = escape
