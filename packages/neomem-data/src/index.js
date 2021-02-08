const environment = process.env.NODE_ENV || 'development'

const data = require('./' + environment) //. is this okay?

module.exports = data
