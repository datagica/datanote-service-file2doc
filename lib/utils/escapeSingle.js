'use strict'

function escapeSingle (input) {
  if (Array.isArray(input)) {
    input = input.join(', ')
  }
  return `'${JSON.stringify(input).slice(1, -1)}'`
}

module.exports = escapeSingle
