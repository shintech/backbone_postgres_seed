'use strict'

var _express = require('express')

var _express2 = _interopRequireDefault(_express)

var _bodyParser = require('body-parser')

var _bodyParser2 = _interopRequireDefault(_bodyParser)

var _path = require('path')

var _morgan = require('morgan')

var _morgan2 = _interopRequireDefault(_morgan)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

const environment = process.env.NODE_ENV || 'development'
const routes = require('./routes')
const port = process.env.PORT || 8000

const app = (0, _express2.default)()

if (environment === 'development') {
  app.use((0, _morgan2.default)('dev'))
}

app.use(_bodyParser2.default.urlencoded({ extended: true }))
app.use(_bodyParser2.default.json())

app.use(_express2.default.static((0, _path.join)(__dirname, '..', 'static')))

app.use('/api', routes)

const server = app.listen(port, function () {
  if (environment === 'development') {
    console.log('Listening on port ' + port + '...')
  }
})

module.exports = server
