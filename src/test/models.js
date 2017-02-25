import crudTest from './runner'

describe('Models', function () {
  crudTest({
    model: 'models',
    url: '/api/models/',
    properties: ['name', 'attribute'],
    postAttributes: {
      name: 'name',
      attribute: 1
    },
    putAttributes: {
      name: 'updatedName',
      attribute: 2
    }
  })
})
