'use strict'

const blacklist = {
  'api.datanote.io': true,
  'test-api.datanote.io': true,
  'google.com': true,
  'apple.com': true,
}

function isForbiddenDomain (input) {
  const protocolAndUrl = input.toLowerCase().trim().split('://')
  const domainAndPort = protocolAndUrl[1].split('/')[0].split(':')
  const domain = domainAndPort[0]
  return !!blacklist[domain]
}

module.exports = isForbiddenDomain
