const { DataSource } = require('apollo-datasource')

class ConfigAPI extends DataSource {
  constructor({ config }) {
    super()
    this.config = config
  }

  async get({ id }) {
    return { id, name: 'jhbjhb' }
  }

  async set({ id, name, description }) {
    // const res = await this.config.set(id, { name, description })
    // return res && res.length ? res[0].get() : false
    return { id, name, description }
  }
}

module.exports = ConfigAPI
