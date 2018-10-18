'use strict'

const isString = require('./isString')

// NOTE this is temporary, only used for backward compatibility with the
// legacy graph generator
function extractTypeFromId (id) {
  if (typeof id === 'undefined' || id === null) { return }

  const a = `${id}`.split(':')[1]
  if (!isString(a)) { return }

  const b = a.split('__')[0]
  if (!isString(b)) { return }

  return b
}

module.exports = extractTypeFromId
