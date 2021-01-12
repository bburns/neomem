// apollo config file datasource.
// apollo lets you define datasource and pass them to your resolvers.
// it's not strictly necessary, as you can define the datasource in the resolver files.
// but maybe it helps keep resolver file more concise?

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
