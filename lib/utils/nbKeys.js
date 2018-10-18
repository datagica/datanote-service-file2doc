'use strict'

const isObject = require('./isObject')

function nbKeys (input) {
  return isObject(input) ? Object.keys(input).length : 0
}

module.exports = nbKeys
