'use strict'

// wraps entities found in the text
// entities must match the input text
module.exports = function (txt, entities, wrapper) {
  return ([].concat(entities)).sort((a, b) => {
    return a.properties.begin - b.properties.begin
  }).reduce((acc, entity) => {
    const wrap = wrapper(entity)
    const begin = acc.delta + entity.properties.begin
    const end   = acc.delta + entity.properties.end
    //console.log("\ndelta: "+acc.delta+", begin: "+begin+", end: "+end+", len: "+wrap.length)
    acc.buffer = acc.buffer.slice(0, begin) + wrap + acc.buffer.slice(end)
    //console.log("buffer: "+acc.buffer)
    acc.delta = acc.delta + wrap.length - entity.properties.ngram.length
    //console.log("new delta: "+acc.delta)
    return acc
  }, {
    buffer: `${txt}`,
    delta: 0
  }).buffer
}
