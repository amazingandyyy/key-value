const process = require('process')
const level = require('level')
const Levelize = require('../../index')
const levelize = new Levelize(level)

levelize.connect('levelize-demo-2019', {
  location: process.cwd()
})
