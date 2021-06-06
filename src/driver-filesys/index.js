import { Connect } from './connect.js'

export const driver = {
  connect() {
    return new Connect()
  },
}
