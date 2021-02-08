const environment = process.env.NODE_ENV || 'dev'

const data = require('./' + environment)

module.exports = data
