const { DataSource } = require('apollo-datasource')

class ConfigAPI extends DataSource {
  constructor({ config }) {
    super()
    this.config = config
  }

  async findOne({ id }) {
    return this.config.get(id)
  }

  async findAll() {
    return Object.values(this.config.store)
  }

  async set({ id, name, description }) {
    return { id, name, description }
  }
}

module.exports = ConfigAPI
