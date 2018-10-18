'use strict'

const getGraph       = require('./getGraph')
const escape         = require('../utils/escape')
const isValidNumber  = require('../utils/isValidNumber')

const formatRaw      = require('../formats/formatRaw')
const formatGdf      = require('../formats/formatGdf')
const formatCsv      = require('../formats/formatCsv')
const formatGexf     = require('../formats/formatGexf')
const formatJson     = require('../formats/formatJson')
const formatRdfa     = require('../formats/formatRdfa')
const formatHtml     = require('../formats/formatHtml')
const formatText     = require('../formats/formatText')
const formatNeo4j    = require('../formats/formatNeo4j')
const formatCypher   = require('../formats/formatCypher')
const formatGremlin  = require('../formats/formatGremlin')
const formatGraphson = require('../formats/formatGraphson')

module.exports = function (input, record, opts) {

  const type = typeof opts.format === 'string'
    ? opts.format.trim().toLowerCase()
    : 'json'

  const graph = getGraph(record, opts)

  switch (type) {

    case 'raw':      return formatRaw(input, record, graph, opts)
    case 'csv':      return formatCsv(input, record, graph, opts)
    case 'gdf':      return formatGdf(input, record, graph, opts)
    case 'rdf':      return formatRdf(input, record, graph, opts)
    case 'text':     return formatText(input, record, graph, opts)
    case 'html':     return formatHtml(input, record, graph, opts)
    case 'json':     return formatJson(input, record, graph, opts)
    case 'rdfa':     return formatRdfa(input, record, graph, opts)
    case 'gexf':     return formatGexf(input, record, graph, opts)
    case 'neo4j':    return formatNeo4j(input, record, graph, pts)
    case 'cypher':   return formatCypher(input, record, graph, opts)
    case 'gremlin':  return formatGremlin(input, record, graph, opts)
    case 'graphson': return formatGraphson(input, record, graph, opts)

    default:
      console.error('unrecognized format '+type)
      return formatJson(record, graph, opts)
  }
}
