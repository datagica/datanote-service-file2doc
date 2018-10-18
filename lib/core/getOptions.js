'use strict'

const qs = require('query-string')
const isString = require('../utils/isString')

module.exports = function (req, limits) {

  const opts = qs.parse(qs.extract(req.url))

  if (isString(opts.types)) {
    Object.assign(opts, {
      types: opts.types.split(',').slice(0, limits.maxTypes).join(',')
    })
  }

  opts.locale = opts.locale ? opts.locale : 'default'

  return Object.assign(opts, limits)
}
