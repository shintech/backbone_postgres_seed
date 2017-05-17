import moment from 'moment'

const ModelModalView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'modal fade hidden',
  id: 'modelModal',
  template: require('../templates/model-modal-view-template.html'),
  attributes: {
    'role': 'dialog'
  },
  events: {
    'click': 'remove'
  },
  initialize: function () {
    this.render()
  },
  serializeData: function () {
    const createdAt = moment(this.model.get('created_at'))

    return {
      'name': this.model.get('name'),
      'attribute': this.model.get('attribute'),
      'created_at': createdAt.format('M-DD-YYYY h:mm:ss A')
    }
  },
  onRender: function () {
    this.$el.modal('show').removeClass('hidden')
  },
  remove: function () {
    this.on('hidden', this.$el.remove())
    if ($('.modal-backdrop').length) {
      $('.modal-backdrop').remove()
    }
  }
})

export default ModelModalView
