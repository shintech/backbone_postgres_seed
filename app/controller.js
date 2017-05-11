import Marionette from 'marionette'
import Models from './collections/Models'
import TableView from './views/TableView'
import FormView from './views/FormView'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
  },

  page: function (id) {
    const app = this.app

    const models = new Models({ id: id })

    this.models = models

    models.fetch({
      success: function (data) {
        app.view.showChildView('main', new TableView({
          collection: models,
          pageData: data.pageData,
          panelHeading: 'Panel Heading'
        }))
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
