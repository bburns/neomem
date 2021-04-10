// const environment = process.env.NODE_ENV || 'development'
const environment = 'development'

const { Data } = require('./' + environment)

module.exports = { Data }
