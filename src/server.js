import express from 'express'
import bodyParser from 'body-parser'
import {join} from 'path'
import morgan from 'morgan'

const environment = process.env.NODE_ENV || 'development'
const routes = require('./routes')
const port = process.env.PORT || 8000

const app = express()

if (environment === 'development') {
  app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(join(__dirname, '..', 'static')))

app.use('/api', routes)

const server = app.listen(port, function () {
  if (environment === 'development') {
    console.log(('Listening on port ' + port + '...'))
  }
})

module.exports = server
