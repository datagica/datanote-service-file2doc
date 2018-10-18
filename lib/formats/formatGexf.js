'use strict'

const isValidNumber = require('../utils/isValidNumber')

function s(input) {
  const out = JSON.stringify(input)
  return out[0] === '"' && out[out.length - 1] === '"' ? out : `"${out}"`
}

module.exports = function (input, record, graph, opts) {
  const title = opts.title || `default title`
  const nodes = opts.nodes || []
  const edges = opts.edges || []

  const date = new Date()
  const lastModifiedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

  let nbNodeAttributes = 0
  const nodeAttributes = {}

  let nbEdgeAttributes = 0
  const edgeAttributes = {}

  const nodeList = graph.nodes.map(({ id, label, count, flattened }) => {

    const attributes = {}

    // we add some extra attributes
    const [metaType, entityTypeId] = id.split(':')
    const [entityType, entityId] = entityTypeId.split('__')
    const extradata = {
      meta_type: metaType,
      meta_entityType: entityType,
      meta_entityId: entityId
    }

    const props = Object.assign({}, flattened, extradata)

    Object.keys(props).map(key => {
      const value = props[key]
      if (!nodeAttributes[key]) {

        // we use typeof here, because we want to reject both Object and Array
        if (typeof value === 'object') { return }

        nodeAttributes[key] = {
          id   : nbNodeAttributes++,
          title: key.replace(/\./g, '_'),
          type : isValidNumber(value) ? 'double' : 'string'
        }
      }
      attributes[key] = value
    })

    return `      <node id=${s(id)} label=${s(label)}>
        <viz:size value=${s(count)} />
        <attvalues>
${Object.keys(attributes).map(key =>
`          <attvalue for=${s(nodeAttributes[key].id)} value=${s(attributes[key])} />`
).join('\n')}
        </attvalues>
      </node>`
  })
  const edgeList = graph.edges.map(({ id, source, target, label, count, flattened, properties }) => {

    const props = flattened
    const attributes = {}
    const extradata = {}
    // console.log("DEBUG: "+JSON.stringify({ flat: flattened, props: properties }, null, 2))

    Object.keys(props).map(key => {
      const value = props[key]
      if (!edgeAttributes[key]) {

        // we use typeof here, because we want to reject both Object and Array
        if (typeof value === 'object') { return }

        edgeAttributes[key] = {
          id   : nbEdgeAttributes++,
          title: key.replace(/\./g, '_'),
          type : isValidNumber(value) ? 'double' : 'string'
        }
      }
      attributes[key] = value
    })

    return `      <edge id=${s(id)} source=${s(source)} target=${s(target)} label=${s(label)} weight="1.0">
        <attvalues>
${Object.keys(attributes).map(key =>
`          <attvalue for=${s(edgeAttributes[key].id)} value=${s(attributes[key])} />`
).join('\n')}
        </attvalues>
      </edge>`
  })


  return `<?xml version="1.0" encoding="UTF-8"?>
<gexf
  xmlns="http://www.gexf.net/1.3"
  version="1.3"
  xmlns:viz="http://www.gexf.net/1.3/viz"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.gexf.net/1.3 http://www.gexf.net/1.3/gexf.xsd">
  <meta lastmodifieddate=${s(lastModifiedDate)}>
    <creator>Datanote</creator>
    <description>${title}</description>
  </meta>
  <graph defaultedgetype="undirected" mode="static">
    <attributes class="node">
${Object.keys(nodeAttributes).map(key => nodeAttributes[key]).map(({ id, title, type }) =>
`      <attribute id=${s(id)} title=${s(title)} type=${s(type)} />`
).join('\n')}
     </attributes>
     <attributes class="edge">
${Object.keys(edgeAttributes).map(key => edgeAttributes[key]).map(({ id, title, type }) =>
`      <attribute id=${s(id)} title=${s(title)} type=${s(type)} />`
).join('\n')}
    </attributes>
    <nodes>
${nodeList.join('\n')}
    </nodes>
    <edges>
${edgeList.join('\n')}
    </edges>
  </graph>
</gexf>`

}
