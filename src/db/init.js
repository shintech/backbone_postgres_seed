import promise from 'bluebird'
import config from '../_config'

const options = {
  promiseLib: promise
}

const environment = process.env.NODE_ENV || 'development'
const pgp = require('pg-promise')(options)
const connectionString = config.postgresURI[environment]
const init = pgp(connectionString)
const databaseName = connectionString.split('/')

if (process.env.NODE_ENV === 'development') {
  console.log('Connected to database: ' + databaseName[databaseName.length - 1])
}

module.exports = init
