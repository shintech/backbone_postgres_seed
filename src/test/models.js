import runTests from './main'

describe('Models', function () {
  runTests('models', ['id', 'name'], {name: 'name'}, {name: 'updatedName'})
})
