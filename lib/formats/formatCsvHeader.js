'use strict'

const isString = require('../utils/isString')

module.exports = function (defaultFields, customFields) {
  const fields = Object.assign({}, defaultFields, customFields) // in Node insertion order of keys is kept
  return Object.keys(fields).map(field => {
    const pretty = field.replace(/\./g, '_')
    return isString(fields[field]) ? `${pretty} ${fields[field]}`
                                   : `${pretty}`
  }).join(',')
}
