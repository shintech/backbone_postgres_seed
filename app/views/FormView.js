import Model from '../models/Model'

const FormView = Backbone.Marionette.View.extend({
  template: require('../templates/form-view-template.html'),
  tagName: 'form',

  ui: {
    submit: '.submit-button'
  },

  events: {
    'click @ui.submit': 'handleSubmit'
  },

  initialize: function () {
    this.model = new Model()
  },

  handleSubmit: function (e) {
    e.preventDefault()

    const modelAttrs = {
      name: $('#name_input').val(),
      attribute: $('#attribute_input').val()
    }

    this.model.save(modelAttrs, {
      success: function () {
        submitMessage('Successfully created...')
      },
      error: function () {
        submitMessage('Submission error...')
        $('.message-block').addClass('has-error')
      }
    })
    this.collection.add(this.model)
  }
})

function submitMessage (message) {
  const messageBlock = $('.message-block')
  messageBlock.html(message).removeClass('hidden has-error')
}

export default FormView
