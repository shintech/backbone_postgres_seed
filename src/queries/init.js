import promise from 'bluebird'
import config from '../_config'
import pg from 'pg-promise'

export default function initDB (options) {
  const pgOptions = {
    promiseLib: promise
  }
  
  const pgp = pg(pgOptions)
  const environment = process.env.NODE_ENV || 'development'
  const connectionString = config.postgresURI[environment]
  const init = pgp(connectionString)
  const databaseName = connectionString.split('/')
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Connected to database: ' + databaseName[databaseName.length - 1])
  }
  
  return init
}