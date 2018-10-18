'use strict'

const escape          = require("../utils/escape")
const getLocalized    = require('../utils/getLocalized')
const replaceEntities = require('../utils/replaceEntities')
const formatHtmlStyle = require('./formatHtmlStyle')

module.exports = function (input, record, graph, opts) {
  return `<html lang="en">
  <head>
    <title>Annotated with Datanote</title>
    <style>${formatHtmlStyle}</style>
  </head>
  <body vocab="http://schema.org/">
    <p typeof="Text">
      ${replaceEntities(input.text, record.links, entity =>
        `<span property=${
          JSON.stringify(entity.target.id)
        } label=${
          JSON.stringify(getLocalized(entity.target.label, opts))
        }>${
          escape(entity.properties.ngram)
        }</span>`
      )}
    </p>
  </body>
</html>`
}
