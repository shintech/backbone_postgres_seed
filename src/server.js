import config from './_config'
import express from 'express'
import bodyParser from 'body-parser'
import HTTPervert from 'httpervert'
import init from 'shintech-init-db'
import helmet from 'helmet'
import path from 'path'
import morgan from 'morgan'
import winston from 'winston-color'
import favicon from 'serve-favicon'
import session from 'express-session'
import passport from 'passport'
import getRouter from './routes'

const _pkg = require(path.join(path.dirname(__dirname), 'package.json'))
const _bootstrapDir = require.resolve('bootstrap').match(/.*\/node_modules\/[^/]+\//)[0]

const options = {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  config: config,
  pkg: _pkg
}

const { port, environment } = options

var httpervert = new HTTPervert(options)
const { app, server, router } = httpervert

options.db = init(options)
options.router = router
app.use(helmet())

const RedisStore = require('connect-redis')(session)
const store = new RedisStore({
  url: config.redisStore.url
})

app.use(session({
  store: store,
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))

require('shintech-init-passport').init(app, passport, options)

app.use(passport.initialize())
app.use(passport.session())

app.use(favicon(path.join(__dirname, 'resources', 'images', 'favicon.png')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/css', express.static(path.join(_bootstrapDir, 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'static')))

app.get('/loginFailure', function (req, res, next) {
  res.sendFile('login-failure.html', { root: './' })
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/loginFailure'
}))

if (environment !== 'test') {
  app.use(morgan('dev'))
}

app.use('/api', getRouter(options))

const serverConfig = {
  server: server,
  options: options
}

server.listen(port)

export default serverConfig
