import promise from 'bluebird'
import initConfig from '../_config'
import pg from 'pg-promise'

const {config} = initConfig

const options = {
  promiseLib: promise
}

const pgp = pg(options)
const environment = process.env.NODE_ENV || 'development'
const connectionString = config.postgresURI[environment]
const db = pgp(connectionString)
const databaseName = connectionString.split('/')

if (process.env.NODE_ENV === 'development') {
  console.log('Connected to database: ' + databaseName[databaseName.length - 1])
}

export default {
  db
}
