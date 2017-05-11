const ModelView = Backbone.Marionette.View.extend({
  tagName: 'tr',
  className: 'table-row',
  template: require('../templates/model-view-template.html')
})

export default ModelView
