
# text2doc

*The Datanote feature extraction engine, as micro service*

## TODO

- support multiple formats:
  - datanote: a custom, low-level format supported by Datanote
  - json: basic list of entities
  - gexf: GEXF graph
  - csv: CSV graph (for Neo4J)  https://neo4j.com/developer/guide-import-csv/

## List of features

### Domains

The following domains are recognized by the API, but you can also define your own
(see the `Custom fields` paragraph).

detective:
- address
- email
- event
- evidence
- family
- phone
- position
- protagonist
- weapon

lifesciences:
- muscle
- animal
- artery
- bacteria
- cell
- disease
- drug
- healthRisk
- institution
- nerve
- protagonist
- location
- protein
- symptom
- virus

marketing:
- businessEvent
- institution
- position
- protagonist
- social
- product

engineer:
- engineeringElement
- engineeringEvent
- healthRisk
- institution
- protagonist

workplace:
- address
- diploma
- email
- family
- institution
- interest
- language
- phone
- position
- protagonist
- skill
- social
-
fiction:
- character
- location
- weapon
- event
- evidence

arts:
- email
- phone
- address
- compensation
- protagonist
- artist
- interest

generic:
- businessEvent
- engineeringEvent
- intelligenceEvent
- protagonist
- location

### Custom fields

Optional url parameters:

- locale: `en`, `fr` (example: `?locale=en`, `&locale=fr`..)
- fields: values to keep (example: `fields=id,label`, `&fields=label,links,target`..)
- domain: `PoliceReport`, see source for more (example: `?domain=PoliceReport`..)
- types: `bacteria`, `address`, `event`, see source for more
- - format: `graphson`, `gdf`, `gexf` (example: `?format=gdf`..)

Note: since `domain` cannot be used at the same time as `types`, `types` will
have priority and `domain` will have no effect.

### Domains and entity types

Current extraction model (you can change this, if your edit `engine.js`):

```javascript
{
  PoliceReport: [
    'email',
    'phone',
    'location',
    'evidence',
    'event',
    'protagonist',
    'position',
    'weapon',
  ],
  generic: [
    'protagonist',
  ]
}
```

## Usage

