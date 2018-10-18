'use strict'

const isDefined = require('./isDefined')

function isObject (input) {
  return isDefined(input) && !Array.isArray(input) && input instanceof Object
}

module.exports = isObject
