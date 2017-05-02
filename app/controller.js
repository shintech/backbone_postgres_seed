import Marionette from 'marionette'
import Models from './collections/Models'
import ModelsView from './views/ModelsView'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    const app = options.app
    
    this.app = app
    
    const models = new Models()
    
    const modelsView = new ModelsView({
      collection: models
    })
    
    models.fetch({
      success: function () {
        app.view.showChildView('main', modelsView)
      },
      
      failure: function (err) {
        console.log(err)
      }
    })
  }
})

export default Controller