Examples use [httpie](https://github.com/jakubroztocil/httpie) with [jq](https://github.com/stedolan/jq), but you can also use curl or something else.

The content-type is optional, it can help the app if there is an encoding
issue with magic number.

### Example with curl

```bash
curl -X POST "http://localhost:3000?locale=en&types=animal&format=gdf" -d "THE HIPPO KILLS THE DOLPHIN"
curl -X POST "http://localhost:3000?locale=en&types=protagonist,weapon&format=gdf" -d "James bond buys an ak-47"
curl -X POST "http://localhost:3000" --data-binary "@tests/fixtures/police_en.txt"
curl -X POST "http://localhost:3000?locale=en&types=protagonist,virus" -d "James Bond has caught the terrorist carrying H5N1"
```

### Example with httpie and jq

```bash
https POST "http://localhost:3000?locale=en&types=virus" body="the monkey died of ebola" | jq
https POST "http://localhost:3000" body="James Bond" | jq
https POST "http://localhost:3000" body="James Bond" | jq
https POST "http://localhost:3000?&fields=label,links,link,target&locale=en" body="James Bond"  | jq
https POST "http://localhost:3000?locale=en" body="James Bond"  | jq
https POST "http://localhost:3000?&fields=label,links,link,target" body="James Bond"  | jq
https POST "http://localhost:3000?locale=en&types=protagonist,virus" body="James Bond has caught the terrorist carrying H5N1" | jq
```

### Longer example

```bash
https POST "http://localhost:3000?fields=link,links,target,properties,ngram,begin,end,label,gender,number,firstname,lastname&locale=en" body="James Bond buys an AK-47"
```

output:
```json
{
  "type": "record",
  "label": {},
  "properties": {},
  "links": [
    {
      "link": {
        "type": "link",
        "label": "Mentions"
      },
      "properties": {
        "ngram": "James Bond",
        "begin": 0,
        "end": 10
      },
      "target": {
        "properties": {
          "firstname": "james",
          "lastname": "bond",
          "gender": [
            "m"
          ]
        },
        "links": [
          {
            "link": {
              "type": "link",
              "label": "Type"
            },
            "properties": {},
            "target": {
              "type": "entity",
              "label": "Protagonist"
            }
          },
          {
            "link": {
              "type": "purchase",
              "label": "Purchase"
            },
            "properties": {},
            "target": {
              "properties": {
                "number": "singular",
                "gender": "neutral"
              },
              "links": [
                {
                  "link": {
                    "type": "link",
                    "label": "Type"
                  },
                  "properties": {},
                  "target": {
                    "type": "entity",
                    "label": "Generic"
                  }
                }
              ],
              "label": "AK-47",
              "type": "entity"
            }
          }
        ],
        "label": "James BOND",
        "type": "entity"
      }
    },
    {
      "link": {
        "type": "link",
        "label": "Mentions"
      },
      "properties": {
        "begin": 19,
        "end": 24,
        "ngram": "AK-47"
      },
      "target": {
        "properties": {
          "number": "singular",
          "gender": "neutral"
        },
        "links": [
          {
            "link": {
              "type": "link",
              "label": "Type"
            },
            "properties": {},
            "target": {
              "type": "entity",
              "label": "Generic"
            }
          }
        ],
        "label": "AK-47",
        "type": "entity"
      }
    }
  ]
}```

### Medical example

```bash
https POST "http://localhost:3000?locale=en&types=virus" body="H5N1" | jq
```

```json
{
  "type": "record",
  "id": "record:undefined__undefined",
  "date": "2017-07-11T22:27:51.438Z",
  "label": {},
  "indexed": "H5N1",
  "properties": {},
  "links": [
    {
      "link": {
        "type": "link",
        "id": "link:mention",
        "label": "Mentions",
        "description": "Mention in a document",
        "aliases": [
          "mentioned in",
          "has a mention",
          "is mentioned",
          "are mentioned"
        ]
      },
      "properties": {
        "ngram": "H5N1",
        "score": 1,
        "sentence": 1,
        "word": 0,
        "begin": 0,
        "end": 4
      },
      "target": {
        "properties": {
          "category": "species"
        },
        "links": [
          {
            "link": {
              "type": "link",
              "id": "link:instanceof",
              "label": "Type",
              "plural": "Types",
              "description": "Of type",
              "aliases": [
                "of type"
              ]
            },
            "properties": {},
            "target": {
              "type": "entity",
              "id": "entity:virus",
              "label": "Virus",
              "plural": "Viruses",
              "description": "Virus",
              "aliases": [
                "virus",
                "viruses"
              ]
            }
          }
        ],
        "id": "entity:virus__influenza-a-virus-h5n1",
        "label": "Influenza A (H5N1)",
        "description": "Influenza A virus (subtype H5N1)",
        "aliases": [
          "H5N1",
          "H5N1 flu",
          "Influenza A H5N1",
          "Influenza A (H5N1)",
          "Influenza A subtype H5N1",
          "Influenza A (subtype H5N1)",
          "Influenza A (H5N1 subtype)"
        ],
        "type": "entity"
      }
    }
  ]
}
```

### GDF

```bash
curl -X POST "http://localhost:3000?locale=en&types=animal,virus&format=gdf" -d "the monkey has ebola"
```

```csv
nodedef>id VARCHAR,label VARCHAR
entity:animal__monkey,Monkey
entity:virus__ebolavirus,Ebolavirus
edgedef>id VARCHAR,source VARCHAR,target VARCHAR
```

### Graphson

```bash
curl -X POST "http://localhost:3000?locale=en&types=animal,virus&format=graphson" -d "the monkey has ebola"
```

```json
{
  "graph": {
    "mode": "NORMAL",
    "vertices": [
      {
        "_id": "entity:animal__monkey",
        "name": "Monkey",
        "_type": "vertex"
      },
      {
        "_id": "entity:virus__ebolavirus",
        "name": "Ebola",
        "_type": "vertex"
      }
    ],
    "edges": []
  }
}
```

## Deployment

To start the service locally: `npm run start`.
To deploy on Now: `npm run deploy`.

