'use strict'

const Parser = require("@datagica/parse-document")

const sortItems = require("../utils/sortItems")
const isString  = require("../utils/isString")

// available parser types
const modules = require("./getModules")
const domains = require("./getDomains")

// load everything in memory (can take some time, grab a covfefe)
const parsers = {}

// the meta type is either a domain, or a unique id generated from a list of sub types
// if we do not find the meta type, a new one will be created using the sub types
function getParser (domain, types) {

  const parserId = sortItems(domain || types).toLowerCase()

  if (parsers[parserId]) { return parsers[parserId] }

  // no type found
  if (!types) { return parsers.generic }

  // found some types but they are not an array yet
  if (!Array.isArray(types)) {
    if (typeof types === "string") {
      types = types.split(',')
    } else {
      // uh oh.. types is not in the right type.
      return parsers.generic
    }
  }

  const entities = {}
  types.map(type => type.toLowerCase())
    .filter(type => (typeof modules[type] === 'function'))
       .map(type => (entities[type] = modules[type]))

  parsers[parserId] = new Parser({
    type: parserId,
    index: [ 'text' ],    // TODO to deprecate (not used anymore)
    strategy: 'sentence', // TODO to deprecate (not used anymore)
    entities: entities
  })

  return parsers[parserId]
}

Object.keys(domains).map(domain => getParser(domain, domains[domain]))

// TODO DEPRECATE THIS - THIS IS SO UGLY..
parsers.ResearchPaper = parsers.lifesciences
parsers.police = parsers.military = parsers.PoliceReport = parsers.investigation = parsers.detective
parsers.news = parsers.detective

module.exports = getParser
