// import 'dotenv/config.js' // read envars from .env file into process.env
import ce from 'custom-env'
ce.env()

console.log(process.env.NODE_ENV)

export default { 
  uri: process.env.NEO4J_URI,
  user: process.env.NEO4J_USER,
  password: process.env.NEO4J_PASSWORD,
}
