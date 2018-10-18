'use strict'

function sortItems (items) {
  if (!items || items === null || typeof items === 'undefined') { return '' }
  const isString = typeof items === 'string'
  items = isString ? items.split(',') : items
  items.sort()
  return isString ? items.join(',').toString() : items
}

module.exports = sortItems
