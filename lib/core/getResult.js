'use strict'

const classify  = require("@datagica/classify-document")

const getParser = require("./getParser")
const sortItems = require("../utils/sortItems")
const isString  = require("../utils/isString")
const format    = require("./format")

module.exports = function (input, opts) {
  return classify(input.text).then(tags =>
    getParser(opts.domain, opts.types).parse(input).then(result =>
      Promise.resolve(format(input, result, opts))))
}
