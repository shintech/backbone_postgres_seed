import App from './App'

global.jQuery = require('jquery')
require('bootstrap')
require('./public/css/style.scss')

const app = new App()
app.start()

export default app
