import runTests from './runner'

describe('Models', function () {
  runTests({
    model: 'models',
    url: '/api/models/',
    properties: ['id', 'name'],
    postAttributes: {
      name: 'name'
    },
    putAttributes: {
      name: 'name'
    }
  })
})
