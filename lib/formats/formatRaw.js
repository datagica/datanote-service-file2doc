'use strict'

const filter = require('../core/filter')

module.exports = function (input, record, graph, opts) {
  if (opts.locale === 'defult') {
    delete opts.locale
  }
  return filter(record, opts)
}
