'use strict'

const fileType = require('file-type')
const isString = require('./isString')

function getType (input, contentType) {

    // mime type detection: we take a chunk of the input buffer to guess the type.
    // if we can't, we resort to using the content-type, unless the form submit
    // type is used because we can't process it (but good news: it is plain text)
    const guessed = fileType(input.slice(0, 4100))
    const mime    = guessed ? guessed.mime
                  : !isString(contentType) ? 'text/plain'
                  : contentType !== 'application/x-www-form-urlencoded' ? contentType
                  : 'text/plain'
    return mime
}

module.exports = getType
