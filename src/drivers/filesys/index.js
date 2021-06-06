import { Connection } from './connection.js'

export const driver = {
  connect() {
    return new Connection()
  },
}
