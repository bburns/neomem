const environment = process.env.NODE_ENV || 'development'

const data = require('./' + environment)

module.exports = { data }
