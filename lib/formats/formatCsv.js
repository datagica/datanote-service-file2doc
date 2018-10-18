'use strict'

const getLocalized    = require('../utils/getLocalized')
const isValidNumber   = require('../utils/isValidNumber')
const isString        = require('../utils/isString')
const formatCsvHeader = require('./formatCsvHeader')

module.exports = function (input, record, graph, opts) {


  const defaultNodeFields = {
    id   : true,
    label: true,
    count: true,
  }

  const customNodeFields = {
  }

  graph.nodes.map(({ flattened }) =>
    Object.keys(flattened).map(key => {
      if (!isString(customNodeFields[key])) {
        customNodeFields[key] = ''
      }
    })
  )

  const nodeList = graph.nodes.map(({ id, label, count, flattened }) =>
    [
      JSON.stringify(id),
      JSON.stringify(label),
      count
    ].concat(
      Object.keys(customNodeFields).map(key => {
        const value = flattened[key]

        // we use typeof here, because we want to reject empty, Object and Array
        return !value || value === 'object' ? '' : JSON.stringify(value)

      })
    ).join(',')
  ).join('\n')

  return formatCsvHeader(defaultNodeFields, customNodeFields) + '\n' + nodeList
}
