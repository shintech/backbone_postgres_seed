import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import morgan from 'morgan'
import router from './routes'
import favicon from 'serve-favicon'
import getHTTPServer from './lib/getHTTPServer'

const _parentDir = path.dirname(__dirname)

const props = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development'
}

const { app, environment } = props

if (environment === 'development') {
  app.use(morgan('dev'))
}

app.use(favicon(path.join(__dirname, 'resources', 'images', 'favicon.png')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)

app.use('/css', express.static(path.join(_parentDir, 'node_modules', 'bootstrap', 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'static')))

const server = getHTTPServer(props)

export default server
