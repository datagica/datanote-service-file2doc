'use strict'

module.exports = function (input, record, graph, opts) {
  let output = `FOREACH (props IN [`
  output    += graph.nodes.map(({ id, label, count, flattened }) => `
  {
    id:${JSON.stringify(id)},
    label:${JSON.stringify(label)}
  }`).join(',')
  output    += `]|\n      CREATE ({ id:props.id, label:props.label }))`
  return output
}
