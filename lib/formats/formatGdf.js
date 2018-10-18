'use strict'

const getLocalized    = require('../utils/getLocalized')
const isValidNumber   = require('../utils/isValidNumber')
const isString        = require('../utils/isString')
const formatCsvHeader = require('./formatCsvHeader')

module.exports = function (input, record, graph, opts) {

  const defaultNodeFields = {
    id   : 'VARCHAR',
    label: 'VARCHAR',
    count: 'INTEGER'
  }

  const customNodeFields = {
  }

  graph.nodes.map(({ flattened }) =>
    Object.keys(flattened).map(key => {
      if (!isString(customNodeFields[key])) {
        customNodeFields[key] = isValidNumber(flattened[key]) ? 'DOUBLE' : 'VARCHAR'
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


  const defaultEdgeFields = {
    id    : 'VARCHAR',
    source: 'VARCHAR',
    target: 'VARCHAR',
    label : 'VARCHAR',
    size  : 'DOUBLE',
  }

  const customEdgeFields = {
  }

  graph.edges.map(({ flattened }) =>
    Object.keys(flattened).map(key => {
      if (!isString(customEdgeFields[key])) {
        customEdgeFields[key] = isValidNumber(flattened[key]) ? 'DOUBLE' : 'VARCHAR'
      }
    })
  )

  const edgeList = graph.edges.map(({ id, source, target, label, flattened }) =>
    [
      JSON.stringify(id),
      JSON.stringify(source),
      JSON.stringify(target),
      JSON.stringify(label),
      count
    ].concat(
      Object.keys(customEdgeFields).map(key => {
        const value = flattened[key]

        // we use typeof here, because we want to reject empty, Object and Array
        return !value || value === 'object' ? '' : JSON.stringify(value)

      })
    ).join(',')
  ).join('\n')

  return (
    'nodedef>' + formatCsvHeader(defaultNodeFields, customNodeFields) + '\n' + nodeList + '\n' +
    'edgedef>' + formatCsvHeader(defaultEdgeFields, customEdgeFields) + '\n' + edgeList
  )
}
