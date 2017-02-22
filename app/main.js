global.jQuery = require('jquery')
require('bootstrap')
require('./public/css/style.scss')

const App = require('./App')

const app = new App()
app.start()

module.exports = app
