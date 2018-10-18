'use strict'

module.exports = {
  iban        : require("@datagica/parse-ibans"),
  email       : require("@datagica/parse-emails"),
  phone       : require("@datagica/parse-phones"),
  address     : require("@datagica/parse-addresses"),
  family      : require("@datagica/parse-family"),
  protagonist : require("@datagica/parse-protagonists"),

  businessEvent: require("@datagica/parse-business-events"),
  product      : require("@datagica/parse-products"),

  //company     : require("@datagica/parse-companies"),
  compensation: require("@datagica/parse-compensation"),
  diploma     : require("@datagica/parse-diplomas"),
  position    : require("@datagica/parse-positions"),
  institution : require("@datagica/parse-institutions"),
  interest    : require("@datagica/parse-interests"),
  language    : require("@datagica/parse-languages"),
  skill       : require("@datagica/parse-skills"),
  social      : require("@datagica/parse-social-handles"),

  intelligenceEvent: require("@datagica/parse-events"),
  evidence         : require("@datagica/parse-criminal-evidences"),
  weapon           : require("@datagica/parse-weapons"),
  location         : require("@datagica/parse-locations"),

  animal    : require("@datagica/parse-generic-animals"),
  artery    : require("@datagica/parse-arteries"),
  bacteria  : require("@datagica/parse-bacteria"),
  cell      : require("@datagica/parse-cells"),
  disease   : require("@datagica/parse-diseases"),
  drug      : require("@datagica/parse-drugs"),
  healthRisk: require("@datagica/parse-health-risks"),
  muscle    : require("@datagica/parse-muscles"),
  nerve     : require("@datagica/parse-nerves"),
  protein   : require("@datagica/parse-proteins"),
  symptom   : require("@datagica/parse-symptoms"),
  virus     : require("@datagica/parse-viruses"),

  alloy             : require("@datagica/parse-alloys"),
  engineeringElement: require("@datagica/parse-engineering-elements"),
  engineeringEvent  : require("@datagica/parse-engineering-events"),

  artist: require("@datagica/parse-artists"),
}

// companies and locations receive a special treatment: they need to be
// loaded asynchronously.. it's okay, don't be scared!
setTimeout(() => module.exports.location("").then(_ => _), 100)
