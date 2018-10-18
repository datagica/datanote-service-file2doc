'use strict'

const fetch = require('node-fetch')
const isForbiddenDomain = require('./isForbiddenDomain')

function getPage (url) {
  console.log("url: "+url)
  if (isForbiddenDomain(url)) {
    return Promise.reject("unauthorized domain")
  }
  return fetch(url).then(response => response.text())
                   .then(body => Promise.resolve({ text: body }))
}

module.exports = getPage
