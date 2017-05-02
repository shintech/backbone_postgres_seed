import Model from '../models/Model'

const Models = Backbone.Collection.extend({
  model: Model,
  url: 'http://shintech.ninja:8000/api/models'
})

export default Models
