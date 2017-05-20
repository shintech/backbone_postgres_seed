import Model from '../models/Model'
import config from '../_config'

const Models = Backbone.Collection.extend({
  model: Model,
  initialize: function (model, options) {
    this.url = config.url + 'api/models?page=' + options.page
  },
  parse: function (response) {
    this.pageData = response.pageData

    return response.models
  }
})

export default Models
