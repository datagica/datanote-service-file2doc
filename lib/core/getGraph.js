'use strict'

const flatten = require('flat')
const getLocalized = require('../utils/getLocalized')

/**
 * Convert a JSON document returned by parse-document (a "record" tree)
 * into a simple "nodes + edges" graph format
 */
module.exports = function (input, opts) {

  const id2node = {}
  const edges = []

  input.links.map(mention => {

    const entity = mention.target
    const vertex = {}

    // TODO check that the same id is
    if (id2node[entity.id]) {
      id2node[entity.id].count++
    } else {
      // console.log("ENTITY FIELDS: "+JSON.stringify(entity, null, 2))
      id2node[entity.id] = {
        id: `${entity.id}`,
        label: getLocalized(entity.label, opts),
        count: 1,
        properties: entity.properties || {},
        flattened: flatten(entity.properties || {}),
      }
    }

    entity.links.map(outlink => {

      if (outlink.link.id === "link:instanceof") {
        vertex.type = outlink.target.id
        return
      }

      edges.push({
        id: `${edges.length}`,
        source: `${entity.id}`,
        target: `${outlink.target.id}`,
        label: getLocalized(outlink.link.label, opts),
        properties: outlink.properties || {},
        flattened: flatten(outlink.properties || {}),
      })
    })

  })

  const nodes = Object.keys(id2node).map(id => id2node[id])

  return { nodes: nodes, edges: edges }
}
