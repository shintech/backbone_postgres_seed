const ModelView = Backbone.Marionette.View.extend({
  tagName: 'li',
  template: require('../templates/model-view-template.html')
})

export default ModelView
