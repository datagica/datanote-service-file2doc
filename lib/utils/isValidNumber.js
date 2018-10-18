'use strict'

function isValidNumber (input) {
  return typeof input === 'number' && isFinite(input) && !isNaN(input)
}

module.exports = isValidNumber
