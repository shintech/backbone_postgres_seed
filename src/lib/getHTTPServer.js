function getHTTPServer (props) {
  const { app, port, environment } = props

  const server = app.listen(port, function () {
    if (environment === 'development') {
      console.log('Listening on port ' + port + '...')
    }
  })

  return server
}

export default getHTTPServer
