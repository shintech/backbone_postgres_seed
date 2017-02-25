import tests from './main'

describe('Models', function () {
  tests.clearModels('models')
  tests.checkData('models')
  tests.postTest('models', {name: 'name'})
  tests.getAllTest('models', ['id', 'name'])
  tests.updateTest('models', {name: 'updatedName'})
  tests.getSingleTest('models', ['id', 'name'])
  tests.removeTest('models')
})
