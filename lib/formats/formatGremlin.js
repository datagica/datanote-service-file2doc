'use strict'

const getLocalized      = require('../utils/getLocalized')
const extractTypeFromId = require('../utils/extractTypeFromId')
const S                 = require('../utils/escapeSingle')

module.exports = function (input, record, graph, opts) {
  return graph.nodes.map(({ id, label, count, properties }) =>
    `g.addV(${S(extractTypeFromId(id))})`+
     `.property('id', ${S(id)})` +
     `.property('name', ${S(label)})`+
     `.property('count', ${count})`+
    Object.keys(properties).map(key => {
        const value = properties[key]
        if (Array.isArray(value)) {
          return value.map(val => `.property(${S(key)}, ${S(val)})`).join('')
        } else if (typeof value === 'object') {
          return ''
        } else {
          return `.property(${S(key)}, ${S(value)})`
        }
      }).join('')
    ).join('\n') +
    graph.edges.map(({ id, source, target, label, weight, properties }) =>
      `g.V(${S(source)}).addE(${S(extractTypeFromId(id))}).to(g.V(${S(target)}))`
    ).join('\n')
}
