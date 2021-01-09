const { DataSource } = require('apollo-datasource')

class ConfigAPI extends DataSource {
  constructor({ config }) {
    super()
    this.config = config
  }

  async get({ id }) {
    if (id) {
      return { id, name: 'jhbjhb' }
    }
    return [{ foo: 3 }]
    // return Object.values(this.config.store)
  }

  async set({ id, name, description }) {
    return { id, name, description }
  }
}

module.exports = ConfigAPI
