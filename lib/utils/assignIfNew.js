'use strict'

// a "soft" assign, that only assign if values do not exist
module.exports = function (target, source) {
  const result = {}
  Object.keys(target).map(key => (result[key] = target[key]))
  Object.keys(source).filter(key => !result[key]).map(key => (result[key] = source[key]))
  return result
}
