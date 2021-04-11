// const environment = process.env.NODE_ENV || 'development'
// const environment = 'development' //. for now

// const { Data } = require('./' + environment)
// const { Data } = await import('./' + environment)
import { Data } from './development/index.js'

// module.exports = { Data }

export { Data }
