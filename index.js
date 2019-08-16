const path = require('path')
const fs = require('fs')
class Levelize {
  constructor (level) {
    this.level = level
    this.db = null
    this.config = {}
  }

  connect (name, config) {
    this.config = config
    const dbpointer = path.join(this.config.location || __dirname, '.db');
    // check if .db folder exist, create it otherwise
    (!fs.existsSync(dbpointer)) && fs.mkdirSync(dbpointer)
    this.db = this.level(path.join(dbpointer, name))
  }
}

// function tryCatch (func) {
//   try {
//     func()
//   } catch (e) {
//     exitError(e)
//   }
// }

// function exitError (e) {
//   console.error(new Error(e))
//   process.exit(1)
// }

module.exports = Levelize
