'use strict'

const escape          = require("../utils/escape")
const getLocalized    = require('../utils/getLocalized')
const replaceEntities = require('../utils/replaceEntities')

module.exports = function (input, record, graph, opts) {
  return `<div xmlns:dc="http://purl.org/dc/elements/1.1/">
      ${replaceEntities(input.text, record.links, entity =>
        `<span property=${
          JSON.stringify(entity.target.id)
        } label=${
          JSON.stringify(getLocalized(entity.target.label, opts))
        }>${
          escape(entity.properties.ngram)
        }</span>`
      )}
  </div>`
}
