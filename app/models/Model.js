import validation from 'backbone-validation' // eslint-disable-line
import path from 'path'
import moment from 'moment'
import config from '../_config'

const Model = Backbone.Model.extend({
  urlRoot: config.url + 'api/models',

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
  },

  parse: function (response) {
    const createdAt = moment(response.created_at)

    const object = {
      id: response.id,
      name: response.name,
      attribute: response.attribute,
      created_at: createdAt.format('YYYY-MM-DD hh:mm:ss A')
    }

    return object
  }
})

export default Model
