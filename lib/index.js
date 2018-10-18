'use strict'

const {buffer}  = require('micro')
const post      = require('micro-post')
const jwtAuth   = require('micro-jwt-auth')
const compress  = require('micro-compress')
const rateLimit = require('micro-ratelimit')

const getOptions = require('./core/getOptions')
const getPage    = require('./core/getPage')
const getText    = require('./core/getText')
const getResult  = require('./core/getResult')
const error      = require('./utils/error')

const buildApi = ({ rateLimitSize, rateLimitWindow, maxFileSize, maxTypes }) =>
  rateLimit({ limit: rateLimitSize, window: rateLimitWindow }, compress(async (req, res) => {
    const {method} = req
    // extract options from the request, but also enforce user limits
    // limits should come from subscription
    const options = getOptions(req, { maxFileSize,  maxTypes })

    if (method === "GET") {
      if (options.url) {
        try {
          const body = await getPage(options.url)
          const doc = await getResult(body, options)
          return doc
        } catch (exc) {
          error(res, 500, `Cannot process ${options.url}: ${exc}`)
          return
        }
      } else {
        error(res, 403, `Method Not Allowed: Guru Medication Required.`)
        return
        // return "Error: query string parameter ?url=... is needed when performing a GET request."
      }
    } else if (method === "POST") {
      const input = await buffer(req, { limit: options.maxFileSize })
      const text  = await getText(input, req.headers)
      const doc   = await getResult(text, options)
      return doc
    } else {
      error(res, 403, `Method Not Allowed. Forbidden. Verboten.`)
      return
    }
  }))

const defaultApi = buildApi({
  rateLimitSize: 50,
  rateLimitWindow: 60000,
  maxFileSize: '1mb',
  maxTypes: 5,
})

module.export = defaultApi
module.exports.default = defaultApi
module.exports.buildApi = buildApi