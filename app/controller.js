import Marionette from 'marionette'
import Model from './models/Model'
import Models from './collections/Models'
import TableView from 'backbone_table_view'
import FormView from 'backbone_form_view'
import LoginView from './views/LoginView'
import Config from 'shintech-config'
import config from './_config'

const tableView = new TableView()

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
    this.config = new Config(config)
  },

  index: function () {
    console.log('index')
  },

  page: function (page) {
    const app = this.app

    const models = new Models([], { page: page, config: this.config })

    this.models = models

    models.fetch({
      success: function (data) {
        tableView.collection = models
        tableView.pageData = data.pageData
        tableView.panelHeading = 'Panel Heading'
        tableView.template = require('./templates/table-view-template.html')
        tableView.tableItemTemplate = require('./templates/model-view-template.html')
        tableView.modalViewTemplate = require('./templates/model-modal-view-template.html')
        tableView.render()
        app.view.showChildView('main', tableView)
      },

      error: function (err) {
        console.log(err)
      }
    })
  },

  formRoute: function () {
    const model = new Model({url: this.config.getConfig('url')})

    const formView = new FormView({
      formTemplate: require('./templates/form-view-template.html'),
      model: model

    })

    this.app.view.showChildView('main', formView)
  },

  loginRoute: function () {
    this.app.view.showChildView('main', new LoginView())
  }
})

export default Controller
