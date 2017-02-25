import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import morgan from 'morgan'
import router from './routes'
import favicon from 'serve-favicon'

const _parentDir = path.dirname(__dirname)
const environment = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8000
const app = express()

if (environment === 'development') {
  app.use(morgan('dev'))
}

app.use(favicon(path.join(__dirname, 'resources', 'images', 'favicon.png')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)

app.use('/css', express.static(path.join(_parentDir, 'node_modules', 'bootstrap', 'dist', 'css')))
app.use(express.static(path.join(__dirname, 'static')))

const server = app.listen(port, function () {
  if (environment === 'development') {
    console.log(('Listening on port ' + port + '...'))
  }
})

export default server
