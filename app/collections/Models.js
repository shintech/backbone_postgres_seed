import Model from '../models/Model'

const Models = Backbone.Collection.extend({
  model: Model,
  initialize: function (model, options) {
    this.url = 'http://shintech.ninja:8000/api/models?page=' + options.page
  },
  parse: function (response) {
    this.pageData = response.pageData

    return response.models
  }
})

export default Models
