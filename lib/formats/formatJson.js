'use strict'

const getLocalized    = require('../utils/getLocalized')
const isValidNumber   = require('../utils/isValidNumber')
const assignIfNew     = require('../utils/assignIfNew')

module.exports = function (input, record, graph, opts) {
  return graph.nodes.map(({ id, label, count, properties }) =>
    assignIfNew(
      {
        id   : id,
        label: label,
        count: count
      },
      properties
    )
  )
}
