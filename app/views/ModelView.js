import moment from 'moment'

const ModelView = Backbone.Marionette.View.extend({
  tagName: 'tr',
  className: 'table-row',
  template: require('../templates/model-view-template.html'),
  serializeData: function () {
    const createdAt = moment(this.model.get('created_at'))

    return {
      'name': this.model.get('name'),
      'attribute': this.model.get('attribute'),
      'created_at': createdAt.format('M-DD-YYYY h:mm:ss A')
    }
  }
})

export default ModelView
