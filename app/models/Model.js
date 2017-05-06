import validation from 'backbone-validation' // eslint-disable-line

const Model = Backbone.Model.extend({
  urlRoot: 'http://shintech.ninja:8000/api/models',

  validation: {
    name: [
      {
        required: true,
        msg: 'Name is required...'
      }
    ],
    attribute: [
      {
        pattern: 'number',
        msg: 'Attribute must be a number...'
      }
    ]
  }
})

export default Model
