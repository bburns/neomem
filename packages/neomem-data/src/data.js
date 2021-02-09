const environment = process.env.NODE_ENV || 'development'

const { Data } = require('./' + environment)

module.exports = { Data }
