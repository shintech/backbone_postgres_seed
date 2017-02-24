global.jQuery = require('jquery')
require('bootstrap')
require('./public/css/style.scss')

// const App = require('./App')
import App from './App'

const app = new App()
app.start()

export default app
