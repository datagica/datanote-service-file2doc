'use strict'

const getLocalized = require('../utils/getLocalized')
const isDefined    = require('../utils/isDefined')
const isObject     = require('../utils/isObject')
const nbKeys       = require('../utils/nbKeys')

function filter (obj, opts = {}) {

  if (Array.isArray(obj)) {
    return obj.map(item => filter(item, opts))
  }

  if (!isObject(obj)) {
    return obj
  }

  let fields
  let res
  if (typeof opts.fields === 'string') {
    fields = {}
    res = {}
    opts.fields.split(',').map(f => (fields[f] = true))
  } else {
    fields = null
    res = obj
  }

  Object.keys(obj).map(key => {

    //if (typeof obj[key] === 'string' && !fields[key]) { return }
    if (fields && !fields[key]) { return }
    res[key] = getLocalized(obj[key], opts, filter)
  })

  return res
}

module.exports = filter
