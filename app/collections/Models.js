import Model from '../models/Model'

const Models = Backbone.Collection.extend({
  model: Model,
  initialize: function (options) {
    this.url = 'http://shintech.ninja:8000/api/models?page=' + options.id
  },
  parse: function (response) {
    this.pageData = response.pageData

    return response.models
  }
})

export default Models
