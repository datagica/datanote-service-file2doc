'use strict'

// a JSON graph format from Tinkerpop project
module.exports = function (input, record, graph, opts) {
  return {
    graph: {
      mode: "NORMAL",

      vertices: graph.nodes.map(({ id, label, count, flattened }) => Object.assign({
        _id  : id,
        _type: 'vertex',
        name : label,
        count: count
      })),

      edges: graph.edges.map(({ id, source, target, label, flattened }) => Object.assign({
        _type : 'edge',
        _id   : id,
        _outV : source,
        _inV  :  target,
        _label: label,
        weight: 1,
      }))
    }
  }
}
