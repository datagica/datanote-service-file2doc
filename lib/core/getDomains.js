
// mapping of tag type to parser types
module.exports = {

  detective: [
    'iban',
    'address',
    'email',
    'event',
    'evidence',
    'family',
    'phone',
    'position',
    'protagonist',
    'weapon',
  ],

  lifesciences: [
    'muscle',
    'animal',
    'artery',
    'bacteria',
    'cell',
    'disease',
    'drug',
    'healthRisk',
    'institution',
    'nerve',
    'protagonist',
    'location',
    'protein',
    'symptom',
    'virus',
  ],

  marketing: [
    'businessEvent',
    'institution',
    'position',
    'protagonist',
    'social',
    'product'
  ],

  engineer: [
    'engineeringElement',
    'engineeringEvent',
    'healthRisk',
    'institution',
    'protagonist',
  ],

  workplace: [
    'address',
    // 'company',
    'diploma',
    'email',
    'family',
    'institution',
    'interest',
    'language',
    'phone',
    'position',
    'protagonist',
    'skill',
    'social',
  ],

  fiction: [
    'character',
    'location',
    'weapon',
    'event',
    'evidence',
  ],

  arts: [
    'email',
    'phone',
    'address',
    'compensation',
    'protagonist',
    'artist',
    'interest',
  ],

  generic: [
    'businessEvent',
    'engineeringEvent',
    'intelligenceEvent',
    'protagonist',
    'location',
  ]
}
