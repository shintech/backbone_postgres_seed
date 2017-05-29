import path from 'path'
const config = {}

config.postgresURI = {
  development: 'postgres://postgres:postgres@localhost:5432/api_development',
  test: 'postgres://postgres:postgres@localhost:5432/api_test',
  production: process.env['DATABASE_URL']
}

config.redisStore = {
  url: process.env.REDIS_STORE_URI,
  secret: process.env.REDIS_STORE_SECRET
}

config.domainName = {
  development: 'dev.shintech.ninja',
  production: 'shintech.ninja'
}

config.sslPath = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : '/etc'], '/letsencrypt/live/')

export default config
