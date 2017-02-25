global.jQuery = require('jquery')
require('bootstrap')
require('./public/css/style.scss')

import App from './App'

const app = new App()
app.start()

export default app
