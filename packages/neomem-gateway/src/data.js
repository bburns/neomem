// const environment = process.env.NODE_ENV || 'development'
const environment = 'development' //. for now

const { Data } = require('./' + environment)

module.exports = { Data }
