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

  async create(args) {
    const id = String(Math.floor(Math.random() * 1000))
    const node = { ...args, id }
    this.config.set(id, node)
    return node
  }
}

module.exports = ConfigAPI
