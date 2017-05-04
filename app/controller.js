import Marionette from 'marionette'
import Models from './collections/Models'
import ModelsView from './views/ModelsView'
import FormView from './views/FormView'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app

    this.models = new Models()
  },

  index: function () {
    const app = this.app

    const modelsView = new ModelsView({
      collection: this.models
    })

    this.models.fetch({
      success: function () {
        app.view.showChildView('main', modelsView)
      },

      error: function (err) {
        console.log(err)
      }
    })
  },

  formRoute: function () {
    this.app.view.showChildView('main', new FormView({ collection: this.models }))
  }
})

export default Controller
