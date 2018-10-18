'use strict'

const isDefined = require('./isDefined')
const isObject = require('./isObject')

function getLocalized (input, opts, fallback) {

  opts = isDefined(opts) ? opts : {}

  // default locale has a special purpose
  // (eg. for raw export it means "all" locales)
  if (opts.locale === 'default' || opts.locale === '') {
    opts.locale = 'en'
  }

  fallback = typeof fallback === 'function' ? fallback : (_ => _)

  if (opts.locale && isObject(input)) {
    if (isDefined(input[opts.locale])) {
      return input[opts.locale]
    } else if (isDefined(input.en)) {
      return input.en
    } else {
      return fallback(input, opts)
    }
  } else {
    return fallback(input, opts)
  }
}

module.exports = getLocalized
