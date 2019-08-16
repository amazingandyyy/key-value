const path = require('path')
const fs = require('fs')
const sub = require('subleveldown')
class Levelize {
  constructor (level, name, options) {
    this.options = options
    const dbpointer = path.join(this.options.location || __dirname, '.db');
    // check if .db folder exist, create it otherwise
    (!fs.existsSync(dbpointer)) && fs.mkdirSync(dbpointer)
    this.db = level(path.join(dbpointer, name), options)
    this.schemas = {}
  }

  schema (obj) {
    const result = {}
    for (const o in obj) {
      result[o] = obj[o].name ? obj[o].name.toLowerCase() : obj[o].toLowerCase()
    }
    return result
  }

  model (modelName, modelSchema) {
    const obj = {}
    const db = this.db
    this.schemas[modelName] = modelSchema
    obj.schemas = modelSchema
    obj.modelName = modelName
    obj.modelDb = sub(db, modelName)
    obj.createOne = function (content) {
      for (const k in content) {
        if (!this.schemas[k]) {
          exitError(`Schema Error: ${k} doesn't match the schema of ${modelName}`)
        } else if (`${typeof content[k]}` !== `${this.schemas[k]}`) {
          exitError(`Schema Error: ${k} should be a ${this.schemas[k]}`)
        }
      }
      this.modelDb.put(content.username, content.password)
    }
    obj.getAll = function () {
      const result = []
      this.modelDb.createReadStream().on('data', (res) => {
        result.push(res)
      }).on('end', function () {
        console.log(result)
        return result
      })
    }
    obj.getOne = function ({ username }, cb) {
      this.modelDb.createReadStream().on('data', (res) => {
        if (res.key === username) {
          return cb(null, [res])
        }
      })
    }
    return obj
  }
}

function exitError (e) {
  console.error(new Error(e))
  process.exit(1)
}

// function uuid () {
//   var dt = new Date().getTime()
//   var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     var r = (dt + Math.random() * 16) % 16 | 0
//     dt = Math.floor(dt / 16)
//     return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
//   })
//   return uuid
// }

module.exports = Levelize
